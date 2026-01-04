// components/i18n/LanguageSelect.tsx
"use client";

import { Select } from "@/components/ui/Select";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import type { Language } from "@/lib/i18n/i18n";

export function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="w-[140px] md:w-[180px]"
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="uk">Українська</option>
        <option value="sk">Slovenčina</option>
      </Select>
    </div>
  );
}
