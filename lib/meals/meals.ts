// lib/meals/meals.ts
import type { Meal } from "./mealTypes";

export const meals: Meal[] = [
   {
    id: "oatmeal_protein_bowl_01",
    type: "breakfast",
    tags: ["vegetarian", "high-protein"],
    image: "/images/meals/oatmeal_protein_bowl_01.jpg",

    baseCalories: 420,
    protein: 30,
    carbs: 45,
    fat: 10,

    servingKey: "meal.serving.breakfast",

    ingredients: [
      { ingredientKey: "ingredient.oats", grams: 60 },
      { ingredientKey: "ingredient.wheyProtein", grams: 30 },
      { ingredientKey: "ingredient.milk", grams: 200 }
    ],
    steps: [
      { stepKey: "step.cookOats" },
      { stepKey: "step.addProtein" },
      { stepKey: "step.mixAndServe" }
    ],

    nameKey: "meal.oatmeal_protein_bowl_01.name",
    descriptionKey: "meal.oatmeal_protein_bowl_01.description"
  },
  {
    id: "salmon_potato_plate_01",
    type: "dinner",
    tags: ["omega-3", "gluten-free"],
    image: "/images/meals/salmon_potato_plate_01.jpg",

    baseCalories: 560,
    protein: 40,
    carbs: 35,
    fat: 25,

    servingKey: "meal.serving.dinner",

    ingredients: [
      { ingredientKey: "ingredient.salmon", grams: 160 },
      { ingredientKey: "ingredient.potatoes", grams: 200 },
      { ingredientKey: "ingredient.oliveOil", grams: 10 }
    ],
    steps: [
      { stepKey: "step.bakeSalmon" },
      { stepKey: "step.boilPotatoes" },
      { stepKey: "step.plateAndServe" }
    ],

    nameKey: "meal.salmon_potato_plate_01.name",
    descriptionKey: "meal.salmon_potato_plate_01.description"
  },

   {
    id: "chicken_rice_plate_01",
    type: "lunch",
    tags: ["high-protein", "budget"],
    image: "/images/meals/chicken_rice_plate_01.jpg",

    baseCalories: 520,
    protein: 45,
    carbs: 55,
    fat: 10,

    servingKey: "meal.serving.lunch",

    ingredients: [
      { ingredientKey: "ingredient.chickenBreast", grams: 180 },
      { ingredientKey: "ingredient.rice", grams: 150 },
      { ingredientKey: "ingredient.oliveOil", grams: 10 }
    ],
    steps: [
      { stepKey: "step.cookChicken" },
      { stepKey: "step.cookRice" },
      { stepKey: "step.combineAndServe" }
    ],

    nameKey: "meal.chicken_rice_plate_01.name",
    descriptionKey: "meal.chicken_rice_plate_01.description"
  },

  {
  id: "oatmeal_banana_bowl_05",
  type: "breakfast",
  tags: ["vegetarian", "budget", "quick"],
  image: "/images/meals/oatmeal_banana_bowl_05.jpg",

  baseCalories: 420,
  protein: 14,
  carbs: 68,
  fat: 10,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 80 },
    { ingredientKey: "ingredient.banana", grams: 120 },
    { ingredientKey: "ingredient.milk", grams: 200 }
  ],

  steps: [
    { stepKey: "step.boilOats" },
    { stepKey: "step.sliceBanana" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.oatmeal_banana_bowl_05.name",
  descriptionKey: "meal.oatmeal_banana_bowl_05.description"
},
{
  id: "chicken_rice_bowl_06",
  type: "lunch",
  tags: ["high-protein", "balanced"],
  image: "/images/meals/chicken_rice_bowl_06.jpg",

  baseCalories: 560,
  protein: 42,
  carbs: 55,
  fat: 14,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 180 },
    { ingredientKey: "ingredient.rice", grams: 180 },
    { ingredientKey: "ingredient.oliveOil", grams: 5 }
  ],

  steps: [
    { stepKey: "step.cookChicken" },
    { stepKey: "step.cookRice" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.chicken_rice_bowl_06.name",
  descriptionKey: "meal.chicken_rice_bowl_06.description"
},
{
  id: "turkey_wrap_07",
  type: "lunch",
  tags: ["high-protein", "quick"],
  image: "/images/meals/turkey_wrap_07.jpg",

  baseCalories: 480,
  protein: 36,
  carbs: 42,
  fat: 12,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.turkey", grams: 150 },
    { ingredientKey: "ingredient.tortilla", grams: 70 },
    { ingredientKey: "ingredient.lettuce", grams: 40 }
  ],

  steps: [
    { stepKey: "step.prepareIngredients" },
    { stepKey: "step.wrapAndServe" }
  ],

  nameKey: "meal.turkey_wrap_07.name",
  descriptionKey: "meal.turkey_wrap_07.description"
},
{
    id: "pasta_tomato_sauce_08",
    type: "dinner",
    tags: ["vegetarian", "comfort"],
    image: "/images/meals/pasta_tomato_sauce_08.jpg",

    baseCalories: 585,
    protein: 18,
    carbs: 92,
    fat: 16,

    servingKey: "meal.serving.dinner",

    ingredients: [
      { ingredientKey: "ingredient.pasta", grams: 100 },
      { ingredientKey: "ingredient.tomatoes", grams: 150 },
      { ingredientKey: "ingredient.oliveOil", grams: 8 }
    ],

    steps: [
      { stepKey: "step.boilPasta" },
      { stepKey: "step.prepareSauce" },
      { stepKey: "step.combineAndServe" }
    ],

    nameKey: "meal.pasta_tomato_sauce_08.name",
    descriptionKey: "meal.pasta_tomato_sauce_08.description"
  },
{
  id: "peanut_butter_toast_09",
  type: "snack",
  tags: ["quick", "energy"],
  image: "/images/meals/peanut_butter_toast_09.jpg",

  baseCalories: 310,
  protein: 10,
  carbs: 28,
  fat: 18,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.bread", grams: 60 },
    { ingredientKey: "ingredient.peanutButter", grams: 25 }
  ],

  steps: [
    { stepKey: "step.toastBread" },
    { stepKey: "step.spreadPeanutButter" }
  ],

  nameKey: "meal.peanut_butter_toast_09.name",
  descriptionKey: "meal.peanut_butter_toast_09.description"
},
{
  id: "scrambled_eggs_plate_10",
  type: "breakfast",
  tags: ["high-protein", "quick"],
  image: "/images/meals/scrambled_eggs_plate_10.jpg",

  baseCalories: 390,
  protein: 28,
  carbs: 6,
  fat: 28,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.eggs", grams: 180 },
    { ingredientKey: "ingredient.butter", grams: 10 }
  ],

  steps: [
    { stepKey: "step.whiskEggs" },
    { stepKey: "step.cookScramble" }
  ],

  nameKey: "meal.scrambled_eggs_plate_10.name",
  descriptionKey: "meal.scrambled_eggs_plate_10.description"
},
{
  id: "greek_yogurt_berry_cup_11",
  type: "snack",
  tags: ["quick", "high-protein", "vegetarian"],
  image: "/images/meals/greek_yogurt_berry_cup_11.jpg",

  baseCalories: 280,
  protein: 22,
  carbs: 32,
  fat: 6,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.greekYogurt", grams: 200 },
    { ingredientKey: "ingredient.berries", grams: 120 },
    { ingredientKey: "ingredient.honey", grams: 10 }
  ],

  steps: [
    { stepKey: "step.addYogurtToBowl" },
    { stepKey: "step.addBerries" },
    { stepKey: "step.drizzleHoney" }
  ],

  nameKey: "meal.greek_yogurt_berry_cup_11.name",
  descriptionKey: "meal.greek_yogurt_berry_cup_11.description"
},
{
  id: "tuna_salad_sandwich_12",
  type: "lunch",
  tags: ["quick", "high-protein"],
  image: "/images/meals/tuna_salad_sandwich_12.jpg",

  baseCalories: 520,
  protein: 36,
  carbs: 44,
  fat: 22,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.tuna", grams: 160 },
    { ingredientKey: "ingredient.mayo", grams: 20 },
    { ingredientKey: "ingredient.bread", grams: 90 },
    { ingredientKey: "ingredient.cucumber", grams: 60 }
  ],

  steps: [
    { stepKey: "step.mixTunaWithSauce" },
    { stepKey: "step.assembleSandwich" },
    { stepKey: "step.sliceAndServe" }
  ],

  nameKey: "meal.tuna_salad_sandwich_12.name",
  descriptionKey: "meal.tuna_salad_sandwich_12.description"
},
{
  id: "beef_stir_fry_rice_13",
  type: "dinner",
  tags: ["high-protein", "balanced"],
  image: "/images/meals/beef_stir_fry_rice_13.jpg",

  baseCalories: 690,
  protein: 45,
  carbs: 78,
  fat: 22,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.beef", grams: 180 },
    { ingredientKey: "ingredient.rice", grams: 200 },
    { ingredientKey: "ingredient.bellPepper", grams: 120 },
    { ingredientKey: "ingredient.soySauce", grams: 15 },
    { ingredientKey: "ingredient.oliveOil", grams: 8 }
  ],

  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.stirFryMeat" },
    { stepKey: "step.addVegetablesAndSauce" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.beef_stir_fry_rice_13.name",
  descriptionKey: "meal.beef_stir_fry_rice_13.description"
},
{
  id: "cottage_cheese_apple_bowl_14",
  type: "breakfast",
  tags: ["quick", "high-protein", "vegetarian"],
  image: "/images/meals/cottage_cheese_apple_bowl_14.jpg",

  baseCalories: 360,
  protein: 28,
  carbs: 36,
  fat: 10,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.cottageCheese", grams: 250 },
    { ingredientKey: "ingredient.apple", grams: 160 },
    { ingredientKey: "ingredient.cinnamon", grams: 2 },
    { ingredientKey: "ingredient.walnuts", grams: 10 }
  ],

  steps: [
    { stepKey: "step.sliceApple" },
    { stepKey: "step.addCottageCheeseToBowl" },
    { stepKey: "step.topWithAppleAndCinnamon" }
  ],

  nameKey: "meal.cottage_cheese_apple_bowl_14.name",
  descriptionKey: "meal.cottage_cheese_apple_bowl_14.description"
},
{
  id: "salmon_potato_plate_15",
  type: "dinner",
  tags: ["balanced", "omega-3"],
  image: "/images/meals/salmon_potato_plate_15.jpg",

  baseCalories: 640,
  protein: 42,
  carbs: 52,
  fat: 28,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.salmon", grams: 180 },
    { ingredientKey: "ingredient.potatoes", grams: 260 },
    { ingredientKey: "ingredient.oliveOil", grams: 8 },
    { ingredientKey: "ingredient.lemon", grams: 30 }
  ],

  steps: [
    { stepKey: "step.bakePotatoes" },
    { stepKey: "step.cookSalmon" },
    { stepKey: "step.finishWithLemon" },
    { stepKey: "step.plateAndServe" }
  ],

  nameKey: "meal.salmon_potato_plate_15.name",
  descriptionKey: "meal.salmon_potato_plate_15.description"
},
{
  id: "rice_cakes_avocado_16",
  type: "snack",
  tags: ["quick", "vegetarian"],
  image: "/images/meals/rice_cakes_avocado_16.jpg",

  baseCalories: 260,
  protein: 6,
  carbs: 28,
  fat: 14,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.riceCakes", grams: 18 },
    { ingredientKey: "ingredient.avocado", grams: 100 },
    { ingredientKey: "ingredient.salt", grams: 1 }
  ],

  steps: [
    { stepKey: "step.mashAvocado" },
    { stepKey: "step.spreadOnRiceCakes" },
    { stepKey: "step.seasonAndServe" }
  ],

  nameKey: "meal.rice_cakes_avocado_16.name",
  descriptionKey: "meal.rice_cakes_avocado_16.description"
},
{
  id: "chicken_pasta_alfredo_light_17",
  type: "dinner",
  tags: ["high-protein", "comfort"],
  image: "/images/meals/chicken_pasta_alfredo_light_17.jpg",

  baseCalories: 720,
  protein: 52,
  carbs: 78,
  fat: 22,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 200 },
    { ingredientKey: "ingredient.pasta", grams: 110 },
    { ingredientKey: "ingredient.greekYogurt", grams: 120 },
    { ingredientKey: "ingredient.parmesan", grams: 15 },
    { ingredientKey: "ingredient.garlic", grams: 4 }
  ],

  steps: [
    { stepKey: "step.boilPasta" },
    { stepKey: "step.cookChicken" },
    { stepKey: "step.makeCreamySauce" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.chicken_pasta_alfredo_light_17.name",
  descriptionKey: "meal.chicken_pasta_alfredo_light_17.description"
},
{
  id: "lentil_soup_bowl_18",
  type: "lunch",
  tags: ["vegetarian", "budget", "meal-prep"],
  image: "/images/meals/lentil_soup_bowl_18.jpg",

  baseCalories: 520,
  protein: 28,
  carbs: 78,
  fat: 10,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.lentils", grams: 90 },
    { ingredientKey: "ingredient.carrot", grams: 80 },
    { ingredientKey: "ingredient.onion", grams: 60 },
    { ingredientKey: "ingredient.tomatoes", grams: 120 },
    { ingredientKey: "ingredient.oliveOil", grams: 6 }
  ],

  steps: [
    { stepKey: "step.sauteVegetables" },
    { stepKey: "step.addLentilsAndWater" },
    { stepKey: "step.simmerUntilSoft" },
    { stepKey: "step.serveHot" }
  ],

  nameKey: "meal.lentil_soup_bowl_18.name",
  descriptionKey: "meal.lentil_soup_bowl_18.description"
},
{
  id: "egg_cheese_breakfast_wrap_19",
  type: "breakfast",
  tags: ["quick", "high-protein"],
  image: "/images/meals/egg_cheese_breakfast_wrap_19.jpg",

  baseCalories: 540,
  protein: 32,
  carbs: 46,
  fat: 26,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.eggs", grams: 140 },
    { ingredientKey: "ingredient.tortilla", grams: 80 },
    { ingredientKey: "ingredient.cheese", grams: 30 },
    { ingredientKey: "ingredient.spinach", grams: 40 }
  ],

  steps: [
    { stepKey: "step.cookScramble" },
    { stepKey: "step.warmTortilla" },
    { stepKey: "step.wrapAndServe" }
  ],

  nameKey: "meal.egg_cheese_breakfast_wrap_19.name",
  descriptionKey: "meal.egg_cheese_breakfast_wrap_19.description"
},
{
  id: "protein_pancakes_20",
  type: "breakfast",
  tags: ["high-protein", "sweet"],
  image: "/images/meals/protein_pancakes_20.jpg",

  baseCalories: 510,
  protein: 40,
  carbs: 52,
  fat: 14,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 60 },
    { ingredientKey: "ingredient.eggs", grams: 120 },
    { ingredientKey: "ingredient.banana", grams: 100 },
    { ingredientKey: "ingredient.greekYogurt", grams: 80 }
  ],

  steps: [
    { stepKey: "step.blendBatter" },
    { stepKey: "step.fryPancakes" },
    { stepKey: "step.serveWithToppings" }
  ],

  nameKey: "meal.protein_pancakes_20.name",
  descriptionKey: "meal.protein_pancakes_20.description"
},
{
  id: "turkey_rice_bowl_21",
  type: "lunch",
  tags: ["high-protein", "balanced"],
  image: "/images/meals/turkey_rice_bowl_21.jpg",

  baseCalories: 610,
  protein: 44,
  carbs: 68,
  fat: 16,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.turkey", grams: 180 },
    { ingredientKey: "ingredient.rice", grams: 200 },
    { ingredientKey: "ingredient.broccoli", grams: 120 },
    { ingredientKey: "ingredient.oliveOil", grams: 6 }
  ],

  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.cookTurkey" },
    { stepKey: "step.steamVegetables" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.turkey_rice_bowl_21.name",
  descriptionKey: "meal.turkey_rice_bowl_21.description"
},
{
  id: "oatmeal_banana_peanut_22",
  type: "breakfast",
  tags: ["sweet", "energy"],
  image: "/images/meals/oatmeal_banana_peanut_22.jpg",

  baseCalories: 520,
  protein: 22,
  carbs: 68,
  fat: 18,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 70 },
    { ingredientKey: "ingredient.banana", grams: 120 },
    { ingredientKey: "ingredient.peanutButter", grams: 20 },
    { ingredientKey: "ingredient.milk", grams: 200 }
  ],

  steps: [
    { stepKey: "step.cookOats" },
    { stepKey: "step.sliceBanana" },
    { stepKey: "step.addPeanutButter" },
    { stepKey: "step.mixAndServe" }
  ],

  nameKey: "meal.oatmeal_banana_peanut_22.name",
  descriptionKey: "meal.oatmeal_banana_peanut_22.description"
},
{
  id: "shrimp_pasta_garlic_23",
  type: "dinner",
  tags: ["seafood", "quick"],
  image: "/images/meals/shrimp_pasta_garlic_23.jpg",

  baseCalories: 680,
  protein: 46,
  carbs: 74,
  fat: 20,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.shrimp", grams: 200 },
    { ingredientKey: "ingredient.pasta", grams: 110 },
    { ingredientKey: "ingredient.garlic", grams: 6 },
    { ingredientKey: "ingredient.oliveOil", grams: 10 }
  ],

  steps: [
    { stepKey: "step.boilPasta" },
    { stepKey: "step.sauteGarlic" },
    { stepKey: "step.cookShrimp" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.shrimp_pasta_garlic_23.name",
  descriptionKey: "meal.shrimp_pasta_garlic_23.description"
},
{
  id: "chicken_caesar_salad_light_24",
  type: "lunch",
  tags: ["low-carb", "high-protein"],
  image: "/images/meals/chicken_caesar_salad_light_24.jpg",

  baseCalories: 480,
  protein: 42,
  carbs: 18,
  fat: 24,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 180 },
    { ingredientKey: "ingredient.lettuce", grams: 120 },
    { ingredientKey: "ingredient.parmesan", grams: 20 },
    { ingredientKey: "ingredient.caesarSauce", grams: 25 }
  ],

  steps: [
    { stepKey: "step.cookChicken" },
    { stepKey: "step.chopLettuce" },
    { stepKey: "step.addSauceAndCheese" },
    { stepKey: "step.tossAndServe" }
  ],

  nameKey: "meal.chicken_caesar_salad_light_24.name",
  descriptionKey: "meal.chicken_caesar_salad_light_24.description"
},
{
  id: "protein_berry_smoothie_25",
  type: "snack",
  tags: ["drink", "high-protein"],
  image: "/images/meals/protein_berry_smoothie_25.jpg",

  baseCalories: 340,
  protein: 32,
  carbs: 34,
  fat: 6,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.wheyProtein", grams: 30 },
    { ingredientKey: "ingredient.berries", grams: 150 },
    { ingredientKey: "ingredient.milk", grams: 250 }
  ],

  steps: [
    { stepKey: "step.addIngredientsToBlender" },
    { stepKey: "step.blendUntilSmooth" },
    { stepKey: "step.pourAndServe" }
  ],

  nameKey: "meal.protein_berry_smoothie_25.name",
  descriptionKey: "meal.protein_berry_smoothie_25.description"
},
{
  id: "pork_loin_sweet_potato_26",
  type: "dinner",
  tags: ["balanced"],
  image: "/images/meals/pork_loin_sweet_potato_26.jpg",

  baseCalories: 700,
  protein: 48,
  carbs: 56,
  fat: 28,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.porkLoin", grams: 200 },
    { ingredientKey: "ingredient.sweetPotato", grams: 260 },
    { ingredientKey: "ingredient.oliveOil", grams: 8 }
  ],

  steps: [
    { stepKey: "step.bakeSweetPotato" },
    { stepKey: "step.cookPork" },
    { stepKey: "step.plateAndServe" }
  ],

  nameKey: "meal.pork_loin_sweet_potato_26.name",
  descriptionKey: "meal.pork_loin_sweet_potato_26.description"
},
{
  id: "veggie_omelette_27",
  type: "breakfast",
  tags: ["vegetarian", "quick"],
  image: "/images/meals/veggie_omelette_27.jpg",

  baseCalories: 420,
  protein: 28,
  carbs: 10,
  fat: 30,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.eggs", grams: 180 },
    { ingredientKey: "ingredient.spinach", grams: 60 },
    { ingredientKey: "ingredient.bellPepper", grams: 80 },
    { ingredientKey: "ingredient.cheese", grams: 25 }
  ],

  steps: [
    { stepKey: "step.whiskEggs" },
    { stepKey: "step.cookVegetables" },
    { stepKey: "step.cookOmelette" }
  ],

  nameKey: "meal.veggie_omelette_27.name",
  descriptionKey: "meal.veggie_omelette_27.description"
},
{
  id: "chickpea_veggie_bowl_28",
  type: "lunch",
  tags: ["vegan", "fiber-rich"],
  image: "/images/meals/chickpea_veggie_bowl_28.jpg",

  baseCalories: 560,
  protein: 22,
  carbs: 78,
  fat: 16,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.chickpeas", grams: 160 },
    { ingredientKey: "ingredient.zucchini", grams: 120 },
    { ingredientKey: "ingredient.tomatoes", grams: 120 },
    { ingredientKey: "ingredient.oliveOil", grams: 8 }
  ],

  steps: [
    { stepKey: "step.cookChickpeas" },
    { stepKey: "step.roastVegetables" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.chickpea_veggie_bowl_28.name",
  descriptionKey: "meal.chickpea_veggie_bowl_28.description"
},
{
  id: "beef_burger_plate_29",
  type: "dinner",
  tags: ["comfort", "high-protein"],
  image: "/images/meals/beef_burger_plate_29.jpg",

  baseCalories: 760,
  protein: 44,
  carbs: 52,
  fat: 36,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.groundBeef", grams: 200 },
    { ingredientKey: "ingredient.bread", grams: 80 },
    { ingredientKey: "ingredient.lettuce", grams: 40 },
    { ingredientKey: "ingredient.tomatoes", grams: 60 }
  ],

  steps: [
    { stepKey: "step.formBurgerPatty" },
    { stepKey: "step.cookBurger" },
    { stepKey: "step.assembleAndServe" }
  ],

  nameKey: "meal.beef_burger_plate_29.name",
  descriptionKey: "meal.beef_burger_plate_29.description"
},
{
  id: "yogurt_chia_pudding_30",
  type: "snack",
  tags: ["sweet", "meal-prep"],
  image: "/images/meals/yogurt_chia_pudding_30.jpg",

  baseCalories: 330,
  protein: 20,
  carbs: 26,
  fat: 16,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.greekYogurt", grams: 180 },
    { ingredientKey: "ingredient.chiaSeeds", grams: 20 },
    { ingredientKey: "ingredient.honey", grams: 10 }
  ],

  steps: [
    { stepKey: "step.mixIngredients" },
    { stepKey: "step.chillOvernight" },
    { stepKey: "step.serveCold" }
  ],

  nameKey: "meal.yogurt_chia_pudding_30.name",
  descriptionKey: "meal.yogurt_chia_pudding_30.description"
},
{
  id: "salmon_rice_plate_31",
  type: "dinner",
  tags: ["omega-3", "balanced"],
  image: "/images/meals/salmon_rice_plate_31.jpg",

  baseCalories: 690,
  protein: 42,
  carbs: 62,
  fat: 28,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.salmon", grams: 180 },
    { ingredientKey: "ingredient.rice", grams: 190 },
    { ingredientKey: "ingredient.lemon", grams: 20 },
    { ingredientKey: "ingredient.oliveOil", grams: 6 }
  ],

  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.bakeSalmon" },
    { stepKey: "step.plateAndServe" }
  ],

  nameKey: "meal.salmon_rice_plate_31.name",
  descriptionKey: "meal.salmon_rice_plate_31.description"
},
{
  id: "cottage_cheese_fruit_bowl_32",
  type: "snack",
  tags: ["high-protein", "sweet"],
  image: "/images/meals/cottage_cheese_fruit_bowl_32.jpg",

  baseCalories: 360,
  protein: 28,
  carbs: 32,
  fat: 10,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.cottageCheese", grams: 200 },
    { ingredientKey: "ingredient.apple", grams: 120 },
    { ingredientKey: "ingredient.honey", grams: 10 }
  ],

  steps: [
    { stepKey: "step.sliceFruit" },
    { stepKey: "step.combineIngredients" },
    { stepKey: "step.serveImmediately" }
  ],

  nameKey: "meal.cottage_cheese_fruit_bowl_32.name",
  descriptionKey: "meal.cottage_cheese_fruit_bowl_32.description"
},
{
  id: "chicken_wrap_whole_wheat_33",
  type: "lunch",
  tags: ["portable", "balanced"],
  image: "/images/meals/chicken_wrap_whole_wheat_33.jpg",

  baseCalories: 610,
  protein: 40,
  carbs: 58,
  fat: 20,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 160 },
    { ingredientKey: "ingredient.tortilla", grams: 80 },
    { ingredientKey: "ingredient.lettuce", grams: 60 },
    { ingredientKey: "ingredient.tomatoes", grams: 80 }
  ],

  steps: [
    { stepKey: "step.cookChicken" },
    { stepKey: "step.prepareWrap" },
    { stepKey: "step.wrapAndServe" }
  ],

  nameKey: "meal.chicken_wrap_whole_wheat_33.name",
  descriptionKey: "meal.chicken_wrap_whole_wheat_33.description"
},
 {
    id: "lentil_vegetable_soup_34",
    type: "dinner",
    tags: ["vegan", "fiber-rich"],
    image: "/images/meals/lentil_vegetable_soup_34.jpg",

    baseCalories: 505,
    protein: 26,
    carbs: 78,
    fat: 10,

    servingKey: "meal.serving.dinner",

    ingredients: [
      { ingredientKey: "ingredient.lentils", grams: 160 },
      { ingredientKey: "ingredient.carrots", grams: 100 },
      { ingredientKey: "ingredient.onion", grams: 80 }
    ],

    steps: [
      { stepKey: "step.boilLentils" },
      { stepKey: "step.addVegetables" },
      { stepKey: "step.simmerAndServe" }
    ],

    nameKey: "meal.lentil_vegetable_soup_34.name",
    descriptionKey: "meal.lentil_vegetable_soup_34.description"
  },
{
  id: "protein_pancakes_35",
  type: "breakfast",
  tags: ["high-protein", "sweet"],
  image: "/images/meals/protein_pancakes_35.jpg",

  baseCalories: 540,
  protein: 38,
  carbs: 48,
  fat: 20,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 60 },
    { ingredientKey: "ingredient.eggs", grams: 120 },
    { ingredientKey: "ingredient.wheyProtein", grams: 25 }
  ],

  steps: [
    { stepKey: "step.mixBatter" },
    { stepKey: "step.cookPancakes" },
    { stepKey: "step.serveWarm" }
  ],

  nameKey: "meal.protein_pancakes_35.name",
  descriptionKey: "meal.protein_pancakes_35.description"
},
{
  id: "tuna_corn_salad_36",
  type: "lunch",
  tags: ["quick", "high-protein"],
  image: "/images/meals/tuna_corn_salad_36.jpg",

  baseCalories: 480,
  protein: 36,
  carbs: 34,
  fat: 18,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.tuna", grams: 160 },
    { ingredientKey: "ingredient.corn", grams: 120 },
    { ingredientKey: "ingredient.lettuce", grams: 80 },
    { ingredientKey: "ingredient.oliveOil", grams: 6 }
  ],

  steps: [
    { stepKey: "step.drainTuna" },
    { stepKey: "step.combineIngredients" },
    { stepKey: "step.tossAndServe" }
  ],

  nameKey: "meal.tuna_corn_salad_36.name",
  descriptionKey: "meal.tuna_corn_salad_36.description"
},
{
  id: "beef_stir_fry_rice_37",
  type: "dinner",
  tags: ["high-protein"],
  image: "/images/meals/beef_stir_fry_rice_37.jpg",

  baseCalories: 740,
  protein: 46,
  carbs: 66,
  fat: 32,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.beef", grams: 200 },
    { ingredientKey: "ingredient.rice", grams: 200 },
    { ingredientKey: "ingredient.bellPepper", grams: 100 },
    { ingredientKey: "ingredient.oliveOil", grams: 10 }
  ],

  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.stirFryBeef" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.beef_stir_fry_rice_37.name",
  descriptionKey: "meal.beef_stir_fry_rice_37.description"
},
{
  id: "avocado_egg_toast_38",
  type: "breakfast",
  tags: ["quick", "healthy-fats"],
  image: "/images/meals/avocado_egg_toast_38.jpg",

  baseCalories: 490,
  protein: 22,
  carbs: 38,
  fat: 28,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.bread", grams: 80 },
    { ingredientKey: "ingredient.eggs", grams: 120 },
    { ingredientKey: "ingredient.avocado", grams: 70 }
  ],

  steps: [
    { stepKey: "step.toastBread" },
    { stepKey: "step.cookEggs" },
    { stepKey: "step.assembleAndServe" }
  ],

  nameKey: "meal.avocado_egg_toast_38.name",
  descriptionKey: "meal.avocado_egg_toast_38.description"
},
{
  id: "tofu_veggie_stir_fry_39",
  type: "dinner",
  tags: ["vegan", "plant-protein"],
  image: "/images/meals/tofu_veggie_stir_fry_39.jpg",

  baseCalories: 560,
  protein: 32,
  carbs: 46,
  fat: 22,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.tofu", grams: 200 },
    { ingredientKey: "ingredient.broccoli", grams: 120 },
    { ingredientKey: "ingredient.carrots", grams: 80 },
    { ingredientKey: "ingredient.oliveOil", grams: 8 }
  ],

  steps: [
    { stepKey: "step.cookTofu" },
    { stepKey: "step.stirFryVegetables" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.tofu_veggie_stir_fry_39.name",
  descriptionKey: "meal.tofu_veggie_stir_fry_39.description"
},
{
  id: "banana_yogurt_smoothie_40",
  type: "snack",
  tags: ["drink", "quick"],
  image: "/images/meals/banana_yogurt_smoothie_40.jpg",

  baseCalories: 310,
  protein: 18,
  carbs: 42,
  fat: 6,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.banana", grams: 130 },
    { ingredientKey: "ingredient.yogurt", grams: 200 }
  ],

  steps: [
    { stepKey: "step.addIngredientsToBlender" },
    { stepKey: "step.blendUntilSmooth" },
    { stepKey: "step.pourAndServe" }
  ],

  nameKey: "meal.banana_yogurt_smoothie_40.name",
  descriptionKey: "meal.banana_yogurt_smoothie_40.description"
},
{
  id: "turkey_rice_bowl_41",
  type: "lunch",
  tags: ["high-protein", "balanced"],
  image: "/images/meals/turkey_rice_bowl_41.jpg",

  baseCalories: 640,
  protein: 44,
  carbs: 60,
  fat: 18,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.turkey", grams: 180 },
    { ingredientKey: "ingredient.rice", grams: 190 },
    { ingredientKey: "ingredient.broccoli", grams: 120 },
    { ingredientKey: "ingredient.oliveOil", grams: 6 }
  ],

  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.cookTurkey" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.turkey_rice_bowl_41.name",
  descriptionKey: "meal.turkey_rice_bowl_41.description"
},
{
  id: "oatmeal_apple_cinnamon_42",
  type: "breakfast",
  tags: ["fiber-rich", "sweet"],
  image: "/images/meals/oatmeal_apple_cinnamon_42.jpg",

  baseCalories: 430,
  protein: 18,
  carbs: 62,
  fat: 12,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 70 },
    { ingredientKey: "ingredient.apple", grams: 140 },
    { ingredientKey: "ingredient.cinnamon", grams: 2 }
  ],

  steps: [
    { stepKey: "step.cookOats" },
    { stepKey: "step.addFruit" },
    { stepKey: "step.serveWarm" }
  ],

  nameKey: "meal.oatmeal_apple_cinnamon_42.name",
  descriptionKey: "meal.oatmeal_apple_cinnamon_42.description"
},
{
  id: "shrimp_pasta_plate_43",
  type: "dinner",
  tags: ["seafood", "balanced"],
  image: "/images/meals/shrimp_pasta_plate_43.jpg",

  baseCalories: 720,
  protein: 42,
  carbs: 78,
  fat: 24,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.shrimp", grams: 200 },
    { ingredientKey: "ingredient.pasta", grams: 220 },
    { ingredientKey: "ingredient.garlic", grams: 6 },
    { ingredientKey: "ingredient.oliveOil", grams: 8 }
  ],

  steps: [
    { stepKey: "step.cookPasta" },
    { stepKey: "step.sauteShrimp" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.shrimp_pasta_plate_43.name",
  descriptionKey: "meal.shrimp_pasta_plate_43.description"
},
{
  id: "yogurt_granola_cup_44",
  type: "snack",
  tags: ["quick", "sweet"],
  image: "/images/meals/yogurt_granola_cup_44.jpg",

  baseCalories: 360,
  protein: 20,
  carbs: 42,
  fat: 12,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.yogurt", grams: 200 },
    { ingredientKey: "ingredient.granola", grams: 60 },
    { ingredientKey: "ingredient.honey", grams: 8 }
  ],

  steps: [
    { stepKey: "step.layerIngredients" },
    { stepKey: "step.serveImmediately" }
  ],

  nameKey: "meal.yogurt_granola_cup_44.name",
  descriptionKey: "meal.yogurt_granola_cup_44.description"
},
{
  id: "chicken_potato_plate_45",
  type: "dinner",
  tags: ["classic", "balanced"],
  image: "/images/meals/chicken_potato_plate_45.jpg",

  baseCalories: 710,
  protein: 48,
  carbs: 56,
  fat: 26,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 200 },
    { ingredientKey: "ingredient.potatoes", grams: 260 },
    { ingredientKey: "ingredient.oliveOil", grams: 10 }
  ],

  steps: [
    { stepKey: "step.bakePotatoes" },
    { stepKey: "step.cookChicken" },
    { stepKey: "step.plateAndServe" }
  ],

  nameKey: "meal.chicken_potato_plate_45.name",
  descriptionKey: "meal.chicken_potato_plate_45.description"
},
 {
    id: "smoothie_berry_protein_46",
    type: "snack",
    tags: ["drink", "high-protein"],
    image: "/images/meals/smoothie_berry_protein_46.jpg",

    baseCalories: 330,
    protein: 26,
    carbs: 34,
    fat: 6,

    servingKey: "meal.serving.snack",

    ingredients: [
      { ingredientKey: "ingredient.berries", grams: 140 },
      { ingredientKey: "ingredient.wheyProtein", grams: 25 }
    ],

    steps: [
      { stepKey: "step.addIngredientsToBlender" },
      { stepKey: "step.blendUntilSmooth" },
      { stepKey: "step.pourAndServe" }
    ],

    nameKey: "meal.smoothie_berry_protein_46.name",
    descriptionKey: "meal.smoothie_berry_protein_46.description"
  },
{
  id: "veggie_rice_stir_fry_47",
  type: "lunch",
  tags: ["vegan", "fiber-rich"],
  image: "/images/meals/veggie_rice_stir_fry_47.jpg",

  baseCalories: 560,
  protein: 22,
  carbs: 78,
  fat: 16,

  servingKey: "meal.serving.lunch",

  ingredients: [
    { ingredientKey: "ingredient.rice", grams: 220 },
    { ingredientKey: "ingredient.bellPepper", grams: 100 },
    { ingredientKey: "ingredient.zucchini", grams: 100 },
    { ingredientKey: "ingredient.oliveOil", grams: 8 }
  ],

  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.stirFryVegetables" },
    { stepKey: "step.combineAndServe" }
  ],

  nameKey: "meal.veggie_rice_stir_fry_47.name",
  descriptionKey: "meal.veggie_rice_stir_fry_47.description"
},
{
  id: "eggs_spinach_toast_48",
  type: "breakfast",
  tags: ["quick", "high-protein"],
  image: "/images/meals/eggs_spinach_toast_48.jpg",

  baseCalories: 460,
  protein: 28,
  carbs: 36,
  fat: 24,

  servingKey: "meal.serving.breakfast",

  ingredients: [
    { ingredientKey: "ingredient.eggs", grams: 120 },
    { ingredientKey: "ingredient.spinach", grams: 80 },
    { ingredientKey: "ingredient.bread", grams: 80 }
  ],

  steps: [
    { stepKey: "step.toastBread" },
    { stepKey: "step.cookEggs" },
    { stepKey: "step.assembleAndServe" }
  ],

  nameKey: "meal.eggs_spinach_toast_48.name",
  descriptionKey: "meal.eggs_spinach_toast_48.description"
},
{
  id: "beef_bean_chili_49",
  type: "dinner",
  tags: ["hearty", "high-protein"],
  image: "/images/meals/beef_bean_chili_49.jpg",

  baseCalories: 780,
  protein: 48,
  carbs: 64,
  fat: 34,

  servingKey: "meal.serving.dinner",

  ingredients: [
    { ingredientKey: "ingredient.beef", grams: 220 },
    { ingredientKey: "ingredient.beans", grams: 180 },
    { ingredientKey: "ingredient.tomatoes", grams: 140 }
  ],

  steps: [
    { stepKey: "step.cookBeef" },
    { stepKey: "step.addBeansAndTomatoes" },
    { stepKey: "step.simmerAndServe" }
  ],

  nameKey: "meal.beef_bean_chili_49.name",
  descriptionKey: "meal.beef_bean_chili_49.description"
},
{
  id: "apple_peanut_butter_snack_50",
  type: "snack",
  tags: ["quick", "energy"],
  image: "/images/meals/apple_peanut_butter_snack_50.jpg",

  baseCalories: 290,
  protein: 10,
  carbs: 26,
  fat: 18,

  servingKey: "meal.serving.snack",

  ingredients: [
    { ingredientKey: "ingredient.apple", grams: 150 },
    { ingredientKey: "ingredient.peanutButter", grams: 24 }
  ],

  steps: [
    { stepKey: "step.sliceFruit" },
    { stepKey: "step.spreadPeanutButter" },
    { stepKey: "step.serveImmediately" }
  ],

  nameKey: "meal.apple_peanut_butter_snack_50.name",
  descriptionKey: "meal.apple_peanut_butter_snack_50.description"
},

