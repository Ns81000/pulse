import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useCatalog, useEpg } from "@/lib/data-hooks";
import { listFavourites, listHistory } from "@/lib/idb";
import { ChannelGrid } from "@/components/ChannelGrid";
import { AlternativesShelf } from "@/components/AlternativesShelf";

export const Route = createFileRoute("/favourites")({
  head: () => ({
    meta: [
      { title: "Favourites — Tela" },
      { name: "description", content: "Your saved IPTV channels and recent watch history." },
    ],
  }),
  component: FavPage,
});

function FavPage() {
  const cat = useCatalog();
  const epg = useEpg();
  const [favIds, setFavIds] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [recommended, setRecommended] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [favs, hist] = await Promise.all([listFavourites(), listHistory()]);
      setFavIds(favs.sort((a, b) => b.added_at.localeCompare(a.added_at)).map((f) => f.channelId));
      const seen = new Set<string>();
      const dedup = hist.filter((h) =>
        seen.has(h.channelId) ? false : (seen.add(h.channelId), true),
      );
      setRecent(dedup.slice(0, 12).map((h) => h.channelId));
      setLoaded(true);
    };

    load();
    window.addEventListener("favchange", load);
    return () => window.removeEventListener("favchange", load);
  }, []);

  // Recommendations: channels sharing categories with history
  useEffect(() => {
    if (!cat.data || recent.length === 0) {
      setRecommended([]);
      return;
    }
    const catScore = new Map<string, number>();
    recent.forEach((id, i) => {
      const c = cat.data!.channels[id];
      if (!c) return;
      const weight = 1 - i * 0.05;
      c.categories.forEach((cat) => catScore.set(cat, (catScore.get(cat) ?? 0) + weight));
    });
    const recentSet = new Set(recent);
    const favSet = new Set(favIds);
    const scored: { id: string; s: number }[] = [];
    for (const id of cat.data.indexes.all_ids) {
      if (recentSet.has(id) || favSet.has(id)) continue;
      const c = cat.data.channels[id];
      let s = 0;
      for (const cc of c.categories) s += catScore.get(cc) ?? 0;
      if (s > 0) scored.push({ id, s });
    }
    scored.sort((a, b) => b.s - a.s);
    setRecommended(scored.slice(0, 12).map((x) => x.id));
  }, [cat.data, recent, favIds]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Your library
      </h1>
      <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
        Favourites, recent watches, and picks based on what you've watched.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 font-display text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          <Heart className="size-3.5" /> Favourites
        </h2>
        {!loaded ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="shimmer aspect-video w-full rounded-md" />
                <div className="shimmer h-3 w-3/4 rounded-full" />
                <div className="shimmer h-2.5 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        ) : favIds.length === 0 ? (
          <div className="grid place-items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] px-6 py-12 text-center">
            <p className="text-sm text-[var(--text-secondary)]">No favourites yet.</p>
            <Link to="/browse" className="btn-primary mt-3">
              Find channels
            </Link>
          </div>
        ) : (
          cat.data && <ChannelGrid catalog={cat.data} epg={epg.data} channelIds={favIds} />
        )}
      </section>

      {recent.length > 0 && cat.data && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
            Recently watched
          </h2>
          <AlternativesShelf catalog={cat.data} epg={epg.data} ids={recent} title="" />
        </section>
      )}

      {/* Recently watched shelf skeleton */}
      {recent.length > 0 && !cat.data && (
        <section className="mt-10">
          <div className="shimmer mb-4 h-3 w-36 rounded-full" />
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-[200px] shrink-0 space-y-2">
                <div className="shimmer aspect-video w-full rounded-md" />
                <div className="shimmer h-3 w-3/4 rounded-full" />
                <div className="shimmer h-2.5 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {recommended.length > 0 && cat.data && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
            Because you watched
          </h2>
          <AlternativesShelf catalog={cat.data} epg={epg.data} ids={recommended} title="" />
        </section>
      )}
    </div>
  );
}
