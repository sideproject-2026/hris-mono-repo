import { Input } from "@/components/ui/input";
import { useAttendanceContext } from "../provider/attendance-provider";

const AttendanceDateInput = () => {
  
  
  const { selectedMonth,selectedYear,handleOnChange } = useAttendanceContext();
  const displayMonthYear = new Date(selectedYear, selectedMonth).toISOString().slice(0, 7); // Format: "YYYY-MM"
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value; // Format: "YYYY-MM"
    const [year, month] = target.split("-").map(Number);
    if (!isNaN(year) && !isNaN(month)) {
      handleOnChange(month, year);
    }
  }

  return (
    <>
      <Input
        type="month"
        placeholder="Select Date"
        className="w-fit text-foreground font-sans rounded-md"
        onChange={handleInputChange}
        value={displayMonthYear}
      />
    </>
  );
};

export default AttendanceDateInput;
