import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as useStreamHealth, f as sortChannels, m as useCatalog, v as useUserCountry } from "./stream-messages-Bqm6fwz2.mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./browse-Ccl65wEO.mjs";
import { C as ChevronRight, D as ArrowUpDown, E as Check, T as ChevronDown, c as SlidersHorizontal, n as X, u as Search, w as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as ChannelGrid } from "./ChannelGrid-DhU9KUMa.mjs";
import { t as BackgroundPingTrigger } from "./BackgroundPingTrigger-C69E0hvS.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/browse-BxJGB-bK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CODE_MAP$1 = {
	uk: "gb",
	int: ""
};
function toFlagCode$1(code) {
	const lower = code.toLowerCase();
	return CODE_MAP$1[lower] ?? lower;
}
function FacetGroup({ label, options, active, onSelect, isCountry }) {
	const [open, setOpen] = (0, import_react.useState)(true);
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => options.filter((o) => !q || o.name.toLowerCase().includes(q.toLowerCase())).slice(0, 50), [options, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-[var(--border-subtle)] py-5 last:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			className: "flex w-full items-center justify-between text-[11px] font-medium uppercase tracking-wider text-[var(--text-secondary)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `size-3.5 transition-transform ${open ? "" : "-rotate-90"}` })]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 space-y-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "input-field !py-1.5 !text-[12px]",
				placeholder: `Search ${label.toLowerCase()}…`,
				value: q,
				onChange: (e) => setQ(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-80 overflow-y-auto pr-1",
				children: [filtered.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(active === o.id ? void 0 : o.id),
					className: `flex w-full items-center justify-between rounded-[4px] px-2 py-1.5 text-left text-[12px] transition-colors ${active === o.id ? "bg-[var(--accent-subtle)] text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [isCountry && o.id ? (() => {
							const code = toFlagCode$1(o.id);
							if (!code) return null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `https://flagcdn.com/w20/${code}.png`,
								srcSet: `https://flagcdn.com/w40/${code}.png 2x`,
								width: 20,
								height: 15,
								alt: o.name,
								className: "shrink-0 rounded-[2px] object-cover"
							});
						})() : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: o.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 shrink-0 text-[10px] text-[var(--text-tertiary)]",
						children: o.count
					})]
				}, o.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 py-2 text-[11px] text-[var(--text-tertiary)]",
					children: "No matches"
				})]
			})]
		})]
	});
}
function FilterPanel({ catalog, selected, onChange }) {
	const langs = (0, import_react.useMemo)(() => catalog.meta.languages.map((l) => ({
		id: l.code,
		name: l.name,
		count: catalog.indexes.by_language[l.code]?.length ?? 0
	})).filter((l) => l.count > 0).sort((a, b) => b.count - a.count), [catalog]);
	const countries = (0, import_react.useMemo)(() => catalog.meta.countries.map((c) => ({
		id: c.code,
		name: c.name,
		flag: c.flag,
		count: catalog.indexes.by_country[c.code]?.length ?? 0
	})).filter((c) => c.count > 0).sort((a, b) => b.count - a.count), [catalog]);
	const hasAny = selected.category || selected.language || selected.country;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-sm font-medium",
					children: "Filters"
				}), hasAny && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onChange({
						category: void 0,
						language: void 0,
						country: void 0
					}),
					className: "inline-flex items-center gap-1 text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" }), "Clear"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacetGroup, {
				label: "Country",
				options: countries,
				active: selected.country,
				isCountry: true,
				onSelect: (id) => onChange({
					...selected,
					country: id
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FacetGroup, {
				label: "Language",
				options: langs,
				active: selected.language,
				onSelect: (id) => onChange({
					...selected,
					language: id
				})
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Drawer$1 = ({ shouldScaleBackground = true, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
	shouldScaleBackground,
	...props
});
Drawer$1.displayName = "Drawer";
Drawer.Trigger;
var DrawerPortal = Drawer.Portal;
var DrawerClose = Drawer.Close;
var DrawerOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80", className),
	...props
}));
DrawerOverlay.displayName = Drawer.Overlay.displayName;
var DrawerContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
	ref,
	className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }), children]
})] }));
DrawerContent.displayName = "DrawerContent";
var DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("grid gap-1.5 p-4 text-center sm:text-left", className),
	...props
});
DrawerHeader.displayName = "DrawerHeader";
var DrawerFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("mt-auto flex flex-col gap-2 p-4", className),
	...props
});
DrawerFooter.displayName = "DrawerFooter";
var DrawerTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DrawerTitle.displayName = Drawer.Title.displayName;
var DrawerDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DrawerDescription.displayName = Drawer.Description.displayName;
var CODE_MAP = {
	uk: "gb",
	int: ""
};
function toFlagCode(code) {
	const lower = code.toLowerCase();
	return CODE_MAP[lower] ?? lower;
}
function Section({ label, options, active, onSelect, isCountry }) {
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => options.filter((o) => !q || o.name.toLowerCase().includes(q.toLowerCase())).slice(0, 60), [options, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]",
					children: label
				}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onSelect(void 0),
					className: "flex items-center gap-1 rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)] transition-opacity active:opacity-70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-2.5" }), "Clear"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--text-tertiary)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "h-9 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-8 pr-3 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] transition-colors",
						placeholder: `Search ${label.toLowerCase()}…`,
						value: q,
						onChange: (e) => setQ(e.target.value)
					}),
					q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setQ(""),
						className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] active:text-[var(--text-primary)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-0.5",
				children: [filtered.map((o, i) => {
					const isActive = active === o.id;
					const flagCode = isCountry ? toFlagCode(o.id) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(isActive ? void 0 : o.id),
						style: { animationDelay: `${i * 18}ms` },
						className: `stagger-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-150 active:scale-[0.98] ${isActive ? "bg-[var(--accent-subtle)] text-[var(--accent)]" : "text-[var(--text-secondary)] active:bg-[var(--surface-3)]"}`,
						children: [
							flagCode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `https://flagcdn.com/w20/${flagCode}.png`,
								srcSet: `https://flagcdn.com/w40/${flagCode}.png 2x`,
								width: 20,
								height: 15,
								alt: "",
								className: "shrink-0 rounded-[3px] object-cover shadow-sm"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 shrink-0 rounded-full ${isActive ? "bg-[var(--accent)]" : "bg-[var(--border-default)]"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate text-[13px] font-medium",
								children: o.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `shrink-0 text-[11px] tabular-nums ${isActive ? "text-[var(--accent)]/70" : "text-[var(--text-tertiary)]"}`,
								children: o.count.toLocaleString()
							}),
							isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 shrink-0 text-[var(--accent)]" })
						]
					}, o.id);
				}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "py-6 text-center text-[12px] text-[var(--text-tertiary)]",
					children: [
						"No ",
						label.toLowerCase(),
						" matches"
					]
				})]
			})
		]
	});
}
function ActiveChip({ label, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-subtle)] px-3 py-1 text-[11px] font-medium text-[var(--accent)]",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onRemove,
			"aria-label": `Remove ${label} filter`,
			className: "flex items-center rounded-full transition-opacity active:opacity-60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-2.5" })
		})]
	});
}
function MobileFilterTrigger({ activeCount, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-label": "Open filters",
		className: `relative inline-flex h-[34px] items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-all active:scale-95 sm:hidden ${activeCount > 0 ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)]" : "border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)]"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5 shrink-0" }), activeCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white",
			children: activeCount
		})]
	});
}
function MobileFilterDrawer({ open, onOpenChange, catalog, selected, resultCount, onChange }) {
	const [tab, setTab] = (0, import_react.useState)("country");
	const langs = (0, import_react.useMemo)(() => catalog.meta.languages.map((l) => ({
		id: l.code,
		name: l.name,
		count: catalog.indexes.by_language[l.code]?.length ?? 0
	})).filter((l) => l.count > 0).sort((a, b) => b.count - a.count), [catalog]);
	const countries = (0, import_react.useMemo)(() => catalog.meta.countries.map((c) => ({
		id: c.code,
		name: c.name,
		count: catalog.indexes.by_country[c.code]?.length ?? 0
	})).filter((c) => c.count > 0).sort((a, b) => b.count - a.count), [catalog]);
	const activeCountryName = (0, import_react.useMemo)(() => countries.find((c) => c.id === selected.country)?.name, [countries, selected.country]);
	const activeLanguageName = (0, import_react.useMemo)(() => langs.find((l) => l.id === selected.language)?.name, [langs, selected.language]);
	const hasAny = !!(selected.category || selected.language || selected.country);
	const activeCount = [
		selected.category,
		selected.language,
		selected.country
	].filter(Boolean).length;
	const clearAll = (0, import_react.useCallback)(() => onChange({
		category: void 0,
		language: void 0,
		country: void 0
	}), [onChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DrawerContent, {
			className: "flex max-h-[92vh] flex-col bg-[var(--surface-base)] border-[var(--border-subtle)] px-0 pb-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 items-center justify-between px-5 pb-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-[15px] font-semibold text-[var(--text-primary)]",
							children: "Filters"
						}), activeCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[10px] font-bold text-white",
							children: activeCount
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [hasAny && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: clearAll,
							className: "text-[12px] font-medium text-[var(--text-tertiary)] underline-offset-2 hover:text-[var(--text-primary)] active:opacity-60 transition-colors",
							children: "Clear all"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Close filters",
								className: "flex size-7 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--text-secondary)] transition-colors active:bg-[var(--surface-4)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})
						})]
					})]
				}),
				hasAny && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 flex flex-wrap gap-2 px-5 pb-3",
					children: [activeCountryName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveChip, {
						label: activeCountryName,
						onRemove: () => onChange({
							...selected,
							country: void 0
						})
					}), activeLanguageName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveChip, {
						label: activeLanguageName,
						onRemove: () => onChange({
							...selected,
							language: void 0
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 mx-5 mb-4 flex rounded-xl bg-[var(--surface-2)] p-1",
					children: ["country", "language"].map((t) => {
						const isActive = tab === t;
						const hasValue = t === "country" ? !!selected.country : !!selected.language;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTab(t),
							className: `relative flex flex-1 items-center justify-center gap-1.5 rounded-[10px] py-2 text-[13px] font-medium transition-all duration-200 ${isActive ? "bg-[var(--surface-base)] text-[var(--text-primary)] shadow-sm" : "text-[var(--text-tertiary)]"}`,
							children: [t === "country" ? "Country" : "Language", hasValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-[var(--accent)]" })]
						}, t);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-0 flex-1 overflow-y-auto px-5 no-scrollbar",
					children: tab === "country" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						label: "Country",
						options: countries,
						active: selected.country,
						isCountry: true,
						onSelect: (id) => onChange({
							...selected,
							country: id
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						label: "Language",
						options: langs,
						active: selected.language,
						onSelect: (id) => onChange({
							...selected,
							language: id
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "shrink-0 border-t border-[var(--border-subtle)] bg-[var(--surface-base)] px-5 pb-[env(safe-area-inset-bottom,16px)] pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrawerClose, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3.5 text-[14px] font-semibold text-white shadow-lg transition-all active:scale-[0.98] active:opacity-90",
							children: [
								"Show ",
								resultCount.toLocaleString(),
								" channel",
								resultCount !== 1 ? "s" : ""
							]
						})
					})
				})
			]
		})
	});
}
function CategoryBar({ catalog, active, onSelect }) {
	const scrollRef = (0, import_react.useRef)(null);
	const [canScrollLeft, setCanScrollLeft] = (0, import_react.useState)(false);
	const [canScrollRight, setCanScrollRight] = (0, import_react.useState)(false);
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const categories = (0, import_react.useMemo)(() => catalog.meta.categories.map((c) => ({
		id: c.id,
		name: c.name,
		count: catalog.indexes.by_category[c.id]?.length ?? 0
	})).filter((c) => c.count > 0).sort((a, b) => b.count - a.count), [catalog]);
	const updateScrollState = (0, import_react.useCallback)(() => {
		const el = scrollRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 4);
		setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
	}, []);
	(0, import_react.useEffect)(() => {
		const el = scrollRef.current;
		if (!el) return;
		updateScrollState();
		el.addEventListener("scroll", updateScrollState, { passive: true });
		const ro = new ResizeObserver(updateScrollState);
		ro.observe(el);
		return () => {
			el.removeEventListener("scroll", updateScrollState);
			ro.disconnect();
		};
	}, [updateScrollState]);
	const scroll = (0, import_react.useCallback)((dir) => {
		const el = scrollRef.current;
		if (!el) return;
		el.scrollBy({
			left: dir === "left" ? -240 : 240,
			behavior: "smooth"
		});
	}, []);
	(0, import_react.useEffect)(() => {
		const el = scrollRef.current;
		if (!el) return;
		const onWheel = (e) => {
			if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
			const canScrollLeft = el.scrollLeft > 1;
			const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
			const scrollingLeft = e.deltaY < 0;
			const scrollingRight = e.deltaY > 0;
			if (scrollingLeft && canScrollLeft || scrollingRight && canScrollRight) {
				e.preventDefault();
				el.scrollBy({
					left: e.deltaY,
					behavior: "auto"
				});
			}
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => el.removeEventListener("wheel", onWheel);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		onMouseEnter: () => setHovered(true),
		onMouseLeave: () => setHovered(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "flex gap-2 overflow-x-auto pb-1 no-scrollbar",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onSelect(active === c.id ? void 0 : c.id),
					className: `shrink-0 rounded-full border px-3 py-1 text-[12px] font-medium transition-all duration-150 ${active === c.id ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm" : "border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"}`,
					children: c.name
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center transition-opacity duration-200 ${hovered && canScrollLeft ? "opacity-100" : "opacity-0"}`,
				style: {
					background: "linear-gradient(to right, var(--surface-base) 40%, transparent)",
					width: "3.5rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Scroll left",
					onClick: () => scroll("left"),
					className: "pointer-events-auto hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center justify-end transition-opacity duration-200 ${hovered && canScrollRight ? "opacity-100" : "opacity-0"}`,
				style: {
					background: "linear-gradient(to left, var(--surface-base) 40%, transparent)",
					width: "3.5rem"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Scroll right",
					onClick: () => scroll("right"),
					className: "pointer-events-auto hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })
				})
			})
		]
	});
}
var SORT_OPTIONS = [
	{
		value: "popular",
		label: "Popular"
	},
	{
		value: "name",
		label: "A → Z"
	},
	{
		value: "country",
		label: "Country"
	}
];
function SortDropdown({ value, onChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	const active = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const handler = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((o) => !o),
			className: `flex h-[34px] items-center gap-2 rounded-lg border px-3 text-[12px] font-medium transition-colors ${open ? "border-[var(--accent)] bg-[var(--surface-2)] text-[var(--text-primary)]" : "border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"}`,
			"aria-haspopup": "listbox",
			"aria-expanded": open,
			"aria-label": "Sort",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-3.5 shrink-0 text-[var(--text-tertiary)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: active.label }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `size-3 shrink-0 text-[var(--text-tertiary)] transition-transform ${open ? "rotate-90" : "rotate-90 opacity-60"}` })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute right-0 top-[calc(100%+6px)] z-50 min-w-[130px] overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] py-1 shadow-xl dropdown-enter",
			children: SORT_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "option",
				"aria-selected": o.value === value,
				onClick: () => {
					onChange(o.value);
					setOpen(false);
				},
				className: `flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[12px] transition-colors ${o.value === value ? "text-[var(--accent)]" : "text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.label }), o.value === value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 shrink-0" })]
			}, o.value))
		})]
	});
}
function BrowsePage() {
	const navigate = useNavigate({ from: "/browse" });
	const selected = Route.useSearch();
	const cat = useCatalog();
	const [mobileFiltersOpen, setMobileFiltersOpen] = (0, import_react.useState)(false);
	const userCountry = useUserCountry();
	const health = useStreamHealth();
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (!!!(selected.category || selected.language || selected.country || selected.q || selected.sort)) {
			const savedStr = sessionStorage.getItem("pulse-browse-search");
			if (savedStr) try {
				const saved = JSON.parse(savedStr);
				if (Object.keys(saved).length > 0) navigate({
					search: saved,
					replace: true
				});
			} catch {}
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (!!(selected.category || selected.language || selected.country || selected.q || selected.sort)) sessionStorage.setItem("pulse-browse-search", JSON.stringify(selected));
		else sessionStorage.removeItem("pulse-browse-search");
	}, [selected]);
	const ids = (0, import_react.useMemo)(() => {
		if (!cat.data) return [];
		const sets = [];
		if (selected.category) sets.push(new Set(cat.data.indexes.by_category[selected.category] ?? []));
		if (selected.country) sets.push(new Set(cat.data.indexes.by_country[selected.country] ?? []));
		if (selected.language) sets.push(new Set(cat.data.indexes.by_language[selected.language] ?? []));
		let base = sets.length === 0 ? cat.data.indexes.all_ids : cat.data.indexes.all_ids.filter((id) => sets.every((s) => s.has(id)));
		const q = selected.q?.trim().toLowerCase();
		if (q) base = base.filter((id) => cat.data.channels[id]?.name.toLowerCase().includes(q));
		if (selected.sort === "name") base = base.slice().sort((a, b) => cat.data.channels[a].name.localeCompare(cat.data.channels[b].name));
		else if (selected.sort === "country") base = base.slice().sort((a, b) => cat.data.channels[a].country.localeCompare(cat.data.channels[b].country));
		else base = sortChannels(base, cat.data.channels, userCountry, health);
		return base;
	}, [
		cat.data,
		selected,
		userCountry
	]);
	const update = (patch) => {
		navigate({
			search: (prev) => ({
				...prev,
				...patch
			}),
			replace: false
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight sm:text-3xl",
				children: "Browse"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[13px] text-[var(--text-tertiary)]",
				children: cat.data ? `${ids.length.toLocaleString()} channels` : "Loading catalog…"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative hidden sm:block sm:w-[280px] sm:flex-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-tertiary)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: selected.q ?? "",
								onChange: (e) => update({ q: e.target.value || void 0 }),
								placeholder: "Filter by name…",
								className: "input-field !pl-9"
							}),
							selected.q && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => update({ q: void 0 }),
								"aria-label": "Clear",
								className: "absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortDropdown, {
						value: selected.sort ?? "popular",
						onChange: (v) => update({ sort: v })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileFilterTrigger, {
						activeCount: [
							selected.category,
							selected.language,
							selected.country
						].filter(Boolean).length,
						onClick: () => setMobileFiltersOpen(true)
					})
				]
			})]
		}),
		cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryBar, {
				catalog: cat.data,
				active: selected.category,
				onSelect: (id) => update({ category: id })
			})
		}),
		cat.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex gap-2 overflow-hidden",
			children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shimmer h-7 w-16 shrink-0 rounded-full",
				style: { width: `${56 + i % 3 * 16}px` }
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden sm:block w-full shrink-0 sm:w-[260px]",
				children: [cat.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-3.5 w-16 rounded-full" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 border-t border-[var(--border-subtle)] pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-2.5 w-20 rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-8 w-full rounded-lg" }),
								Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-4 w-5 rounded-[2px]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "shimmer h-2.5 rounded-full",
											style: { width: `${60 + i % 4 * 20}px` }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer ml-auto h-2 w-6 rounded-full" })
									]
								}, i))
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 border-t border-[var(--border-subtle)] pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-2.5 w-20 rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-8 w-full rounded-lg" }),
								Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "shimmer h-2.5 rounded-full",
										style: { width: `${70 + i % 3 * 18}px` }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer ml-auto h-2 w-6 rounded-full" })]
								}, i))
							]
						})
					]
				}), cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterPanel, {
					catalog: cat.data,
					selected,
					onChange: (next) => navigate({
						search: (p) => ({
							...p,
							category: next.category,
							language: next.language,
							country: next.country
						}),
						replace: false
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [cat.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
					children: Array.from({ length: 15 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer aspect-video w-full rounded-md" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-3 w-3/4 rounded-full" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "shimmer h-2.5 w-1/2 rounded-full" })
						]
					}, i))
				}), cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundPingTrigger, {
					channelIds: ids,
					channels: cat.data.channels,
					limit: 12
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGrid, {
					catalog: cat.data,
					channelIds: ids
				})] })]
			})]
		}),
		cat.data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileFilterDrawer, {
			open: mobileFiltersOpen,
			onOpenChange: setMobileFiltersOpen,
			catalog: cat.data,
			selected,
			resultCount: ids.length,
			onChange: (next) => {
				navigate({
					search: (p) => ({
						...p,
						category: next.category,
						language: next.language,
						country: next.country
					}),
					replace: false
				});
			}
		})
	] });
}
//#endregion
export { BrowsePage as component };
