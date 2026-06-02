import React from 'react'
import { cn } from '@/lib/utils'

interface SwitchInputProps {
  inputComponent?: React.ReactNode
  label: string
  value?: React.ReactNode
  readMode?: boolean
  emptyValue?: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  withBorder?: boolean
  className?: string
  labelClassName?: string
  valueClassName?: string
}

const SwitchInput = ({
  inputComponent,
  label,
  value,
  readMode = false,
  emptyValue = '-',
  orientation = 'vertical',
  withBorder = true,
  className,
  labelClassName,
  valueClassName,
}: SwitchInputProps) => {
  if (!readMode) {
    return <>{inputComponent}</>
  }

  const displayValue =
    value === null || value === undefined || value === '' ? emptyValue : value

  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      className={cn(
        'w-full',
        withBorder && 'rounded-md border border-border bg-muted/30 px-3 py-2',
        isHorizontal
          ? 'flex items-center justify-start gap-4'
          : 'flex flex-col gap-2',
        className,
      )}
    >
      <span
        className={cn(
          'font-sans text-md text-muted-foreground',
          isHorizontal && 'shrink-0',
          labelClassName,
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          'font-sans text-md text-foreground font-semibold',
          isHorizontal && 'text-right',
          valueClassName,
        )}
      >
        {displayValue}
      </div>
    </div>
  )
}

export default SwitchInput
