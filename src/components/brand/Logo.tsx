import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "default" | "inverse";
}

/** WIN wordmark: a navy tile holding a green location pin, then "WIN". */
export function Logo({ className, tone = "default" }: LogoProps) {
  const inverse = tone === "inverse";
  return (
    <span className={cn("inline-flex items-center gap-2", className)} dir="ltr">
      <span
        className={cn(
          "grid size-9 place-items-center rounded-xl",
          inverse ? "bg-primary-foreground" : "bg-primary",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M12 2.5c-3.9 0-7 3-7 6.9 0 4.9 5.6 10.9 6.3 11.6a1 1 0 0 0 1.4 0c.7-.7 6.3-6.7 6.3-11.6 0-3.9-3.1-6.9-7-6.9Z"
            className="fill-brand-green"
          />
          <circle cx="12" cy="9.4" r="2.6" className={inverse ? "fill-primary-foreground" : "fill-primary"} />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          inverse ? "text-primary-foreground" : "text-primary",
        )}
      >
        WIN
      </span>
    </span>
  );
}
