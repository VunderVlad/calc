// lib/meal.ts — PRO VERSION (NO CUISINE)

import {
  RECIPES,
  Recipe,
  MealType,
  AllergenKey,
  DislikeKey,
  DietTag,
} from "@/data/recipes";

export interface BuildWeekPlanInput {
  targetCalories: number;
  mealsPerDay: number;
  timeToCook: number;
  favorites?: string[];
  dietTags?: string[] | DietTag[];
  exclusions?: string[];
}

export interface PlannedMeal extends Recipe {
  servings: number;
}

export interface DayPlan {
  day: string;
  meals: PlannedMeal[];
  totalCalories: number;
}

const DAY_NAMES = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday",
];

/* -------------------------------------------------------------
   Split exclusions → allergens + dislikes
------------------------------------------------------------- */
function splitExclusions(exclusions: string[] = []) {
  const allergenValues: AllergenKey[] = [
    "gluten","lactose","eggs","nuts","fish","soy","sesame",
    "corn","peanuts","shellfish","celery","sulfites","mustard",
  ];

  const allergenSet = new Set<AllergenKey>(allergenValues);

  const allergens: AllergenKey[] = [];
  const dislikes: DislikeKey[] = [];

  for (const ex of exclusions) {
    if (allergenSet.has(ex as AllergenKey)) {
      allergens.push(ex as AllergenKey);
    } else {
      dislikes.push(ex as DislikeKey);
    }
  }

  return { allergens, dislikes };
}

/* -------------------------------------------------------------
   Smart filtering with fallback logic
------------------------------------------------------------- */
function filterRecipesSmart(
  recipes: Recipe[],
  allergens: AllergenKey[],
  dislikes: DislikeKey[],
  maxCookTime: number,
  dietTags?: string[]
): Recipe[] {
  const allergenSet = new Set(allergens);
  const dislikeSet = new Set(dislikes);

  const strict = (r: Recipe) => {
    if (r.cookTime > maxCookTime) return false;
    if (r.allergens.some(a => allergenSet.has(a))) return false;
    if (r.dislikesTags?.some(d => dislikeSet.has(d))) return false;

    if (dietTags && dietTags.length && !dietTags.includes("none")) {
      if (!r.dietTags.some(tag => dietTags.includes(tag))) return false;
    }

    return true;
  };

  // 1) Strict
  let pool = recipes.filter(strict);
  if (pool.length > 0) return pool;

  // 2) Ignore dislikes
  pool = recipes.filter(
    r => r.cookTime <= maxCookTime && !r.allergens.some(a => allergenSet.has(a))
  );
  if (pool.length > 0) return pool;

  // 3) Ignore time + diet, keep allergens only
  pool = recipes.filter(r => !r.allergens.some(a => allergenSet.has(a)));
  if (pool.length > 0) return pool;

  // 4) Last fallback → everything
  return recipes;
}

/* -------------------------------------------------------------
   Meal slots
------------------------------------------------------------- */
function mealTypeForSlot(slot: number, slots: number): MealType {
  if (slots === 3)
    return ["breakfast", "lunch", "dinner"][slot] as MealType;

  if (slots === 4)
    return ["breakfast", "lunch", "snack", "dinner"][slot] as MealType;

  return ["breakfast", "snack", "lunch", "snack", "dinner"][slot] as MealType;
}

/* -------------------------------------------------------------
   Calorie distribution
------------------------------------------------------------- */
function caloriesForSlot(slot: number, slots: number, total: number) {
  if (slots === 3) {
    const r = [0.25, 0.4, 0.35];
    return Math.round(total * r[slot]);
  }
  if (slots === 4) {
    const r = [0.25, 0.35, 0.15, 0.25];
    return Math.round(total * r[slot]);
  }
  const r = [0.23, 0.12, 0.33, 0.12, 0.2];
  return Math.round(total * r[slot]);
}

/* -------------------------------------------------------------
   Smart scoring for recipe selection
------------------------------------------------------------- */
function pickSmartRecipe(
  candidates: Recipe[],
  targetCalories: number,
  priority: "protein" | "calories",
  recentIds: Set<string>
): Recipe | null {
  const usable = candidates.filter(r => !recentIds.has(r.id));
  if (usable.length === 0) return null;

  const scored = usable.map(r => {
    const calDiff = Math.abs(r.calories - targetCalories) + 1;
    const calScore = 1 / calDiff;

    const proteinNorm = r.protein / 40;

    let score =
      priority === "protein"
        ? calScore * 0.5 + proteinNorm * 0.5
        : calScore * 0.75 + proteinNorm * 0.25;

    score *= 0.85 + Math.random() * 0.3;

    return { recipe: r, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored[0]?.recipe ?? null;
}

/* -------------------------------------------------------------
   MAIN — Build Week Plan
------------------------------------------------------------- */
export function buildWeekPlan(input: BuildWeekPlanInput): DayPlan[] {
  const { targetCalories, mealsPerDay, timeToCook, exclusions = [], dietTags } =
    input;

  const { allergens, dislikes } = splitExclusions(exclusions);

  const basePool = filterRecipesSmart(
    RECIPES,
    allergens,
    dislikes,
    timeToCook,
    dietTags as string[]
  );

  const slots = Math.min(Math.max(mealsPerDay, 3), 5);

  const days: DayPlan[] = [];
  const recentByType = new Map<MealType, string[]>();

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const dayName = DAY_NAMES[dayIndex];
    const meals: PlannedMeal[] = [];
    let totalCalories = 0;

    for (let slot = 0; slot < slots; slot++) {
      const type = mealTypeForSlot(slot, slots);
      const slotCalories = caloriesForSlot(slot, slots, targetCalories);

      const priority = type === "lunch" ? "protein" : "calories";

      const candidates = basePool.filter(r => r.mealType === type);

      const recentIds = new Set(recentByType.get(type) ?? []);

      const recipe: Recipe | null =
        pickSmartRecipe(candidates, slotCalories, priority, recentIds) ??
        pickSmartRecipe(basePool, slotCalories, priority, recentIds);

      if (!recipe) continue;

      const rawServings = slotCalories / recipe.calories;
      const servings = Math.max(0.75, Math.min(1.5, rawServings));

      meals.push({ ...recipe, servings });
      totalCalories += recipe.calories * servings;

      const updatedRecent = [...(recentByType.get(type) ?? []), recipe.id].slice(
        -3
      );
      recentByType.set(type, updatedRecent);
    }

    days.push({
      day: dayName,
      meals,
      totalCalories: Math.round(totalCalories),
    });
  }

  return days;
}
