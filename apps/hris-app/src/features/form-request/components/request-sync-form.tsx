import React from 'react'
import {
  syncRequestFormSchema,
  type SyncRequestFormSchemaType,
} from '../types/schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { FolderSyncIcon, MailCheckIcon } from 'lucide-react'
import { Form } from '@/components/ui/form'
import DropdownField from '@/components/custom/inputs/DropdownField'
import ButtonLoading from '@/components/custom/buttons/button-loading'
import { useSyncLegacyMutation } from '../hooks/useFormRequest'
import { useRequestFormContext } from './request-form-provider'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import { I3DRotate } from 'iconsax-reactjs'

const RequestSyncForm = () => {
  const { mutateAsync: syncLegacy, isPending } = useSyncLegacyMutation()
  const { onRefresh } = useRequestFormContext()

  const form = useForm<SyncRequestFormSchemaType>({
    resolver: zodResolver(syncRequestFormSchema),
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  })

  // start from january to present month
  const monthList = Array.from(
    { length: new Date().getMonth() + 1 },
    (_, i) => ({
      value: i + 1,
      text: new Date(0, i).toLocaleString('default', { month: 'long' }),
    }),
  )

  //start from 2025 to present year
  const currentYear = new Date().getFullYear()
  const yearList = Array.from({ length: currentYear - 2024 }, (_, i) => ({
    value: 2025 + i,
    text: (2025 + i).toString(),
  }))

  const handleSubmit = async (data: SyncRequestFormSchemaType) => {
    try {
      await syncLegacy(data)
      toast.success('Requests synced successfully.')
      onRefresh()
    } catch (error) {
      console.log('Sync failed', error)
      const errMessage = getErrorMessage(error)
      toast.error(`Failed to sync requests. Please try again. ${errMessage}`)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="font-sans text-sm uppercase font-semibold"
        >
          <I3DRotate size={'32px'} variant="Bold" color="#004663" />
          Sync Requests
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-0">
        <DialogHeader>
          <h3 className="font-poppins text-lg text-medium dark:text-foreground text-foreground">
            Sync Requests
          </h3>
          <p className="font-poppins text-sm text-medium dark:text-foreground text-foreground">
            Sync form requests from external systems by selecting the month and
            year.
          </p>
        </DialogHeader>
        <Form {...form}>
          <form className="flex flex-col gap-3">
            <DropdownField
              control={form.control}
              name="month"
              label="Month"
              placeholder="Enter Month"
              data={monthList}
            />

            <DropdownField
              control={form.control}
              name="year"
              label="Year"
              placeholder="Enter Year"
              data={yearList}
            />
          </form>
        </Form>
        <DialogFooter>
          <ButtonLoading
            loading={isPending}
            icon={<MailCheckIcon className="size-4" />}
            text="Sync"
            variant="default"
            onClick={() => form.handleSubmit(handleSubmit)()}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RequestSyncForm
