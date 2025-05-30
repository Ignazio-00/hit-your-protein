export type Goal = "maintain" | "build" | "maximize";

export type Gender = "male" | "female";

export type WeightUnit = "kg" | "lb";

export interface UserProfile {
  name: string;
  weight: number;
  weightUnit: WeightUnit;
  height: number; // in cm
  age: number;
  gender: Gender;
  goal: Goal;
}

export interface ProteinFactors {
  [key: string]: number; // grams per pound of bodyweight
}

export interface AppState {
  userProfile: UserProfile | null;
  isOnboarding: boolean;
}
