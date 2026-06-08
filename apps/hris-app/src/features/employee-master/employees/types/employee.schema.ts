import { z } from 'zod'
import { EmployeeType, GenderType, MaritalStatus } from './enum'

/** "yyyy-MM-dd" (C# DateOnly). */
export const dateOnly = z.iso.date();

/**
 * ISO 8601 date-time (C# DateTime).
 * System.Text.Json may emit values without a timezone (Kind=Unspecified),
 * with "Z" (Utc), or with an offset (Local) — accept all three.
 */
export const dateTime = z.iso.datetime({ offset: true, local: true });



export const employeeSchema = z.object({
  type: z.enum(EmployeeType),
  prefix: z.string(),
  firstName: z.string().min(1, "First name is required.").max(100),
  middleName: z.string().max(100),
  lastName: z.string().min(1, "Last name is required.").max(100),
  suffix: z.string(),
  gender: z.enum(GenderType),
  maritalStatus: z.enum(MaritalStatus),
  birthday: dateTime,
  religion: z.string().nullish(),
  birthPlace: z.string().max(200).nullish(),
  emailAddress: z.string().nullish().pipe(z.email("Email address is not valid.")),
  phoneNumber: z.string().min(1, "Phone number is required.").max(20),
  mobileNumber: z.string().min(1, "Mobile number is required.").max(20),
  nationality: z.string().min(1, "Nationality is required.").max(100),
  region: z.string().min(1, "Region is required.").max(100),
  bloodType: z.string().nullish(),
  country: z.string().min(1, "Country is required.").max(100),
  spouseName: z.string().nullish(),
  spouseJobTitle: z.string().nullish(),
  spouseCompany: z.string().nullish(),
  spouseBirthday: dateTime.nullish(),
  sssNo: z.string().nullish(),
  philHealthNo: z.string().nullish(),
  tinNo: z.string().nullish(),
  pagIbigNo: z.string().nullish(),
  bankAccountNo: z.string().nullish(),
  passportNo: z.string().nullish(),
  passportExpiry: dateTime.nullish(),
})

export type IEmployeeModel = z.infer<typeof employeeSchema>

export const employeeDefaultValues: IEmployeeModel = {
  type: 0,
  prefix: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  gender: 0,
  maritalStatus: 0,
  birthday: '',
  religion: '',
  birthPlace: '',
  emailAddress: '',
  phoneNumber: '',
  mobileNumber: '',
  nationality: '',
  region: '',
  bloodType: '',
  country: '',
  spouseName: '',
  spouseJobTitle: '',
  spouseCompany: '',
  spouseBirthday: undefined,
  sssNo: '',
  philHealthNo: '',
  tinNo: '',
  pagIbigNo: '',
  bankAccountNo: '',
  passportNo: '',
  passportExpiry: '',
}
