import { clsx } from 'clsx'
import { formatDistanceToNow, isValid, parseISO } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'


export const avatarUrl = (id: string) => `${import.meta.env.VITE_API_URL}/employees/view-photo/${id}`

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const getTimeAgo = (dateString: string): string => {
  const date = parseISO(dateString)

  if (!isValid(date)) {
    return 'Invalid date'
  }

  return `${formatDistanceToNow(date, { addSuffix: true })}`
}

/**
 * Create a fallback in avatar if no image is found
 * @param name
 * @returns string
 */
export function createAvatarFallback(name: string): string {
  if (!name) return ''
  const names = name.split(' ')
  if (names.length === 1) return names[0].charAt(0).toUpperCase()
  const initials = names[0].charAt(0) + names[names.length - 1].charAt(0)
  return initials.toUpperCase()
}

export function setFullName(firstName: string, lastName: string): string {
  return `${lastName}, ${firstName}`
}

/**
 * Truncates text and adds ellipsis if it exceeds the specified length.
 * @param text The input string.
 * @param maxLength The maximum allowed length before truncation. Default is 10.
 * @returns The possibly truncated string.
 */
export function ellipsis(text: string, maxLength: number = 10): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const formatLongDateTime = (
  isoString: string,
  locale: string = navigator.language || 'en-US',
): string => {
  const date = new Date(isoString)

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short', // "Jan"
    day: 'numeric', // "13"
    year: 'numeric', // "2026"
    hour: 'numeric', // "12"
    minute: '2-digit', // "00"
    second: '2-digit', // "00"
    hour12: true, // "PM"
  }).format(date)
}

export const formatLongDate = (
  isoString: string,
  locale: string = navigator.language || 'en-US',
): string => {
  const date = new Date(isoString)

  return new Intl.DateTimeFormat(locale, {
    month: 'short', // "Jan"
    day: 'numeric', // "13"
    year: 'numeric', // "2026"
  }).format(date)
}


export const getErrorMessage = (error, fallback = 'An unexpected error occurred') => {

  if (Array.isArray(error) && error[0]?.message) {
    return error[0].message;
  }

  //check if error is string
  if (typeof error === 'string') {
    return error;
  }

  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;

  return fallback;
};

export const calculateTotalHours = (timeIn: string, timeOut: string): string => {
  const inTime = new Date(`1970-01-01T${timeIn}Z`)
  const outTime = new Date(`1970-01-01T${timeOut}Z`)
  const diffInMs = outTime.getTime() - inTime.getTime()
  const diffInHours = diffInMs / (1000 * 60 * 60)
  const hours = Math.floor(diffInHours)
  const minutes = Math.round((diffInHours - hours) * 60)

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:00`
}


export const typeMapping: Record<number, { key: string; label: string }> = {
  1: { key: 'special', label: 'Special' },
  2: { key: 'leave', label: 'Vacation' },
  3: { key: 'sick', label: 'Sick' },
  4: { key: 'maternity', label: 'Maternity' },
  5: { key: 'paternity', label: 'Paternity' },
  6: { key: 'soloparent', label: 'Solo Parent' },
  11: { key: 'bereavement', label: 'Bereavement' },
}

export const getLeaveBalances = (leaveData: any[]) => {
  const map: Record<string, string> = {
    LV: 'leave',
    SL: 'sick',
    MT: 'maternity',
    PT: 'paternity',
    SP: 'soloparent',
    BE: 'bereavement',
  }

  return leaveData.reduce(
    (acc, item) => {
      const key = map[item.description]
      if (key) acc[key] = item.balance
      return acc
    },
    {} as Record<string, number>,
  )
}


const displayMapping: Record<string, string | number> = {
  OT: 'OVERTIME REQUEST',
  OFFICIAL_BUSINESS: 'OFFICIAL BUSINESS REQUEST',
  LEAVE: 'LEAVE REQUEST',
  TIME_REQUEST: 'DTR CORRECTION',
  CHANGE_SHIFT: 'CHANGE SHIFT',
  WHOLEDAY: 'WHOLE DAY',
  HALFDAYAFTERNOON: 'HALFDAY AFTERNOON',
  HALFDAYMORNING: 'HALFDAY MORNING',
  TIMEIN: 'TIME IN',
  TIMEOUT: 'TIME OUT',
  FULLDAY: 'FULL DAY',
  VL: 'VACATION',
  SL: 'SICK',
  ML: 'MATERNITY',
  PL: 'PATERNITY',
  SPL: 'SOLO PARENT',
  BL: 'BEREAVEMENT',
  EL: 'EMERGENCY',
  StockIn: 'STOCK IN',
  StockOut: 'STOCK OUT',
  1: 'PROBATIONARY',
  2: 'REGULAR',
  3: 'END OF SERVICE',
  6: 'PROMOTION',
  7: 'TRANSFER',
  8: 'REINSTATEMENT',
  SpecialNonWorking: 'SPECIAL NON-WORKING',
  RegularNonWorking: 'REGULAR NON-WORKING',
  SpecialWorking: 'SPECIAL WORKING',
  RegularWorking: 'REGULAR WORKING',
}

export const nullIfEmpty = (v: string | null | undefined): string | null =>
  v === '' || v == null ? null : v

export const getDisplayText = (text: string | number) => displayMapping[text] || text
export const formatRequestText = (
  types: SelectionItem<string>[] | undefined,
) => {
  if (!types || !Array.isArray(types)) return []

  const labelMap: Record<string, string> = {
    OT: 'OVERTIME',
    OFFICIAL_BUSINESS: 'OFFICIAL BUSINESS',
    LEAVE: 'LEAVE',
    TIME_REQUEST: 'DTR CORRECTION',
    CHANGE_SHIFT: 'CHANGE SHIFT',
    NA: 'N/A',
    WholeDay: 'WHOLE DAY',
    HalfDayAfterNoon: 'HALFDAY AFTERNOON',
    HalfDayMorning: 'HALFDAY MORNING',
    TIMEIN: 'TIME IN',
    TIMEOUT: 'TIME OUT',
    FULLDAY: 'FULL DAY',
    LV: 'VACATION',
    SL: 'SICK',
    MT: 'MATERNITY',
    PT: 'PATERNITY',
    SP: 'SOLO PARENT',
    BE: 'BEREAVEMENT',
    EL: 'EMERGENCY',
    StockIn: 'STOCK IN',
    StockOut: 'STOCK OUT',
    1: 'PROBATIONARY',
    2: 'REGULAR',
    3: 'END OF SERVICE',
    6: 'PROMOTION',
    7: 'TRANSFER',
    8: 'REINSTATEMENT',
    SpecialNonWorking: 'SPECIAL NON-WORKING',
    RegularNonWorking: 'REGULAR NON-WORKING',
    SpecialWorking: 'SPECIAL WORKING',
    RegularWorking: 'REGULAR WORKING',
  }

  return types.map((item) => ({
    ...item,
    text: labelMap[item.text] || item.text,
  }))
}
