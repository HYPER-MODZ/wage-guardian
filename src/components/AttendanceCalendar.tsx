import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AttendanceStatus, getStatusColor } from "@/lib/attendance";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { isAuthenticated } from "@/lib/auth";

interface AttendanceCalendarProps {
  attendance: Record<string, AttendanceStatus>;
  onDateClick: (date: Date) => void;
  onRemoveAttendance: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

const AttendanceCalendar = ({ 
  attendance, 
  onDateClick, 
  onRemoveAttendance,
  onMonthChange 
}: AttendanceCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateToRemove, setDateToRemove] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(newDate);
    onMonthChange(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(newDate);
    onMonthChange(newDate);
  };

  const handleRemoveClick = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated()) return;
    setDateToRemove(date);
  };

  const handleConfirmRemove = () => {
    if (dateToRemove) {
      onRemoveAttendance(dateToRemove);
      setDateToRemove(null);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">
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

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center font-medium text-gray-500 py-2 text-sm sm:text-base"
            >
              {day}
            </div>
          ))}

          {days.map((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const status = attendance[dateStr];
            return (
              <TooltipProvider key={dateStr}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <button
                        onClick={() => onDateClick(date)}
                        className={cn(
                          "w-full aspect-square rounded-lg flex items-center justify-center transition-colors text-sm sm:text-base",
                          status ? getStatusColor(status) : "hover:bg-gray-100"
                        )}
                      >
                        {format(date, "d")}
                      </button>
                      {status && isAuthenticated() && (
                        <button
                          onClick={(e) => handleRemoveClick(date, e)}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {status 
                      ? isAuthenticated() 
                        ? 'Click X to remove attendance'
                        : status
                      : 'Click to mark attendance'
                    }
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {(["present", "absent", "double", "holiday"] as AttendanceStatus[]).map((status) => (
            <div key={status} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-4 h-4 rounded",
                  getStatusColor(status)
                )}
              />
              <span className="capitalize text-sm sm:text-base">{status}</span>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={!!dateToRemove} onOpenChange={() => setDateToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Attendance</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this attendance mark? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRemove}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AttendanceCalendar;