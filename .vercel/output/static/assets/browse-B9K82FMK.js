import {
  At as e,
  F as t,
  Mt as n,
  O as r,
  a as i,
  c as a,
  kt as o,
  l as s,
  o as c,
  x as l,
} from "./stream-messages-xGwTYkSz.js";
import { i as u, r as d } from "./use-favourites-D-e0KHYb.js";
import { a as f, i as p, n as m } from "./index-D4lRGdic.js";
import { t as h } from "./ChannelGrid-D-CAoj2D.js";
import { t as g } from "./BackgroundPingTrigger-CIk0TdTK.js";
var _ = l(`arrow-up-down`, [
    [`path`, { d: `m21 16-4 4-4-4`, key: `f6ql7i` }],
    [`path`, { d: `M17 20V4`, key: `1ejh1v` }],
    [`path`, { d: `m3 8 4-4 4 4`, key: `11wl7u` }],
    [`path`, { d: `M7 4v16`, key: `1glfcx` }],
  ]),
  v = l(`check`, [[`path`, { d: `M20 6 9 17l-5-5`, key: `1gmf2c` }]]),
  y = l(`chevron-down`, [[`path`, { d: `m6 9 6 6 6-6`, key: `qrunsl` }]]),
  b = l(`sliders-horizontal`, [
    [`path`, { d: `M10 5H3`, key: `1qgfaw` }],
    [`path`, { d: `M12 19H3`, key: `yhmn1j` }],
    [`path`, { d: `M14 3v4`, key: `1sua03` }],
    [`path`, { d: `M16 17v4`, key: `1q0r14` }],
    [`path`, { d: `M21 12h-9`, key: `1o4lsq` }],
    [`path`, { d: `M21 19h-5`, key: `1rlt1p` }],
    [`path`, { d: `M21 5h-7`, key: `1oszz2` }],
    [`path`, { d: `M8 10v4`, key: `tgpxqk` }],
    [`path`, { d: `M8 12H3`, key: `a7s4jb` }],
  ]),
  x = n(e(), 1),
  S = t(),
  C = { uk: `gb`, int: `` };
