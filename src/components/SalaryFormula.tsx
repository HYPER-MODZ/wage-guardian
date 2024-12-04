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
      <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Salary Calculation Formula
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 font-mono text-sm sm:text-base">
          <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <p className="flex justify-between items-center">
              <span>Total Working Days ({calculation.totalDays} Days)</span>
              <span className="font-semibold">Rs. {calculation.totalDays * dailyRate}</span>
            </p>
            <p className="flex justify-between items-center text-blue-600 dark:text-blue-400">
              <span>Double Shift Days ({calculation.doubleDays} Days)</span>
              <span className="font-semibold">+ Rs. {calculation.doubleDays * dailyRate}</span>
            </p>
            <div className="border-t-2 border-gray-200 dark:border-gray-700 my-3"></div>
            <p className="flex justify-between items-center font-bold text-green-600 dark:text-green-400">
              <span>Net Salary</span>
              <span>Rs. {calculation.netSalary}</span>
            </p>
          </div>
          
          <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <p className="flex justify-between items-center">
              <span>Potential Monthly Earnings ({calculation.totalDays + calculation.absentDays + calculation.holidayDays} Days)</span>
              <span className="font-semibold">Rs. {(calculation.totalDays + calculation.absentDays + calculation.holidayDays) * dailyRate}</span>
            </p>
            <p className="flex justify-between items-center text-red-600 dark:text-red-400">
              <span>Absent Days + Holiday Days ({calculation.absentDays + calculation.holidayDays} Days)</span>
              <span className="font-semibold">- Rs. {(calculation.absentDays + calculation.holidayDays) * dailyRate}</span>
            </p>
            <div className="border-t-2 border-gray-200 dark:border-gray-700 my-3"></div>
            <p className="flex justify-between items-center font-bold text-green-600 dark:text-green-400">
              <span>Net Salary</span>
              <span>Rs. {calculation.netSalary}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalaryFormula;