import { createClient } from '@supabase/supabase-js';
import { AttendanceStatus } from './attendance';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getAttendanceData = async () => {
  const { data, error } = await supabase
    .from('attendance')
    .select('*');
  
  if (error) throw error;
  
  const attendanceMap: Record<string, AttendanceStatus> = {};
  data?.forEach(record => {
    attendanceMap[record.date] = record.status;
  });
  
  return attendanceMap;
};

export const updateAttendance = async (date: string, status: AttendanceStatus) => {
  const { error } = await supabase
    .from('attendance')
    .upsert({ date, status });
  
  if (error) throw error;
};