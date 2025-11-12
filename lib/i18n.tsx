"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import en from "@/locales/en";
import sk from "@/locales/sk";
import ua from "@/locales/ua";

/* ---------------- Types ---------------- */

// Language codes you support
export type Lang = "en" | "sk" | "ua";

/**
 * Widen all string literals in an object to plain `string`,
 * but keep the exact nested shape. Arrays are preserved too.
 */
type WidenStrings<T> =
  T extends string ? string
  : T extends readonly (infer U)[] ? ReadonlyArray<WidenStrings<U>>
  : T extends (infer U)[] ? WidenStrings<U>[]
  : T extends object ? { [K in keyof T]: WidenStrings<T[K]> }
  : T;

// Final dictionary type used everywhere (same shape as `en`, strings widened)
type Dict = WidenStrings<typeof en>;

/* ---------------- Dictionaries ---------------- */

// Use `satisfies` to keep strong shape checking without forcing literal strings
const DICTS = { en, sk, ua } satisfies Record<Lang, Dict>;

/* ---------------- Context ---------------- */

type I18nContextType = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/* ---------------- Provider ---------------- */

export function I18nProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);

  // Fully typed dict with autocompletion (and no literal-string conflicts)
  const t = useMemo<Dict>(() => DICTS[lang], [lang]);

  // Persist to cookie so SSR can pick it up
  useEffect(() => {
    document.cookie = `lang=${lang}; Path=/; Max-Age=${60 * 60 * 24 * 365}`;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

/* ---------------- Hook ---------------- */

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
