// lib/meals/foodMetadata.ts
import type { Meal } from "./mealTypes";
import type { Allergen, DislikedProduct } from "../validators/userSchema";

// Re-export types for convenience
export type { Allergen, DislikedProduct } from "../validators/userSchema";

// UI arrays for forms - all available allergens and disliked products
export const ALLERGENS_UI: Allergen[] = [
  "dairy",
  "eggs",
  "gluten",
  "nuts",
  "peanuts",
  "soy",
  "fish",
  "shellfish",
  "sesame",
  "mustard",
  "celery",
  "sulfites",
  "lupin",
];

export const DISLIKES_UI: DislikedProduct[] = [
  "mushrooms",
  "onions",
  "garlic",
  "broccoli",
  "cauliflower",
  "spinach",
  "zucchini",
  "tomatoes",
  "bellPepper",
  "lentils",
  "chickpeas",
  "beans",
  "tofu",
  "soy",
  "fish",
  "shellfish",
  "pork",
  "beef",
  "chicken",
  "eggs",
  "milk",
  "cheese",
  "yogurt",
  "cottageCheese",
  "oats",
  "rice",
  "pasta",
  "nuts",
  "peanuts",
];

export function getMealIngredientsKeys(meal: Meal): string[] {
  return (meal.ingredients ?? []).map((i) => i.ingredientKey);
}

/**
 * Maps allergen enum values to ingredient keys that contain that allergen
 */
function getAllergenIngredientKeys(allergen: Allergen): string[] {
  const mapping: Record<Allergen, string[]> = {
    dairy: ["ingredient.milk", "ingredient.cheese", "ingredient.yogurt", "ingredient.cottageCheese", "ingredient.butter", "ingredient.cream"],
    eggs: ["ingredient.eggs", "ingredient.egg"],
    gluten: ["ingredient.oats", "ingredient.wheat", "ingredient.pasta", "ingredient.bread", "ingredient.flour", "ingredient.barley", "ingredient.rye"],
    nuts: ["ingredient.nuts", "ingredient.almonds", "ingredient.walnuts", "ingredient.cashews", "ingredient.hazelnuts"],
    peanuts: ["ingredient.peanuts", "ingredient.peanutButter"],
    soy: ["ingredient.soy", "ingredient.tofu", "ingredient.soySauce", "ingredient.edamame"],
    fish: ["ingredient.fish", "ingredient.salmon", "ingredient.tuna", "ingredient.cod", "ingredient.mackerel", "ingredient.sardines"],
    shellfish: ["ingredient.shellfish", "ingredient.shrimp", "ingredient.crab", "ingredient.lobster", "ingredient.mussels", "ingredient.clams"],
    sesame: ["ingredient.sesame", "ingredient.sesameOil", "ingredient.tahini"],
    mustard: ["ingredient.mustard", "ingredient.mustardSeeds"],
    celery: ["ingredient.celery", "ingredient.celerySeeds"],
    sulfites: [], // Usually in processed foods, hard to map to ingredients
    lupin: ["ingredient.lupin", "ingredient.lupinFlour"],
  };
  return mapping[allergen] ?? [];
}

/**
 * Maps disliked product enum values to ingredient keys
 */
function getDislikedProductIngredientKeys(disliked: DislikedProduct): string[] {
  const mapping: Record<DislikedProduct, string[]> = {
    mushrooms: ["ingredient.mushrooms"],
    onions: ["ingredient.onions", "ingredient.onion"],
    garlic: ["ingredient.garlic"],
    broccoli: ["ingredient.broccoli"],
    cauliflower: ["ingredient.cauliflower"],
    spinach: ["ingredient.spinach"],
    zucchini: ["ingredient.zucchini"],
    tomatoes: ["ingredient.tomatoes", "ingredient.tomato"],
    bellPepper: ["ingredient.bellPepper", "ingredient.bellPeppers"],
    lentils: ["ingredient.lentils"],
    chickpeas: ["ingredient.chickpeas"],
    beans: ["ingredient.beans", "ingredient.blackBeans", "ingredient.kidneyBeans"],
    tofu: ["ingredient.tofu"],
    soy: ["ingredient.soy", "ingredient.tofu", "ingredient.soySauce"],
    fish: ["ingredient.fish", "ingredient.salmon", "ingredient.tuna"],
    shellfish: ["ingredient.shellfish", "ingredient.shrimp", "ingredient.crab"],
    pork: ["ingredient.pork"],
    beef: ["ingredient.beef"],
    chicken: ["ingredient.chicken", "ingredient.chickenBreast", "ingredient.chickenThigh"],
    eggs: ["ingredient.eggs", "ingredient.egg"],
    milk: ["ingredient.milk"],
    cheese: ["ingredient.cheese"],
    yogurt: ["ingredient.yogurt"],
    cottageCheese: ["ingredient.cottageCheese"],
    oats: ["ingredient.oats"],
    rice: ["ingredient.rice"],
    pasta: ["ingredient.pasta"],
    nuts: ["ingredient.nuts", "ingredient.almonds", "ingredient.walnuts"],
    peanuts: ["ingredient.peanuts", "ingredient.peanutButter"],
  };
  return mapping[disliked] ?? [];
}

/**
 * Returns allergen enum values that are present in the meal based on ingredient keys
 */
export function getMealAllergens(meal: Meal): Allergen[] {
  const ingredientKeys = new Set(getMealIngredientsKeys(meal));
  const allergens: Allergen[] = [];
  
  const allergenList: Allergen[] = ["dairy", "eggs", "gluten", "nuts", "peanuts", "soy", "fish", "shellfish", "sesame", "mustard", "celery", "sulfites", "lupin"];
  
  for (const allergen of allergenList) {
    const keys = getAllergenIngredientKeys(allergen);
    if (keys.some((key) => ingredientKeys.has(key))) {
      allergens.push(allergen);
    }
  }
  
  return allergens;
}

/**
 * Returns disliked product enum values that are present in the meal based on ingredient keys
 */
export function getMealDislikes(meal: Meal): DislikedProduct[] {
  const ingredientKeys = new Set(getMealIngredientsKeys(meal));
  const dislikes: DislikedProduct[] = [];
  
  const dislikedList: DislikedProduct[] = [
    "mushrooms", "onions", "garlic", "broccoli", "cauliflower", "spinach", "zucchini", "tomatoes", "bellPepper",
    "lentils", "chickpeas", "beans", "tofu", "soy", "fish", "shellfish", "pork", "beef", "chicken",
    "eggs", "milk", "cheese", "yogurt", "cottageCheese", "oats", "rice", "pasta", "nuts", "peanuts"
  ];
  
  for (const disliked of dislikedList) {
    const keys = getDislikedProductIngredientKeys(disliked);
    if (keys.some((key) => ingredientKeys.has(key))) {
      dislikes.push(disliked);
    }
  }
  
  return dislikes;
}

export function mealHasDislikedIngredients(meal: Meal, dislikedKeys: string[]): boolean {
  if (!dislikedKeys?.length) return false;
  const mealKeys = new Set(getMealIngredientsKeys(meal));
  return dislikedKeys.some((k) => mealKeys.has(k));
}
