import { parseAsBoolean, parseAsInteger, parseAsString } from "nuqs";
import { z } from "zod";
import { PAGINATION_DEFAULTS } from "@/components/custom/grid/types/constants";


export const requestFilterSchema = z.object({
    pageNumber: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(10),
    fieldValue: z.string().optional(),
    fieldName: z.string().optional(),
    requestFor: z.string().optional(),
});

export type RequestFilterSchemaType = z.infer<typeof requestFilterSchema>

export const filterSearchRequestParser = {
    pageSize: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
    pageNumber: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
    fieldValue: parseAsString.withDefault(''),
    fieldName: parseAsString.withDefault(''),
    requestFor: parseAsString.withDefault(''),
    submitted: parseAsBoolean.withDefault(false),
}
