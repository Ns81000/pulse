import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Catalog, EPGData, ChannelStatus, CatalogChannel } from "./types";
import { listHealth, recordHealth } from "./idb";

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
  // Client-side mixed content detection:
  if (
    typeof window !== "undefined" &&
    window.location.protocol === "https:" &&
    url.startsWith("http://")
  ) {
    return "blocked";
  }
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

// --- USER COUNTRY DETECTION ---
let countryGuess = "";
if (typeof window !== "undefined") {
  try {
    const loc = (Intl.DateTimeFormat().resolvedOptions().locale || "").split("-");
    countryGuess = (loc[1] || "").toUpperCase() || "US";
  } catch {
    countryGuess = "US";
  }
}

let activeCountry =
  typeof window !== "undefined" ? localStorage.getItem("tela-user-country") || countryGuess : "US";
const countryListeners = new Set<(c: string) => void>();

export function useUserCountry() {
  const [c, setC] = useState(activeCountry);
  useEffect(() => {
    const handler = (newC: string) => setC(newC);
    countryListeners.add(handler);
    return () => {
      countryListeners.delete(handler);
    };
  }, []);
  return c;
}

// Background GeoIP refinement
if (typeof window !== "undefined" && !localStorage.getItem("tela-user-country")) {
  (async () => {
    try {
      const r = await fetch("https://ipapi.co/json/");
      if (r.ok) {
        const j = (await r.json()) as { country_code?: string };
        const code = (j.country_code || "").toUpperCase();
        if (code && code.length === 2) {
          localStorage.setItem("tela-user-country", code);
          activeCountry = code;
          countryListeners.forEach((l) => l(code));
        }
      }
    } catch (e) {
      console.warn("GeoIP lookup failed, using locale default:", e);
    }
  })();
}

// --- IN-MEMORY HEALTH REGISTRY ---
let healthRegistry: Record<string, CheckStatus> = {};
let workingIndexRegistry: Record<string, number> = {};
const healthListeners = new Set<(h: typeof healthRegistry) => void>();

if (typeof window !== "undefined") {
  // Initial load from IndexedDB
  listHealth().then((records) => {
    for (const [id, r] of Object.entries(records)) {
      healthRegistry[id] = r.status;
      if (r.workingIndex !== undefined) {
        workingIndexRegistry[id] = r.workingIndex;
      }
    }
    healthListeners.forEach((l) => l({ ...healthRegistry }));
  });

  window.addEventListener("healthchange", () => {
    listHealth().then((records) => {
      const next: typeof healthRegistry = {};
      const nextIdx: typeof workingIndexRegistry = {};
      for (const [id, r] of Object.entries(records)) {
        next[id] = r.status;
        if (r.workingIndex !== undefined) {
          nextIdx[id] = r.workingIndex;
        }
      }
      healthRegistry = next;
      workingIndexRegistry = nextIdx;
      healthListeners.forEach((l) => l({ ...healthRegistry }));
    });
  });
}

export function useStreamHealth() {
  const [h, setH] = useState(healthRegistry);
  useEffect(() => {
    const handler = (next: typeof healthRegistry) => setH(next);
    healthListeners.add(handler);
    return () => {
      healthListeners.delete(handler);
    };
  }, []);
  return h;
}

export function getWorkingStreamIndex(channelId: string): number {
  return workingIndexRegistry[channelId] ?? 0;
}

// --- BACKGROUND CHECKING QUEUE ---
const checkQueue: { id: string; streams: CatalogChannel["streams"] }[] = [];
const checkingSet = new Set<string>();
let activePings = 0;
const MAX_CONCURRENT_PINGS = 2;

function processQueue() {
  if (activePings >= MAX_CONCURRENT_PINGS || checkQueue.length === 0) return;

  const next = checkQueue.shift();
  if (!next) return;

  activePings++;
  checkingSet.add(next.id);

  (async () => {
    let finalStatus: CheckStatus = "error";
    let workingIndex = 0;

    for (let i = 0; i < next.streams.length; i++) {
      const s = next.streams[i];
      if (
        typeof window !== "undefined" &&
        window.location.protocol === "https:" &&
        s.url.startsWith("http://")
      ) {
        finalStatus = "blocked";
        continue;
      }

      try {
        const res = await checkStream(s.url, s.referrer, s.user_agent);
        if (res === "online") {
          finalStatus = "online";
          workingIndex = i;
          break;
        } else {
          finalStatus = res;
        }
      } catch {
        finalStatus = "error";
      }
    }

    await recordHealth(next.id, finalStatus, workingIndex);
  })()
    .catch(() => {
      // ignore
    })
    .finally(() => {
      activePings--;
      checkingSet.delete(next.id);
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => processQueue(), { timeout: 1000 });
      } else {
        setTimeout(processQueue, 200);
      }
    });

  if (activePings < MAX_CONCURRENT_PINGS) {
    setTimeout(processQueue, 50);
  }
}

export function queueBackgroundCheck(channelId: string, streams: CatalogChannel["streams"]) {
  if (typeof window === "undefined") return;
  if (checkingSet.has(channelId)) return;
  if (healthRegistry[channelId]) return;
  if (checkQueue.some((q) => q.id === channelId)) return;

  checkQueue.push({ id: channelId, streams });

  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => processQueue());
  } else {
    setTimeout(processQueue, 100);
  }
}

// --- CHANNEL SORTING UTILITY ---
export function sortChannels(
  channelIds: string[],
  channels: Record<string, CatalogChannel>,
  userCountry: string,
  health: Record<string, CheckStatus>,
): string[] {
  return channelIds.slice().sort((a, b) => {
    const chA = channels[a];
    const chB = channels[b];
    if (!chA || !chB) return 0;

    const hA = health[a];
    const hB = health[b];

    // Priority: online (1) > unchecked (0) > error/blocked/timeout (-1)
    const pA = hA === "online" ? 1 : !hA ? 0 : -1;
    const pB = hB === "online" ? 1 : !hB ? 0 : -1;

    if (pA !== pB) {
      return pB - pA;
    }

    const gA = chA.country === userCountry ? 1 : 0;
    const gB = chB.country === userCountry ? 1 : 0;

    if (gA !== gB) {
      return gB - gA;
    }

    return 0;
  });
}
