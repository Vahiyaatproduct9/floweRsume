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
      const { resumefile, resumetext, jobdescription, templateid } = body;

      let resumeText = resumetext || "";

      if (resumefile) {
        const arrayBuffer = await resumefile.arrayBuffer();
        const resume = pdfjsLib.getDocument(arrayBuffer);
        const resumeObject = await resume.promise;

        for (let i = 1; i <= resumeObject.numPages; i++) {
          const page = await resumeObject.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((t) => ("str" in t ? t.str : ""))
            .join(" ");
          resumeText += "\n" + pageText;

          const annotation = await page.getAnnotations();
          const links = annotation
            .filter((t) => t.subtype === "Link" && t.url)
            .map((t) => t.url)
            .join("\n");

          if (links) {
            resumeText += "\n" + links;
          }
        }
      }

      console.log("--- Analyze Endpoint Hit ---");
      console.log("Template ID:", templateid || "default (classic)");
      // console.log("Resume File Text Preview:", resumeText.substring(0, 100) + "...");
      console.log(
        "Job Description Preview:",
        jobdescription
          ? jobdescription.substring(0, 100) + "..."
          : "Not provided",
      );

      // const aiResponse = await create_resume({
      //   resumeText,
      //   jobDescription: jobdescription,
      // });
      // if (!aiResponse) {
      //   return {
      //     success: false,
      //     status: 500,
      //     message: "AI Response not found",
      //   };
      // }
      // const parsedResponse: AIResponse = JSON.parse(aiResponse);
      const parsedResponse: AIResponse = {
        name: "Kishor Dih",
        job_title: "Full Stack Developer",
        address: "Siliguri/Kolkata, WB",
        phone: "+91 87598 14731",
        email: "grishmadev@proton.me",
        github: "vahiyaatProduct9",
        linkedin: "kishor-dih",
        professional_summary:
          "Self Taught Programmer with Hands on Experience in Modern Stack like TypeScript, NodeJS, PostgreSQL, and React. Result Driven with experience across personal project and professional internship on creating, maintaining and optimizing Solutions.",
        skills: [
          "TypeScript",
          "NodeJS",
          "REST API",
          "AI Workflows",
          "React",
          "Docker",
          "React Native",
          "MongoDB",
          "PostgreSQL",
          "Prisma",
          "Python",
          "Git",
          "Framer Motion",
          "Express",
          "NestJS",
          "Render",
          "FuseJS",
          "Agile",
          "System Design",
          "Performance Optimization",
          "Strategy",
        ],
        education: [
          "Higher Secondary, Pursuing Computer Programming independently.",
        ],
        projects: [
          {
            title: "Ilyafy – An Audio sharing App for long distance couples.",
            points: [
              "Built a music sharing platform for couples allowing them to listen to music synchronously using Rest APIs & Websocket.",
              "Added Client-side Caching & processing to reduce Server CPU usage by ~90% and network traffic by ~30%.",
              "Used Redis for internal socket mappings to minimize Server Memory usage.",
              "Engineered a custom 'Adaptive Bitrate Streaming' based on Hysteresis method.",
            ],
          },
        ],
        experience: [
          {
            title: "Piston Technology - Junior Backend Developer Intern",
            points: [
              "Interned at Piston Tech as an onsite Junior Backend Developer.",
              "Followed Agile methodology and worked in sprints to deliver productive results.",
              "Optimized Backend System by cutting fetch times down to ~50%.",
            ],
          },
        ],
        honors: [
          "Winner at Tech Adrishta Web Development Category in Manipal Institute of Technology, 2023.",
        ],
        ats_score_before: 66,
        ats_score_after: 74,
        changes_made: [
          "Some changes were made to the resume to improve the AI's understanding of the job description.",
          "The AI's understanding of the job description was improved by analyzing the resume's structure and content.",
          "The AI's understanding of the job description was improved by analyzing the resume's structure and content.",
        ],
      };
      // const pdfFile = await generateResumePDF(parsedResponse);
      const pdfFile = await generateResumePDF(parsedResponse);
      const pdfbase64 = Buffer.from(pdfFile).toBase64();

      return {
        success: true,
        message: "Resume generated successfully",
        data: {
          pdf_base64: pdfbase64,
          ai_response: {
            ats_score_before: parsedResponse.ats_score_before,
            ats_score_after: parsedResponse.ats_score_after,
            changes_made: parsedResponse.changes_made,
          },
        },
      };
    },
    {
      body: t.Object({
        resumefile: t.Optional(t.File()),
        resumetext: t.Optional(t.String()),
        jobdescription: t.Optional(t.String()),
        templateid: t.Optional(t.String()),
      }),
    },
  );
