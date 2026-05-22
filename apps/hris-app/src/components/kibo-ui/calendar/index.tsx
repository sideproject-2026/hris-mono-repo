'use client'

import { getDay, getDaysInMonth, isSameDay, isToday } from 'date-fns'
import { atom, useAtom } from 'jotai'
import {
  Check,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
} from 'lucide-react'
import {
  createContext,
  memo,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export type CalendarState = {
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
  year: number
}

const monthAtom = atom<CalendarState['month']>(
  new Date().getMonth() as CalendarState['month'],
)
const yearAtom = atom<CalendarState['year']>(new Date().getFullYear())

export const useCalendarMonth = () => useAtom(monthAtom)
export const useCalendarYear = () => useAtom(yearAtom)

type CalendarContextProps = {
  locale: Intl.LocalesArgument
  startDay: number
}

const CalendarContext = createContext<CalendarContextProps>({
  locale: 'en-US',
  startDay: 0,
})

export type Status = {
  id: string
  name: string
  color: string
}

export type Feature = {
  id: string
  name: string
  startAt: Date
  endAt: Date
  status: Status
}

type ComboboxProps = {
  value: string
  setValue: (value: string) => void
  data: {
    value: string
    label: string
  }[]
  labels: {
    button: string
    empty: string
    search: string
  }
  className?: string
}

export const monthsForLocale = (
  localeName: Intl.LocalesArgument,
  monthFormat: Intl.DateTimeFormatOptions['month'] = 'long',
) => {
  const format = new Intl.DateTimeFormat(localeName, { month: monthFormat })
    .format

  return [...new Array(12).keys()].map((m) =>
    format(new Date(Date.UTC(2021, m, 2))),
  )
}

export const daysForLocale = (
  locale: Intl.LocalesArgument,
  startDay: number,
) => {
  const weekdays: string[] = []
  const baseDate = new Date(2024, 0, startDay)

  for (let i = 0; i < 7; i++) {
    weekdays.push(
      new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(baseDate),
    )
    baseDate.setDate(baseDate.getDate() + 1)
  }

  return weekdays
}

const Combobox = ({
  value,
  setValue,
  data,
  labels,
  className,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className={cn(
            'w-44 justify-between capitalize border-border/60 bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 rounded-lg shadow-sm font-normal',
            className,
          )}
          variant="outline"
        >
          <span className="truncate">
            {value
              ? data.find((item) => item.value === value)?.label
              : labels.button}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-0 bg-popover border-border shadow-md">
        <Command
          className="bg-transparent"
          filter={(value, search) => {
            const label = data.find((item) => item.value === value)?.label
            return label?.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }}
        >
          <CommandInput
            className="border-none focus:ring-0"
            placeholder={labels.search}
          />
          <CommandList className="max-h-[250px]">
            <CommandEmpty>{labels.empty}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  className="capitalize transition-colors font-normal"
                  key={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                  value={item.value}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 text-primary',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

type OutOfBoundsDayProps = {
  day: number
}

const OutOfBoundsDay = ({ day }: OutOfBoundsDayProps) => (
  <div className="relative h-full w-full bg-muted/30 p-2 text-muted-foreground/30 text-[11px] font-normal">
    {day}
  </div>
)

export type CalendarBodyProps = {
  features: Feature[]
  children: (props: { feature: Feature }) => ReactNode
  onClick?: (feature: Feature) => void
}

export const CalendarBody = ({
  features,
  children,
  onClick,
}: CalendarBodyProps) => {
  const [month] = useCalendarMonth()
  const [year] = useCalendarYear()
  const { startDay } = useContext(CalendarContext)

  const handleClick = useCallback(
    (feature: Feature) => {
      if (onClick) {
        onClick(feature)
      }
    },
    [onClick],
  )

  const currentMonthDate = useMemo(
    () => new Date(year, month, 1),
    [year, month],
  )

  const daysInMonth = useMemo(
    () => getDaysInMonth(currentMonthDate),
    [currentMonthDate],
  )
  const firstDay = useMemo(
    () => (getDay(currentMonthDate) - startDay + 7) % 7,
    [currentMonthDate, startDay],
  )

  const prevMonthData = useMemo(() => {
    const prevMonth = month === 0 ? 11 : month - 1
    const prevMonthYear = month === 0 ? year - 1 : year
    const prevMonthDays = getDaysInMonth(new Date(prevMonthYear, prevMonth, 1))
    const prevMonthDaysArray = Array.from(
      { length: prevMonthDays },
      (_, i) => i + 1,
    )
    return { prevMonthDays, prevMonthDaysArray }
  }, [month, year])

  const nextMonthData = useMemo(() => {
    const nextMonth = month === 11 ? 0 : month + 1
    const nextMonthYear = month === 11 ? year + 1 : year
    const nextMonthDays = getDaysInMonth(new Date(nextMonthYear, nextMonth, 1))
    const nextMonthDaysArray = Array.from(
      { length: nextMonthDays },
      (_, i) => i + 1,
    )
    return { nextMonthDaysArray }
  }, [month, year])

  const featuresByDay = useMemo(() => {
    const result: { [day: number]: Feature[] } = {}
    for (let day = 1; day <= daysInMonth; day++) {
      result[day] = features.filter((feature) => {
        return isSameDay(new Date(feature.endAt), new Date(year, month, day))
      })
    }
    return result
  }, [features, daysInMonth, year, month])

  const days: ReactNode[] = []

  for (let i = 0; i < firstDay; i++) {
    const day =
      prevMonthData.prevMonthDaysArray[
        prevMonthData.prevMonthDays - firstDay + i
      ]
    if (day) {
      days.push(<OutOfBoundsDay day={day} key={`prev-${i}`} />)
    }
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const featuresForDay = featuresByDay[day] || []
    const isCurrentDay = isToday(new Date(year, month, day))

    days.push(
      <motion.div
        whileHover={{ backgroundColor: 'rgba(var(--accent-rgb), 0.05)' }}
        className={cn(
          'group relative flex h-full w-full flex-col gap-1 p-2 transition-colors duration-200 overflow-hidden cursor-pointer',
          isCurrentDay ? 'bg-primary/5' : '',
        )}
        key={day}
        onClick={() => featuresForDay[0] && handleClick(featuresForDay[0])}
      >
        <span
          className={cn(
            'text-[12px] font-normal inline-flex items-center justify-center transition-all',
            isCurrentDay
              ? 'text-primary-foreground bg-primary w-6 h-6 rounded-md shadow-sm'
              : 'text-foreground group-hover:scale-110',
          )}
        >
          {day}
        </span>
        <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1 pr-0.5">
          {featuresForDay.slice(0, 4).map((feature, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              key={feature.id}
            >
              {children({ feature })}
            </motion.div>
          ))}
          {featuresForDay.length > 4 && (
            <span className="text-[10px] font-normal text-muted-foreground pl-1">
              +{featuresForDay.length - 4} more
            </span>
          )}
        </div>
      </motion.div>,
    )
  }

  const remainingDays = 7 - ((firstDay + daysInMonth) % 7)
  if (remainingDays < 7) {
    for (let i = 0; i < remainingDays; i++) {
      const day = nextMonthData.nextMonthDaysArray[i]
      if (day) {
        days.push(<OutOfBoundsDay day={day} key={`next-${i}`} />)
      }
    }
  }

  return (
    <div className="border-l border-r border-b overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${month}-${year}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid flex-grow grid-cols-7"
        >
          {days.map((day, index) => (
            <div
              className={cn(
                'relative aspect-square border-t border-r border-border/80',
                (index + 1) % 7 === 0 && 'border-r-0',
                index < 7 && 'border-t-0',
              )}
              key={index}
            >
              {day}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export type CalendarDatePickerProps = {
  className?: string
  children: ReactNode
}

export const CalendarDatePicker = ({
  className,
  children,
}: CalendarDatePickerProps) => (
  <div
    className={cn(
      'flex items-center gap-2 p-1 bg-muted/50 rounded-lg border border-border',
      className,
    )}
  >
    {children}
  </div>
)

export type CalendarMonthPickerProps = {
  className?: string
}

export const CalendarMonthPicker = ({
  className,
}: CalendarMonthPickerProps) => {
  const [month, setMonth] = useCalendarMonth()
  const { locale } = useContext(CalendarContext)

  const monthData = useMemo(() => {
    return monthsForLocale(locale).map((month, index) => ({
      value: index.toString(),
      label: month,
    }))
  }, [locale])

  return (
    <Combobox
      className={cn('w-40 h-10 rounded-md', className)}
      data={monthData}
      labels={{
        button: 'Select month',
        empty: 'No month found',
        search: 'Search month',
      }}
      setValue={(value) =>
        setMonth(Number.parseInt(value, 10) as CalendarState['month'])
      }
      value={month.toString()}
    />
  )
}

export type CalendarYearPickerProps = {
  className?: string
  start: number
  end: number
  onChange: (value: number) => void
}

export const CalendarYearPicker = ({
  className,
  start,
  end,
  onChange,
}: CalendarYearPickerProps) => {
  const [year, setYear] = useCalendarYear()

  const handleYearChange = useCallback(
    (value: string) => {
      const val = Number.parseInt(value, 10)
      setYear(val)
      onChange(val)
    },
    [setYear, onChange],
  )

  return (
    <Combobox
      className={cn('w-36 h-10 rounded-md', className)}
      data={Array.from({ length: end - start + 1 }, (_, i) => ({
        value: (start + i).toString(),
        label: (start + i).toString(),
      }))}
      labels={{
        button: 'Select year',
        empty: 'No year found',
        search: 'Search year',
      }}
      setValue={handleYearChange}
      value={year.toString()}
    />
  )
}

export type CalendarDatePaginationProps = {
  className?: string
}

export const CalendarDatePagination = ({
  className,
}: CalendarDatePaginationProps) => {
  const [month, setMonth] = useCalendarMonth()
  const [year, setYear] = useCalendarYear()

  const handlePreviousMonth = useCallback(() => {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth((month - 1) as CalendarState['month'])
    }
  }, [month, year, setMonth, setYear])

  const handleNextMonth = useCallback(() => {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth((month + 1) as CalendarState['month'])
    }
  }, [month, year, setMonth, setYear])

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        onClick={handlePreviousMonth}
        size="icon"
        variant="outline"
        className="h-9 w-9 border-border bg-background hover:bg-accent text-accent-foreground shadow-sm"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>
      <Button
        onClick={handleNextMonth}
        size="icon"
        variant="outline"
        className="h-9 w-9 border-border bg-background hover:bg-accent text-accent-foreground shadow-sm"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </div>
  )
}

export type CalendarDateProps = {
  children: ReactNode
}

export const CalendarDate = ({ children }: CalendarDateProps) => (
  <div className="flex flex-wrap items-center justify-between py-5 px-1 gap-4">
    {children}
  </div>
)

export type CalendarHeaderProps = {
  className?: string
}

export const CalendarHeader = ({ className }: CalendarHeaderProps) => {
  const { locale, startDay } = useContext(CalendarContext)

  const daysData = useMemo(() => {
    return daysForLocale(locale, startDay)
  }, [locale, startDay])

  return (
    <div
      className={cn(
        'grid flex-grow grid-cols-7 border-x border-t border-border rounded-t-xl bg-primary',
        className,
      )}
    >
      {daysData.map((day) => (
        <div
          className="p-3 text-center text-[11px] font-normal text-primary-foreground uppercase tracking-wider border-r border-border/50 last:border-r-0"
          key={day}
        >
          {day}
        </div>
      ))}
    </div>
  )
}

export type CalendarItemProps = {
  feature: Feature
  className?: string
}

export const CalendarItem = memo(
  ({ feature, className }: CalendarItemProps) => (
    <motion.div
      whileHover={{ x: 2 }}
      className={cn(
        'flex items-center gap-2 group/item p-2 rounded-md border border-border/40 bg-background/80 hover:border-primary/30 hover:bg-accent transition-all duration-200 cursor-pointer overflow-hidden shadow-sm',
        className,
      )}
    >
      <div
        className="h-2.5 w-2.5 shrink-0 rounded-full border border-black/5"
        style={{
          backgroundColor: feature.status.color,
        }}
      />
      <span className="truncate text-[11px] font-normal text-foreground">
        {feature.name}
      </span>
    </motion.div>
  ),
)

CalendarItem.displayName = 'CalendarItem'

export type CalendarProviderProps = {
  locale?: Intl.LocalesArgument
  startDay?: number
  children: ReactNode
  className?: string
}

export const CalendarProvider = ({
  locale = 'en-US',
  startDay = 0,
  children,
  className,
}: CalendarProviderProps) => (
  <CalendarContext.Provider value={{ locale, startDay }}>
    <div className={cn('relative flex flex-col w-full mx-auto', className)}>
      {children}
    </div>
  </CalendarContext.Provider>
)
