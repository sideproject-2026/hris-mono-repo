
import { useState } from "react";
import ViewCardTardiness from "./view-card-tardiness";
import CustomCardCollection, {
  type CustomCardProps,
} from "@/components/shared/custom-cards";
import ViewCardOvertime from "./view-card-overtime";
import {
  getDtrSummary,
  getOvertime,
  getTardiness,
} from "../../hooks/get-dtr-summary";
import { useUserContext } from "@/features/auth/provider/user-provider";

const viewCardFactory = (type: string, data: any, onClose: () => void) => {
  switch (type) {
    case "overtime":
      return (
        <ViewCardOvertime
          data={data}
          type="Overtime"
          icon="/icons/overtime.png"
          open={true}
          onClose={onClose}
        />
      );
    case "late":
      return (
        <ViewCardTardiness
          type="Late"
          data={data}
          icon="/icons/late.png"
          open={true}
          onClose={onClose}
        />
      );
    case "undertime":
      return (
        <ViewCardTardiness
          type="Undertime"
          data={data}
          icon="/icons/undertime.png"
          open={true}
          onClose={onClose}
        />
      );
    default:
      return null;
  }
};

const AttendanceSummary = () => {

  const { profile } = useUserContext();
  const employeeId = profile?.employeeId ?? 0;

  const { data: dtrSummary, isFetching } = getDtrSummary(employeeId);
  const { data: tardinessSummary } = getTardiness(employeeId);
  const { data: overtimeSummary } = getOvertime(employeeId);

  const [modalState, setModalState] = useState<{
    open: boolean;
    type: string | null;
    data: any;
  }>({
    open: false,
    type: null,
    data: null,
  });

  const handleCloseModal = () => {
    setModalState({ open: false, type: null, data: null });
  };

  // const summaryData = {
  //   totalOverTimeInMinutes: 0,
  //   totalNoDtr: 0,
  //   totalLateInMinutes: 0,
  //   totalUnderTimeInMinutes: 0,
  // };
    

  const customData: CustomCardProps[] = [
    {
      title: "Overtime",
      totalCalculated: "0",
      icon: "/icons/overtime.png",
      bgColor: "bg-lime-500",
      isFetching: isFetching,
      onClick: () => {
        setModalState({
          open: true,
          type: "overtime",
          data: overtimeSummary ?? [],
        });
      },
    },
    {
      title: "Absent",
      totalCalculated: "0",
      icon: "/icons/absent.png",
      isFetching: isFetching,
      onClick: () => {
        // Handle absent modal if needed
        setModalState({
          open: false,
          type: "absent",
          data: [],
        });
      },
    },
    {
      title: "Late",
      totalCalculated: "0",
      icon: "/icons/late.png",
      isFetching: isFetching,
      onClick: () => {
        setModalState({
          open: true,
          type: "late",
          data: [],
        });
      },
    },
    {
      title: "Undertime",
      totalCalculated: "0",
      icon: "/icons/undertime.png",
      isFetching: isFetching,
      onClick: () => {
        // Filter tardiness data for undertime entries
        const undertimeData = Array.isArray(tardinessSummary)
          ? tardinessSummary : [];
        setModalState({
          open: true,
          type: "undertime",
          data: undertimeData,
        });
      },
    },
  ];
      

  // Format date range
  const formatDate = (dateString?: Date) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full p-5 space-y-3 h-full">
      <div className="flex flex-col gap-1">
        <h3 className="text-accent-foreground font-semibold font-sans">
          Attendance Summary
        </h3>
        {dtrSummary?.periodStart && dtrSummary?.periodEnd && (
          <p className="paragraph-xs font-sans">
            (Period Covered: {formatDate(dtrSummary.periodStart)} to{" "}
            {formatDate(dtrSummary.periodEnd)})
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {employeeId > 0 ? (
          <CustomCardCollection data={customData} />
        ) : (
          <p className="col-span-full text-center py-4 text-muted-foreground">
            Please login to view attendance summary
          </p>
        )}
      </div>

      {modalState.open &&
        modalState.type &&
        viewCardFactory(modalState.type, modalState.data, handleCloseModal)}
    </div>
  );
};

export default AttendanceSummary;
