import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { Buffer } from "https://deno.land/std@0.139.0/node/buffer.ts";
import _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/lodash.js"


// Supabase env variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

// create supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { payload } = await req.json()

    const user_id = payload.user_id;
    const status = payload.status;

    console.log("Hello from Functions!")
    console.log(user_id)

    if (status == null) {

      const { data: userWorkouts, error: userWorkoutsError } = await supabase
        .from('workouts')
        .select()
        .filter('user_id', 'eq', user_id)

        if (userWorkoutsError) {
          return new Response(
            JSON.stringify({ error: userWorkoutsError }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
          )
        }
    
        return new Response(
          JSON.stringify({ userWorkouts }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
          { body: JSON.stringify({ userWorkouts }) },
        )
    }
    else {
      const { data: userWorkouts, error: userWorkoutsError } = await supabase
        .from('workouts')
        .select()
        .filter('user_id', 'eq', user_id)
        .filter('status', 'eq', status)

        if (userWorkoutsError) {
          return new Response(
            JSON.stringify({ error: userWorkoutsError }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
          )
        }
    
        return new Response(
          JSON.stringify({ userWorkouts }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
          { body: JSON.stringify({ userWorkouts }) },
        )
    }

    

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
