"use client";

import React from "react";
import { 
  Edit3, 
  Layout, 
  Sparkles, 
  History, 
  Settings, 
  HelpCircle, 
  PlusCircle,
  LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";

interface SidebarItemProps {
  id: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ id, label, icon: Icon, active, onClick }) => (
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
    <Icon size={18} className={`relative z-10 transition-colors ${active ? "text-primary" : "text-muted group-hover:text-foreground"}`} />
    <span className={`relative z-10 text-sm font-semibold tracking-tight transition-colors ${active ? "text-primary" : "text-muted group-hover:text-foreground"}`}>
      {label}
    </span>
  </button>
);

interface SidebarProps {
  data: any;
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, activeTab, onTabChange }) => {
  const handleCreateNew = () => {
    console.log("Create New Resume clicked");
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen border-r border-border/50 bg-background/50 backdrop-blur-xl p-8 sticky top-0">
      <div className="mb-12">
        <h1 className="text-2xl font-black text-foreground tracking-tighter">My Resumes</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <p className="text-[10px] font-black tracking-[0.1em] text-muted uppercase">{data.projectsCount} Drafts Saved</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {data.menu.map((item: any) => {
          const icons: Record<string, LucideIcon> = {
            Edit3, Layout, Sparkles, History
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
        })}
      </nav>

      <div className="mt-auto space-y-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateNew}
          className="w-full bg-primary text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all"
        >
          <PlusCircle size={20} />
          <span className="text-sm">Create New</span>
        </motion.button>

        <div className="space-y-1">
          {data.footer.map((item: any) => {
            const icons: Record<string, LucideIcon> = {
              Settings, HelpCircle
            };
            return (
              <SidebarItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={icons[item.icon] || Settings}
                active={activeTab === item.id}
                onClick={onTabChange}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};
