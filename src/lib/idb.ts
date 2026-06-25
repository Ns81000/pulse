import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "iptv-local";
const DB_VERSION = 1;

export interface FavouriteRecord {
  channelId: string;
  added_at: string;
}
export interface HistoryRecord {
  channelId: string;
  watched_at: string;
  duration_ms: number;
}

let dbp: Promise<IDBPDatabase> | null = null;

export function getDB() {
  if (typeof window === "undefined") return null;
  if (!dbp) {
    dbp = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("favourites")) {
          db.createObjectStore("favourites", { keyPath: "channelId" });
        }
        if (!db.objectStoreNames.contains("history")) {
          const s = db.createObjectStore("history", { keyPath: "watched_at" });
          s.createIndex("by_channel", "channelId");
        }
        if (!db.objectStoreNames.contains("preferences")) {
          db.createObjectStore("preferences", { keyPath: "key" });
        }
      },
    });
  }
  return dbp;
}

export async function listFavourites(): Promise<FavouriteRecord[]> {
  const db = await getDB();
  if (!db) return [];
  return db.getAll("favourites");
}

export async function addFavourite(channelId: string) {
  const db = await getDB();
  if (!db) return;
  await db.put("favourites", { channelId, added_at: new Date().toISOString() });
  window.dispatchEvent(new CustomEvent("favchange"));
}

export async function removeFavourite(channelId: string) {
  const db = await getDB();
  if (!db) return;
  await db.delete("favourites", channelId);
  window.dispatchEvent(new CustomEvent("favchange"));
}

export async function isFavourite(channelId: string): Promise<boolean> {
  const db = await getDB();
  if (!db) return false;
  return Boolean(await db.get("favourites", channelId));
}

export async function recordHistory(channelId: string, duration_ms = 0) {
  const db = await getDB();
  if (!db) return;
  await db.put("history", {
    channelId,
    watched_at: new Date().toISOString(),
    duration_ms,
  });
  // Prune to last 200
  const tx = db.transaction("history", "readwrite");
  const all = await tx.store.getAll();
  if (all.length > 200) {
    all.sort((a, b) => a.watched_at.localeCompare(b.watched_at));
    const drop = all.length - 200;
    for (let i = 0; i < drop; i++) {
      await tx.store.delete(all[i].watched_at);
    }
  }
  await tx.done;
}

export async function listHistory(): Promise<HistoryRecord[]> {
  const db = await getDB();
  if (!db) return [];
  const all = (await db.getAll("history")) as HistoryRecord[];
  return all.sort((a, b) => b.watched_at.localeCompare(a.watched_at));
}
