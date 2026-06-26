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
  workingStreamIndex: number;
  open: (channel: CatalogChannel, streamIndex?: number) => void;
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
  const [workingStreamIndex, setWorkingStreamIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("hidden");
  const [hostId, setHostId] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoElState, setVideoElState] = useState<HTMLVideoElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback((c: CatalogChannel, streamIndex = 0) => {
    setChannel(c);
    setWorkingStreamIndex(streamIndex);
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
      workingStreamIndex,
      open,
      close,
      videoEl: videoElState,
      mountInto,
      hostId,
      mode,
      setMode,
    }),
    [channel, workingStreamIndex, open, close, videoElState, mountInto, hostId, mode],
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
                setVideoElState(el);
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
