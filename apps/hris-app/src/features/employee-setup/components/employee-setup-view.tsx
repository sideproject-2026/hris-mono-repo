import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye } from 'iconsax-reactjs'
import EmployeeSetupSchedule from './employee-setup-schedule'
import EmployeeSetupPolicy from './employee-setup-policy'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface EmployeeSetupViewProps {
  employeeSetup: EmployeeSetupTypes
}

const EmployeeSetupView = ({ employeeSetup }: EmployeeSetupViewProps) => {
  console.log(employeeSetup)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <Eye size="20px" variant="Bold" />
          <span className="text-md font-sans font-normal">
            View Schedule & Policy
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-fit!">
        <DialogHeader>
          <DialogTitle className="uppercase">
            Employee Schedule & Policy
          </DialogTitle>
          <DialogDescription className="uppercase">
            View employee schedule and policy details
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 relative">
          <div className="flex flex-col gap-2 border rounded-md p-5">
            <p className="text-lg font-bold">EMPLOYEE INFORMATION</p>
            <div className="flex flex-row justify-between gap-10">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <p className="text-md font-medium">
                    FULL NAME: {employeeSetup.firstName}{' '}
                    {employeeSetup.lastName} {'-'}
                  </p>
                  <p className="text-xs text-muted-foreground font-semibold">
                    {employeeSetup.employeeID}
                  </p>
                </div>
                <p className="text-md font-medium">
                  <span className="text-md font-medium">DESIGNATION:</span>{' '}
                  {employeeSetup.designation || 'NO DESIGNATION'}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-md font-medium">
                  <span className="text-md font-medium">DEPARTMENT:</span>{' '}
                  {employeeSetup.department || 'NO DEPARTMENT'}
                </p>
                <p className="text-md font-medium">
                  <span className="text-md font-medium">COMPANY:</span>{' '}
                  {employeeSetup.company || 'NO COMPANY'}
                </p>
              </div>
            </div>
          </div>
          <Tabs className="relative">
            <TabsList className="w-full">
              <TabsTrigger value="schedule">SCHEDULE</TabsTrigger>
              <TabsTrigger value="policy">POLICY</TabsTrigger>
            </TabsList>
            <TabsContent value="schedule">
              <EmployeeSetupSchedule
                workSchedule={employeeSetup.workSchedule}
              />
            </TabsContent>
            <TabsContent value="policy">
              <EmployeeSetupPolicy
                employeePolicy={employeeSetup.attendancePolicy}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeSetupView
