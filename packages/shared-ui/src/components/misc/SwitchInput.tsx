import React, { useEffect, useState } from 'react'
import { Lock, Pencil } from 'lucide-react'
import { cn } from '../../lib/utils'

interface SwitchInputProps {
  inputComponent: React.ReactNode
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
  const [isReadMode, setIsReadMode] = useState(readMode)
  const [hovered, setHovered] = useState(false)

  const displayValue =
    value === null || value === undefined || value === '' ? emptyValue : value

  const isHorizontal = orientation === 'horizontal'


  // useEffect(() => {
  //   setIsReadMode(readMode);
  // },[readMode]);

  if (!isReadMode) {
    return (
      <div
        className="relative w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {inputComponent}
        {hovered && (
          <button
            type="button"
            onClick={() => setIsReadMode(true)}
            className="absolute right-2 top-2 z-10 rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <Lock size={14} />
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative w-full',
        withBorder && 'rounded-md border border-border bg-muted/30 px-3 py-2',
        isHorizontal
          ? 'flex items-center justify-start gap-4'
          : 'flex flex-col gap-2',
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <button
          type="button"
          onClick={() => setIsReadMode(false)}
          className="absolute right-2 top-2 z-10 rounded p-0.5 text-muted-foreground hover:text-foreground"
        >
          <Pencil size={14} />
        </button>
      )}
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
