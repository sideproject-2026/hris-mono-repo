import AttendanceSummary from "./attendance-summary/attendance-summary";
import LeaveTracker from "./leave-tracker";
import RequestStatusHistory from "./request-status-history/request-status-history";
import RequestStatusHistoryProvider from "../provider/request-status-history-provider";


import CalendarEvents from "./calendar-events/calendar-events";
import HeaderComponent from "./header-component";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar1, Clock, FolderCross } from "iconsax-reactjs";
import EmptyContainer from "@/components/container/empty-container";
import Payslip from "./payslip";
import MemberList from "@/features/member/components/member-list";
import { useUserContext } from "@/features/auth/provider/user-provider";

const Dashboard = () => {
  const { profile } = useUserContext();

  return (
    <div className="flex flex-col w-full min-h-screen p-3 gap-3">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex flex-col flex-1 gap-3">
          <HeaderComponent profile={profile} />
          <Tabs
            defaultValue="attendance"
            className="w-full bg-white rounded-xl shadow-sm border border-slate-100/60 overflow-hidden flex flex-col"
          >
            <div className="border-b border-slate-100 px-4 py-3 bg-slate-50/50">
              <TabsList className="bg-gray-300 p-0 h-10 rounded-lg overflow-hidden">
                <TabsTrigger
                  value="attendance"
                  className="px-6 h-full text-sm font-medium transition-all duration-200 text-white/70 hover:text-white data-[state=active]:bg-card data-[state=active]:text-white rounded-none"
                >
                  <Clock variant="Bold" size={24} />
                  Attendance
                </TabsTrigger>
                <TabsTrigger
                  value="leave"
                  className="px-6 h-full text-sm font-medium transition-all duration-200 text-white/70 hover:text-white data-[state=active]:bg-card data-[state=active]:text-white rounded-none"
                >
                  <Calendar1 variant="Bold" size={24} />
                  Leave
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="p-4 bg-white">
              <TabsContent
                value="attendance"
                className="border-none outline-none -mt-5"
              >
                <AttendanceSummary />
              </TabsContent>
              <TabsContent
                value="leave"
                className="border-none outline-none -mt-5"
              >
                <LeaveTracker />
              </TabsContent>
            </div>
          </Tabs>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <RequestStatusHistoryProvider>
                <RequestStatusHistory />
              </RequestStatusHistoryProvider>
            </div>
            <div className="flex-1 w-full h-full flex items-center justify-center">
              <div className="rounded-lg bg-white p-4 shadow-sm w-full h-full">
                <EmptyContainer
                  icon={
                    <FolderCross
                      size={32}
                      variant={"Bulk"}
                      className="text-gray-300"
                    />
                  }
                  title="Comming Soon!"
                  description="Training Module will be available soon."
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="rounded-lg bg-white p-4 shadow-sm min-h-[150px]">
              CHART-1
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm min-h-[150px]">
              CHART-2
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm min-h-[150px]">
              CHART-3
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[25%] h-fit space-y-2">
          <CalendarEvents />
          <Payslip />
          <MemberList />
          {profile?.rank === "MANAGERIAL" && <MemberList />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