// ===== 51–60 =====

{
  id: "egg_avocado_bowl_51",
  type: "breakfast",
  tags: ["quick", "healthy-fats"],
  image: "/images/meals/egg_avocado_bowl_51.jpg",
  baseCalories: 420,
  protein: 22,
  carbs: 18,
  fat: 30,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.eggs", grams: 140 },
    { ingredientKey: "ingredient.avocado", grams: 100 },
    { ingredientKey: "ingredient.spinach", grams: 60 }
  ],
  steps: [
    { stepKey: "step.cookEggs" },
    { stepKey: "step.sliceAvocado" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.egg_avocado_bowl_51.name",
  descriptionKey: "meal.egg_avocado_bowl_51.description"
},

{
  id: "oatmeal_berry_almond_52",
  type: "breakfast",
  tags: ["vegetarian", "fiber-rich"],
  image: "/images/meals/oatmeal_berry_almond_52.jpg",
  baseCalories: 460,
  protein: 18,
  carbs: 62,
  fat: 14,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 70 },
    { ingredientKey: "ingredient.berries", grams: 120 },
    { ingredientKey: "ingredient.almonds", grams: 20 }
  ],
  steps: [
    { stepKey: "step.cookOats" },
    { stepKey: "step.addBerries" },
    { stepKey: "step.topWithNuts" }
  ],
  nameKey: "meal.oatmeal_berry_almond_52.name",
  descriptionKey: "meal.oatmeal_berry_almond_52.description"
},

