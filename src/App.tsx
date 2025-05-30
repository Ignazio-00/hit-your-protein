import { useState, useEffect } from "react";
import { UserProfile, AppState } from "./types";
import { loadUserProfile } from "./utils/storage";

// Components
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";
import Header from "./components/Header";
import Onboarding from "./components/Onboarding";
import ProteinCalculator from "./components/ProteinCalculator";

function App() {
  const [appState, setAppState] = useState<AppState>({
    userProfile: null,
    isOnboarding: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage on app start
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Add a small delay to prevent flash of loading state
        await new Promise((resolve) => setTimeout(resolve, 100));

        const savedProfile = loadUserProfile();

        setAppState((prev) => ({
          ...prev,
          userProfile: savedProfile,
          isOnboarding: !savedProfile,
        }));
      } catch (err) {
        console.error("Failed to initialize app:", err);
        setError("Failed to load your data. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  const updateUserProfile = (profile: UserProfile) => {
    try {
      setAppState((prev) => ({
        ...prev,
        userProfile: profile,
        isOnboarding: false,
      }));
    } catch (err) {
      console.error("Failed to update user profile:", err);
      setError("Failed to save your profile. Please try again.");
    }
  };

  const resetApp = () => {
    try {
      setAppState({
        userProfile: null,
        isOnboarding: true,
      });
    } catch (err) {
      console.error("Failed to reset app:", err);
      setError("Failed to reset. Please refresh the page.");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Hit Your Protein..." />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Show onboarding if no user profile
  if (appState.isOnboarding || !appState.userProfile) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <Onboarding onComplete={updateUserProfile} />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Header userProfile={appState.userProfile} onReset={resetApp} />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProteinCalculator userProfile={appState.userProfile} />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
