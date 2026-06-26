import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as queueBackgroundCheck } from "./stream-messages-BgpnpGaY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BackgroundPingTrigger-nSKP9mKW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function BackgroundPingTrigger({ channelIds, channels, limit = 8 }) {
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return;
    const targets = channelIds.slice(0, limit);
    for (const id of targets) {
      const ch = channels[id];
      if (!ch || !ch.streams || ch.streams.length === 0) continue;
      queueBackgroundCheck(ch.id, ch.streams);
    }
  }, [channelIds, channels, limit]);
  return null;
}
//#endregion
export { BackgroundPingTrigger as t };
