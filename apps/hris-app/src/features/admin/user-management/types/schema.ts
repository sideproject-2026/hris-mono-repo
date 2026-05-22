import z from "zod";

export const userManagementSchema = z.object({
    userName: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long").optional().or(z.literal("")),
    employeeId: z.coerce.number(),
    firstName: z.string(),
    lastName: z.string(),
    companyName: z.string(),
    department: z.string(),
    jobTitle: z.string(),
    photo: z.string().optional().nullable(),
    userLevel: z.coerce.number(),
    emailAddress: z.string().email("Invalid email address"),
    userRoles: z.array(z.string()).default([]),
})


export const userManagementAccessSchema = z.object({
    roleNames: z.array(z.string()).default([]),
    accessNames: z.array(z.string()).default([]),
})

export const userManagementResetPasswordSchema = z.object({
    userName: z.string(),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    newPasswordConfirmation: z.string().min(8, "Password must be at least 8 characters long"),
})

export type UserManagementSchema = z.infer<typeof userManagementSchema>;
export type UserManagementAccessSchema = z.infer<typeof userManagementAccessSchema>;
export type UserManagementResetPasswordSchema = z.infer<typeof userManagementResetPasswordSchema>;
