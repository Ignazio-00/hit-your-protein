import { UserProfile } from "../types";

const STORAGE_KEYS = {
  USER_PROFILE: "hit-protein-user-profile",
};

/**
 * Save user profile to localStorage
 */
export function saveUserProfile(profile: UserProfile): void {
  try {
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
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error loading user profile:", error);
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
