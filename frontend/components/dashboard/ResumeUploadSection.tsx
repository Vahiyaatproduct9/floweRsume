"use client";

import React, { useRef } from "react";
import { FileText, Upload, Type, CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";

interface ResumeUploadSectionProps {
  resumeFile: File | null;
  resumeContent: string;
  setResumeFile: (file: File | null) => void;
  setResumeContent: (content: string) => void;
}

export const ResumeUploadSection: React.FC<ResumeUploadSectionProps> = ({
  resumeFile,
  resumeContent,
  setResumeFile,
  setResumeContent,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      // In a real app, you'd parse the file here to setResumeContent
      // For now, we'll just store the file object
    }
  };

  const clearFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const hasContent = resumeFile || resumeContent.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-[2.5rem] border border-border p-6 lg:p-8 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className={`p-4 rounded-3xl transition-colors ${hasContent ? 'bg-primary/10 text-primary' : 'bg-accent text-muted'}`}>
            <FileText size={28} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-foreground">Resume Identity</h3>
            <p className="text-sm text-muted font-light">
              {resumeFile 
                ? `Attached: ${resumeFile.name}` 
                : resumeContent.trim() 
                  ? "Custom text provided" 
                  : "No resume source detected"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {resumeFile ? (
            <button
              onClick={clearFile}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent/80 text-foreground rounded-2xl font-semibold transition-all group"
            >
              <X size={18} className="text-muted group-hover:text-destructive transition-colors" />
              <span>Remove</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-2xl font-semibold transition-all"
              >
                <Upload size={18} />
                <span>Upload PDF</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
              </button>
              <div className="hidden md:block w-px h-8 bg-border/60 mx-1" />
              <button
                onClick={() => {
                  // This could scroll to the editor or focus it
                  const editor = document.querySelector('textarea');
                  editor?.focus();
                }}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-accent hover:bg-accent/80 text-foreground rounded-2xl font-semibold transition-all"
              >
                <Type size={18} />
                <span>Input Text</span>
              </button>
            </>
          )}
          
          {hasContent && (
            <div className="hidden lg:flex items-center gap-2 ml-4 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 size={14} />
              Ready
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
