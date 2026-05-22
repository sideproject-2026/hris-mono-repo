import { convertMinutesToHours } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ViewCardTardinessProps {
  open: boolean;
  onClose: () => void;
  data: UndertimeType[];
  type?: string;
  icon?: string;
}
const ViewCardTardiness = ({
  open,
  onClose,
  data,
  type,
  icon,
}: ViewCardTardinessProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[700px]! overflow-hidden">
        <DialogHeader>
          <DialogTitle>{type} Overview</DialogTitle>
          <DialogDescription>
            Here are the list of {type} for this month.
          </DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-3 overflow-auto h-full">
        {data?.map((item) => {
          return (
            <div key={item.dtrDate} className="w-full p-5 bg-card rounded-md h-fit">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold font-sans text-secondary-foreground">
                    {item.dtrDay}
                  </p>
                  <p className="text-sm font-semibold font-sans text-secondary-foreground">
                    {item.dtrDate.split("T")[0]}
                  </p>
                </div>
                <img src={icon} alt="icon" className="w-8 h-8" />
              </div>
              <div className="flex justify-between items-start gap-1 mt-3">
                <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                  Time In : {item.timeIn}
                </p>
                <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                  Time Out : {item.timeOut}
                </p>
              </div>
              <div className="flex flex-col justify-between items-start gap-1 mt-3">
                <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                  Total Working : {item.workTime}
                </p>
                {type === "Late" ? (
                  <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                    Late : {convertMinutesToHours(item.lateInMinute)}
                  </p>
                ) : (
                  <p className="text-sm font-normal font-sans text-secondary-foreground w-full">
                    Undertime : {convertMinutesToHours(item.underTimeMinute)}
                  </p>
                )}
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

export default ViewCardTardiness;
