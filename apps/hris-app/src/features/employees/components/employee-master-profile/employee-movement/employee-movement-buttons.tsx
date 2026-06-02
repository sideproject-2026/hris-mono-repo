import { useMemo, useState } from 'react'
import { StackRow } from '@/components/custom/layouts'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EMPLOYEE_MOVEMENT_STATUS_DATA } from '@/features/employees/types/constant'
import { RepeatCircle } from 'iconsax-reactjs'
import { ChevronDown } from 'lucide-react'
import EmployeeMovementForm from './employee-movement-form'
import { useEmployeeProfileContext } from '../employee-personal/employee-personal-provider'


const EmployeeMovementButtons = () => {
  const [type, setType] = useState<number | undefined>()
  const [open, setOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>()


  const filteredMovements = useMemo(() => {
    // type 2: Regular -> Promotion (6), End of Service (3), Transfer (7)

    //type 2 - provisionary
    if (type === 2) {
      return EMPLOYEE_MOVEMENT_STATUS_DATA.filter((item) =>
        [1, 2, 3, 7].includes(item.value),
      )
    }
    if (type === 3) {
      return EMPLOYEE_MOVEMENT_STATUS_DATA.filter((item) =>
        [6, 3, 7, 8].includes(item.value),
      )
    }
    return []
  }, [type])

  if (filteredMovements.length === 0 || !'') return null

  return (
    <StackRow>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant={'ghost'}
            className="font-normal uppercase"
          >
            <RepeatCircle variant="Bold" size={24} color="#004663" />
            movement
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            {filteredMovements.map((item) => (
              <DropdownMenuItem
                key={item.value}
                className="font-normal uppercase gap-2 cursor-pointer"
                onClick={() => {
                  setSelectedStatus(item.value)
                  setOpen(true)
                }}
              >
                <RepeatCircle variant="Bold" size={20} color="#004663" />
                {item.text}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <EmployeeMovementForm
        open={open}
        onOpenChange={setOpen}
        employeeId={employeeId}
        preSelectedType={selectedStatus}
      />
    </StackRow>
  )
}

export default EmployeeMovementButtons
