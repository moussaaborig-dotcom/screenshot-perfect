import type { SearchFilters, SortOption } from "./catalog";

const SORTS: SortOption[] = ["relevance", "price_asc", "price_desc"];

function num(v: unknown): number | undefined {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() ? Number(v) : NaN;
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

function str(v: unknown): string | undefined {
  if (typeof v === "number") return String(v);
  return typeof v === "string" && v.trim() ? v : undefined;
}

/** Validates /search URL params into typed filters. */
export function parseSearchParams(raw: Record<string, unknown>): SearchFilters {
  const sort = str(raw["sort"]) as SortOption | undefined;
  return {
    q: str(raw["q"]),
    category: str(raw["category"]),
    store: str(raw["store"]),
    min: num(raw["min"]),
    max: num(raw["max"]),
    sort: sort && SORTS.includes(sort) ? sort : undefined,
  };
}
