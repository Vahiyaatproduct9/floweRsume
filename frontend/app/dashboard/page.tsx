"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EditorSection } from "@/components/dashboard/EditorSection";
import { HistorySection } from "@/components/dashboard/HistorySection";
import { AITipCard } from "@/components/dashboard/AITipCard";
import { ResumeUploadSection } from "@/components/dashboard/ResumeUploadSection";
import { analyzeResume } from "@/app/functions/analysis";
import { ResumePopup } from "@/components/dashboard/ResumePopup";
import { useMessageStore } from "@/store/useMessageStore";

// Mock data that would normally come from a server
const dashboardData = {
  header: {
    title: "Curated Canvas",
    credits: 75,
  },
  sidebar: {
    projectsCount: 4,
    menu: [
      { id: "editor", label: "Editor", icon: "Edit3" },
      { id: "templates", label: "Templates", icon: "Layout" },
      // { id: "optimizer", label: "AI Optimizer", icon: "Sparkles" },
      { id: "settings", label: "Settings", icon: "Settings" },
      { id: "support", label: "Support", icon: "HelpCircle" },
    ],
    // footer: [
    // ],
  },
  editor: {
    title: "Refine Your Story",
    description:
      "Use AI to polish your professional experience into an editorial masterpiece.",
    input: {
      label: "PRIMARY RESUME DATA",
      placeholder: "Drop your Resume or Paste your Resume Text Here",
      buttonText: "Analyze with AI",
    },
  },
  history: {
    title: "RECENT EDITS",
    viewAll: "VIEW ALL",
    items: [
      { id: 1, title: "Senior Product Designer_v2", modified: "2 hours ago" },
      { id: 2, title: "UX Lead - Google Application", modified: "Yesterday" },
      { id: 3, title: "Startup Consultant Resume", modified: "3 days ago" },
    ],
    newCanvas: "START A NEW CANVAS",
  },
  aiTip: {
    title: "Magic AI Tip",
    content:
      'Your "Executive Summary" is currently a bit passive. Try starting with dynamic verbs like "Orchestrated" or "Pioneered" to catch a recruiter\'s eye in under 6 seconds.',
  },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("editor");
  const [resumeContent, setResumeContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { setMessage, setType } = useMessageStore();

  // Cleanup blob URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleAnalyze = async () => {
    console.log("Analyzing with:", {
      resumeContent,
      jobDescription,
      resumeFileName: resumeFile?.name,
    });

    try {
      const result = await analyzeResume(
        resumeFile,
        resumeContent,
        jobDescription,
      );

      if (result instanceof Blob) {
        // Handle successful PDF blob
        const url = URL.createObjectURL(result);
        setPdfUrl(url);
        setShowPopup(true);
      } else if (result && result.success === false) {
        // Handle expected API error
        setMessage(
          result.message || "Failed to analyze resume. Please try again.",
        );
        setType("error");
      } else {
        // Unexpected result format
        setMessage("An unexpected response occurred. Please try again.");
        setType("error");
      }
    } catch (error) {
      console.error("Analysis Error:", error);
      setMessage("A network error occurred. Please check your connection.");
      setType("error");
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <Sidebar
        data={dashboardData.sidebar}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        {/* <DashboardHeader data={dashboardData.header} /> */}

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Content: Editor (8 cols on desktop) */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <ResumeUploadSection
                resumeFile={resumeFile}
                resumeContent={resumeContent}
                setResumeFile={setResumeFile}
                setResumeContent={setResumeContent}
              />

              <EditorSection
                data={dashboardData.editor}
                resumeContent={resumeContent}
                setResumeContent={setResumeContent}
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                onAnalyze={handleAnalyze}
                resumeFile={resumeFile}
                setResumeFile={setResumeFile}
              />

              {/* AI Tip - Visible on Desktop under Editor, or at bottom on Mobile */}
              <div className="hidden lg:block">
                <AITipCard data={dashboardData.aiTip} />
              </div>
            </div>

            {/* Right Content: History (4 cols on desktop) */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <HistorySection data={dashboardData.history} />
            </div>

            {/* Mobile-only AI Tip */}
            <div className="lg:hidden">
              <AITipCard data={dashboardData.aiTip} />
            </div>
          </div>
        </main>
      </div>

      {/* Resume Preview Popup */}
      <ResumePopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        pdfUrl={pdfUrl}
        fileName={
          resumeFile ? `Optimized-${resumeFile.name}` : "Optimized-Resume.pdf"
        }
      />
    </div>
  );
}
