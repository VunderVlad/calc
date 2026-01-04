// lib/meals/mealTypes.ts

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type Ingredient = {
  ingredientKey: string; // i18n key
  grams: number;
};

export type Step = {
  stepKey: string; // i18n key
};

export type Meal = {
  id: string;
  type: MealType;
  tags: string[];
  image: string;

  baseCalories: number;
  protein: number;
  carbs: number;
  fat: number;

  // ✅ ВАЖНО: ключ вместо строки
  servingKey: string;

  ingredients: Ingredient[];
  steps: Step[];

  // i18n
  nameKey: string;
  descriptionKey: string;
};
