import {
  createOrUpdateUserSchema,
  deleteUserSchema,
  CreateOrUpdateUserEvent,
  DeleteUserEvent,
} from "../types/global.types";
import { PoolClient } from "pg";
import { Value } from "@sinclair/typebox/value";

const userService = (event: any) => async (client: PoolClient) => {
  // Optional logging
  if (process.env.NODE_ENV === "development") {
    try {
      await Bun.write(
        "data/clerk-user-info.json",
        JSON.stringify(event, null, 2)
      );
      console.log("Clerk event logged to data/clerk-user-info.json");
    } catch (e) {
      // Ignore if directory doesn't exist
    }
  }

  const { type } = event;

  if (type === "user.created") {
    if (!Value.Check(createOrUpdateUserSchema, event)) {
      return { status: 400, message: "Invalid user.created event data" };
    }
    const { data } = event as CreateOrUpdateUserEvent;
    const { id, email_addresses } = data;
    const email = email_addresses[0]?.email_address || null;

    if (!email) {
      return { status: 400, message: "User has no email address" };
    }

    // Check if user exists
    const userExists = (
      await client.query("SELECT 1 FROM users WHERE clerk_id = $1", [id])
    ).rows[0];

    if (userExists) {
      return { status: 400, message: "User already exists" };
    }

    // Insert user (free tier gets 3 credits by default from schema)
    await client.query(
      "INSERT INTO users(clerk_id, email) VALUES ($1, $2) RETURNING id, email",
      [id, email]
    );

  } else if (type === "user.updated") {
    if (!Value.Check(createOrUpdateUserSchema, event)) {
      return { status: 400, message: "Invalid user.updated event data" };
    }
    const { data } = event as CreateOrUpdateUserEvent;
    const { id, email_addresses } = data;
    const email = email_addresses[0]?.email_address || null;

    await client.query(
      "UPDATE users SET email = $2 WHERE clerk_id = $1",
      [id, email]
    );

  } else if (type === "user.deleted") {
    if (!Value.Check(deleteUserSchema, event)) {
      return { status: 400, message: "Invalid user.deleted event data" };
    }
    const { data } = event as DeleteUserEvent;
    const { id } = data;

    await client.query("DELETE FROM users WHERE clerk_id = $1", [id]);

  } else {
    return { status: 400, message: "Unsupported event type" };
  }

  const verb =
    type === "user.created"
      ? "created"
      : type === "user.updated"
      ? "updated"
      : "deleted";

  return {
    message: `User ${verb} successfully`,
    status: type === "user.created" ? 201 : 200,
  };
};

export default userService;
