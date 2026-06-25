import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useCatalog, useEpg } from "@/lib/data-hooks";
import { ChannelCard } from "@/components/ChannelCard";
import { HorizScrollShelf } from "@/components/HorizScrollShelf";
import { useFavourites } from "@/hooks/use-favourites";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tela — Watch the world live" },
      {
        name: "description",
        content:
          "Browse and watch thousands of free IPTV channels. Verified live at every click — no dead ends.",
      },
      { property: "og:title", content: "Tela — Watch the world live" },
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
  const epg = useEpg();
  const { favSet, refresh: refreshFavs } = useFavourites();

  const featured = useMemo(() => {
    if (!cat.data) return null;
    const flagBy = new Map(cat.data.meta.countries.map((c) => [c.code, c.flag]));
    const catName = (id: string) => cat.data!.meta.categories.find((c) => c.id === id)?.name ?? id;
    return { flagBy, catName };
  }, [cat.data]);

  const onNowIds = useMemo(() => {
    if (!cat.data || !epg.data) return [];
    const out: string[] = [];
    for (const id of cat.data.indexes.all_ids) {
      if (epg.data.programs[id]?.now) {
        out.push(id);
        if (out.length >= 14) break;
      }
    }
    return out;
  }, [cat.data, epg.data]);

  const popularByCategory = useMemo(() => {
    if (!cat.data) return [] as { id: string; name: string; ids: string[] }[];
    const PRIORITIES = ["news", "sports", "movies", "entertainment", "music", "documentary"];
    return PRIORITIES.map((id) => ({
      id,
      name: cat.data!.meta.categories.find((c) => c.id === id)?.name ?? id,
      ids: (cat.data!.indexes.by_category[id] ?? []).slice(0, 12),
    })).filter((s) => s.ids.length > 0);
  }, [cat.data]);

  return (
    <div>
      <section className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)] px-6 py-14 sm:px-12 sm:py-20">
        <div className="relative z-10 max-w-2xl">
          <p className="font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--text-tertiary)]">
            Free · No account · Verified live
          </p>
          <h1
            className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            Watch the world,
            <br />
            <span className="text-[var(--text-tertiary)]">live.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Thousands of public IPTV channels — news, sports, films, music — from every continent.
            Every channel is verified the instant you click. No dead ends.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Link to="/browse" className="btn-primary inline-flex items-center gap-1.5">
              Browse channels <ArrowRight className="size-3.5" />
            </Link>
            <Link to="/guide" className="btn-ghost">
              Live guide
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11.5px] text-[var(--text-tertiary)]">
            {cat.data && (
              <>
                <span>
                  <strong className="text-[var(--text-primary)]">
                    {cat.data.indexes.all_ids.length.toLocaleString()}
                  </strong>{" "}
                  channels
                </span>
                <span>
                  <strong className="text-[var(--text-primary)]">
                    {
                      cat.data.meta.countries.filter(
                        (c) => (cat.data!.indexes.by_country[c.code]?.length ?? 0) > 0,
                      ).length
                    }
                  </strong>{" "}
                  countries
                </span>
                <span>
                  <strong className="text-[var(--text-primary)]">
                    {
                      cat.data.meta.languages.filter(
                        (l) => (cat.data!.indexes.by_language[l.code]?.length ?? 0) > 0,
                      ).length
                    }
                  </strong>{" "}
                  languages
                </span>
              </>
            )}
            {!cat.data && cat.isLoading && <span className="shimmer h-3 w-32 rounded" />}
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
          {onNowIds.length > 0 && (
            <Shelf title="On now">
              <HorizScroll>
                {onNowIds.map((id) => {
                  const c = cat.data!.channels[id];
                  return (
                    <div key={id} className="w-[210px] shrink-0">
                      <ChannelCard
                        channel={c}
                        flag={featured.flagBy.get(c.country)}
                        epg={epg.data?.programs[id]}
                        categoryName={featured.catName}
                        isFavourite={favSet.has(id)}
                        onFavouriteChange={refreshFavs}
                      />
                    </div>
                  );
                })}
              </HorizScroll>
            </Shelf>
          )}

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
                        epg={epg.data?.programs[id]}
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
