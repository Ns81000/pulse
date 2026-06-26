import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as require_react_dom } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as openDB } from "../_libs/idb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stream-messages-Bqm6fwz2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var PlayerCtx = (0, import_react.createContext)(null);
function PlayerProvider({ children }) {
	const [channel, setChannel] = (0, import_react.useState)(null);
	const [workingStreamIndex, setWorkingStreamIndex] = (0, import_react.useState)(0);
	const [mode, setMode] = (0, import_react.useState)("hidden");
	const [hostId, setHostId] = (0, import_react.useState)(0);
	const videoRef = (0, import_react.useRef)(null);
	const [videoElState, setVideoElState] = (0, import_react.useState)(null);
	const stageRef = (0, import_react.useRef)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	const open = (0, import_react.useCallback)((c, streamIndex = 0) => {
		setChannel(c);
		setWorkingStreamIndex(streamIndex);
		setMode("inline");
	}, []);
	const close = (0, import_react.useCallback)(() => {
		setChannel(null);
		setMode("hidden");
		const v = videoRef.current;
		if (v) try {
			v.pause();
			v.removeAttribute("src");
			v.load();
		} catch {}
	}, []);
	const mountInto = (0, import_react.useCallback)((el) => {
		const v = videoRef.current;
		if (!v) return;
		const target = el ?? stageRef.current;
		if (!target) return;
		if (v.parentElement !== target) target.appendChild(v);
		setHostId((n) => n + 1);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		channel,
		workingStreamIndex,
		open,
		close,
		videoEl: videoElState,
		mountInto,
		hostId,
		mode,
		setMode
	}), [
		channel,
		workingStreamIndex,
		open,
		close,
		videoElState,
		mountInto,
		hostId,
		mode
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlayerCtx.Provider, {
		value,
		children: [children, mounted && (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: stageRef,
			"aria-hidden": true,
			style: {
				position: "fixed",
				left: -99999,
				top: -99999,
				width: 1,
				height: 1,
				overflow: "hidden"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: (el) => {
					videoRef.current = el;
					setVideoElState(el);
				},
				playsInline: true
			})
		}), document.body)]
	});
}
function usePlayer() {
	const ctx = (0, import_react.useContext)(PlayerCtx);
	if (!ctx) throw new Error("usePlayer outside PlayerProvider");
	return ctx;
}
var DB_NAME = "iptv-local";
var DB_VERSION = 2;
var dbp = null;
function getDB() {
	if (typeof window === "undefined") return Promise.resolve(null);
	if (!dbp) dbp = openDB(DB_NAME, DB_VERSION, { upgrade(db, oldVersion) {
		if (oldVersion < 1) {
			if (!db.objectStoreNames.contains("favourites")) db.createObjectStore("favourites", { keyPath: "channelId" });
			if (!db.objectStoreNames.contains("history")) db.createObjectStore("history", { keyPath: "watched_at" }).createIndex("by_channel", "channelId");
			if (!db.objectStoreNames.contains("preferences")) db.createObjectStore("preferences", { keyPath: "key" });
		}
		if (oldVersion < 2) {
			if (!db.objectStoreNames.contains("stream_health")) db.createObjectStore("stream_health", { keyPath: "channelId" });
		}
	} }).catch(() => {
		dbp = null;
		return null;
	});
	return dbp;
}
async function listFavourites() {
	const db = await getDB();
	if (!db) return [];
	return db.getAll("favourites");
}
async function addFavourite(channelId) {
	const db = await getDB();
	if (!db) return;
	await db.put("favourites", {
		channelId,
		added_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	window.dispatchEvent(new CustomEvent("favchange"));
}
async function removeFavourite(channelId) {
	const db = await getDB();
	if (!db) return;
	await db.delete("favourites", channelId);
	window.dispatchEvent(new CustomEvent("favchange"));
}
async function isFavourite(channelId) {
	const db = await getDB();
	if (!db) return false;
	return Boolean(await db.get("favourites", channelId));
}
async function recordHistory(channelId, duration_ms = 0) {
	const db = await getDB();
	if (!db) return;
	const tx = db.transaction("history", "readwrite");
	await tx.store.put({
		channelId,
		watched_at: (/* @__PURE__ */ new Date()).toISOString(),
		duration_ms
	});
	const all = await tx.store.getAll();
	if (all.length > 200) {
		all.sort((a, b) => a.watched_at.localeCompare(b.watched_at));
		const drop = all.length - 200;
		for (let i = 0; i < drop; i++) await tx.store.delete(all[i].watched_at);
	}
	await tx.done;
}
async function listHistory() {
	const db = await getDB();
	if (!db) return [];
	return (await db.getAll("history")).sort((a, b) => b.watched_at.localeCompare(a.watched_at));
}
async function recordHealth(channelId, status, workingIndex) {
	const db = await getDB();
	if (!db) return;
	let existingIndex = workingIndex;
	if (existingIndex === void 0) try {
		const existing = await db.get("stream_health", channelId);
		if (existing && existing.workingIndex !== void 0) existingIndex = existing.workingIndex;
	} catch {}
	await db.put("stream_health", {
		channelId,
		status,
		checked_at: (/* @__PURE__ */ new Date()).toISOString(),
		workingIndex: existingIndex
	});
	window.dispatchEvent(new CustomEvent("healthchange"));
}
async function listHealth() {
	const db = await getDB();
	if (!db) return {};
	const all = await db.getAll("stream_health");
	const out = {};
	for (const r of all) out[r.channelId] = r;
	return out;
}
function getAbsoluteUrl(path) {
	if (typeof window !== "undefined") return path;
	const isServer = typeof process !== "undefined" && process.env;
	const productionUrl = isServer ? process.env.VERCEL_PROJECT_PRODUCTION_URL : void 0;
	const vercelUrl = isServer ? process.env.VERCEL_URL : void 0;
	const port = isServer ? process.env.PORT : void 0;
	return `${productionUrl ? `https://${productionUrl}` : vercelUrl ? `https://${vercelUrl}` : `http://localhost:${port || 3e3}`}${path}`;
}
async function fetchCatalog() {
	const r = await fetch(getAbsoluteUrl("/api/catalog"));
	if (!r.ok) throw new Error("Catalog fetch failed");
	return r.json();
}
function useCatalog() {
	return useQuery({
		queryKey: ["catalog"],
		queryFn: fetchCatalog,
		staleTime: 1e3 * 60 * 60 * 12,
		gcTime: 1e3 * 60 * 60 * 24
	});
}
var verifiedCache = /* @__PURE__ */ new Map();
var activeChecks = /* @__PURE__ */ new Map();
async function checkStream(url, referrer, user_agent, force = false) {
	if (typeof window !== "undefined" && window.location.protocol === "https:" && url.startsWith("http://")) return "blocked";
	if (!force) {
		const cached = verifiedCache.get(url);
		if (cached) {
			const ttl = cached.status === "online" ? 3e4 : 5e3;
			if (Date.now() - cached.timestamp < ttl) return cached.status;
			verifiedCache.delete(url);
		}
	}
	const active = activeChecks.get(url);
	if (active) return active;
	const promise = (async () => {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 8e3);
		try {
			const r = await fetch(getAbsoluteUrl("/api/check-stream"), {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					url,
					referrer,
					user_agent
				}),
				signal: controller.signal
			});
			clearTimeout(timeout);
			if (!r.ok) return "error";
			const j = await r.json();
			verifiedCache.set(url, {
				status: j.status,
				timestamp: Date.now()
			});
			return j.status;
		} catch {
			clearTimeout(timeout);
			return "error";
		} finally {
			activeChecks.delete(url);
		}
	})();
	activeChecks.set(url, promise);
	return promise;
}
var countryGuess = "";
if (typeof window !== "undefined") try {
	countryGuess = ((Intl.DateTimeFormat().resolvedOptions().locale || "").split("-")[1] || "").toUpperCase() || "US";
} catch {
	countryGuess = "US";
}
var activeCountry = typeof window !== "undefined" ? localStorage.getItem("pulse-user-country") || countryGuess : "US";
var countryListeners = /* @__PURE__ */ new Set();
function useUserCountry() {
	const [c, setC] = (0, import_react.useState)("US");
	(0, import_react.useEffect)(() => {
		setC(activeCountry);
		const handler = (newC) => setC(newC);
		countryListeners.add(handler);
		return () => {
			countryListeners.delete(handler);
		};
	}, []);
	return c;
}
if (typeof window !== "undefined" && !localStorage.getItem("pulse-user-country")) (async () => {
	try {
		const r = await fetch("https://ipapi.co/json/");
		if (r.ok) {
			const code = ((await r.json()).country_code || "").toUpperCase();
			if (code && code.length === 2) {
				localStorage.setItem("pulse-user-country", code);
				activeCountry = code;
				countryListeners.forEach((l) => l(code));
			}
		}
	} catch (e) {
		console.warn("GeoIP lookup failed, using locale default:", e);
	}
})();
var healthRegistry = {};
var workingIndexRegistry = {};
var healthListeners = /* @__PURE__ */ new Set();
if (typeof window !== "undefined") {
	listHealth().then((records) => {
		for (const [id, r] of Object.entries(records)) {
			healthRegistry[id] = r.status;
			if (r.workingIndex !== void 0) workingIndexRegistry[id] = r.workingIndex;
		}
		healthListeners.forEach((l) => l({ ...healthRegistry }));
	});
	window.addEventListener("healthchange", () => {
		listHealth().then((records) => {
			const next = {};
			const nextIdx = {};
			for (const [id, r] of Object.entries(records)) {
				next[id] = r.status;
				if (r.workingIndex !== void 0) nextIdx[id] = r.workingIndex;
			}
			healthRegistry = next;
			workingIndexRegistry = nextIdx;
			healthListeners.forEach((l) => l({ ...healthRegistry }));
		});
	});
}
function useStreamHealth() {
	const [h, setH] = (0, import_react.useState)(healthRegistry);
	(0, import_react.useEffect)(() => {
		const handler = (next) => setH(next);
		healthListeners.add(handler);
		return () => {
			healthListeners.delete(handler);
		};
	}, []);
	return h;
}
function useChannelHealth(channelId) {
	const [status, setStatus] = (0, import_react.useState)(healthRegistry[channelId] ?? "idle");
	(0, import_react.useEffect)(() => {
		const handler = (next) => {
			const nextStatus = next[channelId] ?? "idle";
			setStatus((prev) => prev === nextStatus ? prev : nextStatus);
		};
		healthListeners.add(handler);
		const current = healthRegistry[channelId] ?? "idle";
		setStatus((prev) => prev === current ? prev : current);
		return () => {
			healthListeners.delete(handler);
		};
	}, [channelId]);
	return status;
}
function getWorkingStreamIndex(channelId) {
	return workingIndexRegistry[channelId] ?? 0;
}
var checkQueue = [];
var checkingSet = /* @__PURE__ */ new Set();
var activePings = 0;
var MAX_CONCURRENT_PINGS = 2;
function processQueue() {
	if (activePings >= MAX_CONCURRENT_PINGS || checkQueue.length === 0) return;
	const next = checkQueue.shift();
	if (!next) return;
	activePings++;
	checkingSet.add(next.id);
	(async () => {
		let finalStatus = "error";
		let workingIndex = 0;
		for (let i = 0; i < next.streams.length; i++) {
			const s = next.streams[i];
			if (typeof window !== "undefined" && window.location.protocol === "https:" && s.url.startsWith("http://")) {
				finalStatus = "blocked";
				continue;
			}
			try {
				const res = await checkStream(s.url, s.referrer, s.user_agent);
				if (res === "online") {
					finalStatus = "online";
					workingIndex = i;
					break;
				} else finalStatus = res;
			} catch {
				finalStatus = "error";
			}
		}
		await recordHealth(next.id, finalStatus, workingIndex);
	})().catch(() => {}).finally(() => {
		activePings--;
		checkingSet.delete(next.id);
		if (typeof window !== "undefined" && "requestIdleCallback" in window) window.requestIdleCallback(() => processQueue(), { timeout: 1e3 });
		else setTimeout(processQueue, 200);
	});
	if (activePings < MAX_CONCURRENT_PINGS) setTimeout(processQueue, 50);
}
function queueBackgroundCheck(channelId, streams) {
	if (typeof window === "undefined") return;
	if (checkingSet.has(channelId)) return;
	if (healthRegistry[channelId]) return;
	if (checkQueue.some((q) => q.id === channelId)) return;
	checkQueue.push({
		id: channelId,
		streams
	});
	if (typeof window !== "undefined" && "requestIdleCallback" in window) window.requestIdleCallback(() => processQueue());
	else setTimeout(processQueue, 100);
}
function sortChannels(channelIds, channels, userCountry, health) {
	return channelIds.slice().sort((a, b) => {
		const chA = channels[a];
		const chB = channels[b];
		if (!chA || !chB) return 0;
		const hA = health[a];
		const hB = health[b];
		const pA = hA === "online" ? 1 : !hA ? 0 : -1;
		const pB = hB === "online" ? 1 : !hB ? 0 : -1;
		if (pA !== pB) return pB - pA;
		const gA = chA.country === userCountry ? 1 : 0;
		const gB = chB.country === userCountry ? 1 : 0;
		if (gA !== gB) return gB - gA;
		return 0;
	});
}
/** Single source of truth for stream check result messages */
var STREAM_MSG = {
	blocked: "Geo-blocked from this region",
	timeout: "Stream is slow to respond",
	error: "Stream is offline right now",
	unknown: "Couldn't reach this channel"
};
function streamErrorMsg(status) {
	return STREAM_MSG[status] ?? STREAM_MSG.unknown;
}
//#endregion
export { useStreamHealth as _, isFavourite as a, queueBackgroundCheck as c, removeFavourite as d, sortChannels as f, usePlayer as g, useChannelHealth as h, getWorkingStreamIndex as i, recordHealth as l, useCatalog as m, addFavourite as n, listFavourites as o, streamErrorMsg as p, checkStream as r, listHistory as s, PlayerProvider as t, recordHistory as u, useUserCountry as v };
