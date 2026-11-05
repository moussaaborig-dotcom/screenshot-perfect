import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import type { Lang, LocalizedText } from "@/types/catalog";
import { dictionary, type Dictionary } from "./dictionary";

const STORAGE_KEY = "win.lang";
export const DEFAULT_LANG: Lang = "ar";

interface I18nContextValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dictionary;
  setLang: (lang: Lang) => void;
  /** Pick the current-language value of WIN-authored localized text. */
  l: (text: LocalizedText) => string;
  formatPrice: (value: number) => string;
  formatNumber: (value: number) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const numberFormat = new Intl.NumberFormat("fr-DZ", { maximumFractionDigits: 0 });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Read the saved preference after hydration so SSR markup stays consistent.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "fr") setLangState(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const t = dictionary[lang] as unknown as Dictionary;
    return {
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t,
      setLang,
      l: (text) => text[lang],
      formatNumber: (n) => numberFormat.format(n),
      formatPrice: (n) => `${numberFormat.format(n)} ${t.catalog.currency}`,
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
