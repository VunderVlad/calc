import * as React from "react";
import { NextResponse } from "next/server";
import { z } from "zod";

import { calculateAll as computeAll } from "@/lib/calc";
import { buildWeekPlan } from "@/lib/meal";
import PlanEmail from "@/emails/PlanEmail";
import { Resend } from "resend";

/* -------------------------------------------------------
   Email setup
------------------------------------------------------- */
const resend =
  process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.length > 0
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const SEND_EMAIL =
  (process.env.SEND_EMAIL ?? "false").toLowerCase() === "true";

/* -------------------------------------------------------
   Validation Schemas
------------------------------------------------------- */
import { type ZodObject, type ZodRawShape } from "zod";

// Explicitly typed base schema (no yellow or red)
const baseDiet = z.object({
  mealsPerDay: z.number().int().min(3).max(5),
  timeToCook: z.number().int().min(10).max(90),
  dietType: z.enum(["none", "vegetarian", "vegan", "keto"]).default("none"),
  exclusions: z.array(z.string()).default([]),
  cuisineLikes: z.array(z.string()).default([]),
  favoriteIngredients: z.array(z.string()).default([]),
  name: z.string().optional(),
  email: z.string().email().optional(),
  consent: z.boolean().default(false),
  lang: z.enum(["en", "sk", "ua"]).default("en"),
}) satisfies ZodObject<ZodRawShape>;

// ✅ Use `.extend()` instead of `.merge()` — cleaner, fully typed
const studentPayload = baseDiet.extend({
  mode: z.literal("student"),
  sex: z.enum(["male", "female"]),
  age: z.number().int().min(12).max(100),
  heightCm: z.number().min(120).max(230),
  weightKg: z.number().min(35).max(300),
  activity: z.enum(["sedentary", "light", "moderate", "very", "athlete"]),
  goal: z.enum(["lose", "maintain", "gain"]),
});

const trainerPayload = baseDiet.extend({
  mode: z.literal("trainer"),
  targetCalories: z.number().min(1200).max(5000),
  proteinG: z.number().min(0).max(400).optional(),
  fatG: z.number().min(0).max(200).optional(),
  proteinPerKg: z.number().min(0).max(3).optional(),
  fatPerKg: z.number().min(0).max(1.5).optional(),
  weightKg: z.number().min(35).max(300).optional(),
});

// ✅ Discriminated union across both
export const payloadSchema = z.discriminatedUnion("mode", [
  studentPayload,
  trainerPayload,
]);

// ✅ Strong, automatically inferred types
export type Payload = z.infer<typeof payloadSchema>;
export type StudentPayload = z.infer<typeof studentPayload>;
export type TrainerPayload = z.infer<typeof trainerPayload>;


/* -------------------------------------------------------
   Types
------------------------------------------------------- */
interface CalcOut {
  bmr: number | null;
  tdee: number | null;
  targetCalories: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
}

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */
function buildGroceryFromWeek(week: unknown[]): string[] {
  const acc = new Map<string, number>();
  for (const day of week ?? []) {
    if (
      typeof day === "object" &&
      day !== null &&
      "meals" in (day as Record<string, unknown>)
    ) {
      const meals = (day as Record<string, unknown>)["meals"] as
        | { ingredients?: { name?: string; amount?: number }[] }[]
        | undefined;
      for (const meal of meals ?? []) {
        for (const ing of meal.ingredients ?? []) {
          if (!ing?.name || !ing?.amount) continue;
          acc.set(ing.name, (acc.get(ing.name) ?? 0) + ing.amount);
        }
      }
    }
  }
  return Array.from(acc.entries()).map(
    ([name, amount]) => `${name} — ${Math.round(amount)} g`
  );
}

