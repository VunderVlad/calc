// lib/calc.ts
export type Sex = 'male' | 'female';
export type Activity = 'sedentary' | 'light' | 'moderate' | 'very' | 'athlete';
export type Goal = 'lose' | 'maintain' | 'gain';
export interface CalcInput {
sex: Sex;
age: number; // years
heightCm: number; // cm
weightKg: number; // kg
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
const ACTIVITY_FACTORS: Record<Activity, number> = {
sedentary: 1.2,
light: 1.375,
moderate: 1.55,
very: 1.725,
athlete: 1.9,
};
export function mifflinStJeorBMR({ sex, age, heightCm, weightKg }: CalcInput):
number {
const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
return Math.round(sex === 'male' ? base + 5 : base - 161);
}
export function tdeeFromBmr(bmr: number, activity: Activity): number {
return Math.round(bmr * ACTIVITY_FACTORS[activity]);
}
export function goalCalories(tdee: number, goal: Goal): number {
const adj = goal === 'lose' ? -0.15 : goal === 'gain' ? 0.10 : 0;
return Math.round(tdee * (1 + adj));
}
export function macrosForCalories(calories: number, weightKg: number, goal:
Goal) {
const proteinPerKg = goal === 'lose' ? 2.2 : 2.0;
const proteinG = Math.round(proteinPerKg * weightKg);
const proteinCal = proteinG * 4;
const fatCal = Math.round(calories * 0.25); // 25% of calories
const fatG = Math.round(fatCal / 9);
const carbCal = Math.max(0, calories - proteinCal - fatCal);
const carbsG = Math.round(carbCal / 4);
return { proteinG, fatG, carbsG };
}
export function calculateAll(input: CalcInput): CalcResult {
const bmr = mifflinStJeorBMR(input);
const tdee = tdeeFromBmr(bmr, input.activity);
const targetCalories = goalCalories(tdee, input.goal);
const { proteinG, fatG, carbsG } = macrosForCalories(targetCalories,
input.weightKg, input.goal);
return { bmr, tdee, targetCalories, proteinG, fatG, carbsG };
}
export const kgFromLbs = (lbs: number) => lbs * 0.45359237;
export const cmFromInches = (inch: number) => inch * 2.54;
