import { PAGINATION_DEFAULTS } from "@/components/custom/grid/types/constants";
import { parseAsInteger, parseAsString } from "nuqs";

export type EmployeeSearchTypes = {
    activeTab: string;
    id: string;
    employeeType: string;
    employeeClass: string;
    company: string;
    branch: string;
    department: string;
}

export const employeeSearchInitialParser = {
    activeTab: parseAsString.withDefault('personal-information'),
    id: parseAsString.withDefault(''),
    pageNumber: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
    pageSize: parseAsInteger.withDefault(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
    fieldName: parseAsString.withDefault(''),
    fieldValue: parseAsString.withDefault(''),
    employeeType: parseAsInteger.withDefault(0),
    employeeClass: parseAsInteger.withDefault(0),
    company: parseAsString.withDefault(''),
    branch: parseAsString.withDefault(''),
    department: parseAsString.withDefault(''),
}