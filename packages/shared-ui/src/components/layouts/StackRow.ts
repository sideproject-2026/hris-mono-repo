import React from 'react'
import { cn } from '../../lib/utils'

type StackRowGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type StackRowJustifyContent =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'

interface StackRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: StackRowGap
  justifyContent?: StackRowJustifyContent
}

const gapClassMap: Record<StackRowGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
}

const justifyContentClassMap: Record<StackRowJustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const StackRow = ({
  children,
  className,
  gap = 'md',
  justifyContent = 'start',
  ...props
}: StackRowProps) => {
  return React.createElement(
    'div',
    {
      className: cn(
        'flex flex-row',
        gapClassMap[gap],
        justifyContentClassMap[justifyContent],
        className,
      ),
      ...props,
    },
    children,
  )
}

export default StackRow