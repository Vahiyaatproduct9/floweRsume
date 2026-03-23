"use client";

import React, { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface EditorSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const EditorSection: React.FC<EditorSectionProps> = ({ data }) => {
  const [text, setText] = useState("");
  const [dragging, setDragging] = useState<boolean>(false);
  const handleAnalyze = () => {
    console.log("Analyzing resume text:", text);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    if (file) {
      console.log("File uploaded:", file.name);
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
    console.log(file.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 w-full"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl">
          {data.title}
        </h1>
        <p className="text-muted text-lg max-w-2xl font-light leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className="bg-card rounded-[2.5rem] border border-border p-6 lg:p-10 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <FileText size={16} className="text-primary" />
          <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
            {data.input.label}
          </span>
        </div>

        <div className="relative group border-2 border-dashed border-border/60 rounded-4xl min-h-100 transition-all duration-300 focus-within:border-primary/40 focus-within:bg-accent/5 overflow-hidden">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={data.input.placeholder}
            className="w-full h-full min-h-100 p-8 bg-transparent outline-none resize-none text-foreground text-lg placeholder:text-muted/40 font-light"
          />

          {text === "" && (
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
                  accept=".pdf,.doc,.docx"
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
            onClick={handleAnalyze}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98] group"
          >
            <Sparkles
              size={20}
              className="group-hover:rotate-12 transition-transform"
            />
            <span>{data.input.buttonText}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
