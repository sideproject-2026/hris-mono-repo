import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@/components/custom/containers/page-header'
import CreateHoliday from './create-holiday'
import { HolidayProvider, useHoliday } from './holiday-provider'
import ListHolidayComponent from './list-holiday-component'
import PageContainer from '@/components/custom/containers/page-container'
import { NavMenu } from '@/components/custom/misc/NavMenu'
import { Button } from '@/components/ui/button'
import { Plus, PlusIcon, RefreshCcw } from 'lucide-react'
import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from '@/components/kibo-ui/calendar'
import { DEFAULT_YEAR } from '../types/constant'
import { Separator } from '@/components/ui/separator'

const CalendarContent = () => {
  const {
    year,
    features,
    isFetching,
    dialogState,
    closeDialog,
    openCreateDialog,
    openViewDialog,
    selectedDate,
    data,
    handleChangeDate,
    onRefresh,
  } = useHoliday()

  return (
    <div className="w-full h-full">
      <HeaderContainer loading={isFetching}>
        <HeaderText
          title="Holiday Calendar"
          subtitle="Manage calendar holidays and events"
        >
          <HeaderBackButton to="/" />
        </HeaderText>
      </HeaderContainer>
      <PageContainer loading={isFetching}>
        <NavMenu>
          <div className="flex flex-row w-full gap-2">
            <Button
              variant="ghost"
              onClick={openCreateDialog}
              disabled={isFetching}
              className="font-sans text-sm uppercase font-semibold"
            >
              <PlusIcon className="size-4" /> Create Holiday
            </Button>
            <Separator orientation="vertical" />
            <Button
              variant="ghost"
              onClick={onRefresh}
              disabled={isFetching}
              className="font-sans text-sm uppercase font-semibold"
            >
              <RefreshCcw className="size-4" /> Refresh
            </Button>
          </div>
        </NavMenu>
        <CalendarProvider>
          <CalendarDate>
            <CalendarDatePicker>
              <CalendarMonthPicker />
              <CalendarYearPicker
                start={2020}
                end={DEFAULT_YEAR}
                value={year}
                onChange={handleChangeDate}
              />
            </CalendarDatePicker>
            <CalendarDatePagination />
          </CalendarDate>
          <CalendarHeader />
          <CalendarBody features={features} onClick={openViewDialog}>
            {({ feature }) => (
              <CalendarItem feature={feature} key={feature.id} />
            )}
          </CalendarBody>
        </CalendarProvider>
      </PageContainer>

      {/* Logic-less Dialog Rendering */}
      {dialogState.type === 'create' ? (
        <CreateHoliday open={dialogState.open} onOpenChange={closeDialog} />
      ) : (
        <ListHolidayComponent
          open={dialogState.open}
          onOpenChange={closeDialog}
          data={data?.data}
          selectedDate={selectedDate ?? ''}
        />
      )}
    </div>
  )
}

const CalendarComponent = () => (
  <HolidayProvider>
    <CalendarContent />
  </HolidayProvider>
)

export default CalendarComponent
