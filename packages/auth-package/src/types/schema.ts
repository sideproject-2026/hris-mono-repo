import { z } from "zod";

export const authSchema = z.object({
  company: z.string().optional(),
  userName: z.string().min(3, "Please enter a valid username"),
  password: z.string().min(3, "Please enter a valid password"),
  application: z.string().optional(),
});


export type AuthSchemaType = z.infer<typeof authSchema>;