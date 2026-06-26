import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-DMMrUB_V.js
var import_jsx_runtime = require_jsx_runtime();
function StatusBadge({ status, size = "sm" }) {
  if (status === "idle" || status === "recovering") return null;
  const v = {
    checking: {
      cls: "badge--checking",
      label: "Checking",
      dot: true,
    },
    online: {
      cls: "badge--live",
      label: "Live",
      dot: true,
    },
    blocked: {
      cls: "badge--blocked",
      label: "Blocked",
      dot: false,
    },
    timeout: {
      cls: "badge--slow",
      label: "Slow",
      dot: false,
    },
    error: {
      cls: "badge--off",
      label: "Offline",
      dot: false,
    },
  }[status];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
    className: `badge ${v.cls}`,
    style:
      size === "md"
        ? {
            padding: "5px 10px",
            fontSize: 11,
          }
        : void 0,
    children: [
      v.dot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dot" }),
      v.label,
    ],
  });
}
//#endregion
export { StatusBadge as t };
