import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ArrowLeft, Heart, ExternalLink, Tv } from "lucide-react";
import { toast } from "sonner";
import { useCatalog, useEpg, checkStream, getWorkingStreamIndex } from "@/lib/data-hooks";
import { Player } from "@/components/Player";
import { AlternativesShelf } from "@/components/AlternativesShelf";
import { StatusBadge } from "@/components/StatusBadge";
import { usePlayer } from "@/lib/player-context";
import {
  addFavourite,
  removeFavourite,
  isFavourite as checkFav,
  recordHistory,
  recordHealth,
} from "@/lib/idb";
import type { ChannelStatus, Catalog, EPGData } from "@/lib/types";
import { streamErrorMsg } from "@/lib/stream-messages";

// iptv-org country mapping for flagcdn
const CODE_MAP: Record<string, string> = {
  uk: "gb",
  int: "",
};

function toFlagCode(code: string): string {
  const lower = code.toLowerCase();
  return CODE_MAP[lower] ?? lower;
}

export const Route = createFileRoute("/watch/$channelId")({
  component: WatchPage,
});

function WatchPage() {
  const { channelId } = Route.useParams();
  const navigate = useNavigate();
  const cat = useCatalog();
  const epg = useEpg();
  const { open } = usePlayer();

  const [status, setStatus] = useState<ChannelStatus>("checking");
  const [fav, setFav] = useState(false);

  const channel = cat.data?.channels[channelId];
  const flagCode = useMemo(() => {
    if (!channel) return "";
    return channel.country ? toFlagCode(channel.country) : "";
  }, [channel]);

  const catNames = useMemo(() => {
    if (!cat.data || !channel) return [];
    return channel.categories.map(
      (id) => cat.data!.meta.categories.find((c) => c.id === id)?.name ?? id,
    );
  }, [cat.data, channel]);

  const runCheck = useCallback(
    async (force = false) => {
      if (!channel) return;
      setStatus("checking");

      const cachedIndex = getWorkingStreamIndex(channel.id);
      let statusResult: ChannelStatus = "error";
      let workingIndex = cachedIndex;

      const tryStream = async (idx: number): Promise<ChannelStatus> => {
        const s = channel.streams[idx];
        if (!s) return "error";

        if (
          typeof window !== "undefined" &&
          window.location.protocol === "https:" &&
          s.url.startsWith("http://")
        ) {
          return "blocked";
        }

        return await checkStream(s.url, s.referrer, s.user_agent, force);
      };

      const res = await tryStream(workingIndex);
      if (res === "online") {
        statusResult = "online";
      } else {
        let found = false;
        for (let i = 0; i < channel.streams.length; i++) {
          if (i === workingIndex) continue;
          const r = await tryStream(i);
          if (r === "online") {
            workingIndex = i;
            statusResult = "online";
            found = true;
            break;
          } else {
            statusResult = r;
          }
        }
        if (!found) {
          workingIndex = 0;
        }
      }

      setStatus(statusResult);
      if (statusResult === "online") {
        open(channel, workingIndex);
        await recordHealth(channel.id, "online", workingIndex);
        await recordHistory(channel.id);
      } else {
        await recordHealth(
          channel.id,
          statusResult as Exclude<ChannelStatus, "idle" | "checking" | "recovering">,
          workingIndex,
        );
      }
    },
    [channel, open],
  );

  useEffect(() => {
    if (!channel) {
      if (!cat.isLoading) setStatus("error");
      return;
    }
    runCheck();
    checkFav(channel.id).then(setFav);
  }, [channel, runCheck, cat.isLoading]);

  useEffect(() => {
    if (!channel) return;
    const onFavChange = () => checkFav(channel.id).then(setFav);
    window.addEventListener("favchange", onFavChange);
    return () => window.removeEventListener("favchange", onFavChange);
  }, [channel]);

  const onFatalPlayerError = useCallback(() => {
    setStatus("recovering");
    runCheck(true);
    toast.error("Playback failed", {
      description: "The stream stopped unexpectedly.",
      duration: 8000,
      action: { label: "Try again", onClick: () => runCheck(true) },
    });
  }, [runCheck]);

  const toggleFav = useCallback(async () => {
    if (!channel) return;
    if (fav) {
      await removeFavourite(channel.id);
      setFav(false);
      toast.success("Removed from favourites", { duration: 2000 });
    } else {
      await addFavourite(channel.id);
      setFav(true);
      toast.success(`${channel.name} added to favourites`, { duration: 2000 });
    }
  }, [channel, fav]);

  const onBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      navigate({ to: "/browse" });
    }
  }, [navigate]);

  if (cat.isLoading) return <div className="shimmer mx-auto aspect-video max-w-5xl rounded-xl" />;

  if (!channel) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center">
        <h1 className="font-display text-xl">Channel not found</h1>
        <p className="mt-2 text-sm text-[var(--text-tertiary)]">It may have been removed.</p>
        <Link to="/browse" className="btn-primary mt-4 inline-flex">
          Browse channels
        </Link>
      </div>
    );
  }

  const showPlayer = status === "online";
  const showRecovery = status === "blocked" || status === "timeout" || status === "error";
  const showLoading = status === "checking" || status === "recovering";

  const now = epg.data?.programs[channel.id]?.now;
  const next = epg.data?.programs[channel.id]?.next;
  const hasSchedule = !!(now || next);

  return (
    <div className="mx-auto max-w-[1600px] w-full px-1">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors active:scale-95"
      >
        <ArrowLeft className="size-3.5" /> Back
      </button>

      {/* Grid container: Cinema layout on desktop (lg and above), stacked on mobile */}
      <div
        className={`grid grid-cols-1 gap-6 ${hasSchedule ? "lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]" : "lg:grid-cols-[1fr_320px]"}`}
      >
        {/* Left column: Player screen & Metadata Details */}
        <div className="space-y-5 min-w-0">
          {showPlayer && (
            <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-black shadow-lg">
              <Player channel={channel} onFatalError={onFatalPlayerError} />
            </div>
          )}

          {showLoading && (
            <div className="shimmer relative aspect-video w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="size-8 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent)]" />
                <p className="text-[12px] text-[var(--text-tertiary)] font-medium animate-pulse">
                  {status === "checking"
                    ? "Verifying stream connection..."
                    : "Re-connecting to stream..."}
                </p>
              </div>
            </div>
          )}

          {showRecovery && (
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)] p-6">
              <div className="flex items-start gap-3">
                <StatusBadge status={status} size="md" />
                <div>
                  <h2 className="font-display text-base font-medium">
                    This channel isn't responding right now.
                  </h2>
                  <p className="mt-1 text-[13px] text-[var(--text-tertiary)]">
                    Public IPTV links come and go. Try an alternative below — they're picked from
                    channels in the same category.
                  </p>
                  <button
                    onClick={() => runCheck(true)}
                    className="btn-ghost mt-3 text-[12px] active:scale-95 transition-transform"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Details Card */}
          <div className="py-2 px-1">
            <header className="flex flex-wrap justify-between items-start gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                  <h1 className="truncate font-display text-xl sm:text-2xl font-semibold tracking-tight">
                    {channel.name}
                  </h1>
                  {flagCode && (
                    <img
                      src={`https://flagcdn.com/w20/${flagCode}.png`}
                      srcSet={`https://flagcdn.com/w40/${flagCode}.png 2x`}
                      width={20}
                      height={15}
                      alt={channel.country}
                      title={channel.country}
                      className="rounded-[2px] object-cover shrink-0 shadow-sm"
                    />
                  )}
                  <StatusBadge status={status} />
                </div>
                {catNames.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {catNames.map((n) => (
                      <span
                        key={n}
                        className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[11px] text-[var(--text-tertiary)] font-medium"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={toggleFav}
                  className="btn-ghost inline-flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  <Heart
                    className={`size-3.5 ${fav ? "fill-[var(--accent)] text-[var(--accent)]" : ""}`}
                  />
                  <span className="hidden sm:inline">{fav ? "Favourited" : "Favourite"}</span>
                </button>
                {channel.website && (
                  <a
                    href={channel.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost inline-flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <ExternalLink className="size-3.5" />
                    <span className="hidden sm:inline">Site</span>
                  </a>
                )}
              </div>
            </header>

            {/* Mobile EPG timeline view inline */}
            {hasSchedule && (
              <div className="mt-5 border-t border-[var(--border-subtle)] pt-4 block lg:hidden">
                <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
                  Broadcast Schedule
                </p>
                {now && (
                  <div className="mt-2.5 text-[13px] space-y-2">
                    <p className="text-[var(--text-primary)]">
                      <span className="mr-2 font-mono text-[9px] font-bold uppercase text-[var(--accent)] bg-[var(--accent-subtle)] px-1 py-0.5 rounded">
                        Now
                      </span>
                      <span className="font-medium">{now.title}</span>
                    </p>
                    {next && (
                      <p className="text-[12.5px] text-[var(--text-tertiary)]">
                        <span className="mr-2 font-mono text-[9px] font-medium uppercase border border-[var(--border-default)] px-1 py-0.5 rounded">
                          Next
                        </span>
                        {next.title}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Alternatives Shelf (Only visible on mobile view layout) */}
          <div className="block lg:hidden mt-6">
            {cat.data && (
              <AlternativesShelf
                catalog={cat.data}
                epg={epg.data}
                failedChannelId={channel.id}
                title={showRecovery ? "Working alternatives" : "More like this"}
              />
            )}
          </div>
        </div>

        {/* Right column: EPG & Recommendations Sidebar (Visible on desktop only) */}
        <div className="hidden lg:flex flex-col gap-5 min-w-0">
          {/* EPG Sidebar widget */}
          {hasSchedule && (
            <div className="py-1 border-b border-[var(--border-subtle)] pb-5">
              <h3 className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
                Broadcast Schedule
              </h3>
              <div className="space-y-4">
                {now && (
                  <div className="relative pl-4 border-l-2 border-[var(--accent)] py-1">
                    <span className="absolute -left-[5px] top-[14px] size-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    <p className="text-[9px] uppercase font-mono tracking-wider text-[var(--accent)] font-semibold">
                      Now playing
                    </p>
                    <h4 className="text-[13.5px] font-medium text-[var(--text-primary)] mt-0.5 leading-snug">
                      {now.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-1 font-mono">
                      {new Date(now.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(now.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
                {next && (
                  <div className="relative pl-4 border-l-2 border-[var(--border-default)] py-1">
                    <p className="text-[9px] uppercase font-mono tracking-wider text-[var(--text-tertiary)]">
                      Up next
                    </p>
                    <h4 className="text-[13.5px] font-medium text-[var(--text-secondary)] mt-0.5 leading-snug">
                      {next.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text-tertiary)] mt-1 font-mono">
                      {new Date(next.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(next.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Alternatives Sidebar widget */}
          <div className="py-1 flex flex-col">
            <h3 className="mb-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-[var(--text-tertiary)] shrink-0">
              {showRecovery ? "Working Alternatives" : "Recommended Channels"}
            </h3>
            <div className="space-y-3">
              {cat.data && (
                <AlternativesVerticalList
                  catalog={cat.data}
                  epg={epg.data}
                  failedChannelId={channel.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlternativesVerticalList({
  catalog,
  epg,
  failedChannelId,
}: {
  catalog: Catalog;
  epg?: EPGData;
  failedChannelId: string;
}) {
  const navigate = useNavigate();
  const player = usePlayer();

  const ids = useMemo(() => {
    const failed = failedChannelId ? catalog.channels[failedChannelId] : null;
    if (!failed) return catalog.indexes.all_ids.slice(0, 15);

    const failedCats = new Set(failed.categories);
    const failedCountry = failed.country;
    const scored: { id: string; score: number }[] = [];
    for (const id of catalog.indexes.all_ids) {
      if (id === failed.id) continue;
      const c = catalog.channels[id];
      if (!c) continue;
      const overlap = c.categories.filter((x: string) => failedCats.has(x)).length;
      if (overlap === 0) continue;
      const score = overlap * 10 + (c.country === failedCountry ? 5 : 0);
      scored.push({ id, score });
    }
    scored.sort((a, b) => b.score - a.score);
    const result = scored.slice(0, 15).map((s) => s.id);
    if (result.length < 10) {
      for (const id of catalog.indexes.all_ids) {
        if (id === failed.id) continue;
        if (!result.includes(id)) result.push(id);
        if (result.length >= 15) break;
      }
    }
    return result;
  }, [catalog, failedChannelId]);

  return (
    <div className="flex flex-col gap-2.5">
      {ids.map((id) => {
        const c = catalog.channels[id];
        if (!c) return null;
        const nowProg = epg?.programs[id]?.now;
        const code = c.country ? toFlagCode(c.country) : "";
        return (
          <button
            key={id}
            onClick={async () => {
              const first = c.streams[0];
              const toastId = `stream-${c.id}`;
              toast.loading(`Connecting to ${c.name}...`, { id: toastId });
              const result = await checkStream(first.url, first.referrer, first.user_agent);
              if (result === "online") {
                toast.dismiss(toastId);
                player.open(c);
                navigate({ to: "/watch/$channelId", params: { channelId: c.id } });
              } else {
                toast.error(c.name, {
                  id: toastId,
                  description: streamErrorMsg(result),
                  duration: 6000,
                  action: {
                    label: "Open anyway",
                    onClick: () => {
                      toast.dismiss(toastId);
                      player.open(c);
                      navigate({ to: "/watch/$channelId", params: { channelId: c.id } });
                    },
                  },
                });
              }
            }}
            className="flex items-start gap-3 w-full p-1.5 text-left rounded-lg hover:bg-[var(--surface-2)] transition-all duration-150 active:scale-[0.985]"
          >
            {/* Aspect-video larger thumbnail */}
            <div className="relative aspect-video w-28 h-[63px] shrink-0 rounded-md bg-[var(--surface-base)] border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden">
              {c.logo_url ? (
                <img src={c.logo_url} alt="" className="max-h-[75%] max-w-[75%] object-contain" />
              ) : (
                <Tv className="size-5 text-[var(--text-disabled)]" />
              )}
            </div>
            <div className="min-w-0 flex-1 py-0.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="truncate text-[13.5px] font-semibold text-[var(--text-primary)]">
                  {c.name}
                </span>
                {code && (
                  <img
                    src={`https://flagcdn.com/w20/${code}.png`}
                    width={14}
                    height={10}
                    alt=""
                    className="rounded-[1.5px] shrink-0 shadow-sm"
                  />
                )}
              </div>
              {nowProg ? (
                <p className="truncate text-[11.5px] text-[var(--text-secondary)] mt-1.5 font-medium">
                  <span className="mr-1 inline-block size-1.5 -translate-y-[2.5px] rounded-full bg-[var(--status-online)]" />
                  {nowProg.title}
                </p>
              ) : (
                <p className="text-[10px] text-[var(--text-disabled)] mt-1.5 font-mono text-[9px] uppercase tracking-wide">
                  No schedule data
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
