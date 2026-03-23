import { Elysia, t } from "elysia";

/**
 * Analysis Controller
 *
 * Handles resume analysis requests.
 */
export const analysisController = new Elysia({ prefix: "/analyze" }).post(
  "/",
  async (ctx) => {
    const { body } = ctx;
    const { resumefile, resumetext, jobdescription } = body;

    console.log("--- Analyze Endpoint Hit ---");
    console.log(
      "Resume File:",
      resumefile ? (resumefile as File).name : "Not provided",
    );
    console.log("Resume Text:", resumetext || "Not provided");
    console.log("Job Description:", jobdescription || "Not provided");

    return {
      success: true,
      message: "Analysis request received successfully",
      data: {
        fileName: resumefile ? (resumefile as File).name : null,
        textProvided: !!resumetext,
        jdProvided: !!jobdescription,
      },
    };
  },
  {
    body: t.Object({
      resumefile: t.Optional(t.File()),
      resumetext: t.Optional(t.String()),
      jobdescription: t.Optional(t.String()),
    }),
  },
);
