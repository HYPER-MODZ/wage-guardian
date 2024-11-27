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
  const regularDays = totalDays - absentDays - doubleDays;
  const grossSalary = (regularDays * dailyWage) + (doubleDays * dailyWage * 2);
  const netSalary = grossSalary;

  return {
    dailyWage,
    totalDays,
    absentDays,
    doubleDays,
    grossSalary,
    netSalary,
  };
};