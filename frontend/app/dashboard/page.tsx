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
import { TemplatesSection } from "@/components/dashboard/TemplatesSection";
import { SettingsSection } from "@/components/dashboard/SettingsSection";
import {
  LifeBuoy,
  Mail,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

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
  support: {
    title: "Support Studio",
    description:
      "Need help polishing your application materials? Find quick guidance, platform help, and direct support details here.",
    email: "support@flowersume.app",
    cards: [
      {
        title: "Resume Review Guidance",
        description:
          "Get a clearer sense of how floweRsume evaluates content quality, ATS alignment, and professional storytelling.",
        icon: "FileText",
      },
      {
        title: "Product Help",
        description:
          "Use this space for questions about templates, uploads, optimization, exports, or dashboard behavior.",
        icon: "MessageSquare",
      },
      {
        title: "Priority Assistance",
        description:
          "If something feels off or blocked, reach out and include a short summary of what happened so support can respond faster.",
        icon: "Sparkles",
      },
    ],
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

function SupportSection() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
          {dashboardData.support.title}
        </h2>
        <p className="text-muted font-medium max-w-2xl">
          {dashboardData.support.description}
        </p>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {dashboardData.support.cards.map((card) => {
          const iconMap = {
            FileText: <FileText size={24} />,
            MessageSquare: <MessageSquare size={24} />,
            Sparkles: <Sparkles size={24} />,
          };

          return (
            <div
              key={card.title}
              className="rounded-[2rem] border border-border/50 bg-card p-7 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                {iconMap[card.icon as keyof typeof iconMap]}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-muted leading-6">{card.description}</p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[2rem] border border-primary/20 bg-accent/30 p-8 lg:p-10 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-foreground">
                How Support Works
              </h3>
            </div>
            <p className="text-foreground/90 font-medium leading-7">
              For the fastest help, share a short summary of the issue, what you
              were trying to do, and whether it happened during upload,
              optimization, template selection, or export. That gives the team
              enough context to troubleshoot quickly.
            </p>
          </div>

          <div className="rounded-3xl border border-border/40 bg-background px-5 py-4 flex items-center gap-4 min-w-fit">
            <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-black tracking-[0.2em] text-muted uppercase mb-1">
                Contact Email
              </p>
              <a
                href={`mailto:${dashboardData.support.email}`}
                className="font-bold text-foreground hover:text-primary transition-colors break-all"
              >
                {dashboardData.support.email}
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border/40 bg-background p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <LifeBuoy size={18} />
              </div>
              <h4 className="font-bold text-foreground">What to include</h4>
            </div>
            <ul className="space-y-3 text-sm text-muted leading-6">
              <li>• A quick summary of the issue or request</li>
              <li>• What section of the dashboard you were using</li>
              <li>• What result you expected to see</li>
              <li>• Any visible error or unusual behavior</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border/40 bg-background p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <h4 className="font-bold text-foreground">Support summary</h4>
            </div>
            <p className="text-sm text-muted leading-6">
              floweRsume support covers product questions, resume optimization
              guidance, template selection help, and issue reporting for the
              dashboard experience. The design here stays intentionally calm,
              editorial, and consistent with the rest of the workspace.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("editor");
  const [resumeContent, setResumeContent] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const { selectedTemplateId } = useResumeStore();

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Analysis results state
  const [atsScoreBefore, setAtsScoreBefore] = useState<number | undefined>(
    undefined,
  );
  const [atsScoreAfter, setAtsScoreAfter] = useState<number | undefined>(
    undefined,
  );
  const [changesMade, setChangesMade] = useState<string[]>([]);

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
        selectedTemplateId
      );

      if (result && result.ai_response) {
        const pdfDatabase64 = result.pdf_base64;
        const aiResponse = result.ai_response;

        setAtsScoreBefore(aiResponse.ats_score_before);
        setAtsScoreAfter(aiResponse.ats_score_after);
        setChangesMade(aiResponse.changes_made || []);

        const byteArray = Uint8Array.from(atob(pdfDatabase64), (c) =>
          c.charCodeAt(0),
        );
        // Handle successful PDF blob
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
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
        console.error("Unexpected result format:", result);
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
          {activeTab === "editor" ? (
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
          ) : activeTab === "templates" ? (
            <TemplatesSection />
          ) : activeTab === "settings" ? (
            <SettingsSection />
          ) : activeTab === "support" ? (
            <SupportSection />
          ) : null}
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
        atsScoreBefore={atsScoreBefore}
        atsScoreAfter={atsScoreAfter}
        changesMade={changesMade}
      />
    </div>
  );
}
