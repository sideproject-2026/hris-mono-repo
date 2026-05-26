import { z } from "zod";

export const authSchema = z.object({
  userName: z.string().min(3, "Please enter a valid username"),
  password: z.string().min(3, "Please enter a valid password"),
  application: z.string().optional(),
});


export const forgotPasswordSchema = z.object({
  userName: z.string().min(3, "Please enter a valid username"),
});

export const resetPasswordSchema = z.object({
  code: z.string().min(6, "Please enter a valid code"),
  userName: z.string().optional(),
  newPassword: z.string().min(6, "Please enter a valid password"),
  newPasswordConfirmation: z.string().min(6, "Please enter a valid password"),
}).refine((data) => data.newPassword === data.newPasswordConfirmation, {
  message: "Passwords do not match",
  path: ["newPasswordConfirmation"],
})

export type AuthSchemaType = z.infer<typeof authSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;