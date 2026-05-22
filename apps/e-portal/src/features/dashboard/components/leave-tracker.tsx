import CustomCardCollection, {
  type CustomCardProps,
} from "@/components/shared/custom-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


// const allowedTypes = [
//   "VACATION",
//   "SICK",
//   "MATERNITY",
//   "PATERNITY",
//   "SOLOPARENT",
// ] as const;

// Define type for leave type configurations
// type LeaveType = (typeof allowedTypes)[number];

// const leaveTypeConfig: Record<LeaveType, { title: string; icon: string }> = {
//   VACATION: {
//     title: "Vacation",
//     icon: "/icons/vacation.png",
//   },
//   SICK: {
//     title: "Sick",
//     icon: "/icons/sick.png",
//   },
//   MATERNITY: {
//     title: "Maternity",
//     icon: "/icons/maternity.png",
//   },
//   PATERNITY: {
//     title: "Paternity",
//     icon: "/icons/paternity.png",
//   },
//   SOLOPARENT: {
//     title: "Solo Parent",
//     icon: "/icons/solo-parent.png",
//   },
// } as const;

const LeaveTracker = () => {
  

  const customData: CustomCardProps[] = [];

  return (
    <Card className="h-full bg-transparent shadow-none border-none">
      <CardHeader>
        <CardTitle className="font-sans text-secondary">
          Leave Tracker
        </CardTitle>
        <CardDescription className="-mt-1 font-sans text-xs">
          (Period Covered: January - December {new Date().getFullYear()})
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <CustomCardCollection data={customData} />
      </CardContent>
    </Card>
  );
};

export default LeaveTracker;
