// lib/meal.ts
import { RECIPES, Recipe } from "@/data/recipes";

export type DietType = "none" | "vegetarian" | "vegan" | "keto";

type Meal = { name: string; calories: number };
export type DayPlan = { day: string; meals: Meal[]; total: number };

// --------------------
// Helpers
// --------------------
function allowedByDiet(r: Recipe, diet: DietType): boolean {
  if (diet === "none") return true;
  if (diet === "vegetarian")
    return r.dietTags.includes("vegetarian") || r.dietTags.includes("vegan");
  if (diet === "vegan") return r.dietTags.includes("vegan");
  if (diet === "keto") return r.dietTags.includes("keto");
  return true;
}

function matchesCuisine(r: Recipe, likes: string[]): boolean {
  if (!likes.length) return true;
  const c = (r.cuisine ?? "").toString().toLowerCase();
  return likes.some((l) => c.includes(l.toLowerCase()));
}

function excludesAllergens(r: Recipe, exclusions: string[]): boolean {
  if (!exclusions.length) return true;
  const all = (r.allergens ?? []).map((a) => a.toLowerCase());
  return !exclusions.some((e) => all.includes(e.toLowerCase()));
}

function includesFavorite(r: Recipe, favorites: string[]): boolean {
  if (!favorites.length) return true;
  const ingredients = (r.ingredients ?? []).map((i) => i.toLowerCase());
  return favorites.some((f) => ingredients.includes(f.toLowerCase()));
}

// --------------------
// Filtering
// --------------------
export function filterRecipes(opts: {
  dietType: DietType;
  exclusions: string[];
  timeToCook: number; // minutes (we compare <=)
  cuisineLikes: string[];
  favorites?: string[];
}): Recipe[] {
  const { dietType, exclusions, timeToCook, cuisineLikes, favorites = [] } = opts;

  return RECIPES.filter(
    (r) =>
      allowedByDiet(r, dietType) &&
      excludesAllergens(r, exclusions) &&
      (Number.isFinite(timeToCook) ? r.cookTime <= timeToCook : true) &&
      matchesCuisine(r, cuisineLikes) &&
      includesFavorite(r, favorites)
  );
}

// --------------------
// Planner
// --------------------
export function buildWeekPlan(opts: {
  targetCalories: number;
  mealsPerDay: number;
  timeToCook: number;
  favorites?: string[];
  dietTags?: string[];
  exclusions?: string[];
  cuisineLikes?: string[];
}): DayPlan[] {
  const {
    targetCalories,
    mealsPerDay,
    timeToCook,
    favorites = [],
    dietTags = [],
    exclusions = [],
    cuisineLikes = [],
  } = opts;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Combine dietTags into a primary dietType for compatibility with older logic
  const primaryDiet: DietType = (dietTags[0] as DietType) || "none";

  // 1) Try strict filter
  let pool = filterRecipes({
    dietType: primaryDiet,
    exclusions,
    timeToCook,
    cuisineLikes,
    favorites,
  });

  // 2) Graceful fallbacks if pool is empty
  if (pool.length === 0) {
    pool = filterRecipes({
      dietType: primaryDiet,
      exclusions,
      timeToCook,
      cuisineLikes: [],
      favorites,
    });
  }
  if (pool.length === 0) {
    pool = filterRecipes({
      dietType: primaryDiet,
      exclusions,
      timeToCook: 999,
      cuisineLikes: [],
      favorites,
    });
  }
  if (pool.length === 0) {
    pool = RECIPES.slice(); // fallback to everything
  }

  const perMeal = targetCalories / mealsPerDay;
  const minC = perMeal * 0.75;
  const maxC = perMeal * 1.25;

  const used: Record<string, number> = {};

  function pickMeal(): Recipe {
    const withinRange = pool.filter(
      (r) => r.calories >= minC && r.calories <= maxC
    );
    const list = (withinRange.length ? withinRange : pool).filter(
      (r) => (used[r.id] || 0) < 2 // avoid repeating too often
    );
    const effective = list.length ? list : pool;

    // Prefer recipes with favorite ingredients
    effective.sort((a, b) => {
      const aFav = includesFavorite(a, favorites) ? 1 : 0;
      const bFav = includesFavorite(b, favorites) ? 1 : 0;
      return bFav - aFav || Math.abs(a.calories - perMeal) - Math.abs(b.calories - perMeal);
    });

    const chosen = effective[0] ?? pool[0];
    used[chosen.id] = (used[chosen.id] || 0) + 1;
    return chosen;
  }

  const week: DayPlan[] = days.map((day) => {
    const meals: Meal[] = [];
    for (let i = 0; i < mealsPerDay; i++) {
      const r = pickMeal();
      meals.push({ name: r.name, calories: r.calories });
    }
    const total = Math.round(meals.reduce((s, m) => s + m.calories, 0));
    return { day, meals, total };
  });

  return week;
}

// --------------------
// Grocery list
// --------------------
export function buildGroceryList(week: DayPlan[]): string[] {
  const map = new Map<string, number>();

  for (const day of week) {
    for (const meal of day.meals) {
      const r = RECIPES.find((x) => x.name === meal.name);
      if (!r) continue;
      for (const ing of r.ingredients) {
        const key = ing.trim().toLowerCase();
        map.set(key, (map.get(key) || 0) + 1);
      }
    }
  }

  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([item, times]) => `${item} ×${times}`);
}