{
  id: "chicken_quinoa_bowl_53",
  type: "lunch",
  tags: ["high-protein", "balanced"],
  image: "/images/meals/chicken_quinoa_bowl_53.jpg",
  baseCalories: 620,
  protein: 44,
  carbs: 58,
  fat: 18,
  servingKey: "meal.serving.lunch",
  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 180 },
    { ingredientKey: "ingredient.quinoa", grams: 160 },
    { ingredientKey: "ingredient.broccoli", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookQuinoa" },
    { stepKey: "step.cookChicken" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.chicken_quinoa_bowl_53.name",
  descriptionKey: "meal.chicken_quinoa_bowl_53.description"
},

{
  id: "tuna_rice_bowl_54",
  type: "lunch",
  tags: ["high-protein", "quick"],
  image: "/images/meals/tuna_rice_bowl_54.jpg",
  baseCalories: 580,
  protein: 38,
  carbs: 64,
  fat: 14,
  servingKey: "meal.serving.lunch",
  ingredients: [
    { ingredientKey: "ingredient.tuna", grams: 160 },
    { ingredientKey: "ingredient.rice", grams: 200 },
    { ingredientKey: "ingredient.cucumber", grams: 80 }
  ],
  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.prepareTuna" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.tuna_rice_bowl_54.name",
  descriptionKey: "meal.tuna_rice_bowl_54.description"
},

{
  id: "beef_potato_plate_55",
  type: "dinner",
  tags: ["high-protein", "classic"],
  image: "/images/meals/beef_potato_plate_55.jpg",
  baseCalories: 720,
  protein: 46,
  carbs: 52,
  fat: 32,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.beef", grams: 200 },
    { ingredientKey: "ingredient.potatoes", grams: 260 },
    { ingredientKey: "ingredient.greenBeans", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookBeef" },
    { stepKey: "step.bakePotatoes" },
    { stepKey: "step.plateAndServe" }
  ],
  nameKey: "meal.beef_potato_plate_55.name",
  descriptionKey: "meal.beef_potato_plate_55.description"
},

{
  id: "protein_chia_pudding_56",
  type: "snack",
  tags: ["meal-prep", "high-protein"],
  image: "/images/meals/protein_chia_pudding_56.jpg",
  baseCalories: 340,
  protein: 26,
  carbs: 28,
  fat: 14,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.greekYogurt", grams: 180 },
    { ingredientKey: "ingredient.chiaSeeds", grams: 20 },
    { ingredientKey: "ingredient.honey", grams: 8 }
  ],
  steps: [
    { stepKey: "step.mixIngredients" },
    { stepKey: "step.chillOvernight" },
    { stepKey: "step.serveCold" }
  ],
  nameKey: "meal.protein_chia_pudding_56.name",
  descriptionKey: "meal.protein_chia_pudding_56.description"
},

