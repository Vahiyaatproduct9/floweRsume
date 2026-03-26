"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Eye, Layout } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

interface Template {
  id: string;
  name: string;
  description: string;
  previewColor: string;
}

const templates: Template[] = [
  {
    id: "classic",
    name: "Classic Professional",
    description: "A clean, timeless design suitable for all industries.",
    previewColor: "bg-slate-100",
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Sleek and contemporary, perfect for tech and creative roles.",
    previewColor: "bg-zinc-100",
  },
  {
    id: "creative",
    name: "Creative Pulse",
    description: "Bold accents to make your personality shine through.",
    previewColor: "bg-pink-50",
  },
];

interface ResumeCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ template, isSelected, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative flex flex-col rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
        isSelected ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" : "border-border/50 bg-card hover:border-primary/50"
      }`}
    >
      {/* Visual Preview Placeholder */}
      <div className={`aspect-[3/4] w-full ${template.previewColor} p-6 flex flex-col gap-3 relative group`}>
        <div className="w-2/3 h-4 bg-foreground/10 rounded-full" />
        <div className="w-full h-2 bg-foreground/5 rounded-full" />
        <div className="w-full h-2 bg-foreground/5 rounded-full" />
        <div className="w-1/2 h-2 bg-foreground/5 rounded-full mt-2" />
        
        <div className="mt-4 flex flex-col gap-2">
            <div className="w-full h-20 bg-foreground/5 rounded-xl" />
            <div className="w-full h-20 bg-foreground/5 rounded-xl" />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button className="p-3 bg-white rounded-2xl shadow-lg text-primary hover:scale-110 transition-transform">
                <Eye size={20} />
            </button>
            <button 
                onClick={() => onSelect(template.id)}
                className="p-3 bg-primary rounded-2xl shadow-lg text-white hover:scale-110 transition-transform"
            >
                <Check size={20} />
            </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-foreground mb-1">{template.name}</h3>
        <p className="text-sm text-muted line-clamp-2">{template.description}</p>
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full shadow-lg">
          <Check size={16} />
        </div>
      )}
    </motion.div>
  );
};

export const TemplatesSection: React.FC = () => {
  const { selectedTemplateId, setSelectedTemplateId } = useResumeStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
          Visual Templates
        </h2>
        <p className="text-muted font-medium">
          Select a canvas that best reflects your professional brand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {templates.map((template) => (
          <ResumeCard
            key={template.id}
            template={template}
            isSelected={selectedTemplateId === template.id}
            onSelect={setSelectedTemplateId}
          />
        ))}
      </div>
      
      <div className="mt-4 p-8 rounded-[2rem] bg-accent/30 border border-primary/20 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-primary/10">
                <Layout size={28} />
            </div>
            <div>
                <h4 className="font-bold text-foreground">Current Selection: {templates.find(t => t.id === selectedTemplateId)?.name}</h4>
                <p className="text-sm text-muted">We are working on more editorial styles for your resumes.</p>
            </div>
        </div>
        <button 
            onClick={() => {
                // You could add a toast here confirming selection or navigate to editor
            }}
            className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95 whitespace-nowrap"
        >
            Use Selected Template
        </button>
      </div>
    </div>
  );
};
