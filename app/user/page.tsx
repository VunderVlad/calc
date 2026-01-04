// app/user/page.tsx
"use client";

import { UserForm } from "@/components/forms/user/UserForm";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n/i18n";

export default function UserPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">{t(language, "user.title", "User calculator")}</h2>
      <p className="text-[#EEEEEE] mt-2 mb-6 md:mb-8 text-sm md:text-base">{t(language, "user.subtitle", "Enter your data to get macros, weekly plan and shopping list.")}</p>

      <div className="border border-white/10 rounded-[5px] p-4 md:p-6 lg:p-8 bg-[#1A1A1A]">
        <UserForm />
      </div>
    </div>
  );
}
