import * as z from "zod";
import { parseAsInteger, parseAsString } from "nuqs";
import { PAGINATION_DEFAULTS } from "@/components/custom/grid/types/constants";


export const employeeSchema = z.object({
   class: z.coerce.number().int().nonnegative(),
   type: z.coerce.number().int().nonnegative(),
   firstName: z.string().min(1, "First name is required"),
   middleName: z.string().optional(),
   lastName: z.string().min(1, "Last name is required"),
   prefix: z.string().optional(),
   company: z.string().min(1, "Company is required"),
   branch: z.string().min(1, "Branch is required"),
   department: z.string().min(1, "Department is required"),
   designation: z.string().min(1, "Designation is required"),
   rank: z.string().optional(),
   dateHired: z.coerce.date().max(new Date(), "Date hired cannot be in the future"),
   dateEnd: z.coerce.date().optional(),
   scheduleId: z.string().optional(),
   attendancePolicyId: z.string().optional(),
})

export const filterSearchEmployeeSchema = z.object({
   pageSize: z.coerce.number().int().min(1).max(100).default(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
   pageNumber: z.coerce.number().int().min(1).default(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
   fieldName: z.string().optional(),
   fieldValue: z.string().optional(),
   company: z.string().optional(),
   branch: z.string().optional(),
   department: z.string().optional(),
});


export const employeeSetupSchema = z.object({
   scheduleId: z.string(),
   attendancePolicyId: z.string(),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
export type FilterSearchEmployee = z.infer<typeof filterSearchEmployeeSchema>;
export type EmployeeSetupValues = z.infer<typeof employeeSetupSchema>;