/* -------------------------------------------------------
   POST handler
------------------------------------------------------- */
export async function POST(req: Request) {
  try {
    const raw = await req.json();

    if (!raw || typeof raw !== "object") {
      return NextResponse.json(
        { ok: false, message: "Invalid or empty request body." },
        { status: 400 }
      );
    }

    const parsed = payloadSchema.safeParse(raw);
    if (!parsed.success) {
      console.error("❌ Validation failed:", parsed.error.format());
      return NextResponse.json(
        {
          ok: false,
          message: "Please fill in all required fields before generating.",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const body = parsed.data;
    let calc: CalcOut;

    /* ---------- Student ---------- */
    if (body.mode === "student") {
      const s = body as StudentPayload;
      calc = computeAll({
        sex: s.sex,
        age: s.age,
        heightCm: s.heightCm,
        weightKg: s.weightKg,
        activity: s.activity,
        goal: s.goal,
      });
    } else {
      /* ---------- Trainer ---------- */
      const t = body as TrainerPayload;
      const target = t.targetCalories;

      let proteinG = t.proteinG ?? null;
      let fatG = t.fatG ?? null;

      if (
        (proteinG == null || fatG == null) &&
        t.proteinPerKg != null &&
        t.fatPerKg != null &&
        t.weightKg != null
      ) {
        proteinG = Math.round(t.proteinPerKg * t.weightKg);
        fatG = Math.round(t.fatPerKg * t.weightKg);
      }

      if (proteinG == null || fatG == null) {
        const w = t.weightKg ?? 75;
        proteinG = Math.round(1.8 * w);
        fatG = Math.round(0.8 * w);
      }

      const carbsG = Math.max(
        0,
        Math.round((target - (proteinG * 4 + fatG * 9)) / 4)
      );

      calc = {
        bmr: null,
        tdee: null,
        targetCalories: target,
        proteinG,
        fatG,
        carbsG,
      };
    }

    /* ---------- Meal plan & grocery ---------- *//* ---------- Meal plan & grocery ---------- */
      const favorites: string[] = Array.isArray(body.favoriteIngredients)
        ? body.favoriteIngredients
        : [];

      const dietTags =
        body.dietType && body.dietType !== "none" ? [body.dietType] : undefined;

      const exclusions: string[] = Array.isArray(body.exclusions)
        ? body.exclusions
        : [];

      const cuisineLikes: string[] = Array.isArray(body.cuisineLikes)
        ? body.cuisineLikes
        : [];

      const weekPlan = buildWeekPlan({
        targetCalories: calc.targetCalories,
        mealsPerDay: body.mealsPerDay,
        timeToCook: body.timeToCook,
        favorites,
        dietTags,
        exclusions,
        cuisineLikes,
      });

      // Safe grocery extraction
      let grocery: string[] = [];

      if (
        weekPlan &&
        typeof weekPlan === "object" &&
        "grocery" in weekPlan
      ) {
        const maybeGrocery = (weekPlan as { grocery?: unknown }).grocery;
        if (Array.isArray(maybeGrocery) && maybeGrocery.every((x) => typeof x === "string")) {
          grocery = maybeGrocery;
        }
      } else if (Array.isArray(weekPlan)) {
        grocery = buildGroceryFromWeek(weekPlan);
      } else {
        grocery = [];
      }


    /* ---------- Optional email ---------- */
    let emailId: string | null = null;

    if (
      SEND_EMAIL &&
      resend &&
      body.email &&
      body.consent &&
      process.env.FROM_EMAIL
    ) {
      try {
        const { data, error } = await resend.emails.send({
          from: process.env.FROM_EMAIL!,
          to: body.email,
          subject:
            body.lang === "sk"
              ? "Váš týždenný plán DonetsFit 💪"
              : body.lang === "ua"
              ? "Ваш тижневий план DonetsFit 💪"
              : "Your DonetsFit Weekly Plan 💪",
          react: React.createElement(PlanEmail, {
            calc,
            weekPlan,
            grocery: grocery ?? [],
            lang: body.lang,
          }),
        });
        if (error) console.error("Email send failed:", error);
        emailId = data?.id ?? null;
      } catch (err) {
        console.error("Email send failed:", err);
      }
    }

    /* ---------- Response ---------- */
    return NextResponse.json({
      ok: true,
      mode: body.mode,
      calc,
      weekPlan,
      grocery,
      training: null,
      emailId,
    });
  } catch (err) {
    console.error("Calc API error:", err);
    return NextResponse.json(
      { ok: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
