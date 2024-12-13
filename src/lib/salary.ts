export interface SalaryCalculation {
  dailyWage: number;
  totalDays: number;
  absentDays: number;
  doubleDays: number;
  holidayDays: number;
  grossSalary: number;
  netSalary: number;
  attendanceBonus: number;
  doubleShiftBonus: number;
  holidayDeductions: number;
  regularDaysPay: number;
}

export const calculateSalary = (
  dailyWage: number,
  totalDays: number,
  absentDays: number,
  doubleDays: number,
  holidayDays: number
): SalaryCalculation => {
  // Regular working days (excluding double shifts)
  const regularDays = totalDays - doubleDays;
  const regularDaysPay = regularDays * dailyWage;

  // Double shift calculations with 100% bonus
  const doubleShiftBonus = doubleDays * dailyWage;
  const doubleShiftBasePay = doubleDays * dailyWage;

  // Attendance bonus (5% bonus if no absences)
  const attendanceBonus = absentDays === 0 ? (regularDaysPay * 0.05) : 0;

  // Holiday deductions
  const holidayDeductions = holidayDays * dailyWage;

  // Calculate gross and net salary
  const grossSalary = regularDaysPay + doubleShiftBasePay + doubleShiftBonus + attendanceBonus;
  const netSalary = grossSalary - holidayDeductions;

  return {
    dailyWage,
    totalDays,
    absentDays,
    doubleDays,
    holidayDays,
    grossSalary,
    netSalary,
    attendanceBonus,
    doubleShiftBonus,
    holidayDeductions,
    regularDaysPay,
  };
};