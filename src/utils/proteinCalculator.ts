import { Goal, ProteinFactors, WeightUnit } from "../types";

export const PROTEIN_FACTORS: ProteinFactors = {
  maintain: 0.8, // 0.8g per lb (Build or Maintain Muscle - Minimum)
  build: 1.0, // 1g per lb (Build Muscle - Recommended)
  maximize: 1.2, // 1.2g per lb (Maximize Growth & Performance - High)
};

/**
 * Convert weight between units
 */
export function convertWeight(
  weight: number,
  fromUnit: WeightUnit,
  toUnit: WeightUnit
): number {
  if (fromUnit === toUnit) return weight;

  if (fromUnit === "kg" && toUnit === "lb") {
    return weight * 2.20462; // kg to lb
  } else if (fromUnit === "lb" && toUnit === "kg") {
    return weight / 2.20462; // lb to kg
  }

  return weight;
}

/**
 * Calculate daily protein requirement in grams
 * @param weight - Body weight in the specified unit
 * @param weightUnit - The unit of the weight (kg or lb)
 * @param goal - User's fitness goal
 * @returns Daily protein requirement in grams
 */
export function calculateDailyProtein(
  weight: number,
  weightUnit: WeightUnit,
  goal: Goal
): number {
  // Convert weight to pounds if needed (our factors are based on pounds)
  const weightInPounds =
    weightUnit === "lb" ? weight : convertWeight(weight, "kg", "lb");

  const factor = PROTEIN_FACTORS[goal];
  return Math.round(weightInPounds * factor);
}

/**
 * Calculate protein distribution across meals
 * @param totalProtein - Total daily protein target
 * @returns Object with protein distribution for each meal
 */
export function calculateMealDistribution(totalProtein: number) {
  return {
    breakfast: Math.round(totalProtein * 0.25),
    lunch: Math.round(totalProtein * 0.3),
    dinner: Math.round(totalProtein * 0.35),
    snack: Math.round(totalProtein * 0.1),
  };
}

/**
 * Get goal description
 */
export function getGoalDescription(goal: Goal): string {
  const descriptions = {
    maintain: "Build or Maintain Muscle (Minimum)",
    build: "Build Muscle (Recommended)",
    maximize: "Maximize Growth & Performance (High)",
  };
  return descriptions[goal];
}

/**
 * Get goal details with example
 */
export function getGoalDetails(goal: Goal): {
  description: string;
  factor: string;
  example: string;
} {
  const factor = PROTEIN_FACTORS[goal];
  const exampleWeight = 180; // 180 lb person
  const exampleProtein = Math.round(exampleWeight * factor);

  return {
    description: getGoalDescription(goal),
    factor: `${factor}g per lb`,
    example: `${exampleProtein}g per day (for a ${exampleWeight}-pound person)`,
  };
}
