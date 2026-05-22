import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'
import RouteSheetComponent from '@/features/attendance-management/attendance-sheets/components/route-component'
import { PeriodSheetProvider } from '@/features/attendance-management/attendance-sheets/components/sheet-provider'
import { filterSearchSheetParser } from '@/features/attendance-management/types/search'

export const Route = createFileRoute('/_app/attendance-sheet/$id/')({
  validateSearch: createStandardSchemaV1(filterSearchSheetParser, {
    partialOutput: true,
  }),
  component: () => {
    const { id } = Route.useParams()
    console.log(id)
    return (
      <PeriodSheetProvider paramId={id}>
        <RouteSheetComponent />
      </PeriodSheetProvider>
    )
  },
})
