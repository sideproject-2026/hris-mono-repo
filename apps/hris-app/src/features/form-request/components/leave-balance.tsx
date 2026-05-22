import { useQuery } from '@tanstack/react-query'
import { useLeaveBalanceQueryOptions } from '../hooks/useFormRequest'
import { Separator } from '@/components/ui/separator'
import { getLeaveBalances, typeMapping } from '@/lib/utils'

interface LeaveBalanceProps {
  employeeId: number
  requestLeaveType: number
}

const LeaveBalance = ({ employeeId, requestLeaveType }: LeaveBalanceProps) => {
  const { data: rawData, isLoading } = useQuery(
    useLeaveBalanceQueryOptions({ employeeId }),
  )

  const balances = rawData ? getLeaveBalances(rawData.data) : {}

  const config = typeMapping[requestLeaveType]
  const balanceValue = config ? balances[config.key] || 0 : 0
  const label = config ? config.label : 'Unknown'

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Separator orientation="horizontal" />
      <div className="flex items-center w-full gap-3">
        <p className="text-xs opacity-80 uppercase font-semibold text-nowrap text-primary">
          {label} Balance :
        </p>
        <p className="text-lg font-bold text-primary">
          {balanceValue.toFixed(2)}
        </p>
      </div>
    </>
  )
}

export default LeaveBalance
