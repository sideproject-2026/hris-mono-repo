import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ChevronDown, Filter, Loader2, RefreshCcw } from 'lucide-react'
import { format } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { reportInitialQueryOptions } from './hooks/useReport'
import ExportExcelReport from './export-excel-report'
import { useQuery } from '@tanstack/react-query'
import { StackCol, StackRow } from '@/components/custom/layouts'
import EmptyReport from './parts/empty-report'
import DynamicTable from './parts/dynamic-table'
import { useDynamicQuery } from './parts/dynamic-query'
import DynamicFormReport from './parts/dynamic-form'

type ParameterOption = {
  label: string
  value: string
}

type ParameterConfig = {
  name: string
  label: string
  type: 'date' | 'select' | 'text' | 'special-combobox'
  placeholder?: string
  helperText?: string
  defaultValue?: string
  options?: ParameterOption[]
  required?: boolean
}

type StatusVariant = 'default' | 'secondary' | 'destructive' | 'outline'

const reportDefinitions: ReportDefinition[] = [
  {
    id: 'undertime-report',
    title: 'Undertime & Early Out Report',
    description:
      'List undertime incidents with their corresponding reason codes for team leaders.',
    parameters: [
      {
        name: 'dateFrom',
        label: 'Date From',
        type: 'date',
        required: true,
      },
      {
        name: 'dateTo',
        label: 'Date To',
        type: 'date',
        required: true,
      },
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        defaultValue: '',
        required: false,
        options: [],
      },
      {
        name: 'company',
        label: 'Company',
        type: 'select',
        defaultValue: '',
        required: false,
        options: [],
      },
    ],
    table: {
      columns: [
        { key: 'employeeName', label: 'Employee Name' },
        { key: 'department', label: 'Department' },
        { key: 'company', label: 'Company' },
        { key: 'period', label: 'Period' },
        { key: 'totalWorkingDays', label: 'Working Days' },
        { key: 'totalWorkingHours', label: 'Working Hours' },
        { key: 'late', label: 'Late' },
        { key: 'lateMinutes', label: 'Late Minutes' },
        { key: 'lateHours', label: 'Late Hours' },
        { key: 'undertime', label: 'Undertime' },
        { key: 'undertimeMinutes', label: 'Undertime Minutes' },
        { key: 'undertimeHours', label: 'Undertime Hours' },
        { key: 'absent', label: 'Absent' },
      ],
      rows: [],
      caption: 'Variance reflects approved adjustments in minutes.',
    },
  },
  {
    id: 'lua-per-employee-report',
    title: 'Late & Undertime Per Employee Report',
    description:
      'List instances of late arrivals and early departures per employee.',
    parameters: [
      {
        name: 'employeeId',
        label: 'Employee Name',
        type: 'special-combobox',
        required: true,
      },
      {
        name: 'dateFrom',
        label: 'Date From',
        type: 'date',
        required: true,
      },
      {
        name: 'dateTo',
        label: 'Date To',
        type: 'date',
        required: true,
      },
    ],
    table: {
      columns: [
        { key: 'employeeName', label: 'Employee Name' },
        { key: 'date', label: 'Date' },
        { key: 'day', label: 'Day' },
        { key: 'dayType', label: 'Day Type' },
        { key: 'scheduleTimeIn', label: 'Sched In' },
        { key: 'scheduleTimeOut', label: 'Sched Out' },
        { key: 'timeIn', label: 'Time In' },
        { key: 'timeOut', label: 'Time Out' },
        { key: 'workingHours', label: 'Work Hrs', numeric: true },
        { key: 'lateMinute', label: 'Late (m)', numeric: true },
        { key: 'lateHour', label: 'Late (h)', numeric: true },
        { key: 'undertimeMinute', label: 'UD (m)', numeric: true },
        { key: 'undertimeHour', label: 'UD (h)', numeric: true },
        { key: 'absent', label: 'Absent', numeric: true },
        { key: 'regulartOTHour', label: 'Reg OT (h)' },
        { key: 'regularOTMinute', label: 'Reg OT (m)' },
        { key: 'weekendOTHour', label: 'Weekend OT (h)' },
        { key: 'weekendOTMinute', label: 'Weekend OT (m)' },
        { key: 'holidayOTHour', label: 'Special Holiday OT (h)' },
        { key: 'holidayOTMinute', label: 'Special Holiday OT (m)' },
        { key: 'remarks', label: 'Remarks' },
      ],
      rows: [],
      caption: 'Variance reflects approved adjustments in minutes.',
    },
  },
  {
    id: 'absent-report',
    title: 'Absent Report',
    description: 'List instances of absences.',
    parameters: [
      {
        name: 'dateFrom',
        label: 'Date From',
        type: 'date',
        required: true,
      },
      {
        name: 'dateTo',
        label: 'Date To',
        type: 'date',
        required: true,
      },
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        defaultValue: '',
        required: false,
        options: [],
      },
      {
        name: 'company',
        label: 'Company',
        type: 'select',
        defaultValue: '',
        required: false,
        options: [],
      },
    ],
    table: {
      columns: [
        { key: 'employeeName', label: 'Employee Name' },
        { key: 'department', label: 'Department' },
        { key: 'company', label: 'Company' },
        { key: 'period', label: 'Period' },
        { key: 'totalWorkingDays', label: 'Working Days' },
        { key: 'totalWorkingHours', label: 'Working Hours' },
        { key: 'absent', label: 'Absent' },
      ],
      rows: [],
      caption: 'Variance reflects approved adjustments in minutes.',
    },
  },
  {
    id: 'overtime-report',
    title: 'Overtime Report',
    description: 'Summarize approved overtime by employees',
    parameters: [
      {
        name: 'dateFrom',
        label: 'Date From',
        type: 'date',
        required: true,
      },
      {
        name: 'dateTo',
        label: 'Date To',
        type: 'date',
        required: true,
      },
      {
        name: 'department',
        label: 'Department',
        type: 'select',
        defaultValue: '',
        required: false,
        options: [],
      },
      {
        name: 'company',
        label: 'Company',
        type: 'select',
        defaultValue: '',
        required: false,
        options: [],
      },
    ],
    table: {
      columns: [
        { key: 'employeeName', label: 'Employee Name' },
        { key: 'department', label: 'Department' },
        { key: 'company', label: 'Company' },
        { key: 'period', label: 'Period' },
        { key: 'totalWorkingDays', label: 'Working Days' },
        { key: 'totalWorkingHours', label: 'Working Hours' },
        { key: 'regularOvertime', label: 'Regular Overtime' },
        { key: 'regularOvertimeMinute', label: 'Regular Overtime Minutes' },
        { key: 'regularOvertimeHour', label: 'Regular Overtime Hours' },
        { key: 'holidayOvertime', label: 'Holiday Overtime' },
        { key: 'holidayOvertimeMinute', label: 'Holiday Overtime Minutes' },
        { key: 'holidayOvertimeHour', label: 'Holiday Overtime Hours' },
        { key: 'restdayOvertime', label: 'Restday Overtime' },
        { key: 'restdayOvertimeMinute', label: 'Restday Overtime Minutes' },
        { key: 'restdayOvertimeHour', label: 'Restday Overtime Hours' },
      ],
      rows: [],
      caption: 'Variance reflects approved adjustments in minutes.',
    },
  },
]

