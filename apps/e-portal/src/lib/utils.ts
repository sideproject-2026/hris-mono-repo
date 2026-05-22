import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const showToast = (message: string,type: "success" | "error" | "info" | "warning",description?: string) => {
  toast(message, {
    description: description ?? message,
    duration: 3000,
    style: {
      backgroundColor: type === "success" ? "#4CAF50" : type === "error" ?  "#F44336" : type === "warning" ? "#d85574fa" :  "#2196F3",
      color: "#fff",
    },
  })
}

export const getDateRangeCurrentDay = () => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const formattedFirstDay = firstDay.toISOString().split('T')[0];
  const currentDay = today.toISOString().split('T')[0];
  
  return {
    startDate: formattedFirstDay,
    endDate: currentDay,
    dateRange: `${formattedFirstDay} - ${currentDay}`
  };
}

export const convertMinutesToHours = (minutes: number): string => {
    // Check for invalid input
    if (!Number.isFinite(minutes) || minutes < 0) {
        return "Invalid input";
    }
    
    // Handle edge cases
    if (minutes === 0) {
        return "0 mins";
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    // Build hour part
    const hourPart = hours > 0 ? `${hours} hr${hours !== 1 ? 's' : ''}` : '';
    
    // Build minute part
    const minutePart = remainingMinutes > 0 ? `${remainingMinutes} min${remainingMinutes !== 1 ? 's' : ''}` : '';
    
    // Combine parts
    if (hourPart && minutePart) {
        return `${hourPart} ${minutePart}`;
    }
    
    // Return whichever part exists (one will always exist since minutes > 0)
    return hourPart || minutePart;
};
