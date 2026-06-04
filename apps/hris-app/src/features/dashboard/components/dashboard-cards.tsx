import { useQuery } from '@tanstack/react-query'
import { getListDashboardSummary } from '../hooks/useDashboard'
import {
  Clock,
  FileText,
  UsersRound,
  Anchor,
  BriefcaseBusiness,
  UserStar,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@hris/shared-ui'

interface StatCardProps {
  title: string
  count: number
  icon: LucideIcon
  variant?: 'solid' | 'outline'
}

const StatCard = ({
  title,
  count,
  icon: Icon,
  variant = 'solid',
}: StatCardProps) => {
  const isSolid = variant === 'solid'

  return (
    <div
      className={cn(
        'group relative flex w-full flex-col gap-4 overflow-hidden rounded-lg p-4 transition-all hover:-translate-y-1 hover:shadow-lg',
        isSolid
          ? 'border border-primary/20 bg-primary/95 text-primary-foreground shadow-md'
          : 'border border-zinc-200 bg-white shadow-sm hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950',
      )}
    >
      <div className="relative z-10 flex w-full items-center justify-between">
        <span
          className={cn(
            'font-sans font-semibold uppercase tracking-wide lg:text-sm xl:text-lg',
            isSolid ? 'text-white' : 'text-zinc-500 dark:text-zinc-400',
          )}
        >
          {title}
        </span>
        <div
          className={cn(
            'rounded-xl p-2 lg:p-1.5 xl:p-2',
            isSolid
              ? 'bg-white/20 backdrop-blur-sm dark:bg-black/20'
              : 'bg-primary/10 dark:bg-primary/20',
          )}
        >
          <Icon
            className={cn(
              'h-5 w-5 lg:h-4 lg:w-4 xl:h-5 xl:w-5',
              isSolid ? 'text-white' : 'text-primary',
            )}
          />
        </div>
      </div>
      <div className="relative z-10 mt-2 flex items-baseline gap-2">
        <span
          className={cn(
            'font-sans text-4xl tracking-tight lg:text-2xl xl:text-4xl',
            isSolid
              ? 'font-semibold text-white'
              : 'font-semibold text-zinc-800 dark:text-zinc-100',
          )}
        >
          {count}
        </span>
      </div>
    </div>
  )
}

const ClassificationCard = () => {
  const { data: summary } = useQuery(getListDashboardSummary())

  const items = [
    { id: 1, title: 'Employee', icon: UsersRound },
    { id: 2, title: 'Outsource', icon: BriefcaseBusiness },
    { id: 3, title: 'Cadet', icon: Anchor },
  ]

  return (
    <>
      {items.map((item) => (
        <StatCard
          key={`class-${item.id}`}
          title={item.title}
          icon={item.icon}
          variant="solid"
          count={
            summary?.classifications?.find(
              (c) => c.employeeClassification === item.id,
            )?.count || 0
          }
        />
      ))}
    </>
  )
}

const TypeCard = () => {
  const { data: summary } = useQuery(getListDashboardSummary())

  const items = [
    { id: 3, title: 'Regular', icon: UserStar },
    { id: 2, title: 'Probation', icon: Clock },
    { id: 1, title: 'Project based', icon: FileText },
  ]

  return (
    <>
      {items.map((item) => (
        <StatCard
          key={`type-${item.id}`}
          title={item.title}
          icon={item.icon}
          variant="outline"
          count={
            summary?.types?.find((t) => t.employeeType === item.id)?.count || 0
          }
        />
      ))}
    </>
  )
}

const DashboardCards = () => {
  return (
    <div className="w-full gap-3 flex flex-col">
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
        <ClassificationCard />
      </div>
      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-3">
        <TypeCard />
      </div>
    </div>
  )
}

export default DashboardCards
