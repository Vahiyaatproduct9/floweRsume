/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  FileText,
  MoreVertical,
  History as HistoryIcon,
  Plus,
  ChevronRight,
  ExternalLink,
  Inbox,
} from "lucide-react";
import { motion } from "framer-motion";
import { EmptyState } from "./EmptyState";

interface HistoryItemProps {
  item: any;
  index: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="flex items-center justify-between p-4 border border-border rounded-2xl hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-muted/5 rounded-xl flex items-center justify-center text-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <FileText size={22} />
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold text-foreground text-sm line-clamp-1">
          {item.title}
        </h4>
        <span className="text-[10px] text-muted font-medium uppercase tracking-tight">
          Modified {item.modified}
        </span>
      </div>
    </div>
    <button className="text-muted hover:text-foreground p-2 rounded-full hover:bg-muted/10 transition-colors">
      <MoreVertical size={16} />
    </button>
  </motion.div>
);

interface HistorySectionProps {
  data: any;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ data }) => {
  const hasItems = data?.items && data.items.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HistoryIcon size={14} className="text-muted" />
          <h3 className="text-[10px] font-black tracking-[0.2em] text-muted uppercase">
            {data?.title || "RECENT EDITS"}
          </h3>
        </div>
        {hasItems && (
          <button className="text-[10px] font-black tracking-[0.2em] text-primary hover:opacity-70 flex items-center gap-1 uppercase transition-opacity">
            {data?.viewAll || "VIEW ALL"} <ChevronRight size={10} />
          </button>
        )}
      </div>

      <div className="space-y-3">
        {hasItems ? (
          data.items.map((item: any, index: number) => (
            <HistoryItem key={item.id} item={item} index={index} />
          ))
        ) : (
          <EmptyState
            icon={Inbox}
            title="Clean Slate"
            description="Your recent edits will appear here as you craft your masterpieces."
          />
        )}
      </div>

      <button className="w-full flex flex-col items-center justify-center gap-3 py-10 bg-background border-2 border-dashed border-border/40 rounded-4xl text-muted/60 hover:border-primary/40 hover:text-primary hover:bg-accent/5 transition-all group active:scale-[0.98]">
        <div className="w-12 h-12 bg-muted/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Plus size={24} />
        </div>
        <span className="text-[10px] font-black tracking-[0.2em] uppercase">
          {data?.newCanvas || "START A NEW CANVAS"}
        </span>
      </button>

      {/* Promo Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden bg-accent/30 rounded-[2rem] p-8 border border-primary/5 group cursor-pointer"
      >
        <div className="relative z-10">
          <h4 className="font-extrabold text-foreground mb-2 text-lg leading-tight">
            Need a custom
            <br />
            cover letter?
          </h4>
          <button className="text-xs font-black text-primary underline decoration-2 underline-offset-4 flex items-center gap-1 uppercase tracking-wider">
            Upgrade to Premium <ExternalLink size={12} />
          </button>
        </div>
        <div className="absolute -top-4 -right-4 opacity-5 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
          <FileText size={120} className="text-primary" />
        </div>

        {/* Abstract shapes for visual flair */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  );
};