{
  id: "turkey_pasta_plate_57",
  type: "dinner",
  tags: ["high-protein"],
  image: "/images/meals/turkey_pasta_plate_57.jpg",
  baseCalories: 680,
  protein: 44,
  carbs: 72,
  fat: 18,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.turkey", grams: 180 },
    { ingredientKey: "ingredient.pasta", grams: 110 },
    { ingredientKey: "ingredient.tomatoes", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookPasta" },
    { stepKey: "step.cookTurkey" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.turkey_pasta_plate_57.name",
  descriptionKey: "meal.turkey_pasta_plate_57.description"
},

{
  id: "veggie_omelette_plate_58",
  type: "breakfast",
  tags: ["vegetarian", "quick"],
  image: "/images/meals/veggie_omelette_plate_58.jpg",
  baseCalories: 400,
  protein: 26,
  carbs: 12,
  fat: 28,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.eggs", grams: 160 },
    { ingredientKey: "ingredient.spinach", grams: 80 },
    { ingredientKey: "ingredient.cheese", grams: 30 }
  ],
  steps: [
    { stepKey: "step.whiskEggs" },
    { stepKey: "step.cookOmelette" },
    { stepKey: "step.serveWarm" }
  ],
  nameKey: "meal.veggie_omelette_plate_58.name",
  descriptionKey: "meal.veggie_omelette_plate_58.description"
},

{
  id: "salmon_quinoa_plate_59",
  type: "dinner",
  tags: ["omega-3", "balanced"],
  image: "/images/meals/salmon_quinoa_plate_59.jpg",
  baseCalories: 700,
  protein: 42,
  carbs: 54,
  fat: 30,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.salmon", grams: 180 },
    { ingredientKey: "ingredient.quinoa", grams: 160 },
    { ingredientKey: "ingredient.broccoli", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookQuinoa" },
    { stepKey: "step.bakeSalmon" },
    { stepKey: "step.plateAndServe" }
  ],
  nameKey: "meal.salmon_quinoa_plate_59.name",
  descriptionKey: "meal.salmon_quinoa_plate_59.description"
},

{
  id: "banana_peanut_smoothie_60",
  type: "snack",
  tags: ["drink", "energy"],
  image: "/images/meals/banana_peanut_smoothie_60.jpg",
  baseCalories: 360,
  protein: 22,
  carbs: 42,
  fat: 14,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.banana", grams: 140 },
    { ingredientKey: "ingredient.peanutButter", grams: 20 },
    { ingredientKey: "ingredient.milk", grams: 200 }
  ],
  steps: [
    { stepKey: "step.addIngredientsToBlender" },
    { stepKey: "step.blendUntilSmooth" },
    { stepKey: "step.pourAndServe" }
  ],
  nameKey: "meal.banana_peanut_smoothie_60.name",
  descriptionKey: "meal.banana_peanut_smoothie_60.description"
},

