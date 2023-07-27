// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
import { Buffer } from "https://deno.land/std@0.139.0/node/buffer.ts";
import _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/lodash.js"

console.log("Hello from Functions!")

// Supabase env variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

// create supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  //const { user_id } = await req.json()

   // change user settings
   try {
    const { payload } = await req.json()

    console.log("Hello from Functions!")
    console.log(payload)

    const settings = {
      id: payload.id,
      data_saver: payload.data_saver,
      crossfade: payload.crossfade,
      auto_mix: payload.auto_mix,
      explicit_content: payload.explicit_content,
      bpm_normalization: payload.bpm_normalization,
      high_bpm_warning: payload.high_bpm_warning,
    };

    const { data: userSettings, error: userSettingsError } = await supabase
      .from('user_settings')
      .upsert(settings)
      .select()
    if (userSettingsError) {
      return new Response(
        JSON.stringify({ error: userSettingsError }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      )
    }

    return new Response(
      JSON.stringify({ data: userSettings }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }},
      {body: JSON.stringify({ data: userSettings })},
    )
   }
    catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'