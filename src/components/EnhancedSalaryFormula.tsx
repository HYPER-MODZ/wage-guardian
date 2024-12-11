import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { AdvancedSalaryCalculation } from "@/lib/advancedSalary";

interface EnhancedSalaryFormulaProps {
  isOpen: boolean;
  onClose: () => void;
  calculation: AdvancedSalaryCalculation;
  dailyRate: number;
}

const EnhancedSalaryFormula = ({ isOpen, onClose, calculation, dailyRate }: EnhancedSalaryFormulaProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
            Advanced Salary Breakdown
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8 p-4">
          {/* Performance Metrics */}
          <div className="space-y-4 p-6 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Performance Overview</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Earnings Progress</span>
                <span className="text-sm font-medium">{calculation.performanceMetric.toFixed(1)}%</span>
              </div>
              <Progress value={calculation.performanceMetric} className="h-2" />
            </div>
          </div>

          {/* Earnings Breakdown */}
          <div className="grid gap-4 p-6 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Earnings Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center group">
                <span className="text-gray-600 dark:text-gray-400">Basic Salary</span>
                <span className="font-medium text-primary">Rs. {calculation.basicSalary.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-600 dark:text-gray-400">Overtime Earnings</span>
                <span className="font-medium text-green-500">+ Rs. {calculation.overtimeEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-600 dark:text-gray-400">Double Shift Bonus</span>
                <span className="font-medium text-blue-500">+ Rs. {calculation.doubleShiftBonus.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-600 dark:text-gray-400">Holiday Deductions</span>
                <span className="font-medium text-red-500">- Rs. {calculation.holidayDeductions.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-gray-600 dark:text-gray-400">Absent Deductions</span>
                <span className="font-medium text-red-500">- Rs. {calculation.absentDeductions.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t-2 border-primary/20 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Net Earnings</span>
              <span className="font-bold text-lg text-primary">Rs. {calculation.actualEarnings.toFixed(2)}</span>
            </div>
          </div>

          {/* Monthly Target Analysis */}
          <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Monthly Target Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Monthly Target</span>
                <span className="font-medium text-primary">Rs. {calculation.monthlyTarget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Daily Rate</span>
                <span className="font-medium">Rs. {dailyRate}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedSalaryFormula;