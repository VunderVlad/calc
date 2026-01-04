// app/page.tsx
"use client";

import Link from "next/link";
import { t } from "@/lib/i18n/i18n";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-16">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3">{t(language, "home.title", "Choose Calculator Mode")}</h2>
        <p className="text-[#EEEEEE] mt-2 text-sm md:text-base">{t(language, "home.subtitle", "Select what you want to calculate.")}</p>
      </div>

      <div className="grid gap-4 md:gap-5">
        <Link
          href="/user"
          className="border border-white/20 rounded-[5px] p-6 md:p-8 hover:border-[#EF4444] hover:bg-white/5 transition-all duration-200"
        >
          <div className="text-lg md:text-xl font-semibold text-white">{t(language, "home.user.title", "User calculator")}</div>
          <div className="text-[#EEEEEE] mt-2 text-sm md:text-base">{t(language, "home.user.description", "Automatic macro calculation + weekly meal plan.")}</div>
        </Link>

        <Link
          href="/trainer"
          className="border border-white/20 rounded-[5px] p-6 md:p-8 hover:border-[#EF4444] hover:bg-white/5 transition-all duration-200"
        >
          <div className="text-lg md:text-xl font-semibold text-white">{t(language, "home.trainer.title", "Trainer calculator")}</div>
          <div className="text-[#EEEEEE] mt-2 text-sm md:text-base">{t(language, "home.trainer.description", "Manual macros + coach notes + weekly plan.")}</div>
        </Link>
      </div>
    </div>
  );
}
