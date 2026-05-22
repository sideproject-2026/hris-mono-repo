import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export interface CustomCardProps {
  title: string;
  totalCalculated: string;
  icon: string;
  bgColor?: string;
  onClick?: () => void;
  isFetching: boolean;
}

export const CustomCardItem = ({
  title,
  totalCalculated,
  icon,
  bgColor,
  onClick,
  isFetching,
}: CustomCardProps) => {
  if (isFetching) {
    return (
      <div className="flex h-32 w-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 animate-pulse rounded-full bg-gray-100" />
          <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-50" />
        </div>
        <div className="h-10 w-12 animate-pulse rounded-lg bg-gray-100" />
      </div>
    );
  }

  return (
    <Button
      onClick={onClick}
      asChild={!onClick}
      className={cn(
        "group relative flex h-32 w-full flex-col justify-between overflow-hidden rounded-2xl border bg-white p-5 text-left transition-all duration-300 hover:bg-secondary hover:shadow-lg active:scale-[0.98] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        bgColor || "bg-white border-gray-200 hover:border-primary/20",
        !onClick && "cursor-default",
      )}
      disabled={isFetching}
    >
      <div className="flex h-full w-full flex-col justify-between">
        {/* Accent Overlay */}
        <div className="absolute inset-0  from-secondary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex w-full items-start justify-between">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-white transition-colors">
            {title}
          </p>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary group-hover:bg-secondary group-hover:rotate-12 transition-all duration-500">
            <img
              src={icon}
              alt={`${title} icon`}
              className="h-6 w-6 object-contain group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="relative z-10 mt-auto flex justify-start w-full">
          <p className="font-sans text-4xl font-bold tracking-tighter text-secondary group-hover:text-white transition-colors">
            {totalCalculated.toLocaleString()}
          </p>
        </div>
      </div>
    </Button>
  );
};

const CustomCardCollection = ({ data }: { data: CustomCardProps[] }) => {
  return (
    <>
      {data.map((item, index) => (
        <div
          key={item.title}
          className="animate-in fade-in slide-in-from-bottom duration-500"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "forwards",
          }}
        >
          <CustomCardItem {...item} />
        </div>
      ))}
    </>
  );
};

export default CustomCardCollection;
