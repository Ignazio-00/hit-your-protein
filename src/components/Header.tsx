import React from "react";
import { UserProfile } from "../types";
import { Settings, User } from "lucide-react";
import { clearAllData } from "../utils/storage";

interface HeaderProps {
  userProfile: UserProfile;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, onReset }) => {
  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to reset and recalculate? This will clear your current data."
      )
    ) {
      clearAllData();
      onReset();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-lg">
              <span className="text-white font-bold text-lg">💪</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Hit Your Protein
              </h1>
              <p className="text-sm text-gray-500">Daily Protein Calculator</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {userProfile.name}
              </span>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Recalculate with new data"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Recalculate</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
