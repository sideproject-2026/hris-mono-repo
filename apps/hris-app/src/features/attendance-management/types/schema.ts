
import * as z from "zod";



export const attendancePeriodSchema = z.object({
   name: z
      .string()
      .min(1, "Name is required")
      .max(100, "Name must be at most 100 characters"),

   description: z
      .string()
      .max(255, "Description must be at most 255 characters")
      .optional(),

   periodType: z
      .coerce
      .number()
      .nonnegative("Period Type is required"),
   company: z.string().optional(),
   periodStart: z
      .coerce
      .date()
      .default(new Date()),
   periodEnd: z
      .coerce
      .date()
      .default(new Date()),
   employeeIds: z.array(z.object({
      id: z.string().optional(),
      employeeId: z.string().optional()
   })).optional(),
   automate: z.boolean().optional().default(false),
})

export const timesheetSchema = z.object({
   detailId: z.string(),
   timeIn: z.string().optional(),
   timeOut: z.string().optional(),
   scheduleTimeIn: z.string().optional(),
   scheduleTimeOut: z.string().optional(),
   actualWorkingHour: z.string().optional(),
   dtrStatus: z.string().optional(),
   earlyInMinute: z.string().optional(),
   lateOutMinute: z.string().optional(),
   lateMinute: z.string().optional(),
   underTimeMinute: z.string().optional(),
   absent: z.string().optional(),
   regularOvertime: z.string().optional(),
   restdayOvertime: z.string().optional(),
   holidayOvertime: z.string().optional(),
})

export const employeeAttendanceSheetSchema = z.object({
   rows: z.array(timesheetSchema)
});

export const overtimePendingSchema = z.object({
   employeeId: z.coerce.number(),
   dateFrom: z.coerce.date(),
   dateTo: z.coerce.date(),
});

export const adjustmentSchema = z.object({
   period: z.string().optional(),
   regularOT: z.string().optional(),
   restDayOT: z.string().optional(),
   holidayOT: z.string().optional(),
   absent: z.coerce.number().optional(),
});

export const dtrFormSchema = z.object({
   detailId: z.string(),
   timeIn: z.string(),
   timeOut: z.string(),
   dtrStatus: z.string(),
   regularOvertime: z.string(),
   restdayOvertime: z.string(),
   holidayOvertime: z.string(),
})

export type DtrSchemaValue = z.infer<typeof dtrFormSchema>



export type TimesheetFormValues = z.infer<typeof timesheetSchema>;
export type AttendancePeriodFormValues = z.infer<typeof attendancePeriodSchema>;
export type EmployeeTimesheetFormValues = z.infer<typeof employeeAttendanceSheetSchema>;
export type AdjustmentFormValues = z.infer<typeof adjustmentSchema>;
export type OvertimePendingFormValues = z.infer<typeof overtimePendingSchema>;
