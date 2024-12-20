import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import SplashScreen from "@/components/SplashScreen";
import AttendanceCalendar from "@/components/AttendanceCalendar";
import AdminPanel from "@/components/AdminPanel";
import LoginForm from "@/components/LoginForm";
import SalaryCalculator from "@/components/SalaryCalculator";
import { AttendanceStatus } from "@/lib/attendance";
import { isAuthenticated } from "@/lib/auth";
import { format } from "date-fns";
import { getAttendanceData, updateAttendance, removeAttendance } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";
import { NotificationSystem } from "@/components/NotificationSystem";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAdmin, setIsAdmin] = useState(() => isAuthenticated());
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: attendance = {} } = useQuery({
    queryKey: ['attendance'],
    queryFn: getAttendanceData,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: "Failed to load attendance data",
          variant: "destructive",
        });
        console.error(error);
      },
    },
  });

  const mutation = useMutation({
    mutationFn: ({ date, status }: { date: string, status: AttendanceStatus | null }) =>
      status ? updateAttendance(date, status) : removeAttendance(date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast({
        title: "Success",
        description: "Attendance updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update attendance",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const handleAttendanceSubmit = (date: Date, status: AttendanceStatus | null) => {
    const dateStr = format(date, "yyyy-MM-dd");
    mutation.mutate({ date: dateStr, status });
  };

  const handleDateClick = (date: Date) => {
    if (isAdmin) {
      setSelectedDate(date);
    }
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-2 sm:py-8 sm:px-4">
      <div className="container max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
          Time & Attendance Tracker
        </h1>

        <NotificationSystem />

        <div className="grid gap-6">
          <AttendanceCalendar
            attendance={attendance}
            onDateClick={handleDateClick}
            onRemoveAttendance={(date) => handleAttendanceSubmit(date, null)}
            onMonthChange={handleMonthChange}
          />

          <SalaryCalculator 
            attendance={attendance} 
            currentMonth={currentMonth}
          />

          {isAdmin ? (
            <AdminPanel
              selectedDate={selectedDate}
              onClose={() => setSelectedDate(null)}
              onSubmit={handleAttendanceSubmit}
              onLogout={() => setIsAdmin(false)}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
              <LoginForm onSuccess={() => setIsAdmin(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;