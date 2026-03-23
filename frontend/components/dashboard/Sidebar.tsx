/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Edit3,
  Layout,
  Sparkles,
  Settings,
  HelpCircle,
  LucideIcon,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  label,
  icon: Icon,
  active,
  onClick,
}) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative group ${
      active
        ? "text-primary"
        : "text-muted hover:text-foreground hover:bg-muted/5"
    }`}
  >
    {active && (
      <motion.div
        layoutId="active-bg"
        className="absolute inset-0 bg-white shadow-sm border border-border/50 rounded-2xl"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <Icon
      size={18}
      className={`relative z-10 transition-colors ${active ? "text-primary" : "text-muted group-hover:text-foreground"}`}
    />
    <span
      className={`relative z-10 text-sm font-semibold tracking-tight transition-colors ${active ? "text-primary" : "text-muted group-hover:text-foreground"}`}
    >
      {label}
    </span>
  </button>
);

interface SidebarProps {
  data: any;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  data,
  activeTab,
  onTabChange,
}) => {
  const hasMenu = data?.menu && data.menu.length > 0;

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen border-r border-border/50 bg-background/50 backdrop-blur-xl p-8 sticky top-0">
      <div className="mb-12">
        <h1 className="text-2xl font-black text-foreground tracking-tighter">
          My Resumes
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <p className="text-[10px] font-black tracking-[0.1em] text-muted uppercase">
            {data?.projectsCount || 0} Drafts Saved
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {hasMenu ? (
          data.menu.map((item: any) => {
            const icons: Record<string, LucideIcon> = {
              Edit3,
              Layout,
              Sparkles,
              Settings,
              HelpCircle,
            };
            return (
              <SidebarItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={icons[item.icon] || Edit3}
                active={activeTab === item.id}
                onClick={onTabChange}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
            <Menu size={24} className="mb-2" />
            <p className="text-[10px] font-bold uppercase tracking-widest">
              No Navigation
            </p>
          </div>
        )}
      </nav>

      <div className="mt-auto space-y-8">
        {/* Footer content can go here */}
      </div>
    </aside>
  );
};
