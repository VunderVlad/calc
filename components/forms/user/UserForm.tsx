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

export function UserForm() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "female",
    heightCm: "",
    weightKg: "",
    activity: "moderate",
    goal: "lose",
    allergens: [] as Allergen[],
    dislikes: [] as DislikedProduct[],
  });

  function update<K extends keyof typeof form>(key: K, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAllergen(a: Allergen) {
    update(
      "allergens",
      form.allergens.includes(a)
        ? form.allergens.filter((x) => x !== a)
        : [...form.allergens, a]
    );
  }

  function toggleDislike(d: DislikedProduct) {
    update(
      "dislikes",
      form.dislikes.includes(d)
        ? form.dislikes.filter((x) => x !== d)
        : [...form.dislikes, d]
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
          mode: "user",
          ...form,
          age: form.age ? Number(form.age) : undefined,
          heightCm: form.heightCm ? Number(form.heightCm) : undefined,
          weightKg: form.weightKg ? Number(form.weightKg) : undefined,
          language,
        }),
      });

      if (!res.ok) {
        console.error(await res.text());
        alert(t(language, "form.errorGeneric", "Something went wrong. Please try again."));
        return;
      }

      const data = await res.json();
      if (data.success) router.push("/success");
      else alert(t(language, "form.errorSend", "Could not send plan. Please try again."));
    } catch (err) {
      console.error(err);
      alert(t(language, "form.errorNetwork", "Network error. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:gap-6">
        <div>
          <label className="block text-sm font-medium text-white mb-1">{t(language, "form.name", "Name")}</label>
          <Input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={t(language, "form.namePlaceholder", "Your name")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">{t(language, "form.email", "Email *")}</label>
          <Input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={t(language, "form.emailPlaceholder", "you@example.com")}
          />
          <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.emailHelper", "We'll send your meal plan to this email address")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "form.age", "Age")}</label>
            <Input type="number" min={10} value={form.age} onChange={(e) => update("age", e.target.value)} />
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.ageHelper", "Your age in years")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "form.height", "Height (cm)")}</label>
            <Input type="number" min={120} value={form.heightCm} onChange={(e) => update("heightCm", e.target.value)} />
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.heightHelper", "Your height in centimeters")}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "form.weight", "Weight (kg)")}</label>
            <Input type="number" min={35} value={form.weightKg} onChange={(e) => update("weightKg", e.target.value)} />
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.weightHelper", "Your current weight in kilograms")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "form.gender", "Gender")}</label>
            <Select value={form.gender} onChange={(e) => update("gender", e.target.value)}>
              <option value="female">{t(language, "form.genderFemale", "Female")}</option>
              <option value="male">{t(language, "form.genderMale", "Male")}</option>
            </Select>
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.genderHelper", "Select your gender")}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "form.activity", "Activity")}</label>
            <Select value={form.activity} onChange={(e) => update("activity", e.target.value)}>
              <option value="sedentary">{t(language, "form.activitySedentary", "Sedentary")}</option>
              <option value="light">{t(language, "form.activityLight", "Light")}</option>
              <option value="moderate">{t(language, "form.activityModerate", "Moderate")}</option>
              <option value="high">{t(language, "form.activityHigh", "High")}</option>
            </Select>
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.activityHelper", "How active are you?")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "form.goal", "Goal")}</label>
            <Select value={form.goal} onChange={(e) => update("goal", e.target.value)}>
              <option value="lose">{t(language, "form.goalLose", "Lose weight")}</option>
              <option value="maintain">{t(language, "form.goalMaintain", "Maintain")}</option>
              <option value="gain">{t(language, "form.goalGain", "Gain muscle")}</option>
            </Select>
            <p className="text-xs text-[#EEEEEE]/70 mt-1">{t(language, "form.goalHelper", "What is your main goal?")}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">{t(language, "form.language", "Language")}</label>
            <Select value={language} onChange={(e) => setLanguage(e.target.value as any)}>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="uk">Українська</option>
              <option value="sk">Slovenčina</option>
            </Select>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <h3 className="font-semibold mb-3 text-white">{t(language, "filters.allergensTitle", "Allergens (avoid)")}</h3>
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

        <div className="mt-4 pt-4 border-t border-white/10">
          <h3 className="font-semibold mb-3 text-white">{t(language, "filters.dislikesTitle", "Disliked foods (avoid)")}</h3>
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

          <p className="text-xs text-[#EEEEEE]/70 mt-3">
            {t(language, "filters.tip", "Tip: If you select too many filters, we may not have enough meals to build a full week.")}
          </p>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? t(language, "form.submitting", "Calculating...") : t(language, "form.submit", "Get my plan")}
      </Button>
    </form>
  );
}
