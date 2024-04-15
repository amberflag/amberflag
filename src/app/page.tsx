import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Dashboard } from './dashboard'

export default async function Home() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  const userInProjects = await supabase
    .from('userProjects')
    .select('project_id,isAdmin')
    .eq('user_id', data?.user?.id)

  const projectsBelongTo =
    userInProjects?.data?.map(item => item.project_id) || []
  const adminProjects =
    userInProjects?.data
      ?.filter(item => item.isAdmin)
      .map(item => item.project_id) || []
  const projectData = await supabase
    .from('projects')
    .select('*')
    .order('created_at')
    .in('id', projectsBelongTo)

  return (
    <main>
      <Dashboard
        user={data?.user}
        projects={projectData?.data?.map(project => {
          return {
            ...project,
            isAdmin: adminProjects.some(
              adminProjectId => adminProjectId === project.id
            )
          }
        })}
      />
    </main>
  )
}
