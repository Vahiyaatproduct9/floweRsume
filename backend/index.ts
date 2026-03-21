import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { PORT } from "./env";
import { generateResumePDF } from "./src/resume2.template";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { generate } from "./src/AI/initialize";

const app = new Elysia()
  .use(cors())
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
    const text = await generate(`
give me a code snippet in javascript with necessary
commenting that explains two pointers easily.
**ONLY GIVE BACK THE CODE**
if you can't return only code then return with nothing`);
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
