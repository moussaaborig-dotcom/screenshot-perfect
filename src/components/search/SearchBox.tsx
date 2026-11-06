import { useNavigate } from "@tanstack/react-router";
import { LayoutGrid, Search, Store as StoreIcon, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import { CategoryIcon } from "@/components/catalog/CategoryIcon";
import { useI18n } from "@/i18n/I18nProvider";
import { getStoreById, getSuggestions } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Item =
  | { kind: "product"; id: string; label: string; sub: string; image: string }
  | { kind: "store"; id: string; slug: string; label: string; sub: string }
  | { kind: "category"; id: string; slug: string; label: string; icon: Parameters<typeof CategoryIcon>[0]["name"] }
  | { kind: "all"; id: string; label: string };

interface SearchBoxProps {
  defaultValue?: string;
  size?: "hero" | "default";
  autoFocus?: boolean;
  className?: string;
  /** Called after navigating, e.g. to close a mobile menu. */
  onNavigate?: () => void;
}

export function SearchBox({ defaultValue = "", size = "default", autoFocus, className, onNavigate }: SearchBoxProps) {
  const { t, l, formatPrice } = useI18n();
  const navigate = useNavigate();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => setValue(defaultValue), [defaultValue]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const groups = useMemo(() => {
    const s = getSuggestions(value);
    const products: Item[] = s.products.map((p) => ({
      kind: "product",
      id: p.id,
      label: p.name,
      sub: `${formatPrice(p.price)} · ${getStoreById(p.storeId)?.name ?? ""}`,
      image: p.images[0],
    }));
    const stores: Item[] = s.stores.map((st) => ({
      kind: "store",
      id: st.id,
      slug: st.slug,
      label: st.name,
      sub: l(st.address),
    }));
    const categories: Item[] = s.categories.map((c) => ({
      kind: "category",
      id: c.id,
      slug: c.slug,
      label: l(c.name),
      icon: c.icon,
    }));
    return { products, stores, categories };
  }, [value, l, formatPrice]);

  const flat: Item[] = useMemo(() => {
    const items = [...groups.categories, ...groups.stores, ...groups.products];
    if (value.trim()) items.push({ kind: "all", id: "all", label: value.trim() });
    return items;
  }, [groups, value]);

  const showPanel = open && value.trim().length > 0;

  function go(item: Item) {
    setOpen(false);
    setActive(-1);
    if (item.kind === "product") navigate({ to: "/product/$id", params: { id: item.id } });
    else if (item.kind === "store") navigate({ to: "/store/$slug", params: { slug: item.slug } });
    else if (item.kind === "category") navigate({ to: "/category/$slug", params: { slug: item.slug } });
    else navigate({ to: "/search", search: { q: item.label } });
    onNavigate?.();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (active >= 0 && flat[active]) return go(flat[active]);
    setOpen(false);
    navigate({ to: "/search", search: value.trim() ? { q: value.trim() } : {} });
    onNavigate?.();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!showPanel) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? flat.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  }

  const hero = size === "hero";
  let index = -1;

  const renderItem = (item: Item) => {
    index += 1;
    const i = index;
    const isActive = i === active;
    return (
      <li key={`${item.kind}-${item.id}`} role="option" aria-selected={isActive} id={`${listId}-${i}`}>
        <button
          type="button"
          onMouseEnter={() => setActive(i)}
          onClick={() => go(item)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-start transition-colors",
            isActive ? "bg-accent" : "hover:bg-accent",
          )}
        >
          {item.kind === "product" && (
            <img src={item.image} alt="" className="size-10 shrink-0 rounded-md bg-muted object-cover" />
          )}
          {item.kind === "store" && (
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
              <StoreIcon className="size-4" aria-hidden="true" />
            </span>
          )}
          {item.kind === "category" && (
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-brand-green-soft text-brand-green">
              <CategoryIcon name={item.icon} className="size-4" />
            </span>
          )}
          {item.kind === "all" ? (
            <span className="flex items-center gap-2 text-sm text-primary">
              <Search className="size-4" aria-hidden="true" />
              {t.search.suggestions.seeAll} <strong dir="auto">« {item.label} »</strong>
            </span>
          ) : (
            <span className="min-w-0">
              <span dir="auto" className="block truncate text-sm font-medium text-foreground">
                {item.label}
              </span>
              {"sub" in item && (
                <span dir="auto" className="block truncate text-xs text-muted-foreground">
                  {item.sub}
                </span>
              )}
            </span>
          )}
        </button>
      </li>
    );
  };

  const groupTitle = (label: string, Icon?: typeof LayoutGrid) => (
    <p className="flex items-center gap-1.5 px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
      {Icon && <Icon className="size-3" aria-hidden="true" />}
      {label}
    </p>
  );

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <form onSubmit={onSubmit} role="search" className="relative">
        <Search
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground start-4",
            hero ? "size-5" : "size-4 start-3.5",
          )}
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={t.search.placeholder}
          aria-label={t.search.placeholder}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          className={cn(
            "w-full border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring [&::-webkit-search-cancel-button]:hidden",
            hero
              ? "h-14 rounded-2xl ps-12 pe-32 text-base shadow-search sm:h-16 sm:text-lg"
              : "h-11 rounded-xl ps-10 pe-24 text-sm",
          )}
        />
        <div className="absolute inset-y-0 end-1.5 flex items-center gap-1">
          {value && (
            <button
              type="button"
              onClick={() => {
                setValue("");
                setActive(-1);
              }}
              className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted"
              aria-label="Clear"
            >
              <X className="size-4" />
            </button>
          )}
          <button
            type="submit"
            className={cn(
              "rounded-xl bg-brand-green font-semibold text-brand-green-foreground transition-colors hover:bg-brand-green/90",
              hero ? "h-11 px-5 sm:h-12 sm:px-6" : "h-8 px-3 text-sm",
            )}
          >
            {t.search.button}
          </button>
        </div>
      </form>

      {showPanel && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border bg-popover p-1.5 text-popover-foreground shadow-lift">
          <ul id={listId} role="listbox" className="max-h-[60vh] overflow-y-auto">
            {groups.categories.length > 0 && groupTitle(t.search.suggestions.categories, LayoutGrid)}
            {groups.categories.map(renderItem)}
            {groups.stores.length > 0 && groupTitle(t.search.suggestions.stores, StoreIcon)}
            {groups.stores.map(renderItem)}
            {groups.products.length > 0 && groupTitle(t.search.suggestions.products, Search)}
            {groups.products.map(renderItem)}
            {flat.length === 1 && (
              <p className="px-3 py-2 text-sm text-muted-foreground">{t.search.suggestions.none}</p>
            )}
            <li className="mt-1 border-t pt-1" role="presentation" />
            {renderItem(flat[flat.length - 1])}
          </ul>
        </div>
      )}
    </div>
  );
}
