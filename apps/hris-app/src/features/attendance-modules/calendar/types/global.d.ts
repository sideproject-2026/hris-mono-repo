declare type CalendarHoliday = {
    id: string;
    holidayName: string;
    holidayDate: Date;
    holidayType: string;
    branch: string;
    isActive: boolean;
}

declare type CalendarInitial = {
    holidayTypes: SelectionItem<string>[];
    branches: SelectionItem<string>[];
}
declare type ApiResponse<T> = {
    data: T;
    success: boolean;
    message: string;
}