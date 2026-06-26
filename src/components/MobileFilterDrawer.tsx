import { useMemo, useState, useCallback } from "react";
import { X, Check, Search, SlidersHorizontal } from "lucide-react";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import type { Catalog } from "@/lib/types";

const CODE_MAP: Record<string, string> = { uk: "gb", int: "" };
function toFlagCode(code: string): string {
  const lower = code.toLowerCase();
  return CODE_MAP[lower] ?? lower;
}

type Filters = { category?: string; language?: string; country?: string };

/* ─── Section component ──────────────────────────────────────────── */
function Section({
  label,
  options,
  active,
  onSelect,
  isCountry,
}: {
  label: string;
  options: { id: string; name: string; count: number }[];
  active?: string;
  onSelect: (id: string | undefined) => void;
  isCountry?: boolean;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      options
        .filter((o) => !q || o.name.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 60),
    [options, q],
  );

  return (
    <div className="mb-6">
      {/* Section header */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-tertiary)]">
          {label}
        </span>
        {active && (
          <button
            type="button"
            onClick={() => onSelect(undefined)}
            className="flex items-center gap-1 rounded-full bg-[var(--accent-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)] transition-opacity active:opacity-70"
          >
            <X className="size-2.5" />
            Clear
          </button>
        )}
      </div>

      {/* Search input */}
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[var(--text-tertiary)]" />
        <input
          className="h-9 w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-2)] pl-8 pr-3 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none focus:border-[var(--accent)] transition-colors"
          placeholder={`Search ${label.toLowerCase()}…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] active:text-[var(--text-primary)]"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Option list — full tap targets */}
      <div className="space-y-0.5">
        {filtered.map((o, i) => {
          const isActive = active === o.id;
          const flagCode = isCountry ? toFlagCode(o.id) : null;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onSelect(isActive ? undefined : o.id)}
              style={{ animationDelay: `${i * 18}ms` }}
              className={`stagger-item flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-150 active:scale-[0.98] ${
                isActive
                  ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                  : "text-[var(--text-secondary)] active:bg-[var(--surface-3)]"
              }`}
            >
              {/* Flag or colored dot */}
              {flagCode ? (
                <img
                  src={`https://flagcdn.com/w20/${flagCode}.png`}
                  srcSet={`https://flagcdn.com/w40/${flagCode}.png 2x`}
                  width={20}
                  height={15}
                  alt=""
                  className="shrink-0 rounded-[3px] object-cover shadow-sm"
                />
              ) : (
                <span
                  className={`size-1.5 shrink-0 rounded-full ${isActive ? "bg-[var(--accent)]" : "bg-[var(--border-default)]"}`}
                />
              )}

              <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{o.name}</span>

              <span
                className={`shrink-0 text-[11px] tabular-nums ${isActive ? "text-[var(--accent)]/70" : "text-[var(--text-tertiary)]"}`}
              >
                {o.count.toLocaleString()}
              </span>

              {isActive && <Check className="size-3.5 shrink-0 text-[var(--accent)]" />}
            </button>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-6 text-center text-[12px] text-[var(--text-tertiary)]">
            No {label.toLowerCase()} matches
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Active filter chip ─────────────────────────────────────────── */
function ActiveChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-subtle)] px-3 py-1 text-[11px] font-medium text-[var(--accent)]">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="flex items-center rounded-full transition-opacity active:opacity-60"
      >
        <X className="size-2.5" />
      </button>
    </span>
  );
}

/* ─── Trigger button (exported for use in browse.tsx) ────────────── */
export function MobileFilterTrigger({
  activeCount,
  onClick,
}: {
  activeCount: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open filters"
      className={`relative inline-flex h-[34px] items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-all active:scale-95 sm:hidden ${
        activeCount > 0
          ? "border-[var(--accent)] bg-[var(--accent-subtle)] text-[var(--accent)]"
          : "border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)]"
      }`}
    >
      <SlidersHorizontal className="size-3.5 shrink-0" />
      {activeCount > 0 && (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white">
          {activeCount}
        </span>
      )}
    </button>
  );
}

/* ─── Main drawer component ──────────────────────────────────────── */
interface MobileFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  catalog: Catalog;
  selected: Filters;
  resultCount: number;
  onChange: (next: Filters) => void;
}

