import { Elysia } from "elysia";
import { clerkAuth } from "@/libs/auth";
import DBTransaction from "@/util/withDatabase";
import { HistoryResponseSchema } from "@/types/global.types";

export const historyController = new Elysia({ prefix: "/history" })
  .use(clerkAuth)
  .get(
    "/",
    async ({ clerk_id, set }) => {
      if (!clerk_id) {
        set.status = 401;
        return {
          success: false,
          message: "Unauthorized",
          data: [],
        };
      }
      try {
        const result = await DBTransaction(async (client) => {
          const userQuery = await client.query(
            "SELECT id FROM users WHERE clerk_id = $1",
            [clerk_id],
          );
          const user = userQuery.rows[0];

          if (!user) {
            return {
              success: false,
              status: 404,
              message: "User not found",
            };
          }

          const resumesQuery = await client.query(
            `SELECT id, job_description, original_text, generated_json, ats_score_before, ats_score_after, created_at
        FROM resumes WHERE user_id = $1 ORDER BY created_at DESC`,
            [user.id],
          );

          return {
            success: true,
            message: "History retrieved successfully",
            data: resumesQuery.rows,
          };
        });

        return result;
      } catch (error) {
        console.error("Error fetching history:", error);
        return {
          success: false,
          status: 500,
          message: "Internal Server Error",
        };
      }
    },
    {
      response: HistoryResponseSchema,
    },
  );
