import { Goal, Gender, WeightUnit } from "../types";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateName = (name: string): ValidationResult => {
  const trimmed = name.trim();

  if (!trimmed) {
    return { isValid: false, error: "Name is required" };
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters" };
  }

  if (trimmed.length > 50) {
    return { isValid: false, error: "Name must be less than 50 characters" };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: "Name contains invalid characters" };
  }

  return { isValid: true };
};

export const validateWeight = (
  weight: string,
  unit: WeightUnit
): ValidationResult => {
  const numValue = parseFloat(weight);

  if (!weight || isNaN(numValue)) {
    return { isValid: false, error: "Weight is required" };
  }

  const minWeight = unit === "kg" ? 30 : 66; // 30kg = ~66lbs
  const maxWeight = unit === "kg" ? 300 : 661; // 300kg = ~661lbs

  if (numValue < minWeight) {
    return {
      isValid: false,
      error: `Weight must be at least ${minWeight} ${unit}`,
    };
  }

  if (numValue > maxWeight) {
    return {
      isValid: false,
      error: `Weight must be less than ${maxWeight} ${unit}`,
    };
  }

  return { isValid: true };
};

export const validateHeight = (height: string): ValidationResult => {
  const numValue = parseFloat(height);

  if (!height || isNaN(numValue)) {
    return { isValid: false, error: "Height is required" };
  }

  if (numValue < 100) {
    return { isValid: false, error: "Height must be at least 100 cm" };
  }

  if (numValue > 250) {
    return { isValid: false, error: "Height must be less than 250 cm" };
  }

  return { isValid: true };
};

export const validateAge = (age: string): ValidationResult => {
  const numValue = parseInt(age);

  if (!age || isNaN(numValue)) {
    return { isValid: false, error: "Age is required" };
  }

  if (numValue < 13) {
    return { isValid: false, error: "Age must be at least 13 years" };
  }

  if (numValue > 120) {
    return { isValid: false, error: "Age must be less than 120 years" };
  }

  return { isValid: true };
};

export const validateGender = (gender: string): ValidationResult => {
  const validGenders: Gender[] = ["male", "female"];

  if (!validGenders.includes(gender as Gender)) {
    return { isValid: false, error: "Please select a valid gender" };
  }

  return { isValid: true };
};

export const validateGoal = (goal: string): ValidationResult => {
  const validGoals: Goal[] = ["maintain", "build", "maximize"];

  if (!validGoals.includes(goal as Goal)) {
    return { isValid: false, error: "Please select a valid goal" };
  }

  return { isValid: true };
};

export const validateWeightUnit = (unit: string): ValidationResult => {
  const validUnits: WeightUnit[] = ["kg", "lb"];

  if (!validUnits.includes(unit as WeightUnit)) {
    return { isValid: false, error: "Please select a valid weight unit" };
  }

  return { isValid: true };
};
