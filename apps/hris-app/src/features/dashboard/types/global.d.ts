declare type DashboardCalendarHoliday = {
    id: string
    holidayName: string
    holidayDate: string
    holidayType: string
    isActive: boolean
    branch: string
}

declare type DashboardCalendarBirthday = {
    id: string
    fullName: string
    birthDate: Date
}

declare type DashboardSummary = {
    classifications: DashboardClassfication[]
    types: DashboardType[]
}

declare type DashboardClassfication = {
    employeeClassification: number
    employeeClassificationDescription: string
    count: number
}

declare type DashboardType = {
    employeeType: number
    employeeTypeDescription: string
    count: number
}

declare type DashboardProbitionaryTypes = {
    employeeId: string
    employeeName: string
    department: string
    company: string
    fromDate: string
    endDate: string
    totalDayProbationary: number
    totalDayRemaining: number
}

declare type DashboardResignationTypes = {
    employeeId: string
    employeeName: string
    designation: string
    department: string
    company: string
    dateResign: string
    effectivityDate: string
}