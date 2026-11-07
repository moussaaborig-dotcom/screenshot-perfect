import { Link } from "@tanstack/react-router";
import { ArrowRight, LayoutDashboard, Package, PlusCircle, Store as StoreIcon } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export type DashboardTab = "overview" | "products" | "add" | "store";

export function DashboardNav({
  tab,
  className,
  orientation = "vertical",
}: {
  tab: DashboardTab;
  className?: string;
  orientation?: "vertical" | "horizontal";
}) {
  const { t } = useI18n();
  const items: { id: DashboardTab; label: string; icon: typeof Package }[] = [
    { id: "overview", label: t.dashboard.nav.overview, icon: LayoutDashboard },
    { id: "products", label: t.dashboard.nav.products, icon: Package },
    { id: "add", label: t.dashboard.nav.add, icon: PlusCircle },
    { id: "store", label: t.dashboard.nav.store, icon: StoreIcon },
  ];
  const horizontal = orientation === "horizontal";
  return (
    <nav className={cn(horizontal ? "flex gap-1 overflow-x-auto" : "flex flex-col gap-1", className)}>
      {items.map((item) => {
        const active = item.id === tab;
        return (
          <Link
            key={item.id}
            to="/dashboard"
            search={{ tab: item.id }}
            className={cn(
              "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              horizontal
                ? active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                : active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            )}
            aria-current={active ? "page" : undefined}
          >
            <item.icon className={cn("size-4", !horizontal && active && "text-sidebar-primary")} aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSidebar({ tab, storeName }: { tab: DashboardTab; storeName: string }) {
  const { t } = useI18n();
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar p-4 text-sidebar-foreground lg:flex">
      <Link to="/" className="mb-6 px-2 pt-1">
        <Logo tone="inverse" />
      </Link>
      <div className="mb-5 rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
        <p className="text-xs text-sidebar-foreground/70">{t.dashboard.title}</p>
        <p dir="auto" className="truncate font-semibold text-sidebar-accent-foreground">
          {storeName}
        </p>
      </div>
      <DashboardNav tab={tab} />
      <div className="mt-auto space-y-3">
        <LanguageSwitcher tone="inverse" />
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          <ArrowRight className="size-4 ltr:rotate-180" aria-hidden="true" />
          {t.dashboard.nav.backToSite}
        </Link>
      </div>
    </aside>
  );
}
