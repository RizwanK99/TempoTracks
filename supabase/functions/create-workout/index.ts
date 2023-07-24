import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Buffer } from "https://deno.land/std@0.139.0/node/buffer.ts";
import _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/lodash.js"


// Supabase env variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

// create supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

serve(async (req) => {
  const { payload } = await req.json()

  console.log("Hello from Functions!")
  console.log(payload)

  const workout = {
    user_id: 1,
    status: '',
    workout_type: '',
    workout_name: '',
  };
  for (var key in payload) {
    workout[key] = payload[key]
  }

  console.log(workout)

  const { data: insertedWorkout, error: insertWorkoutError } = await supabase
    .from('workouts')
    .upsert(workout)
  if (insertWorkoutError) {
    return new Response(
      JSON.stringify({ error: insertWorkoutError }),
      { headers: { "Content-Type": "application/json" } },
    )
  }

  return new Response(
    JSON.stringify({ data: workout }),
    { headers: { "Content-Type": "application/json" } },
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
