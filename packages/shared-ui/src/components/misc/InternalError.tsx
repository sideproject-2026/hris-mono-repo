import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { ServerCrashIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ActionConfig = {
  label: string
  onClick?: () => void
  icon?: LucideIcon
  variant?: React.ComponentProps<typeof Button>['variant']
}

type InternalErrorProps = {
  title?: string
  description?: string
  hint?: string
  className?: string
  icon?: LucideIcon
  primaryAction?: ActionConfig
  secondaryAction?: ActionConfig
  actions?: React.ReactNode
}

const renderActionButton = (
  action?: ActionConfig,
  fallbackVariant: React.ComponentProps<typeof Button>['variant'] = 'default',
) => {
  if (!action) return null
  const Icon = action.icon
  return (
    <Button
      key={action.label}
      onClick={action.onClick}
      variant={action.variant ?? fallbackVariant}
      className="min-w-[9rem] justify-center"
    >
      {Icon ? <Icon className="size-4" /> : null}
      <span>{action.label}</span>
    </Button>
  )
}

const InternalError = ({
  title = 'An internal error occurred',
  description = "We're experiencing temporary difficulties connecting to our servers. Our team has been notified and is looking into it.",
  hint = 'Please try refreshing the page in a few moments.',
  icon: Icon = ServerCrashIcon,
  className,
  primaryAction,
  secondaryAction,
  actions,
}: InternalErrorProps) => {
  return (
    <section
      className={cn(
        'relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-destructive/20 bg-gradient-to-b from-background via-background to-destructive/5 px-8 py-16 text-center shadow-inner',
        'dark:from-destructive/5 dark:via-destructive/5 dark:to-background/10',
        className,
      )}
    >
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.1),_transparent_55%)]"
        aria-hidden
      />

      <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <Icon className="size-7" strokeWidth={1.8} />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto max-w-xl text-base text-muted-foreground">
          {description}
        </p>
      </div>

      {hint ? (
        <p className="mt-4 text-sm text-muted-foreground/80">{hint}</p>
      ) : null}

      {actions ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {actions}
        </div>
      ) : primaryAction || secondaryAction ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {renderActionButton(primaryAction, 'default')}
          {renderActionButton(secondaryAction, 'outline')}
        </div>
      ) : null}
    </section>
  )
}

InternalError.displayName = 'InternalError'

export default InternalError
