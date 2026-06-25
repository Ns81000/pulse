import { useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import type { Catalog } from "@/lib/types";

const CODE_MAP: Record<string, string> = {
  uk: "gb",
  int: "",
};
function toFlagCode(code: string): string {
  const lower = code.toLowerCase();
  return CODE_MAP[lower] ?? lower;
}

interface Props {
  catalog: Catalog;
  selected: { category?: string; language?: string; country?: string };
  onChange: (next: { category?: string; language?: string; country?: string }) => void;
}

function FacetGroup({
  label,
  options,
  active,
  onSelect,
  isCountry,
}: {
  label: string;
  options: { id: string; name: string; flag?: string; count: number }[];
  active?: string;
  onSelect: (id: string | undefined) => void;
  isCountry?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => options.filter((o) => !q || o.name.toLowerCase().includes(q.toLowerCase())).slice(0, 50),
    [options, q],
  );
  return (
    <div className="border-b border-[var(--border-subtle)] py-5 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-[11px] font-medium uppercase tracking-wider text-[var(--text-secondary)]"
      >
        <span>{label}</span>
        <ChevronDown className={`size-3.5 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && (
        <div className="mt-2 space-y-1.5">
          <input
            className="input-field !py-1.5 !text-[12px]"
            placeholder={`Search ${label.toLowerCase()}…`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="max-h-80 overflow-y-auto pr-1">
            {filtered.map((o) => (
              <button
                type="button"
                key={o.id}
                onClick={() => onSelect(active === o.id ? undefined : o.id)}
                className={`flex w-full items-center justify-between rounded-[4px] px-2 py-1.5 text-left text-[12px] transition-colors ${
                  active === o.id
                    ? "bg-[var(--accent-subtle)] text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  {isCountry && o.id
                    ? (() => {
                        const code = toFlagCode(o.id);
                        if (!code) return null;
                        return (
                          <img
                            src={`https://flagcdn.com/w20/${code}.png`}
                            srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
                            width={20}
                            height={15}
                            alt={o.name}
                            className="shrink-0 rounded-[2px] object-cover"
                          />
                        );
                      })()
                    : null}
                  <span className="truncate">{o.name}</span>
                </span>
                <span className="ml-2 shrink-0 text-[10px] text-[var(--text-tertiary)]">
                  {o.count}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-2 py-2 text-[11px] text-[var(--text-tertiary)]">No matches</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function FilterPanel({ catalog, selected, onChange }: Props) {
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
          flag: c.flag,
          count: catalog.indexes.by_country[c.code]?.length ?? 0,
        }))
        .filter((c) => c.count > 0)
        .sort((a, b) => b.count - a.count),
    [catalog],
  );

  const hasAny = selected.category || selected.language || selected.country;

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-medium">Filters</h3>
        {hasAny && (
          <button
            type="button"
            onClick={() =>
              onChange({ category: undefined, language: undefined, country: undefined })
            }
            className="inline-flex items-center gap-1 text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
          >
            <X className="size-3" />
            Clear
          </button>
        )}
      </div>
      <FacetGroup
        label="Country"
        options={countries}
        active={selected.country}
        isCountry
        onSelect={(id) => onChange({ ...selected, country: id })}
      />
      <FacetGroup
        label="Language"
        options={langs}
        active={selected.language}
        onSelect={(id) => onChange({ ...selected, language: id })}
      />
    </div>
  );
}
