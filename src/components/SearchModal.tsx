import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search as SearchIcon, Tv, Globe2, Tag, Languages,
  CornerDownLeft, X, Clock,
} from "lucide-react";
import { useCatalog } from "@/lib/data-hooks";
import { usePlayer } from "@/lib/player-context";
import { checkStream } from "@/lib/data-hooks";
import { toast } from "sonner";
import { listHistory } from "@/lib/idb";
import { streamErrorMsg } from "@/lib/stream-messages";

// iptv-org non-ISO code → flagcdn ISO code
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
  /** true = pressing Space adds this as a filter pill instead of opening */
  isFilter: boolean;
  filterType?: "country" | "category" | "language";
  filterCode?: string; // country code / category id / language code
  action: () => void;
};

type FilterPill = {
  type: "country" | "category" | "language";
  code: string;   // country code / category id / language code
  label: string;
  countryCode?: string; // for flag image
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: Props) {
  const cat = useCatalog();
  const navigate = useNavigate();
  const player = usePlayer();

  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [pills, setPills] = useState<FilterPill[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  // Suppresses onMouseEnter highlight fights during keyboard navigation
  const isUsingKeyboard = useRef(false);

  // Debounce query — 150ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q), 150);
    return () => clearTimeout(t);
  }, [q]);

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setQ("");
      setDebouncedQ("");
      setActive(0);
      setPills([]);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  // Load recent history
  useEffect(() => {
    if (!open) return;
    (async () => {
      const h = await listHistory();
      const seen = new Set<string>();
      setRecent(
        h
          .filter((x) => (seen.has(x.channelId) ? false : (seen.add(x.channelId), true)))
          .slice(0, 8)
          .map((x) => x.channelId),
      );
    })();
  }, [open]);

  // Add or replace a filter pill
  const addPill = useCallback((pill: FilterPill) => {
    setPills((prev) => {
      // Replace existing pill of same type
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

  // Active pill-scoped channel id sets
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

  // Which filter types are already pinned as pills
  const pinnedTypes = useMemo(() => new Set(pills.map((p) => p.type)), [pills]);

  const rows: Row[] = useMemo(() => {
    if (!cat.data) return [];
    const ql = debouncedQ.trim().toLowerCase();
    if (!ql && pills.length === 0) return [];
    const out: Row[] = [];

    const countryNameMap = new Map(cat.data.meta.countries.map((c) => [c.code, c.name]));

    // --- Channels — scoped by pills + text query ---
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
          // Pills only — show all scoped channels sorted by name
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
          isFilter: false,
          action: () => playChannel(m.id),
        });
      }
    }

    if (!ql) return out; // pills only — show channels, no filter suggestions

    // --- Countries (skip if country pill already active) ---
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
        if (++count >= 5) break;
      }
    }

    // --- Categories (skip if category pill already active) ---
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
        if (++count >= 5) break;
      }
    }

    // --- Languages (skip if language pill already active) ---
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
        if (++count >= 5) break;
      }
    }

    return out;
  }, [cat.data, debouncedQ, pills, pillSets, pinnedTypes, playChannel, addPill]);

  // Reset active on every query change
  useEffect(() => { setActive(0); }, [debouncedQ, pills]);

  // Unified navigable list — search results OR recent history
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

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  // Keyboard navigation — works on both recent list and search results
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }

      // Backspace on empty input removes last pill
      if (e.key === "Backspace" && q === "" && pills.length > 0) {
        setPills((prev) => prev.slice(0, -1));
        return;
      }

      // Space on a filter row → add as pill
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

  // Group rows for render
  const sections = useMemo(() => {
    const groups: { name: Group; rows: { row: Row; flatIdx: number }[] }[] = [];
    let idx = 0;
    for (const row of rows) {
      let s = groups.find((g) => g.name === row.group);
      if (!s) { s = { name: row.group, rows: [] }; groups.push(s); }
      s.rows.push({ row, flatIdx: idx++ });
    }
    return groups;
  }, [rows]);

  const groupIcon = (g: Group) =>
    g === "Channels" ? Tv : g === "Countries" ? Globe2 : g === "Categories" ? Tag : Languages;

  const activeRow = rows[active];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh] sm:pt-[12vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onMouseDown={onClose} />

      {/* Modal panel */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--surface-1)] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">

        {/* Input row with pills */}
        <div
          className="flex min-h-[52px] flex-wrap items-center gap-1.5 border-b border-[var(--border-subtle)] px-3 py-2.5"
          onMouseDown={(e) => { if (e.target === e.currentTarget) inputRef.current?.focus(); }}
        >
          <SearchIcon className="size-4 shrink-0 text-[var(--text-tertiary)]" />

          {/* Filter pills */}
          {pills.map((pill) => {
            const flagCode = pill.countryCode ? toFlagCode(pill.countryCode) : "";
            return (
              <span
                key={pill.type}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--accent)] bg-[var(--accent-subtle)] px-2 py-0.5 text-[12px] font-medium text-[var(--accent)]"
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
                  onMouseDown={(e) => { e.preventDefault(); removePill(pill.type); }}
                  className="ml-0.5 rounded hover:text-[var(--text-primary)]"
                  aria-label={`Remove ${pill.label} filter`}
                >
                  <X className="size-3" />
                </button>
              </span>
            );
          })}

          {/* Text input */}
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={pills.length === 0 ? "Search channels, countries, categories, languages…" : "Search channels…"}
            className="min-w-[140px] flex-1 bg-transparent text-[15px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-tertiary)]"
          />

          {/* Clear text */}
          {q && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); setQ(""); inputRef.current?.focus(); }}
              className="shrink-0 rounded p-0.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              aria-label="Clear"
            >
              <X className="size-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded border border-[var(--border-default)] bg-[var(--surface-3)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
          >
            Esc
          </button>
        </div>

        {/* Results list */}
        <div ref={listRef} className="max-h-[58vh] overflow-y-auto p-2">

          {/* Loading */}
          {cat.isLoading && (
            <div className="px-4 py-8 text-center">
              <div className="mx-auto mb-3 size-5 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-[var(--accent)]" />
              <p className="text-[13px] text-[var(--text-tertiary)]">Loading catalog…</p>
            </div>
          )}

          {/* Empty state — recent history */}
          {!cat.isLoading && !debouncedQ.trim() && pills.length === 0 && (
            <div className="p-2">
              <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
                Recently watched
              </p>
              {recent.length === 0 ? (
                <p className="px-2 py-6 text-center text-[13px] text-[var(--text-tertiary)]">
                  Start typing to search across{" "}
                  {cat.data?.indexes.all_ids.length.toLocaleString() ?? "thousands of"} channels.
                </p>
              ) : (
                recent.map((id, idx) => {
                  const c = cat.data?.channels[id];
                  if (!c) return null;
                  const code = toFlagCode(c.country);
                  const isActive = idx === active;
                  return (
                    <button
                      key={id}
                      data-idx={idx}
                      onMouseEnter={() => { if (!isUsingKeyboard.current) setActive(idx); }}
                      onMouseMove={() => { isUsingKeyboard.current = false; setActive(idx); }}
                      onClick={() => playChannel(id)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13.5px] transition-colors ${
                        isActive
                          ? "bg-[var(--surface-3)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      <Clock className="size-3.5 shrink-0 text-[var(--text-tertiary)]" />
                      <span className="flex-1 truncate">{c.name}</span>
                      {code && (
                        <img
                          src={`https://flagcdn.com/w20/${code}.png`}
                          width={16}
                          height={12}
                          alt={c.country}
                          className="shrink-0 rounded-[2px] object-cover opacity-80"
                        />
                      )}
                      {isActive && <CornerDownLeft className="size-3 shrink-0 text-[var(--text-tertiary)]" />}
                    </button>
                  );
                })
              )}
            </div>
          )}

          {/* No results */}
          {!cat.isLoading && (debouncedQ.trim() || pills.length > 0) && rows.length === 0 && (
            <p className="px-4 py-10 text-center text-[13px] text-[var(--text-tertiary)]">
              No matches{debouncedQ ? ` for "${debouncedQ}"` : ""}{pills.length > 0 ? " with active filters" : ""}
            </p>
          )}

          {/* Results */}
          {sections.map((sec) => {
            const Icon = groupIcon(sec.name);
            return (
              <div key={sec.name} className="px-1 pt-2">
                <p className="px-3 pb-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">
                  {sec.name}
                </p>
                {sec.rows.map(({ row, flatIdx }) => {
                  const isActive = flatIdx === active;
                  const flagCode = row.countryCode ? toFlagCode(row.countryCode) : "";
                  const canPin = row.isFilter;
                  return (
                    <button
                      key={row.id}
                      data-idx={flatIdx}
                      onMouseEnter={() => {
                        if (isUsingKeyboard.current) return;
                        setActive(flatIdx);
                      }}
                      onMouseMove={() => {
                        // Re-enable mouse hover once the mouse actually moves
                        isUsingKeyboard.current = false;
                        setActive(flatIdx);
                      }}
                      onClick={row.action}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13.5px] transition-colors ${
                        isActive
                          ? "bg-[var(--surface-3)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      <Icon className="size-3.5 shrink-0 text-[var(--text-tertiary)]" />
                      <span className="flex-1 truncate">{row.label}</span>
                      {row.sub && (
                        <span className="shrink-0 text-[11.5px] text-[var(--text-tertiary)]">{row.sub}</span>
                      )}
                      {flagCode && (
                        <img
                          src={`https://flagcdn.com/w20/${flagCode}.png`}
                          width={16}
                          height={12}
                          alt={row.countryCode}
                          className="shrink-0 rounded-[2px] object-cover opacity-80"
                        />
                      )}
                      {/* Space hint for filter rows */}
                      {isActive && canPin && (
                        <kbd className="rounded border border-[var(--border-default)] bg-[var(--surface-2)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-tertiary)]">
                          Space
                        </kbd>
                      )}
                      {isActive && !canPin && (
                        <CornerDownLeft className="size-3 shrink-0 text-[var(--text-tertiary)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] px-4 py-2 text-[10.5px] text-[var(--text-tertiary)]">
          <span className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-[var(--border-default)] bg-[var(--surface-3)] px-1 font-mono">↑↓</kbd>
              navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-[var(--border-default)] bg-[var(--surface-3)] px-1 font-mono">↵</kbd>
              open
            </span>
            {activeRow?.isFilter && (
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-[var(--border-default)] bg-[var(--surface-3)] px-1 font-mono">Space</kbd>
                filter
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-[var(--border-default)] bg-[var(--surface-3)] px-1 font-mono">⌫</kbd>
              remove filter
            </span>
          </span>
          <span>
            {cat.data ? `${cat.data.indexes.all_ids.length.toLocaleString()} channels` : "loading…"}
          </span>
        </div>
      </div>
    </div>
  );
}
