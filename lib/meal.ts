// lib/meal.ts
import { RECIPES, Recipe } from '@/data/recipes';

export type DietType = 'none' | 'vegetarian' | 'vegan' | 'keto';

type Meal = { name: string; calories: number };
export type DayPlan = { day: string; meals: Meal[]; total: number };

// --------------------
// Helpers
// --------------------
function allowedByDiet(r: Recipe, diet: DietType): boolean {
  if (diet === 'none') return true;
  if (diet === 'vegetarian')
    return r.dietTags.includes('vegetarian') || r.dietTags.includes('vegan');
  if (diet === 'vegan') return r.dietTags.includes('vegan');
  if (diet === 'keto') return r.dietTags.includes('keto');
  return true;
}

function matchesCuisine(r: Recipe, likes: string[]): boolean {
  if (!likes.length) return true;
  const c = (r.cuisine ?? '').toString().toLowerCase();
  return likes.some((l) => c.includes(l.toLowerCase()));
}

function excludesAllergens(r: Recipe, exclusions: string[]): boolean {
  if (!exclusions.length) return true;
  const all = (r.allergens ?? []).map((a) => a.toLowerCase());
  return !exclusions.some((e) => all.includes(e.toLowerCase()));
}

// --------------------
// Filtering
// --------------------
export function filterRecipes(opts: {
  dietType: DietType;
  exclusions: string[];
  timeToCook: number;   // minutes (we compare <=)
  cuisineLikes: string[];
}): Recipe[] {
  const { dietType, exclusions, timeToCook, cuisineLikes } = opts;

  return RECIPES.filter(
    (r) =>
      allowedByDiet(r, dietType) &&
      excludesAllergens(r, exclusions) &&
      (Number.isFinite(timeToCook) ? r.cookTime <= timeToCook : true) &&
      matchesCuisine(r, cuisineLikes)
  );
}

// --------------------
// Planner
// --------------------
export function buildWeekPlan(opts: {
  targetCalories: number;
  mealsPerDay: number;
  dietType: DietType;
  exclusions: string[];
  timeToCook: number;
  cuisineLikes: string[];
}): DayPlan[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // 1) Try strict
  let pool = filterRecipes(opts);

  // 2) Graceful fallbacks if pool is empty
  if (pool.length === 0) {
    // relax cuisine first
    pool = filterRecipes({ ...opts, cuisineLikes: [] });
  }
  if (pool.length === 0) {
    // relax time to cook
    pool = filterRecipes({ ...opts, timeToCook: 999, cuisineLikes: [] });
  }
  if (pool.length === 0) {
    // as a last resort, use the full pool (diet/allergens still respected above,
    // but if even that fails, fall back to everything so planner never crashes)
    pool = RECIPES.slice();
  }

  const perMeal = opts.targetCalories / opts.mealsPerDay;
  const minC = perMeal * 0.75;
  const maxC = perMeal * 1.25;

  const used: Record<string, number> = {};

  function pickMeal(): Recipe {
    // Prefer recipes within [minC, maxC], else use closest
    const candidates = pool.filter((r) => r.calories >= minC && r.calories <= maxC);
    const list = (candidates.length ? candidates : pool).filter(
      (r) => (used[r.id] || 0) < 2 // max repeat 2x/week
    );

    // If everything is exhausted (can happen with tiny pools), allow repeats > 2
    const effective = list.length ? list : pool;

    effective.sort(
      (a, b) =>
        (used[a.id] || 0) - (used[b.id] || 0) ||
        Math.abs(a.calories - perMeal) - Math.abs(b.calories - perMeal)
    );

    const chosen = effective[0] ?? pool[0];
    used[chosen.id] = (used[chosen.id] || 0) + 1;
    return chosen;
  }

  const week: DayPlan[] = days.map((d) => {
    const meals: Meal[] = [];
    for (let i = 0; i < opts.mealsPerDay; i++) {
      const r = pickMeal();
      meals.push({ name: r.name, calories: r.calories });
    }
    const total = Math.round(meals.reduce((s, m) => s + m.calories, 0));
    return { day: d, meals, total };
  });

  return week;
}

// --------------------
// Grocery list
// --------------------
export function buildGroceryList(week: DayPlan[]): string[] {
  // Aggregate naive (by ingredient name only)
  const map = new Map<string, number>();

  for (const day of week) {
    for (const meal of day.meals) {
      const r = RECIPES.find((x) => x.name === meal.name);
      if (!r) continue;
      for (const ing of r.ingredients) {
        // ingredients are strings in our dataset
        const key = ing.trim().toLowerCase();
        map.set(key, (map.get(key) || 0) + 1);
      }
    }
  }

  // Turn into friendly lines
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([item, times]) => `${item} ×${times}`);
}
