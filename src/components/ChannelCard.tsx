import { useNavigate } from "@tanstack/react-router";
import { useState, useCallback, memo } from "react";
import { Heart, Tv } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "./StatusBadge";
import type { CatalogChannel, ChannelStatus, EPGEntry } from "@/lib/types";
import { checkStream } from "@/lib/data-hooks";
import { usePlayer } from "@/lib/player-context";
import { addFavourite, removeFavourite } from "@/lib/idb";
import { streamErrorMsg } from "@/lib/stream-messages";

// iptv-org uses non-ISO codes for some countries — map them to flagcdn's ISO codes
const CODE_MAP: Record<string, string> = {
  uk: "gb", // United Kingdom
  int: "", // International — no flag
};

function toFlagCode(code: string): string {
  const lower = code.toLowerCase();
  return CODE_MAP[lower] ?? lower;
}

interface Props {
  channel: CatalogChannel;
  flag?: string;
  countryName?: string;
  epg?: { now: EPGEntry | null; next: EPGEntry | null };
  isFavourite?: boolean;
  onFavouriteChange?: () => void;
  categoryName?: (id: string) => string;
}

function ChannelCardBase({
  channel,
  flag,
  countryName,
  epg,
  isFavourite,
  onFavouriteChange,
  categoryName,
}: Props) {
  const navigate = useNavigate();
  const player = usePlayer();
  const [status, setStatus] = useState<ChannelStatus>("idle");
  const [imgError, setImgError] = useState(false);

  const onClick = useCallback(async () => {
    if (status === "checking") return;
    setStatus("checking");
    const first = channel.streams[0];
    const toastId = `stream-${channel.id}`;
    const result = await checkStream(first.url, first.referrer, first.user_agent);
    setStatus(result);
    if (result === "online") {
      toast.dismiss(toastId);
      player.open(channel);
      navigate({ to: "/watch/$channelId", params: { channelId: channel.id } });
    } else {
      toast.error(channel.name, {
        id: toastId,
        description: streamErrorMsg(result),
        duration: 8000,
        action: {
          label: "Open anyway",
          onClick: () => {
            toast.dismiss(toastId);
            player.open(channel);
            navigate({ to: "/watch/$channelId", params: { channelId: channel.id } });
          },
        },
      });
    }
  }, [channel, navigate, player, status]);

  const onFav = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isFavourite) {
        await removeFavourite(channel.id);
        toast.success("Removed from favourites", { duration: 2000 });
      } else {
        await addFavourite(channel.id);
        toast.success(`${channel.name} added to favourites`, { duration: 2000 });
      }
      onFavouriteChange?.();
    },
    [channel.id, channel.name, isFavourite, onFavouriteChange],
  );

  const cats = channel.categories.slice(0, 2);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="surface-card group relative flex w-full cursor-pointer flex-col gap-2 p-3 text-left fade-in focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md bg-[var(--surface-base)]">
        {channel.logo_url && !imgError ? (
          <img
            src={channel.logo_url}
            alt=""
            loading="lazy"
            onError={() => setImgError(true)}
            className="max-h-[70%] max-w-[70%] object-contain opacity-90 transition-opacity group-hover:opacity-100"
          />
        ) : (
          <Tv className="size-8 text-[var(--text-disabled)]" strokeWidth={1.5} />
        )}
        <button
          type="button"
          onClick={onFav}
          aria-label={isFavourite ? "Remove favourite" : "Add favourite"}
          className="absolute right-2 top-2 grid size-7 place-items-center rounded-full transition-opacity"
        >
          <Heart
            className={`size-3.5 ${isFavourite ? "fill-[var(--accent)] text-[var(--accent)]" : "text-white"}`}
          />
        </button>
        {status !== "idle" && status !== "recovering" && (
          <div className="absolute left-2 top-2">
            <StatusBadge status={status} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 items-start justify-between gap-2">
        <h3 className="truncate font-display text-[13.5px] font-medium text-[var(--text-primary)]">
          {channel.name}
        </h3>
        {channel.country
          ? (() => {
              const code = toFlagCode(channel.country);
              if (!code) return null;
              return (
                <img
                  src={`https://flagcdn.com/w20/${code}.png`}
                  srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
                  width={20}
                  height={15}
                  alt={countryName ?? channel.country}
                  title={countryName ?? channel.country}
                  className="mt-0.5 shrink-0 rounded-[2px] object-cover opacity-90"
                />
              );
            })()
          : null}
      </div>

      {epg?.now ? (
        <p className="line-clamp-1 text-[11px] text-[var(--text-tertiary)]">
          <span className="mr-1 inline-block size-1 -translate-y-[2px] rounded-full bg-[var(--status-online)]" />
          {epg.now.title}
        </p>
      ) : null}

      {cats.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {cats.map((c) => (
            <span
              key={c}
              className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[10px] text-[var(--text-tertiary)]"
            >
              {categoryName?.(c) ?? c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export const ChannelCard = memo(ChannelCardBase);
