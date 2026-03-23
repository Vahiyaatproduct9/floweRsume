"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

interface AITipCardProps {
  data: any;
}

export const AITipCard: React.FC<AITipCardProps> = ({ data }) => {
  return (
    <div className="bg-accent rounded-3xl p-6 border border-primary/20 flex gap-4 mt-8 relative overflow-hidden group">
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
        <Lightbulb size={24} className="group-hover:animate-pulse" />
      </div>
      <div className="space-y-1 relative z-10">
        <h4 className="font-bold text-foreground">{data.title}</h4>
        <p className="text-muted text-sm leading-relaxed max-w-2xl">
          {data.content}
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    </div>
  );
};
