import { Elysia } from "elysia";
import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS = createRemoteJWKSet(
  new URL(`https://finer-owl-13.clerk.accounts.dev/.well-known/jwks.json`),
);

/**
 * Extracts the Clerk ID (sub claim) from the Authorization header.
 *
 * @param headers - The raw headers
 * @returns The clerk_id string or null if invalid.
 */
export async function getClerkId(headers: Record<string, unknown>) {
  const authorization = headers["authorization"];
  if (!authorization || typeof authorization !== "string")
    return {
      success: false,
      clerk_id: null,
    };
  const token = authorization.replace("Bearer ", "");
  if (!token)
    return {
      clerk_id: null,
      success: false,
    };

  const { payload } = await jwtVerify(token, JWKS);
  return {
    clerk_id: payload.sub as string,
    success: true,
  }; // this is the clerk user id
}

/**
 * clerkAuth plugin / middleware
 *
 * Uses 'getClerkIdFromHeader' to verify authentication and inject 'clerk_id'
 * into the request context for downstream handlers.
 */
export const clerkAuth = (app: Elysia) =>
  app.derive({ as: "global" }, async ({ request, set, headers }) => {
    const { clerk_id } = await getClerkId(headers);

    if (!clerk_id) {
      set.status = 401;
      return {
        success: false,
        status: 401,
        message: "UNAUTHORIZED: Missing or invalid authentication",
      };
    }

    // Add to the context as a derived property and to headers as requested
    set.headers["clerk_id"] = clerk_id;
    return { clerk_id };
  });
