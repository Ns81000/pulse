import { At as e, Mt as t, i as n } from "./stream-messages-xGwTYkSz.js";
var r = t(e(), 1);
function i({ channelIds: e, channels: t, limit: i = 8 }) {
  return (
    (0, r.useEffect)(() => {
      if (typeof window > `u`) return;
      let r = e.slice(0, i);
      for (let e of r) {
        let r = t[e];
        !r || !r.streams || r.streams.length === 0 || n(r.id, r.streams);
      }
    }, [e, t, i]),
    null
  );
}
export { i as t };
