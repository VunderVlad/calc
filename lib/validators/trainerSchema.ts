// lib/validators/trainerSchema.ts
import { z } from "zod";
import { allergenEnum, dislikedProductEnum } from "./userSchema";

export const languageEnum = z.enum(["en", "ru", "uk", "sk"]);

export const trainerSchema = z.object({
  /* -------- client info -------- */
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),

  /* -------- manual macros -------- */
  manualCalories: z.number().positive(),
  manualProtein: z.number().positive(),
  manualCarbs: z.number().positive(),
  manualFat: z.number().positive(),

  /* -------- optional context -------- */
  coachNotes: z.string().optional().default(""),

  /* -------- preferences -------- */
  allergens: z.array(allergenEnum).default([]),
  dislikes: z.array(dislikedProductEnum).default([]),

  /* -------- i18n -------- */
  language: z.enum(["en", "ru", "uk", "sk"]),

  /* -------- OPTIONAL --------
     used only if calcTrainerMacros needs it
  ---------------------------- */
  weightKg: z.number().positive().optional(),
});
