import React from "react";
import { UserProfile } from "../types";
import {
  calculateDailyProtein,
  calculateMealDistribution,
  getGoalDetails,
  convertWeight,
  PROTEIN_FACTORS,
} from "../utils/proteinCalculator";
import { Calculator, Target, Utensils, BookOpen } from "lucide-react";

interface ProteinCalculatorProps {
  userProfile: UserProfile;
}

const ProteinCalculator: React.FC<ProteinCalculatorProps> = ({
  userProfile,
}) => {
  const dailyProtein = calculateDailyProtein(
    userProfile.weight,
    userProfile.weightUnit,
    userProfile.goal
  );

  const mealDistribution = calculateMealDistribution(dailyProtein);
  const goalDetails = getGoalDetails(userProfile.goal);

  // Convert weight to both units for display
  const weightInLb =
    userProfile.weightUnit === "lb"
      ? userProfile.weight
      : convertWeight(userProfile.weight, "kg", "lb");

  const weightInKg =
    userProfile.weightUnit === "kg"
      ? userProfile.weight
      : convertWeight(userProfile.weight, "lb", "kg");

  const proteinPerLb = (dailyProtein / weightInLb).toFixed(1);
  const proteinPerKg = (dailyProtein / weightInKg).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Main Result */}
      <div className="card text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Daily Protein Target
          </h1>
          <p className="text-gray-600">Based on scientific recommendations</p>
        </div>

        <div className="bg-primary-50 rounded-2xl p-8 mb-6">
          <div className="text-6xl font-bold text-primary-600 mb-4">
            {dailyProtein}g
          </div>
          <p className="text-xl text-gray-700 mb-2">of protein per day</p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              {proteinPerLb}g per pound ({proteinPerKg}g per kg) of body weight
            </p>
            <p className="font-medium text-primary-700">
              {goalDetails.description}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {userProfile.weight}
            </div>
            <div className="text-sm text-gray-600">
              {userProfile.weightUnit} body weight
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {PROTEIN_FACTORS[userProfile.goal]}g
            </div>
            <div className="text-sm text-gray-600">per lb factor</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {dailyProtein}g
            </div>
            <div className="text-sm text-gray-600">daily target</div>
          </div>
        </div>
      </div>

      {/* Calculation Breakdown */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            How We Calculate This
          </h2>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-blue-900 mb-3">
            Your Calculation:
          </h3>
          <div className="text-blue-800 space-y-2">
            <p className="text-lg">
              <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                {userProfile.weight} {userProfile.weightUnit}
              </span>
              {userProfile.weightUnit === "kg" && (
                <>
                  {" = "}
                  <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                    {weightInLb.toFixed(1)} lb
                  </span>
                </>
              )}
              {" × "}
              <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                {PROTEIN_FACTORS[userProfile.goal]}g
              </span>
              {" = "}
              <span className="font-mono bg-blue-200 px-2 py-1 rounded font-bold">
                {dailyProtein}g protein
              </span>
            </p>
            <p className="text-sm">
              Based on the {goalDetails.description.toLowerCase()}{" "}
              recommendation of {goalDetails.factor}
            </p>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Your Profile</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{userProfile.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">
                  {userProfile.weight} {userProfile.weightUnit}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Height:</span>
                <span className="font-medium">{userProfile.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium">{userProfile.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium capitalize">
                  {userProfile.gender}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Goal Details</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Goal:</span>
                <p className="font-medium">{goalDetails.description}</p>
              </div>
              <div>
                <span className="text-gray-600">Protein Factor:</span>
                <p className="font-medium">{goalDetails.factor}</p>
              </div>
              <div>
                <span className="text-gray-600">Example:</span>
                <p className="text-gray-500 text-xs">{goalDetails.example}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Distribution */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Utensils className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            Recommended Meal Distribution
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(mealDistribution).map(([meal, protein]) => (
            <div key={meal} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {protein}g
              </div>
              <div className="text-sm font-medium text-gray-600 capitalize">
                {meal}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round((protein / dailyProtein) * 100)}% of daily
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-2">💡 Pro Tips</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>
              • Spread protein intake throughout the day for optimal absorption
            </li>
            <li>• Include protein in every meal and snack</li>
            <li>• Combine complete and incomplete protein sources</li>
            <li>
              • Consider post-workout protein within 30-60 minutes of exercise
            </li>
          </ul>
        </div>
      </div>

      {/* All Goal Options */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Compare All Goals</h2>
        </div>

        <div className="space-y-4">
          {(["maintain", "build", "maximize"] as const).map((goal) => {
            const goalProtein = calculateDailyProtein(
              userProfile.weight,
              userProfile.weightUnit,
              goal
            );
            const goalInfo = getGoalDetails(goal);
            const isCurrentGoal = goal === userProfile.goal;

            return (
              <div
                key={goal}
                className={`p-4 rounded-lg border-2 ${
                  isCurrentGoal
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">
                        {goalInfo.description}
                      </h3>
                      {isCurrentGoal && (
                        <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                          Your Goal
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {goalInfo.factor}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {goalProtein}g
                    </div>
                    <div className="text-xs text-gray-500">per day</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scientific Background */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Scientific Foundation
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="prose prose-sm text-gray-700">
            <p className="mb-4">
              These protein recommendations are based on current sports
              nutrition research and guidelines from leading organizations in
              the field of exercise science and nutrition.
            </p>

            <h4 className="font-semibold text-gray-900 mb-2">Key Points:</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Minimum (0.8g/lb):</strong> Adequate for maintaining
                current muscle mass with basic activity
              </li>
              <li>
                <strong>Recommended (1.0g/lb):</strong> Optimal for most people
                looking to build muscle or improve body composition
              </li>
              <li>
                <strong>High (1.2g/lb):</strong> Beneficial for intense
                training, maximizing muscle growth, or aggressive fat loss while
                preserving muscle
              </li>
            </ul>

            <p className="mt-4 text-xs text-gray-600">
              Always consult with a healthcare provider or registered dietitian
              for personalized nutrition advice, especially if you have any
              medical conditions or dietary restrictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProteinCalculator;
