
declare type EmployeeSetupTypes = {
   attendancePolicy: AttendanceSetupPolicy
   attendancePolicyId: string
   branch: string
   classValue: string
   company: string
   dateEnd: string | null
   dateHired: string
   department: string
   designation: string
   employeeClass: number
   employeeCode: string
   employeeID: number
   employeeType: number
   firstName: string
   id: string
   lastName: string
   middleName: string
   prefix: string
   rank: string
   scheduleId: string
   typeValue: string
   workSchedule: WorkSchedule,
   isActive: boolean
}

declare type AttendanceSetupPolicy = {
   absenceThresholdHours: number
   description: string
   graceMinutes: number
   halfdayThresholdHours: number
   isActive: boolean
   lateThresholdMinutes: number
   name: string
   overTimeLimit: number
   undertimeThresholdMinutes: number
}

declare type WorkSchedule = {
   code: string
   id: string
   title: string
   description: string
   workDetails: Array<WorkDetails>
}

declare type WorkDetails = {
   active: boolean
   breakTime: number
   fixedSchedule: boolean
   scheduleDay: string
   standardHour: number
   timeIn: number
   timeOut: number
}

declare type EmployeSetupInitial = {
   workSchedules: Array<SelectionItem<string>>;
   policies: Array<SelectionItem<string>>;
   departments: Array<SelectionItem<string>>;
   companies: Array<SelectionItem<string>>;
   branches: Array<SelectionItem<string>>;
}

