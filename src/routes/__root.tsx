import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { Toaster, toast } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, BottomTabBar } from "@/components/Header";
import { PlayerProvider } from "@/lib/player-context";
import { SearchModal } from "@/components/SearchModal";
import { InstallPrompt } from "@/components/InstallPrompt";

function NotFoundComponent() {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--surface-base)] px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-6xl font-semibold tracking-tight">404</h1>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">
          That page isn't here. Try the catalog or head home.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Link to="/" className="btn-primary">
            Home
          </Link>
          <Link to="/browse" className="btn-ghost">
            Browse channels
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--surface-base)] px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          The page didn't load. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#010102" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Pulse" },
      { title: "Pulse — Feel Everything" },
      {
        name: "description",
        content:
          "Browse and watch thousands of free, public IPTV channels. Verified live, every click.",
      },
      { property: "og:title", content: "Pulse — Feel Everything" },
      {
        property: "og:description",
        content: "Browse and watch thousands of free, public IPTV channels.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/icons/icon-192.png" },
      { rel: "preconnect", href: "https://iptv-org.github.io" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var viewed = localStorage.getItem('pulse_landing_viewed');
                  if (!viewed && window.location.pathname === '/') {
                    document.documentElement.setAttribute('data-landing-active', 'true');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({
    select: (s) => {
      const lastMatch = s.matches[s.matches.length - 1];
      return lastMatch ? lastMatch.pathname : s.location.pathname;
    },
  });
  const [phase, setPhase] = useState<"enter" | "idle">("enter");

  useEffect(() => {
    setPhase("enter");
    const t = setTimeout(() => setPhase("idle"), 280);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div key={pathname} className={phase === "enter" ? "route-enter" : ""}>
      {children}
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Register service worker for PWA
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      toast.success("Back online", {
        id: "network-status",
        description: "Connections restored.",
        duration: 3000,
      });
    };
    const handleOffline = () => {
      toast.error("Network Connection Lost", {
        id: "network-status",
        description: "You are currently offline. Stream checks and playback may fail.",
        duration: Infinity,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const isAlt = e.altKey;
      if ((isCmdOrCtrl || isAlt) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <div className="min-h-screen bg-[var(--surface-base)] pb-[calc(env(safe-area-inset-bottom)+64px)] sm:pb-0">
          <Header onSearchOpen={() => setSearchOpen(true)} />
          <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
            <RouteTransition>
              <Outlet />
            </RouteTransition>
          </main>
          <BottomTabBar />
          <InstallPrompt />
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
          <Toaster
            theme="dark"
            position="top-center"
            duration={6000}
            toastOptions={{
              style: {
                background: "var(--surface-2)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
                borderRadius: 10,
                fontFamily: "var(--font-body)",
              },
            }}
          />
        </div>
      </PlayerProvider>
    </QueryClientProvider>
  );
}
