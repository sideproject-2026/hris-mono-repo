import z from 'zod'

export const hrFormSchema = z.object({
    employeeId: z.string().nonempty('Employee ID is required'),
    type: z.coerce.number(),
    dateFiled: z.coerce.date(),
    effectivityDate: z.coerce.date(),
    description: z.string().nonempty('Description is required'),
    designationFrom: z.string().nullable().optional(),
    designationTo: z.string().nullable().optional(),
    departmentFrom: z.string().nullable().optional(),
    departmentTo: z.string().nullable().optional(),
    companyFrom: z.string().nullable().optional(),
    companyTo: z.string().nullable().optional(),
    branchFrom: z.string().nullable().optional(),
    branchTo: z.string().nullable().optional(),
    rank: z.coerce.number(),
    attachment: z.instanceof(File).nullable().optional(),
})

export type HRFormSchemaType = z.infer<typeof hrFormSchema>