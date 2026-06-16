import { parseAsInteger, parseAsString } from 'nuqs'
import { number, z } from 'zod'
import type { inferParserType } from 'nuqs';
import { PAGINATION_DEFAULTS } from '@/components/custom/grid/types/constants';


export const attendanceManagementSearchSchema = z.object({
  pageSize: z.coerce.number().int().min(1).max(100).default(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
  pageNumber: z.coerce.number().int().min(1).default(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
  fieldValue: z.string().optional(),
  status: z.string().optional(),
  periodFrom: z.string().optional(),
  periodTo: z.string().optional(),
})

export type AttendanceManagementSearch = z.infer<typeof attendanceManagementSearchSchema>

export const attendanceManagementQueryParsers = {
  pageSize: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
  pageNumber: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
  fieldValue: parseAsString.withDefault(''),
  status: parseAsString.withDefault(''),
  periodFrom: parseAsString.withDefault(''),
  periodTo: parseAsString.withDefault(''),

} as const

export type AttendanceManagementQueryState = inferParserType<typeof attendanceManagementQueryParsers>

//attendance sheet search filters
export const filterSearchSheetSchema = z.object({
  fieldValue: z.string().optional(),
  department: z.string().optional(),
  company: z.string().optional(),
  branch: z.string().optional(),
})
export type FilterSearchAttendanceType = z.infer<typeof filterSearchSheetSchema>

export const filterSearchSheetParser = {
   
   fieldName: parseAsString.withDefault(''),
   fieldValue: parseAsString.withDefault(''),
   department: parseAsString.withDefault(''),
   company: parseAsString.withDefault(''),
   branch: parseAsString.withDefault(''),
} as const




