import React, { useState } from "react";
import { UserProfile, Goal, Gender, WeightUnit } from "../types";
import { saveUserProfile } from "../utils/storage";
import { generateId } from "../utils/dateUtils";
import { getGoalDetails } from "../utils/proteinCalculator";

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
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
  };

  const handleSubmit = () => {
    const profile: UserProfile = {
      id: generateId(),
      name: formData.name,
      weight: parseFloat(formData.weight),
      weightUnit: formData.weightUnit,
      height: parseFloat(formData.height),
      age: parseInt(formData.age),
      gender: formData.gender,
      activityLevel: "moderate", // Default value, not used in calculation
      goal: formData.goal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveUserProfile(profile);
    onComplete(profile);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return (
          formData.weight &&
          formData.height &&
          formData.age &&
          parseFloat(formData.weight) > 0 &&
          parseFloat(formData.height) > 0 &&
          parseInt(formData.age) > 0
        );
      case 3:
        return true; // Goal always has a default
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4">
            <span className="text-white text-2xl">💪</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Hit Your Protein</h1>
          <p className="text-gray-600 mt-2">
            Calculate your daily protein needs
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-4 mb-8">
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
            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="input-field"
              autoFocus
            />
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
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
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
                  className="input-field flex-1"
                  min="1"
                  step="0.1"
                />
                <select
                  value={formData.weightUnit}
                  onChange={(e) => updateField("weightUnit", e.target.value)}
                  className="input-field w-20"
                >
                  <option value="lb">lb</option>
                  <option value="kg">kg</option>
                </select>
              </div>
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
                className="input-field"
                min="1"
              />
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
                className="input-field"
                min="1"
                max="120"
              />
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
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="btn-secondary">
              Back
            </button>
          )}

          <div className="flex-1"></div>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!isStepValid()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate My Protein Needs
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
