import * as z from 'zod'

export const registerSchema = z.object({
    employeeId: z.coerce.number().positive("Employee ID is required"),
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    emailAddress: z.email("Email Address is required"),
})


export const authSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export type AuthFormValues = z.infer<typeof authSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;