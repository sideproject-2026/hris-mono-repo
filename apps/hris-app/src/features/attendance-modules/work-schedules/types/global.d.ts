declare type WorkSchedule = {
   id: string;
   code: string;
   title: string;
   description: string;
   workDetails: Array<WorkDetail>;
}

declare type WorkDetail = {
   scheduleDay: string;
   breakTime: number;
   timeIn: number;
   timeOut: number;
   fixedSchedule: boolean;
   active: boolean;
}