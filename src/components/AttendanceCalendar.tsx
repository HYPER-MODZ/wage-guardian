import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AttendanceStatus, getStatusColor } from "@/lib/attendance";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AttendanceCalendarProps {
  attendance: Record<string, AttendanceStatus>;
  onDateClick: (date: Date) => void;
}

const AttendanceCalendar = ({ attendance, onDateClick }: AttendanceCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}

        {days.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const status = attendance[dateStr];
          return (
            <button
              key={dateStr}
              onClick={() => onDateClick(date)}
              className={cn(
                "aspect-square rounded-lg flex items-center justify-center transition-colors",
                status ? getStatusColor(status) : "hover:bg-gray-100"
              )}
            >
              {format(date, "d")}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 justify-center">
        {(["present", "absent", "holiday"] as AttendanceStatus[]).map((status) => (
          <div key={status} className="flex items-center gap-2">
            <div
              className={cn(
                "w-4 h-4 rounded",
                getStatusColor(status)
              )}
            />
            <span className="capitalize">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;