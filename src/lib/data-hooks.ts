import { useQuery } from "@tanstack/react-query";
import type { Catalog, EPGData } from "./types";

async function fetchCatalog(): Promise<Catalog> {
  const r = await fetch("/api/catalog");
  if (!r.ok) throw new Error("Catalog fetch failed");
  return r.json();
}

async function fetchEpg(): Promise<EPGData> {
  const r = await fetch("/api/epg");
  if (!r.ok) return { updated_at: new Date().toISOString(), programs: {} };
  return r.json();
}

export function useCatalog() {
  return useQuery({
    queryKey: ["catalog"],
    queryFn: fetchCatalog,
    staleTime: 1000 * 60 * 60 * 12,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function useEpg() {
  return useQuery({
    queryKey: ["epg"],
    queryFn: fetchEpg,
    staleTime: 1000 * 60 * 60 * 3,
    gcTime: 1000 * 60 * 60 * 12,
  });
}

export async function checkStream(url: string, referrer: string | null, user_agent: string | null) {
  const r = await fetch("/api/check-stream", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ url, referrer, user_agent }),
  });
  if (!r.ok) return "error" as const;
  const j = (await r.json()) as { status: "online" | "blocked" | "timeout" | "error" };
  return j.status;
}
