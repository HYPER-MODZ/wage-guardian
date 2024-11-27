import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import AttendanceCalendar from "@/components/AttendanceCalendar";
import AdminPanel from "@/components/AdminPanel";
import LoginForm from "@/components/LoginForm";
import SalaryCalculator from "@/components/SalaryCalculator";
import { AttendanceStatus } from "@/lib/attendance";
import { isAuthenticated } from "@/lib/auth";
import { format } from "date-fns";

const STORAGE_KEY = "attendance_tracker_data";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAdmin, setIsAdmin] = useState(() => isAuthenticated());
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
  }, [attendance]);

  const handleAttendanceSubmit = (date: Date, status: AttendanceStatus) => {
    const dateStr = format(date, "yyyy-MM-dd");
    setAttendance((prev) => ({
      ...prev,
      [dateStr]: status,
    }));
  };

  const handleDateClick = (date: Date) => {
    if (isAdmin) {
      setSelectedDate(date);
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Time & Attendance Tracker
        </h1>

        <div className="grid gap-8">
          <AttendanceCalendar
            attendance={attendance}
            onDateClick={handleDateClick}
          />

          <SalaryCalculator attendance={attendance} />

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