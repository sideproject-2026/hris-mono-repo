import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";

interface ViewCardOvertimeProps {
  open: boolean;
  onClose: () => void;
  data: OvertimeType[];
  type?: string;
  icon?: string;
}
const ViewCardOvertime = ({
  open,
  onClose,
  data,
  type,
  icon,
}: ViewCardOvertimeProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px]! overflow-hidden">
        <DialogHeader>
          <DialogTitle>{type} Overview</DialogTitle>
          <DialogDescription>
            Here are the list of {type} for this month.
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-3 overflow-auto h-[70vh]">
        {data?.map((item) => {
          return (
            <div key={item.otDate} className="w-full p-5 bg-card rounded-md h-fit">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-md font-semibold font-sans text-secondary-foreground">
                    Overtime Date : {item.otDate.split("T")[0]}
                  </p>
                </div>
                <img src={icon} alt="icon" className="w-8 h-8" />
              </div>
              <div className="flex justify-between items-start gap-1 mt-1">
                <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                  Time In : {item.timeIn}
                </p>
                <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                  Time Out : {item.timeOut}
                </p>
              </div>
              <div className="flex justify-between items-start gap-1 mt-1">
                <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                  Overtime Start : {item.otStart}
                </p>
                <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                  Overtime End : {item.otEnd}
                </p>
              </div>
              <div className="flex justify-between items-start gap-1 mt-1">
                <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                  Overall : {item.otTime}
                </p>
              </div>
            </div>
          );
        })}
        </div>
        <Button variant={'default'} className="h-11 font-sans" onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCardOvertime;
