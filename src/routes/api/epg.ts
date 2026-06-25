import { createFileRoute } from "@tanstack/react-router";
import { XMLParser } from "fast-xml-parser";
import type { EPGData, EPGEntry } from "@/lib/types";

const GUIDES_URL = "https://iptv-org.github.io/api/guides.json";
const PRIORITY_LANGS = ["en", "fr", "es", "de", "ar"];
const MAX_SOURCES = 35;

interface RawGuide {
  channel: string;
  feed?: string | null;
  lang?: string;
  sources?: { url: string; format?: string }[];
}

function parseXmltvDate(s: string): Date | null {
  // Format: YYYYMMDDHHmmss +0000
  if (!s) return null;
  const m = s.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s*([+-]\d{4})?$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, se, tz] = m;
  const tzStr = tz ? `${tz.slice(0, 3)}:${tz.slice(3)}` : "+00:00";
  return new Date(`${y}-${mo}-${d}T${h}:${mi}:${se}${tzStr}`);
}

async function fetchAndParse(
  url: string,
  signal: AbortSignal,
): Promise<Record<string, { now: EPGEntry | null; next: EPGEntry | null }>> {
  const r = await fetch(url, { signal, headers: { "User-Agent": "IPTVEpgBuilder/1.0" } });
  if (!r.ok) return {};
  const text = await r.text();
  // Note: .gz auto-decompressed by fetch in most runtimes. Skip if we got binary.
  if (text.charCodeAt(0) === 0x1f) return {};
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
  let parsed: any;
  try {
    parsed = parser.parse(text);
  } catch {
    return {};
  }
  const tv = parsed?.tv;
  if (!tv) return {};
  const programmes = Array.isArray(tv.programme)
    ? tv.programme
    : tv.programme
      ? [tv.programme]
      : [];
  const now = Date.now();
  const byCh: Record<string, EPGEntry[]> = {};
  for (const p of programmes) {
    const ch = p.channel;
    if (!ch) continue;
    const start = parseXmltvDate(p.start);
    const end = parseXmltvDate(p.stop);
    if (!start || !end) continue;
    if (end.getTime() < now) continue;
    const title = typeof p.title === "string" ? p.title : (p.title?.["#text"] ?? "");
    if (!title) continue;
    const category = typeof p.category === "string" ? p.category : (p.category?.["#text"] ?? null);
    (byCh[ch] ??= []).push({
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      category: category ?? null,
    });
  }
  const out: Record<string, { now: EPGEntry | null; next: EPGEntry | null }> = {};
  for (const [ch, arr] of Object.entries(byCh)) {
    arr.sort((a, b) => a.start.localeCompare(b.start));
    const live =
      arr.find((p) => new Date(p.start).getTime() <= now && new Date(p.end).getTime() >= now) ??
      null;
    const next = live
      ? (arr.find((p) => new Date(p.start).getTime() > new Date(live.end).getTime() - 1) ?? null)
      : (arr[0] ?? null);
    out[ch] = { now: live, next };
  }
  return out;
}

async function buildEpg(): Promise<EPGData> {
  const guides = (await (await fetch(GUIDES_URL)).json()) as RawGuide[];
  // Prioritize by language
  const sorted = guides
    .filter((g) => g.sources && g.sources.length > 0)
    .sort((a, b) => {
      const ai = PRIORITY_LANGS.indexOf(a.lang ?? "");
      const bi = PRIORITY_LANGS.indexOf(b.lang ?? "");
      const av = ai === -1 ? 99 : ai;
      const bv = bi === -1 ? 99 : bi;
      return av - bv;
    });
  const urls = new Set<string>();
  for (const g of sorted) {
    if (urls.size >= MAX_SOURCES) break;
    const u = g.sources?.[0]?.url;
    if (u) urls.add(u);
  }
  const programs: EPGData["programs"] = {};
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const results = await Promise.allSettled(
    Array.from(urls).map((u) => fetchAndParse(u, controller.signal)),
  );
  clearTimeout(timeout);
  for (const r of results) {
    if (r.status === "fulfilled") {
      Object.assign(programs, r.value);
    }
  }
  return { updated_at: new Date().toISOString(), programs };
}

let cached: { at: number; data: EPGData } | null = null;
const TTL_MS = 21_600_000;

export const Route = createFileRoute("/api/epg")({
  server: {
    handlers: {
      GET: async () => {
        try {
          if (!cached || Date.now() - cached.at > TTL_MS) {
            const data = await buildEpg();
            cached = { at: Date.now(), data };
          }
          return new Response(JSON.stringify(cached.data), {
            headers: {
              "content-type": "application/json",
              "cache-control": "public, max-age=1800, s-maxage=21600, stale-while-revalidate=86400",
            },
          });
        } catch (e) {
          return new Response(
            JSON.stringify({ updated_at: new Date().toISOString(), programs: {} }),
            {
              headers: { "content-type": "application/json" },
            },
          );
        }
      },
    },
  },
});
