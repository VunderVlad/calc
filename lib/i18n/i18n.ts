// lib/i18n/i18n.ts
import en from "@/i18n/en.json";
import ru from "@/i18n/ru.json";
import uk from "@/i18n/uk.json";
import sk from "@/i18n/sk.json";

export type Language = "en" | "ru" | "uk" | "sk";

type Dict = Record<string, any>;

const DICTS: Record<Language, Dict> = {
  en: en as Dict,
  ru: ru as Dict,
  uk: uk as Dict,
  sk: sk as Dict,
};

function getByPath(obj: any, path: string): unknown {
  return path.split(".").reduce((acc: any, key) => (acc ? acc[key] : undefined), obj);
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

/**
 * t(lang, "home.title", "Fallback title")
 * t(lang, "email.title", undefined, {name:"Vlad"})
 */
export function t(
  lang: Language,
  key: string,
  fallback?: string,
  vars?: Record<string, string | number>
): string {
  const dict = DICTS[lang] ?? DICTS.en;
  const value = getByPath(dict, key);

  if (typeof value === "string") return interpolate(value, vars);
  if (typeof fallback === "string") return interpolate(fallback, vars);

  // последний fallback — ключ (но мы стараемся всегда давать fallback текстом)
  return key;
}

export function normalizeLanguage(input: any): Language {
  return input === "ru" || input === "uk" || input === "sk" ? input : "en";
}
