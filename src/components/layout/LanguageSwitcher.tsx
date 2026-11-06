import { Languages } from "lucide-react";

import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import type { Lang } from "@/types/catalog";

const OPTIONS: { value: Lang; label: string; short: string }[] = [
  { value: "ar", label: "العربية", short: "ع" },
  { value: "fr", label: "Français", short: "FR" },
];

/** Segmented AR / FR switch — always visible, switches language and direction. */
export function LanguageSwitcher({ className, tone = "default" }: { className?: string; tone?: "default" | "inverse" }) {
  const { lang, setLang, t } = useI18n();
  const inverse = tone === "inverse";
  return (
    <div
      role="radiogroup"
      aria-label={t.lang.label}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5",
        inverse ? "border-sidebar-border bg-sidebar-accent" : "bg-card",
        className,
      )}
    >
      <Languages
        className={cn("mx-1.5 size-4", inverse ? "text-sidebar-foreground" : "text-muted-foreground")}
        aria-hidden="true"
      />
      {OPTIONS.map((o) => {
        const selected = lang === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            lang={o.value}
            onClick={() => setLang(o.value)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
              selected
                ? inverse
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "bg-primary text-primary-foreground"
                : inverse
                  ? "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="sm:hidden">{o.short}</span>
            <span className="hidden sm:inline">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
