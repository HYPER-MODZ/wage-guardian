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
  };
  dailyRate: number;
}

const SalaryFormula = ({ isOpen, onClose, calculation, dailyRate }: SalaryFormulaProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
            Salary Calculation Formula
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 font-mono text-sm sm:text-base">
          {/* First calculation block */}
          <div className="space-y-4 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-inner animate-fade-up">
            <div className="space-y-2">
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">Total Working {calculation.totalDays} Days</span>
                <span className="font-semibold text-primary group-hover:scale-105 transition-transform">
                  Rs. {calculation.totalDays * dailyRate}
                </span>
              </p>
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">Double Shift {calculation.doubleDays} Days</span>
                <span className="font-semibold text-primary group-hover:scale-105 transition-transform">
                  + Rs. {calculation.doubleDays * dailyRate}
                </span>
              </p>
            </div>
            <div className="border-t-2 border-primary/20 my-4"></div>
            <p className="flex items-center justify-between font-bold text-lg">
              <span className="text-gray-800 dark:text-gray-200">Net Salary</span>
              <span className="text-primary">Rs. {calculation.netSalary}</span>
            </p>
          </div>

          {/* Second calculation block */}
          <div className="space-y-4 p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-inner animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="space-y-2">
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">
                  Potential Monthly Earnings {calculation.totalDays + calculation.absentDays + calculation.holidayDays} Days
                </span>
                <span className="font-semibold text-primary group-hover:scale-105 transition-transform">
                  Rs. {(calculation.totalDays + calculation.absentDays + calculation.holidayDays) * dailyRate}
                </span>
              </p>
              <p className="flex items-center justify-between group">
                <span className="text-gray-600 dark:text-gray-300">
                  Absent + Holiday {calculation.absentDays + calculation.holidayDays} Days
                </span>
                <span className="font-semibold text-red-500 group-hover:scale-105 transition-transform">
                  - Rs. {(calculation.absentDays + calculation.holidayDays) * dailyRate}
                </span>
              </p>
            </div>
            <div className="border-t-2 border-primary/20 my-4"></div>
            <p className="flex items-center justify-between font-bold text-lg">
              <span className="text-gray-800 dark:text-gray-200">Net Salary</span>
              <span className="text-primary">Rs. {calculation.netSalary}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalaryFormula;