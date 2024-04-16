// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'server'
import { createClient } from 'supabase'
import { invite } from '../_shared/invite.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (request: Request) => {
  try {
    const payload = await request.json()
    const { record } = payload
    const authHeader = request.headers.get('Authorization')!

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data, error } = await supabase
      .from('projects')
      .select('name')
      .eq('id', record.project_id)
      .single()

    if (error) {
      throw error
    }
    if (!data) {
      return new Response(null, {
        status: 404
      })
    }

    const dataSent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: `AmberFlag <onboarding@resend.dev>`,
        to: record.invited_email,
        subject: `Invite to AmberFlag`,
        html: invite(data.name)
      })
    })

    console.log(
      'email sent to: ',
      record.invited_email,
      'for project:',
      record.project_id
    )

    return new Response(null, {
      headers: { 'Content-Type': 'application/json' },
      status: 204
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), {
      status: 500
    })
  }
})
