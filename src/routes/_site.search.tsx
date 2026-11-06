import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Info, SearchX, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ProductCard, ProductCardSkeleton, ProductGrid } from "@/components/catalog/ProductCard";
import { StoreLogo } from "@/components/catalog/StoreLogo";
import { EmptyState } from "@/components/common/EmptyState";
import { SearchBox } from "@/components/search/SearchBox";
import { SearchFiltersPanel } from "@/components/search/SearchFilters";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { searchProducts, searchStores, type SearchFilters, type SortOption } from "@/lib/catalog";
import { parseSearchParams } from "@/lib/search-params";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/search")({
  validateSearch: (raw: Record<string, unknown>): SearchFilters => parseSearchParams(raw),
  head: () => ({
    meta: [
      { title: "Recherche — WIN Sidi Mezghiche" },
      {
        name: "description",
        content: "Recherchez des produits dans les boutiques de Sidi Mezghiche, filtrez par catégorie, boutique et prix.",
      },
      { property: "og:title", content: "Recherche de produits — WIN" },
      { property: "og:description", content: "Comparez les produits et les prix des boutiques locales." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

/** Short simulated latency so loading states are visible in the prototype. */
function useSimulatedLoading(key: string, ms = 350) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(id);
  }, [key, ms]);
  return loading;
}

function SearchPage() {
  const filters = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const { t } = useI18n();
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => searchProducts(filters), [filters]);
  const stores = useMemo(() => (filters.q ? searchStores(filters.q).slice(0, 4) : []), [filters.q]);
  const loading = useSimulatedLoading(JSON.stringify(filters));

  const update = (next: Partial<SearchFilters>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });
  const reset = () => navigate({ search: filters.q ? { q: filters.q } : {}, replace: true });

  const activeFilterCount = [filters.category, filters.store, filters.min, filters.max].filter(
    (v) => v != null,
  ).length;

  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mb-6 max-w-2xl">
        <SearchBox defaultValue={filters.q ?? ""} />
      </div>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {filters.q ? (
              <>
                {t.results.for} <span dir="auto" className="text-brand-green">« {filters.q} »</span>
              </>
            ) : (
              t.results.all
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground" aria-live="polite">
            {loading ? "…" : t.results.count(results.length)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
          >
            <SlidersHorizontal aria-hidden="true" />
            {t.results.filters}
            {activeFilterCount > 0 && (
              <span className="num grid size-5 place-items-center rounded-full bg-brand-green text-[0.7rem] text-brand-green-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>
          <label className="sr-only" htmlFor="sort">
            {t.results.sort}
          </label>
          <select
            id="sort"
            value={filters.sort ?? "relevance"}
            onChange={(e) => update({ sort: e.target.value as SortOption })}
            className="h-10 rounded-lg border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="relevance">{t.results.sortRelevance}</option>
            <option value="price_asc">{t.results.sortPriceAsc}</option>
            <option value="price_desc">{t.results.sortPriceDesc}</option>
          </select>
        </div>
      </div>

      <div className="mb-6 flex gap-3 rounded-2xl border border-primary/10 bg-primary-soft p-4 text-sm text-primary">
        <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="font-semibold">{t.results.modelNoticeTitle}</p>
          <p className="mt-0.5 text-primary/80">{t.results.modelNotice}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <aside className={showFilters ? "block" : "hidden lg:block"}>
          <div className="rounded-2xl border bg-card p-5 lg:sticky lg:top-24">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">{t.results.filters}</h2>
              <button
                type="button"
                className="grid size-8 place-items-center rounded-md hover:bg-muted lg:hidden"
                onClick={() => setShowFilters(false)}
                aria-label={t.nav.closeMenu}
              >
                <X className="size-4" />
              </button>
            </div>
            <SearchFiltersPanel value={filters} onChange={update} onReset={reset} />
          </div>
        </aside>

        <div className="min-w-0 space-y-8">
          {!loading && stores.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-muted-foreground">{t.results.matchingStores}</h2>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {stores.map((s) => (
                  <Link
                    key={s.id}
                    to="/store/$slug"
                    params={{ slug: s.slug }}
                    className="flex shrink-0 items-center gap-3 rounded-xl border bg-card py-2 pe-4 ps-2 transition-colors hover:border-brand-green/40"
                  >
                    <StoreLogo store={s} size="sm" className="ring-0" />
                    <span dir="auto" className="text-sm font-medium">
                      {s.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <ProductGrid className="lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </ProductGrid>
          ) : results.length === 0 ? (
            <EmptyState
              icon={SearchX}
              title={t.results.emptyTitle}
              text={t.results.emptyText}
              action={
                activeFilterCount > 0 ? (
                  <Button variant="outline" onClick={reset}>
                    {t.results.reset}
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <ProductGrid className="lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductGrid>
          )}
        </div>
      </div>
    </div>
  );
}
