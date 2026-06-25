import { useEffect, useState, useMemo, useCallback } from "react";
import { ChannelCard } from "./ChannelCard";
import type { Catalog, EPGData } from "@/lib/types";
import { useFavourites } from "@/hooks/use-favourites";

interface Props {
  catalog: Catalog;
  epg?: EPGData;
  channelIds: string[];
}

const PAGE = 60;

export function ChannelGrid({ catalog, epg, channelIds }: Props) {
  const [limit, setLimit] = useState(PAGE);
  const { favSet, refresh: refreshFavs } = useFavourites();

  useEffect(() => setLimit(PAGE), [channelIds]);

  const flagByCountry = useMemo(() => {
    const m = new Map<string, string>();
    catalog.meta.countries.forEach((c) => m.set(c.code, c.flag));
    return m;
  }, [catalog]);

  const countryNameByCode = useMemo(() => {
    const m = new Map<string, string>();
    catalog.meta.countries.forEach((c) => m.set(c.code, c.name));
    return m;
  }, [catalog]);

  const catNameById = useMemo(() => {
    const m = new Map<string, string>();
    catalog.meta.categories.forEach((c) => m.set(c.id, c.name));
    return (id: string) => m.get(id) ?? id;
  }, [catalog]);

  // IntersectionObserver to autoload
  useEffect(() => {
    const sentinel = document.getElementById("grid-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setLimit((l) => Math.min(l + PAGE, channelIds.length));
      }
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, [channelIds.length, limit]);

  const visible = channelIds.slice(0, limit);

  if (channelIds.length === 0) {
    return (
      <div className="grid place-items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-secondary)]">No channels match these filters.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visible.map((id) => {
          const ch = catalog.channels[id];
          if (!ch) return null;
          return (
            <ChannelCard
              key={id}
              channel={ch}
              flag={flagByCountry.get(ch.country)}
              countryName={countryNameByCode.get(ch.country)}
              epg={epg?.programs[id]}
              isFavourite={favSet.has(id)}
              onFavouriteChange={refreshFavs}
              categoryName={catNameById}
            />
          );
        })}
      </div>
      {limit < channelIds.length && <div id="grid-sentinel" className="h-16 w-full" />}
      <p className="mt-6 text-center text-[11px] text-[var(--text-tertiary)]">
        Showing {visible.length} of {channelIds.length}
      </p>
    </div>
  );
}
