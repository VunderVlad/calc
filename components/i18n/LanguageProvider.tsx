// components/i18n/LanguageProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Language } from "@/lib/i18n/i18n";
import { normalizeLanguage } from "@/lib/i18n/i18n";

type Ctx = {
  language: Language;
  setLanguage: (l: Language) => void;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "donetsfit_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved) setLanguageState(normalizeLanguage(saved));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (l: Language) => setLanguageState(normalizeLanguage(l));

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
