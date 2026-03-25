import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../../env";
import type { AIParams } from "@/types/ai.types";

const defaultSystemInstruction = `You are a Helpful AI and excel at doing whatever the task is assking you to do.`;
async function generate(params: AIParams) {
  try {
    console.log("api key: ", GEMINI_API_KEY);
    const client = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: params.query,
      config: {
        systemInstruction: params.systemInstruction || defaultSystemInstruction,
      },
    });
    console.log(params.query);
    console.log(response.text);

    return response;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return {
      text: "Error generating AI response",
      error: error,
    };
  }
}

export { generate };
