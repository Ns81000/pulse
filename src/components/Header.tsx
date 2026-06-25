import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Tv, Heart, Home } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/browse", label: "Browse", icon: Tv },
  { to: "/favourites", label: "Library", icon: Heart },
] as const;

export function Header({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [shortcutText, setShortcutText] = useState("Ctrl+K");

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent.indexOf("Mac") !== -1) {
      setShortcutText("⌘K");
    }
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[color:var(--surface-base)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 transition-transform active:scale-98"
        >
          <div className="grid size-6 place-items-center rounded-md bg-gradient-to-br from-[#ff4a54] to-[#9e1a22] shadow-[0_0_8px_rgba(229,72,77,0.3)]">
            <span className="font-mono text-[10px] font-bold text-white">T</span>
          </div>
          <span className="font-display text-[15px] font-semibold tracking-tight">Tela</span>
        </Link>

        <nav className="hidden items-center gap-0.5 sm:flex">
          {NAV.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchOpen}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] px-3 py-1.5 text-[12.5px] text-[var(--text-tertiary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] sm:min-w-[220px]"
          >
            <Search className="size-3.5" />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="keycap-kbd hidden sm:inline-flex">{shortcutText}</kbd>
          </button>
        </div>
      </div>
    </header>
  );
}

export function BottomTabBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-[var(--border-subtle)] glassmorphic-blur pb-[env(safe-area-inset-bottom)] sm:hidden">
      <ul className="flex">
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
          return (
            <li key={n.to} className="flex-1">
              <Link
                to={n.to}
                className={`flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] transition-all duration-100 active:scale-92 ${
                  active ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"
                }`}
              >
                <div className="relative flex flex-col items-center">
                  <Icon className="size-[18px]" strokeWidth={active ? 2.2 : 1.8} />
                  {active && (
                    <span className="absolute -bottom-1.5 size-1 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                  )}
                </div>
                <span className="mt-1.5 text-[9.5px] font-medium tracking-wide">{n.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