function w(e) {
  let t = e.toLowerCase();
  return C[t] ?? t;
}
function T({ label: e, options: t, active: n, onSelect: r, isCountry: i }) {
  let [a, o] = (0, x.useState)(!0),
    [s, c] = (0, x.useState)(``),
    l = (0, x.useMemo)(
      () => t.filter((e) => !s || e.name.toLowerCase().includes(s.toLowerCase())).slice(0, 50),
      [t, s],
    );
  return (0, S.jsxs)(`div`, {
    className: `border-b border-[var(--border-subtle)] py-5 last:border-b-0`,
    children: [
      (0, S.jsxs)(`button`, {
        type: `button`,
        onClick: () => o((e) => !e),
        className: `flex w-full items-center justify-between text-[11px] font-medium uppercase tracking-wider text-[var(--text-secondary)]`,
        children: [
          (0, S.jsx)(`span`, { children: e }),
          (0, S.jsx)(y, { className: `size-3.5 transition-transform ${a ? `` : `-rotate-90`}` }),
        ],
      }),
      a &&
        (0, S.jsxs)(`div`, {
          className: `mt-2 space-y-1.5`,
          children: [
            (0, S.jsx)(`input`, {
              className: `input-field !py-1.5 !text-[12px]`,
              placeholder: `Search ${e.toLowerCase()}…`,
              value: s,
              onChange: (e) => c(e.target.value),
            }),
            (0, S.jsxs)(`div`, {
              className: `max-h-80 overflow-y-auto pr-1`,
              children: [
                l.map((e) =>
                  (0, S.jsxs)(
                    `button`,
                    {
                      type: `button`,
                      onClick: () => r(n === e.id ? void 0 : e.id),
                      className: `flex w-full items-center justify-between rounded-[4px] px-2 py-1.5 text-left text-[12px] transition-colors ${n === e.id ? `bg-[var(--accent-subtle)] text-[var(--accent)]` : `text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]`}`,
                      children: [
                        (0, S.jsxs)(`span`, {
                          className: `flex min-w-0 items-center gap-2`,
                          children: [
                            i && e.id
                              ? (() => {
                                  let t = w(e.id);
                                  return t
                                    ? (0, S.jsx)(`img`, {
                                        src: `https://flagcdn.com/w20/${t}.png`,
                                        srcSet: `https://flagcdn.com/w40/${t}.png 2x`,
                                        width: 20,
                                        height: 15,
                                        alt: e.name,
                                        className: `shrink-0 rounded-[2px] object-cover`,
                                      })
                                    : null;
                                })()
                              : null,
                            (0, S.jsx)(`span`, { className: `truncate`, children: e.name }),
                          ],
                        }),
                        (0, S.jsx)(`span`, {
                          className: `ml-2 shrink-0 text-[10px] text-[var(--text-tertiary)]`,
                          children: e.count,
                        }),
                      ],
                    },
                    e.id,
                  ),
                ),
                l.length === 0 &&
                  (0, S.jsx)(`p`, {
                    className: `px-2 py-2 text-[11px] text-[var(--text-tertiary)]`,
                    children: `No matches`,
                  }),
              ],
            }),
          ],
        }),
    ],
  });
}
function E({ catalog: e, selected: t, onChange: n }) {
  let r = (0, x.useMemo)(
      () =>
        e.meta.languages
          .map((t) => ({
            id: t.code,
            name: t.name,
            count: e.indexes.by_language[t.code]?.length ?? 0,
          }))
          .filter((e) => e.count > 0)
          .sort((e, t) => t.count - e.count),
      [e],
    ),
    i = (0, x.useMemo)(
      () =>
        e.meta.countries
          .map((t) => ({
            id: t.code,
            name: t.name,
            flag: t.flag,
            count: e.indexes.by_country[t.code]?.length ?? 0,
          }))
          .filter((e) => e.count > 0)
          .sort((e, t) => t.count - e.count),
      [e],
    ),
    a = t.category || t.language || t.country;
  return (0, S.jsxs)(`div`, {
    className: `rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4`,
    children: [
      (0, S.jsxs)(`div`, {
        className: `flex items-center justify-between`,
        children: [
          (0, S.jsx)(`h3`, { className: `font-display text-sm font-medium`, children: `Filters` }),
          a &&
            (0, S.jsxs)(`button`, {
              type: `button`,
              onClick: () => n({ category: void 0, language: void 0, country: void 0 }),
              className: `inline-flex items-center gap-1 text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]`,
              children: [(0, S.jsx)(p, { className: `size-3` }), `Clear`],
            }),
        ],
      }),
      (0, S.jsx)(T, {
        label: `Country`,
        options: i,
        active: t.country,
        isCountry: !0,
        onSelect: (e) => n({ ...t, country: e }),
      }),
      (0, S.jsx)(T, {
        label: `Language`,
        options: r,
        active: t.language,
        onSelect: (e) => n({ ...t, language: e }),
      }),
    ],
  });
}
typeof window < `u` && window.document && window.document.createElement;
function D(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (r) {
    if ((e?.(r), n === !1 || !r.defaultPrevented)) return t?.(r);
  };
}
function O(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
function ee(...e) {
  return (t) => {
    let n = !1,
      r = e.map((e) => {
        let r = O(e, t);
        return (!n && typeof r == `function` && (n = !0), r);
      });
    if (n)
      return () => {
        for (let t = 0; t < r.length; t++) {
          let n = r[t];
          typeof n == `function` ? n() : O(e[t], null);
        }
      };
  };
}
function k(...e) {
  return x.useCallback(ee(...e), e);
}
function A(e, t = []) {
  let n = [];
  function r(t, r) {
    let i = x.createContext(r);
    i.displayName = t + `Context`;
    let a = n.length;
    n = [...n, r];
    let o = (t) => {
      let { scope: n, children: r, ...o } = t,
        s = n?.[e]?.[a] || i,
        c = x.useMemo(() => o, Object.values(o));
      return (0, S.jsx)(s.Provider, { value: c, children: r });
    };
    o.displayName = t + `Provider`;
    function s(n, o) {
      let s = o?.[e]?.[a] || i,
        c = x.useContext(s);
      if (c) return c;
      if (r !== void 0) return r;
      throw Error(`\`${n}\` must be used within \`${t}\``);
    }
    return [o, s];
  }
  let i = () => {
    let t = n.map((e) => x.createContext(e));
    return function (n) {
      let r = n?.[e] || t;
      return x.useMemo(() => ({ [`__scope${e}`]: { ...n, [e]: r } }), [n, r]);
    };
  };
  return ((i.scopeName = e), [r, j(i, ...t)]);
}
function j(...e) {
  let t = e[0];
  if (e.length === 1) return t;
  let n = () => {
    let n = e.map((e) => ({ useScope: e(), scopeName: e.scopeName }));
    return function (e) {
      let r = n.reduce((t, { useScope: n, scopeName: r }) => {
        let i = n(e)[`__scope${r}`];
        return { ...t, ...i };
      }, {});
      return x.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
    };
  };
  return ((n.scopeName = t.scopeName), n);
}
var M = globalThis?.document ? x.useLayoutEffect : () => {},
  N = x.useId || (() => void 0),
  te = 0;
function P(e) {
  let [t, n] = x.useState(N());
  return (
    M(() => {
      e || n((e) => e ?? String(te++));
    }, [e]),
    e || (t ? `radix-${t}` : ``)
  );
}
var ne = x.useInsertionEffect || M;
function re({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  let [i, a, o] = ie({ defaultProp: t, onChange: n }),
    s = e !== void 0,
    c = s ? e : i;
  {
    let t = x.useRef(e !== void 0);
    x.useEffect(() => {
      let e = t.current;
      (e !== s &&
        console.warn(
          `${r} is changing from ${e ? `controlled` : `uncontrolled`} to ${s ? `controlled` : `uncontrolled`}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (t.current = s));
    }, [s, r]);
  }
  return [
    c,
    x.useCallback(
      (t) => {
        if (s) {
          let n = ae(t) ? t(e) : t;
          n !== e && o.current?.(n);
        } else a(t);
      },
      [s, e, a, o],
    ),
  ];
}
function ie({ defaultProp: e, onChange: t }) {
  let [n, r] = x.useState(e),
    i = x.useRef(n),
    a = x.useRef(t);
  return (
    ne(() => {
      a.current = t;
    }, [t]),
    x.useEffect(() => {
      i.current !== n && (a.current?.(n), (i.current = n));
    }, [n, i]),
    [n, r, a]
  );
}
function ae(e) {
  return typeof e == `function`;
}
var F = n(o(), 1);
function I(e) {
  let t = x.forwardRef((t, n) => {
    let { children: r, ...i } = t,
      a = null,
      o = !1,
      s = [];
    (B(r) && typeof fe == `function` && (r = fe(r._payload)),
      x.Children.forEach(r, (e) => {
        if (se(e)) {
          o = !0;
          let t = e,
            n = `child` in t.props ? t.props.child : t.props.children;
          (B(n) && typeof fe == `function` && (n = fe(n._payload)),
            (a = oe(t, n)),
            s.push(a?.props?.children));
        } else s.push(e);
      }),
      a
        ? (a = x.cloneElement(a, void 0, s))
        : !o && x.Children.count(r) === 1 && x.isValidElement(r) && (a = r));
    let c = a ? z(a) : void 0,
      l = k(n, c);
    if (!a) {
      if (r || r === 0) throw Error(o ? de(e) : ue(e));
      return r;
    }
    let u = R(i, a.props ?? {});
    return (a.type !== x.Fragment && (u.ref = n ? l : c), x.cloneElement(a, u));
  });
  return ((t.displayName = `${e}.Slot`), t);
}
var L = Symbol.for(`radix.slottable`),
  oe = (e, t) => {
    if (`child` in e.props) {
      let t = e.props.child;
      return x.isValidElement(t)
        ? x.cloneElement(t, void 0, e.props.children(t.props.children))
        : null;
    }
    return x.isValidElement(t) ? t : null;
  };
function R(e, t) {
  let n = { ...t };
  for (let r in t) {
    let i = e[r],
      a = t[r];
    /^on[A-Z]/.test(r)
      ? i && a
        ? (n[r] = (...e) => {
            let t = a(...e);
            return (i(...e), t);
          })
        : i && (n[r] = i)
      : r === `style`
        ? (n[r] = { ...i, ...a })
        : r === `className` && (n[r] = [i, a].filter(Boolean).join(` `));
  }
  return { ...e, ...n };
}
function z(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function se(e) {
  return (
    x.isValidElement(e) &&
    typeof e.type == `function` &&
    `__radixId` in e.type &&
    e.type.__radixId === L
  );
}
var ce = Symbol.for(`react.lazy`);
function B(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `$$typeof` in e &&
    e.$$typeof === ce &&
    `_payload` in e &&
    le(e._payload)
  );
}
function le(e) {
  return typeof e == `object` && !!e && `then` in e;
}
var ue = (e) =>
    `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,
  de = (e) =>
    `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,
  fe = x.use,
  V = [
    `a`,
    `button`,
    `div`,
    `form`,
    `h2`,
    `h3`,
    `img`,
    `input`,
    `label`,
    `li`,
    `nav`,
    `ol`,
    `p`,
    `select`,
    `span`,
    `svg`,
    `ul`,
  ].reduce((e, t) => {
    let n = I(`Primitive.${t}`),
      r = x.forwardRef((e, r) => {
        let { asChild: i, ...a } = e,
          o = i ? n : t;
        return (
          typeof window < `u` && (window[Symbol.for(`radix-ui`)] = !0),
          (0, S.jsx)(o, { ...a, ref: r })
        );
      });
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r });
  }, {});
function pe(e, t) {
  e && F.flushSync(() => e.dispatchEvent(t));
}
function me(e) {
  let t = x.useRef(e);
  return (
    x.useEffect(() => {
      t.current = e;
    }),
    x.useMemo(
      () =>
        (...e) =>
          t.current?.(...e),
      [],
    )
  );
}
function he(e, t = globalThis?.document) {
  let n = me(e);
  x.useEffect(() => {
    let e = (e) => {
      e.key === `Escape` && n(e);
    };
    return (
      t.addEventListener(`keydown`, e, { capture: !0 }),
      () => t.removeEventListener(`keydown`, e, { capture: !0 })
    );
  }, [n, t]);
}
var ge = `DismissableLayer`,
  _e = `dismissableLayer.update`,
  ve = `dismissableLayer.pointerDownOutside`,
  ye = `dismissableLayer.focusOutside`,
  be,
  xe = x.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
    dismissableSurfaces: new Set(),
  }),
  Se = x.forwardRef((e, t) => {
    let {
        disableOutsidePointerEvents: n = !1,
        deferPointerDownOutside: r = !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: a,
        onFocusOutside: o,
        onInteractOutside: s,
        onDismiss: c,
        ...l
      } = e,
      u = x.useContext(xe),
      [d, f] = x.useState(null),
      p = d?.ownerDocument ?? globalThis?.document,
      [, m] = x.useState({}),
      h = k(t, (e) => f(e)),
      g = Array.from(u.layers),
      [_] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1),
      v = g.indexOf(_),
      y = d ? g.indexOf(d) : -1,
      b = u.layersWithOutsidePointerEventsDisabled.size > 0,
      C = y >= v,
      w = x.useRef(!1),
      T = Ee(
        (e) => {
          let t = e.target;
          if (!(t instanceof Node)) return;
          let n = [...u.branches].some((e) => e.contains(t));
          !C || n || (a?.(e), s?.(e), e.defaultPrevented || c?.());
        },
        {
          ownerDocument: p,
          deferPointerDownOutside: r,
          isDeferredPointerDownOutsideRef: w,
          dismissableSurfaces: u.dismissableSurfaces,
        },
      ),
      E = De((e) => {
        if (r && w.current) return;
        let t = e.target;
        [...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
      }, p);
    return (
      he((e) => {
        y === u.layers.size - 1 && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
      }, p),
      x.useEffect(() => {
        if (d)
          return (
            n &&
              (u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((be = p.body.style.pointerEvents), (p.body.style.pointerEvents = `none`)),
              u.layersWithOutsidePointerEventsDisabled.add(d)),
            u.layers.add(d),
            Oe(),
            () => {
              n &&
                (u.layersWithOutsidePointerEventsDisabled.delete(d),
                u.layersWithOutsidePointerEventsDisabled.size === 0 &&
                  (p.body.style.pointerEvents = be));
            }
          );
      }, [d, p, n, u]),
      x.useEffect(
        () => () => {
          d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Oe());
        },
        [d, u],
      ),
      x.useEffect(() => {
        let e = () => m({});
        return (document.addEventListener(_e, e), () => document.removeEventListener(_e, e));
      }, []),
      (0, S.jsx)(V.div, {
        ...l,
        ref: h,
        style: { pointerEvents: b ? (C ? `auto` : `none`) : void 0, ...e.style },
        onFocusCapture: D(e.onFocusCapture, E.onFocusCapture),
        onBlurCapture: D(e.onBlurCapture, E.onBlurCapture),
        onPointerDownCapture: D(e.onPointerDownCapture, T.onPointerDownCapture),
      })
    );
  });
Se.displayName = ge;
var Ce = `DismissableLayerBranch`,
  we = x.forwardRef((e, t) => {
    let n = x.useContext(xe),
      r = x.useRef(null),
      i = k(t, r);
    return (
      x.useEffect(() => {
        let e = r.current;
        if (e)
          return (
            n.branches.add(e),
            () => {
              n.branches.delete(e);
            }
          );
      }, [n.branches]),
      (0, S.jsx)(V.div, { ...e, ref: i })
    );
  });
we.displayName = Ce;
function Te() {
  let e = x.useContext(xe),
    [t, n] = x.useState(null);
  return (
    x.useEffect(() => {
      if (t)
        return (
          e.dismissableSurfaces.add(t),
          () => {
            e.dismissableSurfaces.delete(t);
          }
        );
    }, [t, e.dismissableSurfaces]),
    n
  );
}
function Ee(e, t) {
  let {
      ownerDocument: n = globalThis?.document,
      deferPointerDownOutside: r = !1,
      isDeferredPointerDownOutsideRef: i,
      dismissableSurfaces: a,
    } = t,
    o = me(e),
    s = x.useRef(!1),
    c = x.useRef(!1),
    l = x.useRef(new Map()),
    u = x.useRef(() => {});
  return (
    x.useEffect(() => {
      function e() {
        ((c.current = !1), (i.current = !1), l.current.clear());
      }
      function t() {
        return Array.from(l.current.values()).some(Boolean);
      }
      function d(e) {
        if (!c.current) return;
        let t = e.target;
        ((t instanceof Node && [...a].some((e) => e.contains(t))) || l.current.set(e.type, !0),
          e.type === `click` &&
            window.setTimeout(() => {
              c.current && u.current();
            }, 0));
      }
      function f(e) {
        c.current && l.current.set(e.type, !1);
      }
      let p = (a) => {
          if (a.target && !s.current) {
            let s = function () {
                n.removeEventListener(`click`, u.current);
                let r = t();
                (e(), r || ke(ve, o, d, { discrete: !0 }));
              },
              d = { originalEvent: a };
            ((c.current = !0),
              (i.current = r && a.button === 0),
              l.current.clear(),
              !r || a.button !== 0
                ? s()
                : (n.removeEventListener(`click`, u.current),
                  (u.current = s),
                  n.addEventListener(`click`, u.current, { once: !0 })));
          } else (n.removeEventListener(`click`, u.current), e());
          s.current = !1;
        },
        m = [`pointerup`, `mousedown`, `mouseup`, `touchstart`, `touchend`, `click`];
      for (let e of m) (n.addEventListener(e, d, !0), n.addEventListener(e, f));
      let h = window.setTimeout(() => {
        n.addEventListener(`pointerdown`, p);
      }, 0);
      return () => {
        (window.clearTimeout(h),
          n.removeEventListener(`pointerdown`, p),
          n.removeEventListener(`click`, u.current));
        for (let e of m) (n.removeEventListener(e, d, !0), n.removeEventListener(e, f));
      };
    }, [n, o, r, i, a]),
    { onPointerDownCapture: () => (s.current = !0) }
  );
}
function De(e, t = globalThis?.document) {
  let n = me(e),
    r = x.useRef(!1);
  return (
    x.useEffect(() => {
      let e = (e) => {
        e.target && !r.current && ke(ye, n, { originalEvent: e }, { discrete: !1 });
      };
      return (t.addEventListener(`focusin`, e), () => t.removeEventListener(`focusin`, e));
    }, [t, n]),
    { onFocusCapture: () => (r.current = !0), onBlurCapture: () => (r.current = !1) }
  );
}
function Oe() {
  let e = new CustomEvent(_e);
  document.dispatchEvent(e);
}
function ke(e, t, n, { discrete: r }) {
  let i = n.originalEvent.target,
    a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  (t && i.addEventListener(e, t, { once: !0 }), r ? pe(i, a) : i.dispatchEvent(a));
}
var Ae = `focusScope.autoFocusOnMount`,
  je = `focusScope.autoFocusOnUnmount`,
  Me = { bubbles: !1, cancelable: !0 },
  Ne = `FocusScope`,
  Pe = x.forwardRef((e, t) => {
    let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e,
      [s, c] = x.useState(null),
      l = me(i),
      u = me(a),
      d = x.useRef(null),
      f = k(t, (e) => c(e)),
      p = x.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    (x.useEffect(() => {
      if (r) {
        let e = function (e) {
            if (p.paused || !s) return;
            let t = e.target;
            s.contains(t) ? (d.current = t) : Ve(d.current, { select: !0 });
          },
          t = function (e) {
            if (p.paused || !s) return;
            let t = e.relatedTarget;
            t !== null && (s.contains(t) || Ve(d.current, { select: !0 }));
          },
          n = function (e) {
            if (document.activeElement === document.body)
              for (let t of e) t.removedNodes.length > 0 && Ve(s);
          };
        (document.addEventListener(`focusin`, e), document.addEventListener(`focusout`, t));
        let r = new MutationObserver(n);
        return (
          s && r.observe(s, { childList: !0, subtree: !0 }),
          () => {
            (document.removeEventListener(`focusin`, e),
              document.removeEventListener(`focusout`, t),
              r.disconnect());
          }
        );
      }
    }, [r, s, p.paused]),
      x.useEffect(() => {
        if (s) {
          He.add(p);
          let e = document.activeElement;
          if (!s.contains(e)) {
            let t = new CustomEvent(Ae, Me);
            (s.addEventListener(Ae, l),
              s.dispatchEvent(t),
              t.defaultPrevented ||
                (Fe(Ge(Le(s)), { select: !0 }), document.activeElement === e && Ve(s)));
          }
          return () => {
            (s.removeEventListener(Ae, l),
              setTimeout(() => {
                let t = new CustomEvent(je, Me);
                (s.addEventListener(je, u),
                  s.dispatchEvent(t),
                  t.defaultPrevented || Ve(e ?? document.body, { select: !0 }),
                  s.removeEventListener(je, u),
                  He.remove(p));
              }, 0));
          };
        }
      }, [s, l, u, p]));
    let m = x.useCallback(
      (e) => {
        if ((!n && !r) || p.paused) return;
        let t = e.key === `Tab` && !e.altKey && !e.ctrlKey && !e.metaKey,
          i = document.activeElement;
        if (t && i) {
          let t = e.currentTarget,
            [r, a] = Ie(t);
          r && a
            ? !e.shiftKey && i === a
              ? (e.preventDefault(), n && Ve(r, { select: !0 }))
              : e.shiftKey && i === r && (e.preventDefault(), n && Ve(a, { select: !0 }))
            : i === t && e.preventDefault();
        }
      },
      [n, r, p.paused],
    );
    return (0, S.jsx)(V.div, { tabIndex: -1, ...o, ref: f, onKeyDown: m });
  });
Pe.displayName = Ne;
function Fe(e, { select: t = !1 } = {}) {
  let n = document.activeElement;
  for (let r of e) if ((Ve(r, { select: t }), document.activeElement !== n)) return;
}
function Ie(e) {
  let t = Le(e);
  return [Re(t, e), Re(t.reverse(), e)];
}
function Le(e) {
  let t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (e) => {
        let t = e.tagName === `INPUT` && e.type === `hidden`;
        return e.disabled || e.hidden || t
          ? NodeFilter.FILTER_SKIP
          : e.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Re(e, t) {
  for (let n of e) if (!ze(n, { upTo: t })) return n;
}
function ze(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === `hidden`) return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === `none`) return !0;
    e = e.parentElement;
  }
  return !1;
}
function Be(e) {
  return e instanceof HTMLInputElement && `select` in e;
}
function Ve(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    let n = document.activeElement;
    (e.focus({ preventScroll: !0 }), e !== n && Be(e) && t && e.select());
  }
}
var He = Ue();
function Ue() {
  let e = [];
  return {
    add(t) {
      let n = e[0];
      (t !== n && n?.pause(), (e = We(e, t)), e.unshift(t));
    },
    remove(t) {
      ((e = We(e, t)), e[0]?.resume());
    },
  };
}
function We(e, t) {
  let n = [...e],
    r = n.indexOf(t);
  return (r !== -1 && n.splice(r, 1), n);
}
function Ge(e) {
  return e.filter((e) => e.tagName !== `A`);
}
var Ke = `Portal`,
  qe = x.forwardRef((e, t) => {
    let { container: n, ...r } = e,
      [i, a] = x.useState(!1);
    M(() => a(!0), []);
    let o = n || (i && globalThis?.document?.body);
    return o ? F.createPortal((0, S.jsx)(V.div, { ...r, ref: t }), o) : null;
  });
qe.displayName = Ke;
function Je(e, t) {
  return x.useReducer((e, n) => t[e][n] ?? e, e);
}
var Ye = (e) => {
  let { present: t, children: n } = e,
    r = Xe(t),
    i = typeof n == `function` ? n({ present: r.isPresent }) : x.Children.only(n),
    a = Qe(r.ref, et(i));
  return typeof n == `function` || r.isPresent ? x.cloneElement(i, { ref: a }) : null;
};
Ye.displayName = `Presence`;
function Xe(e) {
  let [t, n] = x.useState(),
    r = x.useRef(null),
    i = x.useRef(e),
    a = x.useRef(`none`),
    [o, s] = Je(e ? `mounted` : `unmounted`, {
      mounted: { UNMOUNT: `unmounted`, ANIMATION_OUT: `unmountSuspended` },
      unmountSuspended: { MOUNT: `mounted`, ANIMATION_END: `unmounted` },
      unmounted: { MOUNT: `mounted` },
    });
  return (
    x.useEffect(() => {
      let e = $e(r.current);
      a.current = o === `mounted` ? e : `none`;
    }, [o]),
    M(() => {
      let t = r.current,
        n = i.current;
      if (n !== e) {
        let r = a.current,
          o = $e(t);
        (e
          ? s(`MOUNT`)
          : o === `none` || t?.display === `none`
            ? s(`UNMOUNT`)
            : s(n && r !== o ? `ANIMATION_OUT` : `UNMOUNT`),
          (i.current = e));
      }
    }, [e, s]),
    M(() => {
      if (t) {
        let e,
          n = t.ownerDocument.defaultView ?? window,
          o = (a) => {
            let o = $e(r.current).includes(CSS.escape(a.animationName));
            if (a.target === t && o && (s(`ANIMATION_END`), !i.current)) {
              let r = t.style.animationFillMode;
              ((t.style.animationFillMode = `forwards`),
                (e = n.setTimeout(() => {
                  t.style.animationFillMode === `forwards` && (t.style.animationFillMode = r);
                })));
            }
          },
          c = (e) => {
            e.target === t && (a.current = $e(r.current));
          };
        return (
          t.addEventListener(`animationstart`, c),
          t.addEventListener(`animationcancel`, o),
          t.addEventListener(`animationend`, o),
          () => {
            (n.clearTimeout(e),
              t.removeEventListener(`animationstart`, c),
              t.removeEventListener(`animationcancel`, o),
              t.removeEventListener(`animationend`, o));
          }
        );
      } else s(`ANIMATION_END`);
    }, [t, s]),
    {
      isPresent: [`mounted`, `unmountSuspended`].includes(o),
      ref: x.useCallback((e) => {
        ((r.current = e ? getComputedStyle(e) : null), n(e));
      }, []),
    }
  );
}
function Ze(e, t) {
  if (typeof e == `function`) return e(t);
  e != null && (e.current = t);
}
function Qe(...e) {
  let t = x.useRef(e);
  return (
    (t.current = e),
    x.useCallback((e) => {
      let n = t.current,
        r = !1,
        i = n.map((t) => {
          let n = Ze(t, e);
          return (!r && typeof n == `function` && (r = !0), n);
        });
      if (r)
        return () => {
          for (let e = 0; e < i.length; e++) {
            let t = i[e];
            typeof t == `function` ? t() : Ze(n[e], null);
          }
        };
    }, [])
  );
}
function $e(e) {
  return e?.animationName || `none`;
}
function et(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, `ref`)?.get,
    n = t && `isReactWarning` in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, `ref`)?.get),
      (n = t && `isReactWarning` in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var tt = 0,
  nt = null;
function rt() {
  x.useEffect(() => {
    nt ||= { start: it(), end: it() };
    let { start: e, end: t } = nt;
    return (
      document.body.firstElementChild !== e && document.body.insertAdjacentElement(`afterbegin`, e),
      document.body.lastElementChild !== t && document.body.insertAdjacentElement(`beforeend`, t),
      tt++,
      () => {
        (tt === 1 && (nt?.start.remove(), nt?.end.remove(), (nt = null)),
          (tt = Math.max(0, tt - 1)));
      }
    );
  }, []);
}
function it() {
  let e = document.createElement(`span`);
  return (
    e.setAttribute(`data-radix-focus-guard`, ``),
    (e.tabIndex = 0),
    (e.style.outline = `none`),
    (e.style.opacity = `0`),
    (e.style.position = `fixed`),
    (e.style.pointerEvents = `none`),
    e
  );
}
var H = function () {
  return (
    (H =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var i in ((t = arguments[n]), t))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      }),
    H.apply(this, arguments)
  );
};
function at(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == `function`)
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[i]) &&
        (n[r[i]] = e[r[i]]);
  return n;
}
function ot(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && ((a ||= Array.prototype.slice.call(t, 0, r)), (a[r] = t[r]));
  return e.concat(a || Array.prototype.slice.call(t));
}
var st = `right-scroll-bar-position`,
  ct = `width-before-scroll-bar`,
  lt = `with-scroll-bars-hidden`,
  ut = `--removed-body-scroll-bar-size`;
function dt(e, t) {
  return (typeof e == `function` ? e(t) : e && (e.current = t), e);
}
function ft(e, t) {
  var n = (0, x.useState)(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(e) {
          var t = n.value;
          t !== e && ((n.value = e), n.callback(e, t));
        },
      },
    };
  })[0];
  return ((n.callback = t), n.facade);
}
var pt = typeof window < `u` ? x.useLayoutEffect : x.useEffect,
  mt = new WeakMap();
function ht(e, t) {
  var n = ft(t || null, function (t) {
    return e.forEach(function (e) {
      return dt(e, t);
    });
  });
  return (
    pt(
      function () {
        var t = mt.get(n);
        if (t) {
          var r = new Set(t),
            i = new Set(e),
            a = n.current;
          (r.forEach(function (e) {
            i.has(e) || dt(e, null);
          }),
            i.forEach(function (e) {
              r.has(e) || dt(e, a);
            }));
        }
        mt.set(n, e);
      },
      [e],
    ),
    n
  );
}
function gt(e) {
  return e;
}
function _t(e, t) {
  t === void 0 && (t = gt);
  var n = [],
    r = !1;
  return {
    read: function () {
      if (r)
        throw Error(
          "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
        );
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function (e) {
      var i = t(e, r);
      return (
        n.push(i),
        function () {
          n = n.filter(function (e) {
            return e !== i;
          });
        }
      );
    },
    assignSyncMedium: function (e) {
      for (r = !0; n.length; ) {
        var t = n;
        ((n = []), t.forEach(e));
      }
      n = {
        push: function (t) {
          return e(t);
        },
        filter: function () {
          return n;
        },
      };
    },
    assignMedium: function (e) {
      r = !0;
      var t = [];
      if (n.length) {
        var i = n;
        ((n = []), i.forEach(e), (t = n));
      }
      var a = function () {
          var n = t;
          ((t = []), n.forEach(e));
        },
        o = function () {
          return Promise.resolve().then(a);
        };
      (o(),
        (n = {
          push: function (e) {
            (t.push(e), o());
          },
          filter: function (e) {
            return ((t = t.filter(e)), n);
          },
        }));
    },
  };
}
function vt(e) {
  e === void 0 && (e = {});
  var t = _t(null);
  return ((t.options = H({ async: !0, ssr: !1 }, e)), t);
}
var yt = function (e) {
  var t = e.sideCar,
    n = at(e, [`sideCar`]);
  if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r) throw Error(`Sidecar medium not found`);
  return x.createElement(r, H({}, n));
};
yt.isSideCarExport = !0;
function bt(e, t) {
  return (e.useMedium(t), yt);
}
var xt = vt(),
  St = function () {},
  Ct = x.forwardRef(function (e, t) {
    var n = x.useRef(null),
      r = x.useState({ onScrollCapture: St, onWheelCapture: St, onTouchMoveCapture: St }),
      i = r[0],
      a = r[1],
      o = e.forwardProps,
      s = e.children,
      c = e.className,
      l = e.removeScrollBar,
      u = e.enabled,
      d = e.shards,
      f = e.sideCar,
      p = e.noRelative,
      m = e.noIsolation,
      h = e.inert,
      g = e.allowPinchZoom,
      _ = e.as,
      v = _ === void 0 ? `div` : _,
      y = e.gapMode,
      b = at(e, [
        `forwardProps`,
        `children`,
        `className`,
        `removeScrollBar`,
        `enabled`,
        `shards`,
        `sideCar`,
        `noRelative`,
        `noIsolation`,
        `inert`,
        `allowPinchZoom`,
        `as`,
        `gapMode`,
      ]),
      S = f,
      C = ht([n, t]),
      w = H(H({}, b), i);
    return x.createElement(
      x.Fragment,
      null,
      u &&
        x.createElement(S, {
          sideCar: xt,
          removeScrollBar: l,
          shards: d,
          noRelative: p,
          noIsolation: m,
          inert: h,
          setCallbacks: a,
          allowPinchZoom: !!g,
          lockRef: n,
          gapMode: y,
        }),
      o
        ? x.cloneElement(x.Children.only(s), H(H({}, w), { ref: C }))
        : x.createElement(v, H({}, w, { className: c, ref: C }), s),
    );
  });
((Ct.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }),
  (Ct.classNames = { fullWidth: ct, zeroRight: st }));
var wt,
  Tt = function () {
    if (wt) return wt;
    if (typeof __webpack_nonce__ < `u`) return __webpack_nonce__;
  };
function Et() {
  if (!document) return null;
  var e = document.createElement(`style`);
  e.type = `text/css`;
  var t = Tt();
  return (t && e.setAttribute(`nonce`, t), e);
}
function Dt(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t));
}
function Ot(e) {
  (document.head || document.getElementsByTagName(`head`)[0]).appendChild(e);
}
var kt = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        (e == 0 && (t = Et()) && (Dt(t, n), Ot(t)), e++);
      },
      remove: function () {
        (e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)));
      },
    };
  },
  At = function () {
    var e = kt();
    return function (t, n) {
      x.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n],
      );
    };
  },
  jt = function () {
    var e = At();
    return function (t) {
      var n = t.styles,
        r = t.dynamic;
      return (e(n, r), null);
    };
  },
  Mt = { left: 0, top: 0, right: 0, gap: 0 },
  Nt = function (e) {
    return parseInt(e || ``, 10) || 0;
  },
  Pt = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === `padding` ? `paddingLeft` : `marginLeft`],
      r = t[e === `padding` ? `paddingTop` : `marginTop`],
      i = t[e === `padding` ? `paddingRight` : `marginRight`];
    return [Nt(n), Nt(r), Nt(i)];
  },
  Ft = function (e) {
    if ((e === void 0 && (e = `margin`), typeof window > `u`)) return Mt;
    var t = Pt(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) };
  },
  It = jt(),
  Lt = `data-scroll-locked`,
  Rt = function (e, t, n, r) {
    var i = e.left,
      a = e.top,
      o = e.right,
      s = e.gap;
    return (
      n === void 0 && (n = `margin`),
      `
  .${lt} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Lt}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
      t && `position: relative ${r};`,
      n === `margin` &&
        `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
      n === `padding` && `padding-right: ${s}px ${r};`,
    ]
      .filter(Boolean)
      .join(``)}
  }
  
  .${st} {
    right: ${s}px ${r};
  }
  
  .${ct} {
    margin-right: ${s}px ${r};
  }
  
  .${st} .${st} {
    right: 0 ${r};
  }
  
  .${ct} .${ct} {
    margin-right: 0 ${r};
  }
  
  body[${Lt}] {
    ${ut}: ${s}px;
  }
`
    );
  },
  zt = function () {
    var e = parseInt(document.body.getAttribute(`data-scroll-locked`) || `0`, 10);
    return isFinite(e) ? e : 0;
  },
  Bt = function () {
    x.useEffect(function () {
      return (
        document.body.setAttribute(Lt, (zt() + 1).toString()),
        function () {
          var e = zt() - 1;
          e <= 0 ? document.body.removeAttribute(Lt) : document.body.setAttribute(Lt, e.toString());
        }
      );
    }, []);
  },
  Vt = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      i = r === void 0 ? `margin` : r;
    Bt();
    var a = x.useMemo(
      function () {
        return Ft(i);
      },
      [i],
    );
    return x.createElement(It, { styles: Rt(a, !t, i, n ? `` : `!important`) });
  },
  Ht = !1;
if (typeof window < `u`)
  try {
    var Ut = Object.defineProperty({}, "passive", {
      get: function () {
        return ((Ht = !0), !0);
      },
    });
    (window.addEventListener(`test`, Ut, Ut), window.removeEventListener(`test`, Ut, Ut));
  } catch {
    Ht = !1;
  }
var Wt = Ht ? { passive: !1 } : !1,
  Gt = function (e) {
    return e.tagName === `TEXTAREA`;
  },
  Kt = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return n[t] !== `hidden` && !(n.overflowY === n.overflowX && !Gt(e) && n[t] === `visible`);
  },
  qt = function (e) {
    return Kt(e, `overflowY`);
  },
  Jt = function (e) {
    return Kt(e, `overflowX`);
  },
  Yt = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      if ((typeof ShadowRoot < `u` && r instanceof ShadowRoot && (r = r.host), Qt(e, r))) {
        var i = $t(e, r);
        if (i[1] > i[2]) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  Xt = function (e) {
    return [e.scrollTop, e.scrollHeight, e.clientHeight];
  },
  Zt = function (e) {
    return [e.scrollLeft, e.scrollWidth, e.clientWidth];
  },
  Qt = function (e, t) {
    return e === `v` ? qt(t) : Jt(t);
  },
  $t = function (e, t) {
    return e === `v` ? Xt(t) : Zt(t);
  },
  en = function (e, t) {
    return e === `h` && t === `rtl` ? -1 : 1;
  },
  tn = function (e, t, n, r, i) {
    var a = en(e, window.getComputedStyle(t).direction),
      o = a * r,
      s = n.target,
      c = t.contains(s),
      l = !1,
      u = o > 0,
      d = 0,
      f = 0;
    do {
      if (!s) break;
      var p = $t(e, s),
        m = p[0],
        h = p[1] - p[2] - a * m;
      (m || h) && Qt(e, s) && ((d += h), (f += m));
      var g = s.parentNode;
      s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
    } while ((!c && s !== document.body) || (c && (t.contains(s) || t === s)));
    return (
      ((u && ((i && Math.abs(d) < 1) || (!i && o > d))) ||
        (!u && ((i && Math.abs(f) < 1) || (!i && -o > f)))) &&
        (l = !0),
      l
    );
  },
  nn = function (e) {
    return `changedTouches` in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  rn = function (e) {
    return [e.deltaX, e.deltaY];
  },
  an = function (e) {
    return e && `current` in e ? e.current : e;
  },
  on = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  sn = function (e) {
    return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
  },
  cn = 0,
  ln = [];
function un(e) {
  var t = x.useRef([]),
    n = x.useRef([0, 0]),
    r = x.useRef(),
    i = x.useState(cn++)[0],
    a = x.useState(jt)[0],
    o = x.useRef(e);
  (x.useEffect(
    function () {
      o.current = e;
    },
    [e],
  ),
    x.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add(`block-interactivity-${i}`);
          var t = ot([e.lockRef.current], (e.shards || []).map(an), !0).filter(Boolean);
          return (
            t.forEach(function (e) {
              return e.classList.add(`allow-interactivity-${i}`);
            }),
            function () {
              (document.body.classList.remove(`block-interactivity-${i}`),
                t.forEach(function (e) {
                  return e.classList.remove(`allow-interactivity-${i}`);
                }));
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ));
  var s = x.useCallback(function (e, t) {
      if ((`touches` in e && e.touches.length === 2) || (e.type === `wheel` && e.ctrlKey))
        return !o.current.allowPinchZoom;
      var i = nn(e),
        a = n.current,
        s = `deltaX` in e ? e.deltaX : a[0] - i[0],
        c = `deltaY` in e ? e.deltaY : a[1] - i[1],
        l,
        u = e.target,
        d = Math.abs(s) > Math.abs(c) ? `h` : `v`;
      if (`touches` in e && d === `h` && u.type === `range`) return !1;
      var f = window.getSelection(),
        p = f && f.anchorNode;
      if (p && (p === u || p.contains(u))) return !1;
      var m = Yt(d, u);
      if (!m) return !0;
      if ((m ? (l = d) : ((l = d === `v` ? `h` : `v`), (m = Yt(d, u))), !m)) return !1;
      if ((!r.current && `changedTouches` in e && (s || c) && (r.current = l), !l)) return !0;
      var h = r.current || l;
      return tn(h, t, e, h === `h` ? s : c, !0);
    }, []),
    c = x.useCallback(function (e) {
      var n = e;
      if (!(!ln.length || ln[ln.length - 1] !== a)) {
        var r = `deltaY` in n ? rn(n) : nn(n),
          i = t.current.filter(function (e) {
            return (
              e.name === n.type &&
              (e.target === n.target || n.target === e.shadowParent) &&
              on(e.delta, r)
            );
          })[0];
        if (i && i.should) {
          n.cancelable && n.preventDefault();
          return;
        }
        if (!i) {
          var c = (o.current.shards || [])
            .map(an)
            .filter(Boolean)
            .filter(function (e) {
              return e.contains(n.target);
            });
          (c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) &&
            n.cancelable &&
            n.preventDefault();
        }
      }
    }, []),
    l = x.useCallback(function (e, n, r, i) {
      var a = { name: e, delta: n, target: r, should: i, shadowParent: dn(r) };
      (t.current.push(a),
        setTimeout(function () {
          t.current = t.current.filter(function (e) {
            return e !== a;
          });
        }, 1));
    }, []),
    u = x.useCallback(function (e) {
      ((n.current = nn(e)), (r.current = void 0));
    }, []),
    d = x.useCallback(function (t) {
      l(t.type, rn(t), t.target, s(t, e.lockRef.current));
    }, []),
    f = x.useCallback(function (t) {
      l(t.type, nn(t), t.target, s(t, e.lockRef.current));
    }, []);
  x.useEffect(function () {
    return (
      ln.push(a),
      e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: f }),
      document.addEventListener(`wheel`, c, Wt),
      document.addEventListener(`touchmove`, c, Wt),
      document.addEventListener(`touchstart`, u, Wt),
      function () {
        ((ln = ln.filter(function (e) {
          return e !== a;
        })),
          document.removeEventListener(`wheel`, c, Wt),
          document.removeEventListener(`touchmove`, c, Wt),
          document.removeEventListener(`touchstart`, u, Wt));
      }
    );
  }, []);
  var p = e.removeScrollBar,
    m = e.inert;
  return x.createElement(
    x.Fragment,
    null,
    m ? x.createElement(a, { styles: sn(i) }) : null,
    p ? x.createElement(Vt, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  );
}
function dn(e) {
  for (var t = null; e !== null; )
    (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode));
  return t;
}
var fn = bt(xt, un),
  pn = x.forwardRef(function (e, t) {
    return x.createElement(Ct, H({}, e, { ref: t, sideCar: fn }));
  });
pn.classNames = Ct.classNames;
var mn = function (e) {
    return typeof document > `u` ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
  },
  hn = new WeakMap(),
  gn = new WeakMap(),
  _n = {},
  vn = 0,
  yn = function (e) {
    return e && (e.host || yn(e.parentNode));
  },
  bn = function (e, t) {
    return t
      .map(function (t) {
        if (e.contains(t)) return t;
        var n = yn(t);
        return n && e.contains(n)
          ? n
          : (console.error(`aria-hidden`, t, `in not contained inside`, e, `. Doing nothing`),
            null);
      })
      .filter(function (e) {
        return !!e;
      });
  },
  xn = function (e, t, n, r) {
    var i = bn(t, Array.isArray(e) ? e : [e]);
    _n[n] || (_n[n] = new WeakMap());
    var a = _n[n],
      o = [],
      s = new Set(),
      c = new Set(i),
      l = function (e) {
        !e || s.has(e) || (s.add(e), l(e.parentNode));
      };
    i.forEach(l);
    var u = function (e) {
      !e ||
        c.has(e) ||
        Array.prototype.forEach.call(e.children, function (e) {
          if (s.has(e)) u(e);
          else
            try {
              var t = e.getAttribute(r),
                i = t !== null && t !== `false`,
                c = (hn.get(e) || 0) + 1,
                l = (a.get(e) || 0) + 1;
              (hn.set(e, c),
                a.set(e, l),
                o.push(e),
                c === 1 && i && gn.set(e, !0),
                l === 1 && e.setAttribute(n, `true`),
                i || e.setAttribute(r, `true`));
            } catch (t) {
              console.error(`aria-hidden: cannot operate on `, e, t);
            }
        });
    };
    return (
      u(t),
      s.clear(),
      vn++,
      function () {
        (o.forEach(function (e) {
          var t = hn.get(e) - 1,
            i = a.get(e) - 1;
          (hn.set(e, t),
            a.set(e, i),
            t || (gn.has(e) || e.removeAttribute(r), gn.delete(e)),
            i || e.removeAttribute(n));
        }),
          vn--,
          vn || ((hn = new WeakMap()), (hn = new WeakMap()), (gn = new WeakMap()), (_n = {})));
      }
    );
  },
  Sn = function (e, t, n) {
    n === void 0 && (n = `data-aria-hidden`);
    var r = Array.from(Array.isArray(e) ? e : [e]),
      i = t || mn(e);
    return i
      ? (r.push.apply(r, Array.from(i.querySelectorAll(`[aria-live], script`))),
        xn(r, i, n, `aria-hidden`))
      : function () {
          return null;
        };
  },
  Cn = `Dialog`,
  [wn, Tn] = A(Cn),
  [En, U] = wn(Cn),
  Dn = (e) => {
    let {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: i,
        onOpenChange: a,
        modal: o = !0,
      } = e,
      s = x.useRef(null),
      c = x.useRef(null),
      [l, u] = re({ prop: r, defaultProp: i ?? !1, onChange: a, caller: Cn });
    return (0, S.jsx)(En, {
      scope: t,
      triggerRef: s,
      contentRef: c,
      contentId: P(),
      titleId: P(),
      descriptionId: P(),
      open: l,
      onOpenChange: u,
      onOpenToggle: x.useCallback(() => u((e) => !e), [u]),
      modal: o,
      children: n,
    });
  };
Dn.displayName = Cn;
var On = `DialogTrigger`,
  kn = x.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = U(On, n),
      a = k(t, i.triggerRef);
    return (0, S.jsx)(V.button, {
      type: `button`,
      "aria-haspopup": `dialog`,
      "aria-expanded": i.open,
      "aria-controls": i.open ? i.contentId : void 0,
      "data-state": Yn(i.open),
      ...r,
      ref: a,
      onClick: D(e.onClick, i.onOpenToggle),
    });
  });
kn.displayName = On;
var An = `DialogPortal`,
  [jn, Mn] = wn(An, { forceMount: void 0 }),
  Nn = (e) => {
    let { __scopeDialog: t, forceMount: n, children: r, container: i } = e,
      a = U(An, t);
    return (0, S.jsx)(jn, {
      scope: t,
      forceMount: n,
      children: x.Children.map(r, (e) =>
        (0, S.jsx)(Ye, {
          present: n || a.open,
          children: (0, S.jsx)(qe, { asChild: !0, container: i, children: e }),
        }),
      ),
    });
  };
Nn.displayName = An;
var Pn = `DialogOverlay`,
  Fn = x.forwardRef((e, t) => {
    let n = Mn(Pn, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      a = U(Pn, e.__scopeDialog);
    return a.modal
      ? (0, S.jsx)(Ye, { present: r || a.open, children: (0, S.jsx)(Ln, { ...i, ref: t }) })
      : null;
  });
Fn.displayName = Pn;
var In = I(`DialogOverlay.RemoveScroll`),
  Ln = x.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = U(Pn, n),
      a = k(t, Te());
    return (0, S.jsx)(pn, {
      as: In,
      allowPinchZoom: !0,
      shards: [i.contentRef],
      children: (0, S.jsx)(V.div, {
        "data-state": Yn(i.open),
        ...r,
        ref: a,
        style: { pointerEvents: `auto`, ...r.style },
      }),
    });
  }),
  Rn = `DialogContent`,
  zn = x.forwardRef((e, t) => {
    let n = Mn(Rn, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...i } = e,
      a = U(Rn, e.__scopeDialog);
    return (0, S.jsx)(Ye, {
      present: r || a.open,
      children: a.modal ? (0, S.jsx)(Bn, { ...i, ref: t }) : (0, S.jsx)(Vn, { ...i, ref: t }),
    });
  });
zn.displayName = Rn;
var Bn = x.forwardRef((e, t) => {
    let n = U(Rn, e.__scopeDialog),
      r = x.useRef(null),
      i = k(t, n.contentRef, r);
    return (
      x.useEffect(() => {
        let e = r.current;
        if (e) return Sn(e);
      }, []),
      (0, S.jsx)(Hn, {
        ...e,
        ref: i,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        onCloseAutoFocus: D(e.onCloseAutoFocus, (e) => {
          (e.preventDefault(), n.triggerRef.current?.focus());
        }),
        onPointerDownOutside: D(e.onPointerDownOutside, (e) => {
          let t = e.detail.originalEvent,
            n = t.button === 0 && t.ctrlKey === !0;
          (t.button === 2 || n) && e.preventDefault();
        }),
        onFocusOutside: D(e.onFocusOutside, (e) => e.preventDefault()),
      })
    );
  }),
  Vn = x.forwardRef((e, t) => {
    let n = U(Rn, e.__scopeDialog),
      r = x.useRef(!1),
      i = x.useRef(!1);
    return (0, S.jsx)(Hn, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (t) => {
        (e.onCloseAutoFocus?.(t),
          t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()),
          (r.current = !1),
          (i.current = !1));
      },
      onInteractOutside: (t) => {
        (e.onInteractOutside?.(t),
          t.defaultPrevented ||
            ((r.current = !0), t.detail.originalEvent.type === `pointerdown` && (i.current = !0)));
        let a = t.target;
        (n.triggerRef.current?.contains(a) && t.preventDefault(),
          t.detail.originalEvent.type === `focusin` && i.current && t.preventDefault());
      },
    });
  }),
  Hn = x.forwardRef((e, t) => {
    let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e,
      s = U(Rn, n);
    return (
      rt(),
      (0, S.jsx)(S.Fragment, {
        children: (0, S.jsx)(Pe, {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: i,
          onUnmountAutoFocus: a,
          children: (0, S.jsx)(Se, {
            role: `dialog`,
            id: s.contentId,
            "aria-describedby": s.descriptionId,
            "aria-labelledby": s.titleId,
            "data-state": Yn(s.open),
            ...o,
            ref: t,
            deferPointerDownOutside: !0,
            onDismiss: () => s.onOpenChange(!1),
          }),
        }),
      })
    );
  }),
  Un = `DialogTitle`,
  Wn = x.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = U(Un, n);
    return (0, S.jsx)(V.h2, { id: i.titleId, ...r, ref: t });
  });
