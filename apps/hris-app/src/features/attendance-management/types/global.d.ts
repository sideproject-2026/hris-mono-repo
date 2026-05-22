
declare type AttendeeInfo = {
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
   lastName: string
   middleName: string
   id: string
   prefix: string
   rank: string
   scheduleId: string
   typeValue: string
   workSchedule: WorkSchedule,
   isActive: boolean
}



declare type AttendancePeriod = {
   id: string;
   name: string;
   description: string;
   periodType: string;
   periodFrom: Date;
   periodTo: Date;
   status: string;
   isAutomate: boolean;
   lastActivity?: Date;
   posted: boolean;
   headCount: number;
   user: {
      firstName: string;
      lastName: string;
      companyName: string;
      photo?: string;
   }
   sheets: Array<AttendanceSheet>;
}

declare type AttendanceSheet = {
   id: string;
   employeeNumber: number;
   avatar: {
      firstName: string;
      middleName: string;
      lastName: string;
      avatarPhoto: string | null;
   },
   company: string;
   department: string;
   branch: string;
   position: string;
   workSchedule: string;
   totalWorkingDays: number;
   totalOvertimeHours: string;
   totalLateMinutes: string;
   totalUndertimeMinutes: number;
   totalAbsentDays: number;
   totalRestdayOvertime: string;
   totalRegularOvertime: string;
   totalHolidayOvertime: string;
   regularOvertimeAdjustment: string;
   restdayOvertimeAdjustment: string;
   holidayOvertimeAdjustment: string;
   absentAdjustment: number;
   employeeSheet: Array<AttendanceSheetDetail>;
}

declare type AttendanceSheetDetail = {
   id: string;
   date: Date;
   weekDay?: string;
   timeIn: string | null;
   timeOut: string | null;
   scheduleTimeIn: string;
   scheduleTimeOut: string;
   actualWorkingHour: string;
   dtrStatus: string;
   earlyInMinute: string;
   lateOutMinute: string;
   lateMinute: string;
   underTimeMinute: string;
   absent: string;
   regularOvertime: string;
   restdayOvertime: string;
   holidayOvertime: string;
   isRestday?: boolean;
   isHoliday?: boolean;
   remarks?: string;
   calendarRemarks?: string;
}

declare interface AttendancePeriodQueryParams extends PageType {
   status?: string;
   fieldValue?: string;
   periodFrom?: string;
   periodTo?: string;
}

declare type PeriodInitialType = {
   employeeTypes: Array<SelectionItem<number>>;
   companies: Array<SelectionItem<string>>;
}

declare type OvertimePending = {
   requestNo: string;
   requestedDate: Date;
   approvedDate: Date | null;
   otDate: Date;
   weekDay: string;
   timeIn: string;
   timeOut: string;
   totalOT: string;
}


declare type DailyAttendanceSummaryReport = {
   employeeName: string
   department: string
   company: string
   period: string
   totalWorkingDays: number
   totalWorkingHours: number
   late: string
   lateMinutes: number
   lateHours: number
   undertime: string
   undertimeMinutes: number
   undertimeHours: number
   absent: number
}

declare type RequestDetail = {
   id: string
   employeeId: number
   requestNo: string
   requestFor: string
   requestDate: string
   dateFrom: string
   dateTo: string
   purpose: string
   referenceNo: string
   leaveRequest: LeaveRequest
   obRequest: ObRequest
   otRequest: OtRequest
   trRequest: TrRequest
   requestStatus: string
}

declare type LeaveRequest = {
   requestLeaveType: string
   leavePeriod: string
   paidLeave: boolean
   from: string
   to: string
   resumeDate: any
   purpose: string
}

declare type ObRequest = {
   obType: string
   from: string
   to: string
   purpose: string
}

declare type OtRequest = {
   otDate: string
   timeIn: string
   timeOut: string
   totalOT: string
   purpose: string
}

declare type TrRequest = {
   timeRequestType: string
   trDate: string
   timeIn: string
   timeOut: string
   purpose: string
}

declare type ReportInitial = {
   departments: SelectionItem;
   companies: SelectionItem;
}




