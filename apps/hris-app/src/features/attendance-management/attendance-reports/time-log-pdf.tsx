import React from 'react'
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
} from '@react-pdf/renderer'
import { useAttendanceDetailContext } from '../attendance-details/providers/attendance-detail-provider'
import { formatDate } from 'date-fns'
import { ellipsis } from '@/lib/utils'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import { ROUTE } from '@/types/router'
import PageContainer from '@/components/custom/containers/page-container'

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'Helvetica',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },
  tableCell: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    height: 30,
    fontSize: 8,
    alignItems: 'center',
    verticalAlign: 'sub',
  },
  colDate: { width: '8%' },
  colTimeInOut: { width: '14%', textAlign: 'center' },
  colSchedTime: { width: '14%', textAlign: 'center' },
  colTotalHours: { width: '5%', textAlign: 'center' },
  colLate: { width: '8%', textAlign: 'center' },
  colUndertime: { width: '8%', textAlign: 'center' },
  colAbsent: { width: '5%', textAlign: 'center' },
  colRegOt: { width: '8%', textAlign: 'center' },
  colRestdayOt: { width: '8%', textAlign: 'center' },
  colHolidayOt: { width: '8%', textAlign: 'center' },
  colRemarks: { width: '16%', textAlign: 'center' },
})

const TimeLogContainer = () => {
  const { period } = useAttendanceDetailContext()
  return (
    <>
      <HeaderContainer>
        <HeaderText
          title="Time Log Report"
          subtitle={`Time log report for the period ${period?.periodFrom ? formatDate(period.periodFrom, 'MM/dd/yyyy') : ''} to ${period?.periodTo ? formatDate(period.periodTo, 'MM/dd/yyyy') : ''}  - Employee Time Log Report`}
        >
          <HeaderBackButton
            to={ROUTE.ATTENDANCE_SHEET_ROUTE(period?.id ?? '')}
          />
        </HeaderText>
      </HeaderContainer>
      <PageContainer>
        <TimeLogPdf />
      </PageContainer>
    </>
  )
}

const TimeLogPdf = () => {
  const { period, sheets } = useAttendanceDetailContext()
  const details = sheets?.[0].employeeSheet || []

  const fullName = `${sheets?.[0]?.avatar?.lastName}, ${sheets?.[0]?.avatar?.firstName}`
  const company = sheets?.[0]?.company || ''
  const department = sheets?.[0]?.department || ''

  return (
    <PDFViewer
      style={{ width: '100%', height: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <Document>
        <Page size="A4" orientation={'landscape'} style={styles.page}>
          <View>
            <Text style={styles.title}>Attendance Time Log</Text>
            <Text style={styles.subtitle}>
              Date Covered:{' '}
              {period?.periodFrom
                ? formatDate(period?.periodFrom, 'MM/dd/yyyy')
                : ''}{' '}
              To:{' '}
              {period?.periodTo
                ? formatDate(period?.periodTo, 'MM/dd/yyyy')
                : ''}
            </Text>
          </View>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{ ...styles.subtitle, fontWeight: 'bold' }}>
                Employee Name:
              </Text>
              <Text style={{ ...styles.subtitle, marginLeft: 10 }}>
                {fullName}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.subtitle}>Department: {department}</Text>
              <Text style={styles.subtitle}>Company: {company}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableColHeader, styles.colDate]}>Date</Text>
              <Text style={[styles.tableColHeader, styles.colSchedTime]}>
                Scheduled Time
              </Text>
              <Text style={[styles.tableColHeader, styles.colTimeInOut]}>
                Time In/Out
              </Text>

              <Text style={[styles.tableColHeader, styles.colTotalHours]}>
                Hours
              </Text>
              <Text style={[styles.tableColHeader, styles.colLate]}>Late</Text>
              <Text style={[styles.tableColHeader, styles.colUndertime]}>
                Undertime
              </Text>
              <Text style={[styles.tableColHeader, styles.colAbsent]}>
                Absent
              </Text>
              <Text style={[styles.tableColHeader, styles.colRegOt]}>
                Regular OT
              </Text>
              <Text style={[styles.tableColHeader, styles.colRestdayOt]}>
                Restday OT
              </Text>
              <Text style={[styles.tableColHeader, styles.colHolidayOt]}>
                Holiday OT
              </Text>
              <Text style={[styles.tableColHeader, styles.colRemarks]}>
                Remarks
              </Text>
            </View>
            {details.map((detail) => (
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.colDate]}>
                  <Text style={{ fontSize: '8px' }}>
                    {formatDate(detail.date, 'MM/dd/yyyy')}
                  </Text>
                  <Text style={{ fontSize: '6px' }}>{detail.dtrStatus}</Text>
                </View>
                <Text style={[styles.tableCell, styles.colSchedTime]}>
                  {detail.scheduleTimeIn ? detail.scheduleTimeIn : 'N/A'} -{' '}
                  {detail.scheduleTimeOut ? detail.scheduleTimeOut : 'N/A'}
                </Text>
                <Text style={[styles.tableCell, styles.colTimeInOut]}>
                  {detail.timeIn ? detail.timeIn : 'N/A'} -{' '}
                  {detail.timeOut ? detail.timeOut : 'N/A'}
                </Text>

                <Text style={[styles.tableCell, styles.colTotalHours]}>
                  {detail.actualWorkingHour ? detail.actualWorkingHour : 'N/A'}
                </Text>
                <Text style={[styles.tableCell, styles.colLate]}>
                  {detail.lateMinute ? detail.lateMinute : 'N/A'}
                </Text>
                <Text style={[styles.tableCell, styles.colUndertime]}>
                  {detail.underTimeMinute ? detail.underTimeMinute : 'N/A'}
                </Text>
                <Text style={[styles.tableCell, styles.colAbsent]}>
                  {detail.absent}
                </Text>
                <Text style={[styles.tableCell, styles.colRegOt]}>
                  {detail.regularOvertime ? detail.regularOvertime : 'N/A'}
                </Text>
                <Text style={[styles.tableCell, styles.colRestdayOt]}>
                  {detail.restdayOvertime ? detail.restdayOvertime : 'N/A'}
                </Text>
                <Text style={[styles.tableCell, styles.colHolidayOt]}>
                  {detail.holidayOvertime ? detail.holidayOvertime : 'N/A'}
                </Text>
                <Text style={[styles.tableCell, styles.colRemarks]}>
                  {ellipsis(detail.remarks || '', 20)}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default TimeLogContainer
