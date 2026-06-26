import { useEffect, useState } from "react";
import { Download, X, Monitor, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Platform = "android" | "ios" | "desktop" | null;

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

function isInStandaloneMode(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      (window.navigator as { standalone?: boolean }).standalone === true)
  );
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>(null);
  const [iosInstructions, setIosInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already installed as PWA
    if (isInStandaloneMode()) return;

    // Don't show if previously dismissed in this session
    const wasDismissed = sessionStorage.getItem("pwa-prompt-dismissed");
    if (wasDismissed) return;

    const p = detectPlatform();
    setPlatform(p);

    // Android / Desktop: listen for browser's install event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Small delay so page loads first
      setTimeout(() => setShow(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS: no beforeinstallprompt — show manual instructions after delay
    if (p === "ios") {
      const t = setTimeout(() => setShow(true), 3500);
      return () => clearTimeout(t);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (platform === "ios") {
      setIosInstructions(true);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShow(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem("pwa-prompt-dismissed", "1");
  };

  if (!show || dismissed) return null;
  // Only show on iOS without event, or when we have a deferredPrompt
  if (platform !== "ios" && !deferredPrompt) return null;

  return (
    <>
      {/* Install banner */}
      <div
        className="pwa-banner fixed bottom-[calc(env(safe-area-inset-bottom)+72px)] left-3 right-3 z-50 sm:bottom-5 sm:left-auto sm:right-5 sm:w-[340px]"
        role="dialog"
        aria-label="Install Pulse app"
      >
        <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] p-4 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)]">
          {/* App icon */}
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-3)]">
            <svg
              width="28"
              height="28"
              viewBox="-7 -7 131 131"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="0" cy="0" r="7" fill="#34343a" />
              <circle cx="0" cy="22" r="7" fill="#e5484d" />
              <circle cx="0" cy="44" r="7" fill="#e5484d" />
              <circle cx="0" cy="66" r="7" fill="#e5484d" />
              <circle cx="0" cy="88" r="7" fill="#e5484d" />
              <circle cx="0" cy="110" r="7" fill="#e5484d" />
              <circle cx="22" cy="0" r="7" fill="#34343a" />
              <circle cx="22" cy="22" r="7" fill="#34343a" />
              <circle cx="22" cy="44" r="7" fill="#e5484d" />
              <circle cx="22" cy="66" r="7" fill="#34343a" />
              <circle cx="22" cy="88" r="7" fill="#34343a" />
              <circle cx="22" cy="110" r="7" fill="#e5484d" />
              <circle cx="44" cy="0" r="7" fill="#34343a" />
              <circle cx="44" cy="22" r="7" fill="#34343a" />
              <circle cx="44" cy="44" r="7" fill="#34343a" />
              <circle cx="44" cy="66" r="7" fill="#34343a" />
              <circle cx="44" cy="88" r="7" fill="#34343a" />
              <circle cx="44" cy="110" r="7" fill="#e5484d" />
              <circle cx="66" cy="0" r="7" fill="#e5484d" />
              <circle cx="66" cy="22" r="7" fill="#e5484d" />
              <circle cx="66" cy="44" r="7" fill="#e5484d" />
              <circle cx="66" cy="66" r="7" fill="#e5484d" />
              <circle cx="66" cy="88" r="7" fill="#e5484d" />
              <circle cx="66" cy="110" r="7" fill="#e5484d" />
              <circle cx="88" cy="0" r="7" fill="#e5484d" />
              <circle cx="88" cy="22" r="7" fill="#34343a" />
              <circle cx="88" cy="44" r="7" fill="#34343a" />
              <circle cx="88" cy="66" r="7" fill="#e5484d" />
              <circle cx="88" cy="88" r="7" fill="#34343a" />
              <circle cx="88" cy="110" r="7" fill="#e5484d" />
              <circle cx="110" cy="0" r="7" fill="#34343a" />
              <circle cx="110" cy="22" r="7" fill="#e5484d" />
              <circle cx="110" cy="44" r="7" fill="#e5484d" />
              <circle cx="110" cy="66" r="7" fill="#34343a" />
              <circle cx="110" cy="88" r="7" fill="#e5484d" />
              <circle cx="110" cy="110" r="7" fill="#34343a" />
            </svg>
          </div>

          {/* Text */}
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">Install Pulse</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-[var(--text-tertiary)]">
              {platform === "desktop"
                ? "Add to your desktop for instant access"
                : "Add to Home Screen for the best experience"}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleInstall}
                className="flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-[12px] font-semibold text-white transition-all active:scale-95"
              >
                {platform === "desktop" ? (
                  <Monitor className="size-3" />
                ) : (
                  <Smartphone className="size-3" />
                )}
                {platform === "ios" ? "How to install" : "Install"}
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
              >
                Not now
              </button>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="flex size-6 shrink-0 items-center justify-center rounded-full text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      {/* iOS instructions sheet */}
      {iosInstructions && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIosInstructions(false)}
          />
          <div className="relative w-full max-w-sm rounded-t-3xl border border-[var(--border-default)] bg-[var(--surface-1)] p-6 pb-[calc(env(safe-area-inset-bottom)+24px)] sm:rounded-2xl sm:pb-6 slide-up">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-[16px] font-semibold">Add to Home Screen</h2>
              <button
                type="button"
                onClick={() => setIosInstructions(false)}
                className="flex size-7 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--text-secondary)]"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">
                  1
                </span>
                <p className="text-[13.5px] text-[var(--text-secondary)]">
                  Tap the <strong className="text-[var(--text-primary)]">Share</strong> button{" "}
                  <span className="inline-flex size-5 items-center justify-center rounded bg-[var(--surface-3)] align-middle text-[11px]">
                    ⎙
                  </span>{" "}
                  at the bottom of your browser
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">
                  2
                </span>
                <p className="text-[13.5px] text-[var(--text-secondary)]">
                  Scroll down and tap{" "}
                  <strong className="text-[var(--text-primary)]">Add to Home Screen</strong>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white">
                  3
                </span>
                <p className="text-[13.5px] text-[var(--text-secondary)]">
                  Tap <strong className="text-[var(--text-primary)]">Add</strong> — Pulse will
                  appear on your home screen
                </p>
              </li>
            </ol>

            <button
              type="button"
              onClick={() => {
                setIosInstructions(false);
                handleDismiss();
              }}
              className="mt-6 w-full rounded-xl bg-[var(--surface-3)] py-3 text-[13.5px] font-medium text-[var(--text-primary)] transition-all active:scale-[0.98]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
