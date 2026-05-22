declare type AttendancePolicy = {
   id: string;
   name: string;
   description: string;
   isActive: boolean;
   lateThresholdMinutes: number;
   undertimeThresholdMinutes: number;
   absenceThreshold: number;
   halfdayThreshold: number;
   overTimeLimit: number;
   holidayOTLimit: number;
   specialOTLimit: number;
}