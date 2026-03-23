/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { HelpCircle, User } from "lucide-react";

interface HeaderProps {
  data: any;
}

export const DashboardHeader: React.FC<HeaderProps> = ({ data }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-background border-b border-border lg:border-none lg:bg-transparent">
      <h2 className="text-xl font-bold text-primary">{data.title}</h2>

      <div className="flex items-center gap-4">
        <button className="hidden sm:block text-muted hover:text-foreground">
          <HelpCircle size={22} />
        </button>

        <div className="w-9 h-9 rounded-full bg-muted/20 flex items-center justify-center border border-border">
          <User size={20} className="text-muted" />
        </div>
      </div>
    </header>
  );
};
