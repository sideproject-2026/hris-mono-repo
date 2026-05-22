import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface HeaderContainerProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
  loading?: boolean
}

const HeaderContainer = ({
  children,
  loading,
  ...props
}: HeaderContainerProps) => {
  if (loading) {
    return (
      <div className="w-full flex justify-between items-center p-5 bg-secondary">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
      </div>
    )
  }

  return (
    <div
      className="w-full flex justify-between items-center p-5 bg-background border-b shadow-sm z-10 sticky top-0"
      {...props}
    >
      {children}
    </div>
  )
}

const HeaderBackButton = ({ to }: { to: string }) => {
  return (
    <Button variant={'outline'} asChild>
      <Link to={to}>
        <ChevronLeft className="h-4 w-4" />
      </Link>
    </Button>
  )
}

const HeaderText = ({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children?: React.ReactNode
}) => {
  return (
    <div className="flex flex-row items-center gap-4">
      {children}
      <div className="flex flex-col">
        <h1 className="text-xl text-foreground font-medium tracking-tight">
          {title}
        </h1>
        <p className="text-md text-muted-foreground font-normal">{subtitle}</p>
      </div>
    </div>
  )
}

export { HeaderContainer, HeaderBackButton, HeaderText }
