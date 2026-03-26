import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ResumeState {
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      selectedTemplateId: "classic", // Default template
      setSelectedTemplateId: (id) => set({ selectedTemplateId: id }),
    }),
    {
      name: "resume-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
