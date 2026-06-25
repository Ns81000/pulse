import { createFileRoute } from "@tanstack/react-router";
import type { Catalog, CatalogChannel } from "@/lib/types";

const ENDPOINTS = {
  channels: "https://iptv-org.github.io/api/channels.json",
  feeds: "https://iptv-org.github.io/api/feeds.json",
  streams: "https://iptv-org.github.io/api/streams.json",
  categories: "https://iptv-org.github.io/api/categories.json",
  languages: "https://iptv-org.github.io/api/languages.json",
  countries: "https://iptv-org.github.io/api/countries.json",
  blocklist: "https://iptv-org.github.io/api/blocklist.json",
  logos: "https://iptv-org.github.io/api/logos.json",
} as const;

interface RawChannel {
  id: string;
  name: string;
  alt_names?: string[];
  country: string;
  categories?: string[];
  is_nsfw?: boolean;
  closed?: string | null;
  website?: string | null;
}

interface RawFeed {
  channel: string;
  id: string;
  is_main?: boolean;
  languages?: string[];
  broadcast_area?: string[];
  format?: string | null;
}

interface RawStream {
  channel: string | null;
  feed?: string | null;
  url: string;
  referrer?: string | null;
  user_agent?: string | null;
  quality?: string | null;
  label?: string | null;
}

interface RawBlock {
  channel: string;
  reason: string;
}
interface RawLogo {
  channel: string;
  feed?: string | null;
  url: string;
  format?: string;
}
interface RawMeta {
  id?: string;
  code?: string;
  name: string;
  flag?: string;
}

function flagFromCode(code: string): string {
  if (!code || code.length !== 2) return "";
  const A = 127397;
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((c) => c.charCodeAt(0) + A),
  );
}

async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url, { headers: { "User-Agent": "TelaCatalog/1.0" } });
  if (!r.ok) throw new Error(`Failed ${url}: ${r.status}`);
  return r.json() as Promise<T>;
}

async function buildCatalog(): Promise<Catalog> {
  const [channels, feeds, streams, categories, languages, countries, blocklist, logos] =
    await Promise.all([
      fetchJson<RawChannel[]>(ENDPOINTS.channels),
      fetchJson<RawFeed[]>(ENDPOINTS.feeds).catch(() => [] as RawFeed[]),
      fetchJson<RawStream[]>(ENDPOINTS.streams),
      fetchJson<RawMeta[]>(ENDPOINTS.categories),
      fetchJson<RawMeta[]>(ENDPOINTS.languages),
      fetchJson<RawMeta[]>(ENDPOINTS.countries),
      fetchJson<RawBlock[]>(ENDPOINTS.blocklist),
      fetchJson<RawLogo[]>(ENDPOINTS.logos).catch(() => [] as RawLogo[]),
    ]);

  const blocked = new Set<string>();
  for (const b of blocklist) blocked.add(b.channel);

  // Feeds: aggregate languages per channel (union across all feeds)
  const langsByChannel = new Map<string, Set<string>>();
  for (const f of feeds) {
    if (!f.channel || !f.languages) continue;
    let s = langsByChannel.get(f.channel);
    if (!s) {
      s = new Set();
      langsByChannel.set(f.channel, s);
    }
    for (const l of f.languages) s.add(l);
  }

  const streamsByChannel = new Map<string, RawStream[]>();
  for (const s of streams) {
    if (!s.channel || !s.url) continue;
    const arr = streamsByChannel.get(s.channel) ?? [];
    arr.push(s);
    streamsByChannel.set(s.channel, arr);
  }

  // Prefer main-feed logo, else any
  const logoByChannel = new Map<string, string>();
  for (const l of logos) {
    if (!logoByChannel.has(l.channel)) logoByChannel.set(l.channel, l.url);
  }

  const out: Record<string, CatalogChannel> = {};
  const by_category: Record<string, string[]> = {};
  const by_language: Record<string, string[]> = {};
  const by_country: Record<string, string[]> = {};
  const all_ids: string[] = [];

  for (const c of channels) {
    if (!c.id) continue;
    if (blocked.has(c.id)) continue;
    if (c.is_nsfw) continue;
    if (c.closed) continue;
    const chStreams = streamsByChannel.get(c.id);
    if (!chStreams || chStreams.length === 0) continue;

    const langs = Array.from(langsByChannel.get(c.id) ?? []);

    const entry: CatalogChannel = {
      id: c.id,
      name: c.name,
      country: c.country,
      categories: c.categories ?? [],
      languages: langs,
      streams: chStreams.map((s) => ({
        url: s.url,
        referrer: s.referrer ?? null,
        user_agent: s.user_agent ?? null,
        quality: s.quality ?? null,
        label: s.label ?? null,
      })),
      website: c.website ?? null,
      logo_url: logoByChannel.get(c.id) ?? null,
    };
    out[c.id] = entry;
    all_ids.push(c.id);

    for (const cat of entry.categories) (by_category[cat] ??= []).push(c.id);
    if (entry.country) (by_country[entry.country] ??= []).push(c.id);
    for (const lang of langs) (by_language[lang] ??= []).push(c.id);
  }

  const metaCategories = categories
    .map((x) => ({ id: x.id ?? "", name: x.name }))
    .filter((x) => x.id);
  const metaLanguages = languages
    .map((x) => ({ code: x.code ?? "", name: x.name }))
    .filter((x) => x.code);
  const metaCountries = countries
    .map((x) => ({
      code: x.code ?? "",
      name: x.name,
      flag: x.flag || flagFromCode(x.code ?? ""),
    }))
    .filter((x) => x.code);

  return {
    updated_at: new Date().toISOString(),
    channels: out,
    indexes: { by_category, by_language, by_country, all_ids },
    meta: { categories: metaCategories, languages: metaLanguages, countries: metaCountries },
  };
}

let cached: { at: number; data: Catalog } | null = null;
const TTL_MS = 86_400_000;

export const Route = createFileRoute("/api/catalog")({
  server: {
    handlers: {
      GET: async () => {
        try {
          if (!cached || Date.now() - cached.at > TTL_MS) {
            const data = await buildCatalog();
            cached = { at: Date.now(), data };
          }
          return new Response(JSON.stringify(cached.data), {
            headers: {
              "content-type": "application/json",
              "cache-control":
                "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 502,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
