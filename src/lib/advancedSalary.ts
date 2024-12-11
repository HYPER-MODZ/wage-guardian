export interface AdvancedSalaryCalculation extends Record<string, number> {
  basicSalary: number;
  overtimeEarnings: number;
  holidayDeductions: number;
  absentDeductions: number;
  doubleShiftBonus: number;
  monthlyTarget: number;
  actualEarnings: number;
  performanceMetric: number;
}

export const calculateAdvancedSalary = (
  dailyWage: number,
  totalDays: number,
  absentDays: number,
  doubleDays: number,
  holidayDays: number
): AdvancedSalaryCalculation => {
  const workableDays = totalDays - holidayDays;
  const basicSalary = workableDays * dailyWage;
  const overtimeRate = dailyWage * 1.5;
  const overtimeEarnings = doubleDays * overtimeRate;
  const holidayDeductions = holidayDays * dailyWage;
  const absentDeductions = absentDays * dailyWage;
  const doubleShiftBonus = doubleDays * dailyWage;
  const monthlyTarget = workableDays * dailyWage;
  const actualEarnings = basicSalary + overtimeEarnings + doubleShiftBonus - absentDeductions;
  const performanceMetric = (actualEarnings / monthlyTarget) * 100;

  return {
    basicSalary,
    overtimeEarnings,
    holidayDeductions,
    absentDeductions,
    doubleShiftBonus,
    monthlyTarget,
    actualEarnings,
    performanceMetric
  };
};