import { z } from "zod";

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
/* ================================
   USER SCHEMA (matches UserForm)
================================ */

export const userSchema = z.object({
  /* -------- basic info -------- */
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),

  /* -------- body data -------- */
  age: z.number().min(10).max(100),
  gender: z.enum(["male", "female"]),
  heightCm: z.number().min(120).max(230),
  weightKg: z.number().min(35).max(250),

  /* -------- lifestyle -------- */
  activity: z.enum(["sedentary", "light", "moderate", "high"]),
  goal: z.enum(["lose", "maintain", "gain"]),

  /* -------- preferences -------- */
  allergens: z.array(allergenEnum).default([]),
  dislikes: z.array(dislikedProductEnum).default([]),

  /* -------- i18n -------- */
  language: z.enum(["en", "ru", "uk", "sk"]),
});

export type UserInput = z.infer<typeof userSchema>;
export type Allergen = z.infer<typeof allergenEnum>;
export type DislikedProduct = z.infer<typeof dislikedProductEnum>;

