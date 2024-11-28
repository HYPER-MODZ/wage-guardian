import { createClient } from '@supabase/supabase-js';
import { AttendanceStatus } from './attendance';
import { toast } from 'sonner';

// Provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lbuxmubjcdtpwvyidavn.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidXhtdWJqY2R0cHd2eWlkYXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MjQyMjcsImV4cCI6MjA0ODMwMDIyN30.wquIZAsm_VuLSpyHY5ARqodTMFTbhkCwdNhQMtufCJU';

export const supabase = createClient(supabaseUrl, supabaseKey);

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS attendance (
    date TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);`;

// Initialize the attendance table if it doesn't exist
const initializeTable = async () => {
  try {
    const { error } = await supabase
      .from('attendance')
      .select('*', { count: 'exact', head: true });

    if (error?.code === '42P01') {
      toast.error(
        "Database table is missing. Please run this SQL in your Supabase dashboard:\n" + SQL_CREATE_TABLE,
        { duration: 10000 }
      );
      return false;
    }

    if (error) {
      toast.error("Database error: " + error.message);
      return false;
    }

    return true;
  } catch (err) {
    toast.error("Connection error. Please check your database connection.");
    return false;
  }
};

export const getAttendanceData = async () => {
  const tableExists = await initializeTable();
  if (!tableExists) {
    return {};
  }

  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('date, status');
    
    if (error) {
      toast.error("Failed to fetch attendance data: " + error.message);
      return {};
    }
    
    const attendanceMap: Record<string, AttendanceStatus> = {};
    data?.forEach(record => {
      attendanceMap[record.date] = record.status as AttendanceStatus;
    });
    
    return attendanceMap;
  } catch (err) {
    toast.error("An unexpected error occurred while fetching attendance data");
    return {};
  }
};

export const updateAttendance = async (date: string, status: AttendanceStatus) => {
  const tableExists = await initializeTable();
  if (!tableExists) {
    return;
  }

  try {
    const { error } = await supabase
      .from('attendance')
      .upsert({ date, status });
    
    if (error) {
      toast.error("Failed to update attendance: " + error.message);
      return;
    }

    toast.success("Attendance updated successfully");
  } catch (err) {
    toast.error("An unexpected error occurred while updating attendance");
  }
};