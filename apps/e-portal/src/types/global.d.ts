

type UserProfileType = {
    employeeId: number
    employeeCode: string
    employeeCode2: string
    classification: string
    lastName: string
    firstName: string
    middleName: string
    suffix: string
    birthdate: string
    age: number
    gender: string
    workStatus: string
    dateHired: string
    dateEnd: string
    company: string
    branch: string
    department: string
    designation: string
    movementStatus: string
    photo: string
    rank: string
};


declare type LeaveSummaryType = {
    leaveTypeId: number
    leaveTypeName: string
    leaveCount: number
}

declare type OvertimeType = {
    employeeId: number
    timeIn: string
    timeOut: string
    otDate: string
    otStart: string
    otEnd: string
    otTime: string
    reqSources: string
}

declare type UndertimeType = {
    employeeId: number
    dtrDate: string
    dtrDay: string
    timeIn: string
    timeOut: string
    workTime: string
    lateInMinute: number
    underTimeMinute: number
}

declare type OvertimeType = {
    employeeId: number
    timeIn: string
    timeOut: string
    otDate: string
    otStart: string
    otEnd: string
    otMinutes: number
    otHours: number
}

type ApiResponse<T> = {
    currentPage: number,
    firstPage: number,
    lastPage: number,
    nextPage: number | null,
    previousPage: number | null,
    data: T
    pageSize: number
    status: number
}

declare type SelectionItem<T> = {
    value: T
    text: string
}