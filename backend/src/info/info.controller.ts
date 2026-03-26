import { type Context } from "elysia";
import { DB } from "@/class/Database";

export const listHistory = async (ctx: Context) => {
  const { clerk_id } = ctx as any;
  if (!clerk_id) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized",
    };
  }
  const client = DB.pool;
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
};

export const getCredits = async (ctx: Context) => {
  const { clerk_id } = ctx as any;
  if (!clerk_id) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized",
    };
  }

  const client = DB.pool;
  const userQuery = await client.query(
    "SELECT credits FROM users WHERE clerk_id = $1",
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

  return {
    success: true,
    message: "Credits retrieved successfully",
    data: { credits: user.credits },
  };
};

export default {
  listHistory,
  getCredits,
};
