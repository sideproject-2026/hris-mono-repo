import CardSkeleton from "@/components/loader/card-skeleton";
import RequestStatusCards from "@/components/shared/request-status-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRequestStatusHistoryContext } from "../../provider/request-status-history-provider";
import RequestDateInput from "./request-date-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserContext } from "@/features/auth/provider/user-provider";


const RequestStatusHistory = () => {
  const { profile } = useUserContext();

  const { data: requestStatusData, isLoading } =
    useRequestStatusHistoryContext();

  // to load the pending request
  const pendingRequest = requestStatusData?.data?.filter((item: any) => {
    return item.flag === "PENDING";
  });

  // to load the approved or rejectedrequest
  const allRequest = requestStatusData?.data?.filter((item: any) => {
    return item.flag !== "PENDING";
  });

  if (isLoading) {
    return <CardSkeleton title="Request Status History" />;
  }

  return (
    <Card className="h-full rounded-lg bg-white">
      <CardHeader>
        <CardTitle className="font-sans text-secondary flex items-center justify-between gap-2 w-full">
          Request Status History
          <RequestDateInput />
        </CardTitle>
        <CardDescription className="-mt-3 font-sans text-xs">
          All filled requests will be displayed here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full lex flex-col">
          <TabsList className="bg-gray-300 p-0 h-10 rounded-lg overflow-hidden">
            <TabsTrigger
              value="pending"
              className="px-6 h-full text-sm font-medium transition-all duration-200 text-white/70 hover:text-white data-[state=active]:bg-card data-[state=active]:text-white rounded-none"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="px-6 h-full text-sm font-medium transition-all duration-200 text-white/70 hover:text-white data-[state=active]:bg-card data-[state=active]:text-white rounded-none"
            >
              All Request
            </TabsTrigger>
            {profile?.rank === "MANAGERIAL" && (
              <TabsTrigger
                value="for-approval"
                className="px-6 h-full text-sm font-medium transition-all duration-200 text-white/70 hover:text-white data-[state=active]:bg-card data-[state=active]:text-white rounded-none"
              >
                For Approval
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="pending" className="h-full">
            <RequestStatusCards data={pendingRequest ?? []} />
          </TabsContent>
          <TabsContent value="approved" className="h-full">
            <RequestStatusCards data={allRequest ?? []} />
          </TabsContent>
          <TabsContent value="for-approval" className="h-full">
            <RequestStatusCards data={[]} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RequestStatusHistory;
