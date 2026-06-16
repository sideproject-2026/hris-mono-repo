import z from 'zod'
import { HRFormType } from './enum'

// Per-employee detail row of an Employee Action Request.
export const hrFormDetailSchema = z.object({
  employeeId: z.string().nonempty('Employee is required'),
  dateHired: z.coerce.date().nullable().optional(),
  regularDate: z.coerce.date().nullable().optional(),
  probationStart: z.coerce.date().nullable().optional(),
  probationEnd: z.coerce.date().nullable().optional(),
  designationId: z.string().nullable().optional(),
  rank: z.coerce.number().nullable().optional(),
  companyId: z.string().nullable().optional(),
  branchId: z.string().nullable().optional(),
  departmentId: z.string().nullable().optional(),
  managerId: z.string().nullable().optional(),
  resignationType: z.coerce.number().nullable().optional(),
  lastWorkingDay: z.coerce.date().nullable().optional(),
  isEligibleForRehire: z.boolean().default(false),
})

export const hrFormCreateSchema = z
  .object({
    type: z.coerce.number(),
    effectiveDate: z.coerce.date(),
    justification: z.string().nonempty('Justification is required'),
    attachment: z.instanceof(File).nullable().optional(),
    details: z.array(hrFormDetailSchema).min(1, 'Add at least one employee'),
  })
  .superRefine((value, ctx) => {
    // Type-specific required fields per detail row.
    value.details.forEach((detail, index) => {
      const require = (field: keyof typeof detail, message: string) => {
        if (detail[field] === null || detail[field] === undefined || detail[field] === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['details', index, field],
            message,
          })
        }
      }

      switch (value.type) {
        case HRFormType.NewHire:
          require('dateHired', 'Date hired is required')
          require('probationStart', 'Probation start is required')
          require('probationEnd', 'Probation end is required')
          require('designationId', 'Designation is required')
          require('companyId', 'Company is required')
          require('branchId', 'Branch is required')
          require('departmentId', 'Department is required')
          break
        case HRFormType.ProbationExtension:
          require('probationStart', 'Probation start is required')
          require('probationEnd', 'Probation end is required')
          break
        case HRFormType.Regularization:
          require('regularDate', 'Regularization date is required')
          break
        case HRFormType.Transfer:
          require('designationId', 'Designation is required')
          require('companyId', 'Company is required')
          require('branchId', 'Branch is required')
          require('departmentId', 'Department is required')
          break
        case HRFormType.EndOfService:
          require('resignationType', 'Resignation type is required')
          require('lastWorkingDay', 'Last working day is required')
          break
        case HRFormType.ChangeDesignation:
          require('designationId', 'Designation is required')
          break
      }
    })
  })

export type HRFormDetailSchemaType = z.infer<typeof hrFormDetailSchema>
export type HRFormCreateSchemaType = z.infer<typeof hrFormCreateSchema>
