import { Elysia } from "elysia";
import { getClerkIdFromHeader, clerkAuth } from "../libs/auth";

/**
 * User Controller
 * 
 * Demonstrates the use of 'clerkAuth' middleware and the standalone 'getClerkIdFromHeader' function.
 */
export const userController = new Elysia({ prefix: "/user" })
  .use(clerkAuth) // This adds 'clerk_id' to the context for all routes in this prefix
  .get("/", async (ctx) => {
    // Accessing clerk_id directly from the context as derived by clerkAuth middleware
    const { clerk_id } = ctx;

    return {
      success: true,
      message: "User authentication successful",
      data: {
        clerk_id: clerk_id,
        // Demonstration of it being available in the derived context
        note: "clerk_id was extracted from header via middleware"
      }
    };
  })
  .get("/info", async (ctx) => {
    // Another route under /user using the same clerkAuth middleware
    return {
      success: true,
      message: "Retrieved user info",
      data: {
        id: ctx.clerk_id
      }
    };
  });
