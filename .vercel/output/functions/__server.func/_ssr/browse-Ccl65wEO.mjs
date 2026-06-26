import { l as lazyRouteComponent, u as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/browse-Ccl65wEO.js
var search = objectType({
	category: stringType().optional(),
	language: stringType().optional(),
	country: stringType().optional(),
	q: stringType().optional(),
	sort: enumType([
		"name",
		"country",
		"popular"
	]).optional()
});
var $$splitComponentImporter = () => import("./browse-BxJGB-bK.mjs");
var Route = createFileRoute("/browse")({
	validateSearch: search,
	head: () => ({ meta: [
		{ title: "Browse — Pulse" },
		{
			name: "description",
			content: "Filter thousands of live IPTV channels by category, language, and country."
		},
		{
			property: "og:title",
			content: "Browse — Pulse"
		},
		{
			property: "og:description",
			content: "Filter thousands of live IPTV channels by category, language, and country."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
