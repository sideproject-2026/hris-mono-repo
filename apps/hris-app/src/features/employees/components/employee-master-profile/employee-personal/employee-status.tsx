import CollapsibleContainer from '@/components/custom/containers/collapsible-container'
import {
  Status,
  StatusLabel,
} from '@/components/kibo-ui/status'
import { formatDate } from 'date-fns'
import { Calendar, CalendarTick } from 'iconsax-reactjs'
import {
  CalendarCheck,
  CalendarX,
  Hash,
  ShieldCheck,
  UserRoundX,
} from 'lucide-react'

interface EmployeeStatusProps {
  employeeSummary: EmployeeProfileInfo
}

interface StatusFieldProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  accent?: 'default' | 'muted' | 'danger'
}

const StatusField = ({
  icon,
  label,
  value,
  accent = 'default',
}: StatusFieldProps) => {
  const accentBorderClass =
    accent === 'danger'
      ? 'border-l-rose-400'
      : accent === 'muted'
        ? 'border-l-border'
        : 'border-l-primary/30'

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border-l-2 bg-muted/30 px-4 py-3 ${accentBorderClass} transition-colors hover:bg-muted/50`}
    >
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground shadow-sm">
        {icon}
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <p className="text-md font-normal font-sans text-muted-foreground">
          {label}
        </p>
        <div className="text-sm font-medium font-sans text-foreground">{value}</div>
      </div>
    </div>
  )
}

const EmployeeStatus = ({ employeeSummary }: EmployeeStatusProps) => {
  const { active, company } = employeeSummary
  const isActive = active?.active ?? false

  const formatDateValue = (date?: Date | string | null) => {
    if (!date) return <span className="text-muted-foreground italic">—</span>
    try {
      return (
        <span>{formatDate(new Date(date), 'MMM dd, yyyy')}</span>
      )
    } catch {
      return <span className="text-muted-foreground italic">—</span>
    }
  }

  return (
    <CollapsibleContainer title="Summary Information" baseClassName="w-full">
      <div className="mt-4 space-y-4">
        {/* Active Status — prominent hero card */}
        <div
          className={`relative flex items-center gap-4 overflow-hidden rounded-xl border p-4 ${isActive
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-950/20'
            : 'border-rose-200 bg-rose-50 dark:border-rose-800/50 dark:bg-rose-950/20'
            }`}
        >
          {/* decorative circle */}
          <div
            className={`absolute -right-6 -top-6 size-24 rounded-full opacity-10 ${isActive ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
          />
          <Status
            status={isActive ? 'online' : 'offline'}
            variant={isActive ? 'default' : 'outline'}
            className={`gap-2 px-3 py-1.5 text-sm font-sans font-semibold ${isActive
              ? 'border-emerald-300 bg-emerald-500 text-white shadow-sm'
              : 'border-rose-300 bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
              }`}
          >
            <StatusLabel className="font-sans font-normal text-inherit">
              {isActive ? 'Active' : 'Inactive'}
            </StatusLabel>
          </Status>
          <div className="flex-1">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Employment Status
            </p>
            <p
              className={`text-sm font-sans font-semibold ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}
            >
              {isActive
                ? 'This employee is currently active.'
                : 'This employee is no longer active.'}
            </p>
          </div>
        </div>

        {/* Info fields grid */}
        <div className="grid grid-cols-1 gap-2.5">
          <StatusField
            icon={<Hash className="size-3.5" />}
            label="Employee Code."
            value={
              company?.employeeCode ? (
                <span className="font-sans text-sm">{company?.employeeCode}</span>
              ) : (
                <span className="italic text-muted-foreground">—</span>
              )
            }
          />

          <StatusField
            icon={<Calendar variant={'Bold'} size={18} />}
            label="Probationary Period"
            value={
              active?.probationaryStartDate || active?.probationaryEndDate ? (
                <span>
                  {formatDateValue(active?.probationaryStartDate)}
                  <span className="mx-2 text-muted-foreground">→</span>
                  {formatDateValue(active?.probationaryEndDate)}
                </span>
              ) : (
                <span className="italic text-muted-foreground">—</span>
              )
            }
          />

          <StatusField
            icon={<CalendarTick variant={'Bold'} size={18} />}
            label="Regularization Date"
            value={formatDateValue(active?.regularDate)}
          />

          {!isActive && (
            <>
              <StatusField
                icon={<CalendarX className="size-3.5" />}
                label="Resigned Date"
                value={formatDateValue(active?.dateResigned)}
                accent="danger"
              />

              <StatusField
                icon={<UserRoundX className="size-3.5" />}
                label="Resigned Reason"
                value={
                  active?.resignedReason ? (
                    <span className="leading-snug">{active.resignedReason}</span>
                  ) : (
                    <span className="italic text-muted-foreground">—</span>
                  )
                }
                accent="danger"
              />
            </>
          )}
        </div>
      </div>
    </CollapsibleContainer>
  )
}

export default EmployeeStatus
