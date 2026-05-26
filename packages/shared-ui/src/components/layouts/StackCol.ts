import React from 'react'
import { cn } from '@/lib/utils'

type StackColGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type StackColJustifyContent =
	| 'start'
	| 'center'
	| 'end'
	| 'between'
	| 'around'
	| 'evenly'

type StackColAlignItems = 'start' | 'center' | 'end'

interface StackColProps extends React.HTMLAttributes<HTMLDivElement> {
	gap?: StackColGap
	justifyContent?: StackColJustifyContent
	alignItems?: StackColAlignItems
}

const gapClassMap: Record<StackColGap, string> = {
	none: 'gap-0',
	xs: 'gap-1',
	sm: 'gap-2',
	md: 'gap-3',
	lg: 'gap-4',
	xl: 'gap-6',
}

const justifyContentClassMap: Record<StackColJustifyContent, string> = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
	around: 'justify-around',
	evenly: 'justify-evenly',
}

const alignItemsClassMap: Record<StackColAlignItems, string> = {
   start: 'items-start',
   center: 'items-center',
   end: 'items-end',
}

const StackCol = ({
	children,
	className,
	gap = 'md',
	justifyContent = 'start',
	alignItems = 'start',
   ...props
}: StackColProps) => {
	return React.createElement(
		'div',
		{
			className: cn(
				'flex flex-col',
				gapClassMap[gap],
				justifyContentClassMap[justifyContent],
            alignItemsClassMap[alignItems],
				className,
			),
			...props,
		},
		children,
	)
}

export default StackCol
