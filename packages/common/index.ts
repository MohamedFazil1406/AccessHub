import { z } from "zod";

export const UserRoleSchema = z.enum(["USER", "ADMIN"]);

export const SignUpSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string(),
  role: UserRoleSchema,
});

export const SignInSchema = z.object({
  username: z.string().min(3).max(10),
  password: z.string(),
  role: UserRoleSchema,
});

export const ResourceSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
});

export const UpdateResourceSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
});
