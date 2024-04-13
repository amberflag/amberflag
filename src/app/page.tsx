import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Dashboard } from './dashboard'

export default async function Home() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  console.log('kkkkk', data)

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main>
      <Dashboard />
    </main>
  )
}
