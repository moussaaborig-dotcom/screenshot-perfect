import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, Clock, MapPin, PackageOpen, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ProductCard, ProductGrid } from "@/components/catalog/ProductCard";
import { StoreLogo } from "@/components/catalog/StoreLogo";
import { WhatsAppButton } from "@/components/catalog/WhatsAppButton";
import { EmptyState } from "@/components/common/EmptyState";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategoryById, getProductsByStore, getStoreBySlug } from "@/lib/catalog";
import { normalizeText } from "@/lib/text-search";
import { telLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/store/$slug")({
  loader: ({ params }) => {
    const store = getStoreBySlug(params.slug);
    if (!store) throw notFound();
    return { store };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.store;
    const title = s ? `${s.name} — Boutique à Sidi Mezghiche | WIN` : "Boutique — WIN";
    const description = s?.description.fr ?? "Boutique locale à Sidi Mezghiche.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: StoreNotFound,
  component: StorePage,
});

function StoreNotFound() {
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

function StorePage() {
  const { store } = Route.useLoaderData();
  const { t, l } = useI18n();
  const [query, setQuery] = useState("");
  const category = getCategoryById(store.categoryId);
  const all = getProductsByStore(store.id);
  const products = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return all;
    return all.filter((p) => normalizeText(`${p.name} ${p.model ?? ""} ${p.keywords.join(" ")}`).includes(q));
  }, [all, query]);

  const card = "rounded-2xl border bg-card p-5";
  const cardTitle = "mb-3 flex items-center gap-2 text-sm font-semibold text-foreground";

  return (
    <>
      {/* Cover */}
      <div className="relative h-44 overflow-hidden bg-muted sm:h-64 lg:h-80">
        <img
          src={store.coverImage}
          alt=""
          width={1280}
          height={640}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
      </div>

      <div className="container-page">
        <div className="relative -mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
            <StoreLogo store={store} size="lg" className="shadow-lift" />
            <div className="space-y-1 sm:pb-1">
              <div className="flex items-center gap-2">
                <h1 dir="auto" className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {store.name}
                </h1>
                {store.verified && (
                  <BadgeCheck className="size-5 text-brand-green" aria-label={t.catalog.verified} />
                )}
              </div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                {category && (
                  <Link
                    to="/category/$slug"
                    params={{ slug: category.slug }}
                    className="font-medium text-primary hover:text-brand-green"
                  >
                    {l(category.name)}
                  </Link>
                )}
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {l(store.address)}
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-2 sm:pb-1">
            <WhatsAppButton number={store.whatsapp} message={t.whatsapp.storeMessage} className="flex-1 sm:flex-none" />
            <a href={telLink(store.phone)} className={buttonVariants({ variant: "outline", size: "lg" })}>
              <Phone aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{t.store.call}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[20rem_1fr]">
          <aside className="space-y-4">
            <div className={card}>
              <h2 className={cardTitle}>{t.store.about}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{l(store.description)}</p>
            </div>
            <div className={card}>
              <h2 className={cardTitle}>
                <Clock className="size-4 text-brand-green" aria-hidden="true" />
                {t.store.hours}
              </h2>
              <dl className="space-y-2 text-sm">
                {store.openingHours.map((h) => (
                  <div key={h.days.fr} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{l(h.days)}</dt>
                    <dd className={cn("num font-medium", !h.hours && "text-destructive")}>
                      {h.hours ?? t.store.closed}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={card}>
              <h2 className={cardTitle}>{t.store.contact}</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">{t.store.address}</dt>
                  <dd className="mt-0.5 font-medium">{l(store.address)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {t.store.phone} · <span className="text-warning">{t.store.placeholderPhone}</span>
                  </dt>
                  <dd className="mt-0.5">
                    <a href={telLink(store.phone)} dir="ltr" className="num font-medium text-primary hover:underline">
                      {store.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-bold tracking-tight">
                {t.store.catalog}{" "}
                <span className="num text-base font-medium text-muted-foreground">({all.length})</span>
              </h2>
              <div className="relative sm:w-72">
                <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.store.searchCatalog}
                  aria-label={t.store.searchCatalog}
                  className="h-10 w-full rounded-lg border bg-card ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            {products.length === 0 ? (
              <EmptyState icon={PackageOpen} title={t.store.emptyCatalog} />
            ) : (
              <ProductGrid className="lg:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </ProductGrid>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
