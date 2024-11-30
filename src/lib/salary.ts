export interface SalaryCalculation {
  dailyWage: number;
  totalDays: number;
  absentDays: number;
  doubleDays: number;
  grossSalary: number;
  netSalary: number;
}

export const calculateSalary = (
  dailyWage: number,
  totalDays: number,
  absentDays: number,
  doubleDays: number
): SalaryCalculation => {
  // Subtract absent days from total working days
  const actualWorkingDays = totalDays - absentDays;
  const regularDays = actualWorkingDays - doubleDays;
  const grossSalary = (regularDays * dailyWage) + (doubleDays * dailyWage * 2);
  const netSalary = grossSalary;

  return {
    dailyWage,
    totalDays: actualWorkingDays, // Return actual working days instead of total days
    absentDays,
    doubleDays,
    grossSalary,
    netSalary,
  };
};