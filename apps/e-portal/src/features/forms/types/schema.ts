import z from "zod";

export const requestFormSchema = z.object({
    employeeId: z.coerce.number().min(1, "Employee is required"),
    requestFor: z.coerce.number(),
    dateFrom: z.date().optional(),
    dateTo: z.date().optional(),
    purpose: z.string(),
    requestTimeType: z.coerce.number().optional().nullable(),
    requestLeaveType: z.coerce.number().optional().nullable(),
    leavePeriodType: z.coerce.number().optional().nullable(),
    requestOBType: z.coerce.number().optional().nullable(),
    requestStatus: z.coerce.number().optional().nullable(),
    referenceNo: z.string().optional().nullable(),
    lateFiling: z.boolean().optional().nullable(),
})
export type RequestFormSchemaType = z.infer<typeof requestFormSchema>