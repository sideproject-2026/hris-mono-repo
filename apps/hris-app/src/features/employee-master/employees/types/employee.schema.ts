import { z } from 'zod'
import { AddressType, EmployeeRank, EmployeeType, GenderType, MaritalStatus } from './enum'

/** "yyyy-MM-dd" (C# DateOnly). Accepts a Date object or an ISO date string. */
export const dateOnly = z.preprocess(
  (val) => (val instanceof Date ? val.toLocaleDateString('en-CA') : val),
  z.iso.date(),
);

/**
 * ISO 8601 date-time (C# DateTime).
 * System.Text.Json may emit values without a timezone (Kind=Unspecified),
 * with "Z" (Utc), or with an offset (Local) — accept all three.
 */
export const dateTime = z.iso.datetime({ offset: true, local: true });

export const employeeSchema = z.object({
  type: z.union([z.enum(EmployeeType), z.string().transform(Number).pipe(z.enum(EmployeeType))]),
  prefix: z.string(),
  firstName: z.string().min(1, "First name is required.").max(100),
  middleName: z.string().max(100),
  lastName: z.string().min(1, "Last name is required.").max(100),
  suffix: z.string(),
  gender: z.union([z.enum(GenderType), z.string().transform(Number).pipe(z.enum(GenderType))]),
  maritalStatus: z.union([z.enum(MaritalStatus), z.string().transform(Number).pipe(z.enum(MaritalStatus))]),
  birthday: dateOnly,
  religion: z.string().nullish(),
  birthPlace: z.string().max(200).nullish(),
  emailAddress: z.union([z.email("Email address is not valid."), z.literal(''), z.null(), z.undefined()]),
  phoneNumber: z.string().min(1, "Phone number is required.").max(20),
  mobileNumber: z.string().min(1, "Mobile number is required.").max(20),
  nationality: z.string().min(1, "Nationality is required.").max(100),
  region: z.string().min(1, "Region is required.").max(100),
  bloodType: z.string().nullish(),
  country: z.string().min(1, "Country is required.").max(100),
  spouseName: z.string().nullish(),
  spouseJobTitle: z.string().nullish(),
  spouseCompany: z.string().nullish(),
  spouseBirthday: dateOnly.or(z.literal('')).nullish(),
  sssNo: z.string().nullish(),
  philHealthNo: z.string().nullish(),
  tinNo: z.string().nullish(),
  pagIbigNo: z.string().nullish(),
  bankAccountNo: z.string().nullish(),
  passportNo: z.string().nullish(),
  passportExpiry: dateOnly.or(z.literal('')).nullish(),
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
  spouseBirthday: null,
  sssNo: '',
  philHealthNo: '',
  tinNo: '',
  pagIbigNo: '',
  bankAccountNo: '',
  passportNo: '',
  passportExpiry: null,
}

export const employeeCompanySchema = z.object({
  companyCode: z.string().min(1, 'Company is required.'),
  branch: z.string().min(1, 'Branch is required.'),
  departmentCode: z.string().min(1, 'Department is required.'),
  designationCode: z.string().min(1, 'Designation is required.'),
  managerId: z.string().nullish(),
  localNo: z.string().nullish(),
  rank: z.union([z.enum(EmployeeRank), z.string().transform(Number).pipe(z.enum(EmployeeRank))]),
  dateHired: dateOnly,
  probStartDate: dateOnly.nullish(),
  probEndDate: dateOnly.nullish(),
  accreditation: dateOnly.nullish(),
  deaccreditation: dateOnly.nullish(),
})

export type IEmployeeCompanyModel = z.infer<typeof employeeCompanySchema>

export const employeeCompanyDefaultValues: IEmployeeCompanyModel = {
  companyCode: '',
  branch: '',
  departmentCode: '',
  designationCode: '',
  managerId: null,
  localNo: '',
  rank: 0,
  dateHired: '',
  probStartDate: null,
  probEndDate: null,
  deaccreditation: null,
  accreditation:null
}

export const addressSchema = z.object({
    addressId: z.string().nullish(),
    type: z.union([z.enum(AddressType), z.string().transform(Number).pipe(z.enum(AddressType))]),
    street: z.string().min(5, "Street is required"),
    region: z.string().min(1, "Region is required"),
    province: z.string().min(5, "Province is required"),
    municipality: z.string().min(5, "Municipality is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    country: z.string().min(5, "Country is required"),
})

export type IAddressModel = z.infer<typeof addressSchema>

export const addressDefaultValues: IAddressModel = {
  addressId: null,
  type: 0,
  street: '',
  region: '',
  province: '',
  municipality: '',
  zipCode: '',
  country: '',
}