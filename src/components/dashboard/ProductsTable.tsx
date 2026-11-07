import { Link } from "@tanstack/react-router";
import { ExternalLink, PackageOpen, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { useAvailabilityLabel } from "@/components/catalog/Availability";
import { EmptyState } from "@/components/common/EmptyState";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useI18n } from "@/i18n/I18nProvider";
import { getProductById } from "@/lib/catalog";
import { normalizeText } from "@/lib/text-search";
import { cn } from "@/lib/utils";
import type { Availability, Product } from "@/types/catalog";

const AVAIL: Availability[] = ["in_stock", "low_stock", "out_of_stock"];

export function ProductsTable({
  products,
  onAvailabilityChange,
  onDelete,
}: {
  products: Product[];
  onAvailabilityChange: (id: string, availability: Availability) => void;
  onDelete: (id: string) => void;
}) {
  const { t, formatPrice } = useI18n();
  const availLabel = useAvailabilityLabel();
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return q ? products.filter((p) => normalizeText(`${p.name} ${p.model ?? ""}`).includes(q)) : products;
  }, [products, query]);

  const selectTone = (a: Availability) =>
    a === "in_stock"
      ? "bg-brand-green-soft text-brand-green"
      : a === "low_stock"
        ? "bg-warning-soft text-warning"
        : "bg-muted text-muted-foreground";

  return (
    <div className="rounded-2xl border bg-card shadow-card">
      <div className="border-b p-4">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.dashboard.table.search}
            aria-label={t.dashboard.table.search}
            className="h-10 w-full rounded-lg border bg-background ps-9 pe-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={PackageOpen} title={t.dashboard.table.empty} className="m-4 border-0" />
      ) : (
        <ul className="divide-y">
          <li className="hidden grid-cols-[1fr_8rem_10rem_6rem] gap-4 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground md:grid">
            <span>{t.dashboard.table.product}</span>
            <span>{t.dashboard.table.price}</span>
            <span>{t.dashboard.table.availability}</span>
            <span className="text-end">{t.dashboard.table.actions}</span>
          </li>
          {filtered.map((p) => {
            const isPublic = Boolean(getProductById(p.id));
            return (
              <li
                key={p.id}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 md:grid-cols-[1fr_8rem_10rem_6rem]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img src={p.images[0]} alt="" className="size-12 shrink-0 rounded-lg bg-muted object-cover" />
                  <div className="min-w-0">
                    <p dir="auto" className="truncate text-sm font-medium">
                      {p.name}
                    </p>
                    {p.model && (
                      <p dir="ltr" className="num truncate text-start text-xs text-muted-foreground">
                        {p.model}
                      </p>
                    )}
                  </div>
                </div>
                <p className="num text-sm font-semibold text-primary md:order-none">{formatPrice(p.price)}</p>
                <select
                  aria-label={t.dashboard.table.availability}
                  value={p.availability}
                  onChange={(e) => onAvailabilityChange(p.id, e.target.value as Availability)}
                  className={cn(
                    "h-9 rounded-lg border-0 px-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring",
                    selectTone(p.availability),
                  )}
                >
                  {AVAIL.map((a) => (
                    <option key={a} value={a}>
                      {availLabel(a)}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end gap-1">
                  {isPublic && (
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
                      aria-label={t.dashboard.table.view}
                    >
                      <ExternalLink className="size-4" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setPendingDelete(p)}
                    className="grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-destructive-soft hover:text-destructive"
                    aria-label={t.dashboard.table.delete}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AlertDialog open={pendingDelete != null} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.dashboard.table.confirmDelete}</AlertDialogTitle>
            <AlertDialogDescription>
              <span dir="auto" className="font-medium text-foreground">
                {pendingDelete?.name}
              </span>
              <br />
              {t.dashboard.table.confirmDeleteText}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.dashboard.table.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (pendingDelete) onDelete(pendingDelete.id);
                setPendingDelete(null);
              }}
            >
              {t.dashboard.table.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
