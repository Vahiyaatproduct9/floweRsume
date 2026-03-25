export type bulletpoint = {
  title: string;
  points: string[];
};
export type AIResponse = {
  name: string;
  job_title: string;
  phone?: string;
  email?: string;
  address?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  professional_summary: string;
  skills: string[];
  education?: string[];
  projects: bulletpoint[];
  experience: bulletpoint[];
  honors: string[];
  ats_score_before: number;
  ats_score_after: number;
  changes_made: string[];
};

export type AIParams = {
  query: string;
  systemInstruction: string;
};
