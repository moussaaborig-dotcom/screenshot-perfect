import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  text,
  linkLabel,
  link,
  className,
}: {
  title: string;
  text?: string;
  linkLabel?: string;
  link?: LinkProps;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex items-end justify-between gap-4 sm:mb-6", className)}>
      <div className="space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
        {text && <p className="text-sm text-muted-foreground sm:text-base">{text}</p>}
      </div>
      {link && linkLabel && (
        <Link
          {...link}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-brand-green"
        >
          {linkLabel}
          <ArrowLeft className="size-4 ltr:rotate-180" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
