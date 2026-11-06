import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin } from "lucide-react";

import { useI18n } from "@/i18n/I18nProvider";
import { countProductsByStore, getCategoryById } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Store } from "@/types/catalog";
import { StoreLogo } from "./StoreLogo";

export function StoreCard({ store, className }: { store: Store; className?: string }) {
  const { t, l } = useI18n();
  const category = getCategoryById(store.categoryId);
  const count = countProductsByStore(store.id);

  return (
    <Link
      to="/store/$slug"
      params={{ slug: store.slug }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative aspect-[2/1] overflow-hidden bg-muted">
        <img
          src={store.coverImage}
          alt=""
          loading="lazy"
          width={1280}
          height={640}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="relative flex flex-1 flex-col gap-1 px-4 pb-4">
        <StoreLogo store={store} size="md" className="-mt-7 mb-1" />
        <div className="flex items-center gap-1.5">
          <h3 dir="auto" className="truncate font-semibold text-foreground">
            {store.name}
          </h3>
          {store.verified && (
            <BadgeCheck className="size-4 shrink-0 text-brand-green" aria-label={t.catalog.verified} />
          )}
        </div>
        {category && <p className="text-sm text-muted-foreground">{l(category.name)}</p>}
        <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{l(store.address)}</span>
          </span>
          <span className="shrink-0 font-medium text-primary">{t.catalog.productsCount(count)}</span>
        </div>
      </div>
    </Link>
  );
}
