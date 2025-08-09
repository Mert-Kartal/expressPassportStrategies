import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userUpdateSchema = z.object({
  email: z.string().email(),
});

export type UserAuthType = z.infer<typeof userAuthSchema>;
export type UserUpdateType = z.infer<typeof userUpdateSchema>;
