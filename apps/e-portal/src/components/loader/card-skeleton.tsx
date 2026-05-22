
interface CardSkeletonProps {
    title: string
}
const CardSkeleton = ({ title }: CardSkeletonProps) => {
  return (
    <div className="bg-accent rounded-md text-card-foreground p-5 space-y-3 w-full">
      <h3 className="text-accent-foreground font-semibold">{title}</h3>
      <div className="flex flex-col gap-3 w-full">
        <span className="animate-pulse bg-gray-200 h-5 w-full rounded-full"></span>
        <span className="animate-pulse bg-gray-200 h-4 w-full rounded-full"></span>
      </div>
    </div>
  )
}

export default CardSkeleton