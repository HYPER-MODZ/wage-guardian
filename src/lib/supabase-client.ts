import { createClient } from '@supabase/supabase-js';
import { AttendanceStatus } from './attendance';

// Provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lbuxmubjcdtpwvyidavn.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidXhtdWJqY2R0cHd2eWlkYXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MjQyMjcsImV4cCI6MjA0ODMwMDIyN30.wquIZAsm_VuLSpyHY5ARqodTMFTbhkCwdNhQMtufCJU';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize the attendance table if it doesn't exist
const initializeTable = async () => {
  try {
    // Try to query the table to check if it exists
    const { error } = await supabase
      .from('attendance')
      .select('*')
      .limit(1);

    // If there's an error and it's not about permissions, we need to create the table
    if (error && error.code === '42P01') {
      // Since we can't create tables directly from the client,
      // we'll show an error message to guide the user
      console.error(
        'The attendance table does not exist. Please create it using the following SQL in the Supabase dashboard:\n\n' +
        'CREATE TABLE public.attendance (\n' +
        '  date TEXT PRIMARY KEY,\n' +
        '  status TEXT NOT NULL,\n' +
        '  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone(\'utc\'::text, now()) NOT NULL\n' +
        ');'
      );
    }
  } catch (err) {
    console.error('Error checking table:', err);
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