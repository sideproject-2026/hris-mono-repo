import { Button } from '@hris/shared-ui'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

interface ExportReportProps {
  reportTitle: string
  data: any[]
}

const ExportPdfReport = ({ reportTitle, data }: ExportReportProps) => {
  const handleExportPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    })

    doc.setFontSize(12)
    doc.text(`Report Name: ${reportTitle}`, 14, 28)

    doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 14, 32)
    doc.setFontSize(11)
    doc.setTextColor(100)

    const headers = Object.keys(data[0] || {}).map((key) => key.toUpperCase())

    const rows = data.map((item) => Object.values(item))

    autoTable(doc, {
      startY: 30,
      head: [headers],
      body: rows,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 6, cellPadding: 1.5 },
    })

    doc.save(`${reportTitle}-${Date.now()}.pdf`)
  }

  return (
    <div className="flex gap-2 justify-end">
      <Button
        type="button"
        size={'sm'}
        variant="ghost"
        className="w-full text-sm gap-2 h-10"
        onClick={handleExportPdf}
      >
        <img
          src="https://img.icons8.com/?size=100&id=mcyAsTDJNTI9&format=png&color=000000"
          alt="pdf"
          className="w-6 h-6"
        />
        Export PDF
      </Button>
    </div>
  )
}

export default ExportPdfReport
