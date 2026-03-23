"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, AlertCircle, CheckCircle, XCircle, X } from "lucide-react";
import { useMessageStore, MessageType } from "@/store/useMessageStore";
import { useTheme } from "@/store/useTheme";

const ICONS = {
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
  success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
};

const COLORS = {
  info: "border-blue-500/20 bg-blue-50 dark:bg-blue-950/20",
  warning: "border-amber-500/20 bg-amber-50 dark:bg-amber-950/20",
  success: "border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/20",
  error: "border-red-500/20 bg-red-50 dark:bg-red-950/20",
};

export const Notification = () => {
  const { message, type, setMessage } = useMessageStore();
  const { isDark } = useTheme();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 pr-12 rounded-xl border shadow-lg backdrop-blur-md ${COLORS[type as MessageType]}`}
        >
          <div className="shrink-0">{ICONS[type as MessageType]}</div>
          <p
            className={`text-sm font-medium ${isDark ? "text-zinc-200" : "text-zinc-800"}`}
          >
            {message}
          </p>
          <button
            onClick={() => setMessage(null)}
            className="absolute top-1/2 -translate-y-1/2 right-3 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
