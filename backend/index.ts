import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { PORT } from "./env";
import { generateResumePDF } from "./src/templates/resume-1.template";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { generate } from "./src/AI/initialize";
import { DatabaseError } from "pg";
import { clerkWebhook } from "@/webhook/clerk";
import { userController } from "@/user/user.controller";
import { analysisController } from "@/analysis/analysis.controller";
import { infoRouter } from "@/info/info.router";

const app = new Elysia()
  .onRequest((ctx) => {
    console.log("ctx body:", JSON.stringify(ctx.request.body, null, 2));
    console.log("ctx method:", ctx.request.method);
  })
  .onError((err) => {
    const error = err.error;
    if (error instanceof TypeError) {
      console.error("Zod Error: ", error);
      err.set.status = 400;
      return {
        status: 400,
        message: "Invalid Input Data.",
      };
    }
    if (error instanceof DatabaseError) {
      console.error("Database Error: ", error);
      return {
        status: 500,
        message: "Whoops! Our Database is down.",
      };
    }
    console.error("Server Error: ", error);
    return {
      status: 500,
      message: "Internal Server Error",
    };
  })
  .mapResponse((ctx) => {
    const response = ctx.responseValue;

    if (
      response instanceof Response ||
      response instanceof Blob ||
      response instanceof ReadableStream
    ) {
      return response;
    }

    if (
      typeof response !== "object" ||
      response === null ||
      Array.isArray(response)
    ) {
      return response;
    }

    const res = response as any;
    ctx.set.status = res?.status;

    const isError = res?.status && res.status >= 400;

    return {
      ...res,
      success: res?.success ?? !isError,
      provider: "flowRsume :)",
    };
  })
  .use(
    cors({
      origin: "*",
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .use(clerkWebhook)
  .use(userController)
  .use(analysisController)
  .use(infoRouter)
  .get("/", async (ctx) => {
    const document = await generateResumePDF();
    Bun.write("path.pdf", document);
    return new Response(document, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=resume.pdf",
      },
    });
  })
  .get("/ai", async (ctx) => {
    const text = await generate({
      query: "hello",
      systemInstruction: "you are a helpful nerd friend.",
    });
    return text.text;
  })
  .get("/log", async (ctx) => {
    const pdfLoader = pdfjsLib.getDocument("path.pdf");
    let text = "";
    await pdfLoader.promise.then(async (pdf) => {
      const page1 = await pdf.getPage(1);
      const content = await page1.getTextContent();
      const pageText = content.items
        .map((t) => ("str" in t ? t.str : ""))
        .join(" ");
      text = pageText;
    });
    return text;
  })
  .listen(PORT);

console.log(
  `🌸 floweRsume server is running at ${app.server?.hostname}:${app.server?.port}`,
);
