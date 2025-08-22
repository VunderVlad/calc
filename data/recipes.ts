// data/recipes.ts
// Rich recipe shape + seed data for SK / UA / General (Mediterranean/Asian) — all names in English

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type DietTag = 'none' | 'vegetarian' | 'vegan' | 'keto';
export type Allergen = 'nuts' | 'dairy' | 'gluten' | 'eggs' | 'fish' | 'soy';
export type Cuisine = 'slovak' | 'ukrainian' | 'general';
export type CookTime = 10 | 20 | 30;

export interface Recipe {
  id: string;
  name: string;
  mealType: MealType;
  dietTags: DietTag[];
  allergens: Allergen[];
  cuisine: Cuisine;
  cookTime: CookTime;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  ingredients: string[];
  steps: string[];
}

const cals = (p: number, f: number, cb: number) => 4 * p + 9 * f + 4 * cb;

// -------------------------
// SLOVAK CUISINE
// -------------------------
const slovak: Recipe[] = [
  // Breakfast (4)
  {
    id: 'sk-b-01',
    name: 'Oatmeal with Apple',
    mealType: 'breakfast',
    dietTags: ['vegetarian'],
    allergens: ['gluten', 'dairy'],
    cuisine: 'slovak',
    cookTime: 10,
    protein: 14, fat: 11, carbs: 57,
    calories: cals(14, 11, 57),
    ingredients: ['rolled oats', 'milk or water', 'apple', 'honey', 'cinnamon'],
    steps: ['Simmer oats in milk/water 5–7 min.', 'Stir in grated apple, honey, cinnamon.', 'Serve warm.']
  },
  {
    id: 'sk-b-02',
    name: 'Scrambled Eggs with Bread',
    mealType: 'breakfast',
    dietTags: ['none'],
    allergens: ['eggs', 'gluten', 'dairy'],
    cuisine: 'slovak',
    cookTime: 10,
    protein: 23, fat: 18, carbs: 25,
    calories: cals(23, 18, 25),
    ingredients: ['eggs', 'butter', 'salt', 'pepper', 'rye bread'],
    steps: ['Whisk eggs with salt.', 'Cook in butter, fold softly.', 'Serve on toasted rye.']
  },
  {
    id: 'sk-b-03',
    name: 'Quark with Honey and Walnuts',
    mealType: 'breakfast',
    dietTags: ['vegetarian'],
    allergens: ['dairy', 'nuts'],
    cuisine: 'slovak',
    cookTime: 10,
    protein: 24, fat: 12, carbs: 32,
    calories: cals(24, 12, 32),
    ingredients: ['quark (tvaroh)', 'honey', 'walnuts', 'berries'],
    steps: ['Stir quark with honey.', 'Top with chopped walnuts and berries.', 'Serve chilled.']
  },
  {
    id: 'sk-b-04',
    name: 'Ham and Cheese Sandwich',
    mealType: 'breakfast',
    dietTags: ['none'],
    allergens: ['gluten', 'dairy'],
    cuisine: 'slovak',
    cookTime: 10,
    protein: 22, fat: 15, carbs: 38,
    calories: cals(22, 15, 38),
    ingredients: ['bread', 'ham', 'cheese', 'butter', 'lettuce'],
    steps: ['Butter bread.', 'Layer ham, cheese, lettuce.', 'Press and serve.']
  },

  // Lunch (4)
  {
    id: 'sk-l-01',
    name: 'Potato Dumplings with Bryndza and Bacon',
    mealType: 'lunch',
    dietTags: ['none'],
    allergens: ['gluten', 'dairy'],
    cuisine: 'slovak',
    cookTime: 30,
    protein: 26, fat: 22, carbs: 75,
    calories: cals(26, 22, 75),
    ingredients: ['potato dumplings', 'bryndza cheese', 'bacon', 'sour cream', 'chives'],
    steps: ['Boil dumplings till float.', 'Toss with bryndza & cream.', 'Top with crisp bacon and chives.']
  },
  {
    id: 'sk-l-02',
    name: 'Segedin Goulash with Dumplings',
    mealType: 'lunch',
    dietTags: ['none'],
    allergens: ['gluten'],
    cuisine: 'slovak',
    cookTime: 30,
    protein: 32, fat: 18, carbs: 60,
    calories: cals(32, 18, 60),
    ingredients: ['pork', 'sauerkraut', 'paprika', 'onion', 'dumpling slices'],
    steps: ['Sauté onion & paprika, add pork.', 'Simmer with sauerkraut till tender.', 'Serve with dumplings.']
  },
  {
    id: 'sk-l-03',
    name: 'Roasted Chicken Thighs with Rice',
    mealType: 'lunch',
    dietTags: ['none'],
    allergens: [],
    cuisine: 'slovak',
    cookTime: 30,
    protein: 35, fat: 15, carbs: 55,
    calories: cals(35, 15, 55),
    ingredients: ['chicken thighs', 'garlic', 'paprika', 'rice', 'salt'],
    steps: ['Roast seasoned thighs 25–30 min.', 'Cook rice.', 'Serve together.']
  },
  {
    id: 'sk-l-04',
    name: 'Potato Pancakes with Sour Cream',
    mealType: 'lunch',
    dietTags: ['vegetarian'],
    allergens: ['eggs', 'gluten', 'dairy'],
    cuisine: 'slovak',
    cookTime: 20,
    protein: 16, fat: 20, carbs: 55,
    calories: cals(16, 20, 55),
    ingredients: ['potatoes', 'egg', 'flour', 'salt', 'sour cream'],
    steps: ['Grate potatoes, mix with egg & flour.', 'Pan-fry patties till golden.', 'Serve with sour cream.']
  },

  // Dinner (4)
  {
    id: 'sk-d-01',
    name: 'Bean Soup with Vegetables',
    mealType: 'dinner',
    dietTags: ['vegan'],
    allergens: [],
    cuisine: 'slovak',
    cookTime: 20,
    protein: 20, fat: 8, carbs: 60,
    calories: cals(20, 8, 60),
    ingredients: ['beans (cooked)', 'carrot', 'celery', 'onion', 'bay leaf'],
    steps: ['Sauté veg.', 'Add beans & water, simmer 15 min.', 'Season and serve.']
  },
  {
    id: 'sk-d-02',
    name: 'Fried Cheese with Fries',
    mealType: 'dinner',
    dietTags: ['vegetarian'],
    allergens: ['dairy', 'gluten', 'eggs'],
    cuisine: 'slovak',
    cookTime: 30,
    protein: 28, fat: 24, carbs: 70,
    calories: cals(28, 24, 70),
    ingredients: ['edam cheese', 'flour', 'egg', 'breadcrumbs', 'potatoes'],
    steps: ['Bread cheese (flour-egg-crumbs).', 'Deep/shallow fry.', 'Serve with fries.']
  },
  {
    id: 'sk-d-03',
    name: 'Butter-Fried Trout with Vegetables',
    mealType: 'dinner',
    dietTags: ['keto'],
    allergens: ['fish', 'dairy'],
    cuisine: 'slovak',
    cookTime: 20,
    protein: 34, fat: 24, carbs: 8,
    calories: cals(34, 24, 8),
    ingredients: ['trout', 'butter', 'lemon', 'zucchini', 'salt'],
    steps: ['Pan-sear trout in butter.', 'Sauté sliced zucchini.', 'Finish with lemon.']
  },
  {
    id: 'sk-d-04',
    name: 'Cabbage Soup (Kapustnica)',
    mealType: 'dinner',
    dietTags: ['none'],
    allergens: [],
    cuisine: 'slovak',
    cookTime: 30,
    protein: 22, fat: 15, carbs: 45,
    calories: cals(22, 15, 45),
    ingredients: ['sauerkraut', 'smoked sausage', 'mushrooms', 'paprika', 'garlic'],
    steps: ['Sauté sausage & paprika.', 'Add kraut, mushrooms, water; simmer.', 'Season to taste.']
  },

  // Snacks (3)
  {
    id: 'sk-s-01',
    name: 'Bryndza Spread on Rye Bread',
    mealType: 'snack',
    dietTags: ['vegetarian'],
    allergens: ['dairy', 'gluten'],
    cuisine: 'slovak',
    cookTime: 10,
    protein: 12, fat: 12, carbs: 28,
    calories: cals(12, 12, 28),
    ingredients: ['rye bread', 'bryndza', 'chives', 'pepper'],
    steps: ['Spread bryndza on bread.', 'Top with chives, pepper.', 'Serve.']
  },
  {
    id: 'sk-s-02',
    name: 'Pear with Quark',
    mealType: 'snack',
    dietTags: ['vegetarian'],
    allergens: ['dairy'],
    cuisine: 'slovak',
    cookTime: 10,
    protein: 13, fat: 6, carbs: 28,
    calories: cals(13, 6, 28),
    ingredients: ['pear', 'quark', 'honey'],
    steps: ['Slice pear.', 'Top with quark.', 'Drizzle honey.']
  },
  {
    id: 'sk-s-03',
    name: 'Poppy Seed Roll (slice)',
    mealType: 'snack',
    dietTags: ['vegetarian'],
    allergens: ['gluten', 'dairy'],
    cuisine: 'slovak',
    cookTime: 10,
    protein: 6, fat: 8, carbs: 34,
    calories: cals(6, 8, 34),
    ingredients: ['poppy seed roll slice'],
    steps: ['Slice and serve.', 'Optional: warm briefly.', 'Enjoy.']
  },
];

