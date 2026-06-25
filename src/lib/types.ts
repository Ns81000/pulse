export type ChannelStatus =
  | "idle"
  | "checking"
  | "online"
  | "blocked"
  | "timeout"
  | "error"
  | "recovering";

export interface CatalogStream {
  url: string;
  referrer: string | null;
  user_agent: string | null;
  quality: string | null;
  label: string | null;
}

export interface CatalogChannel {
  id: string;
  name: string;
  country: string;
  categories: string[];
  languages: string[];
  streams: CatalogStream[];
  website: string | null;
  logo_url: string | null;
}

export interface Catalog {
  updated_at: string;
  channels: Record<string, CatalogChannel>;
  indexes: {
    by_category: Record<string, string[]>;
    by_language: Record<string, string[]>;
    by_country: Record<string, string[]>;
    all_ids: string[];
  };
  meta: {
    categories: { id: string; name: string }[];
    languages: { name: string; code: string }[];
    countries: { name: string; code: string; flag: string }[];
  };
}

export interface EPGEntry {
  title: string;
  start: string;
  end: string;
  category: string | null;
}

export interface EPGData {
  updated_at: string;
  programs: Record<string, { now: EPGEntry | null; next: EPGEntry | null }>;
}
