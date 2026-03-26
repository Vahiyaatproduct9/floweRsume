"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, TreePine, Check } from "lucide-react";
import { useTheme } from "@/store/useTheme";

interface ThemeOptionProps {
  mode: "light" | "dark" | "forest";
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const ThemeOption: React.FC<ThemeOptionProps> = ({
  mode,
  icon,
  label,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`flex-1 flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all duration-300 relative group ${
      isActive
        ? "border-primary bg-primary/5 shadow-xl shadow-primary/10"
        : "border-border/50 bg-card hover:border-primary/50"
    }`}
  >
    <div
      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
        isActive
          ? "bg-primary text-white"
          : "bg-muted/10 text-muted group-hover:text-primary group-hover:bg-primary/10"
      }`}
    >
      {icon}
    </div>
    <span
      className={`font-bold tracking-tight ${isActive ? "text-primary" : "text-muted group-hover:text-foreground"}`}
    >
      {label}
    </span>
    {isActive && (
      <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full shadow-lg">
        <Check size={12} />
      </div>
    )}
  </button>
);

export const SettingsSection: React.FC = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
          Settings
        </h2>
        <p className="text-muted font-medium">
          Personalize your editorial experience and account preferences.
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-2 h-8 bg-primary rounded-full" />
          <h3 className="text-xl font-black text-foreground uppercase tracking-widest text-sm">
            Appearance
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ThemeOption
            mode="light"
            label="Light"
            icon={<Sun size={24} />}
            isActive={mode === "light"}
            onClick={() => setMode("light")}
          />
          <ThemeOption
            mode="dark"
            label="Dark"
            icon={<Moon size={24} />}
            isActive={mode === "dark"}
            onClick={() => setMode("dark")}
          />
          <ThemeOption
            mode="forest"
            label="Forest"
            icon={<TreePine size={24} />}
            isActive={mode === "forest"}
            onClick={() => setMode("forest")}
          />
        </div>
      </section>

      <section className="p-8 rounded-4xl bg-muted/5 border border-border/50 flex flex-col gap-6">
        <h3 className="font-bold text-lg text-foreground">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border/30">
            <div>
              <p className="font-bold text-foreground">Email Notifications</p>
              <p className="text-xs text-muted font-medium">
                Get notified when your resume is ready or optimized.
              </p>
            </div>
            <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-not-allowed">
              <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border/30">
            <div>
              <p className="font-bold text-foreground">Auto-save Drafts</p>
              <p className="text-xs text-muted font-medium">
                Automatically save your edits every 30 seconds.
              </p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full relative cursor-not-allowed">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      <div className="p-6 text-center">
        <p className="text-[10px] font-black tracking-[0.2em] text-muted/40 uppercase">
          floweRsume v1.0.0 — Crafted with Passion
        </p>
      </div>
    </div>
  );
};
