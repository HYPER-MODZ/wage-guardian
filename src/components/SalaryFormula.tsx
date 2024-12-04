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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Salary Calculation Formula</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 font-mono text-sm sm:text-base">
          <div className="space-y-2">
            <p>Total Working Days {calculation.totalDays} Days = Rs. {calculation.totalDays * dailyRate}</p>
            <p>Double Shift Days {calculation.doubleDays} Days = + Rs. {calculation.doubleDays * dailyRate}</p>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <p className="font-semibold">Net Salary = Rs. {calculation.netSalary}</p>
          </div>
          
          <div className="mt-6 space-y-2">
            <p>Potential Monthly Earnings {calculation.totalDays + calculation.absentDays + calculation.holidayDays} Days = Rs. {(calculation.totalDays + calculation.absentDays + calculation.holidayDays) * dailyRate}</p>
            <p>Absent Days + Holiday Days {calculation.absentDays + calculation.holidayDays} Days = - Rs. {(calculation.absentDays + calculation.holidayDays) * dailyRate}</p>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <p className="font-semibold">Net Salary = Rs. {calculation.netSalary}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalaryFormula;