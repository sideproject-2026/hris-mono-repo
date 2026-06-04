import React from 'react'
import { ChevronDown, FileText, FolderTree } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@hris/shared-ui'
import { ScrollArea } from '@hris/shared-ui'
import { cn } from '@hris/shared-ui'

type ReportTreeItem = {
  id: string
  label: string
  description?: string
}

type ReportTreeGroup = {
  id: string
  name: string
  items: ReportTreeItem[]
}

const defaultReportGroups: ReportTreeGroup[] = [
  {
    id: 'general-group',
    name: 'Attendance General',
    items: [
      {
        id: 'lua-per-employee-report',
        label: 'Employee Daily Time Log',
        description:
          'List instances of late arrivals and early departures per employee.',
      },
    ],
  },
  {
    id: 'tardiness-group',
    name: 'Tardiness & Absences',
    items: [
      {
        id: 'undertime-report',
        label: 'Late & Undertime Report',
        description: 'List instances of late arrivals and early departures.',
      },
      {
        id: 'absent-report',
        label: 'Absent Report',
        description: 'List instances of absences.',
      },
    ],
  },

  {
    id: 'overtime-group',
    name: 'Overtime',
    items: [
      {
        id: 'overtime-report',
        label: 'Overtime Report',
        description: 'Summarize approved overtime by employee.',
      },
    ],
  },
]

type ReportTreeViewProps = {
  groups?: ReportTreeGroup[]
  defaultSelection?: string
  onSelect?: (reportId: string) => void
}

const ReportTreeView: React.FC<ReportTreeViewProps> = ({
  groups = defaultReportGroups,
  defaultSelection,
  onSelect,
}) => {
  const initialSelection = React.useMemo(() => {
    if (defaultSelection) {
      return defaultSelection
    }

    for (const group of groups) {
      if (group.items.length > 0) {
        return group.items[0].id
      }
    }

    return null
  }, [defaultSelection, groups])

  const [expandedGroups, setExpandedGroups] = React.useState<
    Record<string, boolean>
  >(() => {
    return groups.reduce<Record<string, boolean>>((acc, group) => {
      acc[group.id] = true
      return acc
    }, {})
  })

  const [activeItem, setActiveItem] = React.useState<string | null>(
    initialSelection,
  )

  React.useEffect(() => {
    setExpandedGroups((prev) => {
      const next: Record<string, boolean> = {}

      groups.forEach((group) => {
        next[group.id] = prev[group.id] ?? true
      })

      return next
    })
  }, [groups])

  React.useEffect(() => {
    setActiveItem((current) => {
      if (initialSelection && initialSelection !== current) {
        return initialSelection
      }

      if (current) {
        return current
      }

      return initialSelection
    })
  }, [initialSelection])

  const handleSelect = React.useCallback(
    (reportId: string) => {
      setActiveItem(reportId)
      onSelect?.(reportId)
    },
    [onSelect],
  )

  React.useEffect(() => {
    if (!defaultSelection && initialSelection) {
      onSelect?.(initialSelection)
    }
  }, [defaultSelection, initialSelection, onSelect])

  return (
    <section className="flex h-full max-h-[calc(100vh-220px)] min-w-[280px] flex-col rounded-2xl border border-border/80 bg-card shadow-sm">
      <header className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Report Library
        </span>
        <FolderTree
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
      </header>
      <ScrollArea className="flex-1">
        <div className="space-y-3 p-3">
          {groups.map((group) => {
            const isExpanded = expandedGroups[group.id] ?? true

            return (
              <Collapsible
                key={group.id}
                open={isExpanded}
                onOpenChange={(open) => {
                  setExpandedGroups((prev) => ({
                    ...prev,
                    [group.id]: open,
                  }))
                }}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-muted">
                  <span>{group.name}</span>
                  <ChevronDown
                    className={cn(
                      'size-4 shrink-0 transition-transform duration-200',
                      isExpanded ? 'rotate-180' : 'rotate-0',
                    )}
                    aria-hidden="true"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pt-2">
                  {group.items.map((item) => {
                    const isActive = item.id === activeItem

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item.id)}
                        className={cn(
                          'flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted',
                        )}
                      >
                        <span
                          className={cn(
                            'mt-1 grid size-6 place-items-center rounded-full border text-muted-foreground transition-colors',
                            isActive &&
                            'border-primary/40 bg-primary/10 text-primary',
                          )}
                        >
                          <FileText className="size-3.5" aria-hidden="true" />
                        </span>
                        <span className="flex flex-col gap-0.5">
                          <span className="font-medium leading-none">
                            {item.label}
                          </span>
                          {item.description ? (
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </ScrollArea>
    </section>
  )
}

export default ReportTreeView
