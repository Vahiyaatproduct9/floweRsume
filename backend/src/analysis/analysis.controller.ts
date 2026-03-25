import create_resume from "@/AI/create_resume";
import { clerkAuth } from "@/libs/auth";
import { generateResumePDF } from "@/templates/resume-1.template";
import type { AIResponse } from "@/types/ai.types";
import { Elysia, t } from "elysia";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
/**
 * Analysis Controller
 *
 * Handles resume analysis requests.
 */
export const analysisController = new Elysia({ prefix: "/analyze" })
  .use(clerkAuth)
  .post(
    "/",
    async (ctx) => {
      const { body } = ctx;
      const { resumefile, resumetext, jobdescription } = body;
      const arrayBuffer = await resumefile?.arrayBuffer();
      const resume = pdfjsLib.getDocument(arrayBuffer);
      let resumeText = "";
      const resumeObject = await resume.promise;
      for (let i = 1; i <= resumeObject.numPages; i++) {
        const page = await resumeObject.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((t) => ("str" in t ? t.str : ""))
          .join(" ");
        resumeText += pageText + "\n";
        const annotation = await page.getAnnotations();
        const links = annotation
          .filter((t) => t.subtype === "Link" && t.url)
          .map((t) => t.url);
        resumeText += links;
      }
      console.log("--- Analyze Endpoint Hit ---");
      console.log("Resume File:", resumeText);
      console.log("Resume Text:", resumetext || "Not provided");
      console.log("Job Description:", jobdescription || "Not provided");

      const aiResponse = await create_resume({
        resumeText,
        jobDescription: jobdescription,
      });
      if (!aiResponse) {
        return {
          success: false,
          status: 500,
          message: "AI Response not found",
        };
      }
      const parsedResponse: AIResponse = JSON.parse(aiResponse);
      const pdfFile = await generateResumePDF(parsedResponse);

      return new Response(pdfFile, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": "inline; filename=resume.pdf",
        },
      });
    },
    {
      body: t.Object({
        resumefile: t.Optional(t.File()),
        resumetext: t.Optional(t.String()),
        jobdescription: t.Optional(t.String()),
      }),
    },
  );
