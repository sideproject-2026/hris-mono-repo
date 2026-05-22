import { Separator } from '@/components/ui/separator'

interface EmployeeSetupPolicyProps {
  employeePolicy: AttendanceSetupPolicy
}
const EmployeeSetupPolicy = ({ employeePolicy }: EmployeeSetupPolicyProps) => {
  return (
    <div className="flex flex-col gap-2 p-5 bg-primary rounded-lg">
      <p className="font-semibold text-lg truncate uppercase text-white">
        ATTENDANCE POLICY
      </p>
      <Separator orientation="horizontal" />
      <p className="font-medium text-md truncate uppercase text-white">
        NAME : {employeePolicy.name}
      </p>
      <p className="font-medium text-md truncate uppercase text-white">
        DESCRIPTION : {employeePolicy.description}
      </p>
      <p className="font-medium text-md truncate uppercase text-white">
        GRACE MINUTES : {employeePolicy.graceMinutes}
      </p>
      <p className="font-medium text-md truncate uppercase text-white">
        HALFDAY THRESHOLD HOURS : {employeePolicy.halfdayThresholdHours}
      </p>
      <p className="font-medium text-md truncate uppercase text-white">
        IS ACTIVE : {employeePolicy.isActive ? 'YES' : 'NO'}
      </p>
      <p className="font-medium text-md truncate uppercase text-white">
        LATE THRESHOLD MINUTES : {employeePolicy.lateThresholdMinutes}
      </p>
      <p className="font-medium text-md truncate uppercase text-white">
        OVERTIME LIMIT : {employeePolicy.overTimeLimit}
      </p>
      <p className="font-medium text-md truncate uppercase text-white">
        UNDERTIME THRESHOLD MINUTES : {employeePolicy.undertimeThresholdMinutes}
      </p>
    </div>
  )
}

export default EmployeeSetupPolicy
