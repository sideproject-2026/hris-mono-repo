import { StackCol } from '@/components/custom/layouts'
import {
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Empty,
} from '@/components/ui/empty'
import { cn } from '@/lib/utils'

const EmptyReport = ({ className }: { className?: string }) => {
  return (
    <StackCol
      className={cn(
        'h-full  overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm',
        className,
      )}
    >
      <header className="border-b border-border/60 px-6 py-4">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Report Viewer
        </span>
        <h2 className="text-lg font-semibold">Select a report</h2>
        <p className="text-sm text-muted-foreground">
          Choose one of the reports from the library to configure parameters and
          view its preview.
        </p>
      </header>
      <div className="flex flex-1 items-center justify-center p-8">
        <Empty className="border-none bg-transparent p-0">
          <EmptyHeader>
            <EmptyTitle>No report selected</EmptyTitle>
            <EmptyDescription>
              Use the report tree on the left to pick a report. Parameters and a
              live preview will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </StackCol>
  )
}

export default EmptyReport
