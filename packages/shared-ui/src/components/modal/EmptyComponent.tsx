import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../ui/empty'

interface EmptyComponentProps {
  title: string
  description: string
  icon?: React.ReactNode
}

const EmptyComponent = ({ title, description, icon }: EmptyComponentProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon}</EmptyMedia>
        <EmptyTitle className="text-lg font-semibold">{title}</EmptyTitle>
        <EmptyDescription className="text-sm -mt-1">
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

export default EmptyComponent
