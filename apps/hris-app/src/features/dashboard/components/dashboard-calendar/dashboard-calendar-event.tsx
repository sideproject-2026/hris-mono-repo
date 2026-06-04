import { Calendar } from '@hris/shared-ui'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hris/shared-ui'
import { EmptyComponent } from '@hris/shared-ui'
import { formatDate } from 'date-fns'
import { getDisplayText } from '@/lib/utils'
import DashboardCalendarProvider, {
  useDashboardCalendar,
} from './dashboard-calendar-provider'
import { FileUser, PartyPopper } from 'lucide-react'
import { CalendarTick, Cake } from 'iconsax-reactjs'
import { ScrollArea } from '@hris/shared-ui'
import { StackCol } from '@hris/shared-ui'

const DashboardCalendarEvent = () => {
  const { date, setDate, currentMonth, setCurrentMonth } =
    useDashboardCalendar()

  return (
    <div className="w-full flex flex-col gap-3 border p-3 rounded-lg h-full">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        className="rounded-lg border-none [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)] font-sans w-full"
        buttonVariant="ghost"
      />
      <CalendarEvents />
    </div>
  )
}

function CalendarEvents() {
  const { calendarData: holidays, calendarBirthdayData: birthdays } =
    useDashboardCalendar()

  return (
    <Tabs defaultValue="holiday" className="w-full h-full">
      <TabsList className="w-full rounded-sm">
        <TabsTrigger
          value="holiday"
          className="w-full font-sans text-muted-foreground text-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-semibold uppercase flex items-center gap-2"
        >
          <CalendarTick size={16} variant="Bold" />
          Holiday
        </TabsTrigger>
        <TabsTrigger
          value="birthday"
          className="w-full font-sans text-muted-foreground text-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-semibold uppercase flex items-center gap-2"
        >
          <Cake size={16} variant="Bold" />
          Birthday
        </TabsTrigger>
      </TabsList>
      <TabsContent value="holiday">
        <div className="w-full border-0 shadow-none space-y-2 overflow-y-auto max-h-[300px]">
          <>
            {holidays && holidays.length > 0 ? (
              holidays.map((event) => (
                <div
                  key={event.id}
                  className="w-full flex items-center justify-between border-l-[3px] border-l-primary bg-slate-50 p-3 rounded-r-md shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <CalendarTick size={20} color="#007bff" variant="Bold" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-primary text-sm font-semibold uppercase leading-none">
                        {event.holidayName}
                      </span>
                      <span className="text-muted-foreground text-xs uppercase font-medium">
                        {getDisplayText(event.holidayType)}
                      </span>
                    </div>
                  </div>
                  <span className="text-primary text-sm font-semibold whitespace-nowrap">
                    {formatDate(event.holidayDate, 'MMM dd')}
                  </span>
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center p-3 rounded-md text-sm text-muted-foreground border h-[300px]">
                <EmptyComponent
                  title="No holidays found"
                  description="No holidays found for this month"
                  icon={<FileUser className="stroke-gray-400 size-6" />}
                />
              </div>
            )}
          </>
        </div>
      </TabsContent>
      <TabsContent
        value="birthday"
        className="relative z-50 flex flex-col gap-2"
      >
        <ScrollArea className="h-[400px] w-full pr-3 border-0 shadow-none">
          <StackCol className="gap-2">
            {birthdays && birthdays.length > 0 ? (
              birthdays.map((event) => (
                <div
                  key={event.id}
                  className="w-full flex items-center justify-between border-l-[3px] border-l-primary bg-secondary p-3 rounded-r-md shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 rounded-full">
                      <Cake size={20} color="#007bff" variant="Bold" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-orange-600 text-sm font-semibold uppercase leading-none">
                        {event.fullName}
                      </span>
                      <span className="text-orange-500/80 text-xs uppercase font-medium">
                        Birthday
                      </span>
                    </div>
                  </div>
                  <span className="text-orange-600 text-sm font-semibold whitespace-nowrap">
                    {formatDate(event.birthDate, 'MMM dd')}
                  </span>
                </div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center p-3 rounded-md text-sm text-muted-foreground border h-[300px]">
                <EmptyComponent
                  title="No birthdays found"
                  description="No birthdays found for this month"
                  icon={<PartyPopper className="stroke-gray-400 size-6" />}
                />
              </div>
            )}
          </StackCol>
        </ScrollArea>
        <span className="text-center text-sm font-medium text-primary block mt-2">
          No. of Celebrants: {birthdays?.length}
        </span>
      </TabsContent>
    </Tabs>
  )
}

const DashboardCalendarContent = () => {
  return (
    <DashboardCalendarProvider>
      <DashboardCalendarEvent />
    </DashboardCalendarProvider>
  )
}

export default DashboardCalendarContent
