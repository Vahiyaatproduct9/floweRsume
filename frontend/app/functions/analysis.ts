import { apiCall } from "@/lib/api";

/**
 * Sends resume data and job description to the backend for analysis.
 *
 * @param resumeFile - Optional PDF file of the resume.
 * @param resumeText - Optional raw text of the resume.
 * @param jobDescription - Optional raw text of the job description.
 * @returns The result of the API call.
 */
export async function analyzeResume(
  resumeFile: File | null,
  resumeText?: string,
  jobDescription?: string,
  templateId?: string,
) {
  const formData = new FormData();

  if (resumeFile) {
    formData.append("resumefile", resumeFile);
  }

  if (resumeText) {
    formData.append("resumetext", resumeText);
  }

  if (jobDescription) {
    formData.append("jobdescription", jobDescription);
  }

  if (templateId) {
    formData.append("templateid", templateId);
  }

  // Use apiCallFull as requested to return the result directly
  return await apiCall("/analyze", {
    body: formData,
    method: "POST",
  });
}
