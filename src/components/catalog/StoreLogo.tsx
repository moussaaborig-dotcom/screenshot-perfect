import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { Store } from "@/types/catalog";

const logo = cva(
  "grid shrink-0 place-items-center rounded-xl font-bold ring-4 ring-card select-none",
  {
    variants: {
      tone: {
        navy: "bg-primary text-primary-foreground",
        green: "bg-brand-green text-brand-green-foreground",
        slate: "bg-secondary text-secondary-foreground",
        amber: "bg-warning-soft text-warning",
      },
      size: {
        sm: "size-10 text-sm",
        md: "size-14 text-lg",
        lg: "size-20 text-2xl sm:size-24 sm:text-3xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export function StoreLogo({
  store,
  size,
  className,
}: {
  store: Pick<Store, "logoInitials" | "logoTone" | "name">;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span className={cn(logo({ tone: store.logoTone, size }), className)} aria-hidden="true">
      {store.logoInitials}
    </span>
  );
}
