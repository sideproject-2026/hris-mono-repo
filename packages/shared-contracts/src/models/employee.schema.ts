import { z } from 'zod'

export const employeeSchema = z.object({
  type: z.number(),
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  suffix: z.string(),
  gender: z.number(),
  maritalStatus: z.number(),
  birthday: z.string(),
  birthPlace: z.string(),
  emaillAddress: z.string(),
  phoneNumber: z.string(),
  mobileNumber: z.string(),
  nationality: z.string(),
  region: z.string(),
  bloodType: z.string(),
  country: z.string(),
  spouseName: z.string(),
  spouseCompany: z.string(),
  spouseBirthday: z.unknown(),
  sssNo: z.string(),
  philHealthNo: z.string(),
  tinNo: z.string(),
  pagIbigNo: z.string(),
  bankAccountNo: z.string(),
})

export type IEmployeeModel = z.infer<typeof employeeSchema>
