import { supabase } from "@/integrations/supabase/client";
import { AttendanceStatus } from "./attendance";

export const getAttendanceData = async () => {
  const { data, error } = await supabase
    .from("attendance")
    .select("*");

  if (error) throw error;

  const attendance: Record<string, AttendanceStatus> = {};
  data?.forEach((record) => {
    attendance[record.date] = record.status as AttendanceStatus;
  });

  return attendance;
};

export const updateAttendance = async (date: string, status: AttendanceStatus) => {
  const { error } = await supabase
    .from("attendance")
    .upsert({ date, status });

  if (error) throw error;
};

export const removeAttendance = async (date: string) => {
  const { error } = await supabase
    .from("attendance")
    .delete()
    .eq("date", date);

  if (error) throw error;
};