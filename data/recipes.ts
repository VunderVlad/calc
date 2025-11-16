// data/recipes.ts
// Central recipe database used by buildWeekPlan

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type DietTag = "none" | "vegetarian" | "vegan" | "keto";

// Must match your allergen checkbox keys
export type AllergenKey =
  | "gluten"
  | "lactose"
  | "eggs"
  | "nuts"
  | "fish"
  | "soy"
  | "sesame"
  | "corn"
  | "peanuts"
  | "shellfish"
  | "celery"
  | "sulfites"
  | "mustard";

// Must match your “food I don’t like” checkbox keys
export type DislikeKey =
  | "spicy"
  | "mushrooms"
  | "olives"
  | "coriander"
  | "cottageCheese"
  | "seafood"
  | "liver"
  | "broccoli"
  | "cauliflower"
  | "beans"
  | "tofu"
  | "darkChocolate";

export interface Ingredient {
  name: string;
  amount: number;      // e.g. 120
  unit: "g" | "ml" | "piece";
}

export interface Recipe {
  id: string;
  name: string;
  mealType: MealType;
  dietTags: DietTag[];          // e.g. ["vegetarian"]
  allergens: AllergenKey[];     // map to allergen checkboxes
  dislikesTags: DislikeKey[];   // map to dislike checkboxes
  cookTime: number;             // minutes
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  portion: number;              // servings (usually 1)
  difficulty: "easy" | "medium" | "hard";
  ingredients: Ingredient[];
  steps: string[];
}

// Helper to keep calories consistent with macros
const cals = (p: number, f: number, cb: number) => 4 * p + 9 * f + 4 * cb;

/* ------------------------------------------------------------------
   RECIPES
   Simple, neutral European-style meals (no cuisine split necessary)
-------------------------------------------------------------------*/

