import {
  At as e,
  F as t,
  Mt as n,
  a as r,
  c as i,
  l as a,
  o,
  w as s,
  x as c,
} from "./stream-messages-xGwTYkSz.js";
import { n as l, t as u } from "./use-favourites-D-e0KHYb.js";
import { t as d } from "./BackgroundPingTrigger-CIk0TdTK.js";
import { t as f } from "./HorizScrollShelf-Uxm9SGB0.js";
var p = c(`arrow-right`, [
    [`path`, { d: `M5 12h14`, key: `1ays0h` }],
    [`path`, { d: `m12 5 7 7-7 7`, key: `xquz4c` }],
  ]),
  m = n(e(), 1),
  h = t();
function g({ onClose: e }) {
  let [t, n] = (0, m.useState)(!1),
    [r, i] = (0, m.useState)(!1),
    a = (0, m.useRef)(null),
    o = (0, m.useRef)({ x: -1e3, y: -1e3, targetX: -1e3, targetY: -1e3, active: !1 });
  return (
    (0, m.useEffect)(() => {
      let e = setTimeout(() => i(!0), 50);
      return () => clearTimeout(e);
    }, []),
    (0, m.useEffect)(() => {
      let e = (e) => {
          ((o.current.targetX = e.clientX),
            (o.current.targetY = e.clientY),
            (o.current.active = !0));
        },
        t = () => {
          ((o.current.active = !1), (o.current.targetX = -1e3), (o.current.targetY = -1e3));
        },
        n = (e) => {
          e.touches.length > 0 &&
            ((o.current.targetX = e.touches[0].clientX),
            (o.current.targetY = e.touches[0].clientY),
            (o.current.active = !0));
        };
      return (
        window.addEventListener(`mousemove`, e),
        window.addEventListener(`mouseleave`, t),
        window.addEventListener(`touchmove`, n, { passive: !0 }),
        window.addEventListener(`touchend`, t),
        () => {
          (window.removeEventListener(`mousemove`, e),
            window.removeEventListener(`mouseleave`, t),
            window.removeEventListener(`touchmove`, n),
            window.removeEventListener(`touchend`, t));
        }
      );
    }, []),
    (0, m.useEffect)(() => {
      let e = a.current;
      if (!e) return;
      let n = e.getContext(`2d`);
      if (!n) return;
      let r,
        i = (e.width = window.innerWidth),
        s = (e.height = window.innerHeight),
        c = () => {
          e && ((i = e.width = window.innerWidth), (s = e.height = window.innerHeight));
        };
      window.addEventListener(`resize`, c);
      let l = o.current,
        u = -1e3,
        d = -1e3,
        f = 0,
        p = 2.5,
        m = 4.8,
        h = 1,
        g = () => {
          if (!n || !e) return;
          (n.clearRect(0, 0, i, s),
            l.active
              ? u === -1e3
                ? ((u = l.targetX), (d = l.targetY))
                : ((u += (l.targetX - u) * 0.12), (d += (l.targetY - d) * 0.12))
              : ((u += (-1e3 - u) * 0.08), (d += (-1e3 - d) * 0.08)),
            t && (h += (0 - h) * 0.1));
          let a = (e, t, r, a, o, c) => {
            (n.beginPath(), n.moveTo(0, s));
            for (let o = 0; o <= i; o += 3) {
              let i = r * h;
              if (u !== -1e3) {
                let t = Math.abs(o - u);
                if (t < 320) {
                  let n = 1 - t / 320;
                  i += n * 16 * Math.sin(e * 1.2) * h;
                }
              }
              let s = t - Math.sin(o * a + e) * i;
              n.lineTo(o, s);
            }
            (n.lineTo(i, s), n.closePath());
            let l = n.createLinearGradient(0, t - r, 0, s);
            (l.addColorStop(0, o), l.addColorStop(1, c), (n.fillStyle = l), n.fill());
          };
          (a(f, s * 0.88, 28, 0.0016, `rgba(229, 72, 77, 0.08)`, `rgba(229, 72, 77, 0.002)`),
            a(p, s * 0.91, 20, 0.0034, `rgba(229, 72, 77, 0.16)`, `rgba(229, 72, 77, 0.005)`),
            a(m, s * 0.94, 14, 0.0062, `rgba(229, 72, 77, 0.28)`, `rgba(229, 72, 77, 0.01)`),
            (f += t ? 0.06 : 0.004),
            (p -= t ? 0.04 : 0.005),
            (m += t ? 0.08 : 0.009),
            (r = requestAnimationFrame(g)));
        };
      return (
        g(),
        () => {
          (cancelAnimationFrame(r), window.removeEventListener(`resize`, c));
        }
      );
    }, [t]),
    (0, h.jsxs)(`div`, {
      className: `fixed inset-0 w-full h-full z-[100] bg-[#010102] flex flex-col justify-center items-center overflow-hidden select-none transition-all duration-800 ${t ? `opacity-0 translate-y-[-100%] pointer-events-none` : `opacity-100 translate-y-0`}`,
      style: { transitionTimingFunction: `cubic-bezier(0.32, 0.72, 0, 1)` },
      children: [
        (0, h.jsx)(`canvas`, {
          ref: a,
          className: `absolute inset-0 w-full h-full pointer-events-none`,
        }),
        (0, h.jsx)(`main`, {
          className: `relative z-10 flex flex-col justify-center items-center px-6`,
          children: (0, h.jsxs)(`div`, {
            className: `max-w-2xl w-full flex flex-col items-center text-center gap-8 sm:gap-11`,
            children: [
              (0, h.jsx)(`div`, {
                className: `w-[110px] h-[110px] sm:w-[160px] sm:h-[160px] flex items-center justify-center transition-all duration-1000 ${r && !t ? `opacity-100 scale-100` : `opacity-0 scale-90`}`,
                children: (0, h.jsx)(`svg`, {
                  width: `100%`,
                  height: `100%`,
                  viewBox: `-7 -7 131 131`,
                  xmlns: `http://www.w3.org/2000/svg`,
                  "aria-hidden": `true`,
                  children: [
                    { cx: 0, cy: 0, f: `#34343a`, d: 100 },
                    { cx: 0, cy: 22, f: `#e5484d`, d: 140 },
                    { cx: 0, cy: 44, f: `#e5484d`, d: 180 },
                    { cx: 0, cy: 66, f: `#e5484d`, d: 220 },
                    { cx: 0, cy: 88, f: `#e5484d`, d: 260 },
                    { cx: 0, cy: 110, f: `#e5484d`, d: 300 },
                    { cx: 22, cy: 0, f: `#34343a`, d: 120 },
                    { cx: 22, cy: 22, f: `#34343a`, d: 160 },
                    { cx: 22, cy: 44, f: `#e5484d`, d: 200 },
                    { cx: 22, cy: 66, f: `#34343a`, d: 240 },
                    { cx: 22, cy: 88, f: `#34343a`, d: 280 },
                    { cx: 22, cy: 110, f: `#e5484d`, d: 320 },
                    { cx: 44, cy: 0, f: `#34343a`, d: 140 },
                    { cx: 44, cy: 22, f: `#34343a`, d: 180 },
                    { cx: 44, cy: 44, f: `#34343a`, d: 220 },
                    { cx: 44, cy: 66, f: `#34343a`, d: 260 },
                    { cx: 44, cy: 88, f: `#34343a`, d: 300 },
                    { cx: 44, cy: 110, f: `#e5484d`, d: 340 },
                    { cx: 66, cy: 0, f: `#e5484d`, d: 160 },
                    { cx: 66, cy: 22, f: `#e5484d`, d: 200 },
                    { cx: 66, cy: 44, f: `#e5484d`, d: 240 },
                    { cx: 66, cy: 66, f: `#e5484d`, d: 280 },
                    { cx: 66, cy: 88, f: `#e5484d`, d: 320 },
                    { cx: 66, cy: 110, f: `#e5484d`, d: 360 },
                    { cx: 88, cy: 0, f: `#e5484d`, d: 180 },
                    { cx: 88, cy: 22, f: `#34343a`, d: 220 },
                    { cx: 88, cy: 44, f: `#34343a`, d: 260 },
                    { cx: 88, cy: 66, f: `#e5484d`, d: 300 },
                    { cx: 88, cy: 88, f: `#34343a`, d: 340 },
                    { cx: 88, cy: 110, f: `#e5484d`, d: 380 },
                    { cx: 110, cy: 0, f: `#34343a`, d: 200 },
                    { cx: 110, cy: 22, f: `#e5484d`, d: 240 },
                    { cx: 110, cy: 44, f: `#e5484d`, d: 280 },
                    { cx: 110, cy: 66, f: `#34343a`, d: 320 },
                    { cx: 110, cy: 88, f: `#e5484d`, d: 360 },
                    { cx: 110, cy: 110, f: `#34343a`, d: 400 },
                  ].map((e, t) =>
                    (0, h.jsx)(
                      `circle`,
                      {
                        cx: e.cx,
                        cy: e.cy,
                        r: `7`,
                        fill: e.f,
                        className: `transition-transform duration-800`,
                        style: {
                          animation: `logo-dot-entrance 0.9s cubic-bezier(0.23, 1, 0.32, 1) both`,
                          animationDelay: `${e.d}ms`,
                          transformOrigin: `${e.cx}px ${e.cy}px`,
                        },
                      },
                      t,
                    ),
                  ),
                }),
              }),
              (0, h.jsx)(`style`, {
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
              (0, h.jsxs)(`div`, {
                className: `flex flex-col items-center`,
                children: [
                  (0, h.jsx)(`h1`, {
                    className: `font-display font-bold text-[var(--text-primary)] tracking-[-0.04em] text-[3.4rem] sm:text-[4rem] leading-[1.05] sm:leading-[1.1] transition-all duration-1000 delay-[150ms] ${r && !t ? `opacity-100 translate-y-0` : `opacity-0 translate-y-6`}`,
                    children: `Pulse`,
                  }),
                  (0, h.jsxs)(`div`, {
                    className: `mt-2 flex flex-col items-start transition-all duration-1000 delay-[280ms] ${r && !t ? `opacity-100 translate-y-0` : `opacity-0 translate-y-6`}`,
                    children: [
                      (0, h.jsx)(`p`, {
                        className: `font-mono text-[12px] sm:text-[12px] font-medium tracking-[0.35em] text-[var(--text-tertiary)] uppercase`,
                        children: `Feel Everything`,
                      }),
                      (0, h.jsx)(`div`, {
                        className: `mt-1 h-[2px] w-9 sm:w-9 rounded-full bg-[var(--accent)]`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, h.jsx)(`div`, {
                className: `mt-4 transition-all duration-1000 delay-[360ms] ${r && !t ? `opacity-100 scale-100 translate-y-0` : `opacity-0 scale-95 translate-y-6`}`,
                children: (0, h.jsxs)(`button`, {
                  onClick: () => {
                    (n(!0),
                      setTimeout(() => {
                        e();
                      }, 850));
                  },
                  className: `relative group flex items-center gap-3.5 px-8 py-4 bg-transparent text-[13px] font-mono tracking-[0.2em] uppercase text-white border border-white/10 rounded-full cursor-pointer overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:text-white active:scale-97 active:bg-white/[0.02]`,
                  style: { boxShadow: `0 0 0 0 rgba(229,72,77,0)` },
                  children: [
                    (0, h.jsx)(`div`, {
                      className: `absolute inset-0 w-full h-full bg-gradient-to-r from-[rgba(229,72,77,0.12)] to-[rgba(229,72,77,0.02)] -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0`,
                      style: { zIndex: -1 },
                    }),
                    (0, h.jsx)(`div`, {
                      className: `absolute inset-0 rounded-full border border-[var(--accent)] opacity-0 scale-95 transition-all duration-500 group-hover:opacity-60 group-hover:scale-100 pointer-events-none`,
                    }),
                    (0, h.jsx)(`span`, { children: `Enter` }),
                    (0, h.jsx)(p, {
                      className: `size-4 text-[var(--text-tertiary)] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--accent)]`,
                    }),
                  ],
                }),
              }),
            ],
          }),
        }),
      ],
    })
  );
}
function _({ title: e, children: t }) {
  return (0, h.jsxs)(`section`, {
    className: `mt-12`,
    children: [
      (0, h.jsx)(`h2`, {
        className: `mb-4 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]`,
        children: e,
      }),
      t,
    ],
  });
}
function v({ children: e }) {
  return (0, h.jsx)(f, { children: e });
}
function y() {
  let e = o(),
    { favSet: t, refresh: n } = u(),
    c = a(),
    f = i(),
    [y, b] = (0, m.useState)(!1);
  (0, m.useEffect)(
    () => (
      localStorage.getItem(`pulse_landing_viewed`)
        ? document.documentElement.removeAttribute(`data-landing-active`)
        : (b(!0), (document.body.style.overflow = `hidden`)),
      () => {
        document.body.style.overflow = ``;
      }
    ),
    [],
  );
  let x = () => {
      (localStorage.setItem(`pulse_landing_viewed`, `true`),
        b(!1),
        (document.body.style.overflow = ``),
        document.documentElement.removeAttribute(`data-landing-active`));
    },
    S = (0, m.useMemo)(
      () =>
        e.data
          ? {
              flagBy: new Map(e.data.meta.countries.map((e) => [e.code, e.flag])),
              catName: (t) => e.data.meta.categories.find((e) => e.id === t)?.name ?? t,
            }
          : null,
      [e.data],
    ),
    C = (0, m.useMemo)(
      () =>
        e.data
          ? [`news`, `sports`, `movies`, `entertainment`, `music`, `documentary`]
              .map((t) => {
                let n = r(e.data.indexes.by_category[t] ?? [], e.data.channels, c, f);
                return {
                  id: t,
                  name: e.data.meta.categories.find((e) => e.id === t)?.name ?? t,
                  ids: n.slice(0, 12),
                };
              })
              .filter((e) => e.ids.length > 0)
          : [],
      [e.data, c],
    ),
    w = (0, m.useMemo)(() => {
      let e = new Set();
      for (let t of C) for (let n of t.ids.slice(0, 3)) e.add(n);
      return Array.from(e);
    }, [C]);
  return (0, h.jsxs)(`div`, {
    children: [
      y && (0, h.jsx)(g, { onClose: x }),
      (0, h.jsxs)(`section`, {
        className: `relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-1)]`,
        children: [
          (0, h.jsx)(`div`, {
            className: `absolute inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay`,
            "aria-hidden": `true`,
            style: {
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundSize: `200px 200px`,
            },
          }),
          (0, h.jsx)(`div`, {
            className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[var(--border-subtle)] to-transparent opacity-40`,
            "aria-hidden": `true`,
          }),
          (0, h.jsxs)(`div`, {
            className: `hidden sm:flex items-center justify-between gap-4 px-12 py-14`,
            children: [
              (0, h.jsxs)(`div`, {
                className: `relative z-10 flex-1`,
                children: [
                  (0, h.jsx)(`p`, {
                    className: `font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--text-tertiary)] hero-item`,
                    style: { animationDelay: `0ms` },
                    children: `Free · No account · Verified live`,
                  }),
                  (0, h.jsx)(`h1`, {
                    className: `mt-4 font-display font-bold text-[var(--text-primary)] hero-item`,
                    style: {
                      fontSize: `4rem`,
                      letterSpacing: `-0.04em`,
                      lineHeight: 1.1,
                      animationDelay: `60ms`,
                    },
                    children: `Pulse`,
                  }),
                  (0, h.jsxs)(`div`, {
                    className: `mt-2 hero-item`,
                    style: { animationDelay: `110ms` },
                    children: [
                      (0, h.jsx)(`p`, {
                        className: `font-mono text-[12px] font-medium tracking-[0.35em] text-[var(--text-tertiary)] uppercase`,
                        children: `Feel Everything`,
                      }),
                      (0, h.jsx)(`div`, {
                        className: `mt-1 h-[2px] w-9 rounded-full bg-[var(--accent)]`,
                      }),
                    ],
                  }),
                  (0, h.jsx)(`div`, {
                    className: `mt-7 flex flex-wrap gap-2 hero-item`,
                    style: { animationDelay: `170ms` },
                    children: (0, h.jsxs)(s, {
                      to: `/browse`,
                      className: `btn-primary inline-flex items-center gap-1.5`,
                      children: [`Browse channels `, (0, h.jsx)(p, { className: `size-3.5` })],
                    }),
                  }),
                  (0, h.jsxs)(`div`, {
                    className: `mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11.5px] text-[var(--text-tertiary)] hero-item`,
                    style: { animationDelay: `220ms` },
                    children: [
                      e.data &&
                        (0, h.jsxs)(h.Fragment, {
                          children: [
                            (0, h.jsxs)(`span`, {
                              children: [
                                (0, h.jsx)(`strong`, {
                                  className: `text-[var(--text-primary)]`,
                                  children: e.data.indexes.all_ids.length.toLocaleString(),
                                }),
                                ` `,
                                `channels`,
                              ],
                            }),
                            (0, h.jsxs)(`span`, {
                              children: [
                                (0, h.jsx)(`strong`, {
                                  className: `text-[var(--text-primary)]`,
                                  children: e.data.meta.countries.filter(
                                    (t) => (e.data.indexes.by_country[t.code]?.length ?? 0) > 0,
                                  ).length,
                                }),
                                ` `,
                                `countries`,
                              ],
                            }),
                            (0, h.jsxs)(`span`, {
                              children: [
                                (0, h.jsx)(`strong`, {
                                  className: `text-[var(--text-primary)]`,
                                  children: e.data.meta.languages.filter(
                                    (t) => (e.data.indexes.by_language[t.code]?.length ?? 0) > 0,
                                  ).length,
                                }),
                                ` `,
                                `languages`,
                              ],
                            }),
                          ],
                        }),
                      !e.data &&
                        e.isLoading &&
                        (0, h.jsx)(`span`, { className: `shimmer h-3 w-32 rounded` }),
                    ],
                  }),
                ],
              }),
              (0, h.jsx)(`div`, {
                className: `shrink-0 opacity-80 hero-item`,
                "aria-hidden": `true`,
                style: { animationDelay: `140ms` },
                children: (0, h.jsxs)(`svg`, {
                  width: `160`,
                  height: `160`,
                  viewBox: `-7 -7 131 131`,
                  xmlns: `http://www.w3.org/2000/svg`,
                  children: [
                    (0, h.jsx)(`circle`, { cx: `0`, cy: `0`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `0`, cy: `22`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `0`, cy: `44`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `0`, cy: `66`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `0`, cy: `88`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `0`, cy: `110`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `22`, cy: `0`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `22`, cy: `22`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `22`, cy: `44`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `22`, cy: `66`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `22`, cy: `88`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `22`, cy: `110`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `44`, cy: `0`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `44`, cy: `22`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `44`, cy: `44`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `44`, cy: `66`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `44`, cy: `88`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `44`, cy: `110`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `66`, cy: `0`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `66`, cy: `22`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `66`, cy: `44`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `66`, cy: `66`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `66`, cy: `88`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `66`, cy: `110`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `88`, cy: `0`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `88`, cy: `22`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `88`, cy: `44`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `88`, cy: `66`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `88`, cy: `88`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `88`, cy: `110`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `110`, cy: `0`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `110`, cy: `22`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `110`, cy: `44`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `110`, cy: `66`, r: `7`, fill: `#34343a` }),
                    (0, h.jsx)(`circle`, { cx: `110`, cy: `88`, r: `7`, fill: `#e5484d` }),
                    (0, h.jsx)(`circle`, { cx: `110`, cy: `110`, r: `7`, fill: `#34343a` }),
                  ],
                }),
              }),
            ],
          }),
          (0, h.jsxs)(`div`, {
            className: `flex flex-col gap-5 px-5 py-8 sm:hidden`,
            children: [
              (0, h.jsx)(`p`, {
                className: `font-mono text-[9.5px] font-medium uppercase tracking-[0.22em] text-[var(--text-tertiary)]`,
                children: `Free · No account · Verified live`,
              }),
              (0, h.jsxs)(`div`, {
                className: `flex items-start justify-between`,
                children: [
                  (0, h.jsxs)(`div`, {
                    children: [
                      (0, h.jsx)(`h1`, {
                        className: `font-display text-[2.6rem] font-bold text-[var(--text-primary)]`,
                        style: { letterSpacing: `-0.04em`, lineHeight: 1.05 },
                        children: `Pulse`,
                      }),
                      (0, h.jsxs)(`div`, {
                        className: `mt-2`,
                        children: [
                          (0, h.jsx)(`p`, {
                            className: `font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--text-tertiary)]`,
                            children: `Feel Everything`,
                          }),
                          (0, h.jsx)(`div`, {
                            className: `mt-1 h-[2px] w-7 rounded-full bg-[var(--accent)]`,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, h.jsxs)(`svg`, {
                    width: `72`,
                    height: `72`,
                    viewBox: `-7 -7 131 131`,
                    xmlns: `http://www.w3.org/2000/svg`,
                    "aria-hidden": `true`,
                    className: `shrink-0 opacity-90 mt-3`,
                    children: [
                      (0, h.jsx)(`circle`, { cx: `0`, cy: `0`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `0`, cy: `22`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `0`, cy: `44`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `0`, cy: `66`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `0`, cy: `88`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `0`, cy: `110`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `22`, cy: `0`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `22`, cy: `22`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `22`, cy: `44`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `22`, cy: `66`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `22`, cy: `88`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `22`, cy: `110`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `44`, cy: `0`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `44`, cy: `22`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `44`, cy: `44`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `44`, cy: `66`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `44`, cy: `88`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `44`, cy: `110`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `66`, cy: `0`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `66`, cy: `22`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `66`, cy: `44`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `66`, cy: `66`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `66`, cy: `88`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `66`, cy: `110`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `88`, cy: `0`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `88`, cy: `22`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `88`, cy: `44`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `88`, cy: `66`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `88`, cy: `88`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `88`, cy: `110`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `110`, cy: `0`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `110`, cy: `22`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `110`, cy: `44`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `110`, cy: `66`, r: `7`, fill: `#34343a` }),
                      (0, h.jsx)(`circle`, { cx: `110`, cy: `88`, r: `7`, fill: `#e5484d` }),
                      (0, h.jsx)(`circle`, { cx: `110`, cy: `110`, r: `7`, fill: `#34343a` }),
                    ],
                  }),
                ],
              }),
              (0, h.jsxs)(s, {
                to: `/browse`,
                className: `btn-primary inline-flex w-fit items-center gap-1 px-4 py-2 text-[12px]`,
                children: [`Browse channels `, (0, h.jsx)(p, { className: `size-3` })],
              }),
              (0, h.jsxs)(`div`, {
                className: `flex gap-5 font-mono text-[10.5px] text-[var(--text-tertiary)]`,
                children: [
                  e.data &&
                    (0, h.jsxs)(h.Fragment, {
                      children: [
                        (0, h.jsxs)(`span`, {
                          children: [
                            (0, h.jsx)(`strong`, {
                              className: `text-[var(--text-primary)]`,
                              children: e.data.indexes.all_ids.length.toLocaleString(),
                            }),
                            ` `,
                            `channels`,
                          ],
                        }),
                        (0, h.jsxs)(`span`, {
                          children: [
                            (0, h.jsx)(`strong`, {
                              className: `text-[var(--text-primary)]`,
                              children: e.data.meta.countries.filter(
                                (t) => (e.data.indexes.by_country[t.code]?.length ?? 0) > 0,
                              ).length,
                            }),
                            ` `,
                            `countries`,
                          ],
                        }),
                        (0, h.jsxs)(`span`, {
                          children: [
                            (0, h.jsx)(`strong`, {
                              className: `text-[var(--text-primary)]`,
                              children: e.data.meta.languages.filter(
                                (t) => (e.data.indexes.by_language[t.code]?.length ?? 0) > 0,
                              ).length,
                            }),
                            ` `,
                            `lang`,
                          ],
                        }),
                      ],
                    }),
                  !e.data &&
                    e.isLoading &&
                    (0, h.jsx)(`span`, { className: `shimmer h-2.5 w-28 rounded` }),
                ],
              }),
            ],
          }),
        ],
      }),
      e.isLoading &&
        (0, h.jsx)(`div`, {
          className: `mt-12 space-y-12`,
          children: Array.from({ length: 3 }).map((e, t) =>
            (0, h.jsxs)(
              `section`,
              {
                children: [
                  (0, h.jsx)(`div`, { className: `shimmer mb-4 h-2.5 w-20 rounded-full` }),
                  (0, h.jsx)(`div`, {
                    className: `flex gap-3 overflow-hidden`,
                    children: Array.from({ length: 7 }).map((e, t) =>
                      (0, h.jsxs)(
                        `div`,
                        {
                          className: `w-[210px] shrink-0 space-y-2`,
                          children: [
                            (0, h.jsx)(`div`, {
                              className: `shimmer aspect-video w-full rounded-md`,
                            }),
                            (0, h.jsx)(`div`, { className: `shimmer h-3 w-3/4 rounded-full` }),
                            (0, h.jsx)(`div`, { className: `shimmer h-2.5 w-1/2 rounded-full` }),
                          ],
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              },
              t,
            ),
          ),
        }),
      e.data &&
        S &&
        (0, h.jsxs)(h.Fragment, {
          children: [
            (0, h.jsx)(d, { channelIds: w, channels: e.data.channels, limit: 24 }),
            C.map((r) =>
              (0, h.jsx)(
                _,
                {
                  title: r.name,
                  children: (0, h.jsx)(v, {
                    children: r.ids.map((r) => {
                      let i = e.data.channels[r];
                      return i
                        ? (0, h.jsx)(
                            `div`,
                            {
                              className: `w-[210px] shrink-0`,
                              children: (0, h.jsx)(l, {
                                channel: i,
                                flag: S.flagBy.get(i.country),
                                categoryName: S.catName,
                                isFavourite: t.has(r),
                                onFavouriteChange: n,
                              }),
                            },
                            r,
                          )
                        : null;
                    }),
                  }),
                },
                r.id,
              ),
            ),
          ],
        }),
    ],
  });
}
export { y as component };
