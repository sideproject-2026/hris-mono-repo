import { DataTable } from "@/components/grid/data-table";
import CardSkeleton from "@/components/loader/card-skeleton";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table";
import { Pointer } from "iconsax-reactjs";
import { useAttendanceContext } from "../provider/attendance-provider";
import { CenterColumn, DateCell, TextCell, TimeCell } from "@/components/grid/custom-cell";


const AttendanceGrid = () => {

  const { data: attendanceDetails, isFetching: isLoading } =
    useAttendanceContext();
  

  const columns: ColumnDef<AttendanceDetailType>[] = [
    {
      id: "dtrDate",
      accessorKey: "date",
      header: () => <CenterColumn>Date</CenterColumn>,
      cell: (row) => {
        const date = row.getValue() as Date;
        return (
          <DateCell date={date} />
        );
      },
    },
    {
      accessorKey: "timeIn",
      header: () => <CenterColumn>Time In</CenterColumn>,
      cell: (row) => {
        const timeIn = row.getValue() as string;
        return (
          <TimeCell time={timeIn} />
        );
      },
    },
    {
      accessorKey: "timeOut",
      header: () => <CenterColumn>Time Out</CenterColumn>,
      cell: (row) => {
        const timeOut = row.getValue() as string;
        return (
          <TimeCell time={timeOut} />
        );
      },
    },
     {
      accessorKey: "late",
      header: () => <CenterColumn>Late</CenterColumn>,
      cell: (row) => {
        const late = row.getValue() as string;
        return (
          <span className="text-secondary text-sm font-sans">
            {late}
          </span>
        );
      },
    },
    {
      accessorKey: "undertime",
      header: () => <CenterColumn>Undertime</CenterColumn>,
      cell: (row) => {
        const undertime = row.getValue() as string;
        return (
          <span className="text-secondary text-sm font-sans">
            {undertime}
          </span>
        );
      },
    },
    {
      accessorKey: "absent",
      header: () => <CenterColumn>Absent</CenterColumn>,
      cell: (row) => {
        const absent = row.getValue() as string;
        return (
          <TextCell text={absent} alignment="center" />
          
        );
      },
    },
    {
      header: "ACTIONS",
      size: 50,
      cell: () => {
        return (
          <div className="flex flex-row space-x-2">
            <Button className="rounded-full font-sans text-sm bg-card">
              <Pointer variant={"Bold"} size={20} color="#FFFFFF" />
              File OT
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <CardSkeleton title="" />;
  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={attendanceDetails ?? []}
        searchKey="dtrDate"
      />
    </div>
  );
};

export default AttendanceGrid;
