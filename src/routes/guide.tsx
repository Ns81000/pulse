import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useRef } from "react";
import { Tv } from "lucide-react";
import {
  useCatalog,
  useEpg,
  useUserCountry,
  useStreamHealth,
  sortChannels,
} from "@/lib/data-hooks";
import { BackgroundPingTrigger } from "@/components/BackgroundPingTrigger";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "What's on now — Tela" },
      {
        name: "description",
        content:
          "Live program guide across the IPTV catalog. Timeline of what's playing right now.",
      },
      { property: "og:title", content: "What's on now — Tela" },
      { property: "og:description", content: "Live program guide across the IPTV catalog." },
    ],
  }),
  component: GuidePage,
});

const HOUR_PX = 240; // 1 hour = 240px on the timeline

function GuidePage() {
  const cat = useCatalog();
  const epg = useEpg();
  const navigate = useNavigate();
  const [country, setCountry] = useState<string>("");
  const [now, setNow] = useState(() => new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const userCountry = useUserCountry();
  const health = useStreamHealth();

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  // Default to user's country guess
  useEffect(() => {
    if (country || !cat.data) return;
    if (userCountry && cat.data.indexes.by_country[userCountry]) {
      setCountry(userCountry);
    } else {
      try {
        const loc = (Intl.DateTimeFormat().resolvedOptions().locale || "").split("-");
        const cc = (loc[1] || "").toUpperCase();
        if (cc && cat.data.indexes.by_country[cc]) setCountry(cc);
      } catch {
        // Ignore locale parsing errors
      }
    }
  }, [cat.data, country, userCountry]);

  const countriesWithEpg = useMemo(() => {
    if (!cat.data || !epg.data)
      return [] as { code: string; name: string; flag: string; count: number }[];
    const m = new Map<string, number>();
    for (const id of Object.keys(epg.data.programs)) {
      const ch = cat.data.channels[id];
      if (!ch) continue;
      if (!epg.data.programs[id]?.now) continue;
      m.set(ch.country, (m.get(ch.country) ?? 0) + 1);
    }
    return cat.data.meta.countries
      .map((c) => ({ ...c, count: m.get(c.code) ?? 0 }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [cat.data, epg.data]);

  const channels = useMemo(() => {
    if (!cat.data || !epg.data)
      return [] as {
        id: string;
        name: string;
        logo: string | null;
        now: { title: string; start: Date; end: Date };
        next: { title: string; start: Date; end: Date } | null;
      }[];
    const base = country ? (cat.data.indexes.by_country[country] ?? []) : cat.data.indexes.all_ids;

    // Filter first, then sort, then take top 80
    const activeEpgIds = base.filter((id) => epg.data!.programs[id]?.now);
    const sorted = sortChannels(activeEpgIds, cat.data.channels, userCountry, health);

    const out: {
      id: string;
      name: string;
      logo: string | null;
      now: { title: string; start: Date; end: Date };
      next: { title: string; start: Date; end: Date } | null;
    }[] = [];
    for (const id of sorted) {
      const p = epg.data.programs[id];
      if (!p?.now) continue;
      const ch = cat.data.channels[id];
      if (!ch) continue;
      out.push({
        id,
        name: ch.name,
        logo: ch.logo_url,
        now: { title: p.now.title, start: new Date(p.now.start), end: new Date(p.now.end) },
        next: p.next
          ? { title: p.next.title, start: new Date(p.next.start), end: new Date(p.next.end) }
          : null,
      });
      if (out.length >= 80) break;
    }
    return out;
  }, [cat.data, epg.data, country, userCountry, health]);

  // Timeline window: from current hour - 1 to + 5 hours
  const windowStart = useMemo(() => {
    const d = new Date(now);
    d.setMinutes(0, 0, 0);
    d.setHours(d.getHours() - 1);
    return d;
  }, [now]);
  const hours = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(windowStart);
    d.setHours(d.getHours() + i);
    return d;
  });
  const xForTime = (d: Date) => ((d.getTime() - windowStart.getTime()) / 3_600_000) * HOUR_PX;
  const nowX = xForTime(now);

  // Auto-scroll to "now" once channels loaded
  useEffect(() => {
    if (!scrollRef.current || channels.length === 0) return;
    scrollRef.current.scrollLeft = Math.max(0, nowX - 120);
  }, [channels.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const loading = cat.isLoading || epg.isLoading;
  const empty = !loading && channels.length === 0;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Live guide
          </h1>
          <p className="mt-1 text-[13px] text-[var(--text-tertiary)]">
            {loading ? "Loading guide…" : `${channels.length} channels broadcasting now`}
          </p>
        </div>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="input-field !w-auto"
          aria-label="Country"
          disabled={countriesWithEpg.length === 0}
        >
          <option value="">All countries</option>
          {countriesWithEpg.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name} ({c.count})
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)]">
          <div className="flex">
            {/* Channel rail skeleton */}
            <div className="shrink-0 border-r border-[var(--border-subtle)]">
              {/* Header cell */}
              <div className="h-10 w-[180px] border-b border-[var(--border-subtle)] bg-[var(--surface-2)] sm:w-[220px]" />
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-16 w-[180px] items-center gap-2.5 border-b border-[var(--border-subtle)] px-3 sm:w-[220px]"
                >
                  <div className="shimmer size-10 shrink-0 rounded-md" />
                  <div className="shimmer h-3 flex-1 rounded-full" />
                </div>
              ))}
            </div>
            {/* Timeline skeleton */}
            <div className="flex-1 overflow-hidden">
              {/* Hour header */}
              <div className="flex h-10 border-b border-[var(--border-subtle)] bg-[var(--surface-2)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center border-r border-[var(--border-subtle)] px-3"
                    style={{ minWidth: "180px" }}
                  >
                    <div className="shimmer h-2.5 w-14 rounded-full" />
                  </div>
                ))}
              </div>
              {/* Program block rows */}
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-16 items-center gap-2 border-b border-[var(--border-subtle)] px-3"
                >
                  <div
                    className="shimmer h-9 rounded-md"
                    style={{ width: `${140 + (i % 4) * 60}px` }}
                  />
                  <div
                    className="shimmer h-9 rounded-md"
                    style={{ width: `${100 + (i % 3) * 50}px` }}
                  />
                  <div
                    className="shimmer h-9 rounded-md"
                    style={{ width: `${120 + (i % 2) * 40}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {empty && (
        <div className="grid place-items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)] px-6 py-16 text-center">
          <Tv className="size-7 text-[var(--text-disabled)]" strokeWidth={1.5} />
          <p className="mt-3 text-[14px] text-[var(--text-secondary)]">
            No program data for this selection.
          </p>
          <p className="mt-1 max-w-sm text-[12px] text-[var(--text-tertiary)]">
            EPG coverage from iptv-org varies by region. Try another country or browse all channels.
          </p>
          <button onClick={() => navigate({ to: "/browse" })} className="btn-primary mt-4">
            Browse channels
          </button>
        </div>
      )}

      {!loading && !empty && (
        <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)]">
          <BackgroundPingTrigger
            channelIds={channels.map((c) => c.id)}
            channels={cat.data!.channels}
            limit={10}
          />
          <div className="flex">
            {/* Channel rail */}
            <div className="shrink-0 border-r border-[var(--border-subtle)]">
              <div className="sticky top-0 z-10 h-10 border-b border-[var(--border-subtle)] bg-[var(--surface-2)]" />
              {channels.map((c) => (
                <button
                  key={c.id}
                  onClick={() => navigate({ to: "/watch/$channelId", params: { channelId: c.id } })}
                  className="flex h-16 w-[180px] items-center gap-2.5 border-b border-[var(--border-subtle)] px-3 text-left transition-colors hover:bg-[var(--surface-2)] sm:w-[220px]"
                >
                  <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-md bg-[var(--surface-base)]">
                    {c.logo ? (
                      <img src={c.logo} alt="" className="max-h-[80%] max-w-[80%] object-contain" />
                    ) : (
                      <Tv className="size-4 text-[var(--text-disabled)]" />
                    )}
                  </div>
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{c.name}</span>
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div ref={scrollRef} className="relative flex-1 overflow-x-auto">
              <div className="relative" style={{ width: HOUR_PX * 7 }}>
                {/* Hour header */}
                <div className="sticky top-0 z-10 flex h-10 border-b border-[var(--border-subtle)] bg-[var(--surface-2)]">
                  {hours.map((h, i) => (
                    <div
                      key={i}
                      className="border-r border-[var(--border-subtle)] px-3 py-2 font-mono text-[11px] text-[var(--text-tertiary)]"
                      style={{ width: HOUR_PX }}
                    >
                      {h.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  ))}
                </div>
                {/* Now line */}
                <div
                  className="pointer-events-none absolute bottom-0 top-10 z-20 w-px bg-[var(--accent)]"
                  style={{ left: nowX }}
                >
                  <span className="absolute -left-[5px] -top-1 size-[11px] rounded-full bg-[var(--accent)]" />
                </div>
                {/* Rows */}
                {channels.map((c) => {
                  const blocks = [c.now, c.next].filter(Boolean) as {
                    title: string;
                    start: Date;
                    end: Date;
                  }[];
                  return (
                    <div
                      key={c.id}
                      className="relative h-16 border-b border-[var(--border-subtle)]"
                    >
                      {blocks.map((b, i) => {
                        const x = Math.max(0, xForTime(b.start));
                        const w = Math.max(40, xForTime(b.end) - x);
                        const isNow = b.start <= now && b.end >= now;
                        return (
                          <button
                            key={i}
                            onClick={() =>
                              navigate({ to: "/watch/$channelId", params: { channelId: c.id } })
                            }
                            className={`absolute top-1.5 bottom-1.5 overflow-hidden rounded-md border px-2.5 py-1.5 text-left text-[12px] transition-colors ${isNow ? "border-[var(--accent)]/40 bg-[var(--accent-subtle)] text-[var(--text-primary)]" : "border-[var(--border-subtle)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:bg-[var(--surface-3)]"}`}
                            style={{ left: x, width: w - 4 }}
                            title={b.title}
                          >
                            <p className="truncate font-medium">{b.title}</p>
                            <p className="truncate text-[10px] text-[var(--text-tertiary)]">
                              {b.start.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