export const RECIPES: Recipe[] = [
  /* ---------- BREAKFASTS ---------- */

  {
    id: "b-oats-berries",
    name: "Creamy Oats with Berries",
    mealType: "breakfast",
    dietTags: ["vegetarian"],
    allergens: ["gluten", "lactose"],
    dislikesTags: [],
    cookTime: 10,
    protein: 18,
    fat: 9,
    carbs: 55,
    calories: cals(18, 9, 55),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Rolled oats", amount: 60, unit: "g" },
      { name: "Milk (or lactose-free milk)", amount: 200, unit: "ml" },
      { name: "Greek yogurt", amount: 50, unit: "g" },
      { name: "Mixed berries", amount: 80, unit: "g" },
      { name: "Honey", amount: 10, unit: "g" }
    ],
    steps: [
      "Bring milk to a light simmer and stir in oats.",
      "Cook 5–7 minutes, stirring, until creamy.",
      "Stir in yogurt and honey.",
      "Top with fresh or frozen berries and serve warm."
    ]
  },

  {
    id: "b-egg-toast",
    name: "Eggs on Wholegrain Toast",
    mealType: "breakfast",
    dietTags: ["none"],
    allergens: ["eggs", "gluten", "lactose"],
    dislikesTags: [],
    cookTime: 10,
    protein: 22,
    fat: 14,
    carbs: 30,
    calories: cals(22, 14, 30),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Eggs", amount: 2, unit: "piece" },
      { name: "Wholegrain bread", amount: 60, unit: "g" },
      { name: "Butter or oil", amount: 5, unit: "g" },
      { name: "Cherry tomatoes", amount: 60, unit: "g" }
    ],
    steps: [
      "Toast the bread.",
      "Fry or scramble the eggs in a little butter or oil.",
      "Serve the eggs on toast with sliced cherry tomatoes."
    ]
  },

  {
    id: "b-chia-pudding",
    name: "Vanilla Chia Pudding",
    mealType: "breakfast",
    dietTags: ["vegan"],
    allergens: ["sesame"], // if you consider cross allergy; otherwise []
    dislikesTags: [],
    cookTime: 10,
    protein: 12,
    fat: 10,
    carbs: 30,
    calories: cals(12, 10, 30),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Plant milk", amount: 200, unit: "ml" },
      { name: "Chia seeds", amount: 25, unit: "g" },
      { name: "Maple syrup", amount: 10, unit: "g" },
      { name: "Vanilla extract", amount: 2, unit: "ml" },
      { name: "Fruit (banana or berries)", amount: 60, unit: "g" }
    ],
    steps: [
      "Mix plant milk, chia seeds, vanilla, and maple syrup.",
      "Stir well and let sit for 5 minutes, then stir again.",
      "Refrigerate at least 2 hours or overnight.",
      "Serve topped with sliced fruit."
    ]
  },

  /* ---------- LUNCHES ---------- */

  {
    id: "l-chicken-rice",
    name: "Chicken Fillet with Rice and Veg",
    mealType: "lunch",
    dietTags: ["none"],
    allergens: [],
    dislikesTags: ["broccoli"], // contains broccoli
    cookTime: 25,
    protein: 38,
    fat: 10,
    carbs: 60,
    calories: cals(38, 10, 60),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Chicken breast", amount: 150, unit: "g" },
      { name: "White or brown rice", amount: 70, unit: "g" },
      { name: "Broccoli florets", amount: 80, unit: "g" },
      { name: "Olive oil", amount: 10, unit: "g" },
      { name: "Salt and pepper", amount: 2, unit: "g" }
    ],
    steps: [
      "Cook rice according to package instructions.",
      "Season chicken with salt and pepper and pan-fry in olive oil until cooked through.",
      "Steam or lightly sauté broccoli.",
      "Serve chicken with rice and broccoli on one plate."
    ]
  },

  {
    id: "l-turkey-pasta",
    name: "Turkey Bolognese Pasta",
    mealType: "lunch",
    dietTags: ["none"],
    allergens: ["gluten"],
    dislikesTags: [],
    cookTime: 25,
    protein: 35,
    fat: 12,
    carbs: 65,
    calories: cals(35, 12, 65),
    portion: 1,
    difficulty: "medium",
    ingredients: [
      { name: "Wholegrain pasta", amount: 80, unit: "g" },
      { name: "Minced turkey", amount: 120, unit: "g" },
      { name: "Tomato passata", amount: 120, unit: "g" },
      { name: "Onion", amount: 40, unit: "g" },
      { name: "Olive oil", amount: 5, unit: "g" }
    ],
    steps: [
      "Cook pasta in salted water.",
      "Sauté chopped onion in olive oil, add minced turkey and cook until browned.",
      "Pour in tomato passata and simmer 10 minutes.",
      "Serve sauce over pasta."
    ]
  },

  {
    id: "l-vegan-bowl",
    name: "Vegan Grain & Veggie Bowl",
    mealType: "lunch",
    dietTags: ["vegan"],
    allergens: ["soy"], // tofu
    dislikesTags: ["tofu", "beans"],
    cookTime: 20,
    protein: 22,
    fat: 11,
    carbs: 65,
    calories: cals(22, 11, 65),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Cooked quinoa or rice", amount: 80, unit: "g" },
      { name: "Firm tofu", amount: 100, unit: "g" },
      { name: "Mixed vegetables", amount: 120, unit: "g" },
      { name: "Soy sauce", amount: 10, unit: "ml" }
    ],
    steps: [
      "Pan-fry cubed tofu in a dry pan or with a teaspoon of oil.",
      "Stir-fry mixed vegetables until tender-crisp.",
      "Add soy sauce and combine with cooked grains.",
      "Serve warm in a bowl."
    ]
  },

  /* ---------- DINNERS ---------- */

  {
    id: "d-salmon-potato",
    name: "Baked Salmon with Potatoes",
    mealType: "dinner",
    dietTags: ["none"],
    allergens: ["fish"],
    dislikesTags: ["seafood"],
    cookTime: 30,
    protein: 34,
    fat: 18,
    carbs: 45,
    calories: cals(34, 18, 45),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Salmon fillet", amount: 140, unit: "g" },
      { name: "Potatoes", amount: 180, unit: "g" },
      { name: "Olive oil", amount: 10, unit: "g" },
      { name: "Lemon", amount: 0.25, unit: "piece" }
    ],
    steps: [
      "Preheat oven to 190°C.",
      "Slice potatoes, toss with half the oil, salt and pepper; bake 20–25 minutes.",
      "Season salmon, drizzle with remaining oil, and bake on a tray for the last 12–15 minutes.",
      "Serve salmon with potatoes and lemon wedge."
    ]
  },

  {
    id: "d-veggie-curry",
    name: "Mild Vegetable Curry with Rice",
    mealType: "dinner",
    dietTags: ["vegan"],
    allergens: [],
    dislikesTags: ["spicy", "cauliflower", "beans"],
    cookTime: 25,
    protein: 18,
    fat: 12,
    carbs: 70,
    calories: cals(18, 12, 70),
    portion: 1,
    difficulty: "medium",
    ingredients: [
      { name: "Basmati rice", amount: 70, unit: "g" },
      { name: "Coconut milk (light)", amount: 120, unit: "ml" },
      { name: "Mixed vegetables (carrot, peas, cauliflower)", amount: 140, unit: "g" },
      { name: "Mild curry paste or powder", amount: 8, unit: "g" }
    ],
    steps: [
      "Cook rice according to instructions.",
      "In a pan, simmer vegetables with coconut milk and curry paste until soft.",
      "Adjust salt to taste.",
      "Serve curry over rice."
    ]
  },

  {
    id: "d-chicken-salad",
    name: "Warm Chicken Salad",
    mealType: "dinner",
    dietTags: ["none"],
    allergens: ["mustard"], // dressing may include mustard
    dislikesTags: ["olives"],
    cookTime: 20,
    protein: 32,
    fat: 14,
    carbs: 20,
    calories: cals(32, 14, 20),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Chicken breast", amount: 130, unit: "g" },
      { name: "Mixed salad leaves", amount: 80, unit: "g" },
      { name: "Cherry tomatoes", amount: 60, unit: "g" },
      { name: "Cucumber", amount: 50, unit: "g" },
      { name: "Olive oil & mustard dressing", amount: 15, unit: "g" }
    ],
    steps: [
      "Season and pan-fry chicken until cooked, then slice.",
      "Combine salad leaves, sliced cucumber, and tomatoes in a bowl.",
      "Top with warm chicken and drizzle with dressing."
    ]
  },

  /* ---------- SNACKS ---------- */

  {
    id: "s-yogurt-fruit",
    name: "Yogurt with Fruit",
    mealType: "snack",
    dietTags: ["vegetarian"],
    allergens: ["lactose"],
    dislikesTags: [],
    cookTime: 5,
    protein: 10,
    fat: 5,
    carbs: 25,
    calories: cals(10, 5, 25),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Plain yogurt", amount: 100, unit: "g" },
      { name: "Fresh fruit", amount: 80, unit: "g" }
    ],
    steps: [
      "Spoon yogurt into a bowl.",
      "Top with chopped fruit and serve."
    ]
  },

  {
    id: "s-fruit-nuts",
    name: "Apple with Nuts",
    mealType: "snack",
    dietTags: ["vegan"],
    allergens: ["nuts"],
    dislikesTags: [],
    cookTime: 5,
    protein: 5,
    fat: 10,
    carbs: 20,
    calories: cals(5, 10, 20),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Apple", amount: 1, unit: "piece" },
      { name: "Mixed nuts", amount: 20, unit: "g" }
    ],
    steps: [
      "Slice apple.",
      "Serve with a small handful of nuts."
    ]
  },

  {
    id: "s-hummus-veggies",
    name: "Hummus with Veg Sticks",
    mealType: "snack",
    dietTags: ["vegan"],
    allergens: ["sesame"],
    dislikesTags: [],
    cookTime: 5,
    protein: 7,
    fat: 8,
    carbs: 18,
    calories: cals(7, 8, 18),
    portion: 1,
    difficulty: "easy",
    ingredients: [
      { name: "Hummus", amount: 40, unit: "g" },
      { name: "Carrot sticks", amount: 60, unit: "g" },
      { name: "Cucumber sticks", amount: 40, unit: "g" }
    ],
    steps: [
      "Place hummus in a small bowl.",
      "Serve with fresh vegetable sticks for dipping."
    ]
  }
];

export default RECIPES;
