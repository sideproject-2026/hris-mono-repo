import { createContext, useCallback, useContext, useState } from "react";
import { getPendingRequest } from "../hooks/get-dtr-summary";
import { useUserContext } from "@/features/auth/provider/user-provider";

interface RequestStatusHistoryContextState {
  selectedMonth?: Date | null;
  lastDayOfMonth?: Date | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data?: any; // Add missing properties
  isLoading?: boolean;
  refetch?: () => void;
}

export const RequestStatusHistoryContext = createContext<RequestStatusHistoryContextState>({} as RequestStatusHistoryContextState);

export const useRequestStatusHistoryContext = () => {
    const context = useContext(RequestStatusHistoryContext);
    if (context === undefined) {
        throw new Error("useRequestStatusHistoryContext must be used within a RequestStatusHistoryProvider");
    }
    return context;
}

const RequestStatusHistoryProvider = ({ children }: { children: React.ReactNode }) => {

  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [lastDayOfMonth, setLastDayOfMonth] = useState<Date | null>(null);

  const { profile } = useUserContext();

  const { data, isLoading, refetch } = getPendingRequest( 
    profile?.employeeId ?? 0, 
    selectedMonth?.toISOString().slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    lastDayOfMonth?.toISOString().slice(0, 10) ?? new Date().toISOString().slice(0, 10)
  );

  const handleOnChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMonth = e.target.value;
    const firstDay = new Date(selectedMonth + "-01");
    const lastDay = new Date(
      firstDay.getFullYear(),
      firstDay.getMonth() + 1,
      0
    );

    // Use functional updates and await state changes
    await Promise.all([
      new Promise((resolve) =>
        setSelectedMonth(() => {
          resolve(firstDay);
          return firstDay;
        })
      ),
      new Promise((resolve) =>
        setLastDayOfMonth(() => {
          resolve(lastDay);
          return lastDay;
        })
      ),
    ]);
    refetch();
  }, [refetch]);

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);


  const contextValue: RequestStatusHistoryContextState = {
      selectedMonth: selectedMonth,
      lastDayOfMonth: lastDayOfMonth,
      onChange: handleOnChange,
      data: data?.data, // Fixed: was using undefined 'requestStatusData'
      isLoading,
      refetch: handleRefetch
  };

    return (
        <RequestStatusHistoryContext.Provider value={contextValue}>
            {children}
        </RequestStatusHistoryContext.Provider>
    );
};

export default RequestStatusHistoryProvider;