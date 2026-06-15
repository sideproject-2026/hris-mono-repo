import { PAGINATION_DEFAULTS } from "@/components/custom/grid/types/constants";
import { parseAsBoolean, parseAsInteger, parseAsString } from "nuqs";

export type FilterSearchEmployeeType = {
  pageSize: number;
  pageNumber: number;
  fieldValue: string;
  fieldName: string;
  company: string;
  branch: string;
  department: string;
}

export const filterSearchEmployeeParser = {
  pageSize: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
  pageNumber: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
  fieldValue: parseAsString.withDefault(''),
  fieldName: parseAsString.withDefault(''),
  company: parseAsString.withDefault(''),
  branch: parseAsString.withDefault(''),
  department: parseAsString.withDefault(''),
  submitted: parseAsBoolean.withDefault(false),
} as const

