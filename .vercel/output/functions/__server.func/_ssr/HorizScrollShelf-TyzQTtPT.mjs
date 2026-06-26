import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as ChevronRight, w as ChevronLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HorizScrollShelf-TyzQTtPT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HorizScrollShelf({ children }) {
  const scrollRef = (0, import_react.useRef)(null);
  const [canScrollLeft, setCanScrollLeft] = (0, import_react.useState)(false);
  const [canScrollRight, setCanScrollRight] = (0, import_react.useState)(false);
  const [hovered, setHovered] = (0, import_react.useState)(false);
  const updateState = (0, import_react.useCallback)(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);
  (0, import_react.useEffect)(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    const ro = new ResizeObserver(updateState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateState);
      ro.disconnect();
    };
  }, [updateState]);
  (0, import_react.useEffect)(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const canScrollLeft = el.scrollLeft > 1;
      const canScrollRight = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      const scrollingLeft = e.deltaY < 0;
      const scrollingRight = e.deltaY > 0;
      if ((scrollingLeft && canScrollLeft) || (scrollingRight && canScrollRight)) {
        e.preventDefault();
        el.scrollBy({
          left: e.deltaY,
          behavior: "auto",
        });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  const scroll = (0, import_react.useCallback)((dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -480 : 480,
      behavior: "smooth",
    });
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: "relative",
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        ref: scrollRef,
        className: "-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:px-0",
        children,
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: `pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center transition-opacity duration-200 sm:-left-1 ${hovered && canScrollLeft ? "opacity-100" : "opacity-0"}`,
        style: {
          background: "linear-gradient(to right, var(--surface-base) 40%, transparent)",
          width: "4rem",
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          type: "button",
          "aria-label": "Scroll left",
          onClick: () => scroll("left"),
          className:
            "pointer-events-auto ml-0 hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
            className: "size-3.5",
          }),
        }),
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
        className: `pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center justify-end transition-opacity duration-200 sm:-right-1 ${hovered && canScrollRight ? "opacity-100" : "opacity-0"}`,
        style: {
          background: "linear-gradient(to left, var(--surface-base) 40%, transparent)",
          width: "4rem",
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
          type: "button",
          "aria-label": "Scroll right",
          onClick: () => scroll("right"),
          className:
            "pointer-events-auto mr-0 hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex",
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
            className: "size-3.5",
          }),
        }),
      }),
    ],
  });
}
//#endregion
export { HorizScrollShelf as t };