// ===== 61–70 =====

{
  id: "oatmeal_pear_walnut_61",
  type: "breakfast",
  tags: ["fiber-rich", "vegetarian"],
  image: "/images/meals/oatmeal_pear_walnut_61.jpg",
  baseCalories: 460,
  protein: 16,
  carbs: 62,
  fat: 16,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 70 },
    { ingredientKey: "ingredient.pear", grams: 150 },
    { ingredientKey: "ingredient.walnuts", grams: 20 }
  ],
  steps: [
    { stepKey: "step.cookOats" },
    { stepKey: "step.sliceFruit" },
    { stepKey: "step.topWithNuts" }
  ],
  nameKey: "meal.oatmeal_pear_walnut_61.name",
  descriptionKey: "meal.oatmeal_pear_walnut_61.description"
},

{
  id: "egg_mushroom_scramble_62",
  type: "breakfast",
  tags: ["high-protein", "quick"],
  image: "/images/meals/egg_mushroom_scramble_62.jpg",
  baseCalories: 390,
  protein: 28,
  carbs: 12,
  fat: 26,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.eggs", grams: 160 },
    { ingredientKey: "ingredient.mushrooms", grams: 120 },
    { ingredientKey: "ingredient.butter", grams: 8 }
  ],
  steps: [
    { stepKey: "step.whiskEggs" },
    { stepKey: "step.cookVegetables" },
    { stepKey: "step.cookScramble" }
  ],
  nameKey: "meal.egg_mushroom_scramble_62.name",
  descriptionKey: "meal.egg_mushroom_scramble_62.description"
},

