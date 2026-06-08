import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useCallback, useContext, useState } from "react"
import { useEmployeeProfileContext } from "../employee-personal/employee-personal-provider"
import { queryOptionsInfo } from "../../../hooks/queries/useEmployeeInfo"
import type { AllInformationResponse } from "../../../types/model"

const toArray = <T,>(val: T[] | T | null | undefined): T[] => {
    if (!val) return []
    return Array.isArray(val) ? val : [val]
}

type OtherInformationContextType = {
    getEmployeeInformation: AllInformationResponse | undefined
    onRefresh: () => void
    entityObjectType: string
    initialData: EmployeeInitials
    employeeId: string
}

const OtherInformationContext = createContext<OtherInformationContextType | undefined>(undefined)

export const OtherInformationProvider = ({children,entityObjectType}: {children: React.ReactNode, entityObjectType: "contact" | "address" | "education" | "workExperience"}) => {
    
   const { employeeInitials, employeeId } = useEmployeeProfileContext()
   
    
    const queryClient = useQueryClient()
    const { data: getEmployeeInformation } = useQuery(queryOptionsInfo({ employeeId, entityObjectType }))

    const onRefresh = useCallback(() => {
        queryClient.invalidateQueries({
            queryKey: ['get-employee-information', employeeId, entityObjectType],
        })
    }, [employeeId, entityObjectType, queryClient])

    const normalizedInformation = getEmployeeInformation
        ? {
              address: toArray(getEmployeeInformation),
              educations: toArray(getEmployeeInformation),
              emergencyContacts: toArray(getEmployeeInformation),
              workExperiences: toArray(getEmployeeInformation),
          }
        : undefined

    const contextValue: OtherInformationContextType = {
        getEmployeeInformation: normalizedInformation as AllInformationResponse | undefined,
        onRefresh,
        entityObjectType,
        initialData: employeeInitials as EmployeeInitials,
        employeeId: employeeId as string,
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