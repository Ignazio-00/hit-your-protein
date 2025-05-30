import { UserProfile } from "../types";

const STORAGE_KEYS = {
  USER_PROFILE: "hit-protein-user-profile",
  VERSION: "hit-protein-version",
};

const CURRENT_VERSION = "2.0";

function checkVersion(): void {
  const storedVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
  if (storedVersion !== CURRENT_VERSION) {
    console.log("Version mismatch, clearing old data...");
    clearAllData();
    localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
  }
}

/**
 * Save user profile to localStorage
 */
export function saveUserProfile(profile: UserProfile): void {
  try {
    checkVersion();
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
}

/**
 * Load user profile from localStorage
 */
export function loadUserProfile(): UserProfile | null {
  try {
    checkVersion();

    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!stored) return null;

    const parsed = JSON.parse(stored);

    // Validate that the stored profile has all required fields
    if (!parsed.id || !parsed.name || !parsed.weight || !parsed.goal) {
      console.warn("Invalid user profile in storage, clearing...");
      clearAllData();
      return null;
    }

    const cleanProfile: UserProfile = {
      id: parsed.id,
      name: parsed.name,
      weight: parsed.weight,
      weightUnit: parsed.weightUnit || "lb",
      height: parsed.height,
      age: parsed.age,
      gender: parsed.gender,
      goal: parsed.goal,
      createdAt: parsed.createdAt,
      updatedAt: parsed.updatedAt,
    };

    return cleanProfile;
  } catch (error) {
    console.error("Error loading user profile:", error);
    clearAllData();
    return null;
  }
}

/**
 * Clear all stored data (for reset functionality)
 */
export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error("Error clearing data:", error);
  }
}
