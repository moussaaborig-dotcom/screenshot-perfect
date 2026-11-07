import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, BadgeCheck, Info, MapPin, PackageOpen } from "lucide-react";
import { useState } from "react";

import { AvailabilityBadge } from "@/components/catalog/Availability";
import { ProductCard, ProductGrid } from "@/components/catalog/ProductCard";
import { StoreLogo } from "@/components/catalog/StoreLogo";
import { WhatsAppButton } from "@/components/catalog/WhatsAppButton";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionHeader } from "@/components/common/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategoryById, getProductById, getProductsByCategory, getStoreById } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/product/$id")({
  loader: ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw notFound();
    const store = getStoreById(product.storeId);
    if (!store) throw notFound();
    return { product, store };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const s = loaderData?.store;
    const title = p && s ? `${p.name} — ${s.name} | WIN` : "Produit — WIN";
    const description = p?.description.fr ?? "Produit disponible à Sidi Mezghiche.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  const { t } = useI18n();
  return (
    <div className="container-page py-16">
      <EmptyState
        icon={PackageOpen}
        title={t.empty.notFoundTitle}
        text={t.empty.notFoundText}
        action={
          <Link to="/search" className={buttonVariants()}>
            {t.nav.search}
          </Link>
        }
      />
    </div>
  );
}

function ProductPage() {
  const { product, store } = Route.useLoaderData();
  const { t, l, formatPrice } = useI18n();
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const category = getCategoryById(product.categoryId);
  const similar = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container-page py-6 sm:py-10">
      <nav className="mb-5 flex items-center gap-2 text-sm text-muted-foreground" aria-label="breadcrumb">
        <button
          type="button"
          onClick={() => router.history.back()}
          className="inline-flex items-center gap-1 font-medium text-primary hover:text-brand-green"
        >
          <ArrowRight className="size-4 ltr:rotate-180" aria-hidden="true" />
          {t.product.back}
        </button>
        {category && (
          <>
            <span aria-hidden="true">/</span>
            <Link to="/category/$slug" params={{ slug: category.slug }} className="hover:text-foreground">
              {l(category.name)}
            </Link>
          </>
        )}
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="overflow-hidden rounded-3xl border bg-muted">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              width={816}
              height={816}
              className={cn(
                "aspect-square w-full object-cover",
                product.availability === "out_of_stock" && "opacity-70 grayscale",
              )}
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "size-20 overflow-hidden rounded-xl border-2",
                    i === activeImage ? "border-brand-green" : "border-transparent",
                  )}
                  aria-label={`${t.product.image} ${i + 1}`}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <AvailabilityBadge status={product.availability} />
            <h1 dir="auto" className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {product.name}
            </h1>
            {(product.brand || product.model) && (
              <p className="flex flex-wrap gap-2 text-sm">
                {product.brand && (
                  <span className="rounded-md bg-muted px-2 py-0.5 font-medium text-foreground">{product.brand}</span>
                )}
                {product.model && (
                  <span className="rounded-md border px-2 py-0.5 text-muted-foreground">
                    {t.catalog.model}: <span dir="ltr" className="num">{product.model}</span>
                  </span>
                )}
              </p>
            )}
            <p className="num text-3xl font-bold text-primary sm:text-4xl">{formatPrice(product.price)}</p>
          </div>

          {product.model && (
            <p className="flex gap-2 rounded-xl bg-warning-soft p-3 text-sm text-warning">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t.product.modelWarning}
            </p>
          )}

          <div className="space-y-3">
            <WhatsAppButton
              number={store.whatsapp}
              message={t.whatsapp.productMessage(product.name)}
              className="w-full sm:w-auto"
            />
            <p className="flex gap-2 text-xs text-muted-foreground">
              <Info className="size-4 shrink-0" aria-hidden="true" />
              {t.product.contactNote}
            </p>
          </div>

          <section>
            <h2 className="mb-2 font-semibold">{t.product.description}</h2>
            <p className="leading-relaxed text-muted-foreground">{l(product.description)}</p>
          </section>

          {product.specs.length > 0 && (
            <section>
              <h2 className="mb-2 font-semibold">{t.product.specs}</h2>
              <dl className="divide-y overflow-hidden rounded-2xl border bg-card">
                {product.specs.map((s) => (
                  <div key={s.label.fr} className="grid grid-cols-2 gap-4 px-4 py-2.5 text-sm">
                    <dt className="text-muted-foreground">{l(s.label)}</dt>
                    <dd dir="auto" className="font-medium">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section>
            <h2 className="mb-2 font-semibold">{t.product.store}</h2>
            <Link
              to="/store/$slug"
              params={{ slug: store.slug }}
              className="flex items-center gap-4 rounded-2xl border bg-card p-4 transition-colors hover:border-brand-green/40"
            >
              <StoreLogo store={store} size="md" className="ring-0" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-semibold">
                  <span dir="auto" className="truncate">
                    {store.name}
                  </span>
                  {store.verified && <BadgeCheck className="size-4 shrink-0 text-brand-green" />}
                </p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{l(store.address)}</span>
                </p>
              </div>
              <span className="hidden text-sm font-semibold text-primary sm:inline">{t.catalog.viewStore}</span>
            </Link>
          </section>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-14">
          <SectionHeader title={t.product.similar} />
          <ProductGrid>
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ProductGrid>
        </section>
      )}
    </div>
  );
}