const statusVariantMap: Record<string, StatusVariant> = {
  Complete: 'default',
  Certified: 'default',
  Reconciled: 'default',
  Approved: 'default',
  'Late Arrival': 'secondary',
  'Early Out': 'secondary',
  'For Signature': 'secondary',
  'For Review': 'secondary',
  Pending: 'outline',
  'Requires Review': 'outline',
  Documented: 'outline',
  'Missing log': 'outline',
  Mismatch: 'destructive',
  Absent: 'destructive',
  Rejected: 'destructive',
}

const ReportContent: React.FC<ReportContentProps> = ({
  reportId,
  className,
}) => {
  const report = React.useMemo(() => {
    return reportDefinitions.find((definition) => definition.id === reportId)
  }, [reportId])

  if (!report) {
    return <EmptyReport />
  }

  return <ReportViewer key={report.id} report={report} />
}

const buildSchema = (parameters: ParameterConfig[]) => {
  if (parameters.length === 0) {
    return z.object({}) as z.ZodType<ResolverShape>
  }

  const entries = parameters.map<[string, z.ZodTypeAny]>((parameter) => {
    const isDate = parameter.type === 'date'
    const isSpecial = parameter.type === 'special-combobox'
    const baseSchema = isDate
      ? z.union([z.string(), z.date()])
      : isSpecial
        ? z.union([z.string(), z.number()])
        : z.string()

    if (parameter.required === false) {
      return [
        parameter.name,
        baseSchema.optional().transform((value: any) => {
          if (value instanceof Date) return format(value, 'yyyy-MM-dd')
          return String(value ?? '').trim()
        }),
      ]
    }

    return [
      parameter.name,
      baseSchema
        .refine((value: any) => {
          if (value instanceof Date) return true
          if (typeof value === 'number') return value !== 0
          return value && typeof value === 'string' && value.trim().length > 0
        }, 'This field is required.')
        .transform((value: any) => {
          if (value instanceof Date) return format(value, 'yyyy-MM-dd')
          return String(value ?? '').trim()
        }),
    ]
  })

  return z.object(Object.fromEntries(entries)) as z.ZodType<ResolverShape>
}

