
declare type ReportDataDefinition = {
  id: string
  title: string
  description: string
  parameters: ParameterConfig[]
  table: ReportTableDefinition
}


type ReportTableDefinition = {
  columns: { key: string; label: string; numeric?: boolean; size?: string }[]
  rows: Array<Record<string, string>>
  caption?: string
}

type ReportDefinition = {
  id: string
  title: string
  description: string
  parameters: ParameterConfig[]
  table: ReportTableDefinition
}

type ReportContentProps = {
  reportId?: string
  className?: string
}

type ReportViewerProps = {
  report: ReportDefinition
}

type ResolverShape = Record<string, string>


type DynamicParameter = {
  name: string
  label: string
  type: 'text' | 'select' | 'date' | 'special-combobox'
  placeholder?: string
  helperText?: string
  options?: { label: string; value: string }[]
}

declare type AbsentReportTypes = {
  employeeName: string
  department: string
  company: string
  period: string
  totalWorkingDays: number
  totalWorkingHours: number
  absent: number
}

declare type LUAPerEmployeeTypes = {
  employeeName: string
  department: string
  company: string
  period: string
  details: LUAPerEmployeeDetailsTypes[]
}

declare type LUAPerEmployeeDetailsTypes = {
  date: string
  day: string
  dayType: string
  scheduleTimeIn: string
  scheduleTimeOut: string
  timeIn: string
  timeOut: string
  workingHours: number
  lateMinute: number
  lateHour: number
  undertimeMinute: number
  undertimeHour: number
  absent: number
  regularOTHour: number
  regularOTMinute: number
  holidayOTHour: number
  holidayOTMinute: number
  restDayOTMinute: number
  weekendOTHour: number
  weekendOTMinute: number
  remarks: string
}


declare type OvertimeReportTypes = {
  employeeName: string
  department: string
  company: string
  period: string
  totalWorkingDays: number
  totalWorkingHours: number
  regularOvertime: string
  regularOvertimeMinute: number
  regularOvertimeHour: number
  holidayOvertime: string
  holidayOvertimeMinute: number
  holidayOvertimeHour: number
  restdayOvertime: string
  restdayOvertimeMinute: number
  restdayOvertimeHour: number
}
