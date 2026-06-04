import { Button } from '@hris/shared-ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hris/shared-ui'
import { PlusIcon } from 'lucide-react'

const DepartmentForm = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="font-sans text-sm uppercase font-semibold"
        >
          <PlusIcon className="size-4" />
          Create Department
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Department</DialogTitle>
          <DialogDescription>
            Enter the department information below
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default DepartmentForm
