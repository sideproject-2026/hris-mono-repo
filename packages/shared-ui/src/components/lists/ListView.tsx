import type { ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { cn } from "../../lib/utils";

export type ListViewProps<TItem> = {
  data: Array<TItem>;
  renderItem: (item: TItem, index: number) => ReactNode;
  getKey?: (item: TItem, index: number) => string | number;
  isLoading?: boolean;
  emptyState?: ReactNode;
  header?: ReactNode;
  maxHeight?: number;
  scrollAreaClassName?: string;
  className?: string;
};

const defaultEmptyState = <p className="py-6 text-sm text-muted-foreground">No data available.</p>;

const ListView = <TItem,>({
  data,
  renderItem,
  getKey,
  isLoading,
  scrollAreaClassName,
  emptyState,
  header,
  maxHeight = 360,
  className,
}: ListViewProps<TItem>) => {
  return (
    <div className={cn("w-full rounded-md border bg-card", className)}>
      {header ? <div className="px-4 py-3 text-sm font-semibold">{header}</div> : null}
      {header ? <Separator /> : null}
      <ScrollArea className={cn("px-4", scrollAreaClassName)}>
        {isLoading ? (
          <div className="space-y-3 py-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full" />
            ))}
          </div>
        ) : data.length ? (
          <ul className="divide-y divide-border px-2">
            {data.map((item, index) => (
              <li key={getKey ? getKey(item, index) : index} className="py-3 text-sm">
                {renderItem(item, index)}
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            {emptyState ?? defaultEmptyState}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ListView;