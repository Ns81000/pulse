import { useMemo } from "react";
import { ChannelCard } from "./ChannelCard";
import { HorizScrollShelf } from "./HorizScrollShelf";
import { useFavourites } from "@/hooks/use-favourites";
import type { Catalog, EPGData } from "@/lib/types";

interface Props {
  catalog: Catalog;
  epg?: EPGData;
  title?: string;
  failedChannelId?: string;
  ids?: string[];
}

export function AlternativesShelf({ catalog, epg, title = "Try these instead", failedChannelId, ids: explicit }: Props) {
  const { favSet, refresh: refreshFavs } = useFavourites();
  const flagByCountry = useMemo(() => {
    const m = new Map<string, string>();
    catalog.meta.countries.forEach((c) => m.set(c.code, c.flag));
    return m;
  }, [catalog]);

  const ids = useMemo(() => {
    if (explicit) return explicit.slice(0, 12);
    const failed = failedChannelId ? catalog.channels[failedChannelId] : null;
    if (!failed) {
      return catalog.indexes.all_ids.slice(0, 12);
    }
    const failedCats = new Set(failed.categories);
    const failedCountry = failed.country;
    const scored: { id: string; score: number }[] = [];
    for (const id of catalog.indexes.all_ids) {
      if (id === failed.id) continue;
      const c = catalog.channels[id];
      if (!c) continue;
      const overlap = c.categories.filter((x) => failedCats.has(x)).length;
      if (overlap === 0) continue;
      const score = overlap * 10 + (c.country === failedCountry ? 5 : 0);
      scored.push({ id, score });
    }
    scored.sort((a, b) => b.score - a.score);
    let result = scored.slice(0, 12).map((s) => s.id);
    if (result.length < 8) {
      // Fallback: catalog order
      for (const id of catalog.indexes.all_ids) {
        if (id === failed.id) continue;
        if (!result.includes(id)) result.push(id);
        if (result.length >= 12) break;
      }
    }
    return result;
  }, [catalog, failedChannelId, explicit]);

  if (ids.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="mb-3 font-display text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)]">
        {title}
      </h2>
      <HorizScrollShelf>
        {ids.map((id) => {
          const c = catalog.channels[id];
          if (!c) return null;
          return (
            <div key={id} className="w-[200px] shrink-0">
              <ChannelCard
                channel={c}
                flag={flagByCountry.get(c.country)}
                epg={epg?.programs[id]}
                isFavourite={favSet.has(id)}
                onFavouriteChange={refreshFavs}
              />
            </div>
          );
        })}
      </HorizScrollShelf>
    </section>
  );
}
