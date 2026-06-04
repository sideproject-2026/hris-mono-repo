import { ChevronDown, SheetIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { DocumentText } from 'iconsax-reactjs'
import { requestFormInitialsQueryOptions } from '../hooks/useFormRequest'
import { getDialogType, getDisplayText } from '../types/constant'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from '@hris/shared-ui'


const RequestMenuButton = () => {

  const { data } = useQuery(requestFormInitialsQueryOptions())
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const handleDialogOpen = (type: string) => {
    setOpenDialog(type)
  }

  const handleDialogClose = () => {
    setOpenDialog(null)
  }


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="font-sans font-primary font-medium "
          >
            <SheetIcon className="h-4 w-4" />
            Create Request
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full">
          <DropdownMenuGroup className="flex flex-col">
            {data?.data.requestForTypes.map((item) => {
              const dialogType = getDialogType(item.text)
              return (
                <DropdownMenuItem key={item.value || item.text} asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-sans text-sm"
                    onClick={() => handleDialogOpen(dialogType)}
                  >
                    <DocumentText variant={'Bold'} color='#004663' size={'24px'} />
                    <span>{getDisplayText(item.text)}</span>
                  </Button>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default RequestMenuButton