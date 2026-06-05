import { PAGINATION_DEFAULTS } from "@/components/custom/grid/types/constants";
import { number, string, z } from "zod";

export const employeePersonalInfoSchema = z.object({
    type: z.coerce.number(),
    classification: z.coerce.number(),
    prefix: z.string().optional(),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    suffix: z.string().optional(),
    gender: z.coerce.number(),
    dateOfBirth: z.coerce.date().optional(),
    placeOfBirth: z.string(),
    nationality: z.string(),
    religion: z.string().optional(),
    civilStatus: z.coerce.number(),
    bloodType: z.string().optional(),
    primaryTelNo: z.string().optional(),
    secondaryTelNo: z.string().optional(),
    mobileNo: z.string().optional(),
    personalEmailAddress: z.string().optional(),
    spouseFullName: z.string().optional(),
    spouseJobTitle: z.string().optional(),
    spouseDateOfBirth: z.coerce.date().optional(),
    sssNo: z.string().optional(),
    tinNo: z.string().optional(),
    philhealthNo: z.string().optional(),
    pagIbigNo: z.string().optional(),
    passportNo: z.string().optional(),
    issueDate: z.coerce.date().optional(),
    expiryDate: z.coerce.date().optional(),
    payrollAccountNo: z.string().optional(),
    dateHired: z.coerce.date().optional(),
});




export const employeeAppointmentSchema = z.object({
    emailAddress: z.string().optional(),
    localNo: z.string().optional(),
    designationId: z.coerce.string(),
    departmentId: z.coerce.string(),
    companyId: z.coerce.string(),
    branchId: z.coerce.string(),
    managerId: z.coerce.string().optional(),
    accreditation: z.coerce.date().optional(),
    deaccreditation: z.coerce.date().optional(),
})

export const employeeFilterSchema = z.object({
    fieldName: z.coerce.string().optional(),
    fieldValue: z.coerce.string().optional(),
    employeeType: z.coerce.number().optional().nullable(),
    employeeClass: z.coerce.number().optional().nullable(),
    company: z.coerce.string().optional(),
    branch: z.coerce.string().optional(),
    department: z.coerce.string().optional(),
    pageSize: z.coerce.number().int().min(1).max(100).default(PAGINATION_DEFAULTS.DEFAULT_PAGE_SIZE),
    pageNumber: z.coerce.number().int().min(1).default(PAGINATION_DEFAULTS.DEFAULT_PAGE_NUMBER),
})



//Leave Schema
export const employeeSingleSetupSchema = z.object({
    year: z.coerce.number(),
    entitlements: z.array(
        z.object({
            leaveEntitlement: z.coerce.number(),
            openingBalance: z.coerce.number().optional(),
        })
    )
})

export const employeeBatchLeaveSetupSchema = z.object({
    type: z.coerce.number(),
    classification: z.coerce.number(),
    year: z.coerce.number(),
    entitlements: z.array(
        z.object({
            leaveEntitlement: z.coerce.number(),
            openingBalance: z.coerce.number().optional(),
        })
    )
})

export const adjustmentLeaveSchema = z.object({
    leaveEntitlement: z.string(),
    quantity: z.coerce.number(),
    remarks: z.string().optional()
})

//End


export const employeePersonalSearchSchema = z.object({
    id: z.string().optional(),
})

export const employeeMovementSchema = z.object({
    employeeId: z.string(),
    type: z.coerce.number(),
    dateFrom: z.coerce.date(),
    dateTo: z.coerce.date(),
    description: z.string(),
    designationFrom: z.string().optional(),
    designationTo: z.string().optional(),
    companyFrom: z.string().optional(),
    companyTo: z.string().optional(),
    departmentFrom: z.string().optional(),
    departmentTo: z.string().optional(),
    branchFrom: z.string().optional(),
    branchTo: z.string().optional(),
})

export const unifiedEmployeeInfoSchema = z.discriminatedUnion("entityType", [
    z.object({
        entityType: z.literal("Address"),
        address: z.object({
            type: z.coerce.number().min(1, "Type is required"),
            street: z.string().min(5, "Street is required"),
            region: z.string().min(1, "Region is required"),
            province: z.string().min(5, "Province is required"),
            municipality: z.string().min(5, "Municipality is required"),
            zipCode: z.string().min(1, "Zip code is required"),
            country: z.string().min(5, "Country is required"),
        })
    }),
    z.object({
        entityType: z.literal("EmergencyContact"),
        emergencyContact: z.object({
            relation: z.string().min(1, "Relation is required"),
            contactPerson: z.string().min(1, "Contact person is required"),
            address: z.string().min(1, "Address is required"),
            telNo: z.string().min(1, "Tel no is required"),
        })
    }),
    z.object({
        entityType: z.literal("WorkExperience"),
        workExperience: z.object({
            companyName: z.string().min(1, "Company name is required"),
            address: z.string().min(1, "Address is required"),
            jobTitle: z.string().min(1, "Job title is required"),
            startDate: z.coerce.date("Start date is required"),
            endDate: z.coerce.date("End date is required"),
            reason: z.string().min(1, "Reason is required"),
        })
    }),
    z.object({
        entityType: z.literal("Education"),
        education: z.object({
            level: z.coerce.number().min(1, "Level is required"),
            school: z.string().min(5, "School is required"),
            course: z.string().min(1, "Course is required"),
            yearFrom: z.coerce.number().min(1, "Year from is required"),
            yearTo: z.coerce.number().min(1, "Year to is required"),
            awards: z.string().optional(),
        })
    }),
    z.object({
        entityType: z.literal("Company"),
        companyDelegate: z.object({
            emailAddress: z.string().optional(),
            localNo: z.string().optional(),
            rank: z.coerce.number(),
            designationId: z.coerce.string(),
            departmentId: z.coerce.string(),
            companyId: z.coerce.string(),
            branchId: z.coerce.string(),
            managerId: z.coerce.string().nullable(),
            accreditation: z.coerce.date().nullable(),
            deAccreditation: z.coerce.date().nullable(),
        })
    })
]);

export type UnifiedEmployeeInfoPayload = z.infer<typeof unifiedEmployeeInfoSchema>;
export type EmployeePersonalInfoTypes = z.infer<typeof employeePersonalInfoSchema>;
export type EmployeePersonalSearchSchemaType = z.infer<typeof employeePersonalSearchSchema>;
export type EmployeeAppointmentSchemaTypes = z.infer<typeof employeeAppointmentSchema>;
export type EmployeeFilterSchemaTypes = z.infer<typeof employeeFilterSchema>;

//Leave
export type EmployeeBatchLeaveSetupSchemaTypes = z.infer<typeof employeeBatchLeaveSetupSchema>;
export type EmployeeMovementSchemaTypes = z.infer<typeof employeeMovementSchema>;
export type EmployeeSingleSchemaTypes = z.infer<typeof employeeSingleSetupSchema>;
export type AdjustmentLeaveSchemaTypes = z.infer<typeof adjustmentLeaveSchema>;


