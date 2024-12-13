import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SalaryFormulaProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: {
    totalDays: number;
    doubleDays: number;
    absentDays: number;
    holidayDays: number;
    grossSalary: number;
    netSalary: number;
    attendanceBonus: number;
    doubleShiftBonus: number;
    holidayDeductions: number;
    regularDaysPay: number;
  };
  dailyRate: number;
}

const SalaryFormula = ({ isOpen, onClose, calculation, dailyRate }: SalaryFormulaProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
            Enhanced Salary Calculation Formula
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 font-mono text-sm sm:text-base">
          {/* Base Salary Block */}
          <div className="space-y-4 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-inner animate-fade-up">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Base Salary Calculation</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">Regular Days ({calculation.totalDays - calculation.doubleDays} days × Rs. {dailyRate})</span>
                <span className="font-semibold text-primary group-hover:scale-105 transition-transform">
                  Rs. {calculation.regularDaysPay}
                </span>
              </p>
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">Double Shift Base ({calculation.doubleDays} days × Rs. {dailyRate})</span>
                <span className="font-semibold text-primary group-hover:scale-105 transition-transform">
                  Rs. {calculation.doubleDays * dailyRate}
                </span>
              </p>
            </div>
          </div>

          {/* Bonuses Block */}
          <div className="space-y-4 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-inner animate-fade-up">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Bonuses & Incentives</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">Double Shift Bonus (100% extra)</span>
                <span className="font-semibold text-green-500 group-hover:scale-105 transition-transform">
                  + Rs. {calculation.doubleShiftBonus}
                </span>
              </p>
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">Perfect Attendance Bonus (5%)</span>
                <span className="font-semibold text-green-500 group-hover:scale-105 transition-transform">
                  + Rs. {calculation.attendanceBonus}
                </span>
              </p>
            </div>
          </div>

          {/* Deductions Block */}
          <div className="space-y-4 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-inner animate-fade-up">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Deductions</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">Holiday Deductions ({calculation.holidayDays} days)</span>
                <span className="font-semibold text-red-500 group-hover:scale-105 transition-transform">
                  - Rs. {calculation.holidayDeductions}
                </span>
              </p>
            </div>
          </div>

          {/* Final Calculation */}
          <div className="space-y-4 p-6 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/20 shadow-inner animate-fade-up">
            <div className="space-y-2">
              <p className="flex items-center justify-between text-lg">
                <span className="text-gray-800 dark:text-gray-200">Gross Salary</span>
                <span className="font-bold text-primary">
                  Rs. {calculation.grossSalary}
                </span>
              </p>
              <div className="border-t-2 border-primary/20 my-4"></div>
              <p className="flex items-center justify-between text-lg">
                <span className="text-gray-800 dark:text-gray-200">Net Salary</span>
                <span className="font-bold text-primary text-xl">
                  Rs. {calculation.netSalary}
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalaryFormula;