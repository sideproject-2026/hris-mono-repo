import { ButtonLoading } from '@hris/shared-ui'
import { request } from '@/lib/http'
import { ApiRoutes } from '@/types/api-routes'
import { Export } from 'iconsax-reactjs'
import { useTransition } from 'react'
import { toast } from 'sonner'

const ExportSetupButton = () => {
  const [isPending, startTransition] = useTransition()

  const handleExport = () => {
    startTransition(async () => {
      try {
        var url = ApiRoutes.EMPLOYEE_SETUP.EXPORT
        var response = await request.exportExcel(
          url,
          `employees-${new Date().toISOString()}.xlsx`,
        )
        toast.success('Employees exported successfully.')
      } catch (error) {
        console.error('Error exporting employees:', error)
        toast.error('Failed to export employees. Please try again.')
      }
    })
  }

  return (
    <ButtonLoading
      icon={<Export size={'32px'} variant="Bold" color="#004663" />}
      text="Export"
      variant={'ghost'}
      disabled={isPending}
      onClick={handleExport}
      loading={isPending}
      className="font-sans text-sm uppercase font-semibold"
    />
  )
}

export default ExportSetupButton
