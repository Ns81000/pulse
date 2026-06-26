import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import {
  d as removeFavourite,
  g as usePlayer,
  h as useChannelHealth,
  l as recordHealth,
  n as addFavourite,
  o as listFavourites,
  p as streamErrorMsg,
  r as checkStream,
} from "./stream-messages-BgpnpGaY.mjs";
import { m as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StatusBadge } from "./StatusBadge-DMMrUB_V.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Tv, y as Heart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-favourites-Bt-_lNDN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CODE_MAP = {
  uk: "gb",
  int: "",
};
function toFlagCode(code) {
  const lower = code.toLowerCase();
  return CODE_MAP[lower] ?? lower;
}
function ChannelCardBase({
  channel,
  flag,
  countryName,
  isFavourite,
  onFavouriteChange,
  categoryName,
}) {
  const navigate = useNavigate();
  const player = usePlayer();
  const dbStatus = useChannelHealth(channel.id);
  const [localStatus, setLocalStatus] = (0, import_react.useState)(null);
  const status = localStatus || dbStatus;
  const [imgError, setImgError] = (0, import_react.useState)(false);
  const onClick = (0, import_react.useCallback)(async () => {
    if (status === "checking") return;
    setLocalStatus("checking");
    const first = channel.streams[0];
    const toastId = `stream-${channel.id}`;
    toast.loading(`Testing connection for ${channel.name}...`, { id: toastId });
    const result = await checkStream(first.url, first.referrer, first.user_agent);
    await recordHealth(channel.id, result, 0);
    setLocalStatus(null);
    if (result === "online") {
      toast.dismiss(toastId);
      player.open(channel);
      navigate({
        to: "/watch/$channelId",
        params: { channelId: channel.id },
      });
    } else
      toast.error(channel.name, {
        id: toastId,
        description: streamErrorMsg(result),
        duration: 8e3,
        action: {
          label: "Open anyway",
          onClick: () => {
            toast.dismiss(toastId);
            player.open(channel);
            navigate({
              to: "/watch/$channelId",
              params: { channelId: channel.id },
            });
          },
        },
      });
  }, [channel, navigate, player, status]);
  const onFav = (0, import_react.useCallback)(
    async (e) => {
      e.stopPropagation();
      if (isFavourite) {
        await removeFavourite(channel.id);
        toast.success("Removed from favourites", { duration: 2e3 });
      } else {
        await addFavourite(channel.id);
        toast.success(`${channel.name} added to favourites`, { duration: 2e3 });
      }
      onFavouriteChange?.();
    },
    [channel.id, channel.name, isFavourite, onFavouriteChange],
  );
  const cats = channel.categories.slice(0, 2);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    role: "button",
    tabIndex: 0,
    onClick,
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    className:
      "surface-card group relative flex w-full cursor-pointer flex-col gap-2 p-3 text-left fade-in focus-visible:outline-2 focus-visible:outline-[var(--accent)] active:scale-[0.97]",
    style: {
      transition:
        "transform 120ms cubic-bezier(0.23,1,0.32,1), background 160ms ease, border-color 160ms ease",
    },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className:
          "relative flex aspect-video items-center justify-center overflow-hidden rounded-md bg-[var(--surface-base)]",
        children: [
          channel.logo_url && !imgError
            ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                src: channel.logo_url,
                alt: "",
                loading: "lazy",
                onError: () => setImgError(true),
                className:
                  "max-h-[70%] max-w-[70%] object-contain opacity-90 transition-opacity group-hover:opacity-100",
              })
            : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, {
                className: "size-8 text-[var(--text-disabled)]",
                strokeWidth: 1.5,
              }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
            type: "button",
            onClick: onFav,
            "aria-label": isFavourite ? "Remove favourite" : "Add favourite",
            className: `absolute right-2 top-2 grid size-7 place-items-center rounded-full transition-all duration-100 active:scale-90 focus-visible:opacity-100 ${isFavourite ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
              className: `size-3.5 ${isFavourite ? "fill-[var(--accent)] text-[var(--accent)]" : "text-white"}`,
            }),
          }),
          status !== "idle" &&
            status !== "recovering" &&
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
              className: "absolute left-2 top-2",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status }),
            }),
        ],
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
        className: "flex min-w-0 items-start justify-between gap-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
            className: "truncate font-display text-[13.5px] font-medium text-[var(--text-primary)]",
            children: channel.name,
          }),
          channel.country
            ? (() => {
                const code = toFlagCode(channel.country);
                if (!code) return null;
                return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
                  src: `https://flagcdn.com/w20/${code}.png`,
                  srcSet: `https://flagcdn.com/w40/${code}.png 2x`,
                  width: 20,
                  height: 15,
                  alt: countryName ?? channel.country,
                  title: countryName ?? channel.country,
                  className: "mt-0.5 shrink-0 rounded-[2px] object-cover opacity-90",
                });
              })()
            : null,
        ],
      }),
      cats.length > 0 &&
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          className: "flex flex-wrap gap-1",
          children: cats.map((c) =>
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className:
                  "rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]",
                children: categoryName?.(c) ?? c,
              },
              c,
            ),
          ),
        }),
    ],
  });
}
var ChannelCard = (0, import_react.memo)(ChannelCardBase);
function useFavourites() {
  const [favSet, setFavSet] = (0, import_react.useState)(/* @__PURE__ */ new Set());
  const refresh = (0, import_react.useCallback)(async () => {
    const list = await listFavourites();
    setFavSet(new Set(list.map((f) => f.channelId)));
  }, []);
  (0, import_react.useEffect)(() => {
    refresh();
    window.addEventListener("favchange", refresh);
    return () => window.removeEventListener("favchange", refresh);
  }, [refresh]);
  return {
    favSet,
    refresh,
  };
}
//#endregion
export { useFavourites as n, ChannelCard as t };
