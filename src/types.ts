export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "veryActive"
  | "athlete";

export type Goal = "maintain" | "build" | "maximize";

export type Gender = "male" | "female";

export type WeightUnit = "kg" | "lb";

export interface UserProfile {
  id: string;
  name: string;
  weight: number;
  weightUnit: WeightUnit;
  height: number; // in cm
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  goal: Goal;
  createdAt: string;
  updatedAt: string;
}

export interface ProteinFactors {
  [key: string]: number; // grams per pound of bodyweight
}

export interface FoodItem {
  id: string;
  name: string;
  proteinPer100g: number;
  calories?: number;
  category: string;
  commonServings?: {
    name: string;
    grams: number;
  }[];
}

export interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  amount: number; // in grams
  protein: number; // calculated protein content
  meal: "breakfast" | "lunch" | "dinner" | "snack";
  date: string; // ISO date string
  timestamp: string;
}

export interface DailyIntake {
  date: string;
  targetProtein: number;
  entries: FoodEntry[];
  totalProtein: number;
}

export interface WeeklyProgress {
  weekStart: string;
  dailyIntakes: DailyIntake[];
  averageDailyProtein: number;
  averageTargetHit: number; // percentage
}

export interface AppState {
  userProfile: UserProfile | null;
  isOnboarding: boolean;
}
