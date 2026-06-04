import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getListDashboardProbitionary } from '../hooks/useDashboard'
import { ScrollArea } from '@hris/shared-ui'
import { avatarUrl, formatLongDate } from '@/lib/utils'
import { EmptyComponent } from '@hris/shared-ui'
import { Badge } from '@hris/shared-ui'
import { Calendar1, UserRemove } from 'iconsax-reactjs'
import { StackCol } from '@hris/shared-ui'
import { UserAvatarCell } from '@hris/shared-ui'
import { Input } from '@hris/shared-ui'

const DashboardProbitionary = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      '0',
    )}`,
  )

  const monthParam = selectedMonth
    ? parseInt(selectedMonth.split('-')[1], 10)
    : new Date().getMonth() + 1
  const yearParam = selectedMonth
    ? parseInt(selectedMonth.split('-')[0], 10)
    : new Date().getFullYear()

  const { data: probitionaryReturn, isLoading } = useQuery(
    getListDashboardProbitionary({
      month: monthParam,
      year: yearParam,
    }),
  )

  const probitionaryList = Array.isArray(probitionaryReturn)
    ? probitionaryReturn
    : (probitionaryReturn as any)?.data || []

  return (
    <StackCol className="-mt-1 h-full">
      <Input
        type="month"
        className="w-fit text-sm uppercase h-11 ml-auto"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />
      {!isLoading && probitionaryList?.length === 0 ? (
        <div className="p-6 flex items-center justify-center w-full h-full">
          <EmptyComponent
            title="No Probationary Staff"
            description="There are currently no employees under probation for this period."
            icon={<UserRemove variant="Bold" size={24} color="#94a3b8" />}
          />
        </div>
      ) : (
        <ScrollArea className="h-full w-full">
          <div className="flex flex-col gap-3 p-2">
            {probitionaryList?.map(
              (employee: DashboardProbitionaryTypes, index: number) => {
                const totalRem = Number(employee.totalDayRemaining) || 0
                const isNearing = totalRem <= 15

                return (
                  <div
                    key={`${employee.employeeId}-${index}`}
                    className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden"
                  >
                    {/* Vibrant Accent Strip */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors duration-500 ease-in-out ${isNearing
                        ? 'bg-gradient-to-b from-amber-400 to-orange-500'
                        : 'bg-gradient-to-b from-primary/80 to-primary'
                        }`}
                    />

                    {/* Left Section: User Info */}
                    <div className="flex flex-col gap-1 pl-3 w-full">
                      <UserAvatarCell
                        name={employee.employeeName}
                        avatarUrl={avatarUrl(employee.employeeId)}
                        description={employee.department}
                        className="text-nowrap text-sm font-semibold text-zinc-900 dark:text-zinc-100 uppercase"
                      />
                    </div>

                    {/* Right Section: Dates & Remaining Days */}
                    <div className="flex flex-col md:items-end gap-2.5 w-full md:w-auto mt-2 md:mt-0 pl-3 md:pl-0 z-10 relative">
                      <div className="flex items-center gap-2 text-[0.7rem] text-muted-foreground bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1.5 rounded-lg border border-zinc-100 dark:border-zinc-800/80">
                        <Calendar1
                          variant="Bold"
                          size={15}
                          className={
                            isNearing ? 'text-amber-500' : 'text-primary/80'
                          }
                        />
                        <span className="font-medium uppercase text-nowrap">
                          {employee.fromDate
                            ? formatLongDate(employee.fromDate.toString())
                            : 'N/A'}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-600 px-0.5 font-bold">
                          -
                        </span>
                        <span className="font-medium uppercase text-nowrap">
                          {employee.endDate
                            ? formatLongDate(employee.endDate.toString())
                            : 'N/A'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 px-1 text-right">
                        {isNearing && (
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-200 dark:border-amber-800/60 text-[0.65rem] px-2 py-0 h-5 font-bold uppercase tracking-wider shadow-none mr-1"
                          >
                            Ending Soon
                          </Badge>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">
                          Days Left
                        </span>
                        <span
                          className={`text-sans font-medium leading-none ${isNearing
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-primary'
                            }`}
                        >
                          {employee.totalDayRemaining}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              },
            )}
          </div>
        </ScrollArea>
      )}
    </StackCol>
  )
}

export default DashboardProbitionary
