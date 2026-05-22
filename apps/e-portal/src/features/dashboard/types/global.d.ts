declare type DtrSummaryType = {
    periodStart: Date
    periodEnd: Date
    dtrSummaries: DtrSummariesType[]
}

declare type DtrSummariesType = {
    employeeId: number
    totalDaysWorked: number
    totalNoDtr: number
    totalLateInMinutes: number
    totalUnderTimeInMinutes: number
    totalOverTimeInMinutes: number
}

declare type RequestStatusType = {
    employeeId: string
    requestNo: string
    requestDate: string
    requestFor: number
    requestType: number
    purpose: string
    flag: string
    leaveType: number
    leavePay: number
    dateStampIn: string
    dateStampEnd: string
    approved1: string | null
    approved1Date: string | null
    approved2: string | null
    approved2Date: string | null
    approved3: string | null
    approved3Date: string | null
    approved4: string | null
    approved4Date: string | null
}
