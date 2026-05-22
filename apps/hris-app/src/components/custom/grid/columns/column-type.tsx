import { formatDate } from 'date-fns'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { createAvatarFallback, getTimeAgo } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StackCol } from '../../layouts'

export const TextCell = ({
  children,
  alignment,
  className,
}: {
  children: React.ReactNode
  alignment?: 'start' | 'center' | 'end'
  className?: string
}) => {
  const alignmentClass = alignment ? `justify-${alignment}` : 'justify-start'
  return (
    <div
      className={`text-sm ${alignmentClass} w-full flex flex-row items-center ${className}`}
    >
      {children}
    </div>
  )
}

export const TextWithTooltipCell = ({
  text,
  limit,
  alignment,
}: {
  text: string
  limit?: number
  alignment?: 'left' | 'center' | 'right'
}) => {
  const characterLimit = limit ?? 15
  const isTruncated = text.length > characterLimit
  const displayText = isTruncated ? `${text.slice(0, characterLimit)}…` : text
  const alignmentClass = alignment ? `text-${alignment}` : 'text-left'

  if (isTruncated) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`text-sm ${alignmentClass} cursor-help`}>
            {displayText}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs break-words">{text}</TooltipContent>
      </Tooltip>
    )
  }

  return <span className={`text-sm ${alignmentClass}`}>{displayText}</span>
}

export const SwitchCell = ({ value }: { value: boolean }) => {
  return (
    <div>
      <Switch checked={value} disabled />
    </div>
  )
}

export const ToolTipTextCell = ({
  children,
  alignment,
  description,
}: {
  children: React.ReactNode
  description?: string
  alignment?: 'start' | 'center' | 'end'
}) => {
  const alignmentClass = alignment ? `justify-${alignment}` : 'justify-start'

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={`text-sm ${alignmentClass} cursor-help`}>
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs break-words">
        {description}
      </TooltipContent>
    </Tooltip>
  )
}

export const DateWithTimeTextCell = ({ date }: { date: Date }) => (
  <div className="w-full flex flex-col justify-center">
    <span className="text-sm uppercase">
      {formatDate(date, 'MMM dd, yyyy')}
    </span>
    <span className="text-xs text-muted-foreground">
      {getTimeAgo(date.toString())}
    </span>
  </div>
)

export const TextCenterColumn = ({
  text,
  children,
}: {
  text?: string
  children?: React.ReactNode
}) => (
  <div className="w-full flex justify-center items-center">
    {children ? children : <span className="text-sm text-center">{text}</span>}
  </div>
)

export const BadgeCell = ({
  text,
  variant = 'default',
  alignment,
  className,
}: {
  text: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  alignment?: 'start' | 'center' | 'end'
  className?: string
}) => {
  const alignmentClass = alignment ? `justify-${alignment}` : 'justify-start'

  return (
    <div className={`w-full flex items-center ${alignmentClass}`}>
      <Badge variant={variant} className={className}>
        {text}
      </Badge>
    </div>
  )
}

interface UserAvatarCellProps {
  name: string
  avatarUrl?: string
  hideName?: boolean
  className?: string
  description?: string
}

export const UserAvatarCell: React.FC<UserAvatarCellProps> = ({
  name,
  avatarUrl,
  className,
  hideName = false,
  description,
}) => {
  const urlSource = `http://employees.crossworldmarine.com:1198/Crossworld%20Time%20Attendance/images/${avatarUrl}`

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Avatar>
        <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
        <AvatarFallback className="text-primary fontsans text-sm">
          {createAvatarFallback(name)}
        </AvatarFallback>
      </Avatar>
      <StackCol className="gap-0">
        {!hideName && <span className="text-sm">{name}</span>}
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </StackCol>
    </div>
  )
}
