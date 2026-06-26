import { F as e } from "./stream-messages-xGwTYkSz.js";
var t = e();
function n({ status: e, size: n = `sm` }) {
  if (e === `idle` || e === `recovering`) return null;
  let r = {
    checking: { cls: `badge--checking`, label: `Checking`, dot: !0 },
    online: { cls: `badge--live`, label: `Live`, dot: !0 },
    blocked: { cls: `badge--blocked`, label: `Blocked`, dot: !1 },
    timeout: { cls: `badge--slow`, label: `Slow`, dot: !1 },
    error: { cls: `badge--off`, label: `Offline`, dot: !1 },
  }[e];
  return (0, t.jsxs)(`span`, {
    className: `badge ${r.cls}`,
    style: n === `md` ? { padding: `5px 10px`, fontSize: 11 } : void 0,
    children: [r.dot && (0, t.jsx)(`span`, { className: `dot` }), r.label],
  });
}
export { n as t };
