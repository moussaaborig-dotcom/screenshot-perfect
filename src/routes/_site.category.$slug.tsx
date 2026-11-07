import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PackageOpen, Store as StoreIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { CategoryCard } from "@/components/catalog/CategoryCard";
import { CategoryIcon } from "@/components/catalog/CategoryIcon";
import { ProductCard, ProductGrid } from "@/components/catalog/ProductCard";
import { StoreCard } from "@/components/catalog/StoreCard";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeader } from "@/components/common/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
  getStoresByCategory,
  type SortOption,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/category/$slug")({
  loader: ({ params }) => {
    const category = getCategoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.category;
    const title = c ? `${c.name.fr} · ${c.name.ar} — WIN Sidi Mezghiche` : "Catégorie — WIN";
    const description = c?.description.fr ?? "Catégorie de boutiques à Sidi Mezghiche.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryNotFound() {
  const { t } = useI18n();
  return (
    <div className="container-page py-16">
      <EmptyState
        icon={PackageOpen}
        title={t.empty.notFoundTitle}
        text={t.empty.notFoundText}
        action={
          <Link to="/" className={buttonVariants()}>
            {t.empty.backHome}
          </Link>
        }
      />
    </div>
  );
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const { t, l } = useI18n();
  const [storeFilter, setStoreFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("relevance");

  const stores = getStoresByCategory(category.id);
  const products = useMemo(() => {
    let list = getProductsByCategory(category.id);
    if (storeFilter !== "all") list = list.filter((p) => p.storeId === storeFilter);
    if (sort === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category.id, storeFilter, sort]);
  const others = getCategories().filter((c) => c.id !== category.id);

  const chip = (active: boolean) =>
    cn(
      "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
      active ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground",
    );

  return (
    <>
      <section className="border-b bg-card">
        <div className="container-page flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:py-12">
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground sm:size-20">
            <CategoryIcon name={category.icon} className="size-8 sm:size-9" />
          </span>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">{l(category.name)}</h1>
            <p className="max-w-2xl text-muted-foreground sm:text-lg">{l(category.description)}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium text-primary">
              <span>{t.catalog.storesCount(stores.length)}</span>
              <span>{t.catalog.productsCount(getProductsByCategory(category.id).length)}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="container-page">
        {/* Category switcher */}
        <nav className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1" aria-label={t.nav.categories}>
          {getCategories().map((c) => (
            <Link key={c.id} to="/category/$slug" params={{ slug: c.slug }} className={chip(c.id === category.id)}>
              {l(c.name)}
            </Link>
          ))}
        </nav>

        <section className="mt-10">
          <SectionHeader title={t.category.stores} />
          {stores.length === 0 ? (
            <EmptyState
              icon={StoreIcon}
              title={t.category.noStoresTitle}
              text={t.category.noStoresText}
              action={
                <Link to="/dashboard" className={buttonVariants({ variant: "accent" })}>
                  {t.home.ctaButton}
                </Link>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stores.map((s) => (
                <StoreCard key={s.id} store={s} />
              ))}
            </div>
          )}
        </section>

        {stores.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{t.category.products}</h2>
              <select
                aria-label={t.results.sort}
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="h-10 rounded-lg border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="relevance">{t.results.sortRelevance}</option>
                <option value="price_asc">{t.results.sortPriceAsc}</option>
                <option value="price_desc">{t.results.sortPriceDesc}</option>
              </select>
            </div>
            {stores.length > 1 && (
              <div className="mb-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={t.category.filterByStore}>
                <button type="button" className={chip(storeFilter === "all")} onClick={() => setStoreFilter("all")}>
                  {t.category.allStores}
                </button>
                {stores.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    dir="auto"
                    className={chip(storeFilter === s.id)}
                    onClick={() => setStoreFilter(s.id)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            )}
            {products.length === 0 ? (
              <EmptyState icon={PackageOpen} title={t.category.noProductsTitle} text={t.category.noProductsText} />
            ) : (
              <ProductGrid>
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </ProductGrid>
            )}
          </section>
        )}

        <section className="mt-14">
          <SectionHeader title={t.category.otherCategories} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {others.slice(0, 4).map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
