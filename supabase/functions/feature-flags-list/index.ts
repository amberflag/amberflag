import { serve } from 'server'
import { createClient } from 'supabase'

serve(async (request: Request) => {
  const { key, token } = await request.json()
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
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
