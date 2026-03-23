"use client";

import React, { useEffect } from "react";
import { initThemeSync } from "@/store/useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Client-side component that initializes theme synchronization with browser settings.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize the theme synchronization listener
    const cleanup = initThemeSync();
    
    // Clean up the listener when the component is unmounted
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <>{children}</>;
};
