import { StackCol, StackRow } from '@/components/custom/layouts'
import { useQuery } from '@tanstack/react-query'
import { getListDashboardResignation } from '../hooks/useDashboard'

const DashboardResignation = () => {
  const { data: employeeResigned, isLoading } = useQuery(
    getListDashboardResignation({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }),
  )

  return (
    <StackCol className="w-full">
      {employeeResigned?.map((employee) => (
        <StackRow key={employee.employeeId}>
          <StackCol>
            <StackRow>
              <StackCol>
                <span className="text-sm font-semibold">
                  {employee.employeeName}
                </span>
                <span className="text-sm text-muted-foreground">
                  {employee.designation}
                </span>
              </StackCol>
              <StackCol>
                <span className="text-sm text-muted-foreground">
                  {employee.department}
                </span>
                <span className="text-sm text-muted-foreground">
                  {employee.company}
                </span>
              </StackCol>
              <StackCol>
                <span className="text-sm text-muted-foreground">
                  {employee.dateResign}
                </span>
                <span className="text-sm text-muted-foreground">
                  {employee.effectivityDate}
                </span>
              </StackCol>
            </StackRow>
          </StackCol>
        </StackRow>
      ))}
    </StackCol>
  )
}

export default DashboardResignation
