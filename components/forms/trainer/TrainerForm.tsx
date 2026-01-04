// components/forms/trainer/TrainerForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n/i18n";

import { ALLERGENS_UI, DISLIKES_UI } from "@/lib/meals/foodMetadata";
import type { Allergen, DislikedProduct } from "@/lib/meals/foodMetadata";

export function TrainerForm() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    manualCalories: "",
    manualProtein: "",
    manualCarbs: "",
    manualFat: "",
    coachNotes: "",
    allergens: [] as Allergen[],
    dislikes: [] as DislikedProduct[],
  });

  function update<K extends keyof typeof form>(key: K, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAllergen(id: Allergen) {
    update(
      "allergens",
      form.allergens.includes(id)
        ? form.allergens.filter((a) => a !== id)
        : [...form.allergens, id]
    );
  }

  function toggleDislike(id: DislikedProduct) {
    update(
      "dislikes",
      form.dislikes.includes(id)
        ? form.dislikes.filter((d) => d !== id)
        : [...form.dislikes, id]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "trainer",
          name: form.name,
          email: form.email,
          manualCalories: Number(form.manualCalories),
          manualProtein: Number(form.manualProtein),
          manualCarbs: Number(form.manualCarbs),
          manualFat: Number(form.manualFat),
          coachNotes: form.coachNotes,
          allergens: form.allergens,
          dislikes: form.dislikes,
          language,
        }),
      });

      if (!res.ok) {
        console.error(await res.text());
        alert(t(language, "form.errorGeneric", "Something went wrong."));
        return;
      }

      router.push("/success");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:gap-6">
      <div>
          <label className="block text-sm font-medium text-white mb-1">{t(language, "form.name")}</label>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={t(language, "form.namePlaceholder", "Your name")} />
      </div>

      <div>
          <label className="block text-sm font-medium text-white mb-1">{t(language, "form.email")}</label>
          <Input type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder={t(language, "form.emailPlaceholder", "you@example.com")} />
          <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.emailHelper", "We'll send your meal plan to this email address")}</p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "trainer.calories", "Calories (kcal)")}</label>
            <Input type="number" placeholder={t(language, "trainer.calories", "Calories")} value={form.manualCalories} onChange={(e) => update("manualCalories", e.target.value)} />
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.caloriesHelper", "Daily calorie target in kcal")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "trainer.protein", "Protein (g)")}</label>
            <Input type="number" placeholder={t(language, "trainer.protein", "Protein")} value={form.manualProtein} onChange={(e) => update("manualProtein", e.target.value)} />
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.proteinHelper", "Daily protein target in grams")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "trainer.carbs", "Carbs (g)")}</label>
            <Input type="number" placeholder={t(language, "trainer.carbs", "Carbs")} value={form.manualCarbs} onChange={(e) => update("manualCarbs", e.target.value)} />
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.carbsHelper", "Daily carbs target in grams")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "trainer.fat", "Fat (g)")}</label>
            <Input type="number" placeholder={t(language, "trainer.fat", "Fat")} value={form.manualFat} onChange={(e) => update("manualFat", e.target.value)} />
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.fatHelper", "Daily fat target in grams")}</p>
          </div>
      </div>

      <div>
          <label className="block text-sm font-medium text-white mb-1">{t(language, "trainer.notes", "Coach notes")}</label>
        <textarea
          value={form.coachNotes}
          onChange={(e) => update("coachNotes", e.target.value)}
            className="w-full rounded-[5px] border border-white/20 bg-[#1A1A1A] px-3 py-2 text-sm text-white placeholder:text-[#EEEEEE]/60 focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-colors min-h-[100px]"
            placeholder={t(language, "trainer.notesPlaceholder", "Special instructions, training focus, weekly goals...")}
        />
          <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.coachNotesHelper", "Add any special instructions, training focus, or weekly goals for the client")}</p>
      </div>

      <div>
          <label className="block text-sm font-medium text-white mb-1">{t(language, "form.language")}</label>
        <Select value={language} onChange={(e) => setLanguage(e.target.value as any)}>
          <option value="en">English</option>
          <option value="ru">Русский</option>
          <option value="uk">Українська</option>
          <option value="sk">Slovenčina</option>
        </Select>
      </div>

      {/* Allergens */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <h3 className="font-semibold mb-3 text-white">{t(language, "filters.allergensTitle")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {ALLERGENS_UI.map((id) => (
              <label key={id} className="flex items-center gap-2 text-sm text-[#EEEEEE] cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={form.allergens.includes(id)}
                onChange={() => toggleAllergen(id)}
                  className="h-4 w-4 rounded border-white/20 bg-[#1A1A1A] text-[#EF4444] focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-0 focus:ring-offset-[#1A1A1A] cursor-pointer"
              />
              <span>{t(language, `filters.allergens.${id}`, id)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dislikes */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <h3 className="font-semibold mb-3 text-white">{t(language, "filters.dislikesTitle")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {DISLIKES_UI.map((id) => (
              <label key={id} className="flex items-center gap-2 text-sm text-[#EEEEEE] cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={form.dislikes.includes(id)}
                onChange={() => toggleDislike(id)}
                  className="h-4 w-4 rounded border-white/20 bg-[#1A1A1A] text-[#EF4444] focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-0 focus:ring-offset-[#1A1A1A] cursor-pointer"
              />
              <span>{t(language, `filters.dislikes.${id}`, id)}</span>
            </label>
          ))}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? t(language, "form.submitting") : t(language, "form.submit")}
      </Button>
    </form>
  );
}
