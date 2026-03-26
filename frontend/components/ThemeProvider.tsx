"use client";

import React, { useEffect } from "react";
import { initThemeSync, useThemeStore } from "@/store/useTheme";
import { colors } from "@/lib/colors";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Client-side component that initializes theme synchronization with browser settings
 * and applies the current theme's CSS variables to the document.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    // Initialize the theme synchronization listener
    const cleanup = initThemeSync();
    
    // Clean up the listener when the component is unmounted
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Apply CSS variables when mode changes
  useEffect(() => {
    const root = document.documentElement;
    const themeColors = colors[mode as keyof typeof colors] || colors.light;

    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Handle dark mode class for tailwind/other tools
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Add global transition for smooth theme switching
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease";
  }, [mode]);

  return <>{children}</>;
};