const ReportViewer: React.FC<ReportViewerProps> = ({ report }) => {
  const schema = React.useMemo(() => buildSchema(report.parameters), [report])

  const defaultValues = React.useMemo(() => {
    return report.parameters.reduce<ResolverShape>((accumulator, parameter) => {
      accumulator[parameter.name] = parameter.defaultValue ?? ''
      return accumulator
    }, {})
  }, [report.parameters])

  const form = useForm<ResolverShape>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  })

  const [submittedValues, setSubmittedValues] =
    React.useState<ResolverShape | null>(null)

  const { data: reportInitial } = useQuery(reportInitialQueryOptions())

  const dynamicParameters = React.useMemo(() => {
    return report.parameters.map((param) => {
      if (param.name === 'department' && reportInitial?.departments) {
        return {
          ...param,
          options: [
            { label: 'All Departments', value: 'all' },
            ...reportInitial.departments.map((d) => ({
              label: d.text,
              value: d.text,
            })),
          ],
        }
      }

      if (param.name === 'company' && reportInitial?.companies) {
        return {
          ...param,
          options: [
            { label: 'All Companies', value: 'all' },
            ...reportInitial.companies.map((c) => ({
              label: c.text,
              value: c.text,
            })),
          ],
        }
      }

      return param
    })
  }, [report.parameters, reportInitial])

  const { previewRows: dynamicPreviewRows, isLoading } = useDynamicQuery({
    reportId: report.id,
    parameter: submittedValues,
  })

  const rowsToDisplay = React.useMemo(() => {
    if (submittedValues) {
      return dynamicPreviewRows ?? []
    }
    return report.table.rows
  }, [submittedValues, dynamicPreviewRows, report.table.rows])

  const parameterMeta = React.useMemo(() => {
    return report.parameters.reduce<Record<string, ParameterConfig>>(
      (accumulator, parameter) => {
        accumulator[parameter.name] = parameter
        return accumulator
      },
      {},
    )
  }, [report.parameters])

  const onSubmit = (values: ResolverShape) => {
    setSubmittedValues(values)
  }

  const handleReset = React.useCallback(() => {
    form.reset(defaultValues)
    setSubmittedValues(null)
  }, [defaultValues, form])

  const activeParameterBadges = React.useMemo(() => {
    if (!submittedValues) {
      return []
    }

    return Object.entries(submittedValues)
      .filter(([, value]) => value && value.trim().length > 0)
      .map(([key, value]) => {
        const parameter = parameterMeta[key]
        const optionLabel = parameter?.options?.find(
          (option) => option.value === value,
        )?.label

        return {
          key,
          label: parameter?.label ?? key,
          value: optionLabel ?? value,
        }
      })
  }, [parameterMeta, submittedValues])

  return (
    <section
      className={cn(
        'flex h-full flex-1 flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm w-full',
      )}
    >
      <header className="border-b border-border/60 px-6 py-4">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Report Viewer
        </span>
        <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">{report.title}</h2>
          <Badge variant="outline" className="w-fit gap-1">
            <Filter className="size-3.5" aria-hidden="true" />
            <p className="text-md font-normal">{rowsToDisplay.length} rows</p>
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {report.description}
        </p>
      </header>
      <StackCol className="flex-1 gap-4 overflow-hidden p-4 md:p-6 w-full">
        <Card className="border border-border/60 bg-background/60 shadow-none w-full">
          <CardHeader className="pb-4">
            <StackRow justifyContent="between">
              <StackCol>
                <CardTitle className="text-base">Report Parameters</CardTitle>
                <CardDescription>
                  Adjust filters below to refine the report output before
                  exporting or sharing.
                </CardDescription>
              </StackCol>
              <ExportExcelReport
                data={rowsToDisplay}
                reportTitle={report.title}
              />
            </StackRow>
          </CardHeader>
          <CardContent>
            <DynamicFormReport
              form={form}
              onSubmit={onSubmit}
              dynamicParameters={dynamicParameters}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        <div className="flex flex-1 flex-col overflow-x-auto rounded-xl border border-border/60 bg-background/70 w-full">
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 px-6 py-10 text-sm text-muted-foreground">
                <Loader2 className="size-8 animate-spin text-primary/60" />
                <p>Loading report data...</p>
              </div>
            ) : rowsToDisplay.length > 0 ? (
              <div className="px-6 py-4">
                <DynamicTable
                  table={report.table}
                  previewRows={rowsToDisplay}
                />
              </div>
            ) : (
              <div className="flex min-h-[220px] items-center justify-center px-6 py-10 text-sm text-muted-foreground">
                No records match the current parameter selection.
              </div>
            )}
          </ScrollArea>
        </div>
      </StackCol>
    </section>
  )
}

export default ReportContent
