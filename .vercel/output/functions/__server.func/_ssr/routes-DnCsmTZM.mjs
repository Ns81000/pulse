import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import {
  _ as useStreamHealth,
  f as sortChannels,
  m as useCatalog,
  v as useUserCountry,
} from "./stream-messages-BgpnpGaY.mjs";
import { f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as useFavourites, t as ChannelCard } from "./use-favourites-Bt-_lNDN.mjs";
import { t as BackgroundPingTrigger } from "./BackgroundPingTrigger-nSKP9mKW.mjs";
import { t as HorizScrollShelf } from "./HorizScrollShelf-TyzQTtPT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DnCsmTZM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ImmersiveLanding({ onClose }) {
  const [isExiting, setIsExiting] = (0, import_react.useState)(false);
  const [isMounted, setIsMounted] = (0, import_react.useState)(false);
  const canvasRef = (0, import_react.useRef)(null);
  const mouseRef = (0, import_react.useRef)({
    x: -1e3,
    y: -1e3,
    targetX: -1e3,
    targetY: -1e3,
    active: false,
  });
  (0, import_react.useEffect)(() => {
    const t = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(t);
  }, []);
  (0, import_react.useEffect)(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1e3;
      mouseRef.current.targetY = -1e3;
    };
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    const mouse = mouseRef.current;
    let currentMouseX = -1e3;
    let currentMouseY = -1e3;
    let phase1 = 0;
    let phase2 = 2.5;
    let phase3 = 4.8;
    let waveAmplitudeMultiplier = 1;
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);
      if (mouse.active)
        if (currentMouseX === -1e3) {
          currentMouseX = mouse.targetX;
          currentMouseY = mouse.targetY;
        } else {
          currentMouseX += (mouse.targetX - currentMouseX) * 0.12;
          currentMouseY += (mouse.targetY - currentMouseY) * 0.12;
        }
      else {
        currentMouseX += (-1e3 - currentMouseX) * 0.08;
        currentMouseY += (-1e3 - currentMouseY) * 0.08;
      }
      if (isExiting) waveAmplitudeMultiplier += (0 - waveAmplitudeMultiplier) * 0.1;
      const drawFluidWave = (
        phase,
        baseHeight,
        amplitude,
        frequency,
        gradientTopColor,
        gradientBottomColor,
      ) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 3) {
          let activeAmplitude = amplitude * waveAmplitudeMultiplier;
          if (currentMouseX !== -1e3) {
            const distanceToCursorX = Math.abs(x - currentMouseX);
            if (distanceToCursorX < 320) {
              const hoverFactor = 1 - distanceToCursorX / 320;
              activeAmplitude += hoverFactor * 16 * Math.sin(phase * 1.2) * waveAmplitudeMultiplier;
            }
          }
          const y = baseHeight - Math.sin(x * frequency + phase) * activeAmplitude;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        const waveGradient = ctx.createLinearGradient(0, baseHeight - amplitude, 0, height);
        waveGradient.addColorStop(0, gradientTopColor);
        waveGradient.addColorStop(1, gradientBottomColor);
        ctx.fillStyle = waveGradient;
        ctx.fill();
      };
      drawFluidWave(
        phase1,
        height * 0.88,
        28,
        0.0016,
        "rgba(229, 72, 77, 0.08)",
        "rgba(229, 72, 77, 0.002)",
      );
      drawFluidWave(
        phase2,
        height * 0.91,
        20,
        0.0034,
        "rgba(229, 72, 77, 0.16)",
        "rgba(229, 72, 77, 0.005)",
      );
      drawFluidWave(
        phase3,
        height * 0.94,
        14,
        0.0062,
        "rgba(229, 72, 77, 0.28)",
        "rgba(229, 72, 77, 0.01)",
      );
      phase1 += isExiting ? 0.06 : 0.004;
      phase2 -= isExiting ? 0.04 : 0.005;
      phase3 += isExiting ? 0.08 : 0.009;
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isExiting]);
  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 850);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    className: `fixed inset-0 w-full h-full z-[100] bg-[#010102] flex flex-col justify-center items-center overflow-hidden select-none transition-all duration-800 ${isExiting ? "opacity-0 translate-y-[-100%] pointer-events-none" : "opacity-100 translate-y-0"}`,
    style: { transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 w-full h-full pointer-events-none",
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
        className: "relative z-10 flex flex-col justify-center items-center px-6",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
          className: "max-w-2xl w-full flex flex-col items-center text-center gap-8 sm:gap-11",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: `w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] flex items-center justify-center transition-all duration-1000 ${isMounted && !isExiting ? "opacity-100 scale-100" : "opacity-0 scale-90"}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
                width: "100%",
                height: "100%",
                viewBox: "-7 -7 131 131",
                xmlns: "http://www.w3.org/2000/svg",
                "aria-hidden": "true",
                children: [
                  {
                    cx: 0,
                    cy: 0,
                    f: "#34343a",
                    d: 100,
                  },
                  {
                    cx: 0,
                    cy: 22,
                    f: "#e5484d",
                    d: 140,
                  },
                  {
                    cx: 0,
                    cy: 44,
                    f: "#e5484d",
                    d: 180,
                  },
                  {
                    cx: 0,
                    cy: 66,
                    f: "#e5484d",
                    d: 220,
                  },
                  {
                    cx: 0,
                    cy: 88,
                    f: "#e5484d",
                    d: 260,
                  },
                  {
                    cx: 0,
                    cy: 110,
                    f: "#e5484d",
                    d: 300,
                  },
                  {
                    cx: 22,
                    cy: 0,
                    f: "#34343a",
                    d: 120,
                  },
                  {
                    cx: 22,
                    cy: 22,
                    f: "#34343a",
                    d: 160,
                  },
                  {
                    cx: 22,
                    cy: 44,
                    f: "#e5484d",
                    d: 200,
                  },
                  {
                    cx: 22,
                    cy: 66,
                    f: "#34343a",
                    d: 240,
                  },
                  {
                    cx: 22,
                    cy: 88,
                    f: "#34343a",
                    d: 280,
                  },
                  {
                    cx: 22,
                    cy: 110,
                    f: "#e5484d",
                    d: 320,
                  },
                  {
                    cx: 44,
                    cy: 0,
                    f: "#34343a",
                    d: 140,
                  },
                  {
                    cx: 44,
                    cy: 22,
                    f: "#34343a",
                    d: 180,
                  },
                  {
                    cx: 44,
                    cy: 44,
                    f: "#34343a",
                    d: 220,
                  },
                  {
                    cx: 44,
                    cy: 66,
                    f: "#34343a",
                    d: 260,
                  },
                  {
                    cx: 44,
                    cy: 88,
                    f: "#34343a",
                    d: 300,
                  },
                  {
                    cx: 44,
                    cy: 110,
                    f: "#e5484d",
                    d: 340,
                  },
                  {
                    cx: 66,
                    cy: 0,
                    f: "#e5484d",
                    d: 160,
                  },
                  {
                    cx: 66,
                    cy: 22,
                    f: "#e5484d",
                    d: 200,
                  },
                  {
                    cx: 66,
                    cy: 44,
                    f: "#e5484d",
                    d: 240,
                  },
                  {
                    cx: 66,
                    cy: 66,
                    f: "#e5484d",
                    d: 280,
                  },
                  {
                    cx: 66,
                    cy: 88,
                    f: "#e5484d",
                    d: 320,
                  },
                  {
                    cx: 66,
                    cy: 110,
                    f: "#e5484d",
                    d: 360,
                  },
                  {
                    cx: 88,
                    cy: 0,
                    f: "#e5484d",
                    d: 180,
                  },
                  {
                    cx: 88,
                    cy: 22,
                    f: "#34343a",
                    d: 220,
                  },
                  {
                    cx: 88,
                    cy: 44,
                    f: "#34343a",
                    d: 260,
                  },
                  {
                    cx: 88,
                    cy: 66,
                    f: "#e5484d",
                    d: 300,
                  },
                  {
                    cx: 88,
                    cy: 88,
                    f: "#34343a",
                    d: 340,
                  },
                  {
                    cx: 88,
                    cy: 110,
                    f: "#e5484d",
                    d: 380,
                  },
                  {
                    cx: 110,
                    cy: 0,
                    f: "#34343a",
                    d: 200,
                  },
                  {
                    cx: 110,
                    cy: 22,
                    f: "#e5484d",
                    d: 240,
                  },
                  {
                    cx: 110,
                    cy: 44,
                    f: "#e5484d",
                    d: 280,
                  },
                  {
                    cx: 110,
                    cy: 66,
                    f: "#34343a",
                    d: 320,
                  },
                  {
                    cx: 110,
                    cy: 88,
                    f: "#e5484d",
                    d: 360,
                  },
                  {
                    cx: 110,
                    cy: 110,
                    f: "#34343a",
                    d: 400,
                  },
                ].map((dot, idx) =>
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "circle",
                    {
                      cx: dot.cx,
                      cy: dot.cy,
                      r: "7",
                      fill: dot.f,
                      className: "transition-transform duration-800",
                      style: {
                        animation: `logo-dot-entrance 0.9s cubic-bezier(0.23, 1, 0.32, 1) both`,
                        animationDelay: `${dot.d}ms`,
                        transformOrigin: `${dot.cx}px ${dot.cy}px`,
                      },
                    },
                    idx,
                  ),
                ),
              }),
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
              children: `
            @keyframes logo-dot-entrance {
              from {
                opacity: 0;
                transform: scale(0.3) translate(10px, 10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translate(0, 0);
              }
            }
          `,
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
              className: "flex flex-col items-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
                  className: `font-display font-bold text-[var(--text-primary)] tracking-[-0.04em] text-[3.4rem] sm:text-[4rem] leading-[1.05] sm:leading-[1.1] transition-all duration-1000 delay-[150ms] ${isMounted && !isExiting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
                  children: "Pulse",
                }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                  className: `mt-2 flex flex-col items-start transition-all duration-1000 delay-[280ms] ${isMounted && !isExiting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`,
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                      className:
                        "font-mono text-[12px] sm:text-[12px] font-medium tracking-[0.35em] text-[var(--text-tertiary)] uppercase",
                      children: "Feel Everything",
                    }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                      className: "mt-1 h-[2px] w-9 sm:w-9 rounded-full bg-[var(--accent)]",
                    }),
                  ],
                }),
              ],
            }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: `mt-4 transition-all duration-1000 delay-[360ms] ${isMounted && !isExiting ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-6"}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
                onClick: handleEnter,
                className:
                  "relative group flex items-center gap-3.5 px-8 py-4 bg-transparent text-[13px] font-mono tracking-[0.2em] uppercase text-white border border-white/10 rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:text-white active:scale-97 active:bg-white/[0.02]",
                style: { boxShadow: "0 0 0 0 rgba(229,72,77,0)" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className:
                      "absolute inset-0 w-full h-full bg-gradient-to-r from-[rgba(229,72,77,0.12)] to-[rgba(229,72,77,0.02)] -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0",
                    style: { zIndex: -1 },
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className:
                      "absolute inset-0 rounded-full border border-[var(--accent)] opacity-0 scale-95 transition-all duration-500 group-hover:opacity-60 group-hover:scale-100 pointer-events-none",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enter" }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                    className:
                      "size-4 text-[var(--text-tertiary)] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--accent)]",
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
function Shelf({ title, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
    className: "mt-12",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
        className:
          "mb-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]",
        children: title,
      }),
      children,
    ],
  });
}
function HorizScroll({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizScrollShelf, { children });
}
function Index() {
  const cat = useCatalog();
  const { favSet, refresh: refreshFavs } = useFavourites();
  const userCountry = useUserCountry();
  const health = useStreamHealth();
  const [showLanding, setShowLanding] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    if (!localStorage.getItem("pulse_landing_viewed")) {
      setShowLanding(true);
      document.body.style.overflow = "hidden";
    } else document.documentElement.removeAttribute("data-landing-active");
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const handleCloseLanding = () => {
    localStorage.setItem("pulse_landing_viewed", "true");
    setShowLanding(false);
    document.body.style.overflow = "";
    document.documentElement.removeAttribute("data-landing-active");
  };
  const featured = (0, import_react.useMemo)(() => {
    if (!cat.data) return null;
    const flagBy = new Map(cat.data.meta.countries.map((c) => [c.code, c.flag]));
    const catName = (id) => cat.data.meta.categories.find((c) => c.id === id)?.name ?? id;
    return {
      flagBy,
      catName,
    };
  }, [cat.data]);
  const popularByCategory = (0, import_react.useMemo)(() => {
    if (!cat.data) return [];
    return ["news", "sports", "movies", "entertainment", "music", "documentary"]
      .map((id) => {
        const sorted = sortChannels(
          cat.data.indexes.by_category[id] ?? [],
          cat.data.channels,
          userCountry,
          health,
        );
        return {
          id,
          name: cat.data.meta.categories.find((c) => c.id === id)?.name ?? id,
          ids: sorted.slice(0, 12),
        };
      })
      .filter((s) => s.ids.length > 0);
  }, [cat.data, userCountry]);
  const visibleIdsForBackgroundCheck = (0, import_react.useMemo)(() => {
    const ids = /* @__PURE__ */ new Set();
    for (const shelf of popularByCategory) for (const id of shelf.ids.slice(0, 3)) ids.add(id);
    return Array.from(ids);
  }, [popularByCategory]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    children: [
      showLanding &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImmersiveLanding, {
          onClose: handleCloseLanding,
        }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
        className:
          "relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)]",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className: "absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay",
            "aria-hidden": "true",
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            },
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
            className:
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[var(--border-subtle)] to-transparent opacity-40",
            "aria-hidden": "true",
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "hidden sm:flex items-center justify-between gap-4 px-12 py-14",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "relative z-10 flex-1",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                    className:
                      "font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--text-tertiary)] hero-item",
                    style: { animationDelay: "0ms" },
                    children: "Free · No account · Verified live",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
                    className: "mt-4 font-display font-bold text-[var(--text-primary)] hero-item",
                    style: {
                      fontSize: "4rem",
                      letterSpacing: "-0.04em",
                      lineHeight: 1.1,
                      animationDelay: "60ms",
                    },
                    children: "Pulse",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className: "mt-2 hero-item",
                    style: { animationDelay: "110ms" },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                        className:
                          "font-mono text-[12px] font-medium tracking-[0.35em] text-[var(--text-tertiary)] uppercase",
                        children: "Feel Everything",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                        className: "mt-1 h-[2px] w-9 rounded-full bg-[var(--accent)]",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "mt-7 flex flex-wrap gap-2 hero-item",
                    style: { animationDelay: "170ms" },
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                      to: "/browse",
                      className: "btn-primary inline-flex items-center gap-1.5",
                      children: [
                        "Browse channels ",
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
                          className: "size-3.5",
                        }),
                      ],
                    }),
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    className:
                      "mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11.5px] text-[var(--text-tertiary)] hero-item",
                    style: { animationDelay: "220ms" },
                    children: [
                      cat.data &&
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                                  className: "text-[var(--text-primary)]",
                                  children: cat.data.indexes.all_ids.length.toLocaleString(),
                                }),
                                " ",
                                "channels",
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                                  className: "text-[var(--text-primary)]",
                                  children: cat.data.meta.countries.filter(
                                    (c) => (cat.data.indexes.by_country[c.code]?.length ?? 0) > 0,
                                  ).length,
                                }),
                                " ",
                                "countries",
                              ],
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                                  className: "text-[var(--text-primary)]",
                                  children: cat.data.meta.languages.filter(
                                    (l) => (cat.data.indexes.by_language[l.code]?.length ?? 0) > 0,
                                  ).length,
                                }),
                                " ",
                                "languages",
                              ],
                            }),
                          ],
                        }),
                      !cat.data &&
                        cat.isLoading &&
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                          className: "shimmer h-3 w-32 rounded",
                        }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                className: "shrink-0 opacity-80 hero-item",
                "aria-hidden": "true",
                style: { animationDelay: "140ms" },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
                  width: "160",
                  height: "160",
                  viewBox: "-7 -7 131 131",
                  xmlns: "http://www.w3.org/2000/svg",
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
            ],
          }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
            className: "flex flex-col gap-5 px-5 py-8 sm:hidden",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                className:
                  "font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--text-tertiary)]",
                children: "Free · No account · Verified live",
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex items-start justify-between",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
                        className:
                          "font-display text-[2.6rem] font-bold text-[var(--text-primary)]",
                        style: {
                          letterSpacing: "-0.04em",
                          lineHeight: 1.05,
                        },
                        children: "Pulse",
                      }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                        className: "mt-2",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
                            className:
                              "font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--text-tertiary)]",
                            children: "Feel Everything",
                          }),
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                            className: "mt-1 h-[2px] w-7 rounded-full bg-[var(--accent)]",
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
                    width: "72",
                    height: "72",
                    viewBox: "-7 -7 131 131",
                    xmlns: "http://www.w3.org/2000/svg",
                    "aria-hidden": "true",
                    className: "shrink-0 opacity-90 mt-3",
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
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
                to: "/browse",
                className: "btn-primary inline-flex w-fit items-center gap-1 px-4 py-2 text-[12px]",
                children: [
                  "Browse channels ",
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" }),
                ],
              }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
                className: "flex gap-5 font-mono text-[10.5px] text-[var(--text-tertiary)]",
                children: [
                  cat.data &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                              className: "text-[var(--text-primary)]",
                              children: cat.data.indexes.all_ids.length.toLocaleString(),
                            }),
                            " ",
                            "channels",
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                              className: "text-[var(--text-primary)]",
                              children: cat.data.meta.countries.filter(
                                (c) => (cat.data.indexes.by_country[c.code]?.length ?? 0) > 0,
                              ).length,
                            }),
                            " ",
                            "countries",
                          ],
                        }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
                              className: "text-[var(--text-primary)]",
                              children: cat.data.meta.languages.filter(
                                (l) => (cat.data.indexes.by_language[l.code]?.length ?? 0) > 0,
                              ).length,
                            }),
                            " ",
                            "lang",
                          ],
                        }),
                      ],
                    }),
                  !cat.data &&
                    cat.isLoading &&
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
                      className: "shimmer h-2.5 w-28 rounded",
                    }),
                ],
              }),
            ],
          }),
        ],
      }),
      cat.isLoading &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "mt-12 space-y-12",
          children: Array.from({ length: 3 }).map((_, s) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "section",
              {
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "shimmer mb-4 h-2.5 w-20 rounded-full",
                  }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                    className: "flex gap-3 overflow-hidden",
                    children: Array.from({ length: 7 }).map((_, i) =>
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        "div",
                        {
                          className: "w-[210px] shrink-0 space-y-2",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                              className: "shimmer aspect-video w-full rounded-md",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                              className: "shimmer h-3 w-3/4 rounded-full",
                            }),
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
                              className: "shimmer h-2.5 w-1/2 rounded-full",
                            }),
                          ],
                        },
                        i,
                      ),
                    ),
                  }),
                ],
              },
              s,
            ),
          ),
        }),
      cat.data &&
        featured &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundPingTrigger, {
              channelIds: visibleIdsForBackgroundCheck,
              channels: cat.data.channels,
              limit: 24,
            }),
            popularByCategory.map((shelf) =>
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                Shelf,
                {
                  title: shelf.name,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HorizScroll, {
                    children: shelf.ids.map((id) => {
                      const c = cat.data.channels[id];
                      if (!c) return null;
                      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "div",
                        {
                          className: "w-[210px] shrink-0",
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelCard, {
                            channel: c,
                            flag: featured.flagBy.get(c.country),
                            categoryName: featured.catName,
                            isFavourite: favSet.has(id),
                            onFavouriteChange: refreshFavs,
                          }),
                        },
                        id,
                      );
                    }),
                  }),
                },
                shelf.id,
              ),
            ),
          ],
        }),
    ],
  });
}
//#endregion
export { Index as component };
