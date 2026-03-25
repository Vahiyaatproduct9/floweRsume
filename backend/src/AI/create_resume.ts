import { write } from "bun";
import { generate } from "./initialize";

export default async function ({
  resumeText,
  jobDescription,
}: {
  resumeText: string;
  jobDescription?: string;
}) {
  const final_query = `
    Here is the text extracted from resume:
    ${resumeText};
    =======================================
    ${jobDescription ? `Here is the Job Description:\n ${jobDescription}` : ""}
  `;
  const instructionBuffer = await Bun.file(
    "src/prompts/create_resume.md",
  ).arrayBuffer();
  const decoder = new TextDecoder();
  const systemInstruction = decoder.decode(instructionBuffer);
  const response = await generate({
    query: final_query,
    systemInstruction,
  });
  await write("sample-response.txt", `${response}`);
  return response.text;
}