export function MobileFilterDrawer({
  open,
  onOpenChange,
  catalog,
  selected,
  resultCount,
  onChange,
}: MobileFilterDrawerProps) {
  const [tab, setTab] = useState<"country" | "language">("country");

  const langs = useMemo(
    () =>
      catalog.meta.languages
        .map((l) => ({
          id: l.code,
          name: l.name,
          count: catalog.indexes.by_language[l.code]?.length ?? 0,
        }))
        .filter((l) => l.count > 0)
        .sort((a, b) => b.count - a.count),
    [catalog],
  );

  const countries = useMemo(
    () =>
      catalog.meta.countries
        .map((c) => ({
          id: c.code,
          name: c.name,
          count: catalog.indexes.by_country[c.code]?.length ?? 0,
        }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count),
    [catalog],
  );

  const activeCountryName = useMemo(
    () => countries.find((c) => c.id === selected.country)?.name,
    [countries, selected.country],
  );
  const activeLanguageName = useMemo(
    () => langs.find((l) => l.id === selected.language)?.name,
    [langs, selected.language],
  );

  const hasAny = !!(selected.category || selected.language || selected.country);
  const activeCount = [selected.category, selected.language, selected.country].filter(Boolean).length;

  const clearAll = useCallback(
    () => onChange({ category: undefined, language: undefined, country: undefined }),
    [onChange],
  );

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="flex max-h-[92vh] flex-col bg-[var(--surface-base)] border-[var(--border-subtle)] px-0 pb-0">

        {/* ── Header ── */}
        <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-2">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-[15px] font-semibold text-[var(--text-primary)]">
              Filters
            </h2>
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {hasAny && (
              <button
                type="button"
                onClick={clearAll}
                className="text-[12px] font-medium text-[var(--text-tertiary)] underline-offset-2 hover:text-[var(--text-primary)] active:opacity-60 transition-colors"
              >
                Clear all
              </button>
            )}
            <DrawerClose asChild>
              <button
                type="button"
                aria-label="Close filters"
                className="flex size-7 items-center justify-center rounded-full bg-[var(--surface-3)] text-[var(--text-secondary)] transition-colors active:bg-[var(--surface-4)]"
              >
                <X className="size-3.5" />
              </button>
            </DrawerClose>
          </div>
        </div>

        {/* ── Active filter chips ── */}
        {hasAny && (
          <div className="shrink-0 flex flex-wrap gap-2 px-5 pb-3">
            {activeCountryName && (
              <ActiveChip
                label={activeCountryName}
                onRemove={() => onChange({ ...selected, country: undefined })}
              />
            )}
            {activeLanguageName && (
              <ActiveChip
                label={activeLanguageName}
                onRemove={() => onChange({ ...selected, language: undefined })}
              />
            )}
          </div>
        )}

        {/* ── Tab switcher ── */}
        <div className="shrink-0 mx-5 mb-4 flex rounded-xl bg-[var(--surface-2)] p-1">
          {(["country", "language"] as const).map((t) => {
            const isActive = tab === t;
            const hasValue = t === "country" ? !!selected.country : !!selected.language;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-[10px] py-2 text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--surface-base)] text-[var(--text-primary)] shadow-sm"
                    : "text-[var(--text-tertiary)]"
                }`}
              >
                {t === "country" ? "Country" : "Language"}
                {hasValue && (
                  <span className="size-1.5 rounded-full bg-[var(--accent)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Scrollable content ── */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 no-scrollbar">
          {tab === "country" ? (
            <Section
              label="Country"
              options={countries}
              active={selected.country}
              isCountry
              onSelect={(id) => onChange({ ...selected, country: id })}
            />
          ) : (
            <Section
              label="Language"
              options={langs}
              active={selected.language}
              onSelect={(id) => onChange({ ...selected, language: id })}
            />
          )}
        </div>

        {/* ── Footer CTA ── */}
        <div className="shrink-0 border-t border-[var(--border-subtle)] bg-[var(--surface-base)] px-5 pb-[env(safe-area-inset-bottom,16px)] pt-4">
          <DrawerClose asChild>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] py-3.5 text-[14px] font-semibold text-white shadow-lg transition-all active:scale-[0.98] active:opacity-90"
            >
              Show {resultCount.toLocaleString()} channel{resultCount !== 1 ? "s" : ""}
            </button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
