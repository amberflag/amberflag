// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

serve(async req => {
  const { key, token } = await req.json()
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
      // {
      //   global: {
      //     headers: { Authorization: req.headers.get('Authorization')! }
      //   }
      // }
    )

    const { data, error } = await supabase
      .from('projects')
      .select('id')
      .eq('integration_key', key)
      .eq('integration_token', token)
      .single()
    if (error) {
      throw error
    }
    if (!data) {
      return new Response(null, {
        status: 404
      })
    }

    const { data: dataFeatureFlags, error: errorFeatureFlags } = await supabase
      .from('featureFlags')
      .select('name,activated')
      .eq('project_id', data.id)

    if (errorFeatureFlags) {
      throw errorFeatureFlags
    }

    const featureFlagsMap: Record<string, string[]> = {}

    if (dataFeatureFlags?.length) {
      for (const feature of dataFeatureFlags) {
        if (feature?.activated?.length) {
          featureFlagsMap[feature?.name] = feature?.activated
        }
      }
    }

    return new Response(JSON.stringify({ data: featureFlagsMap }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      status: 500
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
