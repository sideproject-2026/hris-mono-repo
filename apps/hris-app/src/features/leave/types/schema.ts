import z from "zod";

export const leaveAdjustmentSchema = z.object({
    employeeId: z.coerce.number(),
    leaveEntitlement: z.coerce.number(),
    stockInOut: z.coerce.number(),
    referenceNo: z.string(),
    quantity: z.coerce.number(),
    remarks: z.string().optional(),
})

export type LeaveAdjustmentSchemaType = z.infer<typeof leaveAdjustmentSchema>