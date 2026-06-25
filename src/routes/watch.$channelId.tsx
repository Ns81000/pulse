import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ArrowLeft, Heart, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useCatalog, useEpg, checkStream } from "@/lib/data-hooks";
import { Player } from "@/components/Player";
import { AlternativesShelf } from "@/components/AlternativesShelf";
import { StatusBadge } from "@/components/StatusBadge";
import { usePlayer } from "@/lib/player-context";
import { addFavourite, removeFavourite, isFavourite as checkFav, recordHistory } from "@/lib/idb";
import type { ChannelStatus } from "@/lib/types";
import { streamErrorMsg } from "@/lib/stream-messages";

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
  const flag = useMemo(() => {
    if (!cat.data || !channel) return "";
    return cat.data.meta.countries.find((c) => c.code === channel.country)?.flag ?? "";
  }, [cat.data, channel]);
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
      const s = channel.streams[0];
      const result = await checkStream(s.url, s.referrer, s.user_agent, force);
      setStatus(result);
      if (result === "online") {
        open(channel);
        await recordHistory(channel.id);
      }
      // No toast here — the page renders an inline recovery block for errors,
      // which is more informative and avoids duplicate feedback.
    },
    [channel, open],
  );

  useEffect(() => {
    if (!channel) {
      // Catalog still loading — don't leave status stuck on "checking"
      if (!cat.isLoading) setStatus("error");
      return;
    }
    runCheck();
    checkFav(channel.id).then(setFav);
  }, [channel, runCheck, cat.isLoading]);

  // Stay in sync when favourite toggled from another component
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

  return (
    <div className="mx-auto max-w-5xl">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="size-3.5" /> Back
      </button>

      {showPlayer && (
        <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-black">
          <Player channel={channel} onFatalError={onFatalPlayerError} />
        </div>
      )}

      {showLoading && (
        <div className="shimmer relative aspect-video w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="size-8 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent)]" />
            <p className="text-[12px] text-[var(--text-tertiary)] font-medium">
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
              <button onClick={() => runCheck(true)} className="btn-ghost mt-3 text-[12px]">
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h1 className="truncate font-display text-2xl font-semibold tracking-tight">
              {channel.name}
            </h1>
            {flag && (
              <span className="text-xl leading-none" aria-hidden>
                {flag}
              </span>
            )}
            <StatusBadge status={status} />
          </div>
          {now ? (
            <div className="mt-3 text-[13px]">
              <p className="text-[var(--text-primary)]">
                <span className="mr-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
                  Now
                </span>
                <span className="font-medium">{now.title}</span>
              </p>
              {next && (
                <p className="mt-1 text-[12.5px] text-[var(--text-tertiary)]">
                  <span className="mr-1.5 font-mono text-[10px] uppercase tracking-wider">
                    Next
                  </span>
                  {next.title}
                </p>
              )}
            </div>
          ) : null}
          {catNames.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {catNames.map((n) => (
                <span
                  key={n}
                  className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[11px] text-[var(--text-tertiary)]"
                >
                  {n}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={toggleFav} className="btn-ghost inline-flex items-center gap-1.5">
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
              className="btn-ghost inline-flex items-center gap-1.5"
            >
              <ExternalLink className="size-3.5" />
              <span className="hidden sm:inline">Site</span>
            </a>
          )}
        </div>
      </header>

      {cat.data && (
        <AlternativesShelf
          catalog={cat.data}
          epg={epg.data}
          failedChannelId={channel.id}
          title={showRecovery ? "Working alternatives" : "More like this"}
        />
      )}
    </div>
  );
}
