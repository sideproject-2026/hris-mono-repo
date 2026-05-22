import { Button } from '@/components/ui/button'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface ExportExcelReportProps {
  data: any[]
  reportTitle: string
}

const ExportExcelReport = ({ data, reportTitle }: ExportExcelReportProps) => {
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    saveAs(dataBlob, `${reportTitle}-${Date.now()}.xlsx`)
  }

  return (
    <Button
      type="button"
      size={'sm'}
      variant="ghost"
      className=" text-sm gap-2 h-10"
      onClick={handleExportExcel}
    >
      <img
        src="https://img.icons8.com/?size=100&id=117561&format=png&color=000000"
        alt="excel"
        className="w-6 h-6"
      />
      Export Excel
    </Button>
  )
}

export default ExportExcelReport
