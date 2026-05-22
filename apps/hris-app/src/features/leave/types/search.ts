import { PAGINATION_DEFAULTS } from "@/components/custom/grid/types/constants";
import { parseAsInteger, parseAsString } from "nuqs";
import { z } from "zod";

export const searchLeaveBalanceSchema = z.object({
    pageNumber: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(10),
    fieldName: z.string().optional(),
    fieldValue: z.string().optional(),
})

export type SearchLeaveBalanceSchemaType = z.infer<typeof searchLeaveBalanceSchema>

export const searchLeaveBalanceParser = {
    pageSize: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
    pageNumber: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
    fieldName: parseAsString.withDefault(''),
    fieldValue: parseAsString.withDefault(''),
}