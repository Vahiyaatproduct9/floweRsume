const PORT = process.env.PORT!;
if (!PORT) {
  throw new Error("PORT is not declared.");
}
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not declared.");
}
const WEBHOOK_SECRET = "somethin";
if (!WEBHOOK_SECRET) {
  throw new Error("WEBHOOK_SECRET is not declared.");
}
export { PORT, GEMINI_API_KEY, WEBHOOK_SECRET };
