import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { ProjectDashboard } from './projectDashboard'

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

  const userPermision = await supabase
    .from('userProjects')
    .select('isAdmin')
    .eq('user_id', data.user?.id)
    .eq('project_id', projectData.data.id)
    .single()

  const featureFlags = await supabase
    .from('featureFlags')
    .select('*')
    .eq('project_id', projectData.data?.id)
    .order('created_at')

  return (
    <main>
      <ProjectDashboard
        user={data?.user}
        project={{ ...projectData.data, isAdmin: userPermision?.data?.isAdmin }}
        featureFlags={featureFlags.data || []}
      />
    </main>
  )
}
