import * as z from 'zod';


export const workScheduleSchema = z.object({
   code: z.string().min(1, 'Code is required'),
   title: z.string().min(1, 'Title is required'),
   description: z.string().optional(),
   workScheduleDetails: z.array(z.object({
      scheduleDay: z.string().min(1, 'Schedule day is required'),
      breakTime: z.number().default(1),
      timeIn: z.string().min(1, 'Time in is required'),
      timeOut: z.string().min(1, 'Time out is required'),
      fixedSchedule: z.boolean().default(false),
      active: z.boolean().default(true),
   }))
})


export type WorkScheduleFormValue = z.infer<typeof workScheduleSchema>;
