import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as useCatalog, o as listFavourites, s as listHistory } from "./stream-messages-Bqm6fwz2.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as Heart } from "../_libs/lucide-react.mjs";
import { n as useFavourites, t as ChannelCard } from "./use-favourites-CxjJPCnd.mjs";
import { t as ChannelGrid } from "./ChannelGrid-DhU9KUMa.mjs";
import { t as HorizScrollShelf } from "./HorizScrollShelf-TyzQTtPT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favourites-CaxOqT7e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AlternativesShelf({ catalog, title = "Try these instead", failedChannelId, ids: explicit }) {
	const { favSet, refresh: refreshFavs } = useFavourites();
	const flagByCountry = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		catalog.meta.countries.forEach((c) => m.set(c.code, c.flag));
		return m;
	}, [catalog]);
	const ids = (0, import_react.useMemo)(() => {
		if (explicit) return explicit.slice(0, 12);
		const failed = failedChannelId ? catalog.channels[failedChannelId] : null;
		if (!failed) return catalog.indexes.all_ids.slice(0, 12);
		const failedCats = new Set(failed.categories);
		const failedCountry = failed.country;
		const scored = [];
		for (const id of catalog.indexes.all_ids) {
			if (id === failed.id) continue;
			const c = catalog.channels[id];
			if (!c) continue;
			const overlap = c.categories.filter((x) => failedCats.has(x)).length;
			if (overlap === 0) continue;
			const score = overlap * 10 + (c.country === failedCountry ? 5 : 0);
			scored.push({
				id,
				score
			});
		}
		scored.sort((a, b) => b.score - a.score);
		const result = scored.slice(0, 12).map((s) => s.id);
		if (result.length < 8) for (const id of catalog.indexes.all_ids) {
			if (id === failed.id) continue;
			if (!result.includes(id)) result.push(id);
			if (result.length >= 12) break;
		}
		return result;
	}, [
		catalog,
		failedChannelId,
		explicit
	]);
	if (ids.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 font-display text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)]",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizScrollShelf, { children: ids.map((id) => {
			const c = catalog.channels[id];
			if (!c) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-[200px] shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelCard, {
					channel: c,
					flag: flagByCountry.get(c.country),
					isFavourite: favSet.has(id),
					onFavouriteChange: refreshFavs
				})
			}, id);
		}) })]
	});
}
function FavPage() {
	const cat = useCatalog();
	const [favIds, setFavIds] = (0, import_react.useState)([]);
	const [recent, setRecent] = (0, import_react.useState)([]);
	const [recommended, setRecommended] = (0, import_react.useState)([]);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const load = async () => {
			const [favs, hist] = await Promise.all([listFavourites(), listHistory()]);
			setFavIds(favs.sort((a, b) => b.added_at.localeCompare(a.added_at)).map((f) => f.channelId));
			const seen = /* @__PURE__ */ new Set();
			setRecent(hist.filter((h) => seen.has(h.channelId) ? false : (seen.add(h.channelId), true)).slice(0, 12).map((h) => h.channelId));
			setLoaded(true);
		};
		load();
		window.addEventListener("favchange", load);
		return () => window.removeEventListener("favchange", load);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!cat.data || recent.length === 0) {
			setRecommended([]);
			return;
		}
		const catScore = /* @__PURE__ */ new Map();
		recent.forEach((id, i) => {
			const c = cat.data.channels[id];
			if (!c) return;
			const weight = 1 - i * .05;
			c.categories.forEach((cat) => catScore.set(cat, (catScore.get(cat) ?? 0) + weight));
		});
		const recentSet = new Set(recent);
		const favSet = new Set(favIds);
		const scored = [];
		for (const id of cat.data.indexes.all_ids) {
			if (recentSet.has(id) || favSet.has(id)) continue;
			const c = cat.data.channels[id];
			let s = 0;
			for (const cc of c.categories) s += catScore.get(cc) ?? 0;
			if (s > 0) scored.push({
				id,
				s
			});
		}
		scored.sort((a, b) => b.s - a.s);
		setRecommended(scored.slice(0, 12).map((x) => x.id));
	}, [
		cat.data,
		recent,
		favIds
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold tracking-tight sm:text-3xl",
			children: "Your library"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[13px] text-[var(--text-secondary)]",
			children: "Favourites, recent watches, and picks based on what you've watched."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mb-4 flex items-center gap-2 font-display text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3.5" }), " Favourites"]
			}), !loaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
				children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer aspect-video w-full rounded-md" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-3 w-3/4 rounded-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-2.5 w-1/2 rounded-full" })
					]
				}, i))
			}) : favIds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid place-items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] px-6 py-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--text-secondary)]",
					children: "No favourites yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/browse",
					className: "btn-primary mt-3",
					children: "Find channels"
				})]
			}) : cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGrid, {
				catalog: cat.data,
				channelIds: favIds
			})]
		}),
		recent.length > 0 && cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]",
				children: "Recently watched"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlternativesShelf, {
				catalog: cat.data,
				ids: recent,
				title: ""
			})]
		}),
		recent.length > 0 && !cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer mb-4 h-3 w-36 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3 overflow-hidden",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-[200px] shrink-0 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer aspect-video w-full rounded-md" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-3 w-3/4 rounded-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-2.5 w-1/2 rounded-full" })
					]
				}, i))
			})]
		}),
		recommended.length > 0 && cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-[13px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]",
				children: "Because you watched"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlternativesShelf, {
				catalog: cat.data,
				ids: recommended,
				title: ""
			})]
		})
	] });
}
//#endregion
export { FavPage as component };
