import { useState, useEffect } from "react";
import { UserProfile, AppState } from "./types";
import { loadUserProfile } from "./utils/storage";

// Components
import Header from "./components/Header";
import Onboarding from "./components/Onboarding";
import ProteinCalculator from "./components/ProteinCalculator";

function App() {
  const [appState, setAppState] = useState<AppState>({
    userProfile: null,
    isOnboarding: true,
  });

  // Load data from localStorage on app start
  useEffect(() => {
    const savedProfile = loadUserProfile();

    setAppState((prev) => ({
      ...prev,
      userProfile: savedProfile,
      isOnboarding: !savedProfile,
    }));
  }, []);

  const updateUserProfile = (profile: UserProfile) => {
    setAppState((prev) => ({
      ...prev,
      userProfile: profile,
      isOnboarding: false,
    }));
  };

  const resetApp = () => {
    setAppState({
      userProfile: null,
      isOnboarding: true,
    });
  };

  // Show onboarding if no user profile
  if (appState.isOnboarding || !appState.userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Onboarding onComplete={updateUserProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userProfile={appState.userProfile} onReset={resetApp} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProteinCalculator userProfile={appState.userProfile} />
      </main>
    </div>
  );
}

export default App;
