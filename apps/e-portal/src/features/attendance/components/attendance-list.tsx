import { Button } from "@/components/ui/button";
import AttendanceDateInput from "./attendance-date-input";
import AttendanceGrid from "./attendance-grid";
import { DocumentDownload } from "iconsax-reactjs";

const AttendanceList = () => {
  return (
    <div className="w-full h-screen p-3">
        <div className="bg-background rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-sans text-md text-secondary font-semibold">
              Attendance Overview
            </h1>
            <div className="flex gap-3 items-center">
              <Button
                variant={"outline"}
                className="rounded-lg font-sans text-secondary text-sm border-gray-400 hover:ring-1"
              >
                <DocumentDownload variant={"Bold"} size={20} color="#004663" />
                Download
              </Button>
              <AttendanceDateInput />
            </div>
          </div>
          <AttendanceGrid />
        </div>
    </div>
  );
};

export default AttendanceList;
