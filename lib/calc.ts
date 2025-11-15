// lib/calc.ts

/* --------------------------------------------
   Types
-------------------------------------------- */
export type Sex = "male" | "female";

export type Activity = "sedentary" | "light" | "moderate" | "very" | "athlete";

export type Goal = "lose" | "maintain" | "gain";

export interface CalcInput {
  sex: Sex;
  age: number;         // years
  heightCm: number;    // centimeters
  weightKg: number;    // kilograms
  activity: Activity;
  goal: Goal;
}

export interface CalcResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
}

/* --------------------------------------------
   Activity factors
-------------------------------------------- */
const ACTIVITY_FACTORS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  athlete: 1.9,
};

/* --------------------------------------------
   BMR (Mifflin-St Jeor)
-------------------------------------------- */
export function mifflinStJeorBMR(input: CalcInput): number {
  const { sex, age, heightCm, weightKg } = input;

  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const result = sex === "male" ? base + 5 : base - 161;

  return Math.round(result);
}

/* --------------------------------------------
   TDEE
-------------------------------------------- */
export function tdeeFromBmr(bmr: number, activity: Activity): number {
  return Math.round(bmr * ACTIVITY_FACTORS[activity]);
}

/* --------------------------------------------
   Goal Calories
-------------------------------------------- */
export function goalCalories(tdee: number, goal: Goal): number {
  const adjustment =
    goal === "lose" ? -0.15 :
    goal === "gain" ?  0.10 :
    0;

  return Math.round(tdee * (1 + adjustment));
}

/* --------------------------------------------
   Macros based on target calories
-------------------------------------------- */
export function macrosForCalories(
  calories: number,
  weightKg: number,
  goal: Goal
) {
  // Protein per kg based on goal
  const proteinPerKg = goal === "lose" ? 2.2 : 2.0;
  const proteinG = Math.round(proteinPerKg * weightKg);

  const proteinCal = proteinG * 4;

  // Fat: 25% of calories
  const fatCal = Math.round(calories * 0.25);
  const fatG = Math.round(fatCal / 9);

  // Carbs = leftover calories
  const carbCal = Math.max(0, calories - proteinCal - fatCal);
  const carbsG = Math.round(carbCal / 4);

  return {
    proteinG,
    fatG,
    carbsG,
  };
}

/* --------------------------------------------
   FULL CALCULATION ENTRYPOINT
-------------------------------------------- */
export function calculateAll(input: CalcInput): CalcResult {
  const bmr = mifflinStJeorBMR(input);

  const tdee = tdeeFromBmr(bmr, input.activity);

  const targetCalories = goalCalories(tdee, input.goal);

  const { proteinG, fatG, carbsG } = macrosForCalories(
    targetCalories,
    input.weightKg,
    input.goal
  );

  return {
    bmr,
    tdee,
    targetCalories,
    proteinG,
    fatG,
    carbsG,
  };
}

/* --------------------------------------------
   Helpers
-------------------------------------------- */
export const kgFromLbs = (lbs: number) => lbs * 0.45359237;
export const cmFromInches = (inch: number) => inch * 2.54;
