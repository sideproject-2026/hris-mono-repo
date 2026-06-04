import { PageContainer } from '@hris/shared-ui'
import {
  HeaderContainer,
  HeaderText,
} from '@hris/shared-ui'
import React from 'react'
import ReportTreeView from './report-treeview'
import ReportContent from './report-content'

const AttendanceReport = () => {
  const [activeReportId, setActiveReportId] = React.useState<string | null>(
    null,
  )

  const handleReportSelect = React.useCallback((reportId: string) => {
    setActiveReportId(reportId)
  }, [])

  return (
    <>
      <HeaderContainer>
        <HeaderText
          title="Attendance Reports"
          subtitle="View and manage attendance reports for your organization."
        />
      </HeaderContainer>
      <PageContainer className="flex flex-row h-full w-full items-start gap-2">
        <ReportTreeView
          defaultSelection={activeReportId ?? undefined}
          onSelect={handleReportSelect}
        />

        <ReportContent reportId={activeReportId ?? undefined} />
      </PageContainer>
    </>
  )
}

export default AttendanceReport