Wn.displayName = Un;
var Gn = `DialogDescription`,
  Kn = x.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = U(Gn, n);
    return (0, S.jsx)(V.p, { id: i.descriptionId, ...r, ref: t });
  });
Kn.displayName = Gn;
var qn = `DialogClose`,
  Jn = x.forwardRef((e, t) => {
    let { __scopeDialog: n, ...r } = e,
      i = U(qn, n);
    return (0, S.jsx)(V.button, {
      type: `button`,
      ...r,
      ref: t,
      onClick: D(e.onClick, () => i.onOpenChange(!1)),
    });
  });
Jn.displayName = qn;
function Yn(e) {
  return e ? `open` : `closed`;
}
function Xn(e) {
  if (!e || typeof document > `u`) return;
  let t = document.head || document.getElementsByTagName(`head`)[0],
    n = document.createElement(`style`);
  ((n.type = `text/css`),
    t.appendChild(n),
    n.styleSheet ? (n.styleSheet.cssText = e) : n.appendChild(document.createTextNode(e)));
}
var Zn = x.createContext({
    drawerRef: { current: null },
    overlayRef: { current: null },
    onPress: () => {},
    onRelease: () => {},
    onDrag: () => {},
    onNestedDrag: () => {},
    onNestedOpenChange: () => {},
    onNestedRelease: () => {},
    openProp: void 0,
    dismissible: !1,
    isOpen: !1,
    isDragging: !1,
    keyboardIsOpen: { current: !1 },
    snapPointsOffset: null,
    snapPoints: null,
    handleOnly: !1,
    modal: !1,
    shouldFade: !1,
    activeSnapPoint: null,
    onOpenChange: () => {},
    setActiveSnapPoint: () => {},
    closeDrawer: () => {},
    direction: `bottom`,
    shouldAnimate: { current: !0 },
    shouldScaleBackground: !1,
    setBackgroundColorOnScale: !0,
    noBodyStyles: !1,
    container: null,
    autoFocus: !1,
  }),
  Qn = () => {
    let e = x.useContext(Zn);
    if (!e) throw Error(`useDrawerContext must be used within a Drawer.Root`);
    return e;
  };
