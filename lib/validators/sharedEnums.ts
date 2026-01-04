import { z } from "zod";

/* ================================
   ALLERGENS
================================ */

export const allergenEnum = z.enum([
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
]);

/* ================================
   DISLIKED PRODUCTS
================================ */

export const dislikedProductEnum = z.enum([
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
]);
