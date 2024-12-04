import { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors duration-300">
      <div className="container max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-up">
          Time & Attendance Tracker
        </h1>

        <div className="grid gap-8 animate-fade-up">
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <AttendanceCalendar
              attendance={attendance}
              onDateClick={handleDateClick}
              onRemoveAttendance={(date) => handleAttendanceSubmit(date, null)}
              onMonthChange={handleMonthChange}
            />
          </div>

          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <SalaryCalculator 
              attendance={attendance} 
              currentMonth={currentMonth}
            />
          </div>

          {isAdmin ? (
            <div className="transform hover:scale-[1.02] transition-transform duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-up">
              <AdminPanel
                selectedDate={selectedDate}
                onClose={() => setSelectedDate(null)}
                onSubmit={handleAttendanceSubmit}
                onLogout={() => setIsAdmin(false)}
              />
            </div>
          ) : (
            <div className="transform hover:scale-[1.02] transition-transform duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Admin Login
              </h2>
              <LoginForm onSuccess={() => setIsAdmin(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;