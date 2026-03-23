/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EditorSectionProps {
  data: any;
  resumeContent: string;
  setResumeContent: (content: string) => void;
  jobDescription: string;
  setJobDescription: (content: string) => void;
  onAnalyze: () => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
}

export const EditorSection: React.FC<EditorSectionProps> = ({
  data,
  resumeContent,
  setResumeContent,
  jobDescription,
  setJobDescription,
  onAnalyze,
  resumeFile,
  setResumeFile,
}) => {
  const [step, setStep] = useState(1);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleNext = () => {
    if (resumeContent.trim() || resumeFile) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      setResumeFile(file);
    }
  };

  const dragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e: React.DragEvent<Element>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  // Fallbacks for data

  const description =
    step === 1
      ? data?.description ||
        "Use AI to polish your professional experience into an editorial masterpiece."
      : "Paste the Job Description to tailor your resume perfectly for this specific opportunity.";
  const inputLabel = data?.input?.label || "PRIMARY RESUME DATA";
  const placeholder =
    data?.input?.placeholder ||
    "Drop your Resume or Paste your Resume Text Here";

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="space-y-2">
        {/* <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl"> */}
        {/*   {title} */}
        {/* </h1> */}
        <p className="text-muted text-lg max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      </div>

      <div className="bg-card rounded-[2.5rem] border border-border p-6 lg:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <FileText size={16} className="text-primary" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                    {inputLabel}
                  </span>
                </div>
                {resumeFile && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold">
                    <CheckCircle2 size={12} />
                    {resumeFile.name.toUpperCase()}
                  </div>
                )}
              </div>

              <div className="relative group border-2 border-dashed border-border/60 rounded-4xl min-h-100 transition-all duration-300 focus-within:border-primary/40 focus-within:bg-accent/5 overflow-hidden">
                <textarea
                  value={resumeContent}
                  onChange={(e) => setResumeContent(e.target.value)}
                  placeholder={
                    resumeFile
                      ? "File attached. You can also add notes here..."
                      : placeholder
                  }
                  className="w-full h-full min-h-100 p-8 bg-transparent outline-none resize-none text-foreground text-lg placeholder:text-muted/40 font-light"
                />

                {resumeContent === "" && !resumeFile && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <label
                      className="pointer-events-auto p-4 rounded-full bg-accent/50 text-primary mb-2 cursor-pointer"
                      onDragOver={dragOver}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                    >
                      <FileText size={32} />
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-sm font-medium text-primary/60">
                      {dragging ? "Release to Drop" : "Drag Files Here"}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted/60 italic">
                  * AI works best with clear, structured text or PDFs.
                </p>
                <button
                  onClick={handleNext}
                  disabled={!resumeContent.trim() && !resumeFile}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  <span>Next</span>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <FileText size={16} className="text-primary" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                    JOB DESCRIPTION
                  </span>
                </div>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-xs font-bold text-muted hover:text-primary transition-colors group"
                >
                  <ArrowLeft
                    size={14}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Back to Resume
                </button>
              </div>

              <div className="relative group border-2 border-dashed border-border/60 rounded-4xl min-h-100 transition-all duration-300 focus-within:border-primary/40 focus-within:bg-accent/5 overflow-hidden">
                <textarea
                  autoFocus
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the Job Description you're applying for..."
                  className="w-full h-full min-h-100 p-8 bg-transparent outline-none resize-none text-foreground text-lg placeholder:text-muted/40 font-light"
                />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted/60 italic">
                  * Providing the JD helps AI tailor your bullet points
                  specifically.
                </p>
                <button
                  onClick={onAnalyze}
                  disabled={!jobDescription.trim()}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles
                    size={20}
                    className="group-hover:rotate-12 transition-transform"
                  />
                  <span>Analyze with AI</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
