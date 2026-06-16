// Employee Action Request (HR Form) type
// Filled whenever there is an update on an employee: new hire, transfer, promotion, etc.
export enum HRFormType {
  NewHire = 0,
  ProbationExtension = 1,
  Regularization = 2,
  Transfer = 3,
  EndOfService = 4,
  ChangeDesignation = 5,
}

export const HR_FORM_TYPE_OPTIONS: SelectionItem<number>[] = [
  { value: HRFormType.NewHire, text: 'New Hire' },
  { value: HRFormType.ProbationExtension, text: 'Probation Extension' },
  { value: HRFormType.Regularization, text: 'Regularization' },
  { value: HRFormType.Transfer, text: 'Transfer' },
  { value: HRFormType.EndOfService, text: 'End Of Service' },
  { value: HRFormType.ChangeDesignation, text: 'Change Designation' },
]

// Reason an employee separates from the company (End Of Service).
export enum ResignationType {
  Voluntary = 0,
  Involuntary = 1,
  Retirement = 2,
  EndOfContract = 3,
}

export const RESIGNATION_TYPE_OPTIONS: SelectionItem<number>[] = [
  { value: ResignationType.Voluntary, text: 'Voluntary' },
  { value: ResignationType.Involuntary, text: 'Involuntary' },
  { value: ResignationType.Retirement, text: 'Retirement' },
  { value: ResignationType.EndOfContract, text: 'End Of Contract' },
]
