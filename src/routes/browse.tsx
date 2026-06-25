import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useRef, useCallback, useEffect } from "react";
import { z } from "zod";
import { useCatalog, useEpg } from "@/lib/data-hooks";
import { FilterPanel } from "@/components/FilterPanel";
import { ChannelGrid } from "@/components/ChannelGrid";
import { SlidersHorizontal, Search as SearchIcon, X, ChevronLeft, ChevronRight, ArrowUpDown, Check } from "lucide-react";
import type { Catalog } from "@/lib/types";

const search = z.object({
  category: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(["name", "country", "popular"]).optional(),
});

function CategoryBar({
  catalog,
  active,
  onSelect,
}: {
  catalog: Catalog;
  active?: string;
  onSelect: (id: string | undefined) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hovered, setHovered] = useState(false);

  const categories = useMemo(
    () =>
      catalog.meta.categories
        .map((c) => ({ id: c.id, name: c.name, count: catalog.indexes.by_category[c.id]?.length ?? 0 }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count),
    [catalog],
  );

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -240 : 240, behavior: "smooth" });
  }, []);

  // Native wheel listener — non-passive so preventDefault works
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "auto" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Scrollable pill row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
      >
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(active === c.id ? undefined : c.id)}
            className={`shrink-0 rounded-full border px-3 py-1 text-[12px] font-medium transition-all duration-150 ${
              active === c.id
                ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm"
                : "border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Left edge — fade + button fused */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center transition-opacity duration-200 ${hovered && canScrollLeft ? "opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(to right, var(--surface-base) 40%, transparent)", width: "3.5rem" }}
      >
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="pointer-events-auto hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex"
        >
          <ChevronLeft className="size-3.5" />
        </button>
      </div>

      {/* Right edge — fade + button fused */}
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center justify-end transition-opacity duration-200 ${hovered && canScrollRight ? "opacity-100" : "opacity-0"}`}
        style={{ background: "linear-gradient(to left, var(--surface-base) 40%, transparent)", width: "3.5rem" }}
      >
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="pointer-events-auto hidden size-7 items-center justify-center rounded-full bg-[var(--surface-3)]/80 text-[var(--text-secondary)] backdrop-blur-sm transition-colors hover:bg-[var(--surface-4)] hover:text-[var(--text-primary)] sm:flex"
        >
          <ChevronRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "name",    label: "A → Z" },
  { value: "country", label: "Country" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function SortDropdown({ value, onChange }: { value: SortValue; onChange: (v: SortValue) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-[34px] items-center gap-2 rounded-lg border px-3 text-[12px] font-medium transition-colors ${
          open
            ? "border-[var(--accent)] bg-[var(--surface-2)] text-[var(--text-primary)]"
            : "border-[var(--border-default)] bg-[var(--surface-1)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sort"
      >
        <ArrowUpDown className="size-3.5 shrink-0 text-[var(--text-tertiary)]" />
        <span>{active.label}</span>
        <ChevronRight className={`size-3 shrink-0 text-[var(--text-tertiary)] transition-transform ${open ? "rotate-90" : "rotate-90 opacity-60"}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[130px] overflow-hidden rounded-lg border border-[var(--border-default)] bg-[var(--surface-2)] py-1 shadow-xl">
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === value}
              onClick={() => { onChange(o.value); setOpen(false); }}
              className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[12px] transition-colors ${
                o.value === value
                  ? "text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span>{o.label}</span>
              {o.value === value && <Check className="size-3 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/browse")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Browse channels — Tela" },
      { name: "description", content: "Filter thousands of live IPTV channels by category, language, and country." },
      { property: "og:title", content: "Browse channels — Tela" },
      { property: "og:description", content: "Filter thousands of live IPTV channels by category, language, and country." },
    ],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const navigate = useNavigate({ from: "/browse" });
  const selected = Route.useSearch();
  const cat = useCatalog();
  const epg = useEpg();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const ids = useMemo(() => {
    if (!cat.data) return [];
    const sets: Set<string>[] = [];
    if (selected.category) sets.push(new Set(cat.data.indexes.by_category[selected.category] ?? []));
    if (selected.country) sets.push(new Set(cat.data.indexes.by_country[selected.country] ?? []));
    if (selected.language) sets.push(new Set(cat.data.indexes.by_language[selected.language] ?? []));
    let base = sets.length === 0 ? cat.data.indexes.all_ids : cat.data.indexes.all_ids.filter((id) => sets.every((s) => s.has(id)));
    const q = selected.q?.trim().toLowerCase();
    if (q) base = base.filter((id) => cat.data!.channels[id]?.name.toLowerCase().includes(q));
    if (selected.sort === "name") {
      base = base.slice().sort((a, b) => cat.data!.channels[a].name.localeCompare(cat.data!.channels[b].name));
    } else if (selected.sort === "country") {
      base = base.slice().sort((a, b) => cat.data!.channels[a].country.localeCompare(cat.data!.channels[b].country));
    }
    return base;
  }, [cat.data, selected]);

  type S = z.infer<typeof search>;
  const update = (patch: Partial<S>) => {
    navigate({ search: (prev: S) => ({ ...prev, ...patch }), replace: false });
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Browse</h1>
          <p className="mt-1 text-[13px] text-[var(--text-tertiary)]">
            {cat.data ? `${ids.length.toLocaleString()} channels` : "Loading catalog…"}
          </p>
        </div>
        <div className="flex flex-1 items-center gap-2 sm:flex-none">
          <div className="relative flex-1 sm:w-[280px] sm:flex-none">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
            <input
              value={selected.q ?? ""}
              onChange={(e) => update({ q: e.target.value || undefined })}
              placeholder="Filter by name…"
              className="input-field !pl-9"
            />
            {selected.q && (
              <button onClick={() => update({ q: undefined })} aria-label="Clear" className="absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                <X className="size-3.5" />
              </button>
            )}
          </div>
          <SortDropdown
              value={(selected.sort ?? "popular") as SortValue}
              onChange={(v) => update({ sort: v })}
            />
          <button type="button" onClick={() => setMobileFiltersOpen((o) => !o)} className="btn-ghost inline-flex items-center gap-1.5 sm:hidden">
            <SlidersHorizontal className="size-3.5" />
          </button>
        </div>
      </div>

      {cat.data && (
        <div className="mb-4">
          <CategoryBar
            catalog={cat.data}
            active={selected.category}
            onSelect={(id) => update({ category: id })}
          />
        </div>
      )}

      {/* Category bar skeleton */}
      {cat.isLoading && (
        <div className="mb-4 flex gap-2 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="shimmer h-7 w-16 shrink-0 rounded-full" style={{ width: `${56 + (i % 3) * 16}px` }} />
          ))}
        </div>
      )}

      <div className="flex gap-6">
        <aside className={`${mobileFiltersOpen ? "block" : "hidden"} sm:block w-full shrink-0 sm:w-[260px]`}>
          {cat.isLoading && (
            <div className="space-y-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
              {/* Filter title */}
              <div className="shimmer h-3.5 w-16 rounded-full" />
              {/* Country section */}
              <div className="space-y-2 border-t border-[var(--border-subtle)] pt-4">
                <div className="shimmer h-2.5 w-20 rounded-full" />
                <div className="shimmer h-8 w-full rounded-lg" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="shimmer h-4 w-5 rounded-[2px]" />
                    <div className="shimmer h-2.5 rounded-full" style={{ width: `${60 + (i % 4) * 20}px` }} />
                    <div className="shimmer ml-auto h-2 w-6 rounded-full" />
                  </div>
                ))}
              </div>
              {/* Language section */}
              <div className="space-y-2 border-t border-[var(--border-subtle)] pt-4">
                <div className="shimmer h-2.5 w-20 rounded-full" />
                <div className="shimmer h-8 w-full rounded-lg" />
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="shimmer h-2.5 rounded-full" style={{ width: `${70 + (i % 3) * 18}px` }} />
                    <div className="shimmer ml-auto h-2 w-6 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {cat.data && <FilterPanel catalog={cat.data} selected={selected} onChange={(next) => navigate({ search: (p: S) => ({ ...p, category: next.category, language: next.language, country: next.country }), replace: false })} />}
        </aside>
        <div className={`${mobileFiltersOpen ? "hidden" : "block"} sm:block min-w-0 flex-1`}>
          {cat.isLoading && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="shimmer aspect-video w-full rounded-md" />
                  <div className="shimmer h-3 w-3/4 rounded-full" />
                  <div className="shimmer h-2.5 w-1/2 rounded-full" />
                </div>
              ))}
            </div>
          )}
          {cat.data && <ChannelGrid catalog={cat.data} epg={epg.data} channelIds={ids} />}
        </div>
      </div>
    </div>
  );
}
