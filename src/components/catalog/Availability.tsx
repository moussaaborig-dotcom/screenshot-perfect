import { cva } from "class-variance-authority";

import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import type { Availability } from "@/types/catalog";

const badge = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      status: {
        in_stock: "bg-brand-green-soft text-brand-green",
        low_stock: "bg-warning-soft text-warning",
        out_of_stock: "bg-muted text-muted-foreground",
      },
    },
  },
);

const dot = cva("size-1.5 rounded-full", {
  variants: {
    status: {
      in_stock: "bg-brand-green",
      low_stock: "bg-warning",
      out_of_stock: "bg-muted-foreground",
    },
  },
});

export function useAvailabilityLabel() {
  const { t } = useI18n();
  return (status: Availability) =>
    status === "in_stock"
      ? t.catalog.inStock
      : status === "low_stock"
        ? t.catalog.lowStock
        : t.catalog.outOfStock;
}

export function AvailabilityBadge({
  status,
  className,
}: {
  status: Availability;
  className?: string;
}) {
  const label = useAvailabilityLabel();
  return (
    <span className={cn(badge({ status }), className)}>
      <span className={dot({ status })} />
      {label(status)}
    </span>
  );
}
