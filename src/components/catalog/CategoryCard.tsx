import { Link } from "@tanstack/react-router";

import { useI18n } from "@/i18n/I18nProvider";
import { countStoresByCategory } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/catalog";
import { CategoryIcon } from "./CategoryIcon";

export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  const { t, l } = useI18n();
  const count = countStoresByCategory(category.id);
  return (
    <Link
      to="/category/$slug"
      params={{ slug: category.slug }}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-green/40 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5",
        className,
      )}
    >
      <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-brand-green group-hover:text-brand-green-foreground">
        <CategoryIcon name={category.icon} className="size-5" />
      </span>
      <span className="space-y-0.5">
        <span className="block text-sm font-semibold leading-snug text-foreground sm:text-base">
          {l(category.name)}
        </span>
        <span className="block text-xs text-muted-foreground">{t.catalog.storesCount(count)}</span>
      </span>
    </Link>
  );
}
