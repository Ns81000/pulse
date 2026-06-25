import { useState, useEffect, useCallback } from "react";
import { listFavourites } from "@/lib/idb";

export function useFavourites() {
  const [favSet, setFavSet] = useState<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    const list = await listFavourites();
    setFavSet(new Set(list.map((f) => f.channelId)));
  }, []);

  useEffect(() => {
    refresh();
    // Re-sync whenever any component adds or removes a favourite
    window.addEventListener("favchange", refresh);
    return () => window.removeEventListener("favchange", refresh);
  }, [refresh]);

  return { favSet, refresh };
}
