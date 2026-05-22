
declare type AttendanceResult = {
    employeeNumber: number
    periodFrom: Date
    periodTo: Date
    details: AttendanceDetailType[]
}

declare type AttendanceDetailType = {
    employeeId: number
    employeeCode: string
    date: Date
    timeIn: string
    timeOut: string
    late: string
    absent: number
    undertime: string
}