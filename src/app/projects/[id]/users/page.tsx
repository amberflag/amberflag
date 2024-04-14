import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { NextApiRequest } from 'next'
import { UserDashboard } from './userDashboard'

export default async function Projects({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  if (!params?.id) {
    redirect('/404')
  }
  const projectData = await supabase
    .from('projects')
    .select('*')
    .eq('uuid', params.id)
    .single()

  if (projectData.error || !projectData.data) {
    redirect('/')
  }

  return (
    <main>
      <UserDashboard user={data?.user} project={projectData.data} />
    </main>
  )
}
