import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MapPin, MessageCircle, Scale, Search } from "lucide-react";

import { CategoryCard } from "@/components/catalog/CategoryCard";
import { ProductCard, ProductGrid } from "@/components/catalog/ProductCard";
import { StoreCard } from "@/components/catalog/StoreCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SearchBox } from "@/components/search/SearchBox";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import {
  getCategories,
  getFeaturedStores,
  getLatestProducts,
  getProducts,
  getStores,
  POPULAR_SEARCHES,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "WIN — وين تلقى واش تحتاج؟ | Boutiques de Sidi Mezghiche" },
      {
        name: "description",
        content:
          "Trouvez les commerces de Sidi Mezghiche, comparez produits et prix en DZD, et contactez directement les boutiques sur WhatsApp.",
      },
      { property: "og:title", content: "WIN — وين تلقى واش تحتاج؟" },
      {
        property: "og:description",
        content: "La plateforme locale pour découvrir les boutiques et produits de Sidi Mezghiche.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, formatNumber } = useI18n();
  const categories = getCategories();
  const featured = getFeaturedStores(4);
  const latest = getLatestProducts(8);
  const howIcons = [Search, Scale, MessageCircle];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-page relative pb-16 pt-12 sm:pb-24 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1 text-xs font-medium text-primary-foreground/85 sm:text-sm">
              <MapPin className="size-3.5 text-brand-green" aria-hidden="true" />
              {t.home.location}
            </p>
            <h1
              lang="ar"
              dir="rtl"
              className="font-ar text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
            >
              وين تلقى <span className="text-brand-green">واش تحتاج</span>؟
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/75 sm:text-lg">
              {t.home.heroText}
            </p>
            <div className="mx-auto mt-8 max-w-2xl text-start text-foreground">
              <SearchBox size="hero" />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-primary-foreground/60">{t.search.popular}</span>
              {POPULAR_SEARCHES.map((q) => (
                <Link
                  key={q}
                  to="/search"
                  search={{ q }}
                  dir="auto"
                  className="rounded-full border border-primary-foreground/15 px-3 py-1 text-primary-foreground/85 transition-colors hover:border-brand-green hover:text-primary-foreground"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>

          <dl className="mx-auto mt-12 grid max-w-xl grid-cols-3 [&>*+*]:border-s [&>*+*]:border-primary-foreground/10">
            {[
              { n: getStores().length, label: t.home.stats.stores },
              { n: getProducts().length, label: t.home.stats.products },
              { n: categories.length, label: t.home.stats.categories },
            ].map((s) => (
              <div key={s.label} className="px-2 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="num text-2xl font-bold sm:text-3xl">{formatNumber(s.n)}</dd>
                <dd className="mt-0.5 text-xs text-primary-foreground/60 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page relative z-10 -mt-6 sm:-mt-8">
        <div className="rounded-3xl border bg-card p-4 shadow-card sm:p-6">
          <SectionHeader title={t.home.categoriesTitle} text={t.home.categoriesText} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
            {categories.map((c) => (
              <CategoryCard key={c.id} category={c} className="xl:p-4" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured stores */}
      <section className="container-page mt-14 sm:mt-20">
        <SectionHeader
          title={t.home.featuredTitle}
          text={t.home.featuredText}
          linkLabel={t.home.viewAll}
          link={{ to: "/search" }}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <StoreCard key={s.id} store={s} />
          ))}
        </div>
      </section>

      {/* Latest products */}
      <section className="container-page mt-14 sm:mt-20">
        <SectionHeader
          title={t.home.latestTitle}
          text={t.home.latestText}
          linkLabel={t.home.viewAll}
          link={{ to: "/search" }}
        />
        <ProductGrid>
          {latest.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ProductGrid>
      </section>

      {/* How it works */}
      <section className="container-page mt-14 sm:mt-20">
        <h2 className="mb-6 text-xl font-bold tracking-tight sm:text-2xl">{t.home.howTitle}</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {t.home.how.map((step, i) => {
            const Icon = howIcons[i] ?? Search;
            return (
              <li key={step.title} className="flex gap-4 rounded-2xl border bg-card p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-green-soft text-brand-green">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">
                    <span className="num me-1.5 text-muted-foreground">0{i + 1}</span>
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Merchant CTA */}
      <section className="container-page mt-14 sm:mt-20">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-6 text-primary-foreground sm:p-10 lg:p-12">
          <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.home.ctaTitle}</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-primary-foreground/75">{t.home.ctaText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/dashboard" search={{ tab: "add" }} className={buttonVariants({ variant: "accent", size: "lg" })}>
                  {t.home.ctaButton}
                </Link>
                <Link to="/dashboard" className={buttonVariants({ variant: "hero-outline", size: "lg" })}>
                  {t.home.ctaSecondary}
                </Link>
              </div>
            </div>
            <ul className="space-y-3">
              {t.home.ctaPoints.map((p) => (
                <li
                  key={p}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3 text-sm sm:text-base",
                  )}
                >
                  <CheckCircle2 className="size-5 shrink-0 text-brand-green" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
