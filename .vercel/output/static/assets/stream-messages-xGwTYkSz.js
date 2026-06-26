var e = Object.create,
  t = Object.defineProperty,
  n = Object.getOwnPropertyDescriptor,
  r = Object.getOwnPropertyNames,
  i = Object.getPrototypeOf,
  a = Object.prototype.hasOwnProperty,
  o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), (e = null)), t.exports),
  s = (e, i, o, s) => {
    if ((i && typeof i == `object`) || typeof i == `function`)
      for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
        ((d = c[l]),
          !a.call(e, d) &&
            d !== o &&
            t(e, d, {
              get: ((e) => i[e]).bind(null, d),
              enumerable: !(s = n(i, d)) || s.enumerable,
            }));
    return e;
  },
  c = (n, r, a) => (
    (a = n == null ? {} : e(i(n))),
    s(r || !n || !n.__esModule ? t(a, `default`, { value: n, enumerable: !0 }) : a, n)
  ),
  l = o((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.portal`),
      r = Symbol.for(`react.fragment`),
      i = Symbol.for(`react.strict_mode`),
      a = Symbol.for(`react.profiler`),
      o = Symbol.for(`react.consumer`),
      s = Symbol.for(`react.context`),
      c = Symbol.for(`react.forward_ref`),
      l = Symbol.for(`react.suspense`),
      u = Symbol.for(`react.memo`),
      d = Symbol.for(`react.lazy`),
      f = Symbol.for(`react.activity`),
      p = Symbol.iterator;
    function m(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (p && e[p]) || e[`@@iterator`]), typeof e == `function` ? e : null);
    }
    var h = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      g = Object.assign,
      _ = {};
    function v(e, t, n) {
      ((this.props = e), (this.context = t), (this.refs = _), (this.updater = n || h));
    }
    ((v.prototype.isReactComponent = {}),
      (v.prototype.setState = function (e, t) {
        if (typeof e != `object` && typeof e != `function` && e != null)
          throw Error(
            `takes an object of state variables to update or a function which returns an object of state variables.`,
          );
        this.updater.enqueueSetState(this, e, t, `setState`);
      }),
      (v.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
      }));
    function y() {}
    y.prototype = v.prototype;
    function b(e, t, n) {
      ((this.props = e), (this.context = t), (this.refs = _), (this.updater = n || h));
    }
    var x = (b.prototype = new y());
    ((x.constructor = b), g(x, v.prototype), (x.isPureReactComponent = !0));
    var S = Array.isArray;
    function C() {}
    var w = { H: null, A: null, T: null, S: null },
      T = Object.prototype.hasOwnProperty;
    function E(e, n, r) {
      var i = r.ref;
      return { $$typeof: t, type: e, key: n, ref: i === void 0 ? null : i, props: r };
    }
    function D(e, t) {
      return E(e.type, t, e.props);
    }
    function O(e) {
      return typeof e == `object` && !!e && e.$$typeof === t;
    }
    function ee(e) {
      var t = { "=": `=0`, ":": `=2` };
      return (
        `$` +
        e.replace(/[=:]/g, function (e) {
          return t[e];
        })
      );
    }
    var k = /\/+/g;
    function te(e, t) {
      return typeof e == `object` && e && e.key != null ? ee(`` + e.key) : t.toString(36);
    }
    function A(e) {
      switch (e.status) {
        case `fulfilled`:
          return e.value;
        case `rejected`:
          throw e.reason;
        default:
          switch (
            (typeof e.status == `string`
              ? e.then(C, C)
              : ((e.status = `pending`),
                e.then(
                  function (t) {
                    e.status === `pending` && ((e.status = `fulfilled`), (e.value = t));
                  },
                  function (t) {
                    e.status === `pending` && ((e.status = `rejected`), (e.reason = t));
                  },
                )),
            e.status)
          ) {
            case `fulfilled`:
              return e.value;
            case `rejected`:
              throw e.reason;
          }
      }
      throw e;
    }
    function j(e, r, i, a, o) {
      var s = typeof e;
      (s === `undefined` || s === `boolean`) && (e = null);
      var c = !1;
      if (e === null) c = !0;
      else
        switch (s) {
          case `bigint`:
          case `string`:
          case `number`:
            c = !0;
            break;
          case `object`:
            switch (e.$$typeof) {
              case t:
              case n:
                c = !0;
                break;
              case d:
                return ((c = e._init), j(c(e._payload), r, i, a, o));
            }
        }
      if (c)
        return (
          (o = o(e)),
          (c = a === `` ? `.` + te(e, 0) : a),
          S(o)
            ? ((i = ``),
              c != null && (i = c.replace(k, `$&/`) + `/`),
              j(o, r, i, ``, function (e) {
                return e;
              }))
            : o != null &&
              (O(o) &&
                (o = D(
                  o,
                  i +
                    (o.key == null || (e && e.key === o.key)
                      ? ``
                      : (`` + o.key).replace(k, `$&/`) + `/`) +
                    c,
                )),
              r.push(o)),
          1
        );
      c = 0;
      var l = a === `` ? `.` : a + `:`;
      if (S(e))
        for (var u = 0; u < e.length; u++)
          ((a = e[u]), (s = l + te(a, u)), (c += j(a, r, i, s, o)));
      else if (((u = m(e)), typeof u == `function`))
        for (e = u.call(e), u = 0; !(a = e.next()).done; )
          ((a = a.value), (s = l + te(a, u++)), (c += j(a, r, i, s, o)));
      else if (s === `object`) {
        if (typeof e.then == `function`) return j(A(e), r, i, a, o);
        throw (
          (r = String(e)),
          Error(
            `Objects are not valid as a React child (found: ` +
              (r === `[object Object]`
                ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                : r) +
              `). If you meant to render a collection of children, use an array instead.`,
          )
        );
      }
      return c;
    }
    function ne(e, t, n) {
      if (e == null) return e;
      var r = [],
        i = 0;
      return (
        j(e, r, ``, ``, function (e) {
          return t.call(n, e, i++);
        }),
        r
      );
    }
    function M(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()),
          t.then(
            function (t) {
              (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = t));
            },
            function (t) {
              (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = t));
            },
          ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var N =
        typeof reportError == `function`
          ? reportError
          : function (e) {
              if (typeof window == `object` && typeof window.ErrorEvent == `function`) {
                var t = new window.ErrorEvent(`error`, {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof e == `object` && e && typeof e.message == `string`
                      ? String(e.message)
                      : String(e),
                  error: e,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (typeof process == `object` && typeof process.emit == `function`) {
                process.emit(`uncaughtException`, e);
                return;
              }
              console.error(e);
            },
      re = {
        map: ne,
        forEach: function (e, t, n) {
          ne(
            e,
            function () {
              t.apply(this, arguments);
            },
            n,
          );
        },
        count: function (e) {
          var t = 0;
          return (
            ne(e, function () {
              t++;
            }),
            t
          );
        },
        toArray: function (e) {
          return (
            ne(e, function (e) {
              return e;
            }) || []
          );
        },
        only: function (e) {
          if (!O(e))
            throw Error(`React.Children.only expected to receive a single React element child.`);
          return e;
        },
      };
    ((e.Activity = f),
      (e.Children = re),
      (e.Component = v),
      (e.Fragment = r),
      (e.Profiler = a),
      (e.PureComponent = b),
      (e.StrictMode = i),
      (e.Suspense = l),
      (e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w),
      (e.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (e) {
          return w.H.useMemoCache(e);
        },
      }),
      (e.cache = function (e) {
        return function () {
          return e.apply(null, arguments);
        };
      }),
      (e.cacheSignal = function () {
        return null;
      }),
      (e.cloneElement = function (e, t, n) {
        if (e == null)
          throw Error(`The argument must be a React element, but you passed ` + e + `.`);
        var r = g({}, e.props),
          i = e.key;
        if (t != null)
          for (a in (t.key !== void 0 && (i = `` + t.key), t))
            !T.call(t, a) ||
              a === `key` ||
              a === `__self` ||
              a === `__source` ||
              (a === `ref` && t.ref === void 0) ||
              (r[a] = t[a]);
        var a = arguments.length - 2;
        if (a === 1) r.children = n;
        else if (1 < a) {
          for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
          r.children = o;
        }
        return E(e.type, i, r);
      }),
      (e.createContext = function (e) {
        return (
          (e = {
            $$typeof: s,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }),
          (e.Provider = e),
          (e.Consumer = { $$typeof: o, _context: e }),
          e
        );
      }),
      (e.createElement = function (e, t, n) {
        var r,
          i = {},
          a = null;
        if (t != null)
          for (r in (t.key !== void 0 && (a = `` + t.key), t))
            T.call(t, r) && r !== `key` && r !== `__self` && r !== `__source` && (i[r] = t[r]);
        var o = arguments.length - 2;
        if (o === 1) i.children = n;
        else if (1 < o) {
          for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
          i.children = s;
        }
        if (e && e.defaultProps)
          for (r in ((o = e.defaultProps), o)) i[r] === void 0 && (i[r] = o[r]);
        return E(e, a, i);
      }),
      (e.createRef = function () {
        return { current: null };
      }),
      (e.forwardRef = function (e) {
        return { $$typeof: c, render: e };
      }),
      (e.isValidElement = O),
      (e.lazy = function (e) {
        return { $$typeof: d, _payload: { _status: -1, _result: e }, _init: M };
      }),
      (e.memo = function (e, t) {
        return { $$typeof: u, type: e, compare: t === void 0 ? null : t };
      }),
      (e.startTransition = function (e) {
        var t = w.T,
          n = {};
        w.T = n;
        try {
          var r = e(),
            i = w.S;
          (i !== null && i(n, r),
            typeof r == `object` && r && typeof r.then == `function` && r.then(C, N));
        } catch (e) {
          N(e);
        } finally {
          (t !== null && n.types !== null && (t.types = n.types), (w.T = t));
        }
      }),
      (e.unstable_useCacheRefresh = function () {
        return w.H.useCacheRefresh();
      }),
      (e.use = function (e) {
        return w.H.use(e);
      }),
      (e.useActionState = function (e, t, n) {
        return w.H.useActionState(e, t, n);
      }),
      (e.useCallback = function (e, t) {
        return w.H.useCallback(e, t);
      }),
      (e.useContext = function (e) {
        return w.H.useContext(e);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (e, t) {
        return w.H.useDeferredValue(e, t);
      }),
      (e.useEffect = function (e, t) {
        return w.H.useEffect(e, t);
      }),
      (e.useEffectEvent = function (e) {
        return w.H.useEffectEvent(e);
      }),
      (e.useId = function () {
        return w.H.useId();
      }),
      (e.useImperativeHandle = function (e, t, n) {
        return w.H.useImperativeHandle(e, t, n);
      }),
      (e.useInsertionEffect = function (e, t) {
        return w.H.useInsertionEffect(e, t);
      }),
      (e.useLayoutEffect = function (e, t) {
        return w.H.useLayoutEffect(e, t);
      }),
      (e.useMemo = function (e, t) {
        return w.H.useMemo(e, t);
      }),
      (e.useOptimistic = function (e, t) {
        return w.H.useOptimistic(e, t);
      }),
      (e.useReducer = function (e, t, n) {
        return w.H.useReducer(e, t, n);
      }),
      (e.useRef = function (e) {
        return w.H.useRef(e);
      }),
      (e.useState = function (e) {
        return w.H.useState(e);
      }),
      (e.useSyncExternalStore = function (e, t, n) {
        return w.H.useSyncExternalStore(e, t, n);
      }),
      (e.useTransition = function () {
        return w.H.useTransition();
      }),
      (e.version = `19.2.7`));
  }),
  u = o((e, t) => {
    t.exports = l();
  }),
  d = o((e) => {
    var t = u();
    function n(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    function r() {}
    var i = {
        d: {
          f: r,
          r: function () {
            throw Error(n(522));
          },
          D: r,
          C: r,
          L: r,
          m: r,
          X: r,
          S: r,
          M: r,
        },
        p: 0,
        findDOMNode: null,
      },
      a = Symbol.for(`react.portal`);
    function o(e, t, n) {
      var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: a,
        key: r == null ? null : `` + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function c(e, t) {
      if (e === `font`) return ``;
      if (typeof t == `string`) return t === `use-credentials` ? t : ``;
    }
    ((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i),
      (e.createPortal = function (e, t) {
        var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)) throw Error(n(299));
        return o(e, t, null, r);
      }),
      (e.flushSync = function (e) {
        var t = s.T,
          n = i.p;
        try {
          if (((s.T = null), (i.p = 2), e)) return e();
        } finally {
          ((s.T = t), (i.p = n), i.d.f());
        }
      }),
      (e.preconnect = function (e, t) {
        typeof e == `string` &&
          (t
            ? ((t = t.crossOrigin),
              (t = typeof t == `string` ? (t === `use-credentials` ? t : ``) : void 0))
            : (t = null),
          i.d.C(e, t));
      }),
      (e.prefetchDNS = function (e) {
        typeof e == `string` && i.d.D(e);
      }),
      (e.preinit = function (e, t) {
        if (typeof e == `string` && t && typeof t.as == `string`) {
          var n = t.as,
            r = c(n, t.crossOrigin),
            a = typeof t.integrity == `string` ? t.integrity : void 0,
            o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
          n === `style`
            ? i.d.S(e, typeof t.precedence == `string` ? t.precedence : void 0, {
                crossOrigin: r,
                integrity: a,
                fetchPriority: o,
              })
            : n === `script` &&
              i.d.X(e, {
                crossOrigin: r,
                integrity: a,
                fetchPriority: o,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
        }
      }),
      (e.preinitModule = function (e, t) {
        if (typeof e == `string`)
          if (typeof t == `object` && t) {
            if (t.as == null || t.as === `script`) {
              var n = c(t.as, t.crossOrigin);
              i.d.M(e, {
                crossOrigin: n,
                integrity: typeof t.integrity == `string` ? t.integrity : void 0,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
            }
          } else t ?? i.d.M(e);
      }),
      (e.preload = function (e, t) {
        if (typeof e == `string` && typeof t == `object` && t && typeof t.as == `string`) {
          var n = t.as,
            r = c(n, t.crossOrigin);
          i.d.L(e, n, {
            crossOrigin: r,
            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            nonce: typeof t.nonce == `string` ? t.nonce : void 0,
            type: typeof t.type == `string` ? t.type : void 0,
            fetchPriority: typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
            referrerPolicy: typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
            imageSrcSet: typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
            imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
            media: typeof t.media == `string` ? t.media : void 0,
          });
        }
      }),
      (e.preloadModule = function (e, t) {
        if (typeof e == `string`)
          if (t) {
            var n = c(t.as, t.crossOrigin);
            i.d.m(e, {
              as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
              crossOrigin: n,
              integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            });
          } else i.d.m(e);
      }),
      (e.requestFormReset = function (e) {
        i.d.r(e);
      }),
      (e.unstable_batchedUpdates = function (e, t) {
        return e(t);
      }),
      (e.useFormState = function (e, t, n) {
        return s.H.useFormState(e, t, n);
      }),
      (e.useFormStatus = function () {
        return s.H.useHostTransitionStatus();
      }),
      (e.version = `19.2.7`));
  }),
  f = o((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = d()));
  });
function p(e) {
  return e[e.length - 1];
}
function m(e) {
  return typeof e == `function`;
}
function h(e, t) {
  return m(e) ? e(t) : e;
}
var g = Object.prototype.hasOwnProperty,
  _ = Object.prototype.propertyIsEnumerable;
function v(e) {
  for (let t in e) if (g.call(e, t)) return !0;
  return !1;
}
var y = () => Object.create(null),
  b = (e, t) => x(e, t, y);
function x(e, t, n = () => ({}), r = 0) {
  if (e === t) return e;
  if (r > 500) return t;
  let i = t,
    a = T(e) && T(i);
  if (!a && !(C(e) && C(i))) return i;
  let o = a ? e : S(e);
  if (!o) return i;
  let s = a ? i : S(i);
  if (!s) return i;
  let c = o.length,
    l = s.length,
    u = a ? Array(l) : n(),
    d = 0;
  for (let t = 0; t < l; t++) {
    let o = a ? t : s[t],
      l = e[o],
      f = i[o];
    if (l === f) {
      ((u[o] = l), (a ? t < c : g.call(e, o)) && d++);
      continue;
    }
    if (l === null || f === null || typeof l != `object` || typeof f != `object`) {
      u[o] = f;
      continue;
    }
    let p = x(l, f, n, r + 1);
    ((u[o] = p), p === l && d++);
  }
  return c === l && d === c ? e : u;
}
function S(e) {
  let t = Object.getOwnPropertyNames(e);
  for (let n of t) if (!_.call(e, n)) return !1;
  let n = Object.getOwnPropertySymbols(e);
  if (n.length === 0) return t;
  let r = t;
  for (let t of n) {
    if (!_.call(e, t)) return !1;
    r.push(t);
  }
  return r;
}
function C(e) {
  if (!w(e)) return !1;
  let t = e.constructor;
  if (t === void 0) return !0;
  let n = t.prototype;
  return !(!w(n) || !n.hasOwnProperty(`isPrototypeOf`));
}
function w(e) {
  return Object.prototype.toString.call(e) === `[object Object]`;
}
function T(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function E(e, t, n) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return !1;
    for (let r = 0, i = e.length; r < i; r++) if (!E(e[r], t[r], n)) return !1;
    return !0;
  }
  if (C(e) && C(t)) {
    let r = n?.ignoreUndefined ?? !0;
    if (n?.partial) {
      for (let i in t) if ((!r || t[i] !== void 0) && !E(e[i], t[i], n)) return !1;
      return !0;
    }
    let i = 0;
    if (!r) i = Object.keys(e).length;
    else for (let t in e) e[t] !== void 0 && i++;
    let a = 0;
    for (let o in t) if ((!r || t[o] !== void 0) && (a++, a > i || !E(e[o], t[o], n))) return !1;
    return i === a;
  }
  return !1;
}
function D(e) {
  let t,
    n,
    r = new Promise((e, r) => {
      ((t = e), (n = r));
    });
  return (
    (r.status = `pending`),
    (r.resolve = (n) => {
      ((r.status = `resolved`), (r.value = n), t(n), e?.(n));
    }),
    (r.reject = (e) => {
      ((r.status = `rejected`), n(e));
    }),
    r
  );
}
function O(e) {
  return typeof e?.message == `string`
    ? e.message.startsWith(`Failed to fetch dynamically imported module`) ||
        e.message.startsWith(`error loading dynamically imported module`) ||
        e.message.startsWith(`Importing a module script failed`)
    : !1;
}
function ee(e) {
  return !!(e && typeof e == `object` && typeof e.then == `function`);
}
function k(e) {
  return e.replace(/[\x00-\x1f\x7f]/g, ``);
}
function te(e) {
  let t;
  try {
    t = decodeURI(e);
  } catch {
    t = e.replaceAll(/%[0-9A-F]{2}/gi, (e) => {
      try {
        return decodeURI(e);
      } catch {
        return e;
      }
    });
  }
  return k(t);
}
var A = [`http:`, `https:`, `mailto:`, `tel:`];
function j(e, t) {
  if (!e) return !1;
  try {
    let n = new URL(e);
    return !t.has(n.protocol);
  } catch {
    return !1;
  }
}
var ne = {
    "&": `\\u0026`,
    ">": `\\u003e`,
    "<": `\\u003c`,
    "\u2028": `\\u2028`,
    "\u2029": `\\u2029`,
  },
  M = /[&><\u2028\u2029]/g;
function N(e) {
  return e.replace(M, (e) => ne[e]);
}
function re(e) {
  if (!e || (!/[%\\\x00-\x1f\x7f]/.test(e) && !e.startsWith(`//`)))
    return { path: e, handledProtocolRelativeURL: !1 };
  let t = /%25|%5C/gi,
    n = 0,
    r = ``,
    i;
  for (; (i = t.exec(e)) !== null; ) ((r += te(e.slice(n, i.index)) + i[0]), (n = t.lastIndex));
  r += te(n ? e.slice(n) : e);
  let a = !1;
  return (
    r.startsWith(`//`) && ((a = !0), (r = `/` + r.replace(/^\/+/, ``))),
    { path: r, handledProtocolRelativeURL: a }
  );
}
function ie(e) {
  return /\s|[^\u0000-\u007F]/.test(e) ? e.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent) : e;
}
function ae(e, t) {
  if (e === t) return !0;
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function oe() {
  throw Error(`Invariant failed`);
}
function P(e) {
  let t = new Map(),
    n,
    r,
    i = (e) => {
      e.next &&
        (e.prev
          ? ((e.prev.next = e.next),
            (e.next.prev = e.prev),
            (e.next = void 0),
            r && ((r.next = e), (e.prev = r)))
          : ((e.next.prev = void 0),
            (n = e.next),
            (e.next = void 0),
            r && ((e.prev = r), (r.next = e))),
        (r = e));
    };
  return {
    get(e) {
      let n = t.get(e);
      if (n) return (i(n), n.value);
    },
    set(a, o) {
      if (t.size >= e && n) {
        let e = n;
        (t.delete(e.key),
          e.next && ((n = e.next), (e.next.prev = void 0)),
          e === r && (r = void 0));
      }
      let s = t.get(a);
      if (s) ((s.value = o), i(s));
      else {
        let e = { key: a, value: o, prev: r };
        (r && (r.next = e), (r = e), (n ||= e), t.set(a, e));
      }
    },
    clear() {
      (t.clear(), (n = void 0), (r = void 0));
    },
  };
}
var F = 4,
  I = 5;
function L(e) {
  let t = e.indexOf(`{`);
  if (t === -1) return null;
  let n = e.indexOf(`}`, t);
  return n === -1 || t + 1 >= e.length ? null : [t, n];
}
function se(e, t, n = new Uint16Array(6)) {
  let r = e.indexOf(`/`, t),
    i = r === -1 ? e.length : r,
    a = e.substring(t, i);
  if (!a || !a.includes(`$`))
    return ((n[0] = 0), (n[1] = t), (n[2] = t), (n[3] = i), (n[4] = i), (n[5] = i), n);
  if (a === `$`) {
    let r = e.length;
    return ((n[0] = 2), (n[1] = t), (n[2] = t), (n[3] = r), (n[4] = r), (n[5] = r), n);
  }
  if (a.charCodeAt(0) === 36)
    return ((n[0] = 1), (n[1] = t), (n[2] = t + 1), (n[3] = i), (n[4] = i), (n[5] = i), n);
  let o = L(a);
  if (o) {
    let [r, s] = o,
      c = a.charCodeAt(r + 1);
    if (c === 45) {
      if (r + 2 < a.length && a.charCodeAt(r + 2) === 36) {
        let e = r + 3,
          a = s;
        if (e < a)
          return (
            (n[0] = 3),
            (n[1] = t + r),
            (n[2] = t + e),
            (n[3] = t + a),
            (n[4] = t + s + 1),
            (n[5] = i),
            n
          );
      }
    } else if (c === 36) {
      let a = r + 1,
        o = r + 2;
      return o === s
        ? ((n[0] = 2),
          (n[1] = t + r),
          (n[2] = t + a),
          (n[3] = t + o),
          (n[4] = t + s + 1),
          (n[5] = e.length),
          n)
        : ((n[0] = 1),
          (n[1] = t + r),
          (n[2] = t + o),
          (n[3] = t + s),
          (n[4] = t + s + 1),
          (n[5] = i),
          n);
    }
  }
  return ((n[0] = 0), (n[1] = t), (n[2] = t), (n[3] = i), (n[4] = i), (n[5] = i), n);
}
function R(e, t, n, r, i, a, o) {
  o?.(n);
  let s = r;
  {
    let r = n.fullPath ?? n.from,
      o = r.length,
      c = n.options?.caseSensitive ?? e,
      l = n.options?.params?.parse ?? n.options?.parseParams;
    for (; s < o; ) {
      let e = se(r, s, t),
        o,
        u = s,
        d = e[5];
      switch (((s = d + 1), a++, e[0])) {
        case 0: {
          let t = r.substring(e[2], e[3]);
          if (c) {
            let e = i.static?.get(t);
            if (e) o = e;
            else {
              i.static ??= new Map();
              let e = V(n.fullPath ?? n.from);
              ((e.parent = i), (e.depth = a), (o = e), i.static.set(t, e));
            }
          } else {
            let e = t.toLowerCase(),
              r = i.staticInsensitive?.get(e);
            if (r) o = r;
            else {
              i.staticInsensitive ??= new Map();
              let t = V(n.fullPath ?? n.from);
              ((t.parent = i), (t.depth = a), (o = t), i.staticInsensitive.set(e, t));
            }
          }
          break;
        }
        case 1: {
          let t = r.substring(u, e[1]),
            s = r.substring(e[4], d),
            f = c && !!(t || s),
            p = t ? (f ? t : t.toLowerCase()) : void 0,
            m = s ? (f ? s : s.toLowerCase()) : void 0,
            h =
              !l &&
              i.dynamic?.find(
                (e) => !e.parse && e.caseSensitive === f && e.prefix === p && e.suffix === m,
              );
          if (h) o = h;
          else {
            let e = H(1, n.fullPath ?? n.from, f, p, m);
            ((o = e), (e.depth = a), (e.parent = i), (i.dynamic ??= []), i.dynamic.push(e));
          }
          break;
        }
        case 3: {
          let t = r.substring(u, e[1]),
            s = r.substring(e[4], d),
            f = c && !!(t || s),
            p = t ? (f ? t : t.toLowerCase()) : void 0,
            m = s ? (f ? s : s.toLowerCase()) : void 0,
            h =
              !l &&
              i.optional?.find(
                (e) => !e.parse && e.caseSensitive === f && e.prefix === p && e.suffix === m,
              );
          if (h) o = h;
          else {
            let e = H(3, n.fullPath ?? n.from, f, p, m);
            ((o = e), (e.parent = i), (e.depth = a), (i.optional ??= []), i.optional.push(e));
          }
          break;
        }
        case 2: {
          let t = r.substring(u, e[1]),
            s = r.substring(e[4], d),
            l = c && !!(t || s),
            f = t ? (l ? t : t.toLowerCase()) : void 0,
            p = s ? (l ? s : s.toLowerCase()) : void 0,
            m = H(2, n.fullPath ?? n.from, l, f, p);
          ((o = m), (m.parent = i), (m.depth = a), (i.wildcard ??= []), i.wildcard.push(m));
        }
      }
      i = o;
    }
    if (l && n.children && !n.isRoot && n.id && n.id.charCodeAt(n.id.lastIndexOf(`/`) + 1) === 95) {
      let e = V(n.fullPath ?? n.from);
      ((e.kind = I),
        (e.parent = i),
        a++,
        (e.depth = a),
        (i.pathless ??= []),
        i.pathless.push(e),
        (i = e));
    }
    let u = (n.path || !n.children) && !n.isRoot;
    if (u && r.endsWith(`/`)) {
      let e = V(n.fullPath ?? n.from);
      ((e.kind = F), (e.parent = i), a++, (e.depth = a), (i.index = e), (i = e));
    }
    ((i.parse = l ?? null),
      (i.priority = n.options?.params?.priority ?? 0),
      u && !i.route && ((i.route = n), (i.fullPath = n.fullPath ?? n.from)));
  }
  if (n.children) for (let r of n.children) R(e, t, r, s, i, a, o);
}
function z(e, t) {
  if (e.parse && !t.parse) return -1;
  if (!e.parse && t.parse) return 1;
  if (e.parse && t.parse && (e.priority || t.priority)) return t.priority - e.priority;
  if (e.prefix && t.prefix && e.prefix !== t.prefix) {
    if (e.prefix.startsWith(t.prefix)) return -1;
    if (t.prefix.startsWith(e.prefix)) return 1;
  }
  if (e.suffix && t.suffix && e.suffix !== t.suffix) {
    if (e.suffix.endsWith(t.suffix)) return -1;
    if (t.suffix.endsWith(e.suffix)) return 1;
  }
  return e.prefix && !t.prefix
    ? -1
    : !e.prefix && t.prefix
      ? 1
      : e.suffix && !t.suffix
        ? -1
        : !e.suffix && t.suffix
          ? 1
          : e.caseSensitive && !t.caseSensitive
            ? -1
            : !e.caseSensitive && t.caseSensitive
              ? 1
              : 0;
}
function B(e) {
  if (e.pathless) for (let t of e.pathless) B(t);
  if (e.static) for (let t of e.static.values()) B(t);
  if (e.staticInsensitive) for (let t of e.staticInsensitive.values()) B(t);
  if (e.dynamic?.length) {
    e.dynamic.sort(z);
    for (let t of e.dynamic) B(t);
  }
  if (e.optional?.length) {
    e.optional.sort(z);
    for (let t of e.optional) B(t);
  }
  if (e.wildcard?.length) {
    e.wildcard.sort(z);
    for (let t of e.wildcard) B(t);
  }
}
function V(e) {
  return {
    kind: 0,
    depth: 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath: e,
    parent: null,
    parse: null,
    priority: 0,
  };
}
function H(e, t, n, r, i) {
  return {
    kind: e,
    depth: 0,
    pathless: null,
    index: null,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath: t,
    parent: null,
    parse: null,
    priority: 0,
    caseSensitive: n,
    prefix: r,
    suffix: i,
  };
}
function ce(e, t) {
  let n = V(`/`),
    r = new Uint16Array(6);
  for (let t of e) R(!1, r, t, 1, n, 0);
  (B(n), (t.masksTree = n), (t.flatCache = P(1e3)));
}
function le(e, t) {
  e ||= `/`;
  let n = t.flatCache.get(e);
  if (n) return n;
  let r = U(e, t.masksTree);
  return (t.flatCache.set(e, r), r);
}
function ue(e, t, n, r, i) {
  ((e ||= `/`), (r ||= `/`));
  let a = t ? `case\0${e}` : e,
    o = i.singleCache.get(a);
  return (
    o || ((o = V(`/`)), R(t, new Uint16Array(6), { from: e }, 1, o, 0), i.singleCache.set(a, o)),
    U(r, o, n)
  );
}
function de(e, t, n = !1) {
  let r = n ? e : `nofuzz\0${e}`,
    i = t.matchCache.get(r);
  if (i !== void 0) return i;
  e ||= `/`;
  let a;
  try {
    a = U(e, t.segmentTree, n);
  } catch (e) {
    if (e instanceof URIError) a = null;
    else throw e;
  }
  return (a && (a.branch = G(a.route)), t.matchCache.set(r, a), a);
}
function fe(e) {
  return e === `/` ? e : e.replace(/\/{1,}$/, ``);
}
function pe(e, t = !1, n) {
  let r = V(e.fullPath),
    i = new Uint16Array(6),
    a = {},
    o = {},
    s = 0;
  return (
    R(t, i, e, 1, r, 0, (e) => {
      if ((n?.(e, s), e.id in a && oe(), (a[e.id] = e), s !== 0 && e.path)) {
        let t = fe(e.fullPath);
        (!o[t] || e.fullPath.endsWith(`/`)) && (o[t] = e);
      }
      s++;
    }),
    B(r),
    {
      processedTree: {
        segmentTree: r,
        singleCache: P(1e3),
        matchCache: P(1e3),
        flatCache: null,
        masksTree: null,
      },
      routesById: a,
      routesByPath: o,
    }
  );
}
function U(e, t, n = !1) {
  let r = e.split(`/`),
    i = he(e, r, t, n);
  if (!i) return null;
  let [a] = W(e, r, i);
  return { route: i.node.route, rawParams: a };
}
function W(e, t, n) {
  let r = me(n.node),
    i = null,
    a = Object.create(null),
    o = n.extract?.part ?? 0,
    s = n.extract?.node ?? 0,
    c = n.extract?.path ?? 0,
    l = n.extract?.segment ?? 0;
  for (; s < r.length; o++, s++, c++, l++) {
    let u = r[s];
    if (u.kind === F) break;
    if (u.kind === I) {
      (l--, o--, c--);
      continue;
    }
    let d = t[o],
      f = c;
    if ((d && (c += d.length), u.kind === 1)) {
      i ??= n.node.fullPath.split(`/`);
      let e = i[l],
        t = u.prefix?.length ?? 0;
      if (e.charCodeAt(t) === 123) {
        let n = u.suffix?.length ?? 0,
          r = e.substring(t + 2, e.length - n - 1),
          i = d.substring(t, d.length - n);
        a[r] = decodeURIComponent(i);
      } else {
        let t = e.substring(1);
        a[t] = decodeURIComponent(d);
      }
    } else if (u.kind === 3) {
      if (n.skipped & (1 << s)) {
        (o--, (c = f - 1));
        continue;
      }
      i ??= n.node.fullPath.split(`/`);
      let e = i[l],
        t = u.prefix?.length ?? 0,
        r = u.suffix?.length ?? 0,
        p = e.substring(t + 3, e.length - r - 1),
        m = u.suffix || u.prefix ? d.substring(t, d.length - r) : d;
      m && (a[p] = decodeURIComponent(m));
    } else if (u.kind === 2) {
      let t = u,
        n = e.substring(f + (t.prefix?.length ?? 0), e.length - (t.suffix?.length ?? 0)),
        r = decodeURIComponent(n);
      ((a[`*`] = r), (a._splat = r));
      break;
    }
  }
  return (
    n.rawParams && Object.assign(a, n.rawParams),
    [a, { part: o, node: s, path: c, segment: l }]
  );
}
function G(e) {
  let t = [e];
  for (; e.parentRoute; ) ((e = e.parentRoute), t.push(e));
  return (t.reverse(), t);
}
function me(e) {
  let t = Array(e.depth + 1);
  do ((t[e.depth] = e), (e = e.parent));
  while (e);
  return t;
}
function he(e, t, n, r) {
  if (e === `/` && n.index) return { node: n.index, skipped: 0 };
  let i = !p(t),
    a = i && e !== `/`,
    o = t.length - +!!i,
    s = [{ node: n, index: 1, skipped: 0, depth: 1, statics: 0, dynamics: 0, optionals: 0 }],
    c = null,
    l = null;
  for (; s.length; ) {
    let n = s.pop(),
      { node: i, index: u, skipped: d, depth: f, statics: p, dynamics: m, optionals: h } = n,
      { extract: g, rawParams: _ } = n;
    if (i.kind === 2 && i.route && !ve(l, n)) continue;
    if (i.parse) {
      if (!_e(e, t, n)) continue;
      ((_ = n.rawParams), (g = n.extract));
    }
    r && i.route && i.kind !== F && ve(c, n) && (c = n);
    let v = u === o;
    if (
      v &&
      (i.route && (!a || i.kind === F || i.kind === 2) && ve(l, n) && (l = n),
      !i.optional && !i.wildcard && !i.index && !i.pathless)
    )
      continue;
    let y = v ? void 0 : t[u],
      b;
    if (v && i.index) {
      let n = {
          node: i.index,
          index: u,
          skipped: d,
          depth: f + 1,
          statics: p,
          dynamics: m,
          optionals: h,
          extract: g,
          rawParams: _,
        },
        r = !0;
      if ((i.index.parse && (_e(e, t, n) || (r = !1)), r)) {
        if (!m && !h && !d && ge(p, o)) return n;
        ve(l, n) && (l = n);
      }
    }
    if (i.wildcard)
      for (let e = i.wildcard.length - 1; e >= 0; e--) {
        let n = i.wildcard[e],
          { prefix: r, suffix: a } = n;
        if (!(r && (v || !(n.caseSensitive ? y : (b ??= y.toLowerCase())).startsWith(r)))) {
          if (a) {
            if (v) continue;
            let e = t.slice(u).join(`/`).slice(-a.length);
            if ((n.caseSensitive ? e : e.toLowerCase()) !== a) continue;
          }
          s.push({
            node: n,
            index: o,
            skipped: d,
            depth: f + 1,
            statics: p,
            dynamics: m,
            optionals: h,
            extract: g,
            rawParams: _,
          });
        }
      }
    if (i.optional) {
      let e = d | (1 << f),
        t = f + 1;
      for (let n = i.optional.length - 1; n >= 0; n--) {
        let r = i.optional[n];
        s.push({
          node: r,
          index: u,
          skipped: e,
          depth: t,
          statics: p,
          dynamics: m,
          optionals: h,
          extract: g,
          rawParams: _,
        });
      }
      if (!v)
        for (let e = i.optional.length - 1; e >= 0; e--) {
          let n = i.optional[e],
            { prefix: r, suffix: a } = n;
          if (r || a) {
            let e = n.caseSensitive ? y : (b ??= y.toLowerCase());
            if ((r && !e.startsWith(r)) || (a && !e.endsWith(a))) continue;
          }
          s.push({
            node: n,
            index: u + 1,
            skipped: d,
            depth: t,
            statics: p,
            dynamics: m,
            optionals: h + K(o, u),
            extract: g,
            rawParams: _,
          });
        }
    }
    if (!v && i.dynamic && y)
      for (let e = i.dynamic.length - 1; e >= 0; e--) {
        let t = i.dynamic[e],
          { prefix: n, suffix: r } = t;
        if (n || r) {
          let e = t.caseSensitive ? y : (b ??= y.toLowerCase());
          if ((n && !e.startsWith(n)) || (r && !e.endsWith(r))) continue;
        }
        s.push({
          node: t,
          index: u + 1,
          skipped: d,
          depth: f + 1,
          statics: p,
          dynamics: m + K(o, u),
          optionals: h,
          extract: g,
          rawParams: _,
        });
      }
    if (!v && i.staticInsensitive) {
      let e = i.staticInsensitive.get((b ??= y.toLowerCase()));
      e &&
        s.push({
          node: e,
          index: u + 1,
          skipped: d,
          depth: f + 1,
          statics: p + K(o, u),
          dynamics: m,
          optionals: h,
          extract: g,
          rawParams: _,
        });
    }
    if (!v && i.static) {
      let e = i.static.get(y);
      e &&
        s.push({
          node: e,
          index: u + 1,
          skipped: d,
          depth: f + 1,
          statics: p + K(o, u),
          dynamics: m,
          optionals: h,
          extract: g,
          rawParams: _,
        });
    }
    if (i.pathless) {
      let e = f + 1;
      for (let t = i.pathless.length - 1; t >= 0; t--) {
        let n = i.pathless[t];
        s.push({
          node: n,
          index: u,
          skipped: d,
          depth: e,
          statics: p,
          dynamics: m,
          optionals: h,
          extract: g,
          rawParams: _,
        });
      }
    }
  }
  if (l) return l;
  if (r && c) {
    let n = c.index;
    for (let e = 0; e < c.index; e++) n += t[e].length;
    let r = n === e.length ? `/` : e.slice(n);
    return ((c.rawParams ??= Object.create(null)), (c.rawParams[`**`] = decodeURIComponent(r)), c);
  }
  return null;
}
function K(e, t) {
  return 2 ** (e - t - 1);
}
function ge(e, t) {
  return e === 2 ** (t - 1) - 1;
}
function _e(e, t, n) {
  let r, i;
  try {
    [r, i] = W(e, t, n);
  } catch {
    return null;
  }
  if (((n.rawParams = r), (n.extract = i), !n.node.parse)) return !0;
  try {
    if (n.node.parse(r) === !1) return null;
  } catch {}
  return !0;
}
function ve(e, t) {
  return e
    ? t.statics > e.statics ||
        (t.statics === e.statics &&
          (t.dynamics > e.dynamics ||
            (t.dynamics === e.dynamics &&
              (t.optionals > e.optionals ||
                (t.optionals === e.optionals &&
                  ((t.node.kind === F) > (e.node.kind === F) ||
                    ((t.node.kind === F) == (e.node.kind === F) && t.depth > e.depth)))))))
    : !0;
}
function q(e) {
  return ye(e.filter((e) => e !== void 0).join(`/`));
}
function ye(e) {
  return e.replace(/\/{2,}/g, `/`);
}
function be(e) {
  return e === `/` ? e : e.replace(/^\/{1,}/, ``);
}
function xe(e) {
  let t = e.length;
  return t > 1 && e[t - 1] === `/` ? e.replace(/\/{1,}$/, ``) : e;
}
function Se(e) {
  return xe(be(e));
}
function Ce(e, t) {
  return e?.endsWith(`/`) && e !== `/` && e !== `${t}/` ? e.slice(0, -1) : e;
}
function we(e, t, n) {
  return Ce(e, n) === Ce(t, n);
}
function Te({ base: e, to: t, trailingSlash: n = `never`, cache: r }) {
  let i = t.startsWith(`/`),
    a = !i && t === `.`,
    o;
  if (r) {
    o = i ? t : a ? e : e + `\0` + t;
    let n = r.get(o);
    if (n) return n;
  }
  let s;
  if (a) s = e.split(`/`);
  else if (i) s = t.split(`/`);
  else {
    for (s = e.split(`/`); s.length > 1 && p(s) === ``; ) s.pop();
    let n = t.split(`/`);
    for (let e = 0, t = n.length; e < t; e++) {
      let r = n[e];
      r === ``
        ? e
          ? e === t - 1 && s.push(r)
          : (s = [r])
        : r === `..`
          ? s.pop()
          : r === `.` || s.push(r);
    }
  }
  s.length > 1 && (p(s) === `` ? n === `never` && s.pop() : n === `always` && s.push(``));
  let c = ye(s.join(`/`)) || `/`;
  return (o && r && r.set(o, c), c);
}
function Ee(e) {
  let t = new Map(e.map((e) => [encodeURIComponent(e), e])),
    n = Array.from(t.keys())
      .map((e) => e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`))
      .join(`|`),
    r = new RegExp(n, `g`);
  return (e) => e.replace(r, (e) => t.get(e) ?? e);
}
function De(e, t, n) {
  let r = t[e];
  return typeof r == `string`
    ? e === `_splat`
      ? /^[a-zA-Z0-9\-._~!/]*$/.test(r)
        ? r
        : r
            .split(`/`)
            .map((e) => ke(e, n))
            .join(`/`)
      : ke(r, n)
    : r;
}
function Oe({ path: e, params: t, decoder: n, ...r }) {
  let i = !1,
    a = Object.create(null);
  if (!e || e === `/`) return { interpolatedPath: `/`, usedParams: a, isMissingParams: i };
  if (!e.includes(`$`)) return { interpolatedPath: e, usedParams: a, isMissingParams: i };
  let o = e.length,
    s = 0,
    c,
    l = ``;
  for (; s < o; ) {
    let r = s;
    c = se(e, r, c);
    let o = c[5];
    if (((s = o + 1), r === o)) continue;
    let u = c[0];
    if (u === 0) {
      l += `/` + e.substring(r, o);
      continue;
    }
    if (u === 2) {
      let s = t._splat;
      ((a._splat = s), (a[`*`] = s));
      let u = e.substring(r, c[1]),
        d = e.substring(c[4], o);
      if (!s) {
        ((i = !0), (u || d) && (l += `/` + u + d));
        continue;
      }
      let f = De(`_splat`, t, n);
      l += `/` + u + f + d;
      continue;
    }
    if (u === 1) {
      let s = e.substring(c[2], c[3]);
      (!i && !(s in t) && (i = !0), (a[s] = t[s]));
      let u = e.substring(r, c[1]),
        d = e.substring(c[4], o),
        f = De(s, t, n) ?? `undefined`;
      l += `/` + u + f + d;
      continue;
    }
    if (u === 3) {
      let i = e.substring(c[2], c[3]),
        s = t[i];
      if (s == null) continue;
      a[i] = s;
      let u = e.substring(r, c[1]),
        d = e.substring(c[4], o),
        f = De(i, t, n) ?? ``;
      l += `/` + u + f + d;
      continue;
    }
  }
  return (
    e.endsWith(`/`) && (l += `/`),
    { usedParams: a, interpolatedPath: l || `/`, isMissingParams: i }
  );
}
function ke(e, t) {
  let n = encodeURIComponent(e);
  return t?.(n) ?? n;
}
var Ae = `Error preloading route! ☝️`,
  je = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: (e) => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: (e) => clearInterval(e),
  },
  Me = new (class {
    #e = je;
    setTimeoutProvider(e) {
      this.#e = e;
    }
    setTimeout(e, t) {
      return this.#e.setTimeout(e, t);
    }
    clearTimeout(e) {
      this.#e.clearTimeout(e);
    }
    setInterval(e, t) {
      return this.#e.setInterval(e, t);
    }
    clearInterval(e) {
      this.#e.clearInterval(e);
    }
  })();
function Ne(e) {
  setTimeout(e, 0);
}
var Pe = typeof window > `u` || `Deno` in globalThis;
function Fe() {}
function Ie(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function Le(e) {
  return typeof e == `number` && e >= 0 && e !== 1 / 0;
}
function Re(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function ze(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function J(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function Be(e, t) {
  let { type: n = `all`, exact: r, fetchStatus: i, predicate: a, queryKey: o, stale: s } = e;
  if (o) {
    if (r) {
      if (t.queryHash !== He(o, t.options)) return !1;
    } else if (!We(t.queryKey, o)) return !1;
  }
  if (n !== `all`) {
    let e = t.isActive();
    if ((n === `active` && !e) || (n === `inactive` && e)) return !1;
  }
  return !(
    (typeof s == `boolean` && t.isStale() !== s) ||
    (i && i !== t.state.fetchStatus) ||
    (a && !a(t))
  );
}
function Ve(e, t) {
  let { exact: n, status: r, predicate: i, mutationKey: a } = e;
  if (a) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (Ue(t.options.mutationKey) !== Ue(a)) return !1;
    } else if (!We(t.options.mutationKey, a)) return !1;
  }
  return !((r && t.state.status !== r) || (i && !i(t)));
}
function He(e, t) {
  return (t?.queryKeyHashFn || Ue)(e);
}
function Ue(e) {
  return JSON.stringify(e, (e, t) =>
    Ye(t)
      ? Object.keys(t)
          .sort()
          .reduce((e, n) => ((e[n] = t[n]), e), {})
      : t,
  );
}
function We(e, t) {
  return e === t
    ? !0
    : typeof e == typeof t && e && t && typeof e == `object` && typeof t == `object`
      ? Object.keys(t).every((n) => We(e[n], t[n]))
      : !1;
}
var Ge = Object.prototype.hasOwnProperty;
function Ke(e, t, n = 0) {
  if (e === t) return e;
  if (n > 500) return t;
  let r = Je(e) && Je(t);
  if (!r && !(Ye(e) && Ye(t))) return t;
  let i = (r ? e : Object.keys(e)).length,
    a = r ? t : Object.keys(t),
    o = a.length,
    s = r ? Array(o) : {},
    c = 0;
  for (let l = 0; l < o; l++) {
    let o = r ? l : a[l],
      u = e[o],
      d = t[o];
    if (u === d) {
      ((s[o] = u), (r ? l < i : Ge.call(e, o)) && c++);
      continue;
    }
    if (u === null || d === null || typeof u != `object` || typeof d != `object`) {
      s[o] = d;
      continue;
    }
    let f = Ke(u, d, n + 1);
    ((s[o] = f), f === u && c++);
  }
  return i === o && c === i ? e : s;
}
function qe(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (let n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function Je(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Ye(e) {
  if (!Xe(e)) return !1;
  let t = e.constructor;
  if (t === void 0) return !0;
  let n = t.prototype;
  return !(
    !Xe(n) ||
    !n.hasOwnProperty(`isPrototypeOf`) ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Xe(e) {
  return Object.prototype.toString.call(e) === `[object Object]`;
}
function Ze(e) {
  return new Promise((t) => {
    Me.setTimeout(t, e);
  });
}
function Qe(e, t, n) {
  return typeof n.structuralSharing == `function`
    ? n.structuralSharing(e, t)
    : n.structuralSharing === !1
      ? t
      : Ke(e, t);
}
function $e(e, t, n = 0) {
  let r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function et(e, t, n = 0) {
  let r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var tt = Symbol();
function nt(e, t) {
  return !e.queryFn && t?.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === tt
      ? () => Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
function rt(e, t) {
  return typeof e == `function` ? e(...t) : !!e;
}
function it(e, t, n) {
  let r = !1,
    i;
  return (
    Object.defineProperty(e, "signal", {
      enumerable: !0,
      get: () => (
        (i ??= t()),
        r ? i : ((r = !0), i.aborted ? n() : i.addEventListener(`abort`, n, { once: !0 }), i)
      ),
    }),
    e
  );
}
var at = (() => {
    let e = () => Pe;
    return {
      isServer() {
        return e();
      },
      setIsServer(t) {
        e = t;
      },
    };
  })(),
  ot = Ne;
function st() {
  let e = [],
    t = 0,
    n = (e) => {
      e();
    },
    r = (e) => {
      e();
    },
    i = ot,
    a = (r) => {
      t
        ? e.push(r)
        : i(() => {
            n(r);
          });
    },
    o = () => {
      let t = e;
      ((e = []),
        t.length &&
          i(() => {
            r(() => {
              t.forEach((e) => {
                n(e);
              });
            });
          }));
    };
  return {
    batch: (e) => {
      let n;
      t++;
      try {
        n = e();
      } finally {
        (t--, t || o());
      }
      return n;
    },
    batchCalls:
      (e) =>
      (...t) => {
        a(() => {
          e(...t);
        });
      },
    schedule: a,
    setNotifyFunction: (e) => {
      n = e;
    },
    setBatchNotifyFunction: (e) => {
      r = e;
    },
    setScheduler: (e) => {
      i = e;
    },
  };
}
var ct = st(),
  lt = class {
    constructor() {
      ((this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  ut = new (class extends lt {
    #e;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (typeof window < `u` && window.addEventListener) {
            let t = () => e();
            return (
              window.addEventListener(`visibilitychange`, t, !1),
              () => {
                window.removeEventListener(`visibilitychange`, t);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e),
        this.#t?.(),
        (this.#t = e((e) => {
          typeof e == `boolean` ? this.setFocused(e) : this.onFocus();
        })));
    }
    setFocused(e) {
      this.#e !== e && ((this.#e = e), this.onFocus());
    }
    onFocus() {
      let e = this.isFocused();
      this.listeners.forEach((t) => {
        t(e);
      });
    }
    isFocused() {
      return typeof this.#e == `boolean`
        ? this.#e
        : globalThis.document?.visibilityState !== `hidden`;
    }
  })(),
  dt = new (class extends lt {
    #e = !0;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (typeof window < `u` && window.addEventListener) {
            let t = () => e(!0),
              n = () => e(!1);
            return (
              window.addEventListener(`online`, t, !1),
              window.addEventListener(`offline`, n, !1),
              () => {
                (window.removeEventListener(`online`, t), window.removeEventListener(`offline`, n));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e), this.#t?.(), (this.#t = e(this.setOnline.bind(this))));
    }
    setOnline(e) {
      this.#e !== e &&
        ((this.#e = e),
        this.listeners.forEach((t) => {
          t(e);
        }));
    }
    isOnline() {
      return this.#e;
    }
  })();
function ft() {
  let e,
    t,
    n = new Promise((n, r) => {
      ((e = n), (t = r));
    });
  ((n.status = `pending`), n.catch(() => {}));
  function r(e) {
    (Object.assign(n, e), delete n.resolve, delete n.reject);
  }
  return (
    (n.resolve = (t) => {
      (r({ status: `fulfilled`, value: t }), e(t));
    }),
    (n.reject = (e) => {
      (r({ status: `rejected`, reason: e }), t(e));
    }),
    n
  );
}
function pt(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function mt(e) {
  return (e ?? `online`) === `online` ? dt.isOnline() : !0;
}
var ht = class extends Error {
  constructor(e) {
    (super(`CancelledError`), (this.revert = e?.revert), (this.silent = e?.silent));
  }
};
function gt(e) {
  let t = !1,
    n = 0,
    r,
    i = ft(),
    a = () => i.status !== `pending`,
    o = (t) => {
      if (!a()) {
        let n = new ht(t);
        (f(n), e.onCancel?.(n));
      }
    },
    s = () => {
      t = !0;
    },
    c = () => {
      t = !1;
    },
    l = () => ut.isFocused() && (e.networkMode === `always` || dt.isOnline()) && e.canRun(),
    u = () => mt(e.networkMode) && e.canRun(),
    d = (e) => {
      a() || (r?.(), i.resolve(e));
    },
    f = (e) => {
      a() || (r?.(), i.reject(e));
    },
    p = () =>
      new Promise((t) => {
        ((r = (e) => {
          (a() || l()) && t(e);
        }),
          e.onPause?.());
      }).then(() => {
        ((r = void 0), a() || e.onContinue?.());
      }),
    m = () => {
      if (a()) return;
      let r,
        i = n === 0 ? e.initialPromise : void 0;
      try {
        r = i ?? e.fn();
      } catch (e) {
        r = Promise.reject(e);
      }
      Promise.resolve(r)
        .then(d)
        .catch((r) => {
          if (a()) return;
          let i = e.retry ?? (at.isServer() ? 0 : 3),
            o = e.retryDelay ?? pt,
            s = typeof o == `function` ? o(n, r) : o,
            c = i === !0 || (typeof i == `number` && n < i) || (typeof i == `function` && i(n, r));
          if (t || !c) {
            f(r);
            return;
          }
          (n++,
            e.onFail?.(n, r),
            Ze(s)
              .then(() => (l() ? void 0 : p()))
              .then(() => {
                t ? f(r) : m();
              }));
        });
    };
  return {
    promise: i,
    status: () => i.status,
    cancel: o,
    continue: () => (r?.(), i),
    cancelRetry: s,
    continueRetry: c,
    canStart: u,
    start: () => (u() ? m() : p().then(m), i),
  };
}
var _t = class {
  #e;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    (this.clearGcTimeout(),
      Le(this.gcTime) &&
        (this.#e = Me.setTimeout(() => {
          this.optionalRemove();
        }, this.gcTime)));
  }
  updateGcTime(e) {
    this.gcTime = Math.max(this.gcTime || 0, e ?? (at.isServer() ? 1 / 0 : 300 * 1e3));
  }
  clearGcTimeout() {
    this.#e !== void 0 && (Me.clearTimeout(this.#e), (this.#e = void 0));
  }
};
function vt(e) {
  return {
    onFetch: (t, n) => {
      let r = t.options,
        i = t.fetchOptions?.meta?.fetchMore?.direction,
        a = t.state.data?.pages || [],
        o = t.state.data?.pageParams || [],
        s = { pages: [], pageParams: [] },
        c = 0,
        l = async () => {
          let n = !1,
            l = (e) => {
              it(
                e,
                () => t.signal,
                () => (n = !0),
              );
            },
            u = nt(t.options, t.fetchOptions),
            d = async (e, r, i) => {
              if (n) return Promise.reject(t.signal.reason);
              if (r == null && e.pages.length) return Promise.resolve(e);
              let a = await u(
                  (() => {
                    let e = {
                      client: t.client,
                      queryKey: t.queryKey,
                      pageParam: r,
                      direction: i ? `backward` : `forward`,
                      meta: t.options.meta,
                    };
                    return (l(e), e);
                  })(),
                ),
                { maxPages: o } = t.options,
                s = i ? et : $e;
              return { pages: s(e.pages, a, o), pageParams: s(e.pageParams, r, o) };
            };
          if (i && a.length) {
            let e = i === `backward`,
              t = e ? bt : yt,
              n = { pages: a, pageParams: o };
            s = await d(n, t(r, n), e);
          } else {
            let t = e ?? a.length;
            do {
              let e = c === 0 ? (o[0] ?? r.initialPageParam) : yt(r, s);
              if (c > 0 && e == null) break;
              ((s = await d(s, e)), c++);
            } while (c < t);
          }
          return s;
        };
      t.options.persister
        ? (t.fetchFn = () =>
            t.options.persister?.(
              l,
              { client: t.client, queryKey: t.queryKey, meta: t.options.meta, signal: t.signal },
              n,
            ))
        : (t.fetchFn = l);
    },
  };
}
function yt(e, { pages: t, pageParams: n }) {
  let r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function bt(e, { pages: t, pageParams: n }) {
  return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
}
var xt = class extends _t {
  #e;
  #t;
  #n;
  #r;
  #i;
  #a;
  #o;
  #s;
  constructor(e) {
    (super(),
      (this.#s = !1),
      (this.#o = e.defaultOptions),
      this.setOptions(e.options),
      (this.observers = []),
      (this.#i = e.client),
      (this.#r = this.#i.getQueryCache()),
      (this.queryKey = e.queryKey),
      (this.queryHash = e.queryHash),
      (this.#t = wt(this.options)),
      (this.state = e.state ?? this.#t),
      this.scheduleGc());
  }
  get meta() {
    return this.options.meta;
  }
  get queryType() {
    return this.#e;
  }
  get promise() {
    return this.#a?.promise;
  }
  setOptions(e) {
    if (
      ((this.options = { ...this.#o, ...e }),
      e?._type && (this.#e = e._type),
      this.updateGcTime(this.options.gcTime),
      this.state && this.state.data === void 0)
    ) {
      let e = wt(this.options);
      e.data !== void 0 && (this.setState(Ct(e.data, e.dataUpdatedAt)), (this.#t = e));
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === `idle` && this.#r.remove(this);
  }
  setData(e, t) {
    let n = Qe(this.state.data, e, this.options);
    return (
      this.#l({ data: n, type: `success`, dataUpdatedAt: t?.updatedAt, manual: t?.manual }),
      n
    );
  }
  setState(e) {
    this.#l({ type: `setState`, state: e });
  }
  cancel(e) {
    let t = this.#a?.promise;
    return (this.#a?.cancel(e), t ? t.then(Fe).catch(Fe) : Promise.resolve());
  }
  destroy() {
    (super.destroy(), this.cancel({ silent: !0 }));
  }
  get resetState() {
    return this.#t;
  }
  reset() {
    (this.destroy(), this.setState(this.resetState));
  }
  isActive() {
    return this.observers.some((e) => J(e.options.enabled, this) !== !1);
  }
  isDisabled() {
    return this.getObserversCount() > 0
      ? !this.isActive()
      : this.options.queryFn === tt || !this.isFetched();
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  isStatic() {
    return this.getObserversCount() > 0
      ? this.observers.some((e) => ze(e.options.staleTime, this) === `static`)
      : !1;
  }
  isStale() {
    return this.getObserversCount() > 0
      ? this.observers.some((e) => e.getCurrentResult().isStale)
      : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(e = 0) {
    return this.state.data === void 0
      ? !0
      : e === `static`
        ? !1
        : this.state.isInvalidated
          ? !0
          : !Re(this.state.dataUpdatedAt, e);
  }
  onFocus() {
    (this.observers.find((e) => e.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }),
      this.#a?.continue());
  }
  onOnline() {
    (this.observers.find((e) => e.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }),
      this.#a?.continue());
  }
  addObserver(e) {
    this.observers.includes(e) ||
      (this.observers.push(e),
      this.clearGcTimeout(),
      this.#r.notify({ type: `observerAdded`, query: this, observer: e }));
  }
  removeObserver(e) {
    this.observers.includes(e) &&
      ((this.observers = this.observers.filter((t) => t !== e)),
      this.observers.length ||
        (this.#a && (this.#s || this.#c() ? this.#a.cancel({ revert: !0 }) : this.#a.cancelRetry()),
        this.scheduleGc()),
      this.#r.notify({ type: `observerRemoved`, query: this, observer: e }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  #c() {
    return this.state.fetchStatus === `paused` && this.state.status === `pending`;
  }
  invalidate() {
    this.state.isInvalidated || this.#l({ type: `invalidate` });
  }
  async fetch(e, t) {
    if (this.state.fetchStatus !== `idle` && this.#a?.status() !== `rejected`) {
      if (this.state.data !== void 0 && t?.cancelRefetch) this.cancel({ silent: !0 });
      else if (this.#a) return (this.#a.continueRetry(), this.#a.promise);
    }
    if ((e && this.setOptions(e), !this.options.queryFn)) {
      let e = this.observers.find((e) => e.options.queryFn);
      e && this.setOptions(e.options);
    }
    let n = new AbortController(),
      r = (e) => {
        Object.defineProperty(e, "signal", {
          enumerable: !0,
          get: () => ((this.#s = !0), n.signal),
        });
      },
      i = () => {
        let e = nt(this.options, t),
          n = (() => {
            let e = { client: this.#i, queryKey: this.queryKey, meta: this.meta };
            return (r(e), e);
          })();
        return ((this.#s = !1), this.options.persister ? this.options.persister(e, n, this) : e(n));
      },
      a = (() => {
        let e = {
          fetchOptions: t,
          options: this.options,
          queryKey: this.queryKey,
          client: this.#i,
          state: this.state,
          fetchFn: i,
        };
        return (r(e), e);
      })();
    ((this.#e === `infinite` ? vt(this.options.pages) : this.options.behavior)?.onFetch(a, this),
      (this.#n = this.state),
      (this.state.fetchStatus === `idle` || this.state.fetchMeta !== a.fetchOptions?.meta) &&
        this.#l({ type: `fetch`, meta: a.fetchOptions?.meta }),
      (this.#a = gt({
        initialPromise: t?.initialPromise,
        fn: a.fetchFn,
        onCancel: (e) => {
          (e instanceof ht && e.revert && this.setState({ ...this.#n, fetchStatus: `idle` }),
            n.abort());
        },
        onFail: (e, t) => {
          this.#l({ type: `failed`, failureCount: e, error: t });
        },
        onPause: () => {
          this.#l({ type: `pause` });
        },
        onContinue: () => {
          this.#l({ type: `continue` });
        },
        retry: a.options.retry,
        retryDelay: a.options.retryDelay,
        networkMode: a.options.networkMode,
        canRun: () => !0,
      })));
    try {
      let e = await this.#a.start();
      if (e === void 0) throw Error(`${this.queryHash} data is undefined`);
      return (
        this.setData(e),
        this.#r.config.onSuccess?.(e, this),
        this.#r.config.onSettled?.(e, this.state.error, this),
        e
      );
    } catch (e) {
      if (e instanceof ht) {
        if (e.silent) return this.#a.promise;
        if (e.revert) {
          if (this.state.data === void 0) throw e;
          return this.state.data;
        }
      }
      throw (
        this.#l({ type: `error`, error: e }),
        this.#r.config.onError?.(e, this),
        this.#r.config.onSettled?.(this.state.data, e, this),
        e
      );
    } finally {
      this.scheduleGc();
    }
  }
  #l(e) {
    let t = (t) => {
      switch (e.type) {
        case `failed`:
          return { ...t, fetchFailureCount: e.failureCount, fetchFailureReason: e.error };
        case `pause`:
          return { ...t, fetchStatus: `paused` };
        case `continue`:
          return { ...t, fetchStatus: `fetching` };
        case `fetch`:
          return { ...t, ...St(t.data, this.options), fetchMeta: e.meta ?? null };
        case `success`:
          let n = {
            ...t,
            ...Ct(e.data, e.dataUpdatedAt),
            dataUpdateCount: t.dataUpdateCount + 1,
            ...(!e.manual && {
              fetchStatus: `idle`,
              fetchFailureCount: 0,
              fetchFailureReason: null,
            }),
          };
          return ((this.#n = e.manual ? n : void 0), n);
        case `error`:
          let r = e.error;
          return {
            ...t,
            error: r,
            errorUpdateCount: t.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: t.fetchFailureCount + 1,
            fetchFailureReason: r,
            fetchStatus: `idle`,
            status: `error`,
            isInvalidated: !0,
          };
        case `invalidate`:
          return { ...t, isInvalidated: !0 };
        case `setState`:
          return { ...t, ...e.state };
      }
    };
    ((this.state = t(this.state)),
      ct.batch(() => {
        (this.observers.forEach((e) => {
          e.onQueryUpdate();
        }),
          this.#r.notify({ query: this, type: `updated`, action: e }));
      }));
  }
};
function St(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: mt(t.networkMode) ? `fetching` : `paused`,
    ...(e === void 0 && { error: null, status: `pending` }),
  };
}
function Ct(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: `success`,
  };
}
function wt(e) {
  let t = typeof e.initialData == `function` ? e.initialData() : e.initialData,
    n = t !== void 0,
    r = n
      ? typeof e.initialDataUpdatedAt == `function`
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? (r ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? `success` : `pending`,
    fetchStatus: `idle`,
  };
}
var Tt = class extends lt {
  constructor(e, t) {
    (super(),
      (this.options = t),
      (this.#e = e),
      (this.#s = null),
      (this.#o = ft()),
      this.bindMethods(),
      this.setOptions(t));
  }
  #e;
  #t = void 0;
  #n = void 0;
  #r = void 0;
  #i;
  #a;
  #o;
  #s;
  #c;
  #l;
  #u;
  #d;
  #f;
  #p;
  #m = new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#t.addObserver(this),
      Dt(this.#t, this.options) ? this.#h() : this.updateResult(),
      this.#y());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Ot(this.#t, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return Ot(this.#t, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()), this.#b(), this.#x(), this.#t.removeObserver(this));
  }
  setOptions(e) {
    let t = this.options,
      n = this.#t;
    if (
      ((this.options = this.#e.defaultQueryOptions(e)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != `boolean` &&
        typeof this.options.enabled != `function` &&
        typeof J(this.options.enabled, this.#t) != `boolean`)
    )
      throw Error(`Expected enabled to be a boolean or a callback that returns a boolean`);
    (this.#S(),
      this.#t.setOptions(this.options),
      t._defaulted &&
        !qe(this.options, t) &&
        this.#e
          .getQueryCache()
          .notify({ type: `observerOptionsUpdated`, query: this.#t, observer: this }));
    let r = this.hasListeners();
    (r && kt(this.#t, n, this.options, t) && this.#h(),
      this.updateResult(),
      r &&
        (this.#t !== n ||
          J(this.options.enabled, this.#t) !== J(t.enabled, this.#t) ||
          ze(this.options.staleTime, this.#t) !== ze(t.staleTime, this.#t)) &&
        this.#g());
    let i = this.#_();
    r &&
      (this.#t !== n ||
        J(this.options.enabled, this.#t) !== J(t.enabled, this.#t) ||
        i !== this.#p) &&
      this.#v(i);
  }
  getOptimisticResult(e) {
    let t = this.#e.getQueryCache().build(this.#e, e),
      n = this.createResult(t, e);
    return (jt(this, n) && ((this.#r = n), (this.#a = this.options), (this.#i = this.#t.state)), n);
  }
  getCurrentResult() {
    return this.#r;
  }
  trackResult(e, t) {
    return new Proxy(e, {
      get: (e, n) => (
        this.trackProp(n),
        t?.(n),
        n === `promise` &&
          (this.trackProp(`data`),
          !this.options.experimental_prefetchInRender &&
            this.#o.status === `pending` &&
            this.#o.reject(Error(`experimental_prefetchInRender feature flag is not enabled`))),
        Reflect.get(e, n)
      ),
    });
  }
  trackProp(e) {
    this.#m.add(e);
  }
  getCurrentQuery() {
    return this.#t;
  }
  refetch({ ...e } = {}) {
    return this.fetch({ ...e });
  }
  fetchOptimistic(e) {
    let t = this.#e.defaultQueryOptions(e),
      n = this.#e.getQueryCache().build(this.#e, t);
    return n.fetch().then(() => this.createResult(n, t));
  }
  fetch(e) {
    return this.#h({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#r),
    );
  }
  #h(e) {
    this.#S();
    let t = this.#t.fetch(this.options, e);
    return (e?.throwOnError || (t = t.catch(Fe)), t);
  }
  #g() {
    this.#b();
    let e = ze(this.options.staleTime, this.#t);
    if (at.isServer() || this.#r.isStale || !Le(e)) return;
    let t = Re(this.#r.dataUpdatedAt, e) + 1;
    this.#d = Me.setTimeout(() => {
      this.#r.isStale || this.updateResult();
    }, t);
  }
  #_() {
    return (
      (typeof this.options.refetchInterval == `function`
        ? this.options.refetchInterval(this.#t)
        : this.options.refetchInterval) ?? !1
    );
  }
  #v(e) {
    (this.#x(),
      (this.#p = e),
      !(
        at.isServer() ||
        J(this.options.enabled, this.#t) === !1 ||
        !Le(this.#p) ||
        this.#p === 0
      ) &&
        (this.#f = Me.setInterval(() => {
          (this.options.refetchIntervalInBackground || ut.isFocused()) && this.#h();
        }, this.#p)));
  }
  #y() {
    (this.#g(), this.#v(this.#_()));
  }
  #b() {
    this.#d !== void 0 && (Me.clearTimeout(this.#d), (this.#d = void 0));
  }
  #x() {
    this.#f !== void 0 && (Me.clearInterval(this.#f), (this.#f = void 0));
  }
  createResult(e, t) {
    let n = this.#t,
      r = this.options,
      i = this.#r,
      a = this.#i,
      o = this.#a,
      s = e === n ? this.#n : e.state,
      { state: c } = e,
      l = { ...c },
      u = !1,
      d;
    if (t._optimisticResults) {
      let i = this.hasListeners(),
        a = !i && Dt(e, t),
        o = i && kt(e, n, t, r);
      ((a || o) && (l = { ...l, ...St(c.data, e.options) }),
        t._optimisticResults === `isRestoring` && (l.fetchStatus = `idle`));
    }
    let { error: f, errorUpdatedAt: p, status: m } = l;
    d = l.data;
    let h = !1;
    if (t.placeholderData !== void 0 && d === void 0 && m === `pending`) {
      let e;
      (i?.isPlaceholderData && t.placeholderData === o?.placeholderData
        ? ((e = i.data), (h = !0))
        : (e =
            typeof t.placeholderData == `function`
              ? t.placeholderData(this.#u?.state.data, this.#u)
              : t.placeholderData),
        e !== void 0 && ((m = `success`), (d = Qe(i?.data, e, t)), (u = !0)));
    }
    if (t.select && d !== void 0 && !h)
      if (i && d === a?.data && t.select === this.#c) d = this.#l;
      else
        try {
          ((this.#c = t.select),
            (d = t.select(d)),
            (d = Qe(i?.data, d, t)),
            (this.#l = d),
            (this.#s = null));
        } catch (e) {
          this.#s = e;
        }
    this.#s && ((f = this.#s), (d = this.#l), (p = Date.now()), (m = `error`));
    let g = l.fetchStatus === `fetching`,
      _ = m === `pending`,
      v = m === `error`,
      y = _ && g,
      b = d !== void 0,
      x = {
        status: m,
        fetchStatus: l.fetchStatus,
        isPending: _,
        isSuccess: m === `success`,
        isError: v,
        isInitialLoading: y,
        isLoading: y,
        data: d,
        dataUpdatedAt: l.dataUpdatedAt,
        error: f,
        errorUpdatedAt: p,
        failureCount: l.fetchFailureCount,
        failureReason: l.fetchFailureReason,
        errorUpdateCount: l.errorUpdateCount,
        isFetched: e.isFetched(),
        isFetchedAfterMount:
          l.dataUpdateCount > s.dataUpdateCount || l.errorUpdateCount > s.errorUpdateCount,
        isFetching: g,
        isRefetching: g && !_,
        isLoadingError: v && !b,
        isPaused: l.fetchStatus === `paused`,
        isPlaceholderData: u,
        isRefetchError: v && b,
        isStale: At(e, t),
        refetch: this.refetch,
        promise: this.#o,
        isEnabled: J(t.enabled, e) !== !1,
      };
    if (this.options.experimental_prefetchInRender) {
      let t = x.data !== void 0,
        r = x.status === `error` && !t,
        i = (e) => {
          r ? e.reject(x.error) : t && e.resolve(x.data);
        },
        a = () => {
          i((this.#o = x.promise = ft()));
        },
        o = this.#o;
      switch (o.status) {
        case `pending`:
          e.queryHash === n.queryHash && i(o);
          break;
        case `fulfilled`:
          (r || x.data !== o.value) && a();
          break;
        case `rejected`:
          (!r || x.error !== o.reason) && a();
          break;
      }
    }
    return x;
  }
  updateResult() {
    let e = this.#r,
      t = this.createResult(this.#t, this.options);
    ((this.#i = this.#t.state),
      (this.#a = this.options),
      this.#i.data !== void 0 && (this.#u = this.#t),
      !qe(t, e) &&
        ((this.#r = t),
        this.#C({
          listeners: (() => {
            if (!e) return !0;
            let { notifyOnChangeProps: t } = this.options,
              n = typeof t == `function` ? t() : t;
            if (n === `all` || (!n && !this.#m.size)) return !0;
            let r = new Set(n ?? this.#m);
            return (
              this.options.throwOnError && r.add(`error`),
              Object.keys(this.#r).some((t) => {
                let n = t;
                return this.#r[n] !== e[n] && r.has(n);
              })
            );
          })(),
        })));
  }
  #S() {
    let e = this.#e.getQueryCache().build(this.#e, this.options);
    if (e === this.#t) return;
    let t = this.#t;
    ((this.#t = e),
      (this.#n = e.state),
      this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#y());
  }
  #C(e) {
    ct.batch(() => {
      (e.listeners &&
        this.listeners.forEach((e) => {
          e(this.#r);
        }),
        this.#e.getQueryCache().notify({ query: this.#t, type: `observerResultsUpdated` }));
    });
  }
};
function Et(e, t) {
  return (
    J(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === `error` && J(t.retryOnMount, e) === !1)
  );
}
function Dt(e, t) {
  return Et(e, t) || (e.state.data !== void 0 && Ot(e, t, t.refetchOnMount));
}
function Ot(e, t, n) {
  if (J(t.enabled, e) !== !1 && ze(t.staleTime, e) !== `static`) {
    let r = typeof n == `function` ? n(e) : n;
    return r === `always` || (r !== !1 && At(e, t));
  }
  return !1;
}
function kt(e, t, n, r) {
  return (
    (e !== t || J(r.enabled, e) === !1) && (!n.suspense || e.state.status !== `error`) && At(e, n)
  );
}
function At(e, t) {
  return J(t.enabled, e) !== !1 && e.isStaleByTime(ze(t.staleTime, e));
}
function jt(e, t) {
  return !qe(e.getCurrentResult(), t);
}
var Mt = o((e) => {
    var t = Symbol.for(`react.transitional.element`),
      n = Symbol.for(`react.fragment`);
    function r(e, n, r) {
      var i = null;
      if ((r !== void 0 && (i = `` + r), n.key !== void 0 && (i = `` + n.key), `key` in n))
        for (var a in ((r = {}), n)) a !== `key` && (r[a] = n[a]);
      else r = n;
      return (
        (n = r.ref),
        { $$typeof: t, type: e, key: i, ref: n === void 0 ? null : n, props: r }
      );
    }
    ((e.Fragment = n), (e.jsx = r), (e.jsxs = r));
  }),
  Nt = o((e, t) => {
    t.exports = Mt();
  }),
  Y = c(u(), 1),
  Pt = Nt(),
  Ft = Y.createContext(void 0),
  It = (e) => {
    let t = Y.useContext(Ft);
    if (e) return e;
    if (!t) throw Error(`No QueryClient set, use QueryClientProvider to set one`);
    return t;
  },
  Lt = ({ client: e, children: t }) => (
    Y.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    (0, Pt.jsx)(Ft.Provider, { value: e, children: t })
  );
function Rt() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var zt = Y.createContext(Rt()),
  Bt = () => Y.useContext(zt),
  Vt = (e, t, n) => {
    let r =
      n?.state.error && typeof e.throwOnError == `function`
        ? rt(e.throwOnError, [n.state.error, n])
        : e.throwOnError;
    (e.suspense || e.experimental_prefetchInRender || r) && (t.isReset() || (e.retryOnMount = !1));
  },
  Ht = (e) => {
    Y.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  Ut = ({ result: e, errorResetBoundary: t, throwOnError: n, query: r, suspense: i }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    r &&
    ((i && e.data === void 0) || rt(n, [e.error, r])),
  Wt = Y.createContext(!1),
  Gt = () => Y.useContext(Wt);
Wt.Provider;
var Kt = (e) => {
    if (e.suspense) {
      let t = 1e3,
        n = (e) => (e === `static` ? e : Math.max(e ?? t, t)),
        r = e.staleTime;
      ((e.staleTime = typeof r == `function` ? (...e) => n(r(...e)) : n(r)),
        typeof e.gcTime == `number` && (e.gcTime = Math.max(e.gcTime, t)));
    }
  },
  qt = (e, t) => e.isLoading && e.isFetching && !t,
  Jt = (e, t) => e?.suspense && t.isPending,
  Yt = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function Xt(e, t, n) {
  let r = Gt(),
    i = Bt(),
    a = It(n),
    o = a.defaultQueryOptions(e);
  a.getDefaultOptions().queries?._experimental_beforeQuery?.(o);
  let s = a.getQueryCache().get(o.queryHash),
    c = e.subscribed !== !1;
  ((o._optimisticResults = r ? `isRestoring` : c ? `optimistic` : void 0),
    Kt(o),
    Vt(o, i, s),
    Ht(i));
  let l = !a.getQueryCache().get(o.queryHash),
    [u] = Y.useState(() => new t(a, o)),
    d = u.getOptimisticResult(o),
    f = !r && c;
  if (
    (Y.useSyncExternalStore(
      Y.useCallback(
        (e) => {
          let t = f ? u.subscribe(ct.batchCalls(e)) : Fe;
          return (u.updateResult(), t);
        },
        [u, f],
      ),
      () => u.getCurrentResult(),
      () => u.getCurrentResult(),
    ),
    Y.useEffect(() => {
      u.setOptions(o);
    }, [o, u]),
    Jt(o, d))
  )
    throw Yt(o, u, i);
  if (
    Ut({
      result: d,
      errorResetBoundary: i,
      throwOnError: o.throwOnError,
      query: s,
      suspense: o.suspense,
    })
  )
    throw d.error;
  return (
    a.getDefaultOptions().queries?._experimental_afterQuery?.(o, d),
    o.experimental_prefetchInRender &&
      !at.isServer() &&
      qt(d, r) &&
      (l ? Yt(o, u, i) : s?.promise)?.catch(Fe).finally(() => {
        u.updateResult();
      }),
    o.notifyOnChangeProps ? d : u.trackResult(d)
  );
}
function Zt(e, t) {
  return Xt(e, Tt, t);
}
var Qt = Y.use,
  $t = typeof window < `u` ? Y.useLayoutEffect : Y.useEffect;
function en(e) {
  let t = Y.useRef({ value: e, prev: null }),
    n = t.current.value;
  return (e !== n && (t.current = { value: e, prev: n }), t.current.prev);
}
function tn(e, t, n = {}, r = {}) {
  Y.useEffect(() => {
    if (!e.current || r.disabled || typeof IntersectionObserver != `function`) return;
    let i = new IntersectionObserver(([e]) => {
      t(e);
    }, n);
    return (
      i.observe(e.current),
      () => {
        i.disconnect();
      }
    );
  }, [t, n, r.disabled, e]);
}
function nn(e) {
  let t = Y.useRef(null);
  return (Y.useImperativeHandle(e, () => t.current, []), t);
}
var rn = Y.createContext(null);
function an(e) {
  return Y.useContext(rn);
}
function on(e) {
  let t = an();
  return Y.useCallback((n) => t.navigate({ ...n, from: n.from ?? e?.from }), [e?.from, t]);
}
function sn({ children: e, fallback: t = null }) {
  return cn() ? (0, Pt.jsx)(Y.Fragment, { children: e }) : (0, Pt.jsx)(Y.Fragment, { children: t });
}
function cn() {
  return Y.useSyncExternalStore(
    ln,
    () => !0,
    () => !1,
  );
}
function ln() {
  return () => {};
}
var un = o((e) => {
    var t = u();
    function n(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var r = typeof Object.is == `function` ? Object.is : n,
      i = t.useState,
      a = t.useEffect,
      o = t.useLayoutEffect,
      s = t.useDebugValue;
    function c(e, t) {
      var n = t(),
        r = i({ inst: { value: n, getSnapshot: t } }),
        c = r[0].inst,
        u = r[1];
      return (
        o(
          function () {
            ((c.value = n), (c.getSnapshot = t), l(c) && u({ inst: c }));
          },
          [e, n, t],
        ),
        a(
          function () {
            return (
              l(c) && u({ inst: c }),
              e(function () {
                l(c) && u({ inst: c });
              })
            );
          },
          [e],
        ),
        s(n),
        n
      );
    }
    function l(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !r(e, n);
      } catch {
        return !0;
      }
    }
    function d(e, t) {
      return t();
    }
    var f =
      typeof window > `u` || window.document === void 0 || window.document.createElement === void 0
        ? d
        : c;
    e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? f : t.useSyncExternalStore;
  }),
  dn = o((e, t) => {
    t.exports = un();
  }),
  fn = o((e) => {
    var t = u(),
      n = dn();
    function r(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var i = typeof Object.is == `function` ? Object.is : r,
      a = n.useSyncExternalStore,
      o = t.useRef,
      s = t.useEffect,
      c = t.useMemo,
      l = t.useDebugValue;
    e.useSyncExternalStoreWithSelector = function (e, t, n, r, u) {
      var d = o(null);
      if (d.current === null) {
        var f = { hasValue: !1, value: null };
        d.current = f;
      } else f = d.current;
      d = c(
        function () {
          function e(e) {
            if (!a) {
              if (((a = !0), (o = e), (e = r(e)), u !== void 0 && f.hasValue)) {
                var t = f.value;
                if (u(t, e)) return (s = t);
              }
              return (s = e);
            }
            if (((t = s), i(o, e))) return t;
            var n = r(e);
            return u !== void 0 && u(t, n) ? ((o = e), t) : ((o = e), (s = n));
          }
          var a = !1,
            o,
            s,
            c = n === void 0 ? null : n;
          return [
            function () {
              return e(t());
            },
            c === null
              ? void 0
              : function () {
                  return e(c());
                },
          ];
        },
        [t, n, r, u],
      );
      var p = a(e, d[0], d[1]);
      return (
        s(
          function () {
            ((f.hasValue = !0), (f.value = p));
          },
          [p],
        ),
        l(p),
        p
      );
    };
  }),
  pn = o((e, t) => {
    t.exports = fn();
  })();
function mn(e, t) {
  return e === t;
}
function hn(e, t, n = mn) {
  let r = (0, Y.useCallback)(
      (t) => {
        if (!e) return () => {};
        let { unsubscribe: n } = e.subscribe(t);
        return n;
      },
      [e],
    ),
    i = (0, Y.useCallback)(() => e?.get(), [e]);
  return (0, pn.useSyncExternalStoreWithSelector)(r, i, i, t, n);
}
var gn = c(f(), 1);
function _n(e, t) {
  let n = an(),
    r = nn(t),
    {
      activeProps: i,
      inactiveProps: a,
      activeOptions: o,
      to: s,
      preload: c,
      preloadDelay: l,
      preloadIntentProximity: u,
      hashScrollIntoView: d,
      replace: f,
      startTransition: p,
      resetScroll: m,
      viewTransition: g,
      children: _,
      target: v,
      disabled: y,
      style: b,
      className: x,
      onClick: S,
      onBlur: C,
      onFocus: w,
      onMouseEnter: T,
      onMouseLeave: D,
      onTouchStart: O,
      ignoreBlocker: ee,
      params: k,
      search: te,
      hash: A,
      state: ne,
      mask: M,
      reloadDocument: N,
      unsafeRelative: re,
      from: ie,
      _fromLocation: ae,
      ...oe
    } = e,
    P = cn(),
    F = Y.useMemo(
      () => e,
      [
        n,
        e.from,
        e._fromLocation,
        e.hash,
        e.to,
        e.search,
        e.params,
        e.state,
        e.mask,
        e.unsafeRelative,
      ],
    ),
    I = hn(
      n.stores.location,
      (e) => e,
      (e, t) => e.href === t.href,
    ),
    L = Y.useMemo(() => {
      let e = { _fromLocation: I, ...F };
      return n.buildLocation(e);
    }, [n, I, F]),
    se = L.maskedLocation ? L.maskedLocation.publicHref : L.publicHref,
    R = L.maskedLocation ? L.maskedLocation.external : L.external,
    z = Y.useMemo(() => En(se, R, n.history, y), [y, R, se, n.history]),
    B = Y.useMemo(() => {
      if (z?.external) return j(z.href, n.protocolAllowlist) ? void 0 : z.href;
      if (!Dn(s) && !(typeof s != `string` || s.indexOf(`:`) === -1))
        try {
          return (new URL(s), j(s, n.protocolAllowlist) ? void 0 : s);
        } catch {}
    }, [s, z, n.protocolAllowlist]),
    V = Y.useMemo(() => {
      if (B) return !1;
      if (o?.exact) {
        if (!we(I.pathname, L.pathname, n.basepath)) return !1;
      } else {
        let e = Ce(I.pathname, n.basepath),
          t = Ce(L.pathname, n.basepath);
        if (!(e.startsWith(t) && (e.length === t.length || e[t.length] === `/`))) return !1;
      }
      return (o?.includeSearch ?? !0) &&
        !E(I.search, L.search, { partial: !o?.exact, ignoreUndefined: !o?.explicitUndefined })
        ? !1
        : o?.includeHash
          ? P && I.hash === L.hash
          : !0;
    }, [
      o?.exact,
      o?.explicitUndefined,
      o?.includeHash,
      o?.includeSearch,
      I,
      B,
      P,
      L.hash,
      L.pathname,
      L.search,
      n.basepath,
    ]),
    H = V ? (h(i, {}) ?? yn) : vn,
    ce = V ? vn : (h(a, {}) ?? vn),
    le = [x, H.className, ce.className].filter(Boolean).join(` `),
    ue = (b || H.style || ce.style) && { ...b, ...H.style, ...ce.style },
    [de, fe] = Y.useState(!1),
    pe = Y.useRef(!1),
    U = e.reloadDocument || B ? !1 : (c ?? n.options.defaultPreload),
    W = l ?? n.options.defaultPreloadDelay ?? 0,
    G = Y.useCallback(() => {
      n.preloadRoute({ ...F, _builtLocation: L }).catch((e) => {
        (console.warn(e), console.warn(Ae));
      });
    }, [n, F, L]);
  (tn(
    r,
    Y.useCallback(
      (e) => {
        e?.isIntersecting && G();
      },
      [G],
    ),
    wn,
    { disabled: !!y || U !== `viewport` },
  ),
    Y.useEffect(() => {
      pe.current || (!y && U === `render` && (G(), (pe.current = !0)));
    }, [y, G, U]));
  let me = (e) => {
    let t = e.currentTarget.getAttribute(`target`),
      r = v === void 0 ? t : v;
    if (!y && !kn(e) && !e.defaultPrevented && (!r || r === `_self`) && e.button === 0) {
      (e.preventDefault(),
        (0, gn.flushSync)(() => {
          fe(!0);
        }));
      let t = n.subscribe(`onResolved`, () => {
        (t(), fe(!1));
      });
      n.navigate({
        ...F,
        replace: f,
        resetScroll: m,
        hashScrollIntoView: d,
        startTransition: p,
        viewTransition: g,
        ignoreBlocker: ee,
      });
    }
  };
  if (B)
    return {
      ...oe,
      ref: r,
      href: B,
      ...(_ && { children: _ }),
      ...(v && { target: v }),
      ...(y && { disabled: y }),
      ...(b && { style: b }),
      ...(x && { className: x }),
      ...(S && { onClick: S }),
      ...(C && { onBlur: C }),
      ...(w && { onFocus: w }),
      ...(T && { onMouseEnter: T }),
      ...(D && { onMouseLeave: D }),
      ...(O && { onTouchStart: O }),
    };
  let he = (e) => {
      if (y || U !== `intent`) return;
      if (!W) {
        G();
        return;
      }
      let t = e.currentTarget;
      if (Cn.has(t)) return;
      let n = setTimeout(() => {
        (Cn.delete(t), G());
      }, W);
      Cn.set(t, n);
    },
    K = (e) => {
      y || U !== `intent` || G();
    },
    ge = (e) => {
      if (y || !U || !W) return;
      let t = e.currentTarget,
        n = Cn.get(t);
      n && (clearTimeout(n), Cn.delete(t));
    };
  return {
    ...oe,
    ...H,
    ...ce,
    href: z?.href,
    ref: r,
    onClick: Tn([S, me]),
    onBlur: Tn([C, ge]),
    onFocus: Tn([w, he]),
    onMouseEnter: Tn([T, he]),
    onMouseLeave: Tn([D, ge]),
    onTouchStart: Tn([O, K]),
    disabled: !!y,
    target: v,
    ...(ue && { style: ue }),
    ...(le && { className: le }),
    ...(y && bn),
    ...(V && xn),
    ...(P && de && Sn),
  };
}
var vn = {},
  yn = { className: `active` },
  bn = { role: `link`, "aria-disabled": !0 },
  xn = { "data-status": `active`, "aria-current": `page` },
  Sn = { "data-transitioning": `transitioning` },
  Cn = new WeakMap(),
  wn = { rootMargin: `100px` },
  Tn = (e) => (t) => {
    for (let n of e)
      if (n) {
        if (t.defaultPrevented) return;
        n(t);
      }
  };
function En(e, t, n, r) {
  if (!r) return t ? { href: e, external: !0 } : { href: n.createHref(e) || `/`, external: !1 };
}
function Dn(e) {
  if (typeof e != `string`) return !1;
  let t = e.charCodeAt(0);
  return t === 47 ? e.charCodeAt(1) !== 47 : t === 46;
}
var On = Y.forwardRef((e, t) => {
  let { _asChild: n, ...r } = e,
    { type: i, ...a } = _n(r, t),
    o =
      typeof r.children == `function`
        ? r.children({ isActive: a[`data-status`] === `active` })
        : r.children;
  if (!n) {
    let { disabled: e, ...t } = a;
    return Y.createElement(`a`, t, o);
  }
  return Y.createElement(n, a, o);
});
function kn(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function An(e) {
  if (!e || typeof document > `u`) return;
  let t = document.head || document.getElementsByTagName(`head`)[0],
    n = document.createElement(`style`);
  ((n.type = `text/css`),
    t.appendChild(n),
    n.styleSheet ? (n.styleSheet.cssText = e) : n.appendChild(document.createTextNode(e)));
}
var jn = (e) => {
    switch (e) {
      case `success`:
        return Pn;
      case `info`:
        return In;
      case `warning`:
        return Fn;
      case `error`:
        return Ln;
      default:
        return null;
    }
  },
  Mn = Array(12).fill(0),
  Nn = ({ visible: e, className: t }) =>
    Y.createElement(
      `div`,
      { className: [`sonner-loading-wrapper`, t].filter(Boolean).join(` `), "data-visible": e },
      Y.createElement(
        `div`,
        { className: `sonner-spinner` },
        Mn.map((e, t) =>
          Y.createElement(`div`, { className: `sonner-loading-bar`, key: `spinner-bar-${t}` }),
        ),
      ),
    ),
  Pn = Y.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
    },
    Y.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z`,
      clipRule: `evenodd`,
    }),
  ),
  Fn = Y.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 24 24`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
    },
    Y.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z`,
      clipRule: `evenodd`,
    }),
  ),
  In = Y.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
    },
    Y.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z`,
      clipRule: `evenodd`,
    }),
  ),
  Ln = Y.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
    },
    Y.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z`,
      clipRule: `evenodd`,
    }),
  ),
  Rn = Y.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      width: `12`,
      height: `12`,
      viewBox: `0 0 24 24`,
      fill: `none`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
    },
    Y.createElement(`line`, { x1: `18`, y1: `6`, x2: `6`, y2: `18` }),
    Y.createElement(`line`, { x1: `6`, y1: `6`, x2: `18`, y2: `18` }),
  ),
  zn = () => {
    let [e, t] = Y.useState(document.hidden);
    return (
      Y.useEffect(() => {
        let e = () => {
          t(document.hidden);
        };
        return (
          document.addEventListener(`visibilitychange`, e),
          () => window.removeEventListener(`visibilitychange`, e)
        );
      }, []),
      e
    );
  },
  Bn = 1,
  X = new (class {
    constructor() {
      ((this.subscribe = (e) => (
        this.subscribers.push(e),
        () => {
          let t = this.subscribers.indexOf(e);
          this.subscribers.splice(t, 1);
        }
      )),
        (this.publish = (e) => {
          this.subscribers.forEach((t) => t(e));
        }),
        (this.addToast = (e) => {
          (this.publish(e), (this.toasts = [...this.toasts, e]));
        }),
        (this.create = (e) => {
          let { message: t, ...n } = e,
            r = typeof e?.id == `number` || e.id?.length > 0 ? e.id : Bn++,
            i = this.toasts.find((e) => e.id === r),
            a = e.dismissible === void 0 ? !0 : e.dismissible;
          return (
            this.dismissedToasts.has(r) && this.dismissedToasts.delete(r),
            i
              ? (this.toasts = this.toasts.map((n) =>
                  n.id === r
                    ? (this.publish({ ...n, ...e, id: r, title: t }),
                      { ...n, ...e, id: r, dismissible: a, title: t })
                    : n,
                ))
              : this.addToast({ title: t, ...n, dismissible: a, id: r }),
            r
          );
        }),
        (this.dismiss = (e) => (
          e
            ? (this.dismissedToasts.add(e),
              requestAnimationFrame(() =>
                this.subscribers.forEach((t) => t({ id: e, dismiss: !0 })),
              ))
            : this.toasts.forEach((e) => {
                this.subscribers.forEach((t) => t({ id: e.id, dismiss: !0 }));
              }),
          e
        )),
        (this.message = (e, t) => this.create({ ...t, message: e })),
        (this.error = (e, t) => this.create({ ...t, message: e, type: `error` })),
        (this.success = (e, t) => this.create({ ...t, type: `success`, message: e })),
        (this.info = (e, t) => this.create({ ...t, type: `info`, message: e })),
        (this.warning = (e, t) => this.create({ ...t, type: `warning`, message: e })),
        (this.loading = (e, t) => this.create({ ...t, type: `loading`, message: e })),
        (this.promise = (e, t) => {
          if (!t) return;
          let n;
          t.loading !== void 0 &&
            (n = this.create({
              ...t,
              promise: e,
              type: `loading`,
              message: t.loading,
              description: typeof t.description == `function` ? void 0 : t.description,
            }));
          let r = Promise.resolve(e instanceof Function ? e() : e),
            i = n !== void 0,
            a,
            o = r
              .then(async (e) => {
                if (((a = [`resolve`, e]), Y.isValidElement(e)))
                  ((i = !1), this.create({ id: n, type: `default`, message: e }));
                else if (Hn(e) && !e.ok) {
                  i = !1;
                  let r =
                      typeof t.error == `function`
                        ? await t.error(`HTTP error! status: ${e.status}`)
                        : t.error,
                    a =
                      typeof t.description == `function`
                        ? await t.description(`HTTP error! status: ${e.status}`)
                        : t.description,
                    o = typeof r == `object` && !Y.isValidElement(r) ? r : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...o });
                } else if (e instanceof Error) {
                  i = !1;
                  let r = typeof t.error == `function` ? await t.error(e) : t.error,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !Y.isValidElement(r) ? r : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...o });
                } else if (t.success !== void 0) {
                  i = !1;
                  let r = typeof t.success == `function` ? await t.success(e) : t.success,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !Y.isValidElement(r) ? r : { message: r };
                  this.create({ id: n, type: `success`, description: a, ...o });
                }
              })
              .catch(async (e) => {
                if (((a = [`reject`, e]), t.error !== void 0)) {
                  i = !1;
                  let r = typeof t.error == `function` ? await t.error(e) : t.error,
                    a = typeof t.description == `function` ? await t.description(e) : t.description,
                    o = typeof r == `object` && !Y.isValidElement(r) ? r : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...o });
                }
              })
              .finally(() => {
                (i && (this.dismiss(n), (n = void 0)), t.finally == null || t.finally.call(t));
              }),
            s = () =>
              new Promise((e, t) => o.then(() => (a[0] === `reject` ? t(a[1]) : e(a[1]))).catch(t));
          return typeof n != `string` && typeof n != `number`
            ? { unwrap: s }
            : Object.assign(n, { unwrap: s });
        }),
        (this.custom = (e, t) => {
          let n = t?.id || Bn++;
          return (this.create({ jsx: e(n), id: n, ...t }), n);
        }),
        (this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id))),
        (this.subscribers = []),
        (this.toasts = []),
        (this.dismissedToasts = new Set()));
    }
  })(),
  Vn = (e, t) => {
    let n = t?.id || Bn++;
    return (X.addToast({ title: e, ...t, id: n }), n);
  },
  Hn = (e) =>
    e &&
    typeof e == `object` &&
    `ok` in e &&
    typeof e.ok == `boolean` &&
    `status` in e &&
    typeof e.status == `number`,
  Un = Object.assign(
    Vn,
    {
      success: X.success,
      info: X.info,
      warning: X.warning,
      error: X.error,
      custom: X.custom,
      message: X.message,
      promise: X.promise,
      dismiss: X.dismiss,
      loading: X.loading,
    },
    { getHistory: () => X.toasts, getToasts: () => X.getActiveToasts() },
  );