Xn(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}`);
function $n() {
  let e = navigator.userAgent;
  return typeof window < `u` && ((/Firefox/.test(e) && /Mobile/.test(e)) || /FxiOS/.test(e));
}
function er() {
  return ar(/^Mac/);
}
function tr() {
  return ar(/^iPhone/);
}
function nr() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function rr() {
  return ar(/^iPad/) || (er() && navigator.maxTouchPoints > 1);
}
function ir() {
  return tr() || rr();
}
function ar(e) {
  return typeof window < `u` && window.navigator != null
    ? e.test(window.navigator.platform)
    : void 0;
}
var or = 24,
  sr = typeof window < `u` ? x.useLayoutEffect : x.useEffect;
function cr(...e) {
  return (...t) => {
    for (let n of e) typeof n == `function` && n(...t);
  };
}
var lr = typeof document < `u` && window.visualViewport;
function ur(e) {
  let t = window.getComputedStyle(e);
  return /(auto|scroll)/.test(t.overflow + t.overflowX + t.overflowY);
}
function dr(e) {
  for (ur(e) && (e = e.parentElement); e && !ur(e); ) e = e.parentElement;
  return e || document.scrollingElement || document.documentElement;
}
var fr = new Set([
    `checkbox`,
    `radio`,
    `range`,
    `color`,
    `file`,
    `image`,
    `button`,
    `submit`,
    `reset`,
  ]),
  pr = 0,
  mr;
function hr(e = {}) {
  let { isDisabled: t } = e;
  sr(() => {
    if (!t)
      return (
        pr++,
        pr === 1 && ir() && (mr = gr()),
        () => {
          (pr--, pr === 0 && mr?.());
        }
      );
  }, [t]);
}
function gr() {
  let e,
    t = 0,
    n = (n) => {
      ((e = dr(n.target)),
        !(e === document.documentElement && e === document.body) &&
          (t = n.changedTouches[0].pageY));
    },
    r = (n) => {
      if (!e || e === document.documentElement || e === document.body) {
        n.preventDefault();
        return;
      }
      let r = n.changedTouches[0].pageY,
        i = e.scrollTop,
        a = e.scrollHeight - e.clientHeight;
      a !== 0 && (((i <= 0 && r > t) || (i >= a && r < t)) && n.preventDefault(), (t = r));
    },
    i = (e) => {
      let t = e.target;
      br(t) &&
        t !== document.activeElement &&
        (e.preventDefault(),
        (t.style.transform = `translateY(-2000px)`),
        t.focus(),
        requestAnimationFrame(() => {
          t.style.transform = ``;
        }));
    },
    a = (e) => {
      let t = e.target;
      br(t) &&
        ((t.style.transform = `translateY(-2000px)`),
        requestAnimationFrame(() => {
          ((t.style.transform = ``),
            lr &&
              (lr.height < window.innerHeight
                ? requestAnimationFrame(() => {
                    yr(t);
                  })
                : lr.addEventListener(`resize`, () => yr(t), { once: !0 })));
        }));
    },
    o = () => {
      window.scrollTo(0, 0);
    },
    s = window.pageXOffset,
    c = window.pageYOffset,
    l = cr(
      _r(
        document.documentElement,
        `paddingRight`,
        `${window.innerWidth - document.documentElement.clientWidth}px`,
      ),
    );
  window.scrollTo(0, 0);
  let u = cr(
    vr(document, `touchstart`, n, { passive: !1, capture: !0 }),
    vr(document, `touchmove`, r, { passive: !1, capture: !0 }),
    vr(document, `touchend`, i, { passive: !1, capture: !0 }),
    vr(document, `focus`, a, !0),
    vr(window, `scroll`, o),
  );
  return () => {
    (l(), u(), window.scrollTo(s, c));
  };
}
function _r(e, t, n) {
  let r = e.style[t];
  return (
    (e.style[t] = n),
    () => {
      e.style[t] = r;
    }
  );
}
function vr(e, t, n, r) {
  return (
    e.addEventListener(t, n, r),
    () => {
      e.removeEventListener(t, n, r);
    }
  );
}
function yr(e) {
  let t = document.scrollingElement || document.documentElement;
  for (; e && e !== t; ) {
    let t = dr(e);
    if (t !== document.documentElement && t !== document.body && t !== e) {
      let n = t.getBoundingClientRect().top,
        r = e.getBoundingClientRect().top;
      e.getBoundingClientRect().bottom > t.getBoundingClientRect().bottom + or &&
        (t.scrollTop += r - n);
    }
    e = t.parentElement;
  }
}
function br(e) {
  return (
    (e instanceof HTMLInputElement && !fr.has(e.type)) ||
    e instanceof HTMLTextAreaElement ||
    (e instanceof HTMLElement && e.isContentEditable)
  );
}
function xr(e, t) {
  typeof e == `function` ? e(t) : e != null && (e.current = t);
}
function Sr(...e) {
  return (t) => e.forEach((e) => xr(e, t));
}
function Cr(...e) {
  return x.useCallback(Sr(...e), e);
}
var wr = new WeakMap();
function W(e, t, n = !1) {
  if (!e || !(e instanceof HTMLElement)) return;
  let r = {};
  (Object.entries(t).forEach(([t, n]) => {
    if (t.startsWith(`--`)) {
      e.style.setProperty(t, n);
      return;
    }
    ((r[t] = e.style[t]), (e.style[t] = n));
  }),
    !n && wr.set(e, r));
}
function Tr(e, t) {
  if (!e || !(e instanceof HTMLElement)) return;
  let n = wr.get(e);
  n && (e.style[t] = n[t]);
}
var G = (e) => {
  switch (e) {
    case `top`:
    case `bottom`:
      return !0;
    case `left`:
    case `right`:
      return !1;
    default:
      return e;
  }
};
function Er(e, t) {
  if (!e) return null;
  let n = window.getComputedStyle(e),
    r = n.transform || n.webkitTransform || n.mozTransform,
    i = r.match(/^matrix3d\((.+)\)$/);
  return i
    ? parseFloat(i[1].split(`, `)[G(t) ? 13 : 12])
    : ((i = r.match(/^matrix\((.+)\)$/)), i ? parseFloat(i[1].split(`, `)[G(t) ? 5 : 4]) : null);
}
function Dr(e) {
  return 8 * (Math.log(e + 1) - 2);
}
function Or(e, t) {
  if (!e) return () => {};
  let n = e.style.cssText;
  return (
    Object.assign(e.style, t),
    () => {
      e.style.cssText = n;
    }
  );
}
var K = { DURATION: 0.5, EASE: [0.32, 0.72, 0, 1] },
  kr = 0.4,
  Ar = 0.25,
  jr = 100,
  Mr = 8,
  Nr = 16,
  Pr = 26,
  Fr = `vaul-dragging`;
function Ir(e) {
  let t = x.useRef(e);
  return (
    x.useEffect(() => {
      t.current = e;
    }),
    x.useMemo(
      () =>
        (...e) =>
          t.current == null ? void 0 : t.current.call(t, ...e),
      [],
    )
  );
}
function Lr({ defaultProp: e, onChange: t }) {
  let n = x.useState(e),
    [r] = n,
    i = x.useRef(r),
    a = Ir(t);
  return (
    x.useEffect(() => {
      i.current !== r && (a(r), (i.current = r));
    }, [r, i, a]),
    n
  );
}
function Rr({ prop: e, defaultProp: t, onChange: n = () => {} }) {
  let [r, i] = Lr({ defaultProp: t, onChange: n }),
    a = e !== void 0,
    o = a ? e : r,
    s = Ir(n);
  return [
    o,
    x.useCallback(
      (t) => {
        if (a) {
          let n = typeof t == `function` ? t(e) : t;
          n !== e && s(n);
        } else i(t);
      },
      [a, e, i, s],
    ),
  ];
}
function zr({
  activeSnapPointProp: e,
  setActiveSnapPointProp: t,
  snapPoints: n,
  drawerRef: r,
  overlayRef: i,
  fadeFromIndex: a,
  onSnapPointChange: o,
  direction: s = `bottom`,
  container: c,
  snapToSequentialPoint: l,
}) {
  let [u, d] = Rr({ prop: e, defaultProp: n?.[0], onChange: t }),
    [f, p] = x.useState(
      typeof window < `u`
        ? { innerWidth: window.innerWidth, innerHeight: window.innerHeight }
        : void 0,
    );
  x.useEffect(() => {
    function e() {
      p({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
    }
    return (window.addEventListener(`resize`, e), () => window.removeEventListener(`resize`, e));
  }, []);
  let m = x.useMemo(() => u === n?.[n.length - 1] || null, [n, u]),
    h = x.useMemo(() => n?.findIndex((e) => e === u) ?? null, [n, u]),
    g = (n && n.length > 0 && (a || a === 0) && !Number.isNaN(a) && n[a] === u) || !n,
    _ = x.useMemo(() => {
      let e = c
        ? { width: c.getBoundingClientRect().width, height: c.getBoundingClientRect().height }
        : typeof window < `u`
          ? { width: window.innerWidth, height: window.innerHeight }
          : { width: 0, height: 0 };
      return (
        n?.map((t) => {
          let n = typeof t == `string`,
            r = 0;
          if ((n && (r = parseInt(t, 10)), G(s))) {
            let i = n ? r : f ? t * e.height : 0;
            return f ? (s === `bottom` ? e.height - i : -e.height + i) : i;
          }
          let i = n ? r : f ? t * e.width : 0;
          return f ? (s === `right` ? e.width - i : -e.width + i) : i;
        }) ?? []
      );
    }, [n, f, c]),
    v = x.useMemo(() => (h === null ? null : _?.[h]), [_, h]),
    y = x.useCallback(
      (e) => {
        let t = _?.findIndex((t) => t === e) ?? null;
        (o(t),
          W(r.current, {
            transition: `transform ${K.DURATION}s cubic-bezier(${K.EASE.join(`,`)})`,
            transform: G(s) ? `translate3d(0, ${e}px, 0)` : `translate3d(${e}px, 0, 0)`,
          }),
          _ && t !== _.length - 1 && a !== void 0 && t !== a && t < a
            ? W(i.current, {
                transition: `opacity ${K.DURATION}s cubic-bezier(${K.EASE.join(`,`)})`,
                opacity: `0`,
              })
            : W(i.current, {
                transition: `opacity ${K.DURATION}s cubic-bezier(${K.EASE.join(`,`)})`,
                opacity: `1`,
              }),
          d(n?.[Math.max(t, 0)]));
      },
      [r.current, n, _, a, i, d],
    );
  x.useEffect(() => {
    if (u || e) {
      let t = n?.findIndex((t) => t === e || t === u) ?? -1;
      _ && t !== -1 && typeof _[t] == `number` && y(_[t]);
    }
  }, [u, e, n, _, y]);
  function b({ draggedDistance: e, closeDrawer: t, velocity: r, dismissible: o }) {
    if (a === void 0) return;
    let c = s === `bottom` || s === `right` ? (v ?? 0) - e : (v ?? 0) + e,
      u = h === a - 1,
      d = h === 0,
      f = e > 0;
    if (
      (u &&
        W(i.current, { transition: `opacity ${K.DURATION}s cubic-bezier(${K.EASE.join(`,`)})` }),
      !l && r > 2 && !f)
    ) {
      o ? t() : y(_[0]);
      return;
    }
    if (!l && r > 2 && f && _ && n) {
      y(_[n.length - 1]);
      return;
    }
    let p = _?.reduce((e, t) =>
        typeof e != `number` || typeof t != `number`
          ? e
          : Math.abs(t - c) < Math.abs(e - c)
            ? t
            : e,
      ),
      g = G(s) ? window.innerHeight : window.innerWidth;
    if (r > kr && Math.abs(e) < g * 0.4) {
      let e = f ? 1 : -1;
      if (e > 0 && m && n) {
        y(_[n.length - 1]);
        return;
      }
      if ((d && e < 0 && o && t(), h === null)) return;
      y(_[h + e]);
      return;
    }
    y(p);
  }
  function S({ draggedDistance: e }) {
    if (v === null) return;
    let t = s === `bottom` || s === `right` ? v - e : v + e;
    ((s === `bottom` || s === `right`) && t < _[_.length - 1]) ||
      ((s === `top` || s === `left`) && t > _[_.length - 1]) ||
      W(r.current, { transform: G(s) ? `translate3d(0, ${t}px, 0)` : `translate3d(${t}px, 0, 0)` });
  }
  function C(e, t) {
    if (!n || typeof h != `number` || !_ || a === void 0) return null;
    let r = h === a - 1;
    if (h >= a && t) return 0;
    if (r && !t) return 1;
    if (!g && !r) return null;
    let i = r ? h + 1 : h - 1,
      o = r ? _[i] - _[i - 1] : _[i + 1] - _[i],
      s = e / Math.abs(o);
    return r ? 1 - s : s;
  }
  return {
    isLastSnapPoint: m,
    activeSnapPoint: u,
    shouldFade: g,
    getPercentageDragged: C,
    setActiveSnapPoint: d,
    activeSnapPointIndex: h,
    onRelease: b,
    onDrag: S,
    snapPointsOffset: _,
  };
}
function Br() {
  let {
      direction: e,
      isOpen: t,
      shouldScaleBackground: n,
      setBackgroundColorOnScale: r,
      noBodyStyles: i,
    } = Qn(),
    a = x.useRef(null),
    o = (0, x.useMemo)(() => document.body.style.backgroundColor, []);
  function s() {
    return (window.innerWidth - Pr) / window.innerWidth;
  }
  x.useEffect(() => {
    if (t && n) {
      a.current && clearTimeout(a.current);
      let t =
        document.querySelector(`[data-vaul-drawer-wrapper]`) ||
        document.querySelector(`[vaul-drawer-wrapper]`);
      if (!t) return;
      (r && !i && Or(document.body, { background: `black` }),
        Or(t, {
          transformOrigin: G(e) ? `top` : `left`,
          transitionProperty: `transform, border-radius`,
          transitionDuration: `${K.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${K.EASE.join(`,`)})`,
        }));
      let n = Or(t, {
        borderRadius: `${Mr}px`,
        overflow: `hidden`,
        ...(G(e)
          ? { transform: `scale(${s()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)` }
          : {
              transform: `scale(${s()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
            }),
      });
      return () => {
        (n(),
          (a.current = window.setTimeout(() => {
            o
              ? (document.body.style.background = o)
              : document.body.style.removeProperty(`background`);
          }, K.DURATION * 1e3)));
      };
    }
  }, [t, n, o]);
}
var Vr = null;
function Hr({
  isOpen: e,
  modal: t,
  nested: n,
  hasBeenOpened: r,
  preventScrollRestoration: i,
  noBodyStyles: a,
}) {
  let [o, s] = x.useState(() => (typeof window < `u` ? window.location.href : ``)),
    c = x.useRef(0),
    l = x.useCallback(() => {
      if (nr() && Vr === null && e && !a) {
        Vr = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          height: document.body.style.height,
          right: `unset`,
        };
        let { scrollX: e, innerHeight: t } = window;
        (document.body.style.setProperty(`position`, `fixed`, `important`),
          Object.assign(document.body.style, {
            top: `${-c.current}px`,
            left: `${-e}px`,
            right: `0px`,
            height: `auto`,
          }),
          window.setTimeout(
            () =>
              window.requestAnimationFrame(() => {
                let e = t - window.innerHeight;
                e && c.current >= t && (document.body.style.top = `${-(c.current + e)}px`);
              }),
            300,
          ));
      }
    }, [e]),
    u = x.useCallback(() => {
      if (nr() && Vr !== null && !a) {
        let e = -parseInt(document.body.style.top, 10),
          t = -parseInt(document.body.style.left, 10);
        (Object.assign(document.body.style, Vr),
          window.requestAnimationFrame(() => {
            if (i && o !== window.location.href) {
              s(window.location.href);
              return;
            }
            window.scrollTo(t, e);
          }),
          (Vr = null));
      }
    }, [o]);
  return (
    x.useEffect(() => {
      function e() {
        c.current = window.scrollY;
      }
      return (
        e(),
        window.addEventListener(`scroll`, e),
        () => {
          window.removeEventListener(`scroll`, e);
        }
      );
    }, []),
    x.useEffect(() => {
      if (t)
        return () => {
          typeof document > `u` || document.querySelector(`[data-vaul-drawer]`) || u();
        };
    }, [t, u]),
    x.useEffect(() => {
      n ||
        !r ||
        (e
          ? (!window.matchMedia(`(display-mode: standalone)`).matches && l(),
            t ||
              window.setTimeout(() => {
                u();
              }, 500))
          : u());
    }, [e, r, o, t, n, l, u]),
    { restorePositionSetting: u }
  );
}
function Ur({
  open: e,
  onOpenChange: t,
  children: n,
  onDrag: r,
  onRelease: i,
  snapPoints: a,
  shouldScaleBackground: o = !1,
  setBackgroundColorOnScale: s = !0,
  closeThreshold: c = Ar,
  scrollLockTimeout: l = jr,
  dismissible: u = !0,
  handleOnly: d = !1,
  fadeFromIndex: f = a && a.length - 1,
  activeSnapPoint: p,
  setActiveSnapPoint: m,
  fixed: h,
  modal: g = !0,
  onClose: _,
  nested: v,
  noBodyStyles: y = !1,
  direction: b = `bottom`,
  defaultOpen: S = !1,
  disablePreventScroll: C = !0,
  snapToSequentialPoint: w = !1,
  preventScrollRestoration: T = !1,
  repositionInputs: E = !0,
  onAnimationEnd: D,
  container: O,
  autoFocus: ee = !1,
}) {
  let [k = !1, A] = Rr({
      defaultProp: S,
      prop: e,
      onChange: (e) => {
        (t?.(e),
          !e && !v && ye(),
          setTimeout(() => {
            D?.(e);
          }, K.DURATION * 1e3),
          e &&
            !g &&
            typeof window < `u` &&
            window.requestAnimationFrame(() => {
              document.body.style.pointerEvents = `auto`;
            }),
          e || (document.body.style.pointerEvents = `auto`));
      },
    }),
    [j, M] = x.useState(!1),
    [N, te] = x.useState(!1),
    [P, ne] = x.useState(!1),
    re = x.useRef(null),
    ie = x.useRef(null),
    ae = x.useRef(null),
    F = x.useRef(null),
    I = x.useRef(null),
    L = x.useRef(!1),
    oe = x.useRef(null),
    R = x.useRef(0),
    z = x.useRef(!1),
    se = x.useRef(!S),
    ce = x.useRef(0),
    B = x.useRef(null),
    le = x.useRef(B.current?.getBoundingClientRect().height || 0),
    ue = x.useRef(B.current?.getBoundingClientRect().width || 0),
    de = x.useRef(0),
    {
      activeSnapPoint: fe,
      activeSnapPointIndex: V,
      setActiveSnapPoint: pe,
      onRelease: me,
      snapPointsOffset: he,
      onDrag: ge,
      shouldFade: _e,
      getPercentageDragged: ve,
    } = zr({
      snapPoints: a,
      activeSnapPointProp: p,
      setActiveSnapPointProp: m,
      drawerRef: B,
      fadeFromIndex: f,
      overlayRef: re,
      onSnapPointChange: x.useCallback((e) => {
        a && e === he.length - 1 && (ie.current = new Date());
      }, []),
      direction: b,
      container: O,
      snapToSequentialPoint: w,
    });
  hr({ isDisabled: !k || N || !g || P || !j || !E || !C });
  let { restorePositionSetting: ye } = Hr({
    isOpen: k,
    modal: g,
    nested: v ?? !1,
    hasBeenOpened: j,
    preventScrollRestoration: T,
    noBodyStyles: y,
  });
  function be() {
    return (window.innerWidth - Pr) / window.innerWidth;
  }
  function xe(e) {
    (!u && !a) ||
      (B.current && !B.current.contains(e.target)) ||
      ((le.current = B.current?.getBoundingClientRect().height || 0),
      (ue.current = B.current?.getBoundingClientRect().width || 0),
      te(!0),
      (ae.current = new Date()),
      ir() && window.addEventListener(`touchend`, () => (L.current = !1), { once: !0 }),
      e.target.setPointerCapture(e.pointerId),
      (R.current = G(b) ? e.pageY : e.pageX));
  }
  function Se(e, t) {
    let n = e,
      r = window.getSelection()?.toString(),
      i = B.current ? Er(B.current, b) : null,
      a = new Date();
    if (
      n.tagName === `SELECT` ||
      n.hasAttribute(`data-vaul-no-drag`) ||
      n.closest(`[data-vaul-no-drag]`)
    )
      return !1;
    if (b === `right` || b === `left`) return !0;
    if (ie.current && a.getTime() - ie.current.getTime() < 500) return !1;
    if (i !== null && (b === `bottom` ? i > 0 : i < 0)) return !0;
    if (r && r.length > 0) return !1;
    if ((I.current && a.getTime() - I.current.getTime() < l && i === 0) || t)
      return ((I.current = a), !1);
    for (; n; ) {
      if (n.scrollHeight > n.clientHeight) {
        if (n.scrollTop !== 0) return ((I.current = new Date()), !1);
        if (n.getAttribute(`role`) === `dialog`) return !0;
      }
      n = n.parentNode;
    }
    return !0;
  }
  function Ce(e) {
    if (B.current && N) {
      let t = b === `bottom` || b === `right` ? 1 : -1,
        n = (R.current - (G(b) ? e.pageY : e.pageX)) * t,
        i = n > 0,
        s = a && !u && !i;
      if (s && V === 0) return;
      let c = Math.abs(n),
        l = document.querySelector(`[data-vaul-drawer-wrapper]`),
        d = c / (b === `bottom` || b === `top` ? le.current : ue.current),
        p = ve(c, i);
      if ((p !== null && (d = p), (s && d >= 1) || (!L.current && !Se(e.target, i)))) return;
      if (
        (B.current.classList.add(Fr),
        (L.current = !0),
        W(B.current, { transition: `none` }),
        W(re.current, { transition: `none` }),
        a && ge({ draggedDistance: n }),
        i && !a)
      ) {
        let e = Dr(n),
          r = Math.min(e * -1, 0) * t;
        W(B.current, {
          transform: G(b) ? `translate3d(0, ${r}px, 0)` : `translate3d(${r}px, 0, 0)`,
        });
        return;
      }
      let m = 1 - d;
      if (
        ((_e || (f && V === f - 1)) &&
          (r?.(e, d), W(re.current, { opacity: `${m}`, transition: `none` }, !0)),
        l && re.current && o)
      ) {
        let e = Math.min(be() + d * (1 - be()), 1),
          t = 8 - d * 8,
          n = Math.max(0, 14 - d * 14);
        W(
          l,
          {
            borderRadius: `${t}px`,
            transform: G(b)
              ? `scale(${e}) translate3d(0, ${n}px, 0)`
              : `scale(${e}) translate3d(${n}px, 0, 0)`,
            transition: `none`,
          },
          !0,
        );
      }
      if (!a) {
        let e = c * t;
        W(B.current, {
          transform: G(b) ? `translate3d(0, ${e}px, 0)` : `translate3d(${e}px, 0, 0)`,
        });
      }
    }
  }
  (x.useEffect(() => {
    window.requestAnimationFrame(() => {
      se.current = !0;
    });
  }, []),
    x.useEffect(() => {
      var e;
      function t() {
        if (!B.current || !E) return;
        let e = document.activeElement;
        if (br(e) || z.current) {
          let e = window.visualViewport?.height || 0,
            t = window.innerHeight,
            n = t - e,
            r = B.current.getBoundingClientRect().height || 0,
            i = r > t * 0.8;
          de.current ||= r;
          let o = B.current.getBoundingClientRect().top;
          if (
            (Math.abs(ce.current - n) > 60 && (z.current = !z.current),
            a && a.length > 0 && he && V)
          ) {
            let e = he[V] || 0;
            n += e;
          }
          if (((ce.current = n), r > e || z.current)) {
            let t = B.current.getBoundingClientRect().height,
              r = t;
            (t > e && (r = e - (i ? o : Pr)),
              h
                ? (B.current.style.height = `${t - Math.max(n, 0)}px`)
                : (B.current.style.height = `${Math.max(r, e - o)}px`));
          } else $n() || (B.current.style.height = `${de.current}px`);
          a && a.length > 0 && !z.current
            ? (B.current.style.bottom = `0px`)
            : (B.current.style.bottom = `${Math.max(n, 0)}px`);
        }
      }
      return (
        (e = window.visualViewport) == null || e.addEventListener(`resize`, t),
        () => window.visualViewport?.removeEventListener(`resize`, t)
      );
    }, [V, a, he]));
  function we(e) {
    (Ee(),
      _?.(),
      e || A(!1),
      setTimeout(() => {
        a && pe(a[0]);
      }, K.DURATION * 1e3));
  }
  function Te() {
    if (!B.current) return;
    let e = document.querySelector(`[data-vaul-drawer-wrapper]`),
      t = Er(B.current, b);
    (W(B.current, {
      transform: `translate3d(0, 0, 0)`,
      transition: `transform ${K.DURATION}s cubic-bezier(${K.EASE.join(`,`)})`,
    }),
      W(re.current, {
        transition: `opacity ${K.DURATION}s cubic-bezier(${K.EASE.join(`,`)})`,
        opacity: `1`,
      }),
      o &&
        t &&
        t > 0 &&
        k &&
        W(
          e,
          {
            borderRadius: `${Mr}px`,
            overflow: `hidden`,
            ...(G(b)
              ? {
                  transform: `scale(${be()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
                  transformOrigin: `top`,
                }
              : {
                  transform: `scale(${be()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
                  transformOrigin: `left`,
                }),
            transitionProperty: `transform, border-radius`,
            transitionDuration: `${K.DURATION}s`,
            transitionTimingFunction: `cubic-bezier(${K.EASE.join(`,`)})`,
          },
          !0,
        ));
  }
  function Ee() {
    !N ||
      !B.current ||
      (B.current.classList.remove(Fr), (L.current = !1), te(!1), (F.current = new Date()));
  }
  function De(e) {
    if (!N || !B.current) return;
    (B.current.classList.remove(Fr), (L.current = !1), te(!1), (F.current = new Date()));
    let t = Er(B.current, b);
    if (!e || !Se(e.target, !1) || !t || Number.isNaN(t) || ae.current === null) return;
    let n = F.current.getTime() - ae.current.getTime(),
      r = R.current - (G(b) ? e.pageY : e.pageX),
      o = Math.abs(r) / n;
    if (
      (o > 0.05 &&
        (ne(!0),
        setTimeout(() => {
          ne(!1);
        }, 200)),
      a)
    ) {
      (me({
        draggedDistance: r * (b === `bottom` || b === `right` ? 1 : -1),
        closeDrawer: we,
        velocity: o,
        dismissible: u,
      }),
        i?.(e, !0));
      return;
    }
    if (b === `bottom` || b === `right` ? r > 0 : r < 0) {
      (Te(), i?.(e, !0));
      return;
    }
    if (o > kr) {
      (we(), i?.(e, !1));
      return;
    }
    let s = Math.min(B.current.getBoundingClientRect().height ?? 0, window.innerHeight),
      l = Math.min(B.current.getBoundingClientRect().width ?? 0, window.innerWidth);
    if (Math.abs(t) >= (b === `left` || b === `right` ? l : s) * c) {
      (we(), i?.(e, !1));
      return;
    }
    (i?.(e, !0), Te());
  }
  x.useEffect(
    () => (
      k && (W(document.documentElement, { scrollBehavior: `auto` }), (ie.current = new Date())),
      () => {
        Tr(document.documentElement, `scrollBehavior`);
      }
    ),
    [k],
  );
  function Oe(e) {
    let t = e ? (window.innerWidth - Nr) / window.innerWidth : 1,
      n = e ? -16 : 0;
    (oe.current && window.clearTimeout(oe.current),
      W(B.current, {
        transition: `transform ${K.DURATION}s cubic-bezier(${K.EASE.join(`,`)})`,
        transform: G(b)
          ? `scale(${t}) translate3d(0, ${n}px, 0)`
          : `scale(${t}) translate3d(${n}px, 0, 0)`,
      }),
      !e &&
        B.current &&
        (oe.current = setTimeout(() => {
          let e = Er(B.current, b);
          W(B.current, {
            transition: `none`,
            transform: G(b) ? `translate3d(0, ${e}px, 0)` : `translate3d(${e}px, 0, 0)`,
          });
        }, 500)));
  }
  function ke(e, t) {
    if (t < 0) return;
    let n = (window.innerWidth - Nr) / window.innerWidth,
      r = n + t * (1 - n),
      i = -16 + t * Nr;
    W(B.current, {
      transform: G(b)
        ? `scale(${r}) translate3d(0, ${i}px, 0)`
        : `scale(${r}) translate3d(${i}px, 0, 0)`,
      transition: `none`,
    });
  }
  function Ae(e, t) {
    let n = G(b) ? window.innerHeight : window.innerWidth,
      r = t ? (n - Nr) / n : 1,
      i = t ? -16 : 0;
    t &&
      W(B.current, {
        transition: `transform ${K.DURATION}s cubic-bezier(${K.EASE.join(`,`)})`,
        transform: G(b)
          ? `scale(${r}) translate3d(0, ${i}px, 0)`
          : `scale(${r}) translate3d(${i}px, 0, 0)`,
      });
  }
  return (
    x.useEffect(() => {
      g ||
        window.requestAnimationFrame(() => {
          document.body.style.pointerEvents = `auto`;
        });
    }, [g]),
    x.createElement(
      Dn,
      {
        defaultOpen: S,
        onOpenChange: (e) => {
          (!u && !e) || (e ? M(!0) : we(!0), A(e));
        },
        open: k,
      },
      x.createElement(
        Zn.Provider,
        {
          value: {
            activeSnapPoint: fe,
            snapPoints: a,
            setActiveSnapPoint: pe,
            drawerRef: B,
            overlayRef: re,
            onOpenChange: t,
            onPress: xe,
            onRelease: De,
            onDrag: Ce,
            dismissible: u,
            shouldAnimate: se,
            handleOnly: d,
            isOpen: k,
            isDragging: N,
            shouldFade: _e,
            closeDrawer: we,
            onNestedDrag: ke,
            onNestedOpenChange: Oe,
            onNestedRelease: Ae,
            keyboardIsOpen: z,
            modal: g,
            snapPointsOffset: he,
            activeSnapPointIndex: V,
            direction: b,
            shouldScaleBackground: o,
            setBackgroundColorOnScale: s,
            noBodyStyles: y,
            container: O,
            autoFocus: ee,
          },
        },
        n,
      ),
    )
  );
}
var Wr = x.forwardRef(function ({ ...e }, t) {
  let {
      overlayRef: n,
      snapPoints: r,
      onRelease: i,
      shouldFade: a,
      isOpen: o,
      modal: s,
      shouldAnimate: c,
    } = Qn(),
    l = Cr(t, n),
    u = r && r.length > 0;
  if (!s) return null;
  let d = x.useCallback((e) => i(e), [i]);
  return x.createElement(Fn, {
    onMouseUp: d,
    ref: l,
    "data-vaul-overlay": ``,
    "data-vaul-snap-points": o && u ? `true` : `false`,
    "data-vaul-snap-points-overlay": o && a ? `true` : `false`,
    "data-vaul-animate": c?.current ? `true` : `false`,
    ...e,
  });
});
Wr.displayName = `Drawer.Overlay`;
var Gr = x.forwardRef(function (
  { onPointerDownOutside: e, style: t, onOpenAutoFocus: n, ...r },
  i,
) {
  let {
      drawerRef: a,
      onPress: o,
      onRelease: s,
      onDrag: c,
      keyboardIsOpen: l,
      snapPointsOffset: u,
      activeSnapPointIndex: d,
      modal: f,
      isOpen: p,
      direction: m,
      snapPoints: h,
      container: g,
      handleOnly: _,
      shouldAnimate: v,
      autoFocus: y,
    } = Qn(),
    [b, S] = x.useState(!1),
    C = Cr(i, a),
    w = x.useRef(null),
    T = x.useRef(null),
    E = x.useRef(!1),
    D = h && h.length > 0;
  Br();
  let O = (e, t, n = 0) => {
    if (E.current) return !0;
    let r = Math.abs(e.y),
      i = Math.abs(e.x),
      a = i > r,
      o = [`bottom`, `right`].includes(t) ? 1 : -1;
    if (t === `left` || t === `right`) {
      if (!(e.x * o < 0) && i >= 0 && i <= n) return a;
    } else if (!(e.y * o < 0) && r >= 0 && r <= n) return !a;
    return ((E.current = !0), !0);
  };
  x.useEffect(() => {
    D &&
      window.requestAnimationFrame(() => {
        S(!0);
      });
  }, []);
  function ee(e) {
    ((w.current = null), (E.current = !1), s(e));
  }
  return x.createElement(zn, {
    "data-vaul-drawer-direction": m,
    "data-vaul-drawer": ``,
    "data-vaul-delayed-snap-points": b ? `true` : `false`,
    "data-vaul-snap-points": p && D ? `true` : `false`,
    "data-vaul-custom-container": g ? `true` : `false`,
    "data-vaul-animate": v?.current ? `true` : `false`,
    ...r,
    ref: C,
    style: u && u.length > 0 ? { "--snap-point-height": `${u[d ?? 0]}px`, ...t } : t,
    onPointerDown: (e) => {
      _ ||
        (r.onPointerDown == null || r.onPointerDown.call(r, e),
        (w.current = { x: e.pageX, y: e.pageY }),
        o(e));
    },
    onOpenAutoFocus: (e) => {
      (n?.(e), y || e.preventDefault());
    },
    onPointerDownOutside: (t) => {
      if ((e?.(t), !f || t.defaultPrevented)) {
        t.preventDefault();
        return;
      }
      l.current &&= !1;
    },
    onFocusOutside: (e) => {
      if (!f) {
        e.preventDefault();
        return;
      }
    },
    onPointerMove: (e) => {
      if (
        ((T.current = e), _ || (r.onPointerMove == null || r.onPointerMove.call(r, e), !w.current))
      )
        return;
      let t = e.pageY - w.current.y,
        n = e.pageX - w.current.x,
        i = e.pointerType === `touch` ? 10 : 2;
      O({ x: n, y: t }, m, i) ? c(e) : (Math.abs(n) > i || Math.abs(t) > i) && (w.current = null);
    },
    onPointerUp: (e) => {
      (r.onPointerUp == null || r.onPointerUp.call(r, e),
        (w.current = null),
        (E.current = !1),
        s(e));
    },
    onPointerOut: (e) => {
      (r.onPointerOut == null || r.onPointerOut.call(r, e), ee(T.current));
    },
    onContextMenu: (e) => {
      (r.onContextMenu == null || r.onContextMenu.call(r, e), T.current && ee(T.current));
    },
  });
});
Gr.displayName = `Drawer.Content`;
var Kr = 250,
  qr = 120,
  Jr = x.forwardRef(function ({ preventCycle: e = !1, children: t, ...n }, r) {
    let {
        closeDrawer: i,
        isDragging: a,
        snapPoints: o,
        activeSnapPoint: s,
        setActiveSnapPoint: c,
        dismissible: l,
        handleOnly: u,
        isOpen: d,
        onPress: f,
        onDrag: p,
      } = Qn(),
      m = x.useRef(null),
      h = x.useRef(!1);
    function g() {
      if (h.current) {
        y();
        return;
      }
      window.setTimeout(() => {
        _();
      }, qr);
    }
    function _() {
      if (a || e || h.current) {
        y();
        return;
      }
      if ((y(), !o || o.length === 0)) {
        l || i();
        return;
      }
      if (s === o[o.length - 1] && l) {
        i();
        return;
      }
      let t = o.findIndex((e) => e === s);
      if (t === -1) return;
      let n = o[t + 1];
      c(n);
    }
    function v() {
      m.current = window.setTimeout(() => {
        h.current = !0;
      }, Kr);
    }
    function y() {
      (m.current && window.clearTimeout(m.current), (h.current = !1));
    }
    return x.createElement(
      `div`,
      {
        onClick: g,
        onPointerCancel: y,
        onPointerDown: (e) => {
          (u && f(e), v());
        },
        onPointerMove: (e) => {
          u && p(e);
        },
        ref: r,
        "data-vaul-drawer-visible": d ? `true` : `false`,
        "data-vaul-handle": ``,
        "aria-hidden": `true`,
        ...n,
      },
      x.createElement(`span`, { "data-vaul-handle-hitarea": ``, "aria-hidden": `true` }, t),
    );
  });
Jr.displayName = `Drawer.Handle`;
function Yr({ onDrag: e, onOpenChange: t, open: n, ...r }) {
  let { onNestedDrag: i, onNestedOpenChange: a, onNestedRelease: o } = Qn();
  if (!i) throw Error(`Drawer.NestedRoot must be placed in another drawer`);
  return x.createElement(Ur, {
    nested: !0,
    open: n,
    onClose: () => {
      a(!1);
    },
    onDrag: (t, n) => {
      (i(t, n), e?.(t, n));
    },
    onOpenChange: (e) => {
      (e && a(e), t?.(e));
    },
    onRelease: o,
    ...r,
  });
}
function Xr(e) {
  let t = Qn(),
    { container: n = t.container, ...r } = e;
  return x.createElement(Nn, { container: n, ...r });
}
var q = {
  Root: Ur,
  NestedRoot: Yr,
  Content: Gr,
  Overlay: Wr,
  Trigger: kn,
  Portal: Xr,
  Handle: Jr,
  Close: Jn,
  Title: Wn,
  Description: Kn,
};
function Zr(e) {
  var t,
    n,
    r = ``;
  if (typeof e == `string` || typeof e == `number`) r += e;
  else if (typeof e == `object`)
    if (Array.isArray(e)) {
      var i = e.length;
      for (t = 0; t < i; t++) e[t] && (n = Zr(e[t])) && (r && (r += ` `), (r += n));
    } else for (n in e) e[n] && (r && (r += ` `), (r += n));
  return r;
}
function Qr() {
  for (var e, t, n = 0, r = ``, i = arguments.length; n < i; n++)
    (e = arguments[n]) && (t = Zr(e)) && (r && (r += ` `), (r += t));
  return r;
}
var $r = (e, t) => {
    let n = Array(e.length + t.length);
    for (let t = 0; t < e.length; t++) n[t] = e[t];
    for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
    return n;
  },
  ei = (e, t) => ({ classGroupId: e, validator: t }),
  ti = (e = new Map(), t = null, n) => ({ nextPart: e, validators: t, classGroupId: n }),
  ni = `-`,
  ri = [],
  ii = `arbitrary..`,
  ai = (e) => {
    let t = ci(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    return {
      getClassGroupId: (e) => {
        if (e.startsWith(`[`) && e.endsWith(`]`)) return si(e);
        let n = e.split(ni);
        return oi(n, +(n[0] === `` && n.length > 1), t);
      },
      getConflictingClassGroupIds: (e, t) => {
        if (t) {
          let t = r[e],
            i = n[e];
          return t ? (i ? $r(i, t) : t) : i || ri;
        }
        return n[e] || ri;
      },
    };
  },
  oi = (e, t, n) => {
    if (e.length - t === 0) return n.classGroupId;
    let r = e[t],
      i = n.nextPart.get(r);
    if (i) {
      let n = oi(e, t + 1, i);
      if (n) return n;
    }
    let a = n.validators;
    if (a === null) return;
    let o = t === 0 ? e.join(ni) : e.slice(t).join(ni),
      s = a.length;
    for (let e = 0; e < s; e++) {
      let t = a[e];
      if (t.validator(o)) return t.classGroupId;
    }
  },
  si = (e) =>
    e.slice(1, -1).indexOf(`:`) === -1
      ? void 0
      : (() => {
          let t = e.slice(1, -1),
            n = t.indexOf(`:`),
            r = t.slice(0, n);
          return r ? ii + r : void 0;
        })(),
  ci = (e) => {
    let { theme: t, classGroups: n } = e;
    return li(n, t);
  },
  li = (e, t) => {
    let n = ti();
    for (let r in e) {
      let i = e[r];
      ui(i, n, r, t);
    }
    return n;
  },
  ui = (e, t, n, r) => {
    let i = e.length;
    for (let a = 0; a < i; a++) {
      let i = e[a];
      di(i, t, n, r);
    }
  },
  di = (e, t, n, r) => {
    if (typeof e == `string`) {
      fi(e, t, n);
      return;
    }
    if (typeof e == `function`) {
      pi(e, t, n, r);
      return;
    }
    mi(e, t, n, r);
  },
  fi = (e, t, n) => {
    let r = e === `` ? t : hi(t, e);
    r.classGroupId = n;
  },
  pi = (e, t, n, r) => {
    if (gi(e)) {
      ui(e(r), t, n, r);
      return;
    }
    (t.validators === null && (t.validators = []), t.validators.push(ei(n, e)));
  },
  mi = (e, t, n, r) => {
    let i = Object.entries(e),
      a = i.length;
    for (let e = 0; e < a; e++) {
      let [a, o] = i[e];
      ui(o, hi(t, a), n, r);
    }
  },
  hi = (e, t) => {
    let n = e,
      r = t.split(ni),
      i = r.length;
    for (let e = 0; e < i; e++) {
      let t = r[e],
        i = n.nextPart.get(t);
      (i || ((i = ti()), n.nextPart.set(t, i)), (n = i));
    }
    return n;
  },
  gi = (e) => `isThemeGetter` in e && e.isThemeGetter === !0,
  _i = (e) => {
    if (e < 1) return { get: () => void 0, set: () => {} };
    let t = 0,
      n = Object.create(null),
      r = Object.create(null),
      i = (i, a) => {
        ((n[i] = a), t++, t > e && ((t = 0), (r = n), (n = Object.create(null))));
      };
    return {
      get(e) {
        let t = n[e];
        if (t !== void 0) return t;
        if ((t = r[e]) !== void 0) return (i(e, t), t);
      },
      set(e, t) {
        e in n ? (n[e] = t) : i(e, t);
      },
    };
  },
  vi = `!`,
  yi = `:`,
  bi = [],
  xi = (e, t, n, r, i) => ({
    modifiers: e,
    hasImportantModifier: t,
    baseClassName: n,
    maybePostfixModifierPosition: r,
    isExternal: i,
  }),
  Si = (e) => {
    let { prefix: t, experimentalParseClassName: n } = e,
      r = (e) => {
        let t = [],
          n = 0,
          r = 0,
          i = 0,
          a,
          o = e.length;
        for (let s = 0; s < o; s++) {
          let o = e[s];
          if (n === 0 && r === 0) {
            if (o === yi) {
              (t.push(e.slice(i, s)), (i = s + 1));
              continue;
            }
            if (o === `/`) {
              a = s;
              continue;
            }
          }
          o === `[` ? n++ : o === `]` ? n-- : o === `(` ? r++ : o === `)` && r--;
        }
        let s = t.length === 0 ? e : e.slice(i),
          c = s,
          l = !1;
        s.endsWith(vi)
          ? ((c = s.slice(0, -1)), (l = !0))
          : s.startsWith(vi) && ((c = s.slice(1)), (l = !0));
        let u = a && a > i ? a - i : void 0;
        return xi(t, l, c, u);
      };
    if (t) {
      let e = t + yi,
        n = r;
      r = (t) => (t.startsWith(e) ? n(t.slice(e.length)) : xi(bi, !1, t, void 0, !0));
    }
    if (n) {
      let e = r;
      r = (t) => n({ className: t, parseClassName: e });
    }
    return r;
  },
  Ci = (e) => {
    let t = new Map();
    return (
      e.orderSensitiveModifiers.forEach((e, n) => {
        t.set(e, 1e6 + n);
      }),
      (e) => {
        let n = [],
          r = [];
        for (let i = 0; i < e.length; i++) {
          let a = e[i],
            o = a[0] === `[`,
            s = t.has(a);
          o || s ? (r.length > 0 && (r.sort(), n.push(...r), (r = [])), n.push(a)) : r.push(a);
        }
        return (r.length > 0 && (r.sort(), n.push(...r)), n);
      }
    );
  },
  wi = (e) => ({
    cache: _i(e.cacheSize),
    parseClassName: Si(e),
    sortModifiers: Ci(e),
    postfixLookupClassGroupIds: Ti(e),
    ...ai(e),
  }),
  Ti = (e) => {
    let t = Object.create(null),
      n = e.postfixLookupClassGroups;
    if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
    return t;
  },
  Ei = /\s+/,
  Di = (e, t) => {
    let {
        parseClassName: n,
        getClassGroupId: r,
        getConflictingClassGroupIds: i,
        sortModifiers: a,
        postfixLookupClassGroupIds: o,
      } = t,
      s = [],
      c = e.trim().split(Ei),
      l = ``;
    for (let e = c.length - 1; e >= 0; --e) {
      let t = c[e],
        {
          isExternal: u,
          modifiers: d,
          hasImportantModifier: f,
          baseClassName: p,
          maybePostfixModifierPosition: m,
        } = n(t);
      if (u) {
        l = t + (l.length > 0 ? ` ` + l : l);
        continue;
      }
      let h = !!m,
        g;
      if (h) {
        g = r(p.substring(0, m));
        let e = g && o[g] ? r(p) : void 0;
        e && e !== g && ((g = e), (h = !1));
      } else g = r(p);
      if (!g) {
        if (!h) {
          l = t + (l.length > 0 ? ` ` + l : l);
          continue;
        }
        if (((g = r(p)), !g)) {
          l = t + (l.length > 0 ? ` ` + l : l);
          continue;
        }
        h = !1;
      }
      let _ = d.length === 0 ? `` : d.length === 1 ? d[0] : a(d).join(`:`),
        v = f ? _ + vi : _,
        y = v + g;
      if (s.indexOf(y) > -1) continue;
      s.push(y);
      let b = i(g, h);
      for (let e = 0; e < b.length; ++e) {
        let t = b[e];
        s.push(v + t);
      }
      l = t + (l.length > 0 ? ` ` + l : l);
    }
    return l;
  },
  Oi = (...e) => {
    let t = 0,
      n,
      r,
      i = ``;
    for (; t < e.length; ) (n = e[t++]) && (r = ki(n)) && (i && (i += ` `), (i += r));
    return i;
  },
  ki = (e) => {
    if (typeof e == `string`) return e;
    let t,
      n = ``;
    for (let r = 0; r < e.length; r++) e[r] && (t = ki(e[r])) && (n && (n += ` `), (n += t));
    return n;
  },
  Ai = (e, ...t) => {
    let n,
      r,
      i,
      a,
      o = (o) => (
        (n = wi(t.reduce((e, t) => t(e), e()))),
        (r = n.cache.get),
        (i = n.cache.set),
        (a = s),
        s(o)
      ),
      s = (e) => {
        let t = r(e);
        if (t) return t;
        let a = Di(e, n);
        return (i(e, a), a);
      };
    return ((a = o), (...e) => a(Oi(...e)));
  },
  ji = [],
  J = (e) => {
    let t = (t) => t[e] || ji;
    return ((t.isThemeGetter = !0), t);
  },
  Mi = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Ni = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  Pi = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,
  Fi = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Ii =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Li = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  Ri = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  zi =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  Bi = (e) => Pi.test(e),
  Y = (e) => !!e && !Number.isNaN(Number(e)),
  X = (e) => !!e && Number.isInteger(Number(e)),
  Vi = (e) => e.endsWith(`%`) && Y(e.slice(0, -1)),
  Z = (e) => Fi.test(e),
  Hi = () => !0,
  Ui = (e) => Ii.test(e) && !Li.test(e),
  Wi = () => !1,
  Gi = (e) => Ri.test(e),
  Ki = (e) => zi.test(e),
  qi = (e) => !Q(e) && !$(e),
  Ji = (e) =>
    e.startsWith(`@container`) &&
    ((e[10] === `/` && e[11] !== void 0) ||
      (e[11] === `s` && e[16] !== void 0 && e.startsWith(`-size/`, 10)) ||
      (e[11] === `n` && e[18] !== void 0 && e.startsWith(`-normal/`, 10))),
  Yi = (e) => ua(e, ma, Wi),
  Q = (e) => Mi.test(e),
  Xi = (e) => ua(e, ha, Ui),
  Zi = (e) => ua(e, ga, Y),
  Qi = (e) => ua(e, va, Hi),
  $i = (e) => ua(e, _a, Wi),
  ea = (e) => ua(e, fa, Wi),
  ta = (e) => ua(e, pa, Ki),
  na = (e) => ua(e, ya, Gi),
  $ = (e) => Ni.test(e),
  ra = (e) => da(e, ha),
  ia = (e) => da(e, _a),
  aa = (e) => da(e, fa),
  oa = (e) => da(e, ma),
  sa = (e) => da(e, pa),
  ca = (e) => da(e, ya, !0),
  la = (e) => da(e, va, !0),
  ua = (e, t, n) => {
    let r = Mi.exec(e);
    return r ? (r[1] ? t(r[1]) : n(r[2])) : !1;
  },
  da = (e, t, n = !1) => {
    let r = Ni.exec(e);
    return r ? (r[1] ? t(r[1]) : n) : !1;
  },
  fa = (e) => e === `position` || e === `percentage`,
  pa = (e) => e === `image` || e === `url`,
  ma = (e) => e === `length` || e === `size` || e === `bg-size`,
  ha = (e) => e === `length`,
  ga = (e) => e === `number`,
  _a = (e) => e === `family-name`,
  va = (e) => e === `number` || e === `weight`,
  ya = (e) => e === `shadow`,
  ba = Ai(() => {
    let e = J(`color`),
      t = J(`font`),
      n = J(`text`),
      r = J(`font-weight`),
      i = J(`tracking`),
      a = J(`leading`),
      o = J(`breakpoint`),
      s = J(`container`),
      c = J(`spacing`),
      l = J(`radius`),
      u = J(`shadow`),
      d = J(`inset-shadow`),
      f = J(`text-shadow`),
      p = J(`drop-shadow`),
      m = J(`blur`),
      h = J(`perspective`),
      g = J(`aspect`),
      _ = J(`ease`),
      v = J(`animate`),
      y = () => [`auto`, `avoid`, `all`, `avoid-page`, `page`, `left`, `right`, `column`],
      b = () => [
        `center`,
        `top`,
        `bottom`,
        `left`,
        `right`,
        `top-left`,
        `left-top`,
        `top-right`,
        `right-top`,
        `bottom-right`,
        `right-bottom`,
        `bottom-left`,
        `left-bottom`,
      ],
      x = () => [...b(), $, Q],
      S = () => [`auto`, `hidden`, `clip`, `visible`, `scroll`],
      C = () => [`auto`, `contain`, `none`],
      w = () => [$, Q, c],
      T = () => [Bi, `full`, `auto`, ...w()],
      E = () => [X, `none`, `subgrid`, $, Q],
      D = () => [`auto`, { span: [`full`, X, $, Q] }, X, $, Q],
      O = () => [X, `auto`, $, Q],
      ee = () => [`auto`, `min`, `max`, `fr`, $, Q],
      k = () => [
        `start`,
        `end`,
        `center`,
        `between`,
        `around`,
        `evenly`,
        `stretch`,
        `baseline`,
        `center-safe`,
        `end-safe`,
      ],
      A = () => [`start`, `end`, `center`, `stretch`, `center-safe`, `end-safe`],
      j = () => [`auto`, ...w()],
      M = () => [
        Bi,
        `auto`,
        `full`,
        `dvw`,
        `dvh`,
        `lvw`,
        `lvh`,
        `svw`,
        `svh`,
        `min`,
        `max`,
        `fit`,
        ...w(),
      ],
      N = () => [Bi, `screen`, `full`, `dvw`, `lvw`, `svw`, `min`, `max`, `fit`, ...w()],
      te = () => [Bi, `screen`, `full`, `lh`, `dvh`, `lvh`, `svh`, `min`, `max`, `fit`, ...w()],
      P = () => [e, $, Q],
      ne = () => [...b(), aa, ea, { position: [$, Q] }],
      re = () => [`no-repeat`, { repeat: [``, `x`, `y`, `space`, `round`] }],
      ie = () => [`auto`, `cover`, `contain`, oa, Yi, { size: [$, Q] }],
      ae = () => [Vi, ra, Xi],
      F = () => [``, `none`, `full`, l, $, Q],
      I = () => [``, Y, ra, Xi],
      L = () => [`solid`, `dashed`, `dotted`, `double`],
      oe = () => [
        `normal`,
        `multiply`,
        `screen`,
        `overlay`,
        `darken`,
        `lighten`,
        `color-dodge`,
        `color-burn`,
        `hard-light`,
        `soft-light`,
        `difference`,
        `exclusion`,
        `hue`,
        `saturation`,
        `color`,
        `luminosity`,
      ],
      R = () => [Y, Vi, aa, ea],
      z = () => [``, `none`, m, $, Q],
      se = () => [`none`, Y, $, Q],
      ce = () => [`none`, Y, $, Q],
      B = () => [Y, $, Q],
      le = () => [Bi, `full`, ...w()];
    return {
      cacheSize: 500,
      theme: {
        animate: [`spin`, `ping`, `pulse`, `bounce`],
        aspect: [`video`],
        blur: [Z],
        breakpoint: [Z],
        color: [Hi],
        container: [Z],
        "drop-shadow": [Z],
        ease: [`in`, `out`, `in-out`],
        font: [qi],
        "font-weight": [
          `thin`,
          `extralight`,
          `light`,
          `normal`,
          `medium`,
          `semibold`,
          `bold`,
          `extrabold`,
          `black`,
        ],
        "inset-shadow": [Z],
        leading: [`none`, `tight`, `snug`, `normal`, `relaxed`, `loose`],
        perspective: [`dramatic`, `near`, `normal`, `midrange`, `distant`, `none`],
        radius: [Z],
        shadow: [Z],
        spacing: [`px`, Y],
        text: [Z],
        "text-shadow": [Z],
        tracking: [`tighter`, `tight`, `normal`, `wide`, `wider`, `widest`],
      },
      classGroups: {
        aspect: [{ aspect: [`auto`, `square`, Bi, Q, $, g] }],
        container: [`container`],
        "container-type": [{ "@container": [``, `normal`, `size`, $, Q] }],
        "container-named": [Ji],
        columns: [{ columns: [Y, Q, $, s] }],
        "break-after": [{ "break-after": y() }],
        "break-before": [{ "break-before": y() }],
        "break-inside": [{ "break-inside": [`auto`, `avoid`, `avoid-page`, `avoid-column`] }],
        "box-decoration": [{ "box-decoration": [`slice`, `clone`] }],
        box: [{ box: [`border`, `content`] }],
        display: [
          `block`,
          `inline-block`,
          `inline`,
          `flex`,
          `inline-flex`,
          `table`,
          `inline-table`,
          `table-caption`,
          `table-cell`,
          `table-column`,
          `table-column-group`,
          `table-footer-group`,
          `table-header-group`,
          `table-row-group`,
          `table-row`,
          `flow-root`,
          `grid`,
          `inline-grid`,
          `contents`,
          `list-item`,
          `hidden`,
        ],
        sr: [`sr-only`, `not-sr-only`],
        float: [{ float: [`right`, `left`, `none`, `start`, `end`] }],
        clear: [{ clear: [`left`, `right`, `both`, `none`, `start`, `end`] }],
        isolation: [`isolate`, `isolation-auto`],
        "object-fit": [{ object: [`contain`, `cover`, `fill`, `none`, `scale-down`] }],
        "object-position": [{ object: x() }],
        overflow: [{ overflow: S() }],
        "overflow-x": [{ "overflow-x": S() }],
        "overflow-y": [{ "overflow-y": S() }],
        overscroll: [{ overscroll: C() }],
        "overscroll-x": [{ "overscroll-x": C() }],
        "overscroll-y": [{ "overscroll-y": C() }],
        position: [`static`, `fixed`, `absolute`, `relative`, `sticky`],
        inset: [{ inset: T() }],
        "inset-x": [{ "inset-x": T() }],
        "inset-y": [{ "inset-y": T() }],
        start: [{ "inset-s": T(), start: T() }],
        end: [{ "inset-e": T(), end: T() }],
        "inset-bs": [{ "inset-bs": T() }],
        "inset-be": [{ "inset-be": T() }],
        top: [{ top: T() }],
        right: [{ right: T() }],
        bottom: [{ bottom: T() }],
        left: [{ left: T() }],
        visibility: [`visible`, `invisible`, `collapse`],
        z: [{ z: [X, `auto`, $, Q] }],
        basis: [{ basis: [Bi, `full`, `auto`, s, ...w()] }],
        "flex-direction": [{ flex: [`row`, `row-reverse`, `col`, `col-reverse`] }],
        "flex-wrap": [{ flex: [`nowrap`, `wrap`, `wrap-reverse`] }],
        flex: [{ flex: [Y, Bi, `auto`, `initial`, `none`, Q] }],
        grow: [{ grow: [``, Y, $, Q] }],
        shrink: [{ shrink: [``, Y, $, Q] }],
        order: [{ order: [X, `first`, `last`, `none`, $, Q] }],
        "grid-cols": [{ "grid-cols": E() }],
        "col-start-end": [{ col: D() }],
        "col-start": [{ "col-start": O() }],
        "col-end": [{ "col-end": O() }],
        "grid-rows": [{ "grid-rows": E() }],
        "row-start-end": [{ row: D() }],
        "row-start": [{ "row-start": O() }],
        "row-end": [{ "row-end": O() }],
        "grid-flow": [{ "grid-flow": [`row`, `col`, `dense`, `row-dense`, `col-dense`] }],
        "auto-cols": [{ "auto-cols": ee() }],
        "auto-rows": [{ "auto-rows": ee() }],
        gap: [{ gap: w() }],
        "gap-x": [{ "gap-x": w() }],
        "gap-y": [{ "gap-y": w() }],
        "justify-content": [{ justify: [...k(), `normal`] }],
        "justify-items": [{ "justify-items": [...A(), `normal`] }],
        "justify-self": [{ "justify-self": [`auto`, ...A()] }],
        "align-content": [{ content: [`normal`, ...k()] }],
        "align-items": [{ items: [...A(), { baseline: [``, `last`] }] }],
        "align-self": [{ self: [`auto`, ...A(), { baseline: [``, `last`] }] }],
        "place-content": [{ "place-content": k() }],
        "place-items": [{ "place-items": [...A(), `baseline`] }],
        "place-self": [{ "place-self": [`auto`, ...A()] }],
        p: [{ p: w() }],
        px: [{ px: w() }],
        py: [{ py: w() }],
        ps: [{ ps: w() }],
        pe: [{ pe: w() }],
        pbs: [{ pbs: w() }],
        pbe: [{ pbe: w() }],
        pt: [{ pt: w() }],
        pr: [{ pr: w() }],
        pb: [{ pb: w() }],
        pl: [{ pl: w() }],
        m: [{ m: j() }],
        mx: [{ mx: j() }],
        my: [{ my: j() }],
        ms: [{ ms: j() }],
        me: [{ me: j() }],
        mbs: [{ mbs: j() }],
        mbe: [{ mbe: j() }],
        mt: [{ mt: j() }],
        mr: [{ mr: j() }],
        mb: [{ mb: j() }],
        ml: [{ ml: j() }],
        "space-x": [{ "space-x": w() }],
        "space-x-reverse": [`space-x-reverse`],
        "space-y": [{ "space-y": w() }],
        "space-y-reverse": [`space-y-reverse`],
        size: [{ size: M() }],
        "inline-size": [{ inline: [`auto`, ...N()] }],
        "min-inline-size": [{ "min-inline": [`auto`, ...N()] }],
        "max-inline-size": [{ "max-inline": [`none`, ...N()] }],
        "block-size": [{ block: [`auto`, ...te()] }],
        "min-block-size": [{ "min-block": [`auto`, ...te()] }],
        "max-block-size": [{ "max-block": [`none`, ...te()] }],
        w: [{ w: [s, `screen`, ...M()] }],
        "min-w": [{ "min-w": [s, `screen`, `none`, ...M()] }],
        "max-w": [{ "max-w": [s, `screen`, `none`, `prose`, { screen: [o] }, ...M()] }],
        h: [{ h: [`screen`, `lh`, ...M()] }],
        "min-h": [{ "min-h": [`screen`, `lh`, `none`, ...M()] }],
        "max-h": [{ "max-h": [`screen`, `lh`, ...M()] }],
        "font-size": [{ text: [`base`, n, ra, Xi] }],
        "font-smoothing": [`antialiased`, `subpixel-antialiased`],
        "font-style": [`italic`, `not-italic`],
        "font-weight": [{ font: [r, la, Qi] }],
        "font-stretch": [
          {
            "font-stretch": [
              `ultra-condensed`,
              `extra-condensed`,
              `condensed`,
              `semi-condensed`,
              `normal`,
              `semi-expanded`,
              `expanded`,
              `extra-expanded`,
              `ultra-expanded`,
              Vi,
              Q,
            ],
          },
        ],
        "font-family": [{ font: [ia, $i, t] }],
        "font-features": [{ "font-features": [Q] }],
        "fvn-normal": [`normal-nums`],
        "fvn-ordinal": [`ordinal`],
        "fvn-slashed-zero": [`slashed-zero`],
        "fvn-figure": [`lining-nums`, `oldstyle-nums`],
        "fvn-spacing": [`proportional-nums`, `tabular-nums`],
        "fvn-fraction": [`diagonal-fractions`, `stacked-fractions`],
        tracking: [{ tracking: [i, $, Q] }],
        "line-clamp": [{ "line-clamp": [Y, `none`, $, Zi] }],
        leading: [{ leading: [a, ...w()] }],
        "list-image": [{ "list-image": [`none`, $, Q] }],
        "list-style-position": [{ list: [`inside`, `outside`] }],
        "list-style-type": [{ list: [`disc`, `decimal`, `none`, $, Q] }],
        "text-alignment": [{ text: [`left`, `center`, `right`, `justify`, `start`, `end`] }],
        "placeholder-color": [{ placeholder: P() }],
        "text-color": [{ text: P() }],
        "text-decoration": [`underline`, `overline`, `line-through`, `no-underline`],
        "text-decoration-style": [{ decoration: [...L(), `wavy`] }],
        "text-decoration-thickness": [{ decoration: [Y, `from-font`, `auto`, $, Xi] }],
        "text-decoration-color": [{ decoration: P() }],
        "underline-offset": [{ "underline-offset": [Y, `auto`, $, Q] }],
        "text-transform": [`uppercase`, `lowercase`, `capitalize`, `normal-case`],
        "text-overflow": [`truncate`, `text-ellipsis`, `text-clip`],
        "text-wrap": [{ text: [`wrap`, `nowrap`, `balance`, `pretty`] }],
        indent: [{ indent: w() }],
        "tab-size": [{ tab: [X, $, Q] }],
        "vertical-align": [
          {
            align: [
              `baseline`,
              `top`,
              `middle`,
              `bottom`,
              `text-top`,
              `text-bottom`,
              `sub`,
              `super`,
              $,
              Q,
            ],
          },
        ],
        whitespace: [
          { whitespace: [`normal`, `nowrap`, `pre`, `pre-line`, `pre-wrap`, `break-spaces`] },
        ],
        break: [{ break: [`normal`, `words`, `all`, `keep`] }],
        wrap: [{ wrap: [`break-word`, `anywhere`, `normal`] }],
        hyphens: [{ hyphens: [`none`, `manual`, `auto`] }],
        content: [{ content: [`none`, $, Q] }],
        "bg-attachment": [{ bg: [`fixed`, `local`, `scroll`] }],
        "bg-clip": [{ "bg-clip": [`border`, `padding`, `content`, `text`] }],
        "bg-origin": [{ "bg-origin": [`border`, `padding`, `content`] }],
        "bg-position": [{ bg: ne() }],
        "bg-repeat": [{ bg: re() }],
        "bg-size": [{ bg: ie() }],
        "bg-image": [
          {
            bg: [
              `none`,
              {
                linear: [{ to: [`t`, `tr`, `r`, `br`, `b`, `bl`, `l`, `tl`] }, X, $, Q],
                radial: [``, $, Q],
                conic: [X, $, Q],
              },
              sa,
              ta,
            ],
          },
        ],
        "bg-color": [{ bg: P() }],
        "gradient-from-pos": [{ from: ae() }],
        "gradient-via-pos": [{ via: ae() }],
        "gradient-to-pos": [{ to: ae() }],
        "gradient-from": [{ from: P() }],
        "gradient-via": [{ via: P() }],
        "gradient-to": [{ to: P() }],
        rounded: [{ rounded: F() }],
        "rounded-s": [{ "rounded-s": F() }],
        "rounded-e": [{ "rounded-e": F() }],
        "rounded-t": [{ "rounded-t": F() }],
        "rounded-r": [{ "rounded-r": F() }],
        "rounded-b": [{ "rounded-b": F() }],
        "rounded-l": [{ "rounded-l": F() }],
        "rounded-ss": [{ "rounded-ss": F() }],
        "rounded-se": [{ "rounded-se": F() }],
        "rounded-ee": [{ "rounded-ee": F() }],
        "rounded-es": [{ "rounded-es": F() }],
        "rounded-tl": [{ "rounded-tl": F() }],
        "rounded-tr": [{ "rounded-tr": F() }],
        "rounded-br": [{ "rounded-br": F() }],
        "rounded-bl": [{ "rounded-bl": F() }],
        "border-w": [{ border: I() }],
        "border-w-x": [{ "border-x": I() }],
        "border-w-y": [{ "border-y": I() }],
        "border-w-s": [{ "border-s": I() }],
        "border-w-e": [{ "border-e": I() }],
        "border-w-bs": [{ "border-bs": I() }],
        "border-w-be": [{ "border-be": I() }],
        "border-w-t": [{ "border-t": I() }],
        "border-w-r": [{ "border-r": I() }],
        "border-w-b": [{ "border-b": I() }],
        "border-w-l": [{ "border-l": I() }],
        "divide-x": [{ "divide-x": I() }],
        "divide-x-reverse": [`divide-x-reverse`],
        "divide-y": [{ "divide-y": I() }],
        "divide-y-reverse": [`divide-y-reverse`],
        "border-style": [{ border: [...L(), `hidden`, `none`] }],
        "divide-style": [{ divide: [...L(), `hidden`, `none`] }],
        "border-color": [{ border: P() }],
        "border-color-x": [{ "border-x": P() }],
        "border-color-y": [{ "border-y": P() }],
        "border-color-s": [{ "border-s": P() }],
        "border-color-e": [{ "border-e": P() }],
        "border-color-bs": [{ "border-bs": P() }],
        "border-color-be": [{ "border-be": P() }],
        "border-color-t": [{ "border-t": P() }],
        "border-color-r": [{ "border-r": P() }],
        "border-color-b": [{ "border-b": P() }],
        "border-color-l": [{ "border-l": P() }],
        "divide-color": [{ divide: P() }],
        "outline-style": [{ outline: [...L(), `none`, `hidden`] }],
        "outline-offset": [{ "outline-offset": [Y, $, Q] }],
        "outline-w": [{ outline: [``, Y, ra, Xi] }],
        "outline-color": [{ outline: P() }],
        shadow: [{ shadow: [``, `none`, u, ca, na] }],
        "shadow-color": [{ shadow: P() }],
        "inset-shadow": [{ "inset-shadow": [`none`, d, ca, na] }],
        "inset-shadow-color": [{ "inset-shadow": P() }],
        "ring-w": [{ ring: I() }],
        "ring-w-inset": [`ring-inset`],
        "ring-color": [{ ring: P() }],
        "ring-offset-w": [{ "ring-offset": [Y, Xi] }],
        "ring-offset-color": [{ "ring-offset": P() }],
        "inset-ring-w": [{ "inset-ring": I() }],
        "inset-ring-color": [{ "inset-ring": P() }],
        "text-shadow": [{ "text-shadow": [`none`, f, ca, na] }],
        "text-shadow-color": [{ "text-shadow": P() }],
        opacity: [{ opacity: [Y, $, Q] }],
        "mix-blend": [{ "mix-blend": [...oe(), `plus-darker`, `plus-lighter`] }],
        "bg-blend": [{ "bg-blend": oe() }],
        "mask-clip": [
          { "mask-clip": [`border`, `padding`, `content`, `fill`, `stroke`, `view`] },
          `mask-no-clip`,
        ],
        "mask-composite": [{ mask: [`add`, `subtract`, `intersect`, `exclude`] }],
        "mask-image-linear-pos": [{ "mask-linear": [Y] }],
        "mask-image-linear-from-pos": [{ "mask-linear-from": R() }],
        "mask-image-linear-to-pos": [{ "mask-linear-to": R() }],
        "mask-image-linear-from-color": [{ "mask-linear-from": P() }],
        "mask-image-linear-to-color": [{ "mask-linear-to": P() }],
        "mask-image-t-from-pos": [{ "mask-t-from": R() }],
        "mask-image-t-to-pos": [{ "mask-t-to": R() }],
        "mask-image-t-from-color": [{ "mask-t-from": P() }],
        "mask-image-t-to-color": [{ "mask-t-to": P() }],
        "mask-image-r-from-pos": [{ "mask-r-from": R() }],
        "mask-image-r-to-pos": [{ "mask-r-to": R() }],
        "mask-image-r-from-color": [{ "mask-r-from": P() }],
        "mask-image-r-to-color": [{ "mask-r-to": P() }],
        "mask-image-b-from-pos": [{ "mask-b-from": R() }],
        "mask-image-b-to-pos": [{ "mask-b-to": R() }],
        "mask-image-b-from-color": [{ "mask-b-from": P() }],
        "mask-image-b-to-color": [{ "mask-b-to": P() }],
        "mask-image-l-from-pos": [{ "mask-l-from": R() }],
        "mask-image-l-to-pos": [{ "mask-l-to": R() }],
        "mask-image-l-from-color": [{ "mask-l-from": P() }],
        "mask-image-l-to-color": [{ "mask-l-to": P() }],
        "mask-image-x-from-pos": [{ "mask-x-from": R() }],
        "mask-image-x-to-pos": [{ "mask-x-to": R() }],
        "mask-image-x-from-color": [{ "mask-x-from": P() }],
        "mask-image-x-to-color": [{ "mask-x-to": P() }],
        "mask-image-y-from-pos": [{ "mask-y-from": R() }],
        "mask-image-y-to-pos": [{ "mask-y-to": R() }],
        "mask-image-y-from-color": [{ "mask-y-from": P() }],
        "mask-image-y-to-color": [{ "mask-y-to": P() }],
        "mask-image-radial": [{ "mask-radial": [$, Q] }],
        "mask-image-radial-from-pos": [{ "mask-radial-from": R() }],
        "mask-image-radial-to-pos": [{ "mask-radial-to": R() }],
        "mask-image-radial-from-color": [{ "mask-radial-from": P() }],
        "mask-image-radial-to-color": [{ "mask-radial-to": P() }],
        "mask-image-radial-shape": [{ "mask-radial": [`circle`, `ellipse`] }],
        "mask-image-radial-size": [
          { "mask-radial": [{ closest: [`side`, `corner`], farthest: [`side`, `corner`] }] },
        ],
        "mask-image-radial-pos": [{ "mask-radial-at": b() }],
        "mask-image-conic-pos": [{ "mask-conic": [Y] }],
        "mask-image-conic-from-pos": [{ "mask-conic-from": R() }],
        "mask-image-conic-to-pos": [{ "mask-conic-to": R() }],
        "mask-image-conic-from-color": [{ "mask-conic-from": P() }],
        "mask-image-conic-to-color": [{ "mask-conic-to": P() }],
        "mask-mode": [{ mask: [`alpha`, `luminance`, `match`] }],
        "mask-origin": [
          { "mask-origin": [`border`, `padding`, `content`, `fill`, `stroke`, `view`] },
        ],
        "mask-position": [{ mask: ne() }],
        "mask-repeat": [{ mask: re() }],
        "mask-size": [{ mask: ie() }],
        "mask-type": [{ "mask-type": [`alpha`, `luminance`] }],
        "mask-image": [{ mask: [`none`, $, Q] }],
        filter: [{ filter: [``, `none`, $, Q] }],
        blur: [{ blur: z() }],
        brightness: [{ brightness: [Y, $, Q] }],
        contrast: [{ contrast: [Y, $, Q] }],
        "drop-shadow": [{ "drop-shadow": [``, `none`, p, ca, na] }],
        "drop-shadow-color": [{ "drop-shadow": P() }],
        grayscale: [{ grayscale: [``, Y, $, Q] }],
        "hue-rotate": [{ "hue-rotate": [Y, $, Q] }],
        invert: [{ invert: [``, Y, $, Q] }],
        saturate: [{ saturate: [Y, $, Q] }],
        sepia: [{ sepia: [``, Y, $, Q] }],
        "backdrop-filter": [{ "backdrop-filter": [``, `none`, $, Q] }],
        "backdrop-blur": [{ "backdrop-blur": z() }],
        "backdrop-brightness": [{ "backdrop-brightness": [Y, $, Q] }],
        "backdrop-contrast": [{ "backdrop-contrast": [Y, $, Q] }],
        "backdrop-grayscale": [{ "backdrop-grayscale": [``, Y, $, Q] }],
        "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [Y, $, Q] }],
        "backdrop-invert": [{ "backdrop-invert": [``, Y, $, Q] }],
        "backdrop-opacity": [{ "backdrop-opacity": [Y, $, Q] }],
        "backdrop-saturate": [{ "backdrop-saturate": [Y, $, Q] }],
        "backdrop-sepia": [{ "backdrop-sepia": [``, Y, $, Q] }],
        "border-collapse": [{ border: [`collapse`, `separate`] }],
        "border-spacing": [{ "border-spacing": w() }],
        "border-spacing-x": [{ "border-spacing-x": w() }],
        "border-spacing-y": [{ "border-spacing-y": w() }],
        "table-layout": [{ table: [`auto`, `fixed`] }],
        caption: [{ caption: [`top`, `bottom`] }],
        transition: [
          { transition: [``, `all`, `colors`, `opacity`, `shadow`, `transform`, `none`, $, Q] },
        ],
        "transition-behavior": [{ transition: [`normal`, `discrete`] }],
        duration: [{ duration: [Y, `initial`, $, Q] }],
        ease: [{ ease: [`linear`, `initial`, _, $, Q] }],
        delay: [{ delay: [Y, $, Q] }],
        animate: [{ animate: [`none`, v, $, Q] }],
        backface: [{ backface: [`hidden`, `visible`] }],
        perspective: [{ perspective: [h, $, Q] }],
        "perspective-origin": [{ "perspective-origin": x() }],
        rotate: [{ rotate: se() }],
        "rotate-x": [{ "rotate-x": se() }],
        "rotate-y": [{ "rotate-y": se() }],
        "rotate-z": [{ "rotate-z": se() }],
        scale: [{ scale: ce() }],
        "scale-x": [{ "scale-x": ce() }],
        "scale-y": [{ "scale-y": ce() }],
        "scale-z": [{ "scale-z": ce() }],
        "scale-3d": [`scale-3d`],
        skew: [{ skew: B() }],
        "skew-x": [{ "skew-x": B() }],
        "skew-y": [{ "skew-y": B() }],
        transform: [{ transform: [$, Q, ``, `none`, `gpu`, `cpu`] }],
        "transform-origin": [{ origin: x() }],
        "transform-style": [{ transform: [`3d`, `flat`] }],
        translate: [{ translate: le() }],
        "translate-x": [{ "translate-x": le() }],
        "translate-y": [{ "translate-y": le() }],
        "translate-z": [{ "translate-z": le() }],
        "translate-none": [`translate-none`],
        zoom: [{ zoom: [X, $, Q] }],
        accent: [{ accent: P() }],
        appearance: [{ appearance: [`none`, `auto`] }],
        "caret-color": [{ caret: P() }],
        "color-scheme": [
          { scheme: [`normal`, `dark`, `light`, `light-dark`, `only-dark`, `only-light`] },
        ],
        cursor: [
          {
            cursor: [
              `auto`,
              `default`,
              `pointer`,
              `wait`,
              `text`,
              `move`,
              `help`,
              `not-allowed`,
              `none`,
              `context-menu`,
              `progress`,
              `cell`,
              `crosshair`,
              `vertical-text`,
              `alias`,
              `copy`,
              `no-drop`,
              `grab`,
              `grabbing`,
              `all-scroll`,
              `col-resize`,
              `row-resize`,
              `n-resize`,
              `e-resize`,
              `s-resize`,
              `w-resize`,
              `ne-resize`,
              `nw-resize`,
              `se-resize`,
              `sw-resize`,
              `ew-resize`,
              `ns-resize`,
              `nesw-resize`,
              `nwse-resize`,
              `zoom-in`,
              `zoom-out`,
              $,
              Q,
            ],
          },
        ],
        "field-sizing": [{ "field-sizing": [`fixed`, `content`] }],
        "pointer-events": [{ "pointer-events": [`auto`, `none`] }],
        resize: [{ resize: [`none`, ``, `y`, `x`] }],
        "scroll-behavior": [{ scroll: [`auto`, `smooth`] }],
        "scrollbar-thumb-color": [{ "scrollbar-thumb": P() }],
        "scrollbar-track-color": [{ "scrollbar-track": P() }],
        "scrollbar-gutter": [{ "scrollbar-gutter": [`auto`, `stable`, `both`] }],
        "scrollbar-w": [{ scrollbar: [`auto`, `thin`, `none`] }],
        "scroll-m": [{ "scroll-m": w() }],
        "scroll-mx": [{ "scroll-mx": w() }],
        "scroll-my": [{ "scroll-my": w() }],
        "scroll-ms": [{ "scroll-ms": w() }],
        "scroll-me": [{ "scroll-me": w() }],
        "scroll-mbs": [{ "scroll-mbs": w() }],
        "scroll-mbe": [{ "scroll-mbe": w() }],
        "scroll-mt": [{ "scroll-mt": w() }],
        "scroll-mr": [{ "scroll-mr": w() }],
        "scroll-mb": [{ "scroll-mb": w() }],
        "scroll-ml": [{ "scroll-ml": w() }],
        "scroll-p": [{ "scroll-p": w() }],
        "scroll-px": [{ "scroll-px": w() }],
        "scroll-py": [{ "scroll-py": w() }],
        "scroll-ps": [{ "scroll-ps": w() }],
        "scroll-pe": [{ "scroll-pe": w() }],
        "scroll-pbs": [{ "scroll-pbs": w() }],
        "scroll-pbe": [{ "scroll-pbe": w() }],
        "scroll-pt": [{ "scroll-pt": w() }],
        "scroll-pr": [{ "scroll-pr": w() }],
        "scroll-pb": [{ "scroll-pb": w() }],
        "scroll-pl": [{ "scroll-pl": w() }],
        "snap-align": [{ snap: [`start`, `end`, `center`, `align-none`] }],
        "snap-stop": [{ snap: [`normal`, `always`] }],
        "snap-type": [{ snap: [`none`, `x`, `y`, `both`] }],
        "snap-strictness": [{ snap: [`mandatory`, `proximity`] }],
        touch: [{ touch: [`auto`, `none`, `manipulation`] }],
        "touch-x": [{ "touch-pan": [`x`, `left`, `right`] }],
        "touch-y": [{ "touch-pan": [`y`, `up`, `down`] }],
        "touch-pz": [`touch-pinch-zoom`],
        select: [{ select: [`none`, `text`, `all`, `auto`] }],
        "will-change": [{ "will-change": [`auto`, `scroll`, `contents`, `transform`, $, Q] }],
        fill: [{ fill: [`none`, ...P()] }],
        "stroke-w": [{ stroke: [Y, ra, Xi, Zi] }],
        stroke: [{ stroke: [`none`, ...P()] }],
        "forced-color-adjust": [{ "forced-color-adjust": [`auto`, `none`] }],
      },
      conflictingClassGroups: {
        "container-named": [`container-type`],
        overflow: [`overflow-x`, `overflow-y`],
        overscroll: [`overscroll-x`, `overscroll-y`],
        inset: [
          `inset-x`,
          `inset-y`,
          `inset-bs`,
          `inset-be`,
          `start`,
          `end`,
          `top`,
          `right`,
          `bottom`,
          `left`,
        ],
        "inset-x": [`right`, `left`],
        "inset-y": [`top`, `bottom`],
        flex: [`basis`, `grow`, `shrink`],
        gap: [`gap-x`, `gap-y`],
        p: [`px`, `py`, `ps`, `pe`, `pbs`, `pbe`, `pt`, `pr`, `pb`, `pl`],
        px: [`pr`, `pl`],
        py: [`pt`, `pb`],
        m: [`mx`, `my`, `ms`, `me`, `mbs`, `mbe`, `mt`, `mr`, `mb`, `ml`],
        mx: [`mr`, `ml`],
        my: [`mt`, `mb`],
        size: [`w`, `h`],
        "font-size": [`leading`],
        "fvn-normal": [
          `fvn-ordinal`,
          `fvn-slashed-zero`,
          `fvn-figure`,
          `fvn-spacing`,
          `fvn-fraction`,
        ],
        "fvn-ordinal": [`fvn-normal`],
        "fvn-slashed-zero": [`fvn-normal`],
        "fvn-figure": [`fvn-normal`],
        "fvn-spacing": [`fvn-normal`],
        "fvn-fraction": [`fvn-normal`],
        "line-clamp": [`display`, `overflow`],
        rounded: [
          `rounded-s`,
          `rounded-e`,
          `rounded-t`,
          `rounded-r`,
          `rounded-b`,
          `rounded-l`,
          `rounded-ss`,
          `rounded-se`,
          `rounded-ee`,
          `rounded-es`,
          `rounded-tl`,
          `rounded-tr`,
          `rounded-br`,
          `rounded-bl`,
        ],
        "rounded-s": [`rounded-ss`, `rounded-es`],
        "rounded-e": [`rounded-se`, `rounded-ee`],
        "rounded-t": [`rounded-tl`, `rounded-tr`],
        "rounded-r": [`rounded-tr`, `rounded-br`],
        "rounded-b": [`rounded-br`, `rounded-bl`],
        "rounded-l": [`rounded-tl`, `rounded-bl`],
        "border-spacing": [`border-spacing-x`, `border-spacing-y`],
        "border-w": [
          `border-w-x`,
          `border-w-y`,
          `border-w-s`,
          `border-w-e`,
          `border-w-bs`,
          `border-w-be`,
          `border-w-t`,
          `border-w-r`,
          `border-w-b`,
          `border-w-l`,
        ],
        "border-w-x": [`border-w-r`, `border-w-l`],
        "border-w-y": [`border-w-t`, `border-w-b`],
        "border-color": [
          `border-color-x`,
          `border-color-y`,
          `border-color-s`,
          `border-color-e`,
          `border-color-bs`,
          `border-color-be`,
          `border-color-t`,
          `border-color-r`,
          `border-color-b`,
          `border-color-l`,
        ],
        "border-color-x": [`border-color-r`, `border-color-l`],
        "border-color-y": [`border-color-t`, `border-color-b`],
        translate: [`translate-x`, `translate-y`, `translate-none`],
        "translate-none": [`translate`, `translate-x`, `translate-y`, `translate-z`],
        "scroll-m": [
          `scroll-mx`,
          `scroll-my`,
          `scroll-ms`,
          `scroll-me`,
          `scroll-mbs`,
          `scroll-mbe`,
          `scroll-mt`,
          `scroll-mr`,
          `scroll-mb`,
          `scroll-ml`,
        ],
        "scroll-mx": [`scroll-mr`, `scroll-ml`],
        "scroll-my": [`scroll-mt`, `scroll-mb`],
        "scroll-p": [
          `scroll-px`,
          `scroll-py`,
          `scroll-ps`,
          `scroll-pe`,
          `scroll-pbs`,
          `scroll-pbe`,
          `scroll-pt`,
          `scroll-pr`,
          `scroll-pb`,
          `scroll-pl`,
        ],
        "scroll-px": [`scroll-pr`, `scroll-pl`],
        "scroll-py": [`scroll-pt`, `scroll-pb`],
        touch: [`touch-x`, `touch-y`, `touch-pz`],
        "touch-x": [`touch`],
        "touch-y": [`touch`],
        "touch-pz": [`touch`],
      },
      conflictingClassGroupModifiers: { "font-size": [`leading`] },
      postfixLookupClassGroups: [`container-type`],
      orderSensitiveModifiers: [
        `*`,
        `**`,
        `after`,
        `backdrop`,
        `before`,
        `details-content`,
        `file`,
        `first-letter`,
        `first-line`,
        `marker`,
        `placeholder`,
        `selection`,
      ],
    };
  });
function xa(...e) {
  return ba(Qr(e));
}
var Sa = ({ shouldScaleBackground: e = !0, ...t }) =>
  (0, S.jsx)(q.Root, { shouldScaleBackground: e, ...t });
((Sa.displayName = `Drawer`), q.Trigger);
var Ca = q.Portal,
  wa = q.Close,
  Ta = x.forwardRef(({ className: e, ...t }, n) =>
    (0, S.jsx)(q.Overlay, { ref: n, className: xa(`fixed inset-0 z-50 bg-black/80`, e), ...t }),
  );
Ta.displayName = q.Overlay.displayName;
var Ea = x.forwardRef(({ className: e, children: t, ...n }, r) =>
  (0, S.jsxs)(Ca, {
    children: [
      (0, S.jsx)(Ta, {}),
      (0, S.jsxs)(q.Content, {
        ref: r,
        className: xa(
          `fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background`,
          e,
        ),
        ...n,
        children: [
          (0, S.jsx)(`div`, { className: `mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted` }),
          t,
        ],
      }),
    ],
  }),
);
Ea.displayName = `DrawerContent`;
var Da = ({ className: e, ...t }) =>
  (0, S.jsx)(`div`, { className: xa(`grid gap-1.5 p-4 text-center sm:text-left`, e), ...t });
Da.displayName = `DrawerHeader`;
var Oa = ({ className: e, ...t }) =>
  (0, S.jsx)(`div`, { className: xa(`mt-auto flex flex-col gap-2 p-4`, e), ...t });
Oa.displayName = `DrawerFooter`;
var ka = x.forwardRef(({ className: e, ...t }, n) =>
  (0, S.jsx)(q.Title, {
    ref: n,
    className: xa(`text-lg font-semibold leading-none tracking-tight`, e),
    ...t,
  }),
);
ka.displayName = q.Title.displayName;
var Aa = x.forwardRef(({ className: e, ...t }, n) =>
  (0, S.jsx)(q.Description, { ref: n, className: xa(`text-sm text-muted-foreground`, e), ...t }),
);
Aa.displayName = q.Description.displayName;
var ja = { uk: `gb`, int: `` };
function Ma(e) {
  let t = e.toLowerCase();
  return ja[t] ?? t;
}
function Na({ label: e, options: t, active: n, onSelect: r, isCountry: i }) {
  let [a, o] = (0, x.useState)(``),
    s = (0, x.useMemo)(
      () => t.filter((e) => !a || e.name.toLowerCase().includes(a.toLowerCase())).slice(0, 60),
      [t, a],
    );
  return (0, S.jsxs)(`div`, {
    className: `mb-6`,
    children: [
      (0, S.jsxs)(`div`, {
        className: `mb-3 flex items-center justify-between`,
        children: [
          (0, S.jsx)(`span`, {
            className: `text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]`,
            children: e,
          }),
          n &&
            (0, S.jsxs)(`button`, {
              type: `button`,
              onClick: () => r(void 0),
              className: `flex items-center gap-1 rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)] transition-opacity active:opacity-70`,
              children: [(0, S.jsx)(p, { className: `size-2.5` }), `Clear`],
            }),
        ],
      }),
      (0, S.jsxs)(`div`, {
        className: `relative mb-3`,
        children: [
          (0, S.jsx)(f, {
            className: `pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--text-tertiary)]`,
          }),
          (0, S.jsx)(`input`, {
            className: `h-9 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-8 pr-3 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] transition-colors`,
            placeholder: `Search ${e.toLowerCase()}…`,
            value: a,
            onChange: (e) => o(e.target.value),
          }),
          a &&
            (0, S.jsx)(`button`, {
              type: `button`,
              onClick: () => o(``),
              className: `absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] active:text-[var(--text-primary)]`,
              children: (0, S.jsx)(p, { className: `size-3.5` }),
            }),
        ],
      }),
      (0, S.jsxs)(`div`, {
        className: `space-y-0.5`,
        children: [
          s.map((e, t) => {
            let a = n === e.id,
              o = i ? Ma(e.id) : null;
            return (0, S.jsxs)(
              `button`,
              {
                type: `button`,
                onClick: () => r(a ? void 0 : e.id),
                style: { animationDelay: `${t * 18}ms` },
                className: `stagger-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-150 active:scale-[0.98] ${a ? `bg-[var(--accent-subtle)] text-[var(--accent)]` : `text-[var(--text-secondary)] active:bg-[var(--surface-3)]`}`,
                children: [
                  o
                    ? (0, S.jsx)(`img`, {
                        src: `https://flagcdn.com/w20/${o}.png`,
                        srcSet: `https://flagcdn.com/w40/${o}.png 2x`,
                        width: 20,
                        height: 15,
                        alt: ``,
                        className: `shrink-0 rounded-[3px] object-cover shadow-sm`,
                      })
                    : (0, S.jsx)(`span`, {
                        className: `size-1.5 shrink-0 rounded-full ${a ? `bg-[var(--accent)]` : `bg-[var(--border-default)]`}`,
                      }),
                  (0, S.jsx)(`span`, {
                    className: `min-w-0 flex-1 truncate text-[13px] font-medium`,
                    children: e.name,
                  }),
                  (0, S.jsx)(`span`, {
                    className: `shrink-0 text-[11px] tabular-nums ${a ? `text-[var(--accent)]/70` : `text-[var(--text-tertiary)]`}`,
                    children: e.count.toLocaleString(),
                  }),
                  a && (0, S.jsx)(v, { className: `size-3.5 shrink-0 text-[var(--accent)]` }),
                ],
              },
              e.id,
            );
          }),
          s.length === 0 &&
            (0, S.jsxs)(`p`, {
              className: `py-6 text-center text-[12px] text-[var(--text-tertiary)]`,
              children: [`No `, e.toLowerCase(), ` matches`],
            }),
        ],
      }),
    ],
  });
}
function Pa({ label: e, onRemove: t }) {
  return (0, S.jsxs)(`span`, {
    className: `inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-subtle)] px-3 py-1 text-[11px] font-medium text-[var(--accent)]`,
    children: [
      e,
      (0, S.jsx)(`button`, {
        type: `button`,
        onClick: t,
        "aria-label": `Remove ${e} filter`,
        className: `flex items-center rounded-full transition-opacity active:opacity-60`,
        children: (0, S.jsx)(p, { className: `size-2.5` }),
      }),
    ],
  });
}
function Fa({ activeCount: e, onClick: t }) {
  return (0, S.jsxs)(`button`, {
    type: `button`,
    onClick: t,
    "aria-label": `Open filters`,
    className: `relative inline-flex h-[34px] items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-all active:scale-95 sm:hidden ${e > 0 ? `border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)]` : `border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)]`}`,
    children: [
      (0, S.jsx)(b, { className: `size-3.5 shrink-0` }),
      e > 0 &&
        (0, S.jsx)(`span`, {
          className: `flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white`,
          children: e,
        }),
    ],
  });
}
function Ia({ open: e, onOpenChange: t, catalog: n, selected: r, resultCount: i, onChange: a }) {
  let [o, s] = (0, x.useState)(`country`),
    c = (0, x.useMemo)(
      () =>
        n.meta.languages
          .map((e) => ({
            id: e.code,
            name: e.name,
            count: n.indexes.by_language[e.code]?.length ?? 0,
          }))
          .filter((e) => e.count > 0)
          .sort((e, t) => t.count - e.count),
      [n],
    ),
    l = (0, x.useMemo)(
      () =>
        n.meta.countries
          .map((e) => ({
            id: e.code,
            name: e.name,
            count: n.indexes.by_country[e.code]?.length ?? 0,
          }))
          .filter((e) => e.count > 0)
          .sort((e, t) => t.count - e.count),
      [n],
    ),
    u = (0, x.useMemo)(() => l.find((e) => e.id === r.country)?.name, [l, r.country]),
    d = (0, x.useMemo)(() => c.find((e) => e.id === r.language)?.name, [c, r.language]),
    f = !!(r.category || r.language || r.country),
    m = [r.category, r.language, r.country].filter(Boolean).length,
    h = (0, x.useCallback)(() => a({ category: void 0, language: void 0, country: void 0 }), [a]);
  return (0, S.jsx)(Sa, {
    open: e,
    onOpenChange: t,
    children: (0, S.jsxs)(Ea, {
      className: `flex max-h-[92vh] flex-col bg-[var(--surface-base)] border-[var(--border-subtle)] px-0 pb-0`,
      children: [
        (0, S.jsxs)(`div`, {
          className: `flex shrink-0 items-center justify-between px-5 pb-3 pt-2`,
          children: [
            (0, S.jsxs)(`div`, {
              className: `flex items-center gap-2`,
              children: [
                (0, S.jsx)(`h2`, {
                  className: `font-display text-[15px] font-semibold text-[var(--text-primary)]`,
                  children: `Filters`,
                }),
                m > 0 &&
                  (0, S.jsx)(`span`, {
                    className: `flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[10px] font-bold text-white`,
                    children: m,
                  }),
              ],
            }),
            (0, S.jsxs)(`div`, {
              className: `flex items-center gap-3`,
              children: [
                f &&
                  (0, S.jsx)(`button`, {
                    type: `button`,
                    onClick: h,
                    className: `text-[12px] font-medium text-[var(--text-tertiary)] underline-offset-2 hover:text-[var(--text-primary)] active:opacity-60 transition-colors`,
                    children: `Clear all`,
                  }),
                (0, S.jsx)(wa, {
                  asChild: !0,
                  children: (0, S.jsx)(`button`, {
                    type: `button`,
                    "aria-label": `Close filters`,
                    className: `flex size-7 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--text-secondary)] transition-colors active:bg-[var(--surface-4)]`,
                    children: (0, S.jsx)(p, { className: `size-3.5` }),
                  }),
                }),
              ],
            }),
          ],
        }),
        f &&
          (0, S.jsxs)(`div`, {
            className: `shrink-0 flex flex-wrap gap-2 px-5 pb-3`,
            children: [
              u && (0, S.jsx)(Pa, { label: u, onRemove: () => a({ ...r, country: void 0 }) }),
              d && (0, S.jsx)(Pa, { label: d, onRemove: () => a({ ...r, language: void 0 }) }),
            ],
          }),
        (0, S.jsx)(`div`, {
          className: `shrink-0 mx-5 mb-4 flex rounded-xl bg-[var(--surface-2)] p-1`,
          children: [`country`, `language`].map((e) => {
            let t = o === e,
              n = e === `country` ? !!r.country : !!r.language;
            return (0, S.jsxs)(
              `button`,
              {
                type: `button`,
                onClick: () => s(e),
                className: `relative flex flex-1 items-center justify-center gap-1.5 rounded-[10px] py-2 text-[13px] font-medium transition-all duration-200 ${t ? `bg-[var(--surface-base)] text-[var(--text-primary)] shadow-sm` : `text-[var(--text-tertiary)]`}`,
                children: [
                  e === `country` ? `Country` : `Language`,
                  n &&
                    (0, S.jsx)(`span`, { className: `size-1.5 rounded-full bg-[var(--accent)]` }),
                ],
              },
              e,
            );
          }),
        }),
        (0, S.jsx)(`div`, {
          className: `min-h-0 flex-1 overflow-y-auto px-5 no-scrollbar`,
          children:
            o === `country`
              ? (0, S.jsx)(Na, {
                  label: `Country`,
                  options: l,
                  active: r.country,
                  isCountry: !0,
                  onSelect: (e) => a({ ...r, country: e }),
                })
              : (0, S.jsx)(Na, {
                  label: `Language`,
                  options: c,
                  active: r.language,
                  onSelect: (e) => a({ ...r, language: e }),
                }),
        }),
        (0, S.jsx)(`div`, {
          className: `shrink-0 border-t border-[var(--border-subtle)] bg-[var(--surface-base)] px-5 pb-[env(safe-area-inset-bottom,16px)] pt-4`,
          children: (0, S.jsx)(wa, {
            asChild: !0,
            children: (0, S.jsxs)(`button`, {
              type: `button`,
              className: `flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3.5 text-[14px] font-semibold text-white shadow-lg transition-all active:scale-[0.98] active:opacity-90`,
              children: [`Show `, i.toLocaleString(), ` channel`, i === 1 ? `` : `s`],
            }),
          }),
        }),
      ],
    }),
  });
}
function La({ catalog: e, active: t, onSelect: n }) {
  let r = (0, x.useRef)(null),
    [i, a] = (0, x.useState)(!1),
    [o, s] = (0, x.useState)(!1),
    [c, l] = (0, x.useState)(!1),
    f = (0, x.useMemo)(
      () =>
        e.meta.categories
          .map((t) => ({ id: t.id, name: t.name, count: e.indexes.by_category[t.id]?.length ?? 0 }))
          .filter((e) => e.count > 0)
          .sort((e, t) => t.count - e.count),
      [e],
    ),
    p = (0, x.useCallback)(() => {
      let e = r.current;
      e && (a(e.scrollLeft > 4), s(e.scrollLeft + e.clientWidth < e.scrollWidth - 4));
    }, []);
  (0, x.useEffect)(() => {
    let e = r.current;
    if (!e) return;
    (p(), e.addEventListener(`scroll`, p, { passive: !0 }));
    let t = new ResizeObserver(p);
    return (
      t.observe(e),
      () => {
        (e.removeEventListener(`scroll`, p), t.disconnect());
      }
    );
  }, [p]);
  let m = (0, x.useCallback)((e) => {
    let t = r.current;
    t && t.scrollBy({ left: e === `left` ? -240 : 240, behavior: `smooth` });
  }, []);
  return (
    (0, x.useEffect)(() => {
      let e = r.current;
      if (!e) return;
      let t = (t) => {
        if (Math.abs(t.deltaY) <= Math.abs(t.deltaX)) return;
        let n = e.scrollLeft > 1,
          r = e.scrollLeft + e.clientWidth < e.scrollWidth - 1,
          i = t.deltaY < 0,
          a = t.deltaY > 0;
        ((i && n) || (a && r)) &&
          (t.preventDefault(), e.scrollBy({ left: t.deltaY, behavior: `auto` }));
      };
      return (
        e.addEventListener(`wheel`, t, { passive: !1 }),
        () => e.removeEventListener(`wheel`, t)
      );
    }, []),
    (0, S.jsxs)(`div`, {
      className: `relative`,
      onMouseEnter: () => l(!0),
      onMouseLeave: () => l(!1),
      children: [
        (0, S.jsx)(`div`, {
          ref: r,
          className: `flex gap-2 overflow-x-auto pb-1 no-scrollbar`,
          children: f.map((e) =>
            (0, S.jsx)(
              `button`,
              {
                type: `button`,
                onClick: () => n(t === e.id ? void 0 : e.id),
                className: `shrink-0 rounded-full border px-3 py-1 text-[12px] font-medium transition-all duration-150 ${t === e.id ? `border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm` : `border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]`}`,
                children: e.name,
              },
              e.id,
            ),
          ),
        }),
        (0, S.jsx)(`div`, {
          className: `pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center transition-opacity duration-200 ${c && i ? `opacity-100` : `opacity-0`}`,
          style: {
            background: `linear-gradient(to right, var(--surface-base) 40%, transparent)`,
            width: `3.5rem`,
          },
          children: (0, S.jsx)(`button`, {
            type: `button`,
            "aria-label": `Scroll left`,
            onClick: () => m(`left`),
            className: `pointer-events-auto hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex`,
            children: (0, S.jsx)(u, { className: `size-3.5` }),
          }),
        }),
        (0, S.jsx)(`div`, {
          className: `pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center justify-end transition-opacity duration-200 ${c && o ? `opacity-100` : `opacity-0`}`,
          style: {
            background: `linear-gradient(to left, var(--surface-base) 40%, transparent)`,
            width: `3.5rem`,
          },
          children: (0, S.jsx)(`button`, {
            type: `button`,
            "aria-label": `Scroll right`,
            onClick: () => m(`right`),
            className: `pointer-events-auto hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex`,
            children: (0, S.jsx)(d, { className: `size-3.5` }),
          }),
        }),
      ],
    })
  );
}
var Ra = [
  { value: `popular`, label: `Popular` },
  { value: `name`, label: `A → Z` },
  { value: `country`, label: `Country` },
];
function za({ value: e, onChange: t }) {
  let [n, r] = (0, x.useState)(!1),
    i = (0, x.useRef)(null),
    a = Ra.find((t) => t.value === e) ?? Ra[0];
  return (
    (0, x.useEffect)(() => {
      if (!n) return;
      let e = (e) => {
        i.current && !i.current.contains(e.target) && r(!1);
      };
      return (
        document.addEventListener(`mousedown`, e),
        () => document.removeEventListener(`mousedown`, e)
      );
    }, [n]),
    (0, S.jsxs)(`div`, {
      ref: i,
      className: `relative`,
      children: [
        (0, S.jsxs)(`button`, {
          type: `button`,
          onClick: () => r((e) => !e),
          className: `flex h-[34px] items-center gap-2 rounded-lg border px-3 text-[12px] font-medium transition-colors ${n ? `border-[var(--accent)] bg-[var(--surface-2)] text-[var(--text-primary)]` : `border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]`}`,
          "aria-haspopup": `listbox`,
          "aria-expanded": n,
          "aria-label": `Sort`,
          children: [
            (0, S.jsx)(_, { className: `size-3.5 shrink-0 text-[var(--text-tertiary)]` }),
            (0, S.jsx)(`span`, { children: a.label }),
            (0, S.jsx)(d, {
              className: `size-3 shrink-0 text-[var(--text-tertiary)] transition-transform ${n ? `rotate-90` : `rotate-90 opacity-60`}`,
            }),
          ],
        }),
        n &&
          (0, S.jsx)(`div`, {
            className: `absolute right-0 top-[calc(100%+6px)] z-50 min-w-[130px] overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] py-1 shadow-xl dropdown-enter`,
            children: Ra.map((n) =>
              (0, S.jsxs)(
                `button`,
                {
                  type: `button`,
                  role: `option`,
                  "aria-selected": n.value === e,
                  onClick: () => {
                    (t(n.value), r(!1));
                  },
                  className: `flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[12px] transition-colors ${n.value === e ? `text-[var(--accent)]` : `text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]`}`,
                  children: [
                    (0, S.jsx)(`span`, { children: n.label }),
                    n.value === e && (0, S.jsx)(v, { className: `size-3 shrink-0` }),
                  ],
                },
                n.value,
              ),
            ),
          }),
      ],
    })
  );
}
function Ba() {
  let e = r({ from: `/browse` }),
    t = m.useSearch(),
    n = c(),
    [o, l] = (0, x.useState)(!1),
    u = s(),
    d = a();
  ((0, x.useEffect)(() => {
    if (!(typeof window > `u`) && !(t.category || t.language || t.country || t.q || t.sort)) {
      let t = sessionStorage.getItem(`pulse-browse-search`);
      if (t)
        try {
          let n = JSON.parse(t);
          Object.keys(n).length > 0 && e({ search: n, replace: !0 });
        } catch {}
    }
  }, []),
    (0, x.useEffect)(() => {
      typeof window > `u` ||
        (t.category || t.language || t.country || t.q || t.sort
          ? sessionStorage.setItem(`pulse-browse-search`, JSON.stringify(t))
          : sessionStorage.removeItem(`pulse-browse-search`));
    }, [t]));
  let _ = (0, x.useMemo)(() => {
      if (!n.data) return [];
      let e = [];
      (t.category && e.push(new Set(n.data.indexes.by_category[t.category] ?? [])),
        t.country && e.push(new Set(n.data.indexes.by_country[t.country] ?? [])),
        t.language && e.push(new Set(n.data.indexes.by_language[t.language] ?? [])));
      let r =
          e.length === 0
            ? n.data.indexes.all_ids
            : n.data.indexes.all_ids.filter((t) => e.every((e) => e.has(t))),
        a = t.q?.trim().toLowerCase();
      return (
        a && (r = r.filter((e) => n.data.channels[e]?.name.toLowerCase().includes(a))),
        (r =
          t.sort === `name`
            ? r
                .slice()
                .sort((e, t) => n.data.channels[e].name.localeCompare(n.data.channels[t].name))
            : t.sort === `country`
              ? r
                  .slice()
                  .sort((e, t) =>
                    n.data.channels[e].country.localeCompare(n.data.channels[t].country),
                  )
              : i(r, n.data.channels, u, d)),
        r
      );
    }, [n.data, t, u]),
    v = (t) => {
      e({ search: (e) => ({ ...e, ...t }), replace: !1 });
    };
  return (0, S.jsxs)(`div`, {
    children: [
      (0, S.jsxs)(`div`, {
        className: `mb-6 flex flex-wrap items-end justify-between gap-3`,
        children: [
          (0, S.jsxs)(`div`, {
            children: [
              (0, S.jsx)(`h1`, {
                className: `font-display text-2xl font-semibold tracking-tight sm:text-3xl`,
                children: `Browse`,
              }),
              (0, S.jsx)(`p`, {
                className: `mt-1 text-[13px] text-[var(--text-tertiary)]`,
                children: n.data ? `${_.length.toLocaleString()} channels` : `Loading catalog…`,
              }),
            ],
          }),
          (0, S.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, S.jsxs)(`div`, {
                className: `relative hidden sm:block sm:w-[280px] sm:flex-none`,
                children: [
                  (0, S.jsx)(f, {
                    className: `pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-tertiary)]`,
                  }),
                  (0, S.jsx)(`input`, {
                    value: t.q ?? ``,
                    onChange: (e) => v({ q: e.target.value || void 0 }),
                    placeholder: `Filter by name…`,
                    className: `input-field !pl-9`,
                  }),
                  t.q &&
                    (0, S.jsx)(`button`, {
                      onClick: () => v({ q: void 0 }),
                      "aria-label": `Clear`,
                      className: `absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)]`,
                      children: (0, S.jsx)(p, { className: `size-3.5` }),
                    }),
                ],
              }),
              (0, S.jsx)(za, { value: t.sort ?? `popular`, onChange: (e) => v({ sort: e }) }),
              (0, S.jsx)(Fa, {
                activeCount: [t.category, t.language, t.country].filter(Boolean).length,
                onClick: () => l(!0),
              }),
            ],
          }),
        ],
      }),
      n.data &&
        (0, S.jsx)(`div`, {
          className: `mb-4`,
          children: (0, S.jsx)(La, {
            catalog: n.data,
            active: t.category,
            onSelect: (e) => v({ category: e }),
          }),
        }),
      n.isLoading &&
        (0, S.jsx)(`div`, {
          className: `mb-4 flex gap-2 overflow-hidden`,
          children: Array.from({ length: 10 }).map((e, t) =>
            (0, S.jsx)(
              `div`,
              {
                className: `shimmer h-7 w-16 shrink-0 rounded-full`,
                style: { width: `${56 + (t % 3) * 16}px` },
              },
              t,
            ),
          ),
        }),
      (0, S.jsxs)(`div`, {
        className: `flex gap-6`,
        children: [
          (0, S.jsxs)(`aside`, {
            className: `hidden sm:block w-full shrink-0 sm:w-[260px]`,
            children: [
              n.isLoading &&
                (0, S.jsxs)(`div`, {
                  className: `space-y-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4`,
                  children: [
                    (0, S.jsx)(`div`, { className: `shimmer h-3.5 w-16 rounded-full` }),
                    (0, S.jsxs)(`div`, {
                      className: `space-y-2 border-t border-[var(--border-subtle)] pt-4`,
                      children: [
                        (0, S.jsx)(`div`, { className: `shimmer h-2.5 w-20 rounded-full` }),
                        (0, S.jsx)(`div`, { className: `shimmer h-8 w-full rounded-lg` }),
                        Array.from({ length: 6 }).map((e, t) =>
                          (0, S.jsxs)(
                            `div`,
                            {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, S.jsx)(`div`, { className: `shimmer h-4 w-5 rounded-[2px]` }),
                                (0, S.jsx)(`div`, {
                                  className: `shimmer h-2.5 rounded-full`,
                                  style: { width: `${60 + (t % 4) * 20}px` },
                                }),
                                (0, S.jsx)(`div`, {
                                  className: `shimmer ml-auto h-2 w-6 rounded-full`,
                                }),
                              ],
                            },
                            t,
                          ),
                        ),
                      ],
                    }),
                    (0, S.jsxs)(`div`, {
                      className: `space-y-2 border-t border-[var(--border-subtle)] pt-4`,
                      children: [
                        (0, S.jsx)(`div`, { className: `shimmer h-2.5 w-20 rounded-full` }),
                        (0, S.jsx)(`div`, { className: `shimmer h-8 w-full rounded-lg` }),
                        Array.from({ length: 6 }).map((e, t) =>
                          (0, S.jsxs)(
                            `div`,
                            {
                              className: `flex items-center gap-2`,
                              children: [
                                (0, S.jsx)(`div`, {
                                  className: `shimmer h-2.5 rounded-full`,
                                  style: { width: `${70 + (t % 3) * 18}px` },
                                }),
                                (0, S.jsx)(`div`, {
                                  className: `shimmer ml-auto h-2 w-6 rounded-full`,
                                }),
                              ],
                            },
                            t,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
              n.data &&
                (0, S.jsx)(E, {
                  catalog: n.data,
                  selected: t,
                  onChange: (t) =>
                    e({
                      search: (e) => ({
                        ...e,
                        category: t.category,
                        language: t.language,
                        country: t.country,
                      }),
                      replace: !1,
                    }),
                }),
            ],
          }),
          (0, S.jsxs)(`div`, {
            className: `min-w-0 flex-1`,
            children: [
              n.isLoading &&
                (0, S.jsx)(`div`, {
                  className: `grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`,
                  children: Array.from({ length: 15 }).map((e, t) =>
                    (0, S.jsxs)(
                      `div`,
                      {
                        className: `space-y-2`,
                        children: [
                          (0, S.jsx)(`div`, {
                            className: `shimmer aspect-video w-full rounded-md`,
                          }),
                          (0, S.jsx)(`div`, { className: `shimmer h-3 w-3/4 rounded-full` }),
                          (0, S.jsx)(`div`, { className: `shimmer h-2.5 w-1/2 rounded-full` }),
                        ],
                      },
                      t,
                    ),
                  ),
                }),
              n.data &&
                (0, S.jsxs)(S.Fragment, {
                  children: [
                    (0, S.jsx)(g, { channelIds: _, channels: n.data.channels, limit: 12 }),
                    (0, S.jsx)(h, { catalog: n.data, channelIds: _ }),
                  ],
                }),
            ],
          }),
        ],
      }),
      n.data &&
        (0, S.jsx)(Ia, {
          open: o,
          onOpenChange: l,
          catalog: n.data,
          selected: t,
          resultCount: _.length,
          onChange: (t) => {
            e({
              search: (e) => ({
                ...e,
                category: t.category,
                language: t.language,
                country: t.country,
              }),
              replace: !1,
            });
          },
        }),
    ],
  });
}
export { Ba as component };
