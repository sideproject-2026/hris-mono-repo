import { CalendarIcon, ClockIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { formatDate } from "date-fns";

export const CenterColumn = ({ children,className }: { children: React.ReactNode, className?: string }) => (
   <div className={`w-full flex flex-col items-center justify-end h-full ${className}`}>
      {children}
   </div>
);


export const DateCell = ({ date, format = "MMM dd, yyyy" }: { date: Date, format?: string }) => {
   const formattedDate = formatDate(date, format);
   return (
      <div className="w-full flex flex-row items-center justify-center h-full">
         <CalendarIcon className="mr-2" size={16} color="#004663" />
         <span className="text-sm w-full">{formattedDate}</span>
      </div>
   );
}

export const TextCell = ({
   text,
   alignment,
   className,
}: {
   text: string;
   alignment?: "left" | "center" | "right";
   className?: string;
}) => {

   const characterLimit = 20;
   const isTruncated = text.length > characterLimit;
   const displayText = isTruncated ? `${text.slice(0, characterLimit)}…` : text;
   const alignmentClass = alignment ? `text-${alignment}` : "text-left";

   if (isTruncated) {
      return (
         <Tooltip>
            <TooltipTrigger asChild>
               <div
                  className={`w-full flex flex-row items-center h-full ${alignmentClass} ${className}`}
               >
                  <span className={`text-sm w-full cursor-help`}>
                     {displayText}
                  </span>
               </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs break-words">
               {text}
            </TooltipContent>
         </Tooltip>
      );
   }

   return (
      <div
         className={`w-full flex flex-row items-center h-full ${alignmentClass}`}
      >
         <span className={`text-sm w-full`}>{displayText}</span>
      </div>
   );
};

export const TimeCell = ({ time }: { time: string }) => {
   return (
      <div className="w-full flex flex-row items-center justify-center h-full">
         <ClockIcon className="mr-2" size={16} color="#004663" />
         <span className="text-sm w-full">{time}</span>
      </div>
   );
};