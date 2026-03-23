import { t } from "elysia";
import type { Static } from "elysia";

export const EmailAddressSchema = t.Object({
  email_address: t.String(),
  id: t.String(),
});

export const ClerkUserDataSchema = t.Object({
  id: t.String(),
  email_addresses: t.Array(EmailAddressSchema),
  first_name: t.Optional(t.Union([t.String(), t.Null()])),
  last_name: t.Optional(t.Union([t.String(), t.Null()])),
  username: t.Optional(t.Union([t.String(), t.Null()])),
});

export const createOrUpdateUserSchema = t.Object({
  type: t.Union([t.Literal("user.created"), t.Literal("user.updated")]),
  data: ClerkUserDataSchema,
});

export const deleteUserSchema = t.Object({
  type: t.Literal("user.deleted"),
  data: t.Object({
    id: t.String(),
  }),
});

export type CreateOrUpdateUserEvent = Static<typeof createOrUpdateUserSchema>;
export type DeleteUserEvent = Static<typeof deleteUserSchema>;
export type ClerkEvent = CreateOrUpdateUserEvent | DeleteUserEvent;
