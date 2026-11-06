import { Link, useRouterState } from "@tanstack/react-router";
import { Info, Menu, Search, Store as StoreIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { SearchBox } from "@/components/search/SearchBox";
import { buttonVariants } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategories } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function PrototypeNotice() {
  const { t } = useI18n();
  return (
    <div className="bg-primary text-primary-foreground">
      <p className="container-page flex items-center justify-center gap-2 py-1.5 text-center text-xs opacity-90">
        <Info className="size-3.5 shrink-0" aria-hidden="true" />
        {t.prototype.notice}
      </p>
    </div>
  );
}

export function Navbar() {
  const { t, l } = useI18n();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => setOpen(false), [pathname]);

  const navLink =
    "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

  return (
    <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container-page flex h-16 items-center gap-3">
        <Link to="/" aria-label="WIN" className="shrink-0">
          <Logo />
        </Link>

        <nav className="ms-4 hidden items-center gap-1 lg:flex">
          <Link to="/" className={navLink} activeProps={{ className: "text-foreground" }} activeOptions={{ exact: true }}>
            {t.nav.home}
          </Link>
          <Link to="/search" className={navLink} activeProps={{ className: "text-foreground" }}>
            {t.nav.search}
          </Link>
          <Link to="/category/$slug" params={{ slug: "electronics" }} className={navLink}>
            {t.nav.categories}
          </Link>
        </nav>

        {!isHome && (
          <div className="mx-auto hidden w-full max-w-md md:block">
            <SearchBox />
          </div>
        )}

        <div className="ms-auto flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/dashboard"
            className={cn(buttonVariants({ variant: "default", size: "default" }), "hidden sm:inline-flex")}
          >
            <StoreIcon aria-hidden="true" />
            {t.nav.forMerchants}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-lg text-foreground hover:bg-accent lg:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {!isHome && (
        <div className="container-page pb-3 md:hidden">
          <SearchBox />
        </div>
      )}

      {open && (
        <div className="border-t bg-card lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            <Link to="/" className={navLink}>
              {t.nav.home}
            </Link>
            <Link to="/search" className={cn(navLink, "flex items-center gap-2")}>
              <Search className="size-4" aria-hidden="true" />
              {t.nav.search}
            </Link>
            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t.nav.categories}
            </p>
            <div className="grid grid-cols-2 gap-1">
              {getCategories().map((c) => (
                <Link key={c.id} to="/category/$slug" params={{ slug: c.slug }} className={navLink}>
                  {l(c.name)}
                </Link>
              ))}
            </div>
            <Link to="/dashboard" className={cn(buttonVariants({ variant: "default" }), "mt-2 sm:hidden")}>
              <StoreIcon aria-hidden="true" />
              {t.nav.dashboard}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
