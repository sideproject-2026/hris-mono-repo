import { PAGINATION_DEFAULTS } from "@/components/custom/grid/types/constants";
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

export const searchRequestFormSchema = z.object({
    pageSize: z.coerce.number().int().min(1).max(100).default(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
    pageNumber: z.coerce.number().int().min(1).default(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
    fieldValue: z.string().optional(),
    fieldName: z.string().optional(),
    requestFor: z.string().optional(),
})


export const syncRequestFormSchema = z.object({
    month: z.coerce.number().min(1).max(12, "Month must be between 1 and 12"),
    year: z.coerce.number().min(2000, "Year must be 2000 or later"),
});

export type RequestFormSchemaType = z.infer<typeof requestFormSchema>
export type SearchRequestFormSchemaType = z.infer<typeof searchRequestFormSchema>
export type SyncRequestFormSchemaType = z.infer<typeof syncRequestFormSchema>

export type RequestFormPayloadType = Omit<RequestFormSchemaType, 'dateFrom' | 'dateTo'> & {
    dateFrom?: string
    dateTo?: string
}

