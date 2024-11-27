export interface SalaryCalculation {
  dailyWage: number;
  totalDays: number;
  absentDays: number;
  grossSalary: number;
  netSalary: number;
}

export const calculateSalary = (
  dailyWage: number,
  totalDays: number,
  absentDays: number
): SalaryCalculation => {
  const grossSalary = dailyWage * totalDays;
  const deductions = dailyWage * absentDays;
  const netSalary = grossSalary - deductions;

  return {
    dailyWage,
    totalDays,
    absentDays,
    grossSalary,
    netSalary,
  };
};