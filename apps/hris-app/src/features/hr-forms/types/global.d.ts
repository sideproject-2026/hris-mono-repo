declare type HRFormTypes = {
  id: string
  type: string
  employeeId: string
  fullName: string
  documentNo: string
  dateFiled: string
  effectiivtyDate: string
  description: string
  designationFrom: string
  designationTo: string
  companyFrom: string
  companyTo: string
  branchFrom: string
  branchTo: string
  departmentFrom: string
  departmentTo: string
  employeeRank: string
  attachmentUrl: string
}


declare type HRInitialTypes = {
  appointments: SelectionItem<string>[]
  employeeRanks: SelectionItem<string>[]
}

declare type HRInitialData = HRInitialTypes