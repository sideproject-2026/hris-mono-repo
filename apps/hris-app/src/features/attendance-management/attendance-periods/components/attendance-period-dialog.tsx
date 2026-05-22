import { SaveIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useState } from 'react'
import { toast } from 'sonner'
import { attendancePeriodSchema } from '../../types/schema'
import { useCreateAttendancePeriodMutation } from '../../hooks/useAttendanceProcess'
import { Step1, Step2, Step3 } from './actions-wizards'
import { useAttendancePeriodContext } from './attendance-period-provider'
import type {ReactNode} from 'react';
import type { AttendancePeriodFormValues } from '../../types/schema'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { SwitchStep } from '@/components/custom/misc/SwitchStep'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useJobStatusTrackingContext } from '@/components/custom/misc/job-status/JobStatusTracking'

const defaultValues = {
  name: '',
  description: '',
  periodType: 1,
  company: '',
  periodStart: new Date(),
  periodEnd: new Date(),
  ids: [],
  automate: true,
}

const AttendancePeriodDialog = ({children} : {children: ReactNode}) => {
  
  const maxSteps = 3
  const [step, setStep] = useState<number>(1)
  const {mutateAsync, isPending} = useCreateAttendancePeriodMutation();
  const {setJobId} = useJobStatusTrackingContext();
  
  const {onRefresh} = useAttendancePeriodContext();

  const form = useForm<AttendancePeriodFormValues>({
    resolver: zodResolver(attendancePeriodSchema),
    defaultValues: defaultValues,
  });

 

  const handleSubmit = async (data: AttendancePeriodFormValues) => {
    await mutateAsync(data,{
      onSuccess: (response) => {
        console.log('Create Attendance Period Response:', response);
        form.reset();
        toast.success(`Attendance Period successfully queued for creation. Job ID: ${response.jobId}`);
        setJobId(response.jobId);
        onRefresh();
      },
      onError: (error) => {
        toast.error(`Error creating Attendance Period: ${error.message}`);
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
       {children}
      </DialogTrigger>
      <DialogContent className="lg:max-w-3xl max-w-full">
        <DialogHeader>
          <DialogTitle>Create Attendance Period</DialogTitle>
          <DialogDescription>
            Use this dialog to create a new attendance period.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-6">
            <SwitchStep
              step={step}
              components={[
                <Step1 form={form} />,
                <Step2 form={form} />,
                <Step3 form={form} />,
              ]}
            />
          </form>
        </Form>
        <DialogFooter>
          {step > 1 && (
            <Button variant={'outline'} onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          {step < maxSteps && (
            <Button variant="outline" onClick={() => setStep(step + 1)}>
              Next
            </Button>
          )}
          {step === maxSteps && (
            <ButtonLoading
              loading={isPending}
              onClick={() => form.handleSubmit(handleSubmit)()}
              text='Create Period'
              icon={<SaveIcon className="h-4 w-4" />}
            />
            
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AttendancePeriodDialog
