import { format } from "date-fns";

export type AttendanceStatus = "present" | "absent" | "holiday";

export interface AttendanceRecord {
  date: string;
  status: AttendanceStatus;
}

export interface MonthlyAttendance {
  [date: string]: AttendanceStatus;
}

export const getStatusColor = (status: AttendanceStatus): string => {
  switch (status) {
    case "present":
      return "bg-attendance-present";
    case "absent":
      return "bg-attendance-absent";
    case "holiday":
      return "bg-attendance-holiday";
    default:
      return "bg-gray-100";
  }
};

export const formatDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

export const getMonthDates = (year: number, month: number): Date[] => {
  const dates: Date[] = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};