{
  id: "chicken_bulgur_bowl_63",
  type: "lunch",
  tags: ["balanced", "high-protein"],
  image: "/images/meals/chicken_bulgur_bowl_63.jpg",
  baseCalories: 610,
  protein: 42,
  carbs: 64,
  fat: 14,
  servingKey: "meal.serving.lunch",
  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 180 },
    { ingredientKey: "ingredient.bulgur", grams: 180 },
    { ingredientKey: "ingredient.tomatoes", grams: 100 }
  ],
  steps: [
    { stepKey: "step.cookBulgur" },
    { stepKey: "step.cookChicken" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.chicken_bulgur_bowl_63.name",
  descriptionKey: "meal.chicken_bulgur_bowl_63.description"
},

{
  id: "tuna_pasta_salad_64",
  type: "lunch",
  tags: ["quick", "high-protein"],
  image: "/images/meals/tuna_pasta_salad_64.jpg",
  baseCalories: 590,
  protein: 38,
  carbs: 62,
  fat: 18,
  servingKey: "meal.serving.lunch",
  ingredients: [
    { ingredientKey: "ingredient.tuna", grams: 160 },
    { ingredientKey: "ingredient.pasta", grams: 120 },
    { ingredientKey: "ingredient.cucumber", grams: 80 }
  ],
  steps: [
    { stepKey: "step.cookPasta" },
    { stepKey: "step.prepareTuna" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.tuna_pasta_salad_64.name",
  descriptionKey: "meal.tuna_pasta_salad_64.description"
},

{
  id: "beef_rice_pepper_65",
  type: "dinner",
  tags: ["high-protein", "classic"],
  image: "/images/meals/beef_rice_pepper_65.jpg",
  baseCalories: 730,
  protein: 46,
  carbs: 66,
  fat: 30,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.beef", grams: 200 },
    { ingredientKey: "ingredient.rice", grams: 200 },
    { ingredientKey: "ingredient.bellPepper", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.stirFryBeef" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.beef_rice_pepper_65.name",
  descriptionKey: "meal.beef_rice_pepper_65.description"
},

{
  id: "yogurt_fruit_nut_cup_66",
  type: "snack",
  tags: ["sweet", "quick"],
  image: "/images/meals/yogurt_fruit_nut_cup_66.jpg",
  baseCalories: 340,
  protein: 18,
  carbs: 38,
  fat: 14,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.yogurt", grams: 200 },
    { ingredientKey: "ingredient.apple", grams: 120 },
    { ingredientKey: "ingredient.nuts", grams: 20 }
  ],
  steps: [
    { stepKey: "step.sliceFruit" },
    { stepKey: "step.combineIngredients" },
    { stepKey: "step.serveImmediately" }
  ],
  nameKey: "meal.yogurt_fruit_nut_cup_66.name",
  descriptionKey: "meal.yogurt_fruit_nut_cup_66.description"
},

{
  id: "turkey_potato_plate_67",
  type: "dinner",
  tags: ["balanced"],
  image: "/images/meals/turkey_potato_plate_67.jpg",
  baseCalories: 680,
  protein: 44,
  carbs: 54,
  fat: 24,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.turkey", grams: 200 },
    { ingredientKey: "ingredient.potatoes", grams: 260 },
    { ingredientKey: "ingredient.greenBeans", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookTurkey" },
    { stepKey: "step.bakePotatoes" },
    { stepKey: "step.plateAndServe" }
  ],
  nameKey: "meal.turkey_potato_plate_67.name",
  descriptionKey: "meal.turkey_potato_plate_67.description"
},

{
  id: "protein_oat_balls_68",
  type: "snack",
  tags: ["high-protein", "meal-prep"],
  image: "/images/meals/protein_oat_balls_68.jpg",
  baseCalories: 360,
  protein: 24,
  carbs: 36,
  fat: 14,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 60 },
    { ingredientKey: "ingredient.wheyProtein", grams: 25 },
    { ingredientKey: "ingredient.peanutButter", grams: 20 }
  ],
  steps: [
    { stepKey: "step.mixIngredients" },
    { stepKey: "step.formBalls" },
    { stepKey: "step.chillAndServe" }
  ],
  nameKey: "meal.protein_oat_balls_68.name",
  descriptionKey: "meal.protein_oat_balls_68.description"
},

{
  id: "salmon_veggie_stir_fry_69",
  type: "dinner",
  tags: ["omega-3"],
  image: "/images/meals/salmon_veggie_stir_fry_69.jpg",
  baseCalories: 690,
  protein: 40,
  carbs: 34,
  fat: 36,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.salmon", grams: 180 },
    { ingredientKey: "ingredient.zucchini", grams: 120 },
    { ingredientKey: "ingredient.bellPepper", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookSalmon" },
    { stepKey: "step.stirFryVegetables" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.salmon_veggie_stir_fry_69.name",
  descriptionKey: "meal.salmon_veggie_stir_fry_69.description"
},

{
  id: "banana_cottage_cheese_70",
  type: "snack",
  tags: ["high-protein", "sweet"],
  image: "/images/meals/banana_cottage_cheese_70.jpg",
  baseCalories: 320,
  protein: 24,
  carbs: 36,
  fat: 6,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.cottageCheese", grams: 200 },
    { ingredientKey: "ingredient.banana", grams: 120 }
  ],
  steps: [
    { stepKey: "step.sliceFruit" },
    { stepKey: "step.combineIngredients" },
    { stepKey: "step.serveImmediately" }
  ],
  nameKey: "meal.banana_cottage_cheese_70.name",
  descriptionKey: "meal.banana_cottage_cheese_70.description"
},

// ===== 81–90 =====

{
  id: "oatmeal_pear_walnut_81",
  type: "breakfast",
  tags: ["vegetarian", "fiber-rich"],
  image: "/images/meals/oatmeal_pear_walnut_81.jpg",
  baseCalories: 460,
  protein: 18,
  carbs: 56,
  fat: 18,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 70 },
    { ingredientKey: "ingredient.pear", grams: 150 },
    { ingredientKey: "ingredient.walnuts", grams: 20 }
  ],
  steps: [
    { stepKey: "step.cookOats" },
    { stepKey: "step.sliceFruit" },
    { stepKey: "step.topWithNuts" }
  ],
  nameKey: "meal.oatmeal_pear_walnut_81.name",
  descriptionKey: "meal.oatmeal_pear_walnut_81.description"
},

{
  id: "egg_white_veggie_scramble_82",
  type: "breakfast",
  tags: ["high-protein", "low-fat"],
  image: "/images/meals/egg_white_veggie_scramble_82.jpg",
  baseCalories: 320,
  protein: 34,
  carbs: 12,
  fat: 6,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.eggWhites", grams: 200 },
    { ingredientKey: "ingredient.spinach", grams: 80 },
    { ingredientKey: "ingredient.bellPepper", grams: 80 }
  ],
  steps: [
    { stepKey: "step.sauteVegetables" },
    { stepKey: "step.cookEggWhites" },
    { stepKey: "step.serveImmediately" }
  ],
  nameKey: "meal.egg_white_veggie_scramble_82.name",
  descriptionKey: "meal.egg_white_veggie_scramble_82.description"
},

{
  id: "chicken_bulgur_bowl_83",
  type: "lunch",
  tags: ["balanced", "high-protein"],
  image: "/images/meals/chicken_bulgur_bowl_83.jpg",
  baseCalories: 610,
  protein: 42,
  carbs: 62,
  fat: 14,
  servingKey: "meal.serving.lunch",
  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 180 },
    { ingredientKey: "ingredient.bulgur", grams: 200 },
    { ingredientKey: "ingredient.cucumber", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookBulgur" },
    { stepKey: "step.cookChicken" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.chicken_bulgur_bowl_83.name",
  descriptionKey: "meal.chicken_bulgur_bowl_83.description"
},

{
  id: "turkey_chili_rice_84",
  type: "dinner",
  tags: ["high-protein", "hearty"],
  image: "/images/meals/turkey_chili_rice_84.jpg",
  baseCalories: 720,
  protein: 46,
  carbs: 68,
  fat: 24,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.turkey", grams: 220 },
    { ingredientKey: "ingredient.beans", grams: 180 },
    { ingredientKey: "ingredient.rice", grams: 160 }
  ],
  steps: [
    { stepKey: "step.cookTurkey" },
    { stepKey: "step.addBeansAndSpices" },
    { stepKey: "step.serveWithRice" }
  ],
  nameKey: "meal.turkey_chili_rice_84.name",
  descriptionKey: "meal.turkey_chili_rice_84.description"
},

{
  id: "protein_pudding_cocoa_85",
  type: "snack",
  tags: ["sweet", "high-protein"],
  image: "/images/meals/protein_pudding_cocoa_85.jpg",
  baseCalories: 290,
  protein: 26,
  carbs: 22,
  fat: 8,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.greekYogurt", grams: 200 },
    { ingredientKey: "ingredient.cocoaPowder", grams: 8 },
    { ingredientKey: "ingredient.honey", grams: 10 }
  ],
  steps: [
    { stepKey: "step.mixIngredients" },
    { stepKey: "step.chillBeforeServing" }
  ],
  nameKey: "meal.protein_pudding_cocoa_85.name",
  descriptionKey: "meal.protein_pudding_cocoa_85.description"
},

{
  id: "beef_noodle_stir_fry_86",
  type: "dinner",
  tags: ["high-protein", "comfort"],
  image: "/images/meals/beef_noodle_stir_fry_86.jpg",
  baseCalories: 760,
  protein: 44,
  carbs: 74,
  fat: 30,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.beef", grams: 200 },
    { ingredientKey: "ingredient.noodles", grams: 140 },
    { ingredientKey: "ingredient.bellPepper", grams: 100 }
  ],
  steps: [
    { stepKey: "step.cookNoodles" },
    { stepKey: "step.stirFryBeef" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.beef_noodle_stir_fry_86.name",
  descriptionKey: "meal.beef_noodle_stir_fry_86.description"
},

{
  id: "cottage_cheese_honey_nuts_87",
  type: "snack",
  tags: ["high-protein", "sweet"],
  image: "/images/meals/cottage_cheese_honey_nuts_87.jpg",
  baseCalories: 330,
  protein: 28,
  carbs: 24,
  fat: 14,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.cottageCheese", grams: 220 },
    { ingredientKey: "ingredient.honey", grams: 12 },
    { ingredientKey: "ingredient.nuts", grams: 20 }
  ],
  steps: [
    { stepKey: "step.combineIngredients" },
    { stepKey: "step.serveImmediately" }
  ],
  nameKey: "meal.cottage_cheese_honey_nuts_87.name",
  descriptionKey: "meal.cottage_cheese_honey_nuts_87.description"
},

{
  id: "salmon_orzo_plate_88",
  type: "dinner",
  tags: ["omega-3", "balanced"],
  image: "/images/meals/salmon_orzo_plate_88.jpg",
  baseCalories: 700,
  protein: 42,
  carbs: 58,
  fat: 28,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.salmon", grams: 180 },
    { ingredientKey: "ingredient.orzo", grams: 180 },
    { ingredientKey: "ingredient.lemon", grams: 20 }
  ],
  steps: [
    { stepKey: "step.cookOrzo" },
    { stepKey: "step.bakeSalmon" },
    { stepKey: "step.plateAndServe" }
  ],
  nameKey: "meal.salmon_orzo_plate_88.name",
  descriptionKey: "meal.salmon_orzo_plate_88.description"
},

{
  id: "apple_yogurt_cinnamon_89",
  type: "snack",
  tags: ["quick", "light"],
  image: "/images/meals/apple_yogurt_cinnamon_89.jpg",
  baseCalories: 260,
  protein: 16,
  carbs: 34,
  fat: 6,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.yogurt", grams: 200 },
    { ingredientKey: "ingredient.apple", grams: 120 },
    { ingredientKey: "ingredient.cinnamon", grams: 2 }
  ],
  steps: [
    { stepKey: "step.sliceFruit" },
    { stepKey: "step.combineIngredients" }
  ],
  nameKey: "meal.apple_yogurt_cinnamon_89.name",
  descriptionKey: "meal.apple_yogurt_cinnamon_89.description"
},

