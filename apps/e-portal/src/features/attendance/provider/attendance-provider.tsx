import { createContext, useContext, useCallback } from "react";
import { getDtrDetails } from "../hooks/get-dtr-details";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/features/auth/provider/user-provider";

interface AttendanceContextState {
  selectedMonth: number;
  selectedYear: number;
  handleOnChange: (month: number, year: number) => void;
  data: AttendanceDetailType[]; // Consider replacing 'any' with a proper type
  isFetching: boolean;
}

export const AttendanceContext = createContext<AttendanceContextState | undefined>(undefined);

export const useAttendanceContext = () => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error("useAttendanceContext must be used within a AttendanceProvider");
  }
  return context;
}

interface AttendanceProviderProps {
  children: React.ReactNode;
  searchParams: {
    month: number;
    year: number;
  },
  setSearchParams: (params: { month: number; year: number }) => void;
}

export const AttendanceProvider = ({ children,searchParams,setSearchParams }: AttendanceProviderProps) => {
  
  const { profile } = useUserContext();
  
  const { data, isFetching } = useQuery(getDtrDetails(
    profile?.employeeId ?? 0, 
    searchParams.month, 
    searchParams.year  
  ));

  const queryClient = useQueryClient();

  const handleOnChange = useCallback((month:number,year:number) => {
    setSearchParams({ month, year });
    queryClient.invalidateQueries({queryKey: ['dtr-details', profile?.employeeId, month, year]});
  }, [setSearchParams, queryClient, profile?.employeeId]);

  const contextValue : AttendanceContextState = {
    selectedMonth: searchParams.month,
    selectedYear: searchParams.year,
    handleOnChange: handleOnChange,
    data: data?.details ?? [],
    isFetching
  };

  return (
    <AttendanceContext.Provider value={contextValue}>
      {children}
    </AttendanceContext.Provider>
  );
};