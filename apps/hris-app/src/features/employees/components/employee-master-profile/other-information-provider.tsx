import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useCallback, useContext } from "react"
import { useGetEmployeeOtherInformationQueryOptons } from "../../hooks/useOtherInfo"
import { useEmployeeProfileContext } from "./employee-personal/employee-personal-provider"

type OtherInformationContextType = {
    getEmployeeInformation: EmployeeOtherInformationTypes | undefined
    onRefresh: () => void,
    entityObjectType: string,
    initialData: EmployeeInitials,
    employeeId: string
}

const OtherInformationContext = createContext<OtherInformationContextType | undefined>(undefined)

export const OtherInformationProvider = ({ children, entityObjectType }: { children: React.ReactNode, entityObjectType: string }) => {

    const { employeeInitials, employeeId } = useEmployeeProfileContext()

    const { data: getEmployeeInformation } = useQuery(useGetEmployeeOtherInformationQueryOptons({ employeeId: employeeId as string, entityObjectType }))

    const queryClient = useQueryClient()

    const onRefresh = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['get-employee-information', employeeId, entityObjectType] })
    }, [employeeId, entityObjectType, queryClient])

    const normalizedInformation = getEmployeeInformation ? {
        ...getEmployeeInformation,
        address: getEmployeeInformation.address ? (Array.isArray(getEmployeeInformation.address) ? getEmployeeInformation.address : [getEmployeeInformation.address]) : [],
        educations: getEmployeeInformation.educations ? (Array.isArray(getEmployeeInformation.educations) ? getEmployeeInformation.educations : [getEmployeeInformation.educations]) : [],
        emergencyContacts: getEmployeeInformation.emergencyContacts ? (Array.isArray(getEmployeeInformation.emergencyContacts) ? getEmployeeInformation.emergencyContacts : [getEmployeeInformation.emergencyContacts]) : [],
        workExperiences: getEmployeeInformation.workExperiences ? (Array.isArray(getEmployeeInformation.workExperiences) ? getEmployeeInformation.workExperiences : [getEmployeeInformation.workExperiences]) : [],
    } : undefined;

    const contextValue = {
        getEmployeeInformation: normalizedInformation as EmployeeOtherInformationTypes | undefined,
        onRefresh,
        entityObjectType,
        initialData: employeeInitials as EmployeeInitials,
        employeeId: employeeId as string
    }

    return (
        <OtherInformationContext.Provider value={contextValue}>
            {children}
        </OtherInformationContext.Provider>
    )
}

export const useOtherInformationContext = () => {
    const context = useContext(OtherInformationContext)
    if (!context) {
        throw new Error('useOtherInformationContext must be used within OtherInformationProvider')
    }
    return context
}

export default OtherInformationProvider