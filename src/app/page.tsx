import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Dashboard } from './dashboard'

export default async function Home() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const projectData = await supabase
    .from('projects')
    .select('*')
    .order('created_at')

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main>
      <Dashboard user={data?.user} projects={projectData?.data} />
    </main>
  )
}