// -------------------------
// UKRAINIAN CUISINE
// -------------------------
const ukrainian: Recipe[] = [
  // Breakfast (4)
  {
    id: 'ua-b-01',
    name: 'Syrnyky (Cheese Pancakes)',
    mealType: 'breakfast',
    dietTags: ['vegetarian'],
    allergens: ['dairy', 'eggs', 'gluten'],
    cuisine: 'ukrainian',
    cookTime: 20,
    protein: 22, fat: 14, carbs: 45,
    calories: cals(22, 14, 45),
    ingredients: ['farmers cheese', 'egg', 'flour', 'sugar', 'oil'],
    steps: ['Mix cheese, egg, a bit of flour.', 'Shape patties; pan-fry.', 'Serve with yogurt/jam.']
  },
  {
    id: 'ua-b-02',
    name: 'Buckwheat Porridge',
    mealType: 'breakfast',
    dietTags: ['vegan'],
    allergens: [],
    cuisine: 'ukrainian',
    cookTime: 10,
    protein: 12, fat: 6, carbs: 55,
    calories: cals(12, 6, 55),
    ingredients: ['buckwheat', 'water', 'salt', 'oil'],
    steps: ['Simmer buckwheat 10 min.', 'Rest covered 5 min.', 'Season with oil & salt.']
  },
  {
    id: 'ua-b-03',
    name: 'Deruny (Potato Pancakes) with Yogurt',
    mealType: 'breakfast',
    dietTags: ['vegetarian'],
    allergens: ['eggs', 'dairy', 'gluten'],
    cuisine: 'ukrainian',
    cookTime: 20,
    protein: 16, fat: 17, carbs: 50,
    calories: cals(16, 17, 50),
    ingredients: ['potatoes', 'egg', 'flour', 'yogurt', 'salt'],
    steps: ['Grate potatoes; mix with egg & flour.', 'Pan-fry.', 'Serve with yogurt.']
  },
  {
    id: 'ua-b-04',
    name: 'Omelette with Herbs',
    mealType: 'breakfast',
    dietTags: ['vegetarian'],
    allergens: ['eggs', 'dairy'],
    cuisine: 'ukrainian',
    cookTime: 10,
    protein: 21, fat: 16, carbs: 6,
    calories: cals(21, 16, 6),
    ingredients: ['eggs', 'butter', 'dill', 'parsley', 'salt'],
    steps: ['Beat eggs with herbs.', 'Cook in butter gently.', 'Fold and serve.']
  },

  // Lunch (4)
  {
    id: 'ua-l-01',
    name: 'Vegan Borscht',
    mealType: 'lunch',
    dietTags: ['vegan'],
    allergens: [],
    cuisine: 'ukrainian',
    cookTime: 30,
    protein: 12, fat: 6, carbs: 60,
    calories: cals(12, 6, 60),
    ingredients: ['beetroot', 'cabbage', 'carrot', 'potato', 'tomato paste'],
    steps: ['Sauté veg.', 'Add water; simmer till tender.', 'Season; serve with herbs.']
  },
  {
    id: 'ua-l-02',
    name: 'Cabbage Rolls (Holubtsi)',
    mealType: 'lunch',
    dietTags: ['none'],
    allergens: [],
    cuisine: 'ukrainian',
    cookTime: 30,
    protein: 30, fat: 14, carbs: 60,
    calories: cals(30, 14, 60),
    ingredients: ['cabbage leaves', 'beef/pork mince', 'rice', 'onion', 'tomato sauce'],
    steps: ['Blanch leaves.', 'Stuff with meat/rice mix.', 'Simmer in tomato sauce.']
  },
  {
    id: 'ua-l-03',
    name: 'Dumplings with Potato Filling (Varenyky)',
    mealType: 'lunch',
    dietTags: ['vegetarian'],
    allergens: ['gluten', 'eggs', 'dairy'],
    cuisine: 'ukrainian',
    cookTime: 30,
    protein: 20, fat: 12, carbs: 70,
    calories: cals(20, 12, 70),
    ingredients: ['flour', 'egg', 'potatoes', 'butter', 'onion'],
    steps: ['Make dough; roll; cut rounds.', 'Fill with potato mash.', 'Boil till float; butter & onions.']
  },
  {
    id: 'ua-l-04',
    name: 'Chicken Kyiv',
    mealType: 'lunch',
    dietTags: ['none'],
    allergens: ['gluten', 'eggs', 'dairy'],
    cuisine: 'ukrainian',
    cookTime: 30,
    protein: 35, fat: 22, carbs: 45,
    calories: cals(35, 22, 45),
    ingredients: ['chicken breast', 'butter', 'breadcrumbs', 'egg', 'herbs'],
    steps: ['Wrap butter in pounded chicken.', 'Bread and chill.', 'Fry/bake till done.']
  },

  // Dinner (4)
  {
    id: 'ua-d-01',
    name: 'Herring with Potatoes',
    mealType: 'dinner',
    dietTags: ['none'],
    allergens: ['fish'],
    cuisine: 'ukrainian',
    cookTime: 20,
    protein: 26, fat: 14, carbs: 40,
    calories: cals(26, 14, 40),
    ingredients: ['herring fillets', 'boiled potatoes', 'onion', 'dill', 'oil'],
    steps: ['Boil potatoes.', 'Slice herring & onion.', 'Drizzle oil; garnish with dill.']
  },
  {
    id: 'ua-d-02',
    name: 'Mushroom Julienne',
    mealType: 'dinner',
    dietTags: ['vegetarian'],
    allergens: ['dairy', 'gluten'],
    cuisine: 'ukrainian',
    cookTime: 20,
    protein: 18, fat: 20, carbs: 22,
    calories: cals(18, 20, 22),
    ingredients: ['mushrooms', 'onion', 'cream', 'cheese', 'flour'],
    steps: ['Sauté mushrooms & onion.', 'Add cream, thicken lightly.', 'Top with cheese; bake briefly.']
  },
  {
    id: 'ua-d-03',
    name: 'Green Borscht (Sorrel Soup)',
    mealType: 'dinner',
    dietTags: ['vegetarian'],
    allergens: ['eggs'],
    cuisine: 'ukrainian',
    cookTime: 20,
    protein: 14, fat: 8, carbs: 30,
    calories: cals(14, 8, 30),
    ingredients: ['sorrel', 'potato', 'carrot', 'egg', 'dill'],
    steps: ['Simmer veg 15 min.', 'Add sorrel at end.', 'Serve with halved egg.']
  },
  {
    id: 'ua-d-04',
    name: 'Pork Cutlet with Mashed Potatoes',
    mealType: 'dinner',
    dietTags: ['none'],
    allergens: ['gluten', 'eggs', 'dairy'],
    cuisine: 'ukrainian',
    cookTime: 30,
    protein: 34, fat: 18, carbs: 62,
    calories: cals(34, 18, 62),
    ingredients: ['pork cutlet', 'egg', 'breadcrumbs', 'potatoes', 'milk'],
    steps: ['Bread & fry cutlet.', 'Boil & mash potatoes with milk.', 'Serve hot.']
  },

  // Snacks (3)
  {
    id: 'ua-s-01',
    name: 'Garlic Buns (Pampushky)',
    mealType: 'snack',
    dietTags: ['vegetarian'],
    allergens: ['gluten'],
    cuisine: 'ukrainian',
    cookTime: 10,
    protein: 7, fat: 6, carbs: 36,
    calories: cals(7, 6, 36),
    ingredients: ['garlic buns', 'oil', 'dill'],
    steps: ['Warm buns.', 'Brush with garlic-oil.', 'Sprinkle dill.']
  },
  {
    id: 'ua-s-02',
    name: 'Pickles with Rye Bread',
    mealType: 'snack',
    dietTags: ['vegan'],
    allergens: ['gluten'],
    cuisine: 'ukrainian',
    cookTime: 10,
    protein: 6, fat: 2, carbs: 30,
    calories: cals(6, 2, 30),
    ingredients: ['pickled cucumbers', 'rye bread'],
    steps: ['Slice cucumbers.', 'Serve with rye.', 'Optional: mustard.']
  },
  {
    id: 'ua-s-03',
    name: 'Salo with Black Bread',
    mealType: 'snack',
    dietTags: ['none'],
    allergens: ['gluten'],
    cuisine: 'ukrainian',
    cookTime: 10,
    protein: 8, fat: 18, carbs: 22,
    calories: cals(8, 18, 22),
    ingredients: ['salo', 'black bread', 'garlic'],
    steps: ['Slice thin salo.', 'Rub bread with garlic.', 'Assemble and serve.']
  },
];

// -------------------------
// GENERAL (Mediterranean / Asian)
// -------------------------

const general: Recipe[] = [
  // Breakfast (4)
  {
    id: 'gen-b-01',
    name: 'Greek Yogurt, Honey & Nuts',
    mealType: 'breakfast',
    dietTags: ['vegetarian'],
    allergens: ['dairy', 'nuts'],
    cuisine: 'general',
    cookTime: 10,
    protein: 20, fat: 12, carbs: 35,
    calories: cals(20, 12, 35),
    ingredients: ['Greek yogurt', 'honey', 'mixed nuts', 'berries'],
    steps: ['Spoon yogurt.', 'Top with honey, nuts, berries.', 'Serve cold.']
  },
  {
    id: 'gen-b-02',
    name: 'Avocado Toast',
    mealType: 'breakfast',
    dietTags: ['vegan'],
    allergens: ['gluten'],
    cuisine: 'general',
    cookTime: 10,
    protein: 8, fat: 14, carbs: 36,
    calories: cals(8, 14, 36),
    ingredients: ['bread', 'avocado', 'lemon', 'salt', 'pepper'],
    steps: ['Toast bread.', 'Mash avocado with lemon.', 'Spread & season.']
  },
  {
    id: 'gen-b-03',
    name: 'Shakshuka',
    mealType: 'breakfast',
    dietTags: ['vegetarian'],
    allergens: ['eggs'],
    cuisine: 'general',
    cookTime: 20,
    protein: 20, fat: 14, carbs: 30,
    calories: cals(20, 14, 30),
    ingredients: ['eggs', 'tomato sauce', 'bell pepper', 'onion', 'cumin'],
    steps: ['Sauté veg.', 'Simmer tomatoes.', 'Poach eggs in sauce.']
  },
  {
    id: 'gen-b-04',
    name: 'Tofu Scramble',
    mealType: 'breakfast',
    dietTags: ['vegan'],
    allergens: ['soy'],
    cuisine: 'general',
    cookTime: 10,
    protein: 22, fat: 10, carbs: 16,
    calories: cals(22, 10, 16),
    ingredients: ['firm tofu', 'turmeric', 'onion', 'spinach', 'salt'],
    steps: ['Crumble tofu; sauté with onion.', 'Add turmeric & spinach.', 'Season and serve.']
  },

  // Lunch (4)
  {
    id: 'gen-l-01',
    name: 'Salmon Teriyaki Bowl',
    mealType: 'lunch',
    dietTags: ['none'],
    allergens: ['fish', 'soy'],
    cuisine: 'general',
    cookTime: 20,
    protein: 35, fat: 16, carbs: 60,
    calories: cals(35, 16, 60),
    ingredients: ['salmon', 'teriyaki sauce', 'rice', 'broccoli', 'sesame'],
    steps: ['Pan-sear salmon.', 'Steam broccoli; cook rice.', 'Glaze with teriyaki; assemble.']
  },
  {
    id: 'gen-l-02',
    name: 'Falafel Bowl with Tahini',
    mealType: 'lunch',
    dietTags: ['vegan'],
    allergens: [],
    cuisine: 'general',
    cookTime: 20,
    protein: 20, fat: 14, carbs: 65,
    calories: cals(20, 14, 65),
    ingredients: ['falafel (baked)', 'quinoa or rice', 'tomato', 'cucumber', 'tahini-lemon sauce'],
    steps: ['Warm falafel.', 'Cook grain.', 'Assemble with veg & drizzle sauce.']
  },
  {
    id: 'gen-l-03',
    name: 'Chicken Gyros Bowl (with pita & tzatziki)',
    mealType: 'lunch',
    dietTags: ['none'],
    allergens: ['gluten', 'dairy'],
    cuisine: 'general',
    cookTime: 20,
    protein: 34, fat: 18, carbs: 62,
    calories: cals(34, 18, 62),
    ingredients: ['chicken thigh', 'pita', 'tzatziki', 'tomato', 'onion'],
    steps: ['Grill spiced chicken.', 'Warm pita.', 'Assemble bowl with tzatziki & veg.']
  },
  {
    id: 'gen-l-04',
    name: 'Veggie Stir-fry with Tofu & Rice',
    mealType: 'lunch',
    dietTags: ['vegan'],
    allergens: ['soy'],
    cuisine: 'general',
    cookTime: 20,
    protein: 24, fat: 12, carbs: 64,
    calories: cals(24, 12, 64),
    ingredients: ['tofu', 'mixed veg', 'soy sauce', 'garlic', 'rice'],
    steps: ['Stir-fry veg & tofu.', 'Add soy-garlic.', 'Serve over rice.']
  },

  // Dinner (4)
  {
    id: 'gen-d-01',
    name: 'Beef Pho (quick)',
    mealType: 'dinner',
    dietTags: ['none'],
    allergens: ['soy', 'fish'],
    cuisine: 'general',
    cookTime: 30,
    protein: 32, fat: 12, carbs: 70,
    calories: cals(32, 12, 70),
    ingredients: ['rice noodles', 'beef slices', 'broth', 'fish sauce', 'herbs'],
    steps: ['Heat broth with aromatics.', 'Cook noodles.', 'Assemble with beef; pour hot broth.']
  },
  {
    id: 'gen-d-02',
    name: 'Lentil Dal with Basmati',
    mealType: 'dinner',
    dietTags: ['vegan'],
    allergens: [],
    cuisine: 'general',
    cookTime: 30,
    protein: 26, fat: 10, carbs: 70,
    calories: cals(26, 10, 70),
    ingredients: ['red lentils', 'onion', 'garlic', 'curry spices', 'basmati rice'],
    steps: ['Simmer lentils 15–20 min.', 'Bloom spices with onion/garlic.', 'Combine; serve over rice.']
  },
  {
    id: 'gen-d-03',
    name: 'Caprese Pasta',
    mealType: 'dinner',
    dietTags: ['vegetarian'],
    allergens: ['gluten', 'dairy'],
    cuisine: 'general',
    cookTime: 20,
    protein: 22, fat: 14, carbs: 72,
    calories: cals(22, 14, 72),
    ingredients: ['pasta', 'mozzarella', 'tomatoes', 'basil', 'olive oil'],
    steps: ['Boil pasta.', 'Toss with chopped tomatoes & oil.', 'Fold in mozzarella & basil.']
  },
  {
    id: 'gen-d-04',
    name: 'Pad Thai (egg, shrimp optional)',
    mealType: 'dinner',
    dietTags: ['none'],
    allergens: ['eggs', 'fish', 'soy'],
    cuisine: 'general',
    cookTime: 20,
    protein: 28, fat: 14, carbs: 68,
    calories: cals(28, 14, 68),
    ingredients: ['rice noodles', 'egg', 'shrimp or chicken', 'tamarind/soy', 'peanuts (optional)'],
    steps: ['Soak noodles.', 'Stir-fry protein & egg.', 'Toss noodles with sauce; finish.']
  },

  // Snacks (3)
  {
    id: 'gen-s-01',
    name: 'Hummus with Veg Sticks',
    mealType: 'snack',
    dietTags: ['vegan'],
    allergens: [],
    cuisine: 'general',
    cookTime: 10,
    protein: 9, fat: 10, carbs: 22,
    calories: cals(9, 10, 22),
    ingredients: ['hummus', 'carrot sticks', 'cucumber', 'paprika'],
    steps: ['Spoon hummus.', 'Arrange veg sticks.', 'Dust with paprika.']
  },
  {
    id: 'gen-s-02',
    name: 'Fruit & Nuts Mix',
    mealType: 'snack',
    dietTags: ['vegan'],
    allergens: ['nuts'],
    cuisine: 'general',
    cookTime: 10,
    protein: 7, fat: 12, carbs: 24,
    calories: cals(7, 12, 24),
    ingredients: ['apple slices', 'almonds', 'raisins'],
    steps: ['Slice fruit.', 'Combine with nuts & raisins.', 'Serve.']
  },
  {
    id: 'gen-s-03',
    name: 'Edamame with Sea Salt',
    mealType: 'snack',
    dietTags: ['vegan'],
    allergens: ['soy'],
    cuisine: 'general',
    cookTime: 10,
    protein: 12, fat: 6, carbs: 16,
    calories: cals(12, 6, 16),
    ingredients: ['edamame pods', 'salt'],
    steps: ['Boil edamame 3–5 min.', 'Drain.', 'Salt and serve warm.']
  },
];

// Export
export const RECIPES: Recipe[] = [...slovak, ...ukrainian, ...general];
export default RECIPES;
