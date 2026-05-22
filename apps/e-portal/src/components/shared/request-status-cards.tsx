import { REQUEST_TYPES } from "@/types/constant";
import { FolderCross } from "iconsax-reactjs";
import { Badge } from "../ui/badge";
import { formatDate } from "date-fns";
import {
  User,
  CalendarClock,
  HeartOff,
  FileText,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import EmptyContainer from "../container/empty-container";

interface RequestStatusCardsProps {
  data: RequestStatusType[];
}

const getRequestIcon = (id: number) => {
  const iconProps = "h-5 w-5";
  switch (id) {
    case 1:
      return <img src="/icons/overtime.png" alt="" className={iconProps} />;
    case 2:
      return <img src="/icons/vacation.png" alt="" className={iconProps} />;
    case 3:
      return <img src="/icons/sick.png" alt="" className={iconProps} />;
    case 4:
    case 5:
      return <img src="/icons/soloparent.png" alt="" className={iconProps} />;
    case 6:
      return <User className={iconProps} />;
    case 7:
      return <img src="/icons/undertime.png" alt="" className={iconProps} />;
    case 8:
      return <img src="/icons/undertime.png" alt="" className={iconProps} />;
    case 9:
      return <img src="/icons/undertime.png" alt="" className={iconProps} />;
    case 10:
      return <CalendarClock className={iconProps} />;
    case 11:
      return <HeartOff className={iconProps} />;
    default:
      return <FileText className={iconProps} />;
  }
};

const getStatusColor = (flag: string) => {
  switch (flag?.toUpperCase()) {
    case "PENDING":
      return "bg-gray-500 text-white border-gray-500 hover:bg-gray-500";
    case "APPROVED":
      return "bg-secondary text-white border-secondary hover:bg-secondary";
    case "CANCELLED":
      return "bg-red-500 text-white border-red-500 hover:bg-red-500";
    default:
      return "bg-red-500 text-white border-red-500 hover:bg-red-500";
  }
};

const RequestStatusCards = ({ data }: RequestStatusCardsProps) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center p-8 bg-gray-50/30 rounded-2xl border border-dashed border-gray-200">
        <EmptyContainer
          icon={
            <FolderCross size={32} variant={"Bulk"} className="text-gray-300" />
          }
          title="No Requests Active"
          description="You haven't submitted any requests for the selected period."
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 pr-2 max-h-[500px] overflow-y-auto custom-scrollbar pt-1">
      {data.map((item, index) => {
        const requestType = REQUEST_TYPES.find(
          (type) => type.id === item.requestType,
        );
        const requestTypeName = requestType?.name ?? "Other Request";

        return (
          <div
            key={item.requestNo}
            className={cn(
              "group relative flex items-center justify-between gap-4 rounded-2xl bg-white border border-gray-100 p-4 hover:border-secondary/30 transition-all duration-300 animate-in slide-in-from-right",
              `fill-mode-forwards`,
            )}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1.5 bg-secondary/20 rounded-r-full group-hover:h-3/4 group-hover:bg-secondary transition-all duration-300" />

            <div className="flex items-center gap-4">
              {/* Icon Container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary group-hover:bg-secondary group-hover:rotate-20 transition-all duration-500">
                <div className="group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                  {getRequestIcon(item.requestType)}
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold font-sans text-secondary group-hover:text-primary transition-colors">
                  {requestTypeName}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground font-sans">
                  <Calendar className="h-4 w-4" />
                  {formatDate(item.requestDate, "MMMM dd, yyyy")}
                </div>
                <p className="text-[11px] font-sans text-gray-400 mt-1 uppercase tracking-tight">
                  Ref: {item.requestNo}
                </p>
              </div>
            </div>

            {/* Status & Action */}
            <div className="flex flex-col items-end gap-2.5">
              <Badge
                variant="outline"
                className={cn(
                  "px-3 py-1 text-[10px] font-bold font-sans uppercase tracking-widest rounded-full border-2 transition-all duration-300",
                  getStatusColor(item.flag),
                )}
              >
                {item.flag}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestStatusCards;
