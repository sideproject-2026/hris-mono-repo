import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const navMenuItemVariants = cva(
  'inline-flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[state=active]:border-border/80 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1.5 text-xs',
        md: 'px-3 py-2 text-sm',
        lg: 'px-3.5 py-2.5 text-base',
      },
      muted: {
        true: 'text-muted-foreground hover:text-muted-foreground',
        false: 'text-blue-900 hover:bg-background/60 hover:text-blue-600',
      },
    },
    defaultVariants: {
      size: 'md',
      muted: false,
    },
  },
)

type NavMenuProps = React.HTMLAttributes<HTMLDivElement>

const NavMenu = React.forwardRef<HTMLDivElement, NavMenuProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="toolbar"
        className={cn(
          'relative flex w-full flex-wrap items-center gap-2 rounded-sm border border-border/70 bg-gradient-to-b from-background via-background to-muted/40 p-1.5 backdrop-blur h-[50px]',
          'dark:from-muted/30 dark:via-muted/20 dark:to-background/40',
          className,
        )}
        {...props}
      />
    )
  },
)
NavMenu.displayName = 'NavMenu'

type NavMenuGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'end'
}

const NavMenuGroup = React.forwardRef<HTMLDivElement, NavMenuGroupProps>(
  ({ className, align = 'start', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2',
          align === 'end' && 'ml-auto',
          className,
        )}
        {...props}
      />
    )
  },
)
NavMenuGroup.displayName = 'NavMenuGroup'

type NavMenuItemProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof navMenuItemVariants> & {
    asChild?: boolean
    active?: boolean
  }

const NavMenuItem = React.forwardRef<HTMLButtonElement, NavMenuItemProps>(
  (
    {
      className,
      asChild = false,
      active,
      size,
      muted,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        data-state={active ? 'active' : 'inactive'}
        className={cn(
          'text-blue-900',
          navMenuItemVariants({ size, muted, className }),
        )}
        disabled={props.disabled}
        {...props}
        {...(asChild ? {} : { type })}
      />
    )
  },
)
NavMenuItem.displayName = 'NavMenuItem'

export { NavMenu, NavMenuGroup, NavMenuItem }
