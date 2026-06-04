import GreetingCard from './greetings-card'
import DashboardCards from './dashboard-cards'
import DashboardRequestSummary from './dashboard-request-summary'
import DashboardCalendarContent from './dashboard-calendar/dashboard-calendar-event'
import DashboardProbitionary from './dashboard-probitionary'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hris/shared-ui'
import DashboardResignation from './dashboard-resignation'
import { StackCol } from '@hris/shared-ui'
import { Clock, UserMinus } from 'iconsax-reactjs'

const DashboardPage = () => {
  return (
    <div className="w-full h-full p-2 flex flex-col xl:flex-row gap-3">
      <StackCol className="w-full">
        <GreetingCard />
        <DashboardCards />
        <div className="w-full gap-3 grid grid-cols-1 min-[1367px]:grid-cols-2 h-full">
          <div className="w-full p-1 flex flex-col gap-5 border rounded-lg h-full">
            <Tabs defaultValue="probationary" className="w-full">
              <TabsList>
                <TabsTrigger
                  value="probationary"
                  className="w-full gap-2 font-sans text-muted-foreground text-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-semibold uppercase"
                >
                  <Clock size={18} variant="Bold" />
                  Probationary
                </TabsTrigger>
                <TabsTrigger
                  value="resignation"
                  className="w-full gap-2 font-sans text-muted-foreground text-md data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-semibold uppercase"
                >
                  <UserMinus size={18} variant="Bold" />
                  Resignation
                </TabsTrigger>
              </TabsList>
              <TabsContent value="probationary">
                <DashboardProbitionary />
              </TabsContent>
              <TabsContent value="resignation">
                <DashboardResignation />
              </TabsContent>
            </Tabs>
          </div>
          <DashboardRequestSummary />
        </div>
      </StackCol>
      <div className="w-[30%] h-fit">
        <DashboardCalendarContent />
      </div>
    </div>
  )
}

export default DashboardPage
