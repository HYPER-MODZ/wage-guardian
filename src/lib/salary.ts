export interface SalaryCalculation {
  dailyWage: number;
  totalDays: number;
  absentDays: number;
  doubleDays: number;
  holidayDays: number;
  grossSalary: number;
  netSalary: number;
}

export const calculateSalary = (
  dailyWage: number,
  totalDays: number,
  absentDays: number,
  doubleDays: number,
  holidayDays: number
): SalaryCalculation => {
  // totalDays now only includes present and double days
  const regularDays = totalDays - doubleDays;
  const grossSalary = (regularDays * dailyWage) + (doubleDays * dailyWage * 2) + (holidayDays * dailyWage);
  const netSalary = grossSalary;

  return {
    dailyWage,
    totalDays, // This now represents actual working days (present + double only)
    absentDays,
    doubleDays,
    holidayDays,
    grossSalary,
    netSalary,
  };
};