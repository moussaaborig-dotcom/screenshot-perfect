import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategories, getStores, type SearchFilters } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface Props {
  value: SearchFilters;
  onChange: (next: Partial<SearchFilters>) => void;
  onReset: () => void;
  hideCategory?: boolean;
  className?: string;
}

const selectClass =
  "h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

export function SearchFiltersPanel({ value, onChange, onReset, hideCategory, className }: Props) {
  const { t, l } = useI18n();
  const [min, setMin] = useState(value.min?.toString() ?? "");
  const [max, setMax] = useState(value.max?.toString() ?? "");

  useEffect(() => {
    setMin(value.min?.toString() ?? "");
    setMax(value.max?.toString() ?? "");
  }, [value.min, value.max]);

  const category = value.category ? getCategories().find((c) => c.slug === value.category) : undefined;
  const stores = getStores().filter((s) => !category || s.categoryId === category.id);

  function applyPrice() {
    const toNum = (s: string) => (s.trim() === "" || Number.isNaN(Number(s)) ? undefined : Math.max(0, Number(s)));
    onChange({ min: toNum(min), max: toNum(max) });
  }

  return (
    <div className={cn("space-y-5", className)}>
      {!hideCategory && (
        <div>
          <label htmlFor="f-category" className={labelClass}>
            {t.results.category}
          </label>
          <select
            id="f-category"
            className={selectClass}
            value={value.category ?? ""}
            onChange={(e) => onChange({ category: e.target.value || undefined, store: undefined })}
          >
            <option value="">{t.results.allCategories}</option>
            {getCategories().map((c) => (
              <option key={c.id} value={c.slug}>
                {l(c.name)}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="f-store" className={labelClass}>
          {t.results.store}
        </label>
        <select
          id="f-store"
          className={selectClass}
          value={value.store ?? ""}
          onChange={(e) => onChange({ store: e.target.value || undefined })}
        >
          <option value="">{t.results.allStores}</option>
          {stores.map((s) => (
            <option key={s.id} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          applyPrice();
        }}
      >
        <span className={labelClass}>{t.results.price}</span>
        <div className="flex items-center gap-2">
          <input
            inputMode="numeric"
            aria-label={t.results.min}
            placeholder={t.results.min}
            value={min}
            onChange={(e) => setMin(e.target.value.replace(/[^\d]/g, ""))}
            onBlur={applyPrice}
            className={cn(selectClass, "num")}
          />
          <span className="text-muted-foreground">–</span>
          <input
            inputMode="numeric"
            aria-label={t.results.max}
            placeholder={t.results.max}
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ""))}
            onBlur={applyPrice}
            className={cn(selectClass, "num")}
          />
        </div>
        <button type="submit" className="sr-only">
          {t.results.apply}
        </button>
      </form>

      <Button variant="outline" className="w-full" onClick={onReset}>
        {t.results.reset}
      </Button>
    </div>
  );
}
