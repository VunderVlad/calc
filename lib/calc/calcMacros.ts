export type Gender = "male" | "female";
export type Goal = "lose" | "maintain" | "gain";

export type AutoMacroResult = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export function calcMacros(params: {
  age?: number;
  gender?: Gender;
  heightCm?: number;
  weightKg?: number;
  activity?: string;
  goal?: Goal;
}): AutoMacroResult {
  const { age = 30, gender = "female", heightCm = 165, weightKg = 65 } = params;

  const activity = params.activity ?? "moderate";
  const goal = params.goal ?? "maintain";

  const s = gender === "male" ? 5 : -161;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + s;

  const activityFactor =
    activity === "sedentary"
      ? 1.2
      : activity === "light"
      ? 1.375
      : activity === "moderate"
      ? 1.55
      : 1.725;

  let calories = bmr * activityFactor;

  if (goal === "lose") calories *= 0.8;
  if (goal === "gain") calories *= 1.1;

  const roundedCalories = Math.round(calories);

  const protein = Math.round((roundedCalories * 0.3) / 4);
  const carbs = Math.round((roundedCalories * 0.4) / 4);
  const fat = Math.round((roundedCalories * 0.3) / 9);

  return {
    calories: roundedCalories,
    protein,
    carbs,
    fat,
  };
}
