import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, Eye, MapPin, MessageCircle, Package, PackageX, Pencil, Phone, Lightbulb } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AvailabilityBadge } from "@/components/catalog/Availability";
import { StoreLogo } from "@/components/catalog/StoreLogo";
import { AddProductForm, type NewProductInput } from "@/components/dashboard/AddProductForm";
import { DashboardNav, DashboardSidebar, type DashboardTab } from "@/components/dashboard/DashboardSidebar";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategoryById, getProductsByStore, getStoreBySlug } from "@/lib/catalog";
import type { Product } from "@/types/catalog";

const TABS: DashboardTab[] = ["overview", "products", "add", "store"];

/** Preview merchant — the dashboard shows this sample store. */
const PREVIEW_STORE_SLUG = "mezghiche-mobile";
/** Illustrative stats for the prototype. */
const MOCK_STATS = { views: 1284, whatsapp: 96 };

export const Route = createFileRoute("/dashboard")({
  validateSearch: (raw: Record<string, unknown>): { tab?: DashboardTab } => {
    const tab = raw["tab"] as DashboardTab;
    return TABS.includes(tab) ? { tab } : {};
  },
  head: () => ({
    meta: [
      { title: "Espace commerçant (aperçu) — WIN" },
      {
        name: "description",
        content: "Aperçu de l'espace commerçant WIN : gérez la fiche de votre boutique et vos produits.",
      },
      { property: "og:title", content: "Espace commerçant — WIN" },
      { property: "og:description", content: "Inscrivez votre boutique de Sidi Mezghiche sur WIN." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { tab = "overview" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { t, l, formatNumber, formatPrice } = useI18n();
  const store = getStoreBySlug(PREVIEW_STORE_SLUG)!;
  const category = getCategoryById(store.categoryId);
  const [products, setProducts] = useState<Product[]>(() => getProductsByStore(store.id));

  const outOfStock = products.filter((p) => p.availability === "out_of_stock").length;
  const titles: Record<DashboardTab, string> = {
    overview: t.dashboard.nav.overview,
    products: t.dashboard.nav.products,
    add: t.dashboard.form.title,
    store: t.dashboard.storeInfo.title,
  };

  function addProduct(input: NewProductInput) {
    const product: Product = {
      id: `draft-${Date.now()}`,
      name: input.name,
      brand: input.brand || undefined,
      model: input.model || undefined,
      categoryId: input.categoryId,
      storeId: store.id,
      price: input.price,
      availability: input.availability,
      images: [input.image ?? store.coverImage],
      description: { ar: input.description, fr: input.description },
      specs: input.specs.map((s) => ({ label: { ar: s.label, fr: s.label }, value: s.value })),
      keywords: [],
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setProducts((prev) => [product, ...prev]);
    toast.success(t.dashboard.form.success);
    navigate({ search: { tab: "products" } });
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar tab={tab} storeName={store.name} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 border-b bg-card lg:hidden">
          <div className="flex h-14 items-center justify-between gap-2 px-4">
            <Link to="/">
              <Logo />
            </Link>
            <LanguageSwitcher />
          </div>
          <DashboardNav tab={tab} orientation="horizontal" className="px-3 pb-2" />
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-warning-soft px-2.5 py-0.5 text-xs font-medium text-warning">
                {t.dashboard.previewBadge}
              </span>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{titles[tab]}</h1>
              {tab === "add" && <p className="mt-1 text-sm text-muted-foreground">{t.dashboard.form.subtitle}</p>}
              {tab === "store" && <p className="mt-1 text-sm text-muted-foreground">{t.dashboard.storeInfo.subtitle}</p>}
            </div>
            {tab !== "add" && (
              <Link to="/dashboard" search={{ tab: "add" }} className={buttonVariants({ variant: "accent" })}>
                {t.dashboard.nav.add}
              </Link>
            )}
          </div>

          {tab === "overview" && (
            <div className="space-y-6">
              <div className="rounded-2xl border bg-card p-5 shadow-card">
                <p className="font-semibold">
                  {t.dashboard.welcome} <span dir="auto">{store.name}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{t.dashboard.welcomeText}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                <StatCard icon={Eye} label={t.dashboard.stats.views} value={formatNumber(MOCK_STATS.views)} hint={t.dashboard.stats.last30} />
                <StatCard
                  icon={MessageCircle}
                  label={t.dashboard.stats.whatsapp}
                  value={formatNumber(MOCK_STATS.whatsapp)}
                  hint={t.dashboard.stats.last30}
                  tone="green"
                />
                <StatCard icon={Package} label={t.dashboard.stats.products} value={formatNumber(products.length)} />
                <StatCard icon={PackageX} label={t.dashboard.stats.outOfStock} value={formatNumber(outOfStock)} tone="warning" />
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
                <div className="rounded-2xl border bg-card shadow-card">
                  <div className="flex items-center justify-between border-b px-5 py-4">
                    <h2 className="font-semibold">{t.dashboard.recentProducts}</h2>
                    <Link to="/dashboard" search={{ tab: "products" }} className="text-sm font-semibold text-primary hover:text-brand-green">
                      {t.home.viewAll}
                    </Link>
                  </div>
                  <ul className="divide-y">
                    {products.slice(0, 4).map((p) => (
                      <li key={p.id} className="flex items-center gap-3 px-5 py-3">
                        <img src={p.images[0]} alt="" className="size-11 rounded-lg bg-muted object-cover" />
                        <div className="min-w-0 flex-1">
                          <p dir="auto" className="truncate text-sm font-medium">
                            {p.name}
                          </p>
                          <p className="num text-xs text-muted-foreground">{formatPrice(p.price)}</p>
                        </div>
                        <AvailabilityBadge status={p.availability} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border bg-card p-5 shadow-card">
                  <h2 className="mb-3 flex items-center gap-2 font-semibold">
                    <Lightbulb className="size-4 text-brand-green" aria-hidden="true" />
                    {t.dashboard.tips}
                  </h2>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {t.dashboard.tipsList.map((tip) => (
                      <li key={tip} className="flex gap-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-green" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "products" && (
            <ProductsTable
              products={products}
              onAvailabilityChange={(id, availability) =>
                setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, availability } : p)))
              }
              onDelete={(id) => {
                setProducts((prev) => prev.filter((p) => p.id !== id));
                toast(t.dashboard.table.deleted);
              }}
            />
          )}

          {tab === "add" && <AddProductForm defaultCategoryId={store.categoryId} onSubmit={addProduct} />}

          {tab === "store" && (
            <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
              <div className="h-36 bg-muted sm:h-48">
                <img src={store.coverImage} alt="" className="size-full object-cover" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="-mt-14 mb-4 flex items-end justify-between gap-3">
                  <StoreLogo store={store} size="lg" />
                  <div className="flex gap-2">
                    <button type="button" className={buttonVariants({ variant: "outline" })} onClick={() => toast(t.dashboard.previewBadge)}>
                      <Pencil aria-hidden="true" />
                      {t.dashboard.storeInfo.edit}
                    </button>
                    <Link to="/store/$slug" params={{ slug: store.slug }} className={buttonVariants({ variant: "soft" })}>
                      {t.dashboard.storeInfo.viewPublic}
                    </Link>
                  </div>
                </div>
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <span dir="auto">{store.name}</span>
                  {store.verified && <BadgeCheck className="size-5 text-brand-green" />}
                </h2>
                {category && <p className="text-sm text-muted-foreground">{l(category.name)}</p>}
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{l(store.description)}</p>
                <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                  <div className="rounded-xl bg-background p-4">
                    <dt className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" /> {t.store.address}
                    </dt>
                    <dd className="font-medium">{l(store.address)}</dd>
                  </div>
                  <div className="rounded-xl bg-background p-4">
                    <dt className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="size-3.5" /> {t.store.phone} · {t.store.placeholderPhone}
                    </dt>
                    <dd dir="ltr" className="num text-start font-medium">
                      {store.phone}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-background p-4">
                    <dt className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5" /> {t.store.hours}
                    </dt>
                    {store.openingHours.map((h) => (
                      <dd key={h.days.fr} className="flex justify-between gap-2">
                        <span>{l(h.days)}</span>
                        <span className="num font-medium">{h.hours ?? t.store.closed}</span>
                      </dd>
                    ))}
                  </div>
                </dl>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
