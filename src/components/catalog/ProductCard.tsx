import { Link } from "@tanstack/react-router";
import { Store as StoreIcon } from "lucide-react";

import { useI18n } from "@/i18n/I18nProvider";
import { getStoreById } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/catalog";
import { AvailabilityBadge } from "./Availability";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { formatPrice } = useI18n();
  const store = getStoreById(product.storeId);
  const unavailable = product.availability === "out_of_stock";

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          width={816}
          height={816}
          className={cn(
            "size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
            unavailable && "opacity-60 grayscale",
          )}
        />
        <AvailabilityBadge status={product.availability} className="absolute top-2.5 start-2.5 shadow-sm" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5 sm:p-4">
        <h3 dir="auto" className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-[0.95rem]">
          {product.name}
        </h3>
        {product.model && (
          <p dir="ltr" className="num truncate text-start text-xs text-muted-foreground">
            {product.model}
          </p>
        )}
        <div className="mt-auto flex flex-col gap-1.5 pt-2">
          <p className="num text-lg font-bold text-primary">{formatPrice(product.price)}</p>
          {store && (
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <StoreIcon className="size-3.5 shrink-0" aria-hidden="true" />
              <span dir="auto" className="truncate">
                {store.name}
              </span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card" aria-hidden="true">
      <div className="aspect-square animate-pulse bg-muted" />
      <div className="space-y-2.5 p-4">
        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

export function ProductGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4", className)}>
      {children}
    </div>
  );
}
