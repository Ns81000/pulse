import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type { CatalogChannel } from "./types";

type Mode = "inline" | "mini" | "hidden";

interface PlayerState {
  channel: CatalogChannel | null;
  open: (channel: CatalogChannel) => void;
  close: () => void;
  videoEl: HTMLVideoElement | null;
  mountInto: (el: HTMLElement | null) => void;
  hostId: number;
  setMode: (m: Mode) => void;
  mode: Mode;
}

const PlayerCtx = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [channel, setChannel] = useState<CatalogChannel | null>(null);
  const [mode, setMode] = useState<Mode>("hidden");
  const [hostId, setHostId] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback((c: CatalogChannel) => {
    setChannel(c);
    setMode("inline");
  }, []);

  const close = useCallback(() => {
    setChannel(null);
    setMode("hidden");
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
        v.removeAttribute("src");
        v.load();
      } catch {}
    }
  }, []);

  // Reparent the SAME video element into the requested host container.
  // This preserves playback + audio + buffered ranges across navigations.
  const mountInto = useCallback((el: HTMLElement | null) => {
    const v = videoRef.current;
    if (!v) return;
    const target = el ?? stageRef.current;
    if (!target) return;
    if (v.parentElement !== target) target.appendChild(v);
    setHostId((n) => n + 1);
  }, []);

  const value = useMemo<PlayerState>(
    () => ({
      channel,
      open,
      close,
      videoEl: videoRef.current,
      mountInto,
      hostId,
      mode,
      setMode,
    }),
    [channel, open, close, mountInto, hostId, mode],
  );

  return (
    <PlayerCtx.Provider value={value}>
      {children}
      {/* Hidden stage that owns the <video> element when not mounted in a host */}
      {mounted &&
        createPortal(
          <div
            ref={stageRef}
            aria-hidden
            style={{
              position: "fixed",
              left: -99999,
              top: -99999,
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
          >
            <video
              ref={(el) => {
                videoRef.current = el;
              }}
              playsInline
              // No `controls` — we render our own UI
            />
          </div>,
          document.body,
        )}
    </PlayerCtx.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerCtx);
  if (!ctx) throw new Error("usePlayer outside PlayerProvider");
  return ctx;
}
