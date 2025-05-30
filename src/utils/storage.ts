/// <reference types="vite/client" />

import { UserProfile } from "../types";

const STORAGE_KEYS = {
  USER_PROFILE: "hit-protein-user-profile",
  VERSION: "hit-protein-version",
};

const STORAGE_VERSION = "2.0";

const log = (message: string, data?: any) => {
  if (import.meta.env.DEV) {
    console.log(`[Storage] ${message}`, data);
  }
};

const logError = (message: string, error: any) => {
  console.error(`[Storage] ${message}`, error);
};

/**
 * Check if we need to clear old data due to version changes
 */
function checkVersion(): void {
  const storedVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
  if (storedVersion !== STORAGE_VERSION) {
    log("Version mismatch, clearing old data...", {
      stored: storedVersion,
      current: STORAGE_VERSION,
    });
    clearAllData();
    localStorage.setItem(STORAGE_KEYS.VERSION, STORAGE_VERSION);
  }
}

/**
 * Save user profile to localStorage
 */
export function saveUserProfile(profile: UserProfile): void {
  try {
    checkVersion();
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    log("User profile saved successfully");
  } catch (error) {
    logError("Error saving user profile", error);
    throw error;
  }
}

/**
 * Load user profile from localStorage
 */
export function loadUserProfile(): UserProfile | null {
  try {
    checkVersion();

    const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!stored) {
      log("No user profile found in storage");
      return null;
    }

    const parsed = JSON.parse(stored);

    // Validate that the stored profile has all required fields
    if (!parsed.name || !parsed.weight || !parsed.goal) {
      log("Invalid user profile in storage, clearing...", parsed);
      clearAllData();
      return null;
    }

    const cleanProfile: UserProfile = {
      name: parsed.name,
      weight: parsed.weight,
      weightUnit: parsed.weightUnit || "lb",
      height: parsed.height,
      age: parsed.age,
      gender: parsed.gender,
      goal: parsed.goal,
    };

    log("User profile loaded successfully");
    return cleanProfile;
  } catch (error) {
    logError("Error loading user profile", error);
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
    log("All storage data cleared");
  } catch (error) {
    logError("Error clearing data", error);
  }
}
