declare type SearchUserManagementTypes = {
    id: string
    userName: string
    employeeId: number
    companyName: string
    lastName: string
    firstName: string
    department: string
    jobTitle: string
    emailAddress: string
    mobileNo: string
    userLevel: number
    photo: string
    signature: string
    isActive: boolean
}

declare type UserManagement = {
    id: string
    userName: string
    employeeId: number
    companyName: string
    manager: string
    lastName: string
    firstName: string
    department: string
    jobTitle: string
    email: string
    mobileNo: any
    userLevel: number
    photo: string
    signature: string
    roles: string[] | SelectionItem<string>[]
    claims: string[] | SelectionItem<string>[]
}

declare type UserManagementSelection = {
    departments: SelectionItem<string>[]
    companies: SelectionItem<string>[]
    designations: SelectionItem<string>[]
    roles: SelectionItem<string>[]
}