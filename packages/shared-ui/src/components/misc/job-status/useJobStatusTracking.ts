import { queryOptions } from "@tanstack/react-query";

import { request } from "@/lib/http";

export type JobStatusResponse = {
   jobId: string;
   status: number;
   startedAt?: string;
   completedAt?: string;
   error?: string;
};

export const checkJobStatusOption = (jobId?: string) => {
   return queryOptions<JobStatusResponse>({
      queryKey: ["attendance-period-job-status", jobId],
      queryFn: async () => {
         const response = await request.get<JobStatusResponse>(`queues/jobs/${jobId}`);
         return response;
      },
      select: (data) => data,
   });
};