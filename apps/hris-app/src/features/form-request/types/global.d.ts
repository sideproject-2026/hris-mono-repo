declare type FormRequestTypes = {
  id: string
  employeeId: number
  employeeProfile: EmployeeProfile
  requestNo: string
  requestFor: string
  requestDate: string
  dateFrom: string
  dateTo: string
  leaveRequest: LeaveRequest
  obRequest: ObRequest
  otRequest: OtRequest
  trRequest: TrRequest
  requestStatus: string
}

declare interface RequestFormQueryParams extends PageType {
  fieldName?: string
  fieldValue?: string
}

declare type EmployeeProfile = {
  firstName: string
  middleName: string
  lastName: string
  avatarPhoto: string
  designation: string
}
export interface LeaveRequest {
  requestLeaveType: string
  leavePeriod: string
  paidLeave: boolean
  from: string
  to: string
  resumeDate: Date
  purpose: string
}

export interface ObRequest {
  obType: string
  from: string
  to: string
  purpose: string
}

export interface OtRequest {
  otDate: string
  timeIn: string
  timeOut: string
  totalOT: string
  purpose: string
}

export interface TrRequest {
  timeRequestType: string
  trDate: string
  timeIn: string
  timeOut: string
  purpose: string
}

export interface LeaveBalanceType {
  leaveEntitlement: number
  description: string
  balance: number
}

declare type RequestFormInitial = {
  employees: SelectionItem
  requestForTypes: SelectionItem
  requestLeaveTypes: SelectionItem
  requestLeavePeriodTypes: SelectionItem
  requestTimeTypes: SelectionItem
  requestOBTypes: SelectionItem
}
