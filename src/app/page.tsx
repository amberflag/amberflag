import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Dashboard } from './dashboard'

export default async function Home() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const projectData = await supabase.from('projects').select('*')

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main>
      <Dashboard
        user={data?.user}
        projects={projectData?.data?.sort((a, b) => a.id - b.id)}
      />
    </main>
  )
}
