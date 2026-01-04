import type { WeekPlan } from "./generateWeekPlan";

export type GroceryItem = {
  ingredientKey: string;
  totalGrams: number;
};

/**
 * Generates a grocery list from a week plan by aggregating all ingredients
 * and summing their quantities. Excludes water ingredients.
 */
export function generateGroceryList(week: WeekPlan): GroceryItem[] {
  const ingredientMap = new Map<string, number>();

  // Iterate through all meals in the week
  for (const day of week) {
    const meals = [day.breakfast, day.lunch, day.dinner, day.snack];
    
    for (const meal of meals) {
      for (const ingredient of meal.ingredients) {
        // Filter out water
        if (ingredient.ingredientKey.toLowerCase().includes("water")) {
          continue;
        }

        const currentTotal = ingredientMap.get(ingredient.ingredientKey) || 0;
        ingredientMap.set(ingredient.ingredientKey, currentTotal + ingredient.grams);
      }
    }
  }

  // Convert map to array and sort alphabetically by ingredient key
  const groceryList: GroceryItem[] = Array.from(ingredientMap.entries())
    .map(([ingredientKey, totalGrams]) => ({
      ingredientKey,
      totalGrams,
    }))
    .sort((a, b) => a.ingredientKey.localeCompare(b.ingredientKey));

  return groceryList;
}