{
  id: "veggie_lentil_curry_90",
  type: "dinner",
  tags: ["vegan", "fiber-rich"],
  image: "/images/meals/veggie_lentil_curry_90.jpg",
  baseCalories: 620,
  protein: 28,
  carbs: 82,
  fat: 18,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.lentils", grams: 180 },
    { ingredientKey: "ingredient.tomatoes", grams: 160 },
    { ingredientKey: "ingredient.spinach", grams: 100 }
  ],
  steps: [
    { stepKey: "step.cookLentils" },
    { stepKey: "step.addSpicesAndVegetables" },
    { stepKey: "step.simmerAndServe" }
  ],
  nameKey: "meal.veggie_lentil_curry_90.name",
  descriptionKey: "meal.veggie_lentil_curry_90.description"
},

// ===== 91–100 =====

{
  id: "oatmeal_chocolate_peanut_91",
  type: "breakfast",
  tags: ["sweet", "energy"],
  image: "/images/meals/oatmeal_chocolate_peanut_91.jpg",
  baseCalories: 520,
  protein: 22,
  carbs: 58,
  fat: 22,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 70 },
    { ingredientKey: "ingredient.peanutButter", grams: 20 },
    { ingredientKey: "ingredient.cocoaPowder", grams: 8 }
  ],
  steps: [
    { stepKey: "step.cookOats" },
    { stepKey: "step.addPeanutButter" },
    { stepKey: "step.mixAndServe" }
  ],
  nameKey: "meal.oatmeal_chocolate_peanut_91.name",
  descriptionKey: "meal.oatmeal_chocolate_peanut_91.description"
},

{
  id: "chicken_wrap_avocado_92",
  type: "lunch",
  tags: ["balanced", "portable"],
  image: "/images/meals/chicken_wrap_avocado_92.jpg",
  baseCalories: 640,
  protein: 38,
  carbs: 52,
  fat: 24,
  servingKey: "meal.serving.lunch",
  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 160 },
    { ingredientKey: "ingredient.tortilla", grams: 80 },
    { ingredientKey: "ingredient.avocado", grams: 80 }
  ],
  steps: [
    { stepKey: "step.cookChicken" },
    { stepKey: "step.prepareWrap" },
    { stepKey: "step.wrapAndServe" }
  ],
  nameKey: "meal.chicken_wrap_avocado_92.name",
  descriptionKey: "meal.chicken_wrap_avocado_92.description"
},

{
  id: "shrimp_rice_bowl_93",
  type: "dinner",
  tags: ["seafood", "balanced"],
  image: "/images/meals/shrimp_rice_bowl_93.jpg",
  baseCalories: 610,
  protein: 42,
  carbs: 62,
  fat: 14,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.shrimp", grams: 200 },
    { ingredientKey: "ingredient.rice", grams: 180 },
    { ingredientKey: "ingredient.zucchini", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.cookShrimp" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.shrimp_rice_bowl_93.name",
  descriptionKey: "meal.shrimp_rice_bowl_93.description"
},

{
  id: "protein_banana_pancakes_94",
  type: "breakfast",
  tags: ["high-protein", "sweet"],
  image: "/images/meals/protein_banana_pancakes_94.jpg",
  baseCalories: 530,
  protein: 38,
  carbs: 52,
  fat: 18,
  servingKey: "meal.serving.breakfast",
  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 60 },
    { ingredientKey: "ingredient.banana", grams: 120 },
    { ingredientKey: "ingredient.eggs", grams: 120 }
  ],
  steps: [
    { stepKey: "step.blendBatter" },
    { stepKey: "step.fryPancakes" },
    { stepKey: "step.serveWarm" }
  ],
  nameKey: "meal.protein_banana_pancakes_94.name",
  descriptionKey: "meal.protein_banana_pancakes_94.description"
},

{
  id: "tofu_rice_bowl_95",
  type: "lunch",
  tags: ["vegan", "plant-protein"],
  image: "/images/meals/tofu_rice_bowl_95.jpg",
  baseCalories: 580,
  protein: 30,
  carbs: 66,
  fat: 18,
  servingKey: "meal.serving.lunch",
  ingredients: [
    { ingredientKey: "ingredient.tofu", grams: 200 },
    { ingredientKey: "ingredient.rice", grams: 200 },
    { ingredientKey: "ingredient.broccoli", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.cookTofu" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.tofu_rice_bowl_95.name",
  descriptionKey: "meal.tofu_rice_bowl_95.description"
},

{
  id: "beef_tortilla_bowl_96",
  type: "dinner",
  tags: ["high-protein", "comfort"],
  image: "/images/meals/beef_tortilla_bowl_96.jpg",
  baseCalories: 750,
  protein: 44,
  carbs: 64,
  fat: 32,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.beef", grams: 200 },
    { ingredientKey: "ingredient.tortilla", grams: 100 },
    { ingredientKey: "ingredient.tomatoes", grams: 120 }
  ],
  steps: [
    { stepKey: "step.cookBeef" },
    { stepKey: "step.prepareIngredients" },
    { stepKey: "step.combineAndServe" }
  ],
  nameKey: "meal.beef_tortilla_bowl_96.name",
  descriptionKey: "meal.beef_tortilla_bowl_96.description"
},

{
  id: "yogurt_strawberry_chia_97",
  type: "snack",
  tags: ["sweet", "meal-prep"],
  image: "/images/meals/yogurt_strawberry_chia_97.jpg",
  baseCalories: 320,
  protein: 20,
  carbs: 32,
  fat: 14,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.greekYogurt", grams: 180 },
    { ingredientKey: "ingredient.strawberries", grams: 140 },
    { ingredientKey: "ingredient.chiaSeeds", grams: 20 }
  ],
  steps: [
    { stepKey: "step.mixIngredients" },
    { stepKey: "step.chillOvernight" }
  ],
  nameKey: "meal.yogurt_strawberry_chia_97.name",
  descriptionKey: "meal.yogurt_strawberry_chia_97.description"
},

{
  id: "chicken_potato_broccoli_98",
  type: "dinner",
  tags: ["classic", "balanced"],
  image: "/images/meals/chicken_potato_broccoli_98.jpg",
  baseCalories: 690,
  protein: 46,
  carbs: 54,
  fat: 24,
  servingKey: "meal.serving.dinner",
  ingredients: [
    { ingredientKey: "ingredient.chickenBreast", grams: 200 },
    { ingredientKey: "ingredient.potatoes", grams: 240 },
    { ingredientKey: "ingredient.broccoli", grams: 140 }
  ],
  steps: [
    { stepKey: "step.bakePotatoes" },
    { stepKey: "step.cookChicken" },
    { stepKey: "step.plateAndServe" }
  ],
  nameKey: "meal.chicken_potato_broccoli_98.name",
  descriptionKey: "meal.chicken_potato_broccoli_98.description"
},

{
  id: "rice_pudding_almond_99",
  type: "snack",
  tags: ["sweet", "comfort"],
  image: "/images/meals/rice_pudding_almond_99.jpg",
  baseCalories: 350,
  protein: 12,
  carbs: 52,
  fat: 10,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.rice", grams: 120 },
    { ingredientKey: "ingredient.milk", grams: 200 },
    { ingredientKey: "ingredient.almonds", grams: 20 }
  ],
  steps: [
    { stepKey: "step.cookRice" },
    { stepKey: "step.addMilkAndSimmer" },
    { stepKey: "step.serveWarm" }
  ],
  nameKey: "meal.rice_pudding_almond_99.name",
  descriptionKey: "meal.rice_pudding_almond_99.description"
},

{
  id: "apple_cinnamon_oat_bars_100",
  type: "snack",
  tags: ["meal-prep", "fiber-rich"],
  image: "/images/meals/apple_cinnamon_oat_bars_100.jpg",
  baseCalories: 300,
  protein: 12,
  carbs: 42,
  fat: 10,
  servingKey: "meal.serving.snack",
  ingredients: [
    { ingredientKey: "ingredient.oats", grams: 80 },
    { ingredientKey: "ingredient.apple", grams: 140 },
    { ingredientKey: "ingredient.cinnamon", grams: 2 }
  ],
  steps: [
    { stepKey: "step.prepareBatter" },
    { stepKey: "step.bakeUntilSet" },
    { stepKey: "step.sliceAndServe" }
  ],
  nameKey: "meal.apple_cinnamon_oat_bars_100.name",
  descriptionKey: "meal.apple_cinnamon_oat_bars_100.description"
}

];
