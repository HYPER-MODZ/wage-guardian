import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { calculateSalary } from "@/lib/salary";
import { AttendanceStatus } from "@/lib/attendance";
import { format, getDaysInMonth } from "date-fns";
import { isAuthenticated } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

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
  const [tempDailyRate, setTempDailyRate] = useState(dailyRate);
  const [calculation, setCalculation] = useState(calculateSalary(750, 0, 0, 0, 0));
  const [potentialEarnings, setPotentialEarnings] = useState(0);
  const [missedEarnings, setMissedEarnings] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(DAILY_RATE_KEY, dailyRate.toString());
  }, [dailyRate]);

  useEffect(() => {
    const currentMonthStr = format(currentMonth, "yyyy-MM");
    const daysInMonth = getDaysInMonth(currentMonth);
    
    const monthlyAttendance = Object.entries(attendance).reduce((acc, [date, status]) => {
      if (date.startsWith(currentMonthStr)) {
        acc[date] = status;
      }
      return acc;
    }, {} as Record<string, AttendanceStatus>);

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

    const workableDays = daysInMonth - holidayDays;
    const potentialAmount = dailyRate * workableDays;
    setPotentialEarnings(potentialAmount);

    const missedDays = holidayDays + absentDays;
    const missedAmount = dailyRate * missedDays;
    setMissedEarnings(missedAmount);

    setCalculation(calculateSalary(dailyRate, workingDays, absentDays, doubleDays, holidayDays));
  }, [attendance, dailyRate, currentMonth]);

  const handleSave = () => {
    setDailyRate(tempDailyRate);
    toast({
      title: "Success",
      description: "Daily rate has been saved",
    });
  };

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>Salary Calculation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="dailyRate">Daily Rate (Rs.)</Label>
          <div className="flex gap-2">
            <Input
              id="dailyRate"
              type="number"
              value={tempDailyRate}
              onChange={(e) => setTempDailyRate(Number(e.target.value))}
              disabled={!isAuthenticated()}
              className={!isAuthenticated() ? "bg-gray-100" : ""}
            />
            {isAuthenticated() && (
              <Button onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
          {!isAuthenticated() && (
            <p className="text-sm text-gray-500">Current daily rate: Rs. {dailyRate}</p>
          )}
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
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-100"
            >
              <span>See Advanced Details</span>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label>Potential Monthly Earnings ({format(currentMonth, "MMMM yyyy")})</Label>
                <p className="text-xl sm:text-2xl font-semibold text-primary">
                  Rs. {potentialEarnings}
                </p>
              </div>
              <div>
                <Label>Missed Earnings (Holidays + Absent)</Label>
                <p className="text-xl sm:text-2xl font-semibold text-red-500">
                  Rs. {missedEarnings}
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default SalaryCalculator;