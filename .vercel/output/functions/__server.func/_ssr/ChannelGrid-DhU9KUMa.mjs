import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useFavourites, t as ChannelCard } from "./use-favourites-CxjJPCnd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ChannelGrid-DhU9KUMa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 60;
function ChannelGrid({ catalog, channelIds }) {
	const [limit, setLimit] = (0, import_react.useState)(PAGE);
	const { favSet, refresh: refreshFavs } = useFavourites();
	(0, import_react.useEffect)(() => setLimit(PAGE), [channelIds]);
	const flagByCountry = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		catalog.meta.countries.forEach((c) => m.set(c.code, c.flag));
		return m;
	}, [catalog]);
	const countryNameByCode = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		catalog.meta.countries.forEach((c) => m.set(c.code, c.name));
		return m;
	}, [catalog]);
	const catNameById = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		catalog.meta.categories.forEach((c) => m.set(c.id, c.name));
		return (id) => m.get(id) ?? id;
	}, [catalog]);
	(0, import_react.useEffect)(() => {
		const sentinel = document.getElementById("grid-sentinel");
		if (!sentinel) return;
		const io = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) setLimit((l) => Math.min(l + PAGE, channelIds.length));
		});
		io.observe(sentinel);
		return () => io.disconnect();
	}, [channelIds.length, limit]);
	const visible = channelIds.slice(0, limit);
	if (channelIds.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid place-items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] px-6 py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-[var(--text-secondary)]",
			children: "No channels match these filters."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
			children: visible.map((id) => {
				const ch = catalog.channels[id];
				if (!ch) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelCard, {
					channel: ch,
					flag: flagByCountry.get(ch.country),
					countryName: countryNameByCode.get(ch.country),
					isFavourite: favSet.has(id),
					onFavouriteChange: refreshFavs,
					categoryName: catNameById
				}, id);
			})
		}),
		limit < channelIds.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "grid-sentinel",
			className: "h-16 w-full"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-[11px] text-[var(--text-tertiary)]",
			children: [
				"Showing ",
				visible.length,
				" of ",
				channelIds.length
			]
		})
	] });
}
//#endregion
export { ChannelGrid as t };
