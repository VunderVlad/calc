// app/api/calc/route.ts
import * as React from "react";
import { NextResponse } from "next/server";


import { calculateAll, type CalcInput } from "@/lib/calc";
import { buildWeekPlan } from "@/lib/meal";
import PlanEmail from "@/emails/PlanEmail";
import { Resend } from "resend";

// Import THE REAL schema (only this one!)
import {
  payloadSchema,
  type StudentPayload,
  type TrainerPayload,
} from "./schema";

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
   Types
------------------------------------------------------- */
type MealIngredient = { name?: string; amount?: number };
type Meal = { ingredients?: MealIngredient[] };
type Day = { meals?: Meal[] };

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
function buildGroceryFromWeek(week: Day[]): string[] {
  const acc = new Map<string, number>();

  for (const day of week ?? []) {
    const meals = day?.meals ?? [];
    for (const meal of meals) {
      for (const ing of meal.ingredients ?? []) {
        if (!ing?.name || !ing?.amount) continue;
        acc.set(ing.name, (acc.get(ing.name) ?? 0) + ing.amount);
      }
    }
  }

  return [...acc.entries()].map(
    ([name, amount]) => `${name} — ${Math.round(amount)} g`
  );
}

/* -------------------------------------------------------
   POST handler
------------------------------------------------------- */
export async function POST(req: Request) {
  try {
    const raw = await req.json();

    const parsed = payloadSchema.safeParse(raw);
    if (!parsed.success) {
      console.error("❌ Validation failed:", parsed.error.flatten());
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
    let calc: CalcOut | null = null;

    /* ---------- Student ---------- */
    if (body.mode === "student") {
      const s = body as StudentPayload;

      const calcInput: CalcInput = {
        sex: s.sex,
        age: s.age,
        heightCm: s.heightCm,
        weightKg: s.weightKg,
        activity: s.activity,
        goal: s.goal,
      };

      calc = calculateAll(calcInput);
    }

    /* ---------- Trainer ---------- */
    else {
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

    if (!calc) {
      throw new Error("Failed to calculate plan");
    }

    /* ---------- Meal plan ---------- */
    const dietTags =
      body.dietType && body.dietType !== "none"
        ? [body.dietType]
        : undefined;

    const weekPlan = buildWeekPlan({
      targetCalories: calc.targetCalories,
      mealsPerDay: body.mealsPerDay,
      timeToCook: body.timeToCook ?? 30,
      favorites: body.favoriteIngredients,
      dietTags,
      exclusions: [...body.exclusions, ...body.allergens, ...body.dislikes],
    });

    let grocery: string[] = [];

    if (Array.isArray(weekPlan)) {
      grocery = buildGroceryFromWeek(weekPlan as Day[]);
    }

    /* ---------- Optional Email ---------- */
    let emailId: string | null = null;

    if (
      SEND_EMAIL &&
      resend &&
      body.email &&
      body.consent &&
      process.env.FROM_EMAIL
    ) {
      const subject =
        body.lang === "sk"
          ? "Váš týždenný plán DonetsFit 💪"
          : body.lang === "ua"
          ? "Ваш тижневий план DonetsFit 💪"
          : "Your DonetsFit Weekly Plan 💪";

      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: body.email,
        subject,
        react: React.createElement(PlanEmail, {
          calc,
          weekPlan,
          grocery,
          lang: body.lang,
        }),
      });

      if (error) console.error(error);
      emailId = data?.id ?? null;
    }

    return NextResponse.json({
      ok: true,
      mode: body.mode,
      calc,
      weekPlan,
      grocery,
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
