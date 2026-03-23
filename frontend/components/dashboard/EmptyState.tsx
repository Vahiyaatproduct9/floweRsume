"use client";

import React from "react";
import { LucideIcon, Inbox } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-10 text-center bg-card/50 rounded-[2.5rem] border border-border border-dashed ${className}`}
    >
      <div className="w-16 h-16 bg-muted/5 rounded-3xl flex items-center justify-center text-muted/40 mb-4">
        <Icon size={32} />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted font-light max-w-[240px]">
        {description}
      </p>
    </motion.div>
  );
};
