import * as z from 'zod';

export const attendancePolicySchema = z.object({
   name: z.string().min(1, 'Policy name is required'),
   description: z.string().optional(),
   lateThresholdMinutes: z.preprocess((val) => Number(val), z.number().min(0, 'Must be 0 or greater')),
   undertimeThresholdMinutes:   z.preprocess((val) => Number(val), z.number().min(0, 'Must be 0 or greater')),
   absenceThreshold: z.preprocess((val) => Number(val), z.number().min(0, 'Must be 0 or greater')),
   halfdayThreshold: z.preprocess((val) => Number(val), z.number().min(0, 'Must be 0 or greater')),
   overTimeLimit: z.preprocess((val) => Number(val), z.number().min(0, 'Must be 0 or greater')),
   holidayOTLimit: z.preprocess((val) => Number(val), z.number().min(0, 'Must be 0 or greater')),
   specialOTLimit: z.preprocess((val) => Number(val), z.number().min(0, 'Must be 0 or greater')),
   isActive: z.boolean().default(true),
});

export type AttendancePolicyFormValue = z.infer<typeof attendancePolicySchema>;