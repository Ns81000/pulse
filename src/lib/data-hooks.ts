import { useQuery } from "@tanstack/react-query";
import type { Catalog, EPGData, ChannelStatus } from "./types";

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

type CheckStatus = Exclude<ChannelStatus, "idle" | "checking" | "recovering">;

const verifiedCache = new Map<string, { status: CheckStatus; timestamp: number }>();
const activeChecks = new Map<string, Promise<CheckStatus>>();

export async function checkStream(
  url: string,
  referrer: string | null,
  user_agent: string | null,
  force = false,
): Promise<CheckStatus> {
  if (!force) {
    const cached = verifiedCache.get(url);
    if (cached) {
      const ttl = cached.status === "online" ? 30000 : 5000;
      if (Date.now() - cached.timestamp < ttl) {
        return cached.status;
      }
      verifiedCache.delete(url);
    }
  }

  // Deduplicate active checks
  const active = activeChecks.get(url);
  if (active) {
    return active;
  }

  const promise = (async (): Promise<CheckStatus> => {
    try {
      const r = await fetch("/api/check-stream", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url, referrer, user_agent }),
      });
      if (!r.ok) return "error";
      const j = (await r.json()) as { status: CheckStatus };

      // Cache the result
      verifiedCache.set(url, { status: j.status, timestamp: Date.now() });
      return j.status;
    } catch {
      return "error";
    } finally {
      activeChecks.delete(url);
    }
  })();

  activeChecks.set(url, promise);
  return promise;
}
