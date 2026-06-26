import { useEffect, useRef, useState, useCallback } from "react";
import type HlsType from "hls.js";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  PictureInPicture2,
  Settings,
  RotateCcw,
} from "lucide-react";
import type { CatalogChannel } from "@/lib/types";
import { usePlayer } from "@/lib/player-context";
import { recordHealth } from "@/lib/idb";

type LoadState = "connecting" | "ready" | "buffering" | "error";

interface Props {
  channel: CatalogChannel;
  onFatalError?: () => void;
  compact?: boolean;
}

export function Player({ channel, onFatalError, compact }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<HlsType | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const player = usePlayer();

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeStreamIdx, setActiveStreamIdx] = useState(player.workingStreamIndex);
  const [loadState, setLoadState] = useState<LoadState>("connecting");
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [pip, setPip] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [levels, setLevels] = useState<{ index: number; height?: number; bitrate: number }[]>([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [controlsVisible, setControlsVisible] = useState(true);
  const volumeRef = useRef<HTMLDivElement>(null);

  // ── Sync stream index from context ────────────────────────────────────────
  useEffect(() => {
    setActiveStreamIdx(player.workingStreamIndex);
  }, [player.workingStreamIndex]);

  // ── Stream fallback ────────────────────────────────────────────────────────
  const tryNextStream = useCallback(() => {
    if (activeStreamIdx < channel.streams.length - 1) {
      console.warn(
        `Stream ${activeStreamIdx} of channel ${channel.name} failed, trying fallback stream ${activeStreamIdx + 1}`,
      );
      setLoadState("connecting");
      setActiveStreamIdx((prev) => prev + 1);
      return true;
    }
    return false;
  }, [activeStreamIdx, channel.streams.length, channel.name]);

  // ── Mount shared video element ─────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || !player.videoEl) return;
    player.mountInto(containerRef.current);
    return () => {
      player.mountInto(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel.id, player.videoEl]);

  // ── HLS / source setup ────────────────────────────────────────────────────
  useEffect(() => {
    const v = player.videoEl;
    if (!v) return;
    const stream = channel.streams[activeStreamIdx] || channel.streams[0];
    if (!stream) return;

    setLoadState("connecting");
    let destroyed = false;

    const attemptPlay = () => {
      v.play().catch((err) => {
        console.warn("Playback blocked, attempting muted autoplay:", err);
        v.muted = true;
        v.play().catch((err2) => {
          console.error("Muted playback also blocked:", err2);
        });
      });
    };

    (async () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {
          /* ignore */
        }
        hlsRef.current = null;
      }

      const HlsMod = (await import("hls.js")).default;
      if (HlsMod.isSupported()) {
        const hls = new HlsMod({
          enableWorker: true,
          lowLatencyMode: false,
          maxBufferLength: 30,
          xhrSetup: (xhr) => {
            try {
              if (stream.referrer) xhr.setRequestHeader("Referer", stream.referrer);
            } catch {
              /* ignore */
            }
          },
        });
        hlsRef.current = hls;
        hls.loadSource(stream.url);
        hls.attachMedia(v);
        hls.on(HlsMod.Events.MANIFEST_PARSED, () => {
          if (destroyed) return;
          setLevels(hls.levels.map((l, i) => ({ index: i, height: l.height, bitrate: l.bitrate })));
          setCurrentLevel(hls.currentLevel);
          attemptPlay();
        });
        hls.on(HlsMod.Events.LEVEL_SWITCHED, (_e, data) => setCurrentLevel(data.level));
        hls.on(HlsMod.Events.ERROR, (_e, data) => {
          if (!data.fatal) return;
          if (data.type === HlsMod.ErrorTypes.MEDIA_ERROR) {
            try {
              hls.recoverMediaError();
              return;
            } catch {
              /* ignore */
            }
          }
          if (data.type === HlsMod.ErrorTypes.NETWORK_ERROR) {
            try {
              hls.startLoad();
              return;
            } catch {
              /* ignore */
            }
          }
          if (tryNextStream()) return;
          setLoadState("error");
          onFatalError?.();
        });
      } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
        v.src = stream.url;
        attemptPlay();
      } else {
        if (tryNextStream()) return;
        setLoadState("error");
        onFatalError?.();
      }
    })();

    return () => {
      destroyed = true;
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {}
        hlsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel.id, player.videoEl, activeStreamIdx, tryNextStream]);

  // ── Video event listeners ─────────────────────────────────────────────────
  useEffect(() => {
    const v = player.videoEl;
    if (!v) return;
    const onPlay = () => {
      setPlaying(true);
      setLoadState("ready");
      if (activeStreamIdx !== player.workingStreamIndex) {
        recordHealth(channel.id, "online", activeStreamIdx).catch(() => {});
      }
    };
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoadState((s) => (s === "ready" ? "buffering" : s));
    const onPlaying = () => setLoadState("ready");
    const onErr = () => {
      if (tryNextStream()) return;
      setLoadState("error");
      onFatalError?.();
    };
    const onVol = () => {
      setMuted(v.muted);
      setVolume(v.volume);
    };
    const onEnterPip = () => setPip(true);
    const onLeavePip = () => setPip(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("error", onErr);
    v.addEventListener("volumechange", onVol);
    v.addEventListener("enterpictureinpicture", onEnterPip);
    v.addEventListener("leavepictureinpicture", onLeavePip);
    setPlaying(!v.paused);
    setMuted(v.muted);
    setVolume(v.volume);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("error", onErr);
      v.removeEventListener("volumechange", onVol);
      v.removeEventListener("enterpictureinpicture", onEnterPip);
      v.removeEventListener("leavepictureinpicture", onLeavePip);
    };
  }, [
    player.videoEl,
    onFatalError,
    activeStreamIdx,
    player.workingStreamIndex,
    channel.id,
    tryNextStream,
  ]);

  // ── Fullscreen sync ───────────────────────────────────────────────────────
  useEffect(() => {
    const onFs = () => {
      const isFs = Boolean(document.fullscreenElement);
      setFullscreen(isFs);
      // Unlock orientation whenever fullscreen exits (covers native back-gesture too)
      if (!isFs) {
        try {
          screen.orientation.unlock();
        } catch {
          /* desktop — ignored */
        }
      }
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // ── Close volume slider on outside click ──────────────────────────────────
  useEffect(() => {
    if (!showVolumeSlider) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setShowVolumeSlider(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [showVolumeSlider]);

  // ── Auto-hide controls (works in normal + fullscreen + touch) ─────────────
  // Show controls and schedule hide after 2.5s of inactivity.
  const armHide = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2500);
  }, []);

  useEffect(() => {
    armHide();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [armHide]);

  // Cleanup click timer on unmount
  useEffect(() => {
    return () => {
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, []);

  // ── Controls ──────────────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const v = player.videoEl;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }, [player.videoEl]);

  const toggleMute = useCallback(() => {
    const v = player.videoEl;
    if (!v) return;
    v.muted = !v.muted;
  }, [player.videoEl]);

  const onVolume = useCallback(
    (val: number) => {
      const v = player.videoEl;
      if (!v) return;
      v.volume = val;
      v.muted = val === 0;
    },
    [player.videoEl],
  );

  const toggleFs = useCallback(async () => {
    const el = wrapRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        // Unlock orientation when leaving fullscreen
        try {
          screen.orientation.unlock();
        } catch {
          /* not supported on desktop */
        }
      } else {
        await el.requestFullscreen();
        // Lock to landscape on mobile after entering fullscreen
        try {
          await (screen.orientation as any).lock("landscape");
        } catch {
          /* desktop or unsupported browser — silently ignored */
        }
      }
    } catch {}
  }, []);

  const togglePip = useCallback(async () => {
    const v = player.videoEl;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await (v as any).requestPictureInPicture();
    } catch {}
  }, [player.videoEl]);

  const reload = useCallback(() => {
    const v = player.videoEl;
    if (!v) return;
    setLoadState("connecting");
    try {
      if (hlsRef.current) hlsRef.current.startLoad();
      v.play().catch(() => {});
    } catch {}
  }, [player.videoEl]);

  // Clicking/tapping anywhere on the video toggles play/pause.
  // onTouchEnd handles touch devices immediately (no 300ms delay).
  // onClick handles mouse clicks on desktop.
  // A flag prevents both firing on the same interaction.
  const didTouchRef = useRef(false);

  const handleVideoClick = useCallback(() => {
    if (didTouchRef.current) {
      didTouchRef.current = false;
      return;
    }
    armHide();
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      togglePlay();
    }, 150);
  }, [armHide, togglePlay]);

  const handleVideoTouch = useCallback(() => {
    didTouchRef.current = true;
    armHide();
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      togglePlay();
    }, 150);
  }, [armHide, togglePlay]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "f" || e.key === "F") toggleFs();
      else if (e.key === "m" || e.key === "M") toggleMute();
      else if (e.key === "p" || e.key === "P") togglePip();
      else if (e.key === "ArrowUp") {
        e.preventDefault();
        onVolume(Math.min(1, volume + 0.1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        onVolume(Math.max(0, volume - 0.1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [togglePlay, toggleFs, toggleMute, togglePip, volume]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={wrapRef}
      className={`player-wrap ${controlsVisible ? "controls-visible" : ""} ${compact ? "rounded-lg" : "rounded-xl"} overflow-hidden`}
      onMouseMove={armHide}
    >
      {/* Video mount point */}
      <div ref={containerRef} className="aspect-video w-full" />

      {/* Full-area click/tap overlay — above controls gradient, toggles play/pause */}
      <button
        aria-label={playing ? "Pause" : "Play"}
        onClick={handleVideoClick}
        onTouchEnd={(e) => {
          e.preventDefault();
          handleVideoTouch();
        }}
        className="absolute inset-0 z-[15] h-full w-full bg-transparent"
        style={{ WebkitTapHighlightColor: "transparent", cursor: "default" }}
      />

      {/* Top status badge */}
      <div className="pointer-events-none absolute left-3 top-3 z-[20] flex items-center gap-2">
        {loadState === "connecting" && (
          <span className="badge badge--checking">
            <span className="dot" /> Connecting
          </span>
        )}
        {loadState === "buffering" && (
          <span className="badge badge--checking">
            <span className="dot" /> Buffering
          </span>
        )}
        {loadState === "ready" && playing && (
          <span className="badge badge--live">
            <span className="dot" /> Live
          </span>
        )}
      </div>

      {/* Center play button when paused — only covers the center, not the controls bar */}
      {!playing && loadState !== "error" && (
        <button
          aria-label="Play"
          onClick={(e) => {
            e.stopPropagation();
            if (clickTimer.current) clearTimeout(clickTimer.current);
            togglePlay();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (clickTimer.current) clearTimeout(clickTimer.current);
            togglePlay();
          }}
          className="absolute inset-x-0 top-0 bottom-[60px] z-[25] grid place-items-center"
        >
          <span className="ctrl-btn ctrl-btn--lg">
            <Play className="size-7 translate-x-0.5" fill="currentColor" />
          </span>
        </button>
      )}

      {/* Error state */}
      {loadState === "error" && (
        <div className="absolute inset-0 z-[25] grid place-items-center bg-black/80 text-center text-white">
          <div className="max-w-xs">
            <p className="text-[13px] text-white/80">This stream isn't responding.</p>
            <button
              onClick={reload}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-[12px] font-medium text-black hover:bg-white/90"
            >
              <RotateCcw className="size-3.5" /> Try again
            </button>
          </div>
        </div>
      )}

      {/* Controls bar — auto-hidden, sits above click overlay */}
      <div className="player-controls" style={{ zIndex: 20 }}>
        <div />
        <div className="flex items-center gap-1 px-3 pb-3 sm:gap-2 sm:px-4 sm:pb-4">
          <button aria-label={playing ? "Pause" : "Play"} onClick={togglePlay} className="ctrl-btn">
            {playing ? (
              <Pause className="size-4" fill="currentColor" />
            ) : (
              <Play className="size-4 translate-x-0.5" fill="currentColor" />
            )}
          </button>

          <div ref={volumeRef} className="group relative flex items-center gap-2">
            <button
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => {
                const isTouch = window.matchMedia("(hover: none)").matches;
                if (isTouch) setShowVolumeSlider((s) => !s);
                else toggleMute();
              }}
              className="ctrl-btn"
            >
              {muted || volume === 0 ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => onVolume(Number(e.target.value))}
              className="vol-slider hidden group-hover:block sm:group-hover:block"
              style={{ display: showVolumeSlider ? "block" : undefined }}
              aria-label="Volume"
            />
          </div>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {levels.length > 1 && (
              <div className="relative">
                <button
                  aria-label="Quality"
                  onClick={() => setShowSettings((s) => !s)}
                  className="ctrl-btn"
                >
                  <Settings className="size-4" />
                </button>
                {showSettings && (
                  <div className="absolute bottom-[44px] right-0 min-w-[140px] overflow-hidden rounded-lg border border-white/10 bg-black/90 p-1 backdrop-blur">
                    <button
                      onClick={() => {
                        if (hlsRef.current) hlsRef.current.currentLevel = -1;
                        setShowSettings(false);
                      }}
                      className={`block w-full rounded-md px-3 py-1.5 text-left text-[12px] text-white hover:bg-white/10 ${currentLevel === -1 ? "bg-white/10" : ""}`}
                    >
                      Auto
                    </button>
                    {levels
                      .slice()
                      .reverse()
                      .map((l) => (
                        <button
                          key={l.index}
                          onClick={() => {
                            if (hlsRef.current) hlsRef.current.currentLevel = l.index;
                            setShowSettings(false);
                          }}
                          className={`block w-full rounded-md px-3 py-1.5 text-left text-[12px] text-white hover:bg-white/10 ${currentLevel === l.index ? "bg-white/10" : ""}`}
                        >
                          {l.height ? `${l.height}p` : `${Math.round(l.bitrate / 1000)}k`}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}
            {typeof document !== "undefined" && "pictureInPictureEnabled" in document && (
              <button aria-label="Picture in picture" onClick={togglePip} className="ctrl-btn">
                <PictureInPicture2 className="size-4" />
              </button>
            )}
            <button
              aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
              onClick={toggleFs}
              className="ctrl-btn"
            >
              {fullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
