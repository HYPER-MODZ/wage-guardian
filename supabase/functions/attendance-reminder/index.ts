import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { time } = await req.json();
    const currentDate = new Date().toISOString().split('T')[0];

    // Check if attendance is already marked for today
    const { data: attendanceData } = await supabaseClient
      .from('attendance')
      .select('*')
      .eq('date', currentDate);

    // If attendance is not marked, send notification
    if (!attendanceData?.length) {
      console.log(`Sending ${time} reminder for date: ${currentDate}`);
      // For now, we'll just return a success response
      // Later, this could be integrated with a push notification service
      return new Response(
        JSON.stringify({
          message: `Reminder sent for ${time}`,
          date: currentDate,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'Attendance already marked for today',
        date: currentDate,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});