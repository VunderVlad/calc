// app/api/calc/schema.ts
import { z } from "zod";

/* ---------------- Base diet schema ---------------- */
export const baseDiet = z.object({
  mealsPerDay: z.number().int().min(3).max(5),
  timeToCook: z.number().int().min(10).max(90).default(30),
  dietType: z.enum(["none", "vegetarian", "vegan", "keto"]).default("none"),
  exclusions: z.array(z.string()).default([]),
  cuisineLikes: z.array(z.string()).default([]),
  favoriteIngredients: z.array(z.string()).default([]),
  allergens: z.array(z.string()).default([]),
  dislikes: z.array(z.string()).default([]),
  name: z.string().optional(),
  email: z.string().email().optional(),
  consent: z.boolean().default(false),
  lang: z.enum(["en", "sk", "ua"]).default("en"),
});

/* ---------------- Student payload ---------------- */
export const studentPayload = baseDiet.extend({
  mode: z.literal("student"),
  sex: z.enum(["male", "female"]),
  age: z.number().int().min(12).max(100),
  heightCm: z.number().min(120).max(230),
  weightKg: z.number().min(35).max(300),
  activity: z.enum(["sedentary", "light", "moderate", "very", "athlete"]),
  goal: z.enum(["lose", "maintain", "gain"]),
});

/* ---------------- Trainer payload ---------------- */
export const trainerPayload = baseDiet.extend({
  mode: z.literal("trainer"),
  targetCalories: z.number().min(1200).max(5000),
  proteinG: z.number().min(0).max(400).optional(),
  fatG: z.number().min(0).max(200).optional(),
  proteinPerKg: z.number().min(0).max(3).optional(),
  fatPerKg: z.number().min(0).max(1.5).optional(),
  weightKg: z.number().min(35).max(300).optional(),
});

/* ---------------- Discriminated union ---------------- */
export const payloadSchema = z.discriminatedUnion("mode", [
  studentPayload,
  trainerPayload,
]);

/* ---------------- Types (for use in route.ts) ---------------- */
export type Payload = z.infer<typeof payloadSchema>;
export type StudentPayload = z.infer<typeof studentPayload>;
export type TrainerPayload = z.infer<typeof trainerPayload>;
