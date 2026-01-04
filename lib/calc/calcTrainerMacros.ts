export type TrainerMacrosInput = {
  manualCalories?: number;
  manualProtein?: number;
  manualCarbs?: number;
  manualFat?: number;
  weightKg?: number;
};

export type TrainerMacroResult = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export function calcTrainerMacros(
  input: TrainerMacrosInput
): TrainerMacroResult {
  const calories = input.manualCalories ?? 2200;
  const protein =
    input.manualProtein ?? (input.weightKg ? Math.round(input.weightKg * 2) : 150);
  const carbs = input.manualCarbs ?? Math.round((calories * 0.4) / 4);
  const fat =
    input.manualFat ??
    Math.round((calories - protein * 4 - carbs * 4) / 9);

  return { calories, protein, carbs, fat };
}
