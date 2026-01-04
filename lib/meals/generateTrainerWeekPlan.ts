import { meals } from "./meals";
import type { WeekPlan } from "./generateWeekPlan";
import type { Allergen, DislikedProduct } from "../validators/userSchema";
import { mealAllowed, type MealPreferences } from "./filters";

export function generateTrainerWeekPlan(prefs?: {
  allergens?: Allergen[];
  dislikes?: DislikedProduct[];
}): WeekPlan {
  const safePrefs: MealPreferences = {
    allergens: prefs?.allergens ?? [],
    dislikes: prefs?.dislikes ?? [],
  };

  const allowed = meals.filter((m) => mealAllowed(m, safePrefs));

  const breakfasts = allowed.filter((m) => m.type === "breakfast");
  const lunches = allowed.filter((m) => m.type === "lunch");
  const dinners = allowed.filter((m) => m.type === "dinner");
  const snacks = allowed.filter((m) => m.type === "snack");

  if (
    breakfasts.length === 0 ||
    lunches.length === 0 ||
    dinners.length === 0 ||
    snacks.length === 0
  ) {
    throw new Error(
      "Not enough meals after filtering. Please reduce allergens/dislikes."
    );
  }

  const week: WeekPlan = [];

  for (let i = 0; i < 7; i++) {
    week.push({
      day: i + 1,
      breakfast: breakfasts[i % breakfasts.length],
      lunch: lunches[i % lunches.length],
      dinner: dinners[i % dinners.length],
      snack: snacks[i % snacks.length],
    });
  }

  return week;
}
