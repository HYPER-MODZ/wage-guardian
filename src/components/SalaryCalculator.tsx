import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateSalary } from "@/lib/salary";
import { AttendanceStatus } from "@/lib/attendance";
import { format, getDaysInMonth } from "date-fns";
import { isAuthenticated } from "@/lib/auth";

interface SalaryCalculatorProps {
  attendance: Record<string, AttendanceStatus>;
  currentMonth: Date;
}

const DAILY_RATE_KEY = "daily_rate";

const SalaryCalculator = ({ attendance, currentMonth }: SalaryCalculatorProps) => {
  const [dailyRate, setDailyRate] = useState(() => {
    const saved = localStorage.getItem(DAILY_RATE_KEY);
    return saved ? Number(saved) : 750;
  });
  const [calculation, setCalculation] = useState(calculateSalary(750, 0, 0, 0, 0));
  const [potentialEarnings, setPotentialEarnings] = useState(0);

  useEffect(() => {
    localStorage.setItem(DAILY_RATE_KEY, dailyRate.toString());
  }, [dailyRate]);

  useEffect(() => {
    const currentMonthStr = format(currentMonth, "yyyy-MM");
    const daysInMonth = getDaysInMonth(currentMonth);
    
    // Filter attendance records for the current month
    const monthlyAttendance = Object.entries(attendance).reduce((acc, [date, status]) => {
      if (date.startsWith(currentMonthStr)) {
        acc[date] = status;
      }
      return acc;
    }, {} as Record<string, AttendanceStatus>);

    // Count different types of days
    const workingDays = Object.values(monthlyAttendance).filter(
      (status) => status === "present" || status === "double"
    ).length;
    
    const absentDays = Object.values(monthlyAttendance).filter(
      (status) => status === "absent"
    ).length;
    
    const holidayDays = Object.values(monthlyAttendance).filter(
      (status) => status === "holiday"
    ).length;
    
    const doubleDays = Object.values(monthlyAttendance).filter(
      (status) => status === "double"
    ).length;

    // Calculate potential earnings based on the current month's days
    // Exclude holidays from potential earnings calculation
    const workableDays = daysInMonth - holidayDays;
    const potentialAmount = dailyRate * workableDays;
    setPotentialEarnings(potentialAmount);

    setCalculation(calculateSalary(dailyRate, workingDays, absentDays, doubleDays, holidayDays));
  }, [attendance, dailyRate, currentMonth]);

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>Salary Calculation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="dailyRate">Daily Rate (Rs.)</Label>
          <Input
            id="dailyRate"
            type="number"
            value={dailyRate}
            onChange={(e) => setDailyRate(Number(e.target.value))}
            disabled={!isAuthenticated()}
            className={!isAuthenticated() ? "bg-gray-100" : ""}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Total Working Days</Label>
            <p className="text-xl sm:text-2xl font-semibold">{calculation.totalDays}</p>
          </div>
          <div>
            <Label>Absent Days</Label>
            <p className="text-xl sm:text-2xl font-semibold text-attendance-absent">
              {calculation.absentDays}
            </p>
          </div>
          <div>
            <Label>Holiday Days (Unpaid)</Label>
            <p className="text-xl sm:text-2xl font-semibold text-attendance-holiday">
              {calculation.holidayDays}
            </p>
          </div>
          <div>
            <Label>Double Shift Days</Label>
            <p className="text-xl sm:text-2xl font-semibold text-attendance-double">
              {calculation.doubleDays}
            </p>
          </div>
          <div>
            <Label>Gross Salary</Label>
            <p className="text-xl sm:text-2xl font-semibold">Rs. {calculation.grossSalary}</p>
          </div>
          <div>
            <Label>Net Salary</Label>
            <p className="text-xl sm:text-2xl font-semibold text-attendance-present">
              Rs. {calculation.netSalary}
            </p>
          </div>
          <div className="col-span-2 border-t pt-4 mt-2">
            <Label>Potential Monthly Earnings ({format(currentMonth, "MMMM yyyy")})</Label>
            <p className="text-xl sm:text-2xl font-semibold text-primary">
              Rs. {potentialEarnings}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryCalculator;