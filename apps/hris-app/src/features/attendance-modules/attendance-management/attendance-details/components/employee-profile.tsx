import { AvatarImage } from '@radix-ui/react-avatar'
import { useAttendanceDetailContext } from '../providers/attendance-detail-provider'
import { Avatar, AvatarFallback, Stack, StackCol, StackRow, CollapsibleContainer, InputLabels } from '@hris/shared-ui'
import { createAvatarFallback, setFullName } from '@/lib/utils'


const EmployeeProfile = () => {
  const { sheets } = useAttendanceDetailContext()

  const avatar = sheets?.[0].avatar
  const fullname = setFullName(avatar?.firstName || '', avatar?.lastName || '')

  return (
    <CollapsibleContainer title="Employee Profile" baseClassName="w-full">
      <Stack orientation="row" gap="lg" className="py-4">
        <StackCol
          alignItems="center"
          gap="sm"
          justifyContent="center"
          className="w-[220px]"
        >
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatar?.avatarPhoto || ''} alt={fullname} />
            <AvatarFallback>{createAvatarFallback(fullname)}</AvatarFallback>
          </Avatar>
        </StackCol>
        <Stack orientation="col" gap="sm" className="w-full">
          <StackRow className="w-full">
            <InputLabels
              label="Employee No :"
              text={sheets?.[0].employeeNumber.toString() || 'NO EMPLOYEE NO'}
            />
            <InputLabels
              label="Designation :"
              text={sheets?.[0].position || 'NO DESIGNATION'}
            />
            <InputLabels
              label="Company :"
              text={sheets?.[0].company || 'NO COMPANY'}
            />
          </StackRow>
          <StackRow className="w-full">
            <InputLabels
              label="Full Name :"
              text={fullname || 'NO FULL NAME'}
            />
            <InputLabels
              label="Department :"
              text={sheets?.[0].department || 'NO DEPARTMENT'}
            />
            <InputLabels
              label="Branch :"
              text={sheets?.[0].branch || 'NO BRANCH'}
            />
          </StackRow>
          <StackRow>
            <InputLabels
              label="Work Schedule :"
              text={sheets?.[0].workSchedule || 'NO WORK SCHEDULE'}
            />
          </StackRow>
        </Stack>
      </Stack>
    </CollapsibleContainer>
  )
}

export default EmployeeProfile
