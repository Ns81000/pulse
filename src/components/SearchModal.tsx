import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search as SearchIcon,
  Tv,
  Globe2,
  Tag,
  Languages,
  CornerDownLeft,
  X,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";
import {
  useCatalog,
  useStreamHealth,
  useUserCountry,
  sortChannels,
  queueBackgroundCheck,
} from "@/lib/data-hooks";
import { usePlayer } from "@/lib/player-context";
import { checkStream } from "@/lib/data-hooks";
import { toast } from "sonner";
import { listHistory } from "@/lib/idb";
import { streamErrorMsg } from "@/lib/stream-messages";

const CODE_MAP: Record<string, string> = { uk: "gb", int: "" };
function toFlagCode(code: string): string {
  const lower = code.toLowerCase();
  return CODE_MAP[lower] ?? lower;
}

type Group = "Channels" | "Countries" | "Categories" | "Languages";

type Row = {
  group: Group;
  id: string;
  label: string;
  sub?: string;
  countryCode?: string;
  logoUrl?: string | null;
  isFilter: boolean;
  filterType?: "country" | "category" | "language";
  filterCode?: string;
  action: () => void;
};

type FilterPill = {
  type: "country" | "category" | "language";
  code: string;
  label: string;
  countryCode?: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const cat = useCatalog();
  const navigate = useNavigate();
  const player = usePlayer();
  const health = useStreamHealth();
  const userCountry = useUserCountry();

  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [pills, setPills] = useState<FilterPill[]>([]);
  const [mounted, setMounted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isUsingKeyboard = useRef(false);

  // Animate in
  useEffect(() => {
    if (open) {
      setMounted(false);
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMounted(true));
      });
      return () => cancelAnimationFrame(t);
    } else {
      setMounted(false);
    }
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 150);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    if (open) {
      setQ("");
      setDebouncedQ("");
      setActive(0);
      setPills([]);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const h = await listHistory();
      const seen = new Set<string>();
      setRecent(
        h
          .filter((x) => (seen.has(x.channelId) ? false : (seen.add(x.channelId), true)))
          .slice(0, 6)
          .map((x) => x.channelId),
      );
    })();
  }, [open]);

  const addPill = useCallback((pill: FilterPill) => {
    setPills((prev) => {
      const next = prev.filter((p) => p.type !== pill.type);
      return [...next, pill];
    });
    setQ("");
    setDebouncedQ("");
    setActive(0);
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);

  const removePill = useCallback((type: FilterPill["type"]) => {
    setPills((prev) => prev.filter((p) => p.type !== type));
    setTimeout(() => inputRef.current?.focus(), 10);
  }, []);

  const pillSets = useMemo(() => {
    if (!cat.data) return null;
    const sets: Set<string>[] = [];
    for (const pill of pills) {
      if (pill.type === "country") {
        const ids = cat.data.indexes.by_country[pill.code];
        if (ids) sets.push(new Set(ids));
      } else if (pill.type === "category") {
        const ids = cat.data.indexes.by_category[pill.code];
        if (ids) sets.push(new Set(ids));
      } else if (pill.type === "language") {
        const ids = cat.data.indexes.by_language[pill.code];
        if (ids) sets.push(new Set(ids));
      }
    }
    return sets;
  }, [cat.data, pills]);

  // Trending: full hybrid sort (health + geo), then 1 per category for variety
  const trendingChannels = useMemo(() => {
    if (!open || !cat.data) return [];
    // Run the same sort used everywhere else in the app
    const sorted = sortChannels(cat.data.indexes.all_ids, cat.data.channels, userCountry, health);
    // Pick 1 representative per category, prefer confirmed-online channels
    const seenCategories = new Set<string>();
    const result: string[] = [];
    for (const id of sorted) {
      if (result.length >= 12) break;
      const ch = cat.data.channels[id];
      if (!ch) continue;
      // Skip confirmed-dead channels
      const h = health[id];
      if (h && h !== "online") continue;
      // Pick first unseen category
      const cat1 = ch.categories[0];
      if (!cat1 || seenCategories.has(cat1)) continue;
      seenCategories.add(cat1);
      result.push(id);
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, cat.data, userCountry]);

  // Queue background pings for trending channels so health updates reactively
  useEffect(() => {
    if (!cat.data || trendingChannels.length === 0) return;
    for (const id of trendingChannels) {
      const ch = cat.data.channels[id];
      if (ch) queueBackgroundCheck(ch.id, ch.streams);
    }
  }, [cat.data, trendingChannels]);

  const playChannel = useCallback(
    async (id: string) => {
      const ch = cat.data?.channels[id];
      if (!ch) return;
      onClose();
      const toastId = `stream-${id}`;
      toast.loading(`Checking ${ch.name}…`, { id: toastId });
      const first = ch.streams[0];
      const r = await checkStream(first.url, first.referrer, first.user_agent);
      if (r === "online") {
        toast.dismiss(toastId);
        player.open(ch);
        navigate({ to: "/watch/$channelId", params: { channelId: ch.id } });
      } else {
        toast.error(ch.name, {
          id: toastId,
          description: streamErrorMsg(r),
          duration: 8000,
          action: {
            label: "Open anyway",
            onClick: () => {
              toast.dismiss(toastId);
              player.open(ch);
              navigate({ to: "/watch/$channelId", params: { channelId: ch.id } });
            },
          },
        });
      }
    },
    [cat.data, navigate, onClose, player],
  );

  const pinnedTypes = useMemo(() => new Set(pills.map((p) => p.type)), [pills]);

  const rows: Row[] = useMemo(() => {
    if (!cat.data) return [];
    const ql = debouncedQ.trim().toLowerCase();
    if (!ql && pills.length === 0) return [];
    const out: Row[] = [];
    const countryNameMap = new Map(cat.data.meta.countries.map((c) => [c.code, c.name]));

    const baseIds =
      pillSets && pillSets.length > 0
        ? cat.data.indexes.all_ids.filter((id) => pillSets.every((s) => s.has(id)))
        : cat.data.indexes.all_ids;

    if (ql || pills.length > 0) {
      const chMatches: { id: string; rank: number }[] = [];
      for (const id of baseIds) {
        const c = cat.data.channels[id];
        const name = c.name.toLowerCase();
        if (!ql) {
          chMatches.push({ id, rank: 1 });
        } else {
          let rank = -1;
          if (name === ql) rank = 0;
          else if (name.startsWith(ql)) rank = 1;
          else if (name.includes(ql)) rank = 2;
          if (rank >= 0) chMatches.push({ id, rank });
        }
      }
      chMatches.sort((a, b) => a.rank - b.rank);
      for (const m of chMatches.slice(0, 12)) {
        const c = cat.data.channels[m.id];
        out.push({
          group: "Channels",
          id: `ch:${m.id}`,
          label: c.name,
          sub: countryNameMap.get(c.country) ?? c.country,
          countryCode: c.country,
          logoUrl: c.logo_url,
          isFilter: false,
          action: () => playChannel(m.id),
        });
      }
    }

    if (!ql) return out;

    if (!pinnedTypes.has("country")) {
      let count = 0;
      for (const co of cat.data.meta.countries) {
        if (!co.name.toLowerCase().includes(ql)) continue;
        const n = cat.data.indexes.by_country[co.code]?.length ?? 0;
        if (n === 0) continue;
        out.push({
          group: "Countries",
          id: `co:${co.code}`,
          label: co.name,
          sub: `${n} channels`,
          countryCode: co.code,
          isFilter: true,
          filterType: "country",
          filterCode: co.code,
          action: () =>
            addPill({ type: "country", code: co.code, label: co.name, countryCode: co.code }),
        });
        if (++count >= 4) break;
      }
    }

    if (!pinnedTypes.has("category")) {
      let count = 0;
      for (const ca of cat.data.meta.categories) {
        if (!ca.name.toLowerCase().includes(ql)) continue;
        const n = cat.data.indexes.by_category[ca.id]?.length ?? 0;
        if (n === 0) continue;
        out.push({
          group: "Categories",
          id: `ca:${ca.id}`,
          label: ca.name,
          sub: `${n} channels`,
          isFilter: true,
          filterType: "category",
          filterCode: ca.id,
          action: () => addPill({ type: "category", code: ca.id, label: ca.name }),
        });
        if (++count >= 4) break;
      }
    }

    if (!pinnedTypes.has("language")) {
      let count = 0;
      for (const la of cat.data.meta.languages) {
        if (!la.name.toLowerCase().includes(ql)) continue;
        const n = cat.data.indexes.by_language[la.code]?.length ?? 0;
        if (n === 0) continue;
        out.push({
          group: "Languages",
          id: `la:${la.code}`,
          label: la.name,
          sub: `${n} channels`,
          isFilter: true,
          filterType: "language",
          filterCode: la.code,
          action: () => addPill({ type: "language", code: la.code, label: la.name }),
        });
        if (++count >= 4) break;
      }
    }

    return out;
  }, [cat.data, debouncedQ, pills, pillSets, pinnedTypes, playChannel, addPill]);

  useEffect(() => {
    setActive(0);
  }, [debouncedQ, pills]);

  const isShowingRecent = !debouncedQ.trim() && pills.length === 0;
  const navList: (() => void)[] = useMemo(() => {
    if (isShowingRecent) {
      return recent
        .map((id) => {
          const ch = cat.data?.channels[id];
          if (!ch) return null;
          return () => playChannel(id);
        })
        .filter(Boolean) as (() => void)[];
    }
    return rows.map((r) => r.action);
  }, [isShowingRecent, recent, cat.data, rows, playChannel]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Backspace" && q === "" && pills.length > 0) {
        setPills((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key === " " && !isShowingRecent && rows[active]?.isFilter) {
        e.preventDefault();
        rows[active].action();
        return;
      }
      if (navList.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        isUsingKeyboard.current = true;
        setActive((a) => (a + 1) % navList.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        isUsingKeyboard.current = true;
        setActive((a) => (a - 1 + navList.length) % navList.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        navList[active]?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, navList, rows, active, onClose, q, pills, isShowingRecent]);

  const sections = useMemo(() => {
    const groups: { name: Group; rows: { row: Row; flatIdx: number }[] }[] = [];
    let idx = 0;
    for (const row of rows) {
      let s = groups.find((g) => g.name === row.group);
      if (!s) {
        s = { name: row.group, rows: [] };
        groups.push(s);
      }
      s.rows.push({ row, flatIdx: idx++ });
    }
    return groups;
  }, [rows]);

  const groupIcon = (g: Group) =>
    g === "Channels" ? Tv : g === "Countries" ? Globe2 : g === "Categories" ? Tag : Languages;

  const activeRow = rows[active];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-stretch sm:items-center sm:justify-start sm:px-4 sm:pt-[12vh]">
      {/* Backdrop — visible on both mobile and desktop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${mounted ? "opacity-100" : "opacity-0"}`}
        onMouseDown={onClose}
      />

      {/* Panel */}
      <div
        className={`
          relative flex flex-col
          /* Mobile: full screen with safe areas */
          h-full w-full bg-[var(--surface-1)]
          pt-[env(safe-area-inset-top,0px)]
          pb-[env(safe-area-inset-bottom,0px)]
          /* Desktop: centered floating card */
          sm:h-auto sm:max-h-[580px] sm:max-w-xl sm:w-full
          sm:overflow-hidden sm:rounded-2xl
          sm:border sm:border-[var(--border-default)]
          sm:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]
          sm:pt-0 sm:pb-0
          /* Entry animation */
          transition-[transform,opacity] duration-250
          ${
            mounted
              ? "translate-y-0 opacity-100 sm:scale-100"
              : "translate-y-4 opacity-0 sm:scale-[0.96]"
          }
        `}
        style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
      >
        {/* ── Input row ── */}
        <div
          className="shrink-0 flex flex-col border-b border-[var(--border-subtle)] bg-[var(--surface-1)]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) inputRef.current?.focus();
          }}
        >
          {/* Pills row — separate line on mobile when pills exist */}
          {pills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-4 pt-3 pb-1">
              {pills.map((pill) => {
                const flagCode = pill.countryCode ? toFlagCode(pill.countryCode) : "";
                return (
                  <span
                    key={pill.type}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent-subtle)] px-2.5 py-1 text-[12px] font-medium text-[var(--accent)]"
                  >
                    {flagCode && (
                      <img
                        src={`https://flagcdn.com/w20/${flagCode}.png`}
                        width={14}
                        height={10}
                        alt={pill.label}
                        className="rounded-[2px] object-cover"
                      />
                    )}
                    {!flagCode && pill.type === "category" && <Tag className="size-3" />}
                    {!flagCode && pill.type === "language" && <Languages className="size-3" />}
                    <span>{pill.label}</span>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        removePill(pill.type);
                      }}
                      className="ml-0.5 rounded-full p-0.5 hover:bg-[var(--accent)]/20 active:opacity-60 transition-colors"
                      aria-label={`Remove ${pill.label} filter`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Search input row */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-3)]">
              <SearchIcon className="size-[18px] text-[var(--text-secondary)]" />
            </div>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={pills.length === 0 ? "Search channels, countries…" : "Filter channels…"}
              className="flex-1 bg-transparent text-[17px] font-medium text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)] placeholder:font-normal"
              style={{ fontSize: "17px" }}
            />
            {q ? (
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setQ("");
                  inputRef.current?.focus();
                }}
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--text-tertiary)] transition-colors active:scale-90"
                aria-label="Clear"
              >
                <X className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-2)] px-3 text-[13px] font-medium text-[var(--text-tertiary)] transition-colors active:scale-95 sm:hidden"
                aria-label="Close search"
              >
                Cancel
              </button>
            )}
            <kbd className="keycap-kbd hidden sm:inline-flex shrink-0">Esc</kbd>
          </div>
        </div>

        {/* ── Results list ── */}
        <div ref={listRef} className="flex-1 overflow-y-auto no-scrollbar">
          {/* Loading */}
          {cat.isLoading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="size-6 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent)]" />
              <p className="text-[13px] text-[var(--text-tertiary)]">Loading catalog…</p>
            </div>
          )}

          {/* Recent history + Trending */}
          {!cat.isLoading && isShowingRecent && (
            <div className="px-2 pt-3 pb-2">
              {recent.length > 0 && (
                <>
                  <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                    Recently watched
                  </p>
                  {recent.map((id, idx) => {
                    const c = cat.data?.channels[id];
                    if (!c) return null;
                    const code = toFlagCode(c.country);
                    const isActive = idx === active;
                    return (
                      <button
                        key={id}
                        data-idx={idx}
                        onMouseEnter={() => {
                          if (!isUsingKeyboard.current) setActive(idx);
                        }}
                        onMouseMove={() => {
                          isUsingKeyboard.current = false;
                          setActive(idx);
                        }}
                        onClick={() => playChannel(id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition-all active:scale-[0.97] ${
                          isActive
                            ? "bg-[var(--surface-3)] text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)]"
                        }`}
                      >
                        <Clock className="size-4 shrink-0 text-[var(--text-tertiary)]" />
                        <span className="flex-1 truncate text-[14px] font-medium">{c.name}</span>
                        {code && (
                          <img
                            src={`https://flagcdn.com/w20/${code}.png`}
                            width={18}
                            height={13}
                            alt={c.country}
                            className="shrink-0 rounded-[3px] object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </>
              )}

              {/* Trending / Popular right now */}
              {trendingChannels.length > 0 && (
                <div className={recent.length > 0 ? "mt-5" : ""}>
                  <div className="mb-2 flex items-center gap-2 px-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                      Popular right now
                    </p>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                  {trendingChannels.map((id) => {
                    const c = cat.data?.channels[id];
                    if (!c) return null;
                    const code = toFlagCode(c.country);
                    const isOnline = health[id] === "online";
                    const catName = cat.data?.meta.categories.find(
                      (ca) => ca.id === c.categories[0],
                    )?.name;
                    return (
                      <button
                        key={id}
                        onClick={() => playChannel(id)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all active:scale-[0.97] text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]"
                      >
                        {/* Logo or fallback */}
                        <div className="relative shrink-0">
                          {c.logo_url ? (
                            <img
                              src={c.logo_url}
                              alt={c.name}
                              width={36}
                              height={36}
                              className="size-9 rounded-lg object-contain bg-[var(--surface-3)]"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--surface-3)]">
                              <Tv className="size-4 text-[var(--text-tertiary)]" />
                            </div>
                          )}
                          {/* Online dot */}
                          {isOnline && (
                            <span className="absolute -bottom-0.5 -right-0.5 flex size-2.5 items-center justify-center rounded-full bg-[var(--surface-1)]">
                              <span className="size-1.5 rounded-full bg-emerald-400" />
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13px] font-semibold text-[var(--text-primary)]">
                            {c.name}
                          </p>
                          <p className="truncate text-[11px] text-[var(--text-tertiary)]">
                            {catName ?? c.categories[0]}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-1">
                          {code && (
                            <img
                              src={`https://flagcdn.com/w20/${code}.png`}
                              width={18}
                              height={13}
                              alt={c.country}
                              className="rounded-[3px] object-cover"
                            />
                          )}
                          {isOnline && (
                            <span className="flex items-center gap-0.5 text-[10px] font-medium text-emerald-400">
                              <Zap className="size-2.5" />
                              Live
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Empty state — no history, no trending yet */}
              {recent.length === 0 && trendingChannels.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                  <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-[var(--surface-2)]">
                    <SearchIcon className="size-5 text-[var(--text-tertiary)]" />
                  </div>
                  <p className="text-[14px] font-medium text-[var(--text-secondary)]">
                    Search{" "}
                    {cat.data
                      ? `${cat.data.indexes.all_ids.length.toLocaleString()} channels`
                      : "channels"}
                  </p>
                  <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">
                    Countries, categories, and languages too
                  </p>
                </div>
              )}
            </div>
          )}

          {/* No results */}
          {!cat.isLoading && (debouncedQ.trim() || pills.length > 0) && rows.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <p className="text-[14px] font-medium text-[var(--text-secondary)]">
                No results{debouncedQ ? ` for "${debouncedQ}"` : ""}
              </p>
              {pills.length > 0 && (
                <p className="mt-1 text-[12px] text-[var(--text-tertiary)]">
                  Try removing a filter
                </p>
              )}
            </div>
          )}

          {/* Results grouped by type */}
          {sections.map((sec) => {
            const Icon = groupIcon(sec.name);
            return (
              <div key={sec.name} className="px-2 pt-2">
                <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  {sec.name}
                </p>
                {sec.rows.map(({ row, flatIdx }) => {
                  const isActive = flatIdx === active;
                  const flagCode = row.countryCode ? toFlagCode(row.countryCode) : "";
                  return (
                    <button
                      key={row.id}
                      data-idx={flatIdx}
                      onMouseEnter={() => {
                        if (!isUsingKeyboard.current) setActive(flatIdx);
                      }}
                      onMouseMove={() => {
                        isUsingKeyboard.current = false;
                        setActive(flatIdx);
                      }}
                      onClick={row.action}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-left transition-all active:scale-[0.97] ${
                        isActive
                          ? "bg-[var(--surface-3)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {/* Left: channel logo or group icon */}
                      {row.logoUrl ? (
                        <img
                          src={row.logoUrl}
                          alt={row.label}
                          width={28}
                          height={28}
                          className="size-7 shrink-0 rounded-md object-contain bg-[var(--surface-3)]"
                          onError={(e) => {
                            const el = e.currentTarget;
                            el.style.display = "none";
                            const sibling = el.nextElementSibling as HTMLElement | null;
                            if (sibling) sibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <Icon
                        className="size-4 shrink-0 text-[var(--text-tertiary)]"
                        style={{ display: row.logoUrl ? "none" : undefined }}
                      />
                      <span className="flex-1 truncate text-[14px] font-medium">{row.label}</span>
                      {/* Right: flag only for channel rows, sub text for filter rows */}
                      {flagCode && (
                        <img
                          src={`https://flagcdn.com/w20/${flagCode}.png`}
                          width={18}
                          height={13}
                          alt={row.countryCode}
                          className="shrink-0 rounded-[2px] object-cover"
                        />
                      )}
                      {!row.countryCode && row.sub && (
                        <span className="shrink-0 text-[12px] text-[var(--text-tertiary)]">
                          {row.sub}
                        </span>
                      )}
                      {row.isFilter ? (
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors ${
                            isActive
                              ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                              : "bg-[var(--surface-3)] text-[var(--text-tertiary)]"
                          }`}
                        >
                          Filter
                        </span>
                      ) : (
                        isActive && (
                          <CornerDownLeft className="size-3.5 shrink-0 text-[var(--text-tertiary)] hidden sm:block" />
                        )
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* Bottom spacer for safe area on mobile */}
          <div className="h-4 sm:h-2" />
        </div>

        {/* ── Footer — desktop only ── */}
        <div className="hidden sm:flex items-center justify-between shrink-0 border-t border-[var(--border-subtle)] bg-[var(--surface-base)]/60 px-4 py-2 text-[10.5px] text-[var(--text-tertiary)]">
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5">
              <kbd className="keycap-kbd">↑↓</kbd> navigate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="keycap-kbd">↵</kbd> open
            </span>
            {activeRow?.isFilter && (
              <span className="inline-flex items-center gap-1.5">
                <kbd className="keycap-kbd">Space</kbd> filter
              </span>
            )}
          </span>
          <span className="font-mono">
            {cat.data ? `${cat.data.indexes.all_ids.length.toLocaleString()} channels` : "loading…"}
          </span>
        </div>
      </div>
    </div>
  );
}
