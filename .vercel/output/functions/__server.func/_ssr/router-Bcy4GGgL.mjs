import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import {
  _ as useStreamHealth,
  c as queueBackgroundCheck,
  f as sortChannels,
  g as usePlayer,
  m as useCatalog,
  p as streamErrorMsg,
  r as checkStream,
  s as listHistory,
  t as PlayerProvider,
  v as useUserCountry,
} from "./stream-messages-BgpnpGaY.mjs";
import {
  a as useRouterState,
  c as Outlet,
  d as createRootRouteWithContext,
  f as Link,
  h as useRouter,
  i as HeadContent,
  l as lazyRouteComponent,
  m as useNavigate,
  p as redirect,
  r as Scripts,
  s as createRouter,
  u as createFileRoute,
} from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$7 } from "./browse-D94Ucvg_.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import {
  A as House,
  S as Clock,
  a as Tv,
  h as Monitor,
  j as Earth,
  n as X,
  o as Tag,
  s as Smartphone,
  t as Zap,
  u as Search,
  v as Languages,
  x as CornerDownLeft,
  y as Heart,
} from "../_libs/lucide-react.mjs";
import { t as Route$8 } from "./watch._channelId-DSrE9c_k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bcy4GGgL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CvetgT3L.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
var NAV = [
  {
    to: "/",
    label: "Home",
    icon: House,
  },
  {
    to: "/browse",
    label: "Browse",
    icon: Tv,
  },
  {
    to: "/favourites",
    label: "Library",
    icon: Heart,
  },
];
function Header({ onSearchOpen }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [shortcutText, setShortcutText] = (0, import_react.useState)("Ctrl+K");
  (0, import_react.useEffect)(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent.indexOf("Mac") !== -1)
      setShortcutText("⌘K");
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
    className:
      "sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[color:var(--surface-base)]/80 backdrop-blur-md pt-[env(safe-area-inset-top)]",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 sm:px-6",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
          to: "/",
          className: "flex shrink-0 items-center gap-2.5 transition-transform active:scale-98",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
              width: "22",
              height: "22",
              viewBox: "44 30 130 130",
              xmlns: "http://www.w3.org/2000/svg",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "44",
                  cy: "30",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "44",
                  cy: "52",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "44",
                  cy: "74",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "44",
                  cy: "96",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "44",
                  cy: "118",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "44",
                  cy: "140",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "66",
                  cy: "30",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "66",
                  cy: "52",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "66",
                  cy: "74",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "66",
                  cy: "96",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "66",
                  cy: "118",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "66",
                  cy: "140",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "88",
                  cy: "30",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "88",
                  cy: "52",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "88",
                  cy: "74",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "88",
                  cy: "96",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "88",
                  cy: "118",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "88",
                  cy: "140",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "110",
                  cy: "30",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "110",
                  cy: "52",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "110",
                  cy: "74",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "110",
                  cy: "96",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "110",
                  cy: "118",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "110",
                  cy: "140",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "132",
                  cy: "30",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "132",
                  cy: "52",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "132",
                  cy: "74",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "132",
                  cy: "96",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "132",
                  cy: "118",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "132",
                  cy: "140",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "154",
                  cy: "30",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "154",
                  cy: "52",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "154",
                  cy: "74",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "154",
                  cy: "96",
                  r: "7",
                  fill: "#34343a",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "154",
                  cy: "118",
                  r: "7",
                  fill: "#e5484d",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                  cx: "154",
                  cy: "140",
                  r: "7",
                  fill: "#34343a",
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
              className: "font-display text-[15px] font-semibold tracking-tight",
              children: "Pulse",
            }),
          ],
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
          className: "hidden items-center gap-0.5 sm:flex",
          children: NAV.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              Link,
              {
                to: n.to,
                className: `rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${active ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"}`,
                children: n.label,
              },
              n.to,
            );
          }),
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "ml-auto flex items-center gap-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
              type: "button",
              onClick: onSearchOpen,
              className:
                "hidden sm:inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] px-3 py-1.5 text-[12.5px] text-[var(--text-tertiary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] min-w-[220px]",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "flex-1 text-left",
                  children: "Search…",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
                  className: "keycap-kbd",
                  children: shortcutText,
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
              type: "button",
              onClick: onSearchOpen,
              "aria-label": "Search",
              className:
                "sm:hidden flex size-9 items-center justify-center rounded-xl border border-[var(--border-default)] bg-[var(--surface-2)] text-[var(--text-secondary)] transition-all active:scale-90 active:bg-[var(--surface-3)]",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
                className: "size-4.5",
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
function BottomTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
    className:
      "fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--border-subtle)] glassmorphic-blur pb-[env(safe-area-inset-bottom)] sm:hidden",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
      className: "flex",
      children: NAV.map((n) => {
        const Icon = n.icon;
        const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "li",
          {
            className: "flex-1",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
              to: n.to,
              className: `flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] transition-all duration-100 active:scale-92 ${active ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
                  className: "size-[18px]",
                  strokeWidth: active ? 2.2 : 1.8,
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                  className: "mt-1.5 text-[9.5px] font-medium tracking-wide",
                  children: n.label,
                }),
              ],
            }),
          },
          n.to,
        );
      }),
    }),
  });
}
var CODE_MAP = {
  uk: "gb",
  int: "",
};
function toFlagCode(code) {
  const lower = code.toLowerCase();
  return CODE_MAP[lower] ?? lower;
}
function SearchModal({ open, onClose }) {
  const cat = useCatalog();
  const navigate = useNavigate();
  const player = usePlayer();
  const health = useStreamHealth();
  const userCountry = useUserCountry();
  const [q, setQ] = (0, import_react.useState)("");
  const [debouncedQ, setDebouncedQ] = (0, import_react.useState)("");
  const [active, setActive] = (0, import_react.useState)(0);
  const [recent, setRecent] = (0, import_react.useState)([]);
  const [pills, setPills] = (0, import_react.useState)([]);
  const [mounted, setMounted] = (0, import_react.useState)(false);
  const inputRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  const isUsingKeyboard = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (open) {
      setMounted(false);
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMounted(true));
      });
      return () => cancelAnimationFrame(t);
    } else setMounted(false);
  }, [open]);
  (0, import_react.useEffect)(() => {
    const t = setTimeout(() => setDebouncedQ(q), 150);
    return () => clearTimeout(t);
  }, [q]);
  (0, import_react.useEffect)(() => {
    if (open) {
      setQ("");
      setDebouncedQ("");
      setActive(0);
      setPills([]);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    (async () => {
      const h = await listHistory();
      const seen = /* @__PURE__ */ new Set();
      setRecent(
        h
          .filter((x) => (seen.has(x.channelId) ? false : (seen.add(x.channelId), true)))
          .slice(0, 6)
          .map((x) => x.channelId),
      );
    })();
  }, [open]);
  const addPill = (0, import_react.useCallback)((pill) => {
    setPills((prev) => {
      return [...prev.filter((p) => p.type !== pill.type), pill];
    });
    setQ("");
    setDebouncedQ("");
    setActive(0);
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);
  const removePill = (0, import_react.useCallback)((type) => {
    setPills((prev) => prev.filter((p) => p.type !== type));
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);
  const pillSets = (0, import_react.useMemo)(() => {
    if (!cat.data) return null;
    const sets = [];
    for (const pill of pills)
      if (pill.type === "country") {
        const ids = cat.data.indexes.by_country[pill.code];
        if (ids) sets.push(new Set(ids));
      } else if (pill.type === "category") {
        const ids = cat.data.indexes.by_category[pill.code];
        if (ids) sets.push(new Set(ids));
      } else if (pill.type === "language") {
        const ids = cat.data.indexes.by_language[pill.code];
        if (ids) sets.push(new Set(ids));
      }
    return sets;
  }, [cat.data, pills]);
  const trendingChannels = (0, import_react.useMemo)(() => {
    if (!open || !cat.data) return [];
    const sorted = sortChannels(cat.data.indexes.all_ids, cat.data.channels, userCountry, health);
    const seenCategories = /* @__PURE__ */ new Set();
    const result = [];
    for (const id of sorted) {
      if (result.length >= 12) break;
      const ch = cat.data.channels[id];
      if (!ch) continue;
      const h = health[id];
      if (h && h !== "online") continue;
      const cat1 = ch.categories[0];
      if (!cat1 || seenCategories.has(cat1)) continue;
      seenCategories.add(cat1);
      result.push(id);
    }
    return result;
  }, [open, cat.data, userCountry]);
  (0, import_react.useEffect)(() => {
    if (!cat.data || trendingChannels.length === 0) return;
    for (const id of trendingChannels) {
      const ch = cat.data.channels[id];
      if (ch) queueBackgroundCheck(ch.id, ch.streams);
    }
  }, [cat.data, trendingChannels]);
  const playChannel = (0, import_react.useCallback)(
    async (id) => {
      const ch = cat.data?.channels[id];
      if (!ch) return;
      onClose();
      const toastId = `stream-${id}`;
      toast.loading(`Checking ${ch.name}…`, { id: toastId });
      const first = ch.streams[0];
      const r = await checkStream(first.url, first.referrer, first.user_agent);
      if (r === "online") {
        toast.dismiss(toastId);
        player.open(ch);
        navigate({
          to: "/watch/$channelId",
          params: { channelId: ch.id },
        });
      } else
        toast.error(ch.name, {
          id: toastId,
          description: streamErrorMsg(r),
          duration: 8e3,
          action: {
            label: "Open anyway",
            onClick: () => {
              toast.dismiss(toastId);
              player.open(ch);
              navigate({
                to: "/watch/$channelId",
                params: { channelId: ch.id },
              });
            },
          },
        });
    },
    [cat.data, navigate, onClose, player],
  );
  const pinnedTypes = (0, import_react.useMemo)(() => new Set(pills.map((p) => p.type)), [pills]);
  const rows = (0, import_react.useMemo)(() => {
    if (!cat.data) return [];
    const ql = debouncedQ.trim().toLowerCase();
    if (!ql && pills.length === 0) return [];
    const out = [];
    const countryNameMap = new Map(cat.data.meta.countries.map((c) => [c.code, c.name]));
    const baseIds =
      pillSets && pillSets.length > 0
        ? cat.data.indexes.all_ids.filter((id) => pillSets.every((s) => s.has(id)))
        : cat.data.indexes.all_ids;
    if (ql || pills.length > 0) {
      const chMatches = [];
      for (const id of baseIds) {
        const name = cat.data.channels[id].name.toLowerCase();
        if (!ql)
          chMatches.push({
            id,
            rank: 1,
          });
        else {
          let rank = -1;
          if (name === ql) rank = 0;
          else if (name.startsWith(ql)) rank = 1;
          else if (name.includes(ql)) rank = 2;
          if (rank >= 0)
            chMatches.push({
              id,
              rank,
            });
        }
      }
      chMatches.sort((a, b) => a.rank - b.rank);
      for (const m of chMatches.slice(0, 12)) {
        const c = cat.data.channels[m.id];
        out.push({
          group: "Channels",
          id: `ch:${m.id}`,
          label: c.name,
          sub: countryNameMap.get(c.country) ?? c.country,
          countryCode: c.country,
          logoUrl: c.logo_url,
          isFilter: false,
          action: () => playChannel(m.id),
        });
      }
    }
    if (!ql) return out;
    if (!pinnedTypes.has("country")) {
      let count = 0;
      for (const co of cat.data.meta.countries) {
        if (!co.name.toLowerCase().includes(ql)) continue;
        const n = cat.data.indexes.by_country[co.code]?.length ?? 0;
        if (n === 0) continue;
        out.push({
          group: "Countries",
          id: `co:${co.code}`,
          label: co.name,
          sub: `${n} channels`,
          countryCode: co.code,
          isFilter: true,
          filterType: "country",
          filterCode: co.code,
          action: () =>
            addPill({
              type: "country",
              code: co.code,
              label: co.name,
              countryCode: co.code,
            }),
        });
        if (++count >= 4) break;
      }
    }
    if (!pinnedTypes.has("category")) {
      let count = 0;
      for (const ca of cat.data.meta.categories) {
        if (!ca.name.toLowerCase().includes(ql)) continue;
        const n = cat.data.indexes.by_category[ca.id]?.length ?? 0;
        if (n === 0) continue;
        out.push({
          group: "Categories",
          id: `ca:${ca.id}`,
          label: ca.name,
          sub: `${n} channels`,
          isFilter: true,
          filterType: "category",
          filterCode: ca.id,
          action: () =>
            addPill({
              type: "category",
              code: ca.id,
              label: ca.name,
            }),
        });
        if (++count >= 4) break;
      }
    }
    if (!pinnedTypes.has("language")) {
      let count = 0;
      for (const la of cat.data.meta.languages) {
        if (!la.name.toLowerCase().includes(ql)) continue;
        const n = cat.data.indexes.by_language[la.code]?.length ?? 0;
        if (n === 0) continue;
        out.push({
          group: "Languages",
          id: `la:${la.code}`,
          label: la.name,
          sub: `${n} channels`,
          isFilter: true,
          filterType: "language",
          filterCode: la.code,
          action: () =>
            addPill({
              type: "language",
              code: la.code,
              label: la.name,
            }),
        });
        if (++count >= 4) break;
      }
    }
    return out;
  }, [cat.data, debouncedQ, pills, pillSets, pinnedTypes, playChannel, addPill]);
  (0, import_react.useEffect)(() => {
    setActive(0);
  }, [debouncedQ, pills]);
  const isShowingRecent = !debouncedQ.trim() && pills.length === 0;
  const navList = (0, import_react.useMemo)(() => {
    if (isShowingRecent)
      return recent
        .map((id) => {
          if (!cat.data?.channels[id]) return null;
          return () => playChannel(id);
        })
        .filter(Boolean);
    return rows.map((r) => r.action);
  }, [isShowingRecent, recent, cat.data, rows, playChannel]);
  (0, import_react.useEffect)(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Backspace" && q === "" && pills.length > 0) {
        setPills((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key === " " && !isShowingRecent && rows[active]?.isFilter) {
        e.preventDefault();
        rows[active].action();
        return;
      }
      if (navList.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        isUsingKeyboard.current = true;
        setActive((a) => (a + 1) % navList.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        isUsingKeyboard.current = true;
        setActive((a) => (a - 1 + navList.length) % navList.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        navList[active]?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, navList, rows, active, onClose, q, pills, isShowingRecent]);
  const sections = (0, import_react.useMemo)(() => {
    const groups = [];
    let idx = 0;
    for (const row of rows) {
      let s = groups.find((g) => g.name === row.group);
      if (!s) {
        s = {
          name: row.group,
          rows: [],
        };
        groups.push(s);
      }
      s.rows.push({
        row,
        flatIdx: idx++,
      });
    }
    return groups;
  }, [rows]);
  const groupIcon = (g) =>
    g === "Channels" ? Tv : g === "Countries" ? Earth : g === "Categories" ? Tag : Languages;
  const activeRow = rows[active];
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className:
      "fixed inset-0 z-50 flex flex-col items-stretch sm:items-center sm:justify-start sm:px-4 sm:pt-[12vh]",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: `absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${mounted ? "opacity-100" : "opacity-0"}`,
        onMouseDown: onClose,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: `
          relative flex flex-col
          /* Mobile: full screen with safe areas */
          h-full w-full bg-[var(--surface-1)]
          pt-[env(safe-area-inset-top,0px)]
          pb-[env(safe-area-inset-bottom,0px)]
          /* Desktop: centered floating card */
          sm:h-auto sm:max-h-[580px] sm:max-w-xl sm:w-full
          sm:overflow-hidden sm:rounded-2xl
          sm:border sm:border-[var(--border-default)]
          sm:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]
          sm:pt-0 sm:pb-0
          /* Entry animation */
          transition-[transform,opacity] duration-250
          ${mounted ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-4 opacity-0 sm:scale-[0.96]"}
        `,
        style: { transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "shrink-0 flex flex-col border-b border-[var(--border-subtle)] bg-[var(--surface-1)]",
            onMouseDown: (e) => {
              if (e.target === e.currentTarget) inputRef.current?.focus();
            },
            children: [
              pills.length > 0 &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                  className: "flex flex-wrap gap-1.5 px-4 pt-3 pb-1",
                  children: pills.map((pill) => {
                    const flagCode = pill.countryCode ? toFlagCode(pill.countryCode) : "";
                    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                      "span",
                      {
                        className:
                          "inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-subtle)] px-2.5 py-1 text-[12px] font-medium text-[var(--accent)]",
                        children: [
                          flagCode &&
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                              src: `https://flagcdn.com/w20/${flagCode}.png`,
                              width: 14,
                              height: 10,
                              alt: pill.label,
                              className: "rounded-[2px] object-cover",
                            }),
                          !flagCode &&
                            pill.type === "category" &&
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
                              className: "size-3",
                            }),
                          !flagCode &&
                            pill.type === "language" &&
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {
                              className: "size-3",
                            }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                            children: pill.label,
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                            type: "button",
                            onMouseDown: (e) => {
                              e.preventDefault();
                              removePill(pill.type);
                            },
                            className:
                              "ml-0.5 rounded-full p-0.5 hover:bg-[var(--accent)]/20 active:opacity-60 transition-colors",
                            "aria-label": `Remove ${pill.label} filter`,
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
                              className: "size-3",
                            }),
                          }),
                        ],
                      },
                      pill.type,
                    );
                  }),
                }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex items-center gap-3 px-4 py-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className:
                      "flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-3)]",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
                      className: "size-[18px] text-[var(--text-secondary)]",
                    }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
                    ref: inputRef,
                    value: q,
                    onChange: (e) => setQ(e.target.value),
                    placeholder:
                      pills.length === 0 ? "Search channels, countries…" : "Filter channels…",
                    className:
                      "flex-1 bg-transparent text-[17px] font-medium text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)] placeholder:font-normal",
                    style: { fontSize: "17px" },
                  }),
                  q
                    ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                        type: "button",
                        onMouseDown: (e) => {
                          e.preventDefault();
                          setQ("");
                          inputRef.current?.focus();
                        },
                        className:
                          "flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--text-tertiary)] transition-colors active:scale-90",
                        "aria-label": "Clear",
                        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
                          className: "size-4",
                        }),
                      })
                    : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                        type: "button",
                        onClick: onClose,
                        className:
                          "flex h-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-2)] px-3 text-[13px] font-medium text-[var(--text-tertiary)] transition-colors active:scale-95 sm:hidden",
                        "aria-label": "Close search",
                        children: "Cancel",
                      }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
                    className: "keycap-kbd hidden sm:inline-flex shrink-0",
                    children: "Esc",
                  }),
                ],
              }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            ref: listRef,
            className: "flex-1 overflow-y-auto no-scrollbar",
            children: [
              cat.isLoading &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-col items-center justify-center py-16 gap-3",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                      className:
                        "size-6 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent)]",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className: "text-[13px] text-[var(--text-tertiary)]",
                      children: "Loading catalog…",
                    }),
                  ],
                }),
              !cat.isLoading &&
                isShowingRecent &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "px-2 pt-3 pb-2",
                  children: [
                    recent.length > 0 &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className:
                              "px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]",
                            children: "Recently watched",
                          }),
                          recent.map((id, idx) => {
                            const c = cat.data?.channels[id];
                            if (!c) return null;
                            const code = toFlagCode(c.country);
                            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                              "button",
                              {
                                "data-idx": idx,
                                onMouseEnter: () => {
                                  if (!isUsingKeyboard.current) setActive(idx);
                                },
                                onMouseMove: () => {
                                  isUsingKeyboard.current = false;
                                  setActive(idx);
                                },
                                onClick: () => playChannel(id),
                                className: `flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition-all active:scale-[0.97] ${idx === active ? "bg-[var(--surface-3)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`,
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
                                    className: "size-4 shrink-0 text-[var(--text-tertiary)]",
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                    className: "flex-1 truncate text-[14px] font-medium",
                                    children: c.name,
                                  }),
                                  code &&
                                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                                      src: `https://flagcdn.com/w20/${code}.png`,
                                      width: 18,
                                      height: 13,
                                      alt: c.country,
                                      className: "shrink-0 rounded-[3px] object-cover",
                                    }),
                                ],
                              },
                              id,
                            );
                          }),
                        ],
                      }),
                    trendingChannels.length > 0 &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: recent.length > 0 ? "mt-5" : "",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                            className: "mb-2 flex items-center gap-2 px-3",
                            children: [
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                                className:
                                  "text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]",
                                children: "Popular right now",
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                                className:
                                  "flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                    className: "size-1.5 rounded-full bg-emerald-400 animate-pulse",
                                  }),
                                  "Live",
                                ],
                              }),
                            ],
                          }),
                          trendingChannels.map((id) => {
                            const c = cat.data?.channels[id];
                            if (!c) return null;
                            const code = toFlagCode(c.country);
                            const isOnline = health[id] === "online";
                            const catName = cat.data?.meta.categories.find(
                              (ca) => ca.id === c.categories[0],
                            )?.name;
                            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                              "button",
                              {
                                onClick: () => playChannel(id),
                                className:
                                  "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all active:scale-[0.97] text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                    className: "relative shrink-0",
                                    children: [
                                      c.logo_url
                                        ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                                            src: c.logo_url,
                                            alt: c.name,
                                            width: 36,
                                            height: 36,
                                            className:
                                              "size-9 rounded-lg object-contain bg-[var(--surface-3)]",
                                            onError: (e) => {
                                              e.target.style.display = "none";
                                            },
                                          })
                                        : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                                            className:
                                              "flex size-9 items-center justify-center rounded-lg bg-[var(--surface-3)]",
                                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                              Tv,
                                              { className: "size-4 text-[var(--text-tertiary)]" },
                                            ),
                                          }),
                                      isOnline &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                          className:
                                            "absolute -bottom-0.5 -right-0.5 flex size-2.5 items-center justify-center rounded-full bg-[var(--surface-1)]",
                                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                            "span",
                                            { className: "size-1.5 rounded-full bg-emerald-400" },
                                          ),
                                        }),
                                    ],
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                                        className:
                                          "truncate text-[13px] font-semibold text-[var(--text-primary)]",
                                        children: c.name,
                                      }),
                                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                                        className:
                                          "truncate text-[11px] text-[var(--text-tertiary)]",
                                        children: catName ?? c.categories[0],
                                      }),
                                    ],
                                  }),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                                    className: "flex shrink-0 flex-col items-end gap-1",
                                    children: [
                                      code &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                                          src: `https://flagcdn.com/w20/${code}.png`,
                                          width: 18,
                                          height: 13,
                                          alt: c.country,
                                          className: "rounded-[3px] object-cover",
                                        }),
                                      isOnline &&
                                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                                          className:
                                            "flex items-center gap-0.5 text-[10px] font-medium text-emerald-400",
                                          children: [
                                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, {
                                              className: "size-2.5",
                                            }),
                                            "Live",
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              id,
                            );
                          }),
                        ],
                      }),
                    recent.length === 0 &&
                      trendingChannels.length === 0 &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className:
                          "flex flex-col items-center justify-center px-6 py-14 text-center",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className:
                              "mb-3 flex size-12 items-center justify-center rounded-2xl bg-[var(--surface-2)]",
                            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
                              className: "size-5 text-[var(--text-tertiary)]",
                            }),
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                            className: "text-[14px] font-medium text-[var(--text-secondary)]",
                            children: [
                              "Search",
                              " ",
                              cat.data
                                ? `${cat.data.indexes.all_ids.length.toLocaleString()} channels`
                                : "channels",
                            ],
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className: "mt-1 text-[12px] text-[var(--text-tertiary)]",
                            children: "Countries, categories, and languages too",
                          }),
                        ],
                      }),
                  ],
                }),
              !cat.isLoading &&
                (debouncedQ.trim() || pills.length > 0) &&
                rows.length === 0 &&
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "flex flex-col items-center justify-center px-6 py-14 text-center",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                      className: "text-[14px] font-medium text-[var(--text-secondary)]",
                      children: ["No results", debouncedQ ? ` for "${debouncedQ}"` : ""],
                    }),
                    pills.length > 0 &&
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className: "mt-1 text-[12px] text-[var(--text-tertiary)]",
                        children: "Try removing a filter",
                      }),
                  ],
                }),
              sections.map((sec) => {
                const Icon = groupIcon(sec.name);
                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "div",
                  {
                    className: "px-2 pt-2",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className:
                          "px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]",
                        children: sec.name,
                      }),
                      sec.rows.map(({ row, flatIdx }) => {
                        const isActive = flatIdx === active;
                        const flagCode = row.countryCode ? toFlagCode(row.countryCode) : "";
                        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                          "button",
                          {
                            "data-idx": flatIdx,
                            onMouseEnter: () => {
                              if (!isUsingKeyboard.current) setActive(flatIdx);
                            },
                            onMouseMove: () => {
                              isUsingKeyboard.current = false;
                              setActive(flatIdx);
                            },
                            onClick: row.action,
                            className: `flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition-all active:scale-[0.97] ${isActive ? "bg-[var(--surface-3)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`,
                            children: [
                              row.logoUrl
                                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                                    src: row.logoUrl,
                                    alt: row.label,
                                    width: 28,
                                    height: 28,
                                    className:
                                      "size-7 shrink-0 rounded-md object-contain bg-[var(--surface-3)]",
                                    onError: (e) => {
                                      const el = e.currentTarget;
                                      el.style.display = "none";
                                      const sibling = el.nextElementSibling;
                                      if (sibling) sibling.style.display = "flex";
                                    },
                                  })
                                : null,
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
                                className: "size-4 shrink-0 text-[var(--text-tertiary)]",
                                style: { display: row.logoUrl ? "none" : void 0 },
                              }),
                              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                className: "flex-1 truncate text-[14px] font-medium",
                                children: row.label,
                              }),
                              flagCode &&
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                                  src: `https://flagcdn.com/w20/${flagCode}.png`,
                                  width: 18,
                                  height: 13,
                                  alt: row.countryCode,
                                  className: "shrink-0 rounded-[2px] object-cover",
                                }),
                              !row.countryCode &&
                                row.sub &&
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                  className: "shrink-0 text-[12px] text-[var(--text-tertiary)]",
                                  children: row.sub,
                                }),
                              row.isFilter
                                ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                                    className: `shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors ${isActive ? "bg-[var(--accent-subtle)] text-[var(--accent)]" : "bg-[var(--surface-3)] text-[var(--text-tertiary)]"}`,
                                    children: "Filter",
                                  })
                                : isActive &&
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CornerDownLeft, {
                                    className:
                                      "size-3.5 shrink-0 text-[var(--text-tertiary)] hidden sm:block",
                                  }),
                            ],
                          },
                          row.id,
                        );
                      }),
                    ],
                  },
                  sec.name,
                );
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 sm:h-2" }),
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className:
              "hidden sm:flex items-center justify-between shrink-0 border-t border-[var(--border-subtle)] bg-[var(--surface-base)]/60 px-4 py-2 text-[10.5px] text-[var(--text-tertiary)]",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                className: "flex items-center gap-3",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                    className: "inline-flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
                        className: "keycap-kbd",
                        children: "↑↓",
                      }),
                      " navigate",
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                    className: "inline-flex items-center gap-1.5",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
                        className: "keycap-kbd",
                        children: "↵",
                      }),
                      " open",
                    ],
                  }),
                  activeRow?.isFilter &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                      className: "inline-flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
                          className: "keycap-kbd",
                          children: "Space",
                        }),
                        " filter",
                      ],
                    }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                className: "font-mono",
                children: cat.data
                  ? `${cat.data.indexes.all_ids.length.toLocaleString()} channels`
                  : "loading…",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function detectPlatform() {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}
function isInStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && window.navigator.standalone === true)
  );
}
function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = (0, import_react.useState)(null);
  const [show, setShow] = (0, import_react.useState)(false);
  const [platform, setPlatform] = (0, import_react.useState)(null);
  const [iosInstructions, setIosInstructions] = (0, import_react.useState)(false);
  const [dismissed, setDismissed] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (isInStandaloneMode()) return;
    if (sessionStorage.getItem("pwa-prompt-dismissed")) return;
    const p = detectPlatform();
    setPlatform(p);
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setTimeout(() => setShow(true), 3e3);
    };
    window.addEventListener("beforeinstallprompt", handler);
    if (p === "ios") {
      const t = setTimeout(() => setShow(true), 3500);
      return () => clearTimeout(t);
    }
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const handleInstall = async () => {
    if (platform === "ios") {
      setIosInstructions(true);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };
  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("pwa-prompt-dismissed", "1");
  };
  if (!show || dismissed) return null;
  if (platform !== "ios" && !deferredPrompt) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className:
          "pwa-banner fixed bottom-[calc(env(safe-area-inset-bottom)+72px)] left-3 right-3 z-50 sm:bottom-5 sm:left-auto sm:right-5 sm:w-[340px]",
        role: "dialog",
        "aria-label": "Install Pulse app",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className:
            "flex items-start gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] p-4 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className:
                "flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-3)]",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
                width: "28",
                height: "28",
                viewBox: "-7 -7 131 131",
                xmlns: "http://www.w3.org/2000/svg",
                "aria-hidden": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "0",
                    cy: "0",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "0",
                    cy: "22",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "0",
                    cy: "44",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "0",
                    cy: "66",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "0",
                    cy: "88",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "0",
                    cy: "110",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "22",
                    cy: "0",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "22",
                    cy: "22",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "22",
                    cy: "44",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "22",
                    cy: "66",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "22",
                    cy: "88",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "22",
                    cy: "110",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "44",
                    cy: "0",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "44",
                    cy: "22",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "44",
                    cy: "44",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "44",
                    cy: "66",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "44",
                    cy: "88",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "44",
                    cy: "110",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "66",
                    cy: "0",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "66",
                    cy: "22",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "66",
                    cy: "44",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "66",
                    cy: "66",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "66",
                    cy: "88",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "66",
                    cy: "110",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "88",
                    cy: "0",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "88",
                    cy: "22",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "88",
                    cy: "44",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "88",
                    cy: "66",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "88",
                    cy: "88",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "88",
                    cy: "110",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "110",
                    cy: "0",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "110",
                    cy: "22",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "110",
                    cy: "44",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "110",
                    cy: "66",
                    r: "7",
                    fill: "#34343a",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "110",
                    cy: "88",
                    r: "7",
                    fill: "#e5484d",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
                    cx: "110",
                    cy: "110",
                    r: "7",
                    fill: "#34343a",
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "min-w-0 flex-1",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "text-[13.5px] font-semibold text-[var(--text-primary)]",
                  children: "Install Pulse",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                  className: "mt-0.5 text-[11.5px] leading-snug text-[var(--text-tertiary)]",
                  children:
                    platform === "desktop"
                      ? "Add to your desktop for instant access"
                      : "Add to Home Screen for the best experience",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "mt-3 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                      type: "button",
                      onClick: handleInstall,
                      className:
                        "flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-[12px] font-semibold text-white transition-all active:scale-95",
                      children: [
                        platform === "desktop"
                          ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
                              className: "size-3",
                            })
                          : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, {
                              className: "size-3",
                            }),
                        platform === "ios" ? "How to install" : "Install",
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                      type: "button",
                      onClick: handleDismiss,
                      className:
                        "rounded-lg px-3 py-1.5 text-[12px] font-medium text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]",
                      children: "Not now",
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
              type: "button",
              onClick: handleDismiss,
              "aria-label": "Dismiss",
              className:
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }),
            }),
          ],
        }),
      }),
      iosInstructions &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "fixed inset-0 z-[60] flex items-end justify-center sm:items-center",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
              onClick: () => setIosInstructions(false),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className:
                "relative w-full max-w-sm rounded-t-3xl border border-[var(--border-default)] bg-[var(--surface-1)] p-6 pb-[calc(env(safe-area-inset-bottom)+24px)] sm:rounded-2xl sm:pb-6 slide-up",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: "mb-5 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
                      className: "font-display text-[16px] font-semibold",
                      children: "Add to Home Screen",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                      type: "button",
                      onClick: () => setIosInstructions(false),
                      className:
                        "flex size-7 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--text-secondary)]",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
                        className: "size-3.5",
                      }),
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
                      className: "flex items-start gap-3",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className:
                            "flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white",
                          children: "1",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className: "text-[13.5px] text-[var(--text-secondary)]",
                          children: [
                            "Tap the ",
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                              className: "text-[var(--text-primary)]",
                              children: "Share",
                            }),
                            " button",
                            " ",
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                              className:
                                "inline-flex size-5 items-center justify-center rounded bg-[var(--surface-3)] align-middle text-[11px]",
                              children: "⎙",
                            }),
                            " ",
                            "at the bottom of your browser",
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
                      className: "flex items-start gap-3",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className:
                            "flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white",
                          children: "2",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className: "text-[13.5px] text-[var(--text-secondary)]",
                          children: [
                            "Scroll down and tap",
                            " ",
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                              className: "text-[var(--text-primary)]",
                              children: "Add to Home Screen",
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
                      className: "flex items-start gap-3",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className:
                            "flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white",
                          children: "3",
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
                          className: "text-[13.5px] text-[var(--text-secondary)]",
                          children: [
                            "Tap ",
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                              className: "text-[var(--text-primary)]",
                              children: "Add",
                            }),
                            " — Pulse will appear on your home screen",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
                  type: "button",
                  onClick: () => {
                    setIosInstructions(false);
                    handleDismiss();
                  },
                  className:
                    "mt-6 w-full rounded-xl bg-[var(--surface-3)] py-3 text-[13.5px] font-medium text-[var(--text-primary)] transition-all active:scale-[0.98]",
                  children: "Got it",
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
function NotFoundComponent() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "grid min-h-screen place-items-center bg-[var(--surface-base)] px-4",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "max-w-md text-center",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
          className: "font-display text-6xl font-semibold tracking-tight",
          children: "404",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "mt-3 text-sm text-[var(--text-secondary)]",
          children: "That page isn't here. Try the catalog or head home.",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mt-6 flex justify-center gap-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: "/",
              className: "btn-primary",
              children: "Home",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
              to: "/browse",
              className: "btn-ghost",
              children: "Browse channels",
            }),
          ],
        }),
      ],
    }),
  });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  (0, import_react.useEffect)(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
    className: "grid min-h-screen place-items-center bg-[var(--surface-base)] px-4",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      className: "max-w-md text-center",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
          className: "font-display text-xl font-semibold",
          children: "Something went wrong",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
          className: "mt-2 text-sm text-[var(--text-secondary)]",
          children: "The page didn't load. Try again or head home.",
        }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "mt-6 flex flex-wrap justify-center gap-2",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
              onClick: () => {
                router.invalidate();
                reset();
              },
              className: "btn-primary",
              children: "Try again",
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
              href: "/",
              className: "btn-ghost",
              children: "Home",
            }),
          ],
        }),
      ],
    }),
  });
}
var Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        name: "theme-color",
        content: "#010102",
      },
      {
        name: "mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black-translucent",
      },
      {
        name: "apple-mobile-web-app-title",
        content: "Pulse",
      },
      { title: "Pulse — Feel Everything" },
      {
        name: "description",
        content:
          "Browse and watch thousands of free, public IPTV channels. Verified live, every click.",
      },
      {
        property: "og:title",
        content: "Pulse — Feel Everything",
      },
      {
        property: "og:description",
        content: "Browse and watch thousands of free, public IPTV channels.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: styles_default,
      },
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "apple-touch-icon",
        href: "/icons/icon-192.png",
      },
      {
        rel: "preconnect",
        href: "https://iptv-org.github.io",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
    lang: "en",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
            dangerouslySetInnerHTML: {
              __html: `
              (function() {
                try {
                  var viewed = localStorage.getItem('pulse_landing_viewed');
                  if (!viewed && window.location.pathname === '/') {
                    document.documentElement.setAttribute('data-landing-active', 'true');
                  }
                } catch (e) {}
              })();
            `,
            },
          }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
        children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})],
      }),
    ],
  });
}
function RouteTransition({ children }) {
  const pathname = useRouterState({
    select: (s) => {
      const lastMatch = s.matches[s.matches.length - 1];
      return lastMatch ? lastMatch.pathname : s.location.pathname;
    },
  });
  const [phase, setPhase] = (0, import_react.useState)("enter");
  (0, import_react.useEffect)(() => {
    setPhase("enter");
    const t = setTimeout(() => setPhase("idle"), 280);
    return () => clearTimeout(t);
  }, [pathname]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: phase === "enter" ? "route-enter" : "",
      children,
    },
    pathname,
  );
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if ("serviceWorker" in navigator)
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
  }, []);
  (0, import_react.useEffect)(() => {
    const handleOnline = () => {
      toast.success("Back online", {
        id: "network-status",
        description: "Connections restored.",
        duration: 3e3,
      });
    };
    const handleOffline = () => {
      toast.error("Network Connection Lost", {
        id: "network-status",
        description: "You are currently offline. Stream checks and playback may fail.",
        duration: Infinity,
      });
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    if (typeof navigator !== "undefined" && !navigator.onLine) handleOffline();
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const onKey = (e) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const isAlt = e.altKey;
      if ((isCmdOrCtrl || isAlt) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
    client: queryClient,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerProvider, {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className:
          "min-h-screen bg-[var(--surface-base)] pb-[calc(env(safe-area-inset-bottom)+64px)] sm:pb-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
            onSearchOpen: () => setSearchOpen(true),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
            className: "mx-auto max-w-[1600px] px-4 py-6 sm:px-6",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteTransition, {
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
            }),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomTabBar, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallPrompt, {}),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchModal, {
            open: searchOpen,
            onClose: () => setSearchOpen(false),
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
            theme: "dark",
            position: "top-center",
            duration: 6e3,
            toastOptions: {
              style: {
                background: "var(--surface-2)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
                borderRadius: 10,
                fontFamily: "var(--font-body)",
              },
            },
          }),
        ],
      }),
    }),
  });
}
var BASE_URL = "";
var Route$5 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
          {
            path: "/",
            changefreq: "daily",
            priority: "1.0",
          },
          {
            path: "/browse",
            changefreq: "daily",
            priority: "0.9",
          },
          {
            path: "/search",
            changefreq: "weekly",
            priority: "0.5",
          },
          {
            path: "/favourites",
            changefreq: "weekly",
            priority: "0.3",
          },
        ]
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
          )
          .join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
