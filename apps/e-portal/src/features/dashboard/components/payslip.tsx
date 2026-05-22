import EmptyContainer from "@/components/container/empty-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Receipt } from "iconsax-reactjs";

const Payslip = () => {
  return (
    <Card className="h-full bg-white w-full">
      <CardContent className="space-y-2">
        <CardHeader className="pb-2 -ml-5">
          <CardTitle className="font-sans text-secondary">Payslip</CardTitle>
          <CardDescription className="-mt-1 font-sans text-xs">
            Latest payslip of the month.
          </CardDescription>
        </CardHeader>
        <EmptyContainer
          title="No Payslip Found"
          description="No payslip found for this month."
          icon={<Receipt variant="Bulk" size={40} color="#10b981" />}
        />
      </CardContent>
    </Card>
  );
};

export default Payslip;
