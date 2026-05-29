import { useQueryState } from 'nuqs'
import { useEffect } from 'react'
import {
  HeaderBackButton,
  HeaderContainer,
  HeaderText,
} from '@hris/shared-ui/containers/page-header'
import PageContainer from '@hris/shared-ui/containers/page-container'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hris/shared-ui'
import EmployeeFormPersonalInfo from './employee-personal/employee-form-personal-info'
import EmployeeAddressesContent from './employee-addresses/employee-addresses-list'
import EmployeeEducationContent from './employee-education/employee-list-education'
import EmployeeWorkExperienceContent from './employee-work-experience/employee-list-work-experience'
import EmployeeEmergencyContactContent from './employee-emergency-contact/employee-list-emergency'
import { Briefcase, Building, Call, Location, Medal, UserOctagon } from 'iconsax-reactjs'
import EmployeeCompany from './employee-appointment/employee-company'


interface ProfileTabsProps {
  disabled: boolean
  id?: string
}

const profileTabs = [
  {
    value: 'personal-information',
    label: 'Personal',
    disabled: false,
    components: () => <EmployeeFormPersonalInfo />,
    icon: <UserOctagon variant="Bold" size={18} />,
  },
  {
    value: 'company-information',
    label: 'Company',
    disabled: false,
    components: () => <EmployeeCompany />,
    icon: <Building variant="Bold" size={18} />,
  },
  {
    value: 'address',
    label: 'Addresses',
    disabled: false,
    components: EmployeeAddressesContent,
    icon: <Location variant="Bold" size={18} />,
  },
  {
    value: 'educations',
    label: 'Education',
    disabled: false,
    components: EmployeeEducationContent,
    icon: <Medal variant="Bold" size={18} />,
  },
  {
    value: 'employment',
    label: 'Employment History',
    disabled: false,
    components: EmployeeWorkExperienceContent,
    icon: <Briefcase variant="Bold" size={18} />,
  },
  {
    value: 'emergency-contacts',
    label: 'Emergency',
    disabled: false,
    components: EmployeeEmergencyContactContent,
    icon: <Call variant="Bold" size={18} />,
  },
]

const EmployeeMasterForm = ({ disabled, id }: ProfileTabsProps) => {
  const [activeTab, setActiveTabs] = useQueryState('tab', {
    defaultValue: 'personal-information',
  })

  const initialTabs = disabled
    ? profileTabs.filter((tab) => tab.value === activeTab)
    : profileTabs

  useEffect(() => {
    if (!id) {
      setActiveTabs('personal-information')
    }
  }, [id])

  return (
    <div className="flex h-full w-full flex-col">
      <HeaderContainer loading={false}>
        <HeaderText
          title="Employee Profile"
          subtitle="Manage and maintain employee informations."
        >
          <HeaderBackButton to="/employees" />
        </HeaderText>
      </HeaderContainer>

      <PageContainer loading={false}>
        <Tabs
          value={activeTab ?? 'personal-information'}
          orientation="horizontal"
          onValueChange={setActiveTabs}
          className="gap-4"
        >
          <div className="w-full pt-4">
            <TabsList className="w-full justify-start overflow-hiddent self-start">
              {initialTabs.map((tab) => {
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="min-w-[150px] uppercase tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {profileTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              {tab.components && <tab.components />}
            </TabsContent>
          ))}
        </Tabs>
      </PageContainer>
    </div>
  )
}

export default EmployeeMasterForm
