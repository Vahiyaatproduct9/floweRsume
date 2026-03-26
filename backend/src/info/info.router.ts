import { clerkAuth } from "@/libs/auth";
import Elysia from "elysia";
import { getCredits, listHistory } from "./info.controller";

export const infoRouter = new Elysia({ prefix: "/info" })
  .use(clerkAuth)
  .get("/history", listHistory)
  .get("/credits", getCredits);
