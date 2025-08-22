// app/api/calc/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import PlanEmail from "@/emails/PlanEmail";
import { calculateAll, CalcInput } from "@/lib/calc";
import { buildWeekPlan, buildGroceryList } from "@/lib/meal";
import { buildTrainingPlan } from "@/lib/training";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.FROM_EMAIL || "coach@example.com";
const SEND_EMAIL = String(process.env.SEND_EMAIL ?? "true").toLowerCase() === "true";

type DietType = "none" | "vegetarian" | "vegan" | "keto";
type Activity = "sedentary" | "light" | "moderate" | "very" | "athlete";
type Goal = "lose" | "maintain" | "gain";
type Equipment = "home" | "gym" | "calisthenics";

interface RequestBody {
  // required
  sex: CalcInput["sex"];
  age: number;
  heightCm: number;
  weightKg: number;
  activity: Activity;
  goal: Goal;
  // nutrition
  mealsPerDay?: number;
  dietType?: DietType;
  exclusions?: string;
  timeToCook?: number;
  cuisineLikes?: string;
  // training
  daysPerWeek?: number;
  equipment?: Equipment;
  preferredActivities?: string[] | string;
  // delivery
  name?: string;
  email?: string;
  consent?: boolean;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<RequestBody>;

    // Required base fields
    const required: (keyof RequestBody)[] = [
      "sex",
      "age",
      "heightCm",
      "weightKg",
      "activity",
      "goal",
    ];
    for (const key of required) {
      const v = body[key];
      if (v === undefined || v === null || v === "") {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 });
      }
    }

    const input: CalcInput = {
      sex: body.sex as CalcInput["sex"],
      age: Number(body.age),
      heightCm: Number(body.heightCm),
      weightKg: Number(body.weightKg),
      activity: body.activity as Activity,
      goal: body.goal as Goal,
    };

    const result = calculateAll(input);

    // Nutrition preferences
    const mealsPerDay = Math.min(Math.max(Number(body.mealsPerDay ?? 3), 3), 5);
    const dietType = (body.dietType ?? "none") as DietType;
    const exclusions = String(body.exclusions ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const timeToCook = Number(body.timeToCook ?? 20); // minutes
    const cuisineLikes = String(body.cuisineLikes ?? "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    // Training preferences
    const daysPerWeek = Math.min(Math.max(Number(body.daysPerWeek ?? 4), 2), 6);
    const equipment = (body.equipment ?? "home") as Equipment;
    const preferredActivities: string[] = Array.isArray(body.preferredActivities)
      ? body.preferredActivities
      : String(body.preferredActivities ?? "")
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);

    // Build plans
    const weekPlan = buildWeekPlan({
      targetCalories: result.targetCalories,
      mealsPerDay,
      dietType,
      exclusions,
      timeToCook,
      cuisineLikes,
    });
    const grocery = buildGroceryList(weekPlan);
    const training = buildTrainingPlan({ daysPerWeek, equipment, preferredActivities });

    // Email (capture errors instead of throwing)
    let emailId: string | undefined;
    let emailError: string | undefined;

    if (SEND_EMAIL && typeof body.email === "string" && body.email && body.consent === true) {
      try {
        const { data, error } = await resend.emails.send({
          from: FROM, // e.g. coach@donetsfit.com
          to: body.email,
          subject: "Your DonetsFit Weekly Plan",
          react: PlanEmail({
            name: body.name || "athlete",
            ...input,
            ...result,
            weekPlan,
            grocery,
            training,
          }),
        });
        if (error) {
          emailError = (error as { message?: string }).message ?? String(error);
        } else {
          emailId = data?.id;
        }
      } catch (err) {
        emailError = err instanceof Error ? err.message : String(err);
      }
    }

    return NextResponse.json({
      ok: true,
      result,
      weekPlan,
      grocery,
      training,
      emailed: Boolean(emailId),
      emailId,
      ...(emailError ? { emailError } : {}),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
