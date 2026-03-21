import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../../env";

async function generate(query: string) {
  const client = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: query,
    config: {
      systemInstruction: "you are a helpful nerd friend.",
    },
  });
  console.log(query);
  console.log(response.text);
  return response;
}

export { generate };
