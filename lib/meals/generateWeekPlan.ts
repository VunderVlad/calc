import { meals } from "./meals";
import type { Meal } from "./mealTypes";
import { mealAllowed, type MealPreferences } from "./filters";

export type DayPlan = {
  day: number;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
};

export type WeekPlan = DayPlan[];

function pick(list: Meal[], index: number): Meal {
  return list[index % list.length];
}

export function generateWeekPlan(prefs?: MealPreferences): WeekPlan {
  const breakfasts = meals.filter((m) => m.type === "breakfast" && mealAllowed(m, prefs));
  const lunches = meals.filter((m) => m.type === "lunch" && mealAllowed(m, prefs));
  const dinners = meals.filter((m) => m.type === "dinner" && mealAllowed(m, prefs));
  const snacks = meals.filter((m) => m.type === "snack" && mealAllowed(m, prefs));

  if (!breakfasts.length || !lunches.length || !dinners.length || !snacks.length) {
    throw new Error(
      "Not enough meals to build a week plan with your filters. Please remove some allergens/dislikes."
    );
  }

  const week: WeekPlan = [];
  for (let i = 0; i < 7; i++) {
    week.push({
      day: i + 1,
      breakfast: pick(breakfasts, i),
      lunch: pick(lunches, i),
      dinner: pick(dinners, i),
      snack: pick(snacks, i),
    });
  }

  return week;
}
