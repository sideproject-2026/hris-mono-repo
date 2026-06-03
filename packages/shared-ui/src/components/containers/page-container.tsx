import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PageContainer = ({
  children,
  className,
  loading,
}: {
  children: React.ReactNode
  className?: string
  loading?: boolean
}) => {
  if (loading) {
    return (
      <div className="h-full w-full">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-full mb-2" />
      </div>
    )
  }

  return (
    <div className={`w-full flex flex-col px-4 ${className} py-4`}>
      {children}
    </div>
  )
}

export default PageContainer