var $$splitComponentImporter$2 = () => import("./search-BsvJ9jBD.mjs");
var Route$4 = createFileRoute("/search")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
});
var $$splitComponentImporter$1 = () => import("./favourites-CJv7ghUP.mjs");
var Route$3 = createFileRoute("/favourites")({
  head: () => ({
    meta: [
      { title: "Library — Pulse" },
      {
        name: "description",
        content: "Your saved IPTV channels and recent watch history.",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
});
var $$splitComponentImporter = () => import("./routes-DnCsmTZM.mjs");
var Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse — Feel Everything" },
      {
        name: "description",
        content:
          "Browse and watch thousands of free IPTV channels. Verified live at every click — no dead ends.",
      },
      {
        property: "og:title",
        content: "Pulse — Feel Everything",
      },
      {
        property: "og:description",
        content: "Browse and watch thousands of free IPTV channels. Verified live at every click.",
      },
    ],
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component"),
});
async function check(url, referrer, ua) {
  const headers = {
    "User-Agent": ua || "Mozilla/5.0 (compatible; PulseChecker/1.0)",
    Range: "bytes=0-1023",
  };
  if (referrer) headers["Referer"] = referrer;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 6e3);
  try {
    const resp = await fetch(url, {
      method: "GET",
      headers,
      signal: controller.signal,
      redirect: "follow",
    });
    if (resp.status === 403 || resp.status === 401 || resp.status === 451) {
      clearTimeout(t);
      try {
        await resp.body?.cancel();
      } catch {}
      return "blocked";
    }
    if (!resp.ok && resp.status !== 206) {
      clearTimeout(t);
      try {
        await resp.body?.cancel();
      } catch {}
      return "error";
    }
    const ct = (resp.headers.get("content-type") ?? "").toLowerCase();
    if (
      ct.includes("text/html") ||
      ct.includes("application/json") ||
      ct.includes("text/xml") ||
      ct.includes("application/xml")
    ) {
      clearTimeout(t);
      try {
        await resp.body?.cancel();
      } catch {}
      return "error";
    }
    if (
      ct.includes("mpegurl") ||
      ct.includes("video") ||
      ct.includes("audio") ||
      ct.includes("octet-stream") ||
      ct.includes("mp2t")
    ) {
      clearTimeout(t);
      try {
        await resp.body?.cancel();
      } catch {}
      return "online";
    }
    let text = "";
    const reader = resp.body?.getReader();
    if (reader)
      try {
        const { value } = await reader.read();
        if (value) text = new TextDecoder().decode(value).slice(0, 512);
      } catch {
      } finally {
        try {
          await reader.cancel();
        } catch {}
      }
    clearTimeout(t);
    return text.includes("#EXTM3U") ||
      ct.includes("mpegurl") ||
      ct.includes("video") ||
      ct.includes("octet-stream") ||
      ct.includes("mp2t")
      ? "online"
      : "error";
  } catch (e) {
    clearTimeout(t);
    if (e instanceof Error && e.name === "AbortError") return "timeout";
    return "error";
  }
}
var Route$1 = createFileRoute("/api/check-stream")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { url, referrer, user_agent } = await request.json();
          if (!url)
            return new Response(JSON.stringify({ status: "error" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          const status = await check(url, referrer ?? null, user_agent ?? null);
          return new Response(JSON.stringify({ status }), {
            headers: { "content-type": "application/json" },
          });
        } catch {
          return new Response(JSON.stringify({ status: "error" }), {
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
var ENDPOINTS = {
  channels: "https://iptv-org.github.io/api/channels.json",
  feeds: "https://iptv-org.github.io/api/feeds.json",
  streams: "https://iptv-org.github.io/api/streams.json",
  categories: "https://iptv-org.github.io/api/categories.json",
  languages: "https://iptv-org.github.io/api/languages.json",
  countries: "https://iptv-org.github.io/api/countries.json",
  blocklist: "https://iptv-org.github.io/api/blocklist.json",
  logos: "https://iptv-org.github.io/api/logos.json",
};
function flagFromCode(code) {
  if (!code || code.length !== 2) return "";
  const A = 127397;
  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split("")
      .map((c) => c.charCodeAt(0) + A),
  );
}
async function fetchJson(url) {
  const r = await fetch(url, { headers: { "User-Agent": "PulseCatalog/1.0" } });
  if (!r.ok) throw new Error(`Failed ${url}: ${r.status}`);
  return r.json();
}
async function buildCatalog() {
  const [channels, feeds, streams, categories, languages, countries, blocklist, logos] =
    await Promise.all([
      fetchJson(ENDPOINTS.channels),
      fetchJson(ENDPOINTS.feeds).catch(() => []),
      fetchJson(ENDPOINTS.streams),
      fetchJson(ENDPOINTS.categories).catch(() => []),
      fetchJson(ENDPOINTS.languages).catch(() => []),
      fetchJson(ENDPOINTS.countries).catch(() => []),
      fetchJson(ENDPOINTS.blocklist).catch(() => []),
      fetchJson(ENDPOINTS.logos).catch(() => []),
    ]);
  const blocked = /* @__PURE__ */ new Set();
  for (const b of blocklist) blocked.add(b.channel);
  const langsByChannel = /* @__PURE__ */ new Map();
  for (const f of feeds) {
    if (!f.channel || !f.languages) continue;
    let s = langsByChannel.get(f.channel);
    if (!s) {
      s = /* @__PURE__ */ new Set();
      langsByChannel.set(f.channel, s);
    }
    for (const l of f.languages) s.add(l);
  }
  const streamsByChannel = /* @__PURE__ */ new Map();
  for (const s of streams) {
    if (!s.channel || !s.url) continue;
    const arr = streamsByChannel.get(s.channel) ?? [];
    arr.push(s);
    streamsByChannel.set(s.channel, arr);
  }
  const logoByChannel = /* @__PURE__ */ new Map();
  for (const l of logos) if (!logoByChannel.has(l.channel)) logoByChannel.set(l.channel, l.url);
  const out = {};
  const by_category = {};
  const by_language = {};
  const by_country = {};
  const all_ids = [];
  for (const c of channels) {
    if (!c.id) continue;
    if (blocked.has(c.id)) continue;
    if (c.is_nsfw) continue;
    if (c.closed) continue;
    const chStreams = streamsByChannel.get(c.id);
    if (!chStreams || chStreams.length === 0) continue;
    const langs = Array.from(langsByChannel.get(c.id) ?? []);
    const entry = {
      id: c.id,
      name: c.name,
      country: c.country,
      categories: c.categories ?? [],
      languages: langs,
      streams: chStreams.map((s) => ({
        url: s.url,
        referrer: s.referrer ?? null,
        user_agent: s.user_agent ?? null,
        quality: s.quality ?? null,
        label: s.label ?? null,
      })),
      website: c.website ?? null,
      logo_url: logoByChannel.get(c.id) ?? null,
    };
    out[c.id] = entry;
    all_ids.push(c.id);
    for (const cat of entry.categories) (by_category[cat] ??= []).push(c.id);
    if (entry.country) (by_country[entry.country] ??= []).push(c.id);
    for (const lang of langs) (by_language[lang] ??= []).push(c.id);
  }
  const metaCategories = categories
    .map((x) => ({
      id: x.id ?? "",
      name: x.name,
    }))
    .filter((x) => x.id);
  const metaLanguages = languages
    .map((x) => ({
      code: x.code ?? "",
      name: x.name,
    }))
    .filter((x) => x.code);
  const metaCountries = countries
    .map((x) => ({
      code: x.code ?? "",
      name: x.name,
      flag: x.flag || flagFromCode(x.code ?? ""),
    }))
    .filter((x) => x.code);
  return {
    updated_at: /* @__PURE__ */ new Date().toISOString(),
    channels: out,
    indexes: {
      by_category,
      by_language,
      by_country,
      all_ids,
    },
    meta: {
      categories: metaCategories,
      languages: metaLanguages,
      countries: metaCountries,
    },
  };
}
var cached = null;
var TTL_MS = 864e5;
var Route = createFileRoute("/api/catalog")({
  server: {
    handlers: {
      GET: async () => {
        try {
          if (!cached || Date.now() - cached.at > TTL_MS) {
            const data = await buildCatalog();
            cached = {
              at: Date.now(),
              data,
            };
          }
          return new Response(JSON.stringify(cached.data), {
            headers: {
              "content-type": "application/json",
              "cache-control":
                "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
            },
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: String(e) }), {
            status: 502,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
var SitemapDotxmlRoute = Route$5.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$6,
});
var SearchRoute = Route$4.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => Route$6,
});
var FavouritesRoute = Route$3.update({
  id: "/favourites",
  path: "/favourites",
  getParentRoute: () => Route$6,
});
var BrowseRoute = Route$7.update({
  id: "/browse",
  path: "/browse",
  getParentRoute: () => Route$6,
});
var IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6,
});
var WatchChannelIdRoute = Route$8.update({
  id: "/watch/$channelId",
  path: "/watch/$channelId",
  getParentRoute: () => Route$6,
});
var ApiCheckStreamRoute = Route$1.update({
  id: "/api/check-stream",
  path: "/api/check-stream",
  getParentRoute: () => Route$6,
});
var rootRouteChildren = {
  IndexRoute,
  BrowseRoute,
  FavouritesRoute,
  SearchRoute,
  SitemapDotxmlRoute,
  ApiCatalogRoute: Route.update({
    id: "/api/catalog",
    path: "/api/catalog",
    getParentRoute: () => Route$6,
  }),
  ApiCheckStreamRoute,
  WatchChannelIdRoute,
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
  return createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
};
//#endregion
export { getRouter };
