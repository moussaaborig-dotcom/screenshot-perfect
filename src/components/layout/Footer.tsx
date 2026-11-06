import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/I18nProvider";
import { getCategories } from "@/lib/catalog";

export function Footer() {
  const { t, l } = useI18n();
  const link = "text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground";
  const heading = "mb-3 text-sm font-semibold text-primary-foreground";

  return (
    <footer className="mt-16 bg-primary text-primary-foreground sm:mt-24">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-1">
          <Logo tone="inverse" />
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">{t.footer.about}</p>
          <p className="flex items-center gap-1.5 text-sm text-primary-foreground/80">
            <MapPin className="size-4 text-brand-green" aria-hidden="true" />
            {t.home.location}
          </p>
        </div>

        <div>
          <h3 className={heading}>{t.footer.explore}</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className={link}>
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link to="/search" className={link}>
                {t.nav.search}
              </Link>
            </li>
            <li>
              <Link to="/search" search={{ sort: "price_asc" }} className={link}>
                {t.results.sortPriceAsc}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={heading}>{t.footer.categories}</h3>
          <ul className="space-y-2">
            {getCategories()
              .slice(0, 5)
              .map((c) => (
                <li key={c.id}>
                  <Link to="/category/$slug" params={{ slug: c.slug }} className={link}>
                    {l(c.name)}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className={heading}>{t.footer.merchants}</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/dashboard" className={link}>
                {t.footer.registerStore}
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={link}>
                {t.footer.dashboardPreview}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="num">2026</span> {t.footer.rights} · {t.prototype.sample}
          </p>
          <p>{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
