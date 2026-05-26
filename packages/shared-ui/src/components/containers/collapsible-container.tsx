import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@hris/shared-ui/collapsible'
import { cn } from '@hris/shared-ui/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface CollapsibleContainerProps {
  title: string
  disabled?: boolean
  children: React.ReactNode
  baseClassName?: string
}
const CollapsibleContainer = ({
  title,
  disabled,
  children,
  baseClassName,
}: CollapsibleContainerProps) => {
  const [open, setOpen] = useState(true)
  return (
    <Collapsible
      className={cn('border rounded-lg p-5', baseClassName)}
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger className="font-medium text-sm text-primary flex items-center justify-between w-full uppercase tracking-wider">
        {title}
        <ChevronDown className="size-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4">{children}</CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleContainer
