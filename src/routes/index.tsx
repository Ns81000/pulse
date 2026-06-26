import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { ImmersiveLanding } from "@/components/landing/ImmersiveLanding";
import {
  useCatalog,
  useUserCountry,
  useStreamHealth,
  sortChannels,
} from "@/lib/data-hooks";
import { ChannelCard } from "@/components/ChannelCard";
import { HorizScrollShelf } from "@/components/HorizScrollShelf";
import { useFavourites } from "@/hooks/use-favourites";
import { BackgroundPingTrigger } from "@/components/BackgroundPingTrigger";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse — Feel Everything" },
      {
        name: "description",
        content:
          "Browse and watch thousands of free IPTV channels. Verified live at every click — no dead ends.",
      },
      { property: "og:title", content: "Pulse — Feel Everything" },
      {
        property: "og:description",
        content: "Browse and watch thousands of free IPTV channels. Verified live at every click.",
      },
    ],
  }),
  component: Index,
});

function Shelf({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function HorizScroll({ children }: { children: React.ReactNode }) {
  return <HorizScrollShelf>{children}</HorizScrollShelf>;
}

function Index() {
  const cat = useCatalog();
  const { favSet, refresh: refreshFavs } = useFavourites();
  const userCountry = useUserCountry();
  const health = useStreamHealth();

  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't seen the landing page
    const viewed = localStorage.getItem("pulse_landing_viewed");
    if (!viewed) {
      setShowLanding(true);
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.removeAttribute("data-landing-active");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCloseLanding = () => {
    localStorage.setItem("pulse_landing_viewed", "true");
    setShowLanding(false);
    document.body.style.overflow = "";
    document.documentElement.removeAttribute("data-landing-active");
  };

  const featured = useMemo(() => {
    if (!cat.data) return null;
    const flagBy = new Map(cat.data.meta.countries.map((c) => [c.code, c.flag]));
    const catName = (id: string) => cat.data!.meta.categories.find((c) => c.id === id)?.name ?? id;
    return { flagBy, catName };
  }, [cat.data]);

  const popularByCategory = useMemo(() => {
    if (!cat.data) return [] as { id: string; name: string; ids: string[] }[];
    const PRIORITIES = ["news", "sports", "movies", "entertainment", "music", "documentary"];
    return PRIORITIES.map((id) => {
      const categoryIds = cat.data!.indexes.by_category[id] ?? [];
      const sorted = sortChannels(categoryIds, cat.data!.channels, userCountry, health);
      return {
        id,
        name: cat.data!.meta.categories.find((c) => c.id === id)?.name ?? id,
        ids: sorted.slice(0, 12),
      };
    }).filter((s) => s.ids.length > 0);
  }, [cat.data, userCountry, health]);

  const visibleIdsForBackgroundCheck = useMemo(() => {
    const ids = new Set<string>();
    for (const shelf of popularByCategory) {
      for (const id of shelf.ids.slice(0, 3)) ids.add(id);
    }
    return Array.from(ids);
  }, [popularByCategory]);

  return (
    <div>
      {showLanding && <ImmersiveLanding onClose={handleCloseLanding} />}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)]">
        {/* ── Subtle noise texture for depth ── */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
        
        {/* ── Accent line - connects content to decoration ── */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[var(--border-subtle)] to-transparent opacity-40"
          aria-hidden="true"
        />

        {/* ── Desktop layout ── */}
        <div className="hidden sm:flex items-center justify-between gap-4 px-12 py-14">
          {/* Left: text content */}
          <div className="relative z-10 flex-1">
              <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--text-tertiary)] hero-item" style={{ animationDelay: '0ms' }}>
                Free · No account · Verified live
              </p>
              <h1 className="mt-4 font-display font-bold text-[var(--text-primary)] hero-item" style={{ fontSize: "4rem", letterSpacing: "-0.04em", lineHeight: 1.1, animationDelay: '60ms' }}>
                Pulse
              </h1>
              <div className="mt-2 hero-item" style={{ animationDelay: '110ms' }}>
                <p className="font-mono text-[12px] font-medium tracking-[0.35em] text-[var(--text-tertiary)] uppercase">
                  Feel Everything
                </p>
                {/* Accent underscore below tagline */}
                <div className="mt-1 h-[2px] w-9 rounded-full bg-[var(--accent)]" />
              </div>

              <div className="mt-7 flex flex-wrap gap-2 hero-item" style={{ animationDelay: '170ms' }}>
                <Link to="/browse" className="btn-primary inline-flex items-center gap-1.5">
                  Browse channels <ArrowRight className="size-3.5" />
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11.5px] text-[var(--text-tertiary)] hero-item" style={{ animationDelay: '220ms' }}>
                {cat.data && (
                  <>
                    <span><strong className="text-[var(--text-primary)]">{cat.data.indexes.all_ids.length.toLocaleString()}</strong> channels</span>
                    <span><strong className="text-[var(--text-primary)]">{cat.data.meta.countries.filter((c) => (cat.data!.indexes.by_country[c.code]?.length ?? 0) > 0).length}</strong> countries</span>
                    <span><strong className="text-[var(--text-primary)]">{cat.data.meta.languages.filter((l) => (cat.data!.indexes.by_language[l.code]?.length ?? 0) > 0).length}</strong> languages</span>
                  </>
                )}
                {!cat.data && cat.isLoading && <span className="shimmer h-3 w-32 rounded" />}
              </div>
          </div>

          {/* Right: dot matrix decoration */}
          <div className="shrink-0 opacity-80 hero-item" aria-hidden="true" style={{ animationDelay: '140ms' }}>
            <svg width="160" height="160" viewBox="-7 -7 131 131" xmlns="http://www.w3.org/2000/svg">
              <circle cx="0" cy="0" r="7" fill="#34343a"/>
              <circle cx="0" cy="22" r="7" fill="#e5484d"/>
              <circle cx="0" cy="44" r="7" fill="#e5484d"/>
              <circle cx="0" cy="66" r="7" fill="#e5484d"/>
              <circle cx="0" cy="88" r="7" fill="#e5484d"/>
              <circle cx="0" cy="110" r="7" fill="#e5484d"/>
              <circle cx="22" cy="0" r="7" fill="#34343a"/>
              <circle cx="22" cy="22" r="7" fill="#34343a"/>
              <circle cx="22" cy="44" r="7" fill="#e5484d"/>
              <circle cx="22" cy="66" r="7" fill="#34343a"/>
              <circle cx="22" cy="88" r="7" fill="#34343a"/>
              <circle cx="22" cy="110" r="7" fill="#e5484d"/>
              <circle cx="44" cy="0" r="7" fill="#34343a"/>
              <circle cx="44" cy="22" r="7" fill="#34343a"/>
              <circle cx="44" cy="44" r="7" fill="#34343a"/>
              <circle cx="44" cy="66" r="7" fill="#34343a"/>
              <circle cx="44" cy="88" r="7" fill="#34343a"/>
              <circle cx="44" cy="110" r="7" fill="#e5484d"/>
              <circle cx="66" cy="0" r="7" fill="#e5484d"/>
              <circle cx="66" cy="22" r="7" fill="#e5484d"/>
              <circle cx="66" cy="44" r="7" fill="#e5484d"/>
              <circle cx="66" cy="66" r="7" fill="#e5484d"/>
              <circle cx="66" cy="88" r="7" fill="#e5484d"/>
              <circle cx="66" cy="110" r="7" fill="#e5484d"/>
              <circle cx="88" cy="0" r="7" fill="#e5484d"/>
              <circle cx="88" cy="22" r="7" fill="#34343a"/>
              <circle cx="88" cy="44" r="7" fill="#34343a"/>
              <circle cx="88" cy="66" r="7" fill="#e5484d"/>
              <circle cx="88" cy="88" r="7" fill="#34343a"/>
              <circle cx="88" cy="110" r="7" fill="#e5484d"/>
              <circle cx="110" cy="0" r="7" fill="#34343a"/>
              <circle cx="110" cy="22" r="7" fill="#e5484d"/>
              <circle cx="110" cy="44" r="7" fill="#e5484d"/>
              <circle cx="110" cy="66" r="7" fill="#34343a"/>
              <circle cx="110" cy="88" r="7" fill="#e5484d"/>
              <circle cx="110" cy="110" r="7" fill="#34343a"/>
            </svg>
          </div>
        </div>

        {/* ── Mobile layout — clean, minimal ── */}
        <div className="flex flex-col gap-5 px-5 py-8 sm:hidden">
          <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
            Free · No account · Verified live
          </p>

          {/* Wordmark row with SVG at right */}
          <div className="flex items-start justify-between">
            {/* Wordmark + tagline */}
            <div>
              <h1 className="font-display text-[2.6rem] font-bold text-[var(--text-primary)]" style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}>
                Pulse
              </h1>
              <div className="mt-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--text-tertiary)]">Feel Everything</p>
                <div className="mt-1 h-[2px] w-7 rounded-full bg-[var(--accent)]" />
              </div>
            </div>

            {/* Dot matrix mark — top right */}
            <svg width="72" height="72" viewBox="-7 -7 131 131" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0 opacity-90 mt-3">
              <circle cx="0" cy="0" r="7" fill="#34343a"/>
              <circle cx="0" cy="22" r="7" fill="#e5484d"/>
              <circle cx="0" cy="44" r="7" fill="#e5484d"/>
              <circle cx="0" cy="66" r="7" fill="#e5484d"/>
              <circle cx="0" cy="88" r="7" fill="#e5484d"/>
              <circle cx="0" cy="110" r="7" fill="#e5484d"/>
              <circle cx="22" cy="0" r="7" fill="#34343a"/>
              <circle cx="22" cy="22" r="7" fill="#34343a"/>
              <circle cx="22" cy="44" r="7" fill="#e5484d"/>
              <circle cx="22" cy="66" r="7" fill="#34343a"/>
              <circle cx="22" cy="88" r="7" fill="#34343a"/>
              <circle cx="22" cy="110" r="7" fill="#e5484d"/>
              <circle cx="44" cy="0" r="7" fill="#34343a"/>
              <circle cx="44" cy="22" r="7" fill="#34343a"/>
              <circle cx="44" cy="44" r="7" fill="#34343a"/>
              <circle cx="44" cy="66" r="7" fill="#34343a"/>
              <circle cx="44" cy="88" r="7" fill="#34343a"/>
              <circle cx="44" cy="110" r="7" fill="#e5484d"/>
              <circle cx="66" cy="0" r="7" fill="#e5484d"/>
              <circle cx="66" cy="22" r="7" fill="#e5484d"/>
              <circle cx="66" cy="44" r="7" fill="#e5484d"/>
              <circle cx="66" cy="66" r="7" fill="#e5484d"/>
              <circle cx="66" cy="88" r="7" fill="#e5484d"/>
              <circle cx="66" cy="110" r="7" fill="#e5484d"/>
              <circle cx="88" cy="0" r="7" fill="#e5484d"/>
              <circle cx="88" cy="22" r="7" fill="#34343a"/>
              <circle cx="88" cy="44" r="7" fill="#34343a"/>
              <circle cx="88" cy="66" r="7" fill="#e5484d"/>
              <circle cx="88" cy="88" r="7" fill="#34343a"/>
              <circle cx="88" cy="110" r="7" fill="#e5484d"/>
              <circle cx="110" cy="0" r="7" fill="#34343a"/>
              <circle cx="110" cy="22" r="7" fill="#e5484d"/>
              <circle cx="110" cy="44" r="7" fill="#e5484d"/>
              <circle cx="110" cy="66" r="7" fill="#34343a"/>
              <circle cx="110" cy="88" r="7" fill="#e5484d"/>
              <circle cx="110" cy="110" r="7" fill="#34343a"/>
            </svg>
          </div>

          <Link to="/browse" className="btn-primary inline-flex w-fit items-center gap-1 px-4 py-2 text-[12px]">
            Browse channels <ArrowRight className="size-3" />
          </Link>

          <div className="flex gap-5 font-mono text-[10.5px] text-[var(--text-tertiary)]">
            {cat.data && (
              <>
                <span><strong className="text-[var(--text-primary)]">{cat.data.indexes.all_ids.length.toLocaleString()}</strong> channels</span>
                <span><strong className="text-[var(--text-primary)]">{cat.data.meta.countries.filter((c) => (cat.data!.indexes.by_country[c.code]?.length ?? 0) > 0).length}</strong> countries</span>
                <span><strong className="text-[var(--text-primary)]">{cat.data.meta.languages.filter((l) => (cat.data!.indexes.by_language[l.code]?.length ?? 0) > 0).length}</strong> lang</span>
              </>
            )}
            {!cat.data && cat.isLoading && <span className="shimmer h-2.5 w-28 rounded" />}
          </div>
        </div>
      </section>

      {cat.isLoading && (
        <div className="mt-12 space-y-12">
          {/* Shelf skeleton × 3 */}
          {Array.from({ length: 3 }).map((_, s) => (
            <section key={s}>
              {/* Shelf label */}
              <div className="shimmer mb-4 h-2.5 w-20 rounded-full" />
              {/* Horizontal card row */}
              <div className="flex gap-3 overflow-hidden">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-[210px] shrink-0 space-y-2">
                    <div className="shimmer aspect-video w-full rounded-md" />
                    <div className="shimmer h-3 w-3/4 rounded-full" />
                    <div className="shimmer h-2.5 w-1/2 rounded-full" />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {cat.data && featured && (
        <>
          <BackgroundPingTrigger
            channelIds={visibleIdsForBackgroundCheck}
            channels={cat.data.channels}
            limit={24}
          />
          {popularByCategory.map((shelf) => (
            <Shelf key={shelf.id} title={shelf.name}>
              <HorizScroll>
                {shelf.ids.map((id) => {
                  const c = cat.data!.channels[id];
                  if (!c) return null;
                  return (
                    <div key={id} className="w-[210px] shrink-0">
                      <ChannelCard
                        channel={c}
                        flag={featured.flagBy.get(c.country)}
                        categoryName={featured.catName}
                        isFavourite={favSet.has(id)}
                        onFavouriteChange={refreshFavs}
                      />
                    </div>
                  );
                })}
              </HorizScroll>
            </Shelf>
          ))}
        </>
      )}
    </div>
  );
}
