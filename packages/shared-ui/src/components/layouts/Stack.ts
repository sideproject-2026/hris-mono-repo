import React from 'react'
import { cn } from '../../lib/utils'

type StackOrientation = 'row' | 'col'
type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type StackJustifyContent =
	| 'start'
	| 'center'
	| 'end'
	| 'between'
	| 'around'
	| 'evenly'

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: StackOrientation
	gap?: StackGap
	justifyContent?: StackJustifyContent
}

const gapClassMap: Record<StackGap, string> = {
	none: 'gap-0',
	xs: 'gap-1',
	sm: 'gap-2',
	md: 'gap-3',
	lg: 'gap-4',
	xl: 'gap-6',
}

const justifyContentClassMap: Record<StackJustifyContent, string> = {
	start: 'justify-start',
	center: 'justify-center',
	end: 'justify-end',
	between: 'justify-between',
	around: 'justify-around',
	evenly: 'justify-evenly',
}

const orientationClassMap: Record<StackOrientation, string> = {
	row: 'flex-row',
	col: 'flex-col',
}

const Stack = ({
	children,
	className,
	orientation = 'row',
	gap = 'md',
	justifyContent = 'start',
	...props
}: StackProps) => {
	return React.createElement(
		'div',
		{
			className: cn(
				'flex',
				orientationClassMap[orientation],
				gapClassMap[gap],
				justifyContentClassMap[justifyContent],
				className,
			),
			...props,
		},
		children,
	)
}

export default Stack
