"use client";

import { X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumePopupProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  fileName?: string;
}

export function ResumePopup({
  isOpen,
  onClose,
  pdfUrl,
  fileName = "resume.pdf",
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
          className="relative w-full max-w-5xl h-[90vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-foreground tracking-tight">
              AI-Generated Resume Preview
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={onClose}
                className="p-2 text-muted hover:text-foreground hover:bg-muted/10 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              className="w-full h-full border-none"
              title="Resume Preview"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
