import React, { useState } from "react";
import { UserProfile, Goal, Gender, WeightUnit } from "../types";
import { saveUserProfile } from "../utils/storage";
import { getGoalDetails } from "../utils/proteinCalculator";
import {
  validateName,
  validateWeight,
  validateHeight,
  validateAge,
  validateGender,
  validateGoal,
  validateWeightUnit,
} from "../utils/validation";

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

interface FormErrors {
  name?: string;
  weight?: string;
  height?: string;
  age?: string;
  gender?: string;
  goal?: string;
  weightUnit?: string;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    weightUnit: "lb" as WeightUnit,
    height: "",
    age: "",
    gender: "male" as Gender,
    goal: "build" as Goal,
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: FormErrors = {};

    switch (stepNumber) {
      case 1:
        const nameValidation = validateName(formData.name);
        if (!nameValidation.isValid) {
          newErrors.name = nameValidation.error;
        }
        break;

      case 2:
        const weightValidation = validateWeight(
          formData.weight,
          formData.weightUnit
        );
        const heightValidation = validateHeight(formData.height);
        const ageValidation = validateAge(formData.age);
        const genderValidation = validateGender(formData.gender);
        const unitValidation = validateWeightUnit(formData.weightUnit);

        if (!weightValidation.isValid)
          newErrors.weight = weightValidation.error;
        if (!heightValidation.isValid)
          newErrors.height = heightValidation.error;
        if (!ageValidation.isValid) newErrors.age = ageValidation.error;
        if (!genderValidation.isValid)
          newErrors.gender = genderValidation.error;
        if (!unitValidation.isValid)
          newErrors.weightUnit = unitValidation.error;
        break;

      case 3:
        const goalValidation = validateGoal(formData.goal);
        if (!goalValidation.isValid) {
          newErrors.goal = goalValidation.error;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      const profile: UserProfile = {
        name: formData.name.trim(),
        weight: parseFloat(formData.weight),
        weightUnit: formData.weightUnit,
        height: parseFloat(formData.height),
        age: parseInt(formData.age),
        gender: formData.gender,
        goal: formData.goal,
      };

      await saveUserProfile(profile);
      onComplete(profile);
    } catch (error) {
      console.error("Failed to save profile:", error);
      setErrors({ name: "Failed to save your profile. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return validateName(formData.name).isValid;
      case 2:
        return (
          validateWeight(formData.weight, formData.weightUnit).isValid &&
          validateHeight(formData.height).isValid &&
          validateAge(formData.age).isValid &&
          validateGender(formData.gender).isValid &&
          validateWeightUnit(formData.weightUnit).isValid
        );
      case 3:
        return validateGoal(formData.goal).isValid;
      default:
        return false;
    }
  };

  const renderError = (field: keyof FormErrors) => {
    if (errors[field]) {
      return (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {errors[field]}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4">
            <span
              className="text-white text-2xl"
              role="img"
              aria-label="protein"
            >
              💪
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Hit Your Protein</h1>
          <p className="text-gray-600 mt-2">
            Calculate your daily protein needs
          </p>
        </div>

        {/* Progress indicators */}
        <div
          className="flex justify-center space-x-4 mb-8"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step}
        >
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                num === step
                  ? "bg-primary-500 text-white"
                  : num < step
                  ? "bg-primary-100 text-primary-600"
                  : "bg-gray-100 text-gray-400"
              }`}
              aria-label={`Step ${num} ${
                num === step ? "current" : num < step ? "completed" : "upcoming"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              What's your name?
            </h2>
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className={`input-field ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                maxLength={50}
                autoFocus
              />
              {renderError("name")}
            </div>
          </div>
        )}

        {/* Step 2: Physical Stats */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Tell us about yourself
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="flex space-x-4">
                {[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      value={option.value}
                      checked={formData.gender === option.value}
                      onChange={(e) => updateField("gender", e.target.value)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      aria-describedby={
                        errors.gender ? "gender-error" : undefined
                      }
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              {renderError("gender")}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="180"
                  value={formData.weight}
                  onChange={(e) => updateField("weight", e.target.value)}
                  className={`input-field flex-1 ${
                    errors.weight
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  min="1"
                  step="0.1"
                  aria-invalid={!!errors.weight}
                  aria-describedby={errors.weight ? "weight-error" : undefined}
                />
                <select
                  value={formData.weightUnit}
                  onChange={(e) => updateField("weightUnit", e.target.value)}
                  className={`input-field w-20 ${
                    errors.weightUnit
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  aria-invalid={!!errors.weightUnit}
                >
                  <option value="lb">lb</option>
                  <option value="kg">kg</option>
                </select>
              </div>
              {renderError("weight")}
              {renderError("weightUnit")}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                placeholder="175"
                value={formData.height}
                onChange={(e) => updateField("height", e.target.value)}
                className={`input-field ${
                  errors.height
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
                min="100"
                max="250"
                aria-invalid={!!errors.height}
                aria-describedby={errors.height ? "height-error" : undefined}
              />
              {renderError("height")}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) => updateField("age", e.target.value)}
                className={`input-field ${
                  errors.age
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
                min="13"
                max="120"
                aria-invalid={!!errors.age}
                aria-describedby={errors.age ? "age-error" : undefined}
              />
              {renderError("age")}
            </div>
          </div>
        )}

        {/* Step 3: Goals */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              What's your goal?
            </h2>

            <div className="space-y-3">
              {["maintain", "build", "maximize"].map((goal) => {
                const goalDetails = getGoalDetails(goal as Goal);
                return (
                  <label
                    key={goal}
                    className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={goal}
                      checked={formData.goal === goal}
                      onChange={(e) => updateField("goal", e.target.value)}
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      aria-describedby={errors.goal ? "goal-error" : undefined}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {goalDetails.description}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {goalDetails.factor}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {goalDetails.example}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            {renderError("goal")}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Back
            </button>
          )}

          <div className="flex-1"></div>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting && (
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              )}
              <span>
                {isSubmitting ? "Saving..." : "Calculate My Protein Needs"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
