import z from "zod";

export const holidaySchema = z.object({
    name: z.string().min(3, 'This field is required!'),
    holidayType: z.string().min(3, 'This field is required!'),
    holidayDate: z.date(),
    branch: z.string().optional(),
    isActive: z.boolean().optional(),
});


export type HolidaySchema = z.infer<typeof holidaySchema>;