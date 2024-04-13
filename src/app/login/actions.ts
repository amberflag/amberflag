'use server'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function loginWithSSO(
  provider: 'github' | 'gitlab' | 'bitbucket'
) {
  const supabase = createClient()

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_HOST_URL}/auth/callback`
    }
  })
  console.log('error', error, data)

  if (error) {
    redirect('/error')
  }

  return redirect(data.url)
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