An(
  `[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}`,
);
function Wn(e) {
  return e.label !== void 0;
}
var Gn = 3,
  Kn = `24px`,
  qn = `16px`,
  Jn = 4e3,
  Yn = 356,
  Xn = 14,
  Zn = 45,
  Qn = 200;
function Z(...e) {
  return e.filter(Boolean).join(` `);
}
function $n(e) {
  let [t, n] = e.split(`-`),
    r = [];
  return (t && r.push(t), n && r.push(n), r);
}
var er = (e) => {
  let {
      invert: t,
      toast: n,
      unstyled: r,
      interacting: i,
      setHeights: a,
      visibleToasts: o,
      heights: s,
      index: c,
      toasts: l,
      expanded: u,
      removeToast: d,
      defaultRichColors: f,
      closeButton: p,
      style: m,
      cancelButtonStyle: h,
      actionButtonStyle: g,
      className: _ = ``,
      descriptionClassName: v = ``,
      duration: y,
      position: b,
      gap: x,
      expandByDefault: S,
      classNames: C,
      icons: w,
      closeButtonAriaLabel: T = `Close toast`,
    } = e,
    [E, D] = Y.useState(null),
    [O, ee] = Y.useState(null),
    [k, te] = Y.useState(!1),
    [A, j] = Y.useState(!1),
    [ne, M] = Y.useState(!1),
    [N, re] = Y.useState(!1),
    [ie, ae] = Y.useState(!1),
    [oe, P] = Y.useState(0),
    [F, I] = Y.useState(0),
    L = Y.useRef(n.duration || y || Jn),
    se = Y.useRef(null),
    R = Y.useRef(null),
    z = c === 0,
    B = c + 1 <= o,
    V = n.type,
    H = n.dismissible !== !1,
    ce = n.className || ``,
    le = n.descriptionClassName || ``,
    ue = Y.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]),
    de = Y.useMemo(() => n.closeButton ?? p, [n.closeButton, p]),
    fe = Y.useMemo(() => n.duration || y || Jn, [n.duration, y]),
    pe = Y.useRef(0),
    U = Y.useRef(0),
    W = Y.useRef(0),
    G = Y.useRef(null),
    [me, he] = b.split(`-`),
    K = Y.useMemo(() => s.reduce((e, t, n) => (n >= ue ? e : e + t.height), 0), [s, ue]),
    ge = zn(),
    _e = n.invert || t,
    ve = V === `loading`;
  ((U.current = Y.useMemo(() => ue * x + K, [ue, K])),
    Y.useEffect(() => {
      L.current = fe;
    }, [fe]),
    Y.useEffect(() => {
      te(!0);
    }, []),
    Y.useEffect(() => {
      let e = R.current;
      if (e) {
        let t = e.getBoundingClientRect().height;
        return (
          I(t),
          a((e) => [{ toastId: n.id, height: t, position: n.position }, ...e]),
          () => a((e) => e.filter((e) => e.toastId !== n.id))
        );
      }
    }, [a, n.id]),
    Y.useLayoutEffect(() => {
      if (!k) return;
      let e = R.current,
        t = e.style.height;
      e.style.height = `auto`;
      let r = e.getBoundingClientRect().height;
      ((e.style.height = t),
        I(r),
        a((e) =>
          e.find((e) => e.toastId === n.id)
            ? e.map((e) => (e.toastId === n.id ? { ...e, height: r } : e))
            : [{ toastId: n.id, height: r, position: n.position }, ...e],
        ));
    }, [k, n.title, n.description, a, n.id, n.jsx, n.action, n.cancel]));
  let q = Y.useCallback(() => {
    (j(!0),
      P(U.current),
      a((e) => e.filter((e) => e.toastId !== n.id)),
      setTimeout(() => {
        d(n);
      }, Qn));
  }, [n, d, a, U]);
  (Y.useEffect(() => {
    if ((n.promise && V === `loading`) || n.duration === 1 / 0 || n.type === `loading`) return;
    let e;
    return (
      u || i || ge
        ? (() => {
            if (W.current < pe.current) {
              let e = new Date().getTime() - pe.current;
              L.current -= e;
            }
            W.current = new Date().getTime();
          })()
        : L.current !== 1 / 0 &&
          ((pe.current = new Date().getTime()),
          (e = setTimeout(() => {
            (n.onAutoClose == null || n.onAutoClose.call(n, n), q());
          }, L.current))),
      () => clearTimeout(e)
    );
  }, [u, i, n, V, ge, q]),
    Y.useEffect(() => {
      n.delete && (q(), n.onDismiss == null || n.onDismiss.call(n, n));
    }, [q, n.delete]));
  function ye() {
    return w?.loading
      ? Y.createElement(
          `div`,
          {
            className: Z(C?.loader, n?.classNames?.loader, `sonner-loader`),
            "data-visible": V === `loading`,
          },
          w.loading,
        )
      : Y.createElement(Nn, {
          className: Z(C?.loader, n?.classNames?.loader),
          visible: V === `loading`,
        });
  }
  let be = n.icon || w?.[V] || jn(V);
  return Y.createElement(
    `li`,
    {
      tabIndex: 0,
      ref: R,
      className: Z(_, ce, C?.toast, n?.classNames?.toast, C?.default, C?.[V], n?.classNames?.[V]),
      "data-sonner-toast": ``,
      "data-rich-colors": n.richColors ?? f,
      "data-styled": !(n.jsx || n.unstyled || r),
      "data-mounted": k,
      "data-promise": !!n.promise,
      "data-swiped": ie,
      "data-removed": A,
      "data-visible": B,
      "data-y-position": me,
      "data-x-position": he,
      "data-index": c,
      "data-front": z,
      "data-swiping": ne,
      "data-dismissible": H,
      "data-type": V,
      "data-invert": _e,
      "data-swipe-out": N,
      "data-swipe-direction": O,
      "data-expanded": !!(u || (S && k)),
      "data-testid": n.testId,
      style: {
        "--index": c,
        "--toasts-before": c,
        "--z-index": l.length - c,
        "--offset": `${A ? oe : U.current}px`,
        "--initial-height": S ? `auto` : `${F}px`,
        ...m,
        ...n.style,
      },
      onDragEnd: () => {
        (M(!1), D(null), (G.current = null));
      },
      onPointerDown: (e) => {
        e.button !== 2 &&
          (ve ||
            !H ||
            ((se.current = new Date()),
            P(U.current),
            e.target.setPointerCapture(e.pointerId),
            e.target.tagName !== `BUTTON` &&
              (M(!0), (G.current = { x: e.clientX, y: e.clientY }))));
      },
      onPointerUp: () => {
        if (N || !H) return;
        G.current = null;
        let e = Number(
            R.current?.style.getPropertyValue(`--swipe-amount-x`).replace(`px`, ``) || 0,
          ),
          t = Number(R.current?.style.getPropertyValue(`--swipe-amount-y`).replace(`px`, ``) || 0),
          r = new Date().getTime() - se.current?.getTime(),
          i = E === `x` ? e : t,
          a = Math.abs(i) / r;
        if (Math.abs(i) >= Zn || a > 0.11) {
          (P(U.current),
            n.onDismiss == null || n.onDismiss.call(n, n),
            ee(E === `x` ? (e > 0 ? `right` : `left`) : t > 0 ? `down` : `up`),
            q(),
            re(!0));
          return;
        } else {
          var o, s;
          ((o = R.current) == null || o.style.setProperty(`--swipe-amount-x`, `0px`),
            (s = R.current) == null || s.style.setProperty(`--swipe-amount-y`, `0px`));
        }
        (ae(!1), M(!1), D(null));
      },
      onPointerMove: (t) => {
        var n, r;
        if (!G.current || !H || window.getSelection()?.toString().length > 0) return;
        let i = t.clientY - G.current.y,
          a = t.clientX - G.current.x,
          o = e.swipeDirections ?? $n(b);
        !E && (Math.abs(a) > 1 || Math.abs(i) > 1) && D(Math.abs(a) > Math.abs(i) ? `x` : `y`);
        let s = { x: 0, y: 0 },
          c = (e) => 1 / (1.5 + Math.abs(e) / 20);
        if (E === `y`) {
          if (o.includes(`top`) || o.includes(`bottom`))
            if ((o.includes(`top`) && i < 0) || (o.includes(`bottom`) && i > 0)) s.y = i;
            else {
              let e = i * c(i);
              s.y = Math.abs(e) < Math.abs(i) ? e : i;
            }
        } else if (E === `x` && (o.includes(`left`) || o.includes(`right`)))
          if ((o.includes(`left`) && a < 0) || (o.includes(`right`) && a > 0)) s.x = a;
          else {
            let e = a * c(a);
            s.x = Math.abs(e) < Math.abs(a) ? e : a;
          }
        ((Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && ae(!0),
          (n = R.current) == null || n.style.setProperty(`--swipe-amount-x`, `${s.x}px`),
          (r = R.current) == null || r.style.setProperty(`--swipe-amount-y`, `${s.y}px`));
      },
    },
    de && !n.jsx && V !== `loading`
      ? Y.createElement(
          `button`,
          {
            "aria-label": T,
            "data-disabled": ve,
            "data-close-button": !0,
            onClick:
              ve || !H
                ? () => {}
                : () => {
                    (q(), n.onDismiss == null || n.onDismiss.call(n, n));
                  },
            className: Z(C?.closeButton, n?.classNames?.closeButton),
          },
          w?.close ?? Rn,
        )
      : null,
    (V || n.icon || n.promise) && n.icon !== null && (w?.[V] !== null || n.icon)
      ? Y.createElement(
          `div`,
          { "data-icon": ``, className: Z(C?.icon, n?.classNames?.icon) },
          n.promise || (n.type === `loading` && !n.icon) ? n.icon || ye() : null,
          n.type === `loading` ? null : be,
        )
      : null,
    Y.createElement(
      `div`,
      { "data-content": ``, className: Z(C?.content, n?.classNames?.content) },
      Y.createElement(
        `div`,
        { "data-title": ``, className: Z(C?.title, n?.classNames?.title) },
        n.jsx ? n.jsx : typeof n.title == `function` ? n.title() : n.title,
      ),
      n.description
        ? Y.createElement(
            `div`,
            {
              "data-description": ``,
              className: Z(v, le, C?.description, n?.classNames?.description),
            },
            typeof n.description == `function` ? n.description() : n.description,
          )
        : null,
    ),
    Y.isValidElement(n.cancel)
      ? n.cancel
      : n.cancel && Wn(n.cancel)
        ? Y.createElement(
            `button`,
            {
              "data-button": !0,
              "data-cancel": !0,
              style: n.cancelButtonStyle || h,
              onClick: (e) => {
                Wn(n.cancel) &&
                  H &&
                  (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), q());
              },
              className: Z(C?.cancelButton, n?.classNames?.cancelButton),
            },
            n.cancel.label,
          )
        : null,
    Y.isValidElement(n.action)
      ? n.action
      : n.action && Wn(n.action)
        ? Y.createElement(
            `button`,
            {
              "data-button": !0,
              "data-action": !0,
              style: n.actionButtonStyle || g,
              onClick: (e) => {
                Wn(n.action) &&
                  (n.action.onClick == null || n.action.onClick.call(n.action, e),
                  !e.defaultPrevented && q());
              },
              className: Z(C?.actionButton, n?.classNames?.actionButton),
            },
            n.action.label,
          )
        : null,
  );
};
function tr() {
  if (typeof window > `u` || typeof document > `u`) return `ltr`;
  let e = document.documentElement.getAttribute(`dir`);
  return e === `auto` || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function nr(e, t) {
  let n = {};
  return (
    [e, t].forEach((e, t) => {
      let r = t === 1,
        i = r ? `--mobile-offset` : `--offset`,
        a = r ? qn : Kn;
      function o(e) {
        [`top`, `right`, `bottom`, `left`].forEach((t) => {
          n[`${i}-${t}`] = typeof e == `number` ? `${e}px` : e;
        });
      }
      typeof e == `number` || typeof e == `string`
        ? o(e)
        : typeof e == `object`
          ? [`top`, `right`, `bottom`, `left`].forEach((t) => {
              e[t] === void 0
                ? (n[`${i}-${t}`] = a)
                : (n[`${i}-${t}`] = typeof e[t] == `number` ? `${e[t]}px` : e[t]);
            })
          : o(a);
    }),
    n
  );
}
var rr = Y.forwardRef(function (e, t) {
    let {
        id: n,
        invert: r,
        position: i = `bottom-right`,
        hotkey: a = [`altKey`, `KeyT`],
        expand: o,
        closeButton: s,
        className: c,
        offset: l,
        mobileOffset: u,
        theme: d = `light`,
        richColors: f,
        duration: p,
        style: m,
        visibleToasts: h = Gn,
        toastOptions: g,
        dir: _ = tr(),
        gap: v = Xn,
        icons: y,
        containerAriaLabel: b = `Notifications`,
      } = e,
      [x, S] = Y.useState([]),
      C = Y.useMemo(
        () => (n ? x.filter((e) => e.toasterId === n) : x.filter((e) => !e.toasterId)),
        [x, n],
      ),
      w = Y.useMemo(
        () => Array.from(new Set([i].concat(C.filter((e) => e.position).map((e) => e.position)))),
        [C, i],
      ),
      [T, E] = Y.useState([]),
      [D, O] = Y.useState(!1),
      [ee, k] = Y.useState(!1),
      [te, A] = Y.useState(
        d === `system`
          ? typeof window < `u` &&
            window.matchMedia &&
            window.matchMedia(`(prefers-color-scheme: dark)`).matches
            ? `dark`
            : `light`
          : d,
      ),
      j = Y.useRef(null),
      ne = a.join(`+`).replace(/Key/g, ``).replace(/Digit/g, ``),
      M = Y.useRef(null),
      N = Y.useRef(!1),
      re = Y.useCallback((e) => {
        S(
          (t) => (
            t.find((t) => t.id === e.id)?.delete || X.dismiss(e.id),
            t.filter(({ id: t }) => t !== e.id)
          ),
        );
      }, []);
    return (
      Y.useEffect(
        () =>
          X.subscribe((e) => {
            if (e.dismiss) {
              requestAnimationFrame(() => {
                S((t) => t.map((t) => (t.id === e.id ? { ...t, delete: !0 } : t)));
              });
              return;
            }
            setTimeout(() => {
              gn.flushSync(() => {
                S((t) => {
                  let n = t.findIndex((t) => t.id === e.id);
                  return n === -1
                    ? [e, ...t]
                    : [...t.slice(0, n), { ...t[n], ...e }, ...t.slice(n + 1)];
                });
              });
            });
          }),
        [x],
      ),
      Y.useEffect(() => {
        if (d !== `system`) {
          A(d);
          return;
        }
        if (
          (d === `system` &&
            (window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches
              ? A(`dark`)
              : A(`light`)),
          typeof window > `u`)
        )
          return;
        let e = window.matchMedia(`(prefers-color-scheme: dark)`);
        try {
          e.addEventListener(`change`, ({ matches: e }) => {
            A(e ? `dark` : `light`);
          });
        } catch {
          e.addListener(({ matches: e }) => {
            try {
              A(e ? `dark` : `light`);
            } catch (e) {
              console.error(e);
            }
          });
        }
      }, [d]),
      Y.useEffect(() => {
        x.length <= 1 && O(!1);
      }, [x]),
      Y.useEffect(() => {
        let e = (e) => {
          if (a.every((t) => e[t] || e.code === t)) {
            var t;
            (O(!0), (t = j.current) == null || t.focus());
          }
          e.code === `Escape` &&
            (document.activeElement === j.current || j.current?.contains(document.activeElement)) &&
            O(!1);
        };
        return (
          document.addEventListener(`keydown`, e),
          () => document.removeEventListener(`keydown`, e)
        );
      }, [a]),
      Y.useEffect(() => {
        if (j.current)
          return () => {
            M.current &&
              (M.current.focus({ preventScroll: !0 }), (M.current = null), (N.current = !1));
          };
      }, [j.current]),
      Y.createElement(
        `section`,
        {
          ref: t,
          "aria-label": `${b} ${ne}`,
          tabIndex: -1,
          "aria-live": `polite`,
          "aria-relevant": `additions text`,
          "aria-atomic": `false`,
          suppressHydrationWarning: !0,
        },
        w.map((t, n) => {
          let [i, a] = t.split(`-`);
          return C.length
            ? Y.createElement(
                `ol`,
                {
                  key: t,
                  dir: _ === `auto` ? tr() : _,
                  tabIndex: -1,
                  ref: j,
                  className: c,
                  "data-sonner-toaster": !0,
                  "data-sonner-theme": te,
                  "data-y-position": i,
                  "data-x-position": a,
                  style: {
                    "--front-toast-height": `${T[0]?.height || 0}px`,
                    "--width": `${Yn}px`,
                    "--gap": `${v}px`,
                    ...m,
                    ...nr(l, u),
                  },
                  onBlur: (e) => {
                    N.current &&
                      !e.currentTarget.contains(e.relatedTarget) &&
                      ((N.current = !1),
                      (M.current &&= (M.current.focus({ preventScroll: !0 }), null)));
                  },
                  onFocus: (e) => {
                    (e.target instanceof HTMLElement && e.target.dataset.dismissible === `false`) ||
                      N.current ||
                      ((N.current = !0), (M.current = e.relatedTarget));
                  },
                  onMouseEnter: () => O(!0),
                  onMouseMove: () => O(!0),
                  onMouseLeave: () => {
                    ee || O(!1);
                  },
                  onDragEnd: () => O(!1),
                  onPointerDown: (e) => {
                    (e.target instanceof HTMLElement && e.target.dataset.dismissible === `false`) ||
                      k(!0);
                  },
                  onPointerUp: () => k(!1),
                },
                C.filter((e) => (!e.position && n === 0) || e.position === t).map((n, i) =>
                  Y.createElement(er, {
                    key: n.id,
                    icons: y,
                    index: i,
                    toast: n,
                    defaultRichColors: f,
                    duration: g?.duration ?? p,
                    className: g?.className,
                    descriptionClassName: g?.descriptionClassName,
                    invert: r,
                    visibleToasts: h,
                    closeButton: g?.closeButton ?? s,
                    interacting: ee,
                    position: t,
                    style: g?.style,
                    unstyled: g?.unstyled,
                    classNames: g?.classNames,
                    cancelButtonStyle: g?.cancelButtonStyle,
                    actionButtonStyle: g?.actionButtonStyle,
                    closeButtonAriaLabel: g?.closeButtonAriaLabel,
                    removeToast: re,
                    toasts: C.filter((e) => e.position == n.position),
                    heights: T.filter((e) => e.position == n.position),
                    setHeights: E,
                    expandByDefault: o,
                    gap: v,
                    expanded: D,
                    swipeDirections: e.swipeDirections,
                  }),
                ),
              )
            : null;
        }),
      )
    );
  }),
  ir = (...e) =>
    e
      .filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t)
      .join(` `)
      .trim(),
  ar = (e) => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  or = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => (n ? n.toUpperCase() : t.toLowerCase())),
  sr = (e) => {
    let t = or(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  cr = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  lr = (e) => {
    for (let t in e) if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0;
    return !1;
  },
  ur = (0, Y.forwardRef)(
    (
      {
        color: e = `currentColor`,
        size: t = 24,
        strokeWidth: n = 2,
        absoluteStrokeWidth: r,
        className: i = ``,
        children: a,
        iconNode: o,
        ...s
      },
      c,
    ) =>
      (0, Y.createElement)(
        `svg`,
        {
          ref: c,
          ...cr,
          width: t,
          height: t,
          stroke: e,
          strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
          className: ir(`lucide`, i),
          ...(!a && !lr(s) && { "aria-hidden": `true` }),
          ...s,
        },
        [...o.map(([e, t]) => (0, Y.createElement)(e, t)), ...(Array.isArray(a) ? a : [a])],
      ),
  ),
  dr = (e, t) => {
    let n = (0, Y.forwardRef)(({ className: n, ...r }, i) =>
      (0, Y.createElement)(ur, {
        ref: i,
        iconNode: t,
        className: ir(`lucide-${ar(sr(e))}`, `lucide-${e}`, n),
        ...r,
      }),
    );
    return ((n.displayName = sr(e)), n);
  },
  fr = dr(`heart`, [
    [
      `path`,
      {
        d: `M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,
        key: `mvr1a0`,
      },
    ],
  ]),
  pr = dr(`tv`, [
    [`path`, { d: `m17 2-5 5-5-5`, key: `16satq` }],
    [`rect`, { width: `20`, height: `15`, x: `2`, y: `7`, rx: `2`, key: `1e6viu` }],
  ]),
  mr = (0, Y.createContext)(null);
function hr({ children: e }) {
  let [t, n] = (0, Y.useState)(null),
    [r, i] = (0, Y.useState)(0),
    [a, o] = (0, Y.useState)(`hidden`),
    [s, c] = (0, Y.useState)(0),
    l = (0, Y.useRef)(null),
    [u, d] = (0, Y.useState)(null),
    f = (0, Y.useRef)(null),
    [p, m] = (0, Y.useState)(!1);
  (0, Y.useEffect)(() => {
    m(!0);
  }, []);
  let h = (0, Y.useCallback)((e, t = 0) => {
      (n(e), i(t), o(`inline`));
    }, []),
    g = (0, Y.useCallback)(() => {
      (n(null), o(`hidden`));
      let e = l.current;
      if (e)
        try {
          (e.pause(), e.removeAttribute(`src`), e.load());
        } catch {}
    }, []),
    _ = (0, Y.useCallback)((e) => {
      let t = l.current;
      if (!t) return;
      let n = e ?? f.current;
      n && (t.parentElement !== n && n.appendChild(t), c((e) => e + 1));
    }, []),
    v = (0, Y.useMemo)(
      () => ({
        channel: t,
        workingStreamIndex: r,
        open: h,
        close: g,
        videoEl: u,
        mountInto: _,
        hostId: s,
        mode: a,
        setMode: o,
      }),
      [t, r, h, g, u, _, s, a],
    );
  return (0, Pt.jsxs)(mr.Provider, {
    value: v,
    children: [
      e,
      p &&
        (0, gn.createPortal)(
          (0, Pt.jsx)(`div`, {
            ref: f,
            "aria-hidden": !0,
            style: {
              position: `fixed`,
              left: -99999,
              top: -99999,
              width: 1,
              height: 1,
              overflow: `hidden`,
            },
            children: (0, Pt.jsx)(`video`, {
              ref: (e) => {
                ((l.current = e), d(e));
              },
              playsInline: !0,
            }),
          }),
          document.body,
        ),
    ],
  });
}
function gr() {
  let e = (0, Y.useContext)(mr);
  if (!e) throw Error(`usePlayer outside PlayerProvider`);
  return e;
}
var _r = (e, t) => t.some((t) => e instanceof t),
  vr,
  yr;
function br() {
  return (vr ||= [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
function xr() {
  return (yr ||= [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey,
  ]);
}
var Sr = new WeakMap(),
  Cr = new WeakMap(),
  wr = new WeakMap();
function Tr(e) {
  let t = new Promise((t, n) => {
    let r = () => {
        (e.removeEventListener(`success`, i), e.removeEventListener(`error`, a));
      },
      i = () => {
        (t(jr(e.result)), r());
      },
      a = () => {
        (n(e.error), r());
      };
    (e.addEventListener(`success`, i), e.addEventListener(`error`, a));
  });
  return (wr.set(t, e), t);
}
function Er(e) {
  if (Sr.has(e)) return;
  let t = new Promise((t, n) => {
    let r = () => {
        (e.removeEventListener(`complete`, i),
          e.removeEventListener(`error`, a),
          e.removeEventListener(`abort`, a));
      },
      i = () => {
        (t(), r());
      },
      a = () => {
        (n(e.error || new DOMException(`AbortError`, `AbortError`)), r());
      };
    (e.addEventListener(`complete`, i),
      e.addEventListener(`error`, a),
      e.addEventListener(`abort`, a));
  });
  Sr.set(e, t);
}
var Dr = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === `done`) return Sr.get(e);
      if (t === `store`)
        return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0]);
    }
    return jr(e[t]);
  },
  set(e, t, n) {
    return ((e[t] = n), !0);
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === `done` || t === `store`) ? !0 : t in e;
  },
};
function Or(e) {
  Dr = e(Dr);
}
function kr(e) {
  return xr().includes(e)
    ? function (...t) {
        return (e.apply(Mr(this), t), jr(this.request));
      }
    : function (...t) {
        return jr(e.apply(Mr(this), t));
      };
}
function Ar(e) {
  return typeof e == `function`
    ? kr(e)
    : (e instanceof IDBTransaction && Er(e), _r(e, br()) ? new Proxy(e, Dr) : e);
}
function jr(e) {
  if (e instanceof IDBRequest) return Tr(e);
  if (Cr.has(e)) return Cr.get(e);
  let t = Ar(e);
  return (t !== e && (Cr.set(e, t), wr.set(t, e)), t);
}
var Mr = (e) => wr.get(e);
function Nr(e, t, { blocked: n, upgrade: r, blocking: i, terminated: a } = {}) {
  let o = indexedDB.open(e, t),
    s = jr(o);
  return (
    r &&
      o.addEventListener(`upgradeneeded`, (e) => {
        r(jr(o.result), e.oldVersion, e.newVersion, jr(o.transaction), e);
      }),
    n && o.addEventListener(`blocked`, (e) => n(e.oldVersion, e.newVersion, e)),
    s
      .then((e) => {
        (a && e.addEventListener(`close`, () => a()),
          i && e.addEventListener(`versionchange`, (e) => i(e.oldVersion, e.newVersion, e)));
      })
      .catch(() => {}),
    s
  );
}
var Pr = [`get`, `getKey`, `getAll`, `getAllKeys`, `count`],
  Fr = [`put`, `add`, `delete`, `clear`],
  Ir = new Map();
function Lr(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == `string`)) return;
  if (Ir.get(t)) return Ir.get(t);
  let n = t.replace(/FromIndex$/, ``),
    r = t !== n,
    i = Fr.includes(n);
  if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || !(i || Pr.includes(n))) return;
  let a = async function (e, ...t) {
    let a = this.transaction(e, i ? `readwrite` : `readonly`),
      o = a.store;
    return (r && (o = o.index(t.shift())), (await Promise.all([o[n](...t), i && a.done]))[0]);
  };
  return (Ir.set(t, a), a);
}
Or((e) => ({
  ...e,
  get: (t, n, r) => Lr(t, n) || e.get(t, n, r),
  has: (t, n) => !!Lr(t, n) || e.has(t, n),
}));
var Rr = [`continue`, `continuePrimaryKey`, `advance`],
  zr = {},
  Br = new WeakMap(),
  Vr = new WeakMap(),
  Hr = {
    get(e, t) {
      if (!Rr.includes(t)) return e[t];
      let n = zr[t];
      return (
        (n ||= zr[t] =
          function (...e) {
            Br.set(this, Vr.get(this)[t](...e));
          }),
        n
      );
    },
  };
async function* Ur(...e) {
  let t = this;
  if ((t instanceof IDBCursor || (t = await t.openCursor(...e)), !t)) return;
  t = t;
  let n = new Proxy(t, Hr);
  for (Vr.set(n, t), wr.set(n, Mr(t)); t; )
    (yield n, (t = await (Br.get(n) || t.continue())), Br.delete(n));
}
function Wr(e, t) {
  return (
    (t === Symbol.asyncIterator && _r(e, [IDBIndex, IDBObjectStore, IDBCursor])) ||
    (t === `iterate` && _r(e, [IDBIndex, IDBObjectStore]))
  );
}
Or((e) => ({
  ...e,
  get(t, n, r) {
    return Wr(t, n) ? Ur : e.get(t, n, r);
  },
  has(t, n) {
    return Wr(t, n) || e.has(t, n);
  },
}));
var Gr = `iptv-local`,
  Kr = 2,
  qr = null;
function Q() {
  return typeof window > `u`
    ? Promise.resolve(null)
    : ((qr ||= Nr(Gr, Kr, {
        upgrade(e, t) {
          (t < 1 &&
            (e.objectStoreNames.contains(`favourites`) ||
              e.createObjectStore(`favourites`, { keyPath: `channelId` }),
            e.objectStoreNames.contains(`history`) ||
              e
                .createObjectStore(`history`, { keyPath: `watched_at` })
                .createIndex(`by_channel`, `channelId`),
            e.objectStoreNames.contains(`preferences`) ||
              e.createObjectStore(`preferences`, { keyPath: `key` })),
            t < 2 &&
              (e.objectStoreNames.contains(`stream_health`) ||
                e.createObjectStore(`stream_health`, { keyPath: `channelId` })));
        },
      }).catch(() => ((qr = null), null))),
      qr);
}
async function Jr() {
  let e = await Q();
  return e ? e.getAll(`favourites`) : [];
}
async function Yr(e) {
  let t = await Q();
  t &&
    (await t.put(`favourites`, { channelId: e, added_at: new Date().toISOString() }),
    window.dispatchEvent(new CustomEvent(`favchange`)));
}
async function Xr(e) {
  let t = await Q();
  t && (await t.delete(`favourites`, e), window.dispatchEvent(new CustomEvent(`favchange`)));
}
async function Zr(e) {
  let t = await Q();
  return t ? !!(await t.get(`favourites`, e)) : !1;
}
async function Qr(e, t = 0) {
  let n = await Q();
  if (!n) return;
  let r = n.transaction(`history`, `readwrite`);
  await r.store.put({ channelId: e, watched_at: new Date().toISOString(), duration_ms: t });
  let i = await r.store.getAll();
  if (i.length > 200) {
    i.sort((e, t) => e.watched_at.localeCompare(t.watched_at));
    let e = i.length - 200;
    for (let t = 0; t < e; t++) await r.store.delete(i[t].watched_at);
  }
  await r.done;
}
async function $r() {
  let e = await Q();
  return e
    ? (await e.getAll(`history`)).sort((e, t) => t.watched_at.localeCompare(e.watched_at))
    : [];
}
async function ei(e, t, n) {
  let r = await Q();
  if (!r) return;
  let i = n;
  if (i === void 0)
    try {
      let t = await r.get(`stream_health`, e);
      t && t.workingIndex !== void 0 && (i = t.workingIndex);
    } catch {}
  (await r.put(`stream_health`, {
    channelId: e,
    status: t,
    checked_at: new Date().toISOString(),
    workingIndex: i,
  }),
    window.dispatchEvent(new CustomEvent(`healthchange`)));
}
async function ti() {
  let e = await Q();
  if (!e) return {};
  let t = await e.getAll(`stream_health`),
    n = {};
  for (let e of t) n[e.channelId] = e;
  return n;
}
async function ni() {
  let e = await fetch(`/api/catalog`);
  if (!e.ok) throw Error(`Catalog fetch failed`);
  return e.json();
}
function ri() {
  return Zt({
    queryKey: [`catalog`],
    queryFn: ni,
    staleTime: 1e3 * 60 * 60 * 12,
    gcTime: 1e3 * 60 * 60 * 24,
  });
}
var ii = new Map(),
  ai = new Map();
async function oi(e, t, n, r = !1) {
  if (typeof window < `u` && window.location.protocol === `https:` && e.startsWith(`http://`))
    return `blocked`;
  if (!r) {
    let t = ii.get(e);
    if (t) {
      let n = t.status === `online` ? 3e4 : 5e3;
      if (Date.now() - t.timestamp < n) return t.status;
      ii.delete(e);
    }
  }
  let i = ai.get(e);
  if (i) return i;
  let a = (async () => {
    let r = new AbortController(),
      i = setTimeout(() => r.abort(), 8e3);
    try {
      let a = await fetch(`/api/check-stream`, {
        method: `POST`,
        headers: { "content-type": `application/json` },
        body: JSON.stringify({ url: e, referrer: t, user_agent: n }),
        signal: r.signal,
      });
      if ((clearTimeout(i), !a.ok)) return `error`;
      let o = await a.json();
      return (ii.set(e, { status: o.status, timestamp: Date.now() }), o.status);
    } catch {
      return (clearTimeout(i), `error`);
    } finally {
      ai.delete(e);
    }
  })();
  return (ai.set(e, a), a);
}
var si = ``;
if (typeof window < `u`)
  try {
    si =
      ((Intl.DateTimeFormat().resolvedOptions().locale || ``).split(`-`)[1] || ``).toUpperCase() ||
      `US`;
  } catch {
    si = `US`;
  }
var ci = typeof window < `u` ? localStorage.getItem(`pulse-user-country`) || si : `US`,
  li = new Set();
function ui() {
  let [e, t] = (0, Y.useState)(`US`);
  return (
    (0, Y.useEffect)(() => {
      t(ci);
      let e = (e) => t(e);
      return (
        li.add(e),
        () => {
          li.delete(e);
        }
      );
    }, []),
    e
  );
}
typeof window < `u` &&
  !localStorage.getItem(`pulse-user-country`) &&
  (async () => {
    try {
      let e = await fetch(`https://ipapi.co/json/`);
      if (e.ok) {
        let t = ((await e.json()).country_code || ``).toUpperCase();
        t &&
          t.length === 2 &&
          (localStorage.setItem(`pulse-user-country`, t), (ci = t), li.forEach((e) => e(t)));
      }
    } catch (e) {
      console.warn(`GeoIP lookup failed, using locale default:`, e);
    }
  })();
var $ = {},
  di = {},
  fi = new Set();
typeof window < `u` &&
  (ti().then((e) => {
    for (let [t, n] of Object.entries(e))
      (($[t] = n.status), n.workingIndex !== void 0 && (di[t] = n.workingIndex));
    fi.forEach((e) => e({ ...$ }));
  }),
  window.addEventListener(`healthchange`, () => {
    ti().then((e) => {
      let t = {},
        n = {};
      for (let [r, i] of Object.entries(e))
        ((t[r] = i.status), i.workingIndex !== void 0 && (n[r] = i.workingIndex));
      (($ = t), (di = n), fi.forEach((e) => e({ ...$ })));
    });
  }));
function pi() {
  let [e, t] = (0, Y.useState)($);
  return (
    (0, Y.useEffect)(() => {
      let e = (e) => t(e);
      return (
        fi.add(e),
        () => {
          fi.delete(e);
        }
      );
    }, []),
    e
  );
}
function mi(e) {
  let [t, n] = (0, Y.useState)($[e] ?? `idle`);
  return (
    (0, Y.useEffect)(() => {
      let t = (t) => {
        let r = t[e] ?? `idle`;
        n((e) => (e === r ? e : r));
      };
      fi.add(t);
      let r = $[e] ?? `idle`;
      return (
        n((e) => (e === r ? e : r)),
        () => {
          fi.delete(t);
        }
      );
    }, [e]),
    t
  );
}
function hi(e) {
  return di[e] ?? 0;
}
var gi = [],
  _i = new Set(),
  vi = 0,
  yi = 2;
function bi() {
  if (vi >= yi || gi.length === 0) return;
  let e = gi.shift();
  e &&
    (vi++,
    _i.add(e.id),
    (async () => {
      let t = `error`,
        n = 0;
      for (let r = 0; r < e.streams.length; r++) {
        let i = e.streams[r];
        if (
          typeof window < `u` &&
          window.location.protocol === `https:` &&
          i.url.startsWith(`http://`)
        ) {
          t = `blocked`;
          continue;
        }
        try {
          let e = await oi(i.url, i.referrer, i.user_agent);
          if (e === `online`) {
            ((t = `online`), (n = r));
            break;
          } else t = e;
        } catch {
          t = `error`;
        }
      }
      await ei(e.id, t, n);
    })()
      .catch(() => {})
      .finally(() => {
        (vi--,
          _i.delete(e.id),
          typeof window < `u` && `requestIdleCallback` in window
            ? window.requestIdleCallback(() => bi(), { timeout: 1e3 })
            : setTimeout(bi, 200));
      }),
    vi < yi && setTimeout(bi, 50));
}
function xi(e, t) {
  typeof window > `u` ||
    _i.has(e) ||
    $[e] ||
    gi.some((t) => t.id === e) ||
    (gi.push({ id: e, streams: t }),
    typeof window < `u` && `requestIdleCallback` in window
      ? window.requestIdleCallback(() => bi())
      : setTimeout(bi, 100));
}
function Si(e, t, n, r) {
  return e.slice().sort((e, i) => {
    let a = t[e],
      o = t[i];
    if (!a || !o) return 0;
    let s = r[e],
      c = r[i],
      l = s === `online` ? 1 : s ? -1 : 0,
      u = c === `online` ? 1 : c ? -1 : 0;
    if (l !== u) return u - l;
    let d = +(a.country === n),
      f = +(o.country === n);
    return d === f ? 0 : f - d;
  });
}
var Ci = {
  blocked: `Geo-blocked from this region`,
  timeout: `Stream is slow to respond`,
  error: `Stream is offline right now`,
  unknown: `Couldn't reach this channel`,
};
function wi(e) {
  return Ci[e] ?? Ci.unknown;
}
export {
  Ee as $,
  rn as A,
  u as At,
  ut as B,
  Un as C,
  j as Ct,
  cn as D,
  b as Dt,
  sn as E,
  p as Et,
  Nt as F,
  He as G,
  ct as H,
  xt as I,
  Fe as J,
  Ve as K,
  _t as L,
  $t as M,
  c as Mt,
  en as N,
  on as O,
  x as Ot,
  Lt as P,
  ye as Q,
  gt as R,
  rr as S,
  v as St,
  hn as T,
  ee as Tt,
  Ie as U,
  lt as V,
  Ue as W,
  ze as X,
  We as Y,
  tt as Z,
  hr as _,
  re as _t,
  Si as a,
  xe as at,
  fr as b,
  N as bt,
  pi as c,
  de as ct,
  Zr as d,
  pe as dt,
  Oe as et,
  Jr as f,
  P as ft,
  Xr as g,
  D as gt,
  Qr as h,
  ae as ht,
  xi as i,
  be as it,
  Qt as j,
  o as jt,
  an as k,
  f as kt,
  ui as l,
  ue as lt,
  ei as m,
  A as mt,
  oi as n,
  Te as nt,
  ri as o,
  G as ot,
  $r as p,
  oe as pt,
  Be as q,
  hi as r,
  Se as rt,
  mi as s,
  le as st,
  wi as t,
  q as tt,
  Yr as u,
  ce as ut,
  gr as v,
  E as vt,
  On as w,
  O as wt,
  dr as x,
  h as xt,
  pr as y,
  ie as yt,
  dt as z,
};
