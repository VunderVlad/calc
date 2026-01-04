"use client";

import Link from "next/link";
import { LanguageSelect } from "@/components/i18n/LanguageSelect";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n/i18n";

export function Navigation() {
  const { language } = useLanguage();

  return (
    <nav className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
      <Link 
        href="/user" 
        className="text-secondary hover:text-white transition-colors text-sm md:text-base"
      >
        {t(language, "nav.userCalculator", "User Calculator")}
      </Link>
      <Link 
        href="/trainer" 
        className="text-secondary hover:text-white transition-colors text-sm md:text-base"
      >
        {t(language, "nav.trainerCalculator", "Trainer Calculator")}
      </Link>
      <Link 
        href="https://donetsfit.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary hover:text-white transition-colors text-sm md:text-base"
      >
        DonetsFit.com
      </Link>
      <LanguageSelect />
    </nav>
  );
}

