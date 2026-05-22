import EmptyContainer from "@/components/container/empty-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "iconsax-reactjs";

const CalendarEvents = () => {
  return (
    <Card className="h-full bg-white w-full">
      <CardContent className="space-y-2">
        <CardHeader className="pb-2 -ml-5">
          <CardTitle className="font-sans text-secondary">
            Events & Holidays
          </CardTitle>
          <CardDescription className="-mt-1 font-sans text-xs">
            Events & Holidays of the month.
          </CardDescription>
        </CardHeader>
        <EmptyContainer
          title="No Events & Holidays Found"
          description="No events or holidays found for this month."
          icon={<Calendar variant="Bulk" size={40} color="#10b981" />}
        />
      </CardContent>
    </Card>
  );
};

export default CalendarEvents;
