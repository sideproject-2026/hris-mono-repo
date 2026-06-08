export interface EmployeeListModel {
  id: string;
  employeeNumber: number;
  employeeType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  dateHired: string | null;
  probStartDate: string | null;
  probEndDate: string | null;
  lengthOfService: string;
  probationaryRemaining: string;
  designation: string;
  department: string;
  companyCode: string;
  companyName: string;
  branch: string | null;
  employeeCode: string;
  photoFile: string;
  path: string;
  status: string;
}

export interface EmployeeModel {
  id: string;
   type: CodeValue;
   employeeNumber: number;
   prefix: string;
   firstName: string;
   middleName: string;
   lastName: string;
   suffix: string;
   fullName: string;
   gender: CodeValue;
   maritalStatus: CodeValue;
   religion: string | null;
   designationCode: string | null;
   designationName: string | null;
   rank: CodeValue;
   birthday: string;
   birthPlace: string;
   age: number;
   personalEmailAddress: string;
   businessEmailAddress: string;
   phoneNumber: string;
   mobileNumber: string;
   nationality: string;
   region: string;
   bloodType: string;
   country: string;
   spouseFullName: string | null;
   spouseJobTitle: string | null;
   spouseCompany: string | null;
   spouseBirthday: string | null;
   sssNo: string;
   philhealthNo: string;
   tinNo: string;
   pagIbiNo: string;
   bankAccountNo: string;
   passportNo: string;
   passportExpiry: string;
   companyCode: string | null;
   companyName: string | null;
   branch: string | null;
   employeeCode: string | null;
   departmentCode: string | null;
   departmentName: string | null;
   managerId: string;
   managerName: string | null;
   localNo: string | null;
   dateHired: string | null;
   probStartDate: string | null;
   probEndDate: string | null;
   regularDate: string | null;
   lengthOfStay: Duration;
   probationaryRemaining: Duration;
   poeaRegister: PoeaRegister;
   endOfService: EndOfService;
   photoFile: string;
   path: string;
   status: CodeValue;
}

export interface Duration {
   years: number;
   months: number;
   days: number;
}

export interface PoeaRegister {
   accredited: string | null;
   deAccredited: string | null;
   referenceNo: string | null;
   isActive: boolean;
}

export interface EndOfService {
   endOfServiceDate: string | null;
   notes: string | null;
   isEligableToRehire: boolean;
   rehireDate: string | null;
}

export interface LengthOfStay {}



export type EmployeeAddressesResponse = {
    id: string
    type: CodeValue
    number: string
    street: string
    region: string
    province: string
    city: string
    zipCode: string
    country: string
}


export type EmergencyContactResponse = {
   id: string;
   name: string;
   relationship: string;
   phoneNumber: string;
   email: string | null;
}

export type EmployeeDocumentResponse = {
  id: string;
  type: CodeValue;
  documentNumber: string;
  description: string;
  issueDate: string;
  expiryDate: string | null;
  filePath: string;
}

export type WorkExperienceResponse = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
}

export type EmployeeEducationResponse = {
  id: string;
  level: CodeValue; // EnumDto<T> defined earlier
  school: string;
  degree: string;
  fieldOfStudy: string | null;
  startYear: number;
  graduationYear: number | null;
  honors: string | null;
}


export type AllInformationResponse = {
    address: EmployeeAddressesResponse[] | null
    educations: EmployeeEducationResponse[] | null
    emergencyContacts: EmergencyContactResponse[] | null
    workExperiences: WorkExperienceResponse[] | null
}