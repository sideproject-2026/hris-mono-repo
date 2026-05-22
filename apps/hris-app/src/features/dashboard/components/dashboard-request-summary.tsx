import EmptyComponent from '@/components/custom/modal/EmptyComponent'
import { NoteRemove } from 'iconsax-reactjs'

const DashboardRequestSummary = () => {
  return (
    <div className="w-full bg-white p-5 flex flex-col gap-5 border rounded-lg h-full">
      <div className="w-full flex justify-between">
        <span className="text-primary font-sans text-lg font-medium">
          Request Summary
        </span>
      </div>
      <EmptyComponent
        title="Empty Request"
        description="There are no request has been created yet."
        icon={<NoteRemove variant="Bold" size={24} color="#94a3b8" />}
      />
    </div>
  )
}

export default DashboardRequestSummary
