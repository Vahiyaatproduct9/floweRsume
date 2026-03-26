"use client";

import { X, Download, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumePopupProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  fileName?: string;
  atsScoreBefore?: number;
  atsScoreAfter?: number;
  changesMade?: string[];
}

export function ResumePopup({
  isOpen,
  onClose,
  pdfUrl,
  fileName = "resume.pdf",
  atsScoreBefore,
  atsScoreAfter,
  changesMade = [],
}: ResumePopupProps) {
  if (!isOpen || !pdfUrl) return null;

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scoreImprovement =
    atsScoreAfter !== undefined && atsScoreBefore !== undefined
      ? atsScoreAfter - atsScoreBefore
      : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-7xl h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-foreground tracking-tight flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" fill="currentColor" />
              AI-Optimized Result
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
            {/* PDF Viewer (Left/Top) */}
            <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative border-b lg:border-b-0 lg:border-r border-border">
              <iframe
                src={`${pdfUrl}#toolbar=0`}
                className="w-full h-full border-none"
                title="Resume Preview"
              />
            </div>

            {/* Analysis Panel (Right/Bottom) */}
            <div className="w-full lg:w-[400px] bg-card flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* ATS Score Section */}
                {(atsScoreBefore !== undefined ||
                  atsScoreAfter !== undefined) && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      ATS Score Impact
                    </h3>
                    <div className="flex items-center justify-between bg-muted/30 p-4 rounded-xl border border-border">
                      <div className="text-center">
                        <span className="block text-sm text-muted-foreground mb-1">
                          Before
                        </span>
                        <span className="text-2xl font-bold text-muted-foreground">
                          {atsScoreBefore ?? "-"}
                        </span>
                      </div>
                      <ArrowRight className="w-6 h-6 text-muted-foreground/50" />
                      <div className="text-center">
                        <span className="block text-sm text-muted-foreground mb-1">
                          After
                        </span>
                        <span className="text-3xl font-bold text-green-500">
                          {atsScoreAfter ?? "-"}
                        </span>
                      </div>
                      {scoreImprovement > 0 && (
                        <div className="ml-2 px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full">
                          +{scoreImprovement}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Improvements List */}
                {changesMade.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Improvements
                    </h3>
                    <ul className="space-y-3">
                      {changesMade.map((change, index) => (
                        <li key={index} className="flex gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/90">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
