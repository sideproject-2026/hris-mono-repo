import { useRequestStatusHistoryContext } from "../../provider/request-status-history-provider";
import { Input } from "@/components/ui/input";

const RequestDateInput = () => {
  const { selectedMonth, onChange } = useRequestStatusHistoryContext();

  const displayMonthYear = selectedMonth
    ? selectedMonth.toISOString().slice(0, 7)
    : new Date().toISOString().slice(0, 7);

  return (
    <>
      <Input
        type="month"
        placeholder="Select Date"
        className="w-fit text-foreground font-sans rounded-md font-normal"
        onChange={onChange}
        value={displayMonthYear}
      />
    </>
  );
};

export default RequestDateInput;
