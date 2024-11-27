import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateSalary } from "@/lib/salary";
import { AttendanceStatus } from "@/lib/attendance";

interface SalaryCalculatorProps {
  attendance: Record<string, AttendanceStatus>;
}

const SalaryCalculator = ({ attendance }: SalaryCalculatorProps) => {
  const [dailyWage, setDailyWage] = useState(500);
  const [calculation, setCalculation] = useState(calculateSalary(500, 0, 0));

  useEffect(() => {
    const totalDays = Object.keys(attendance).length;
    const absentDays = Object.values(attendance).filter(
      (status) => status === "absent"
    ).length;

    setCalculation(calculateSalary(dailyWage, totalDays, absentDays));
  }, [attendance, dailyWage]);

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle>Salary Calculation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="dailyWage">Daily Wage (₹)</Label>
          <Input
            id="dailyWage"
            type="number"
            value={dailyWage}
            onChange={(e) => setDailyWage(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Total Days</Label>
            <p className="text-2xl font-semibold">{calculation.totalDays}</p>
          </div>
          <div>
            <Label>Absent Days</Label>
            <p className="text-2xl font-semibold text-attendance-absent">
              {calculation.absentDays}
            </p>
          </div>
          <div>
            <Label>Gross Salary</Label>
            <p className="text-2xl font-semibold">₹{calculation.grossSalary}</p>
          </div>
          <div>
            <Label>Net Salary</Label>
            <p className="text-2xl font-semibold text-attendance-present">
              ₹{calculation.netSalary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryCalculator;