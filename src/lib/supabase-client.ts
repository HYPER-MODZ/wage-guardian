import { createClient } from '@supabase/supabase-js';
import { AttendanceStatus } from './attendance';
import { toast } from '@/components/ui/use-toast';

// Provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lbuxmubjcdtpwvyidavn.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidXhtdWJqY2R0cHd2eWlkYXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MjQyMjcsImV4cCI6MjA0ODMwMDIyN30.wquIZAsm_VuLSpyHY5ARqodTMFTbhkCwdNhQMtufCJU';

export const supabase = createClient(supabaseUrl, supabaseKey);

const SQL_CREATE_TABLE = `
CREATE TABLE public.attendance (
  date TEXT PRIMARY KEY,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);`;

// Initialize the attendance table if it doesn't exist
const initializeTable = async () => {
  const { error } = await supabase
    .from('attendance')
    .select('*')
    .limit(1);

  if (error?.code === '42P01') {
    toast({
      title: "Database Table Missing",
      description: "Please create the attendance table in your Supabase dashboard using the SQL command provided in the console.",
      variant: "destructive",
      duration: 10000,
    });
    console.error('Please create the attendance table using this SQL:', SQL_CREATE_TABLE);
    return false;
  }

  if (error) {
    toast({
      title: "Database Error",
      description: "Failed to check table existence: " + error.message,
      variant: "destructive",
    });
    return false;
  }

  return true;
};

export const getAttendanceData = async () => {
  const tableExists = await initializeTable();
  if (!tableExists) {
    return {};
  }

  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('*');
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch attendance data: " + error.message,
        variant: "destructive",
      });
      return {};
    }
    
    const attendanceMap: Record<string, AttendanceStatus> = {};
    data?.forEach(record => {
      attendanceMap[record.date] = record.status;
    });
    
    return attendanceMap;
  } catch (err) {
    toast({
      title: "Error",
      description: "An unexpected error occurred while fetching attendance data",
      variant: "destructive",
    });
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
      toast({
        title: "Error",
        description: "Failed to update attendance: " + error.message,
        variant: "destructive",
      });
      return;
    }
  } catch (err) {
    toast({
      title: "Error",
      description: "An unexpected error occurred while updating attendance",
      variant: "destructive",
    });
  }
};