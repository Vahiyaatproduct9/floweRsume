"use client";

import { create } from "zustand";
import { colors } from "@/lib/colors";

type ThemeMode = "light" | "dark" | "forest";

interface ThemeState {
  mode: ThemeMode;
  theme: typeof colors.light;
  setMode: (mode: ThemeMode) => void;
}

/**
 * Zustand store to manage theme state and synchronization with browser preferences.
 */
export const useThemeStore = create<ThemeState>((set) => ({
  mode: "light",
  theme: colors.light,
  setMode: (mode: ThemeMode) => 
    set({ 
      mode, 
      theme: colors[mode] 
    }),
}));

/**
 * Helper to initialize theme synchronization with the browser's 'prefers-color-scheme'.
 * This should be called in a client-side component or effect.
 */
export const initThemeSync = () => {
  if (typeof window === "undefined") return;

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
  const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
    const mode: ThemeMode = e.matches ? "dark" : "light";
    useThemeStore.getState().setMode(mode);
  };

  // Set initial state
  handleChange(mediaQuery);

  // Listen for future changes
  mediaQuery.addEventListener("change", handleChange);

  // Return cleanup function
  return () => mediaQuery.removeEventListener("change", handleChange);
};

/**
 * Convenient hook that combines the store and optional automatic sync.
 * Use this in your components to access current theme values.
 */
export const useTheme = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useThemeStore((state) => state.theme);
  const setMode = useThemeStore((state) => state.setMode);

  return { mode, theme, setMode, isDark: mode === "dark" };
};
