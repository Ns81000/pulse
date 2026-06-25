import { useEffect, useRef, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { X, Maximize2, Play, Pause } from "lucide-react";
import { usePlayer } from "@/lib/player-context";

export function MiniPlayer() {
  const { channel, close, mountInto, videoEl } = usePlayer();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onWatchPage = channel ? pathname === `/watch/${channel.id}` : false;
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  // Mount the shared <video> here when not on the watch page
  useEffect(() => {
    if (!channel) return;
    if (onWatchPage) return;
    if (!containerRef.current) return;
    mountInto(containerRef.current);
  }, [channel, onWatchPage, mountInto]);

  useEffect(() => {
    if (!videoEl) return;
    const sync = () => setPlaying(!videoEl.paused);
    sync();
    videoEl.addEventListener("play", sync);
    videoEl.addEventListener("pause", sync);
    return () => {
      videoEl.removeEventListener("play", sync);
      videoEl.removeEventListener("pause", sync);
    };
  }, [videoEl]);

  if (!channel || onWatchPage) return null;

  const restore = () => navigate({ to: "/watch/$channelId", params: { channelId: channel.id } });
  const togglePlay = () => {
    if (!videoEl) return;
    if (videoEl.paused) videoEl.play().catch(() => {}); else videoEl.pause();
  };

  return (
    <div className="slide-up fixed bottom-[calc(env(safe-area-inset-bottom)+72px)] right-3 z-40 w-[280px] overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-1)] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] sm:bottom-4 sm:right-4 sm:w-[340px]">
      <div className="relative">
        <div ref={containerRef} className="aspect-video w-full bg-black" />
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="absolute inset-0 grid place-items-center bg-black/0 transition-colors hover:bg-black/30"
        >
          {!playing && (
            <span className="grid size-10 place-items-center rounded-full bg-black/60 text-white">
              <Play className="size-4 translate-x-0.5" fill="currentColor" />
            </span>
          )}
        </button>
      </div>
      <div className="flex items-center gap-2 border-t border-[var(--border-subtle)] px-3 py-2">
        <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className="grid size-7 shrink-0 place-items-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]">
          {playing ? <Pause className="size-3.5" fill="currentColor" /> : <Play className="size-3.5 translate-x-px" fill="currentColor" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] font-medium">{channel.name}</p>
          <p className="text-[10.5px] text-[var(--text-tertiary)]">Tap to restore</p>
        </div>
        <button onClick={restore} aria-label="Restore" className="grid size-7 shrink-0 place-items-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]">
          <Maximize2 className="size-3.5" />
        </button>
        <button onClick={close} aria-label="Close" className="grid size-7 shrink-0 place-items-center rounded-md text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]">
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
