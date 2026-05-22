interface GroupContainerProps {
  title?: string
  children: React.ReactNode
}
const GroupContainer = ({ title, children }: GroupContainerProps) => {
  return (
    <div className="relative border border-gray-300 rounded-xl p-6 w-full">
      <span className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold uppercase tracking-widest text-primary">
        {title}
      </span>
      <div className="w-full space-y-4 mt-3">{children}</div>
    </div>
  )
}

export default GroupContainer
