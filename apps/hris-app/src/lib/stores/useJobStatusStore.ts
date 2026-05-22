import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';


type JobStatusStore = {
  jobId?: string | undefined;
  setJobId: (jobId: string | undefined) => void;
  clearJobId: () => void;
}

const initialState: {jobId?: string | undefined} = {
   jobId: undefined,
}

export const useJobStatusStore = create<JobStatusStore>()(
   persist((set,get) => ({
      jobId: initialState.jobId,
      setJobId: (jobId) => set({ jobId }),
      clearJobId: () => set({ jobId: undefined }),
   }), 
   {
      name: 'job-status-storage',
      storage: createJSONStorage(() => localStorage),
   })
)