import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestFormSchema, type RequestFormSchemaType } from "../types/schema";
import { Form } from "@/components/ui/form";
import LeaveForm from "./leave-form";
import ButtonLoading from "@/components/buttons/button-loading";
import { Send } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import OvertimeForm from "./overtime-form";
import OfficialBusinessForm from "./official-business-form";
import DtrCorrectionForm from "./dtr-correction-form";
import { SidebarMenuButton } from "@/components/ui/sidebar";

const RequestForm = () => {
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    setSelectedRequest(type);
    setOpen(true);
  };

  const form = useForm<RequestFormSchemaType>({
    resolver: zodResolver(requestFormSchema) as any,
    defaultValues: {
      employeeId: 0,
      requestFor: 0,
      dateFrom: undefined,
      dateTo: undefined,
      purpose: "",
      requestTimeType: undefined,
      requestLeaveType: undefined,
      leavePeriodType: undefined,
      requestOBType: undefined,
      requestStatus: undefined,
      referenceNo: undefined,
      lateFiling: undefined,
    },
  });

  const onSubmit = (data: RequestFormSchemaType) => {
    console.log(data);
    setOpen(false);
    form.reset();
  };

  return (
    <div className="flex items-center w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="flex items-center gap-3 px-3 h-10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all duration-300 group/item border border-transparent">
            <FileText className="size-5 shrink-0 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-200 transition-colors" />
            <span className="font-semibold text-sm font-sans">
              Request Form
            </span>
            <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[--radix-popper-anchor-width] ml-65 -mt-10"
        >
          <DropdownMenuItem onClick={() => handleSelect("Leave")}>
            Leave
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("Official Business")}>
            Official Business
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("Overtime")}>
            Overtime
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("DTR Correction")}>
            DTR Correction
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRequest} Request</DialogTitle>
            <DialogDescription>
              Please fill out the form for your {selectedRequest?.toLowerCase()}{" "}
              request.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {selectedRequest === "Leave" && <LeaveForm form={form} />}
              {selectedRequest === "Official Business" && (
                <OfficialBusinessForm form={form} />
              )}
              {selectedRequest === "Overtime" && <OvertimeForm form={form} />}
              {selectedRequest === "DTR Correction" && (
                <DtrCorrectionForm form={form} />
              )}

              <div className="flex justify-end items-center mt-4 gap-2">
                <Button
                  onClick={() => setOpen(false)}
                  variant="ghost"
                  className="mt-2  font-normal font-sans h-10"
                >
                  Cancel
                </Button>
                <ButtonLoading
                  loading={false}
                  type="submit"
                  className="mt-2  font-normal font-sans h-10"
                  text="Submit"
                  icon={<Send variant="Bold" color="white" size={18} />}
                />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestForm;
