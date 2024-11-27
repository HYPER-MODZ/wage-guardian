import { createClient } from '@supabase/supabase-js';
import { AttendanceStatus } from './attendance';

// Provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lbuxmubjcdtpwvyidavn.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidXhtdWJqY2R0cHd2eWlkYXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MjQyMjcsImV4cCI6MjA0ODMwMDIyN30.wquIZAsm_VuLSpyHY5ARqodTMFTbhkCwdNhQMtufCJU';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize the attendance table if it doesn't exist
const initializeTable = async () => {
  const { error } = await supabase.rpc('create_attendance_table', {});
  if (error && !error.message.includes('already exists')) {
    console.error('Error creating table:', error);
  }
};

// Call initialization when the client is created
initializeTable();

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