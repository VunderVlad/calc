// lib/meals/filters.ts
import type { Meal } from "./mealTypes";
import { getMealAllergens, getMealDislikes } from "./foodMetadata";
import type { Allergen, DislikedProduct } from "../validators/userSchema";

export type MealPreferences = {
  allergens?: Allergen[];
  dislikes?: DislikedProduct[];
  requiredTags?: string[];
  excludedTags?: string[];
};

export function mealAllowed(meal: Meal, prefs?: MealPreferences): boolean {
  if (!prefs) return true;

  const { requiredTags = [], excludedTags = [], allergens = [], dislikes = [] } = prefs;

  // Check required tags
  if (requiredTags.length && !requiredTags.every((t) => meal.tags.includes(t))) {
    return false;
  }

  // Check excluded tags
  if (excludedTags.length && excludedTags.some((t) => meal.tags.includes(t))) {
    return false;
  }

  // Check allergens - use getMealAllergens as single source of truth
  if (allergens.length > 0) {
    const mealAllergens = getMealAllergens(meal);
    if (mealAllergens.some((a) => allergens.includes(a))) {
      return false;
    }
  }

  // Check dislikes - use getMealDislikes as single source of truth
  if (dislikes.length > 0) {
    const mealDislikes = getMealDislikes(meal);
    if (mealDislikes.some((d) => dislikes.includes(d))) {
      return false;
    }
  }

  return true;
}
