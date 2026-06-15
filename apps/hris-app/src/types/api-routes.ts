export const ApiRoutes = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },

  USERS: {
    PROFILE: '/users/profile',
    SELF_REGISTER: '/users/self-register',
  },

  EMPLOYEES: {
    LIST: '/employees',
    INITIAL: '/employees/initial',
    ACTIVE: '/employees/active',
    UPLOAD_PHOTO: (employeeId: string) => `/employees/${employeeId}/photo`,
    VIEW_PHOTO: (employeeId: string) => `/employees/${employeeId}/photo`,
    BY_ID: (id: string) => `/employees/${id}`,
    APPOINT: (id: string) => `/employees/${id}/company`,
    APPOINTMENTS: (id: string) => `/employees/${id}/appointments`,
    EMERGENCY_CONTACTS: (id: string) => `/employees/${id}/emergency-contacts`,
    EMERGENCY_CONTACT_BY_ID: (id: string, contactId: string) => `/employees/${id}/emergency-contacts/${contactId}`,
    INFO: (id: string,info: string) => `/employees/${id}/${info}`,
    INFO_BY_ID: (id: string, infoId: string, entityType: string) => `/employees/${id}/info/${infoId}/${entityType}`,
    ADDRESS: (id: string) => `/employees/${id}/address`,
    EDUCATIONS: (id: string) => `/employees/${id}/educations`,
    WORK_EXPERIENCES: (id: string) => `/employees/${id}/work-experiences`,
    LEAVES: '/employees/leaves',
    LEAVES_BY_ID: (id: string) => `/employees/leaves/${id}`,
    LEAVES_SINGLE: (id: string) => `/employees/leaves/single/${id}`,
    LEAVE_BALANCE: (id: string | number) => `/employees/leave/${id}/balance`,
  },

  ATTENDANCE_PERIODS: {
    LIST: '/attendances/periods',
    INITIAL: '/attendances/periods/initial',
    RECREATE_SHEET: '/attendances/periods/recreate-sheet',
    MANUAL_PROCESS: '/attendances/periods/manual-process',
    BY_ID: (id: string) => `/attendances/periods/${id}`,
    SHEETS: (periodId: string) => `/attendances/periods/${periodId}/sheets`,
    SHEET_BY_EMPLOYEE: (periodId: string, employeeNo: number) => `/attendances/periods/${periodId}/sheets/${employeeNo}`,
    SHEET_DETAILS: (periodId: string, employeeId: number) => `/attendances/periods/${periodId}/sheets/${employeeId}/details`,
    POST: (periodId: string) => `/attendances/periods/${periodId}/post`,
    ADJUSTMENT: (periodId: string, employeeId: number) => `/attendances/periods/${periodId}/${employeeId}/adjustment`,
  },

  ATTENDANCE_EXPORTS: {
    SHEETS: (periodId: string) => `/attendances/export/sheets/${periodId}`,
    DETAIL_SHEETS: (periodId: string, employeeNo: number) => `/attendances/exports/sheets/${periodId}/${employeeNo}`,
  },

  ATTENDANCE_DETAILS: {
    REQUESTS: (detailId: string) => `/attendances/details/${detailId}/requests`,
  },

  EMPLOYEE_SETUP: {
    LIST: '/attendances/employee-setup',
    INITIAL: '/attendances/employee-setup/initial',
    SYNC: '/attendances/employee-setup/sync',
    BY_ID: (id: string) => `/attendances/employee-setup/${id}`,
    TOGGLE: (id: string) => `/attendances/employee-setup/${id}/toggle`,
    EXPORT: '/setup/export',
  },

  ATTENDANCE_REPORTS: {
    TARDINESS: '/attendance/reports/tardiness-reports',
    ABSENT: '/attendance/reports/absent-reports',
    LUA_PER_EMPLOYEE: '/attendance/reports/employee-lua-reports',
    OVERTIME: '/attendance/reports/overtime-reports',
  },

  QUEUES: {
    DTR_PROCESS: '/queues/attendances/dtr-process',
    PERIODS_CREATE: '/queues/periods/create',
    JOB_STATUS: (jobId: string) => `/queues/jobs/${jobId}`,
  },

  POLICIES: {
    LIST: '/policies',
    BY_ID: (id: string) => `/policies/${id}`,
  },

  SCHEDULES: {
    LIST: '/schedules',
    BY_ID: (id: string) => `/schedules/${id}`,
  },

  CALENDARS: {
    LIST: '/calendars',
    INITIAL: '/calendars/initial',
    BY_YEAR: (year: string | number) => `/calendars/${year}`,
    BY_ID: (id: string) => `/calendars/${id}`,
  },

  DASHBOARDS: {
    CALENDAR: (year: number, month: number) => `dashboards/calendars/${year}/${month}`,
    BIRTHDAYS: (month: number) => `dashboards/employee-birthdays/${month}`,
    SUMMARY: 'dashboards/employee-type-count',
    PROBATIONARY: 'dashboards/probationary-employees',
    RESIGNATION: 'dashboards/resignation-employees',
  },

  LEAVE_SETUP: {
    LIST: '/setup/leave',
    INITIAL: '/setup/leave/initial',
    ADJUSTMENT: '/setup/leave/adjustment',
    LEDGER: (id: string | number) => `/setup/leave/${id}/ledger`,
  },

  FORM_REQUEST: {
    LIST: '/form-request',
    INITIAL: '/form-request/initial',
    SYNC_LEGACY: '/form-request/sync-legacy',
    CANCEL: '/form-request/cancel',
    PENDING: '/form-request/pending',
  },

  HR_FORMS: {
    LIST: 'action-forms',
    CREATE: 'action-forms',
    INITIAL: '/action-forms/initial',
    BY_EMPLOYEE: (employeeId: string) => `/action-forms/${employeeId}`,
  },

  IDENTITY: {
    LIST: '/identity',
    INITIALS: '/identity/initials',
    REGISTER: '/identity/register',
    UPDATE: '/identity/update',
    RESET_PASSWORD: '/identity/reset-password',
    ROLES_AND_ACCESS: (userName: string) => `/identity/${userName}/roles-and-access`,
  },
}
