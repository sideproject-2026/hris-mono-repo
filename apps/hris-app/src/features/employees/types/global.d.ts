declare type EmployeeProfileInfo = {
    id: string
    type: number
    classification: number
    name: Name
    birth: Birth
    contact: Contact
    gender: number
    civilStatus: number
    nationality: string
    bloodType: string
    religion: string
    dateHire: Date
    governmentId: GovernmentId
    spouse: Spouse
    company: Company
    active: ActiveTypes
    hasPhoto: boolean
}

declare type Name = {
    prefix: string
    firstName: string
    middleName: string
    lastName: string
    suffix: string
    nickName: string
}

declare type Birth = {
    dateOfBirth: Date | undefined
    placeOfBirth: string
    age: number
}

declare type Contact = {
    primaryTelNo: string
    secondaryTelNo: string
    mobileNo: string
    personalEmailAddress: string
}

declare type GovernmentId = {
    sssNo: string
    tinNo: string
    philhealthNo: string
    pagIbigNo: string
    passportNo: string
    issueDate: Date
    expiryDate: Date
    payrollAccountNo: string
}

declare type Spouse = {
    fullName: string
    jobTitle: string
    dateOfBirth: Date
}

declare type Company = {
    employeeCode: string
    emailAddress: string
    localNo: string
    designationId: string
    designationName: string
    departmentId: string
    departmentName: string
    companyId: string
    companyName: string
    branchId: string
    branchName: string
    managerId: string
    managerName: string
    accreditedDate: Date
    deAccreditedDate: Date
}

declare type ActiveTypes = {
    active: boolean
    dateResigned: string
    probationaryStartDate: string
    probationaryEndDate: string
    regularizationDate: string
    referenceNo: string
    reHired: boolean
    resignedReason: string
}

declare type EmployeeAddressesTypes = {
    id: string
    addressType: number
    type: string
    street: string
    region: string
    province: string
    municipality: string
    zipCode: string
    country: string
}

declare type EmployeeEmergencyContactTypes = {
    id: string
    relation: string
    contactPerson: string
    address: string
    telNo: string
}

declare type EmployeeWorkExperienceTypes = {
    id: string
    companyName: string
    address: string
    jobTitle: string
    startDate: Date
    endDate: Date
    reason: string
}

declare type EmployeeEducationTypes = {
    id: string
    educationLevel: number
    level: string
    school: string
    course: string
    yearFrom: number
    yearTo: number
    awards: string
    attachment: string
    reason: string
}

declare type EmployeeActiveTypes = {
    id: string
    photo: string | null
    employeeCode: string
    type: string
    classification: string
    fullName: string
    designation: string
    department: string
    company: string
    branch: string
    manager: string
    status: boolean
    dateHired: Date
    dateRegular: Date | null
}

declare type EmployeeLeaveHistoryTypes = {
    leaveEntitlement: string
    year: number
    openingQty: number
    usedQty: number
    holdQty: number
    totalBalance: number
}

declare type EmployeeMovementTypes = {
    id: string
    type: number
    dateFrom: Date
    dateTo: Date
    description: string
    designationFrom: string
    designationTo: string
    companyFrom: string
    companyTo: string
    departmentFrom: string
    departmentTo: string
    branchFrom: string
    branchTo: string
}

declare type EmployeeInitials = {
    classes: SelectionItem
    types: SelectionItem
    genders: SelectionItem
    nationalities: SelectionItem
    civilStatus: SelectionItem
    educationalLevels: SelectionItem
    addressTypes: SelectionItem
    designations: SelectionItem
    companies: SelectionItem
    departments: SelectionItem
    branches: SelectionItem
}