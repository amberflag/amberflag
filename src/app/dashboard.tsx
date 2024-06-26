'use client'
import { AppBar } from '@/components/AppBar'
import { CreateEntity } from '@/components/CreateEntity'
import { NotData } from '@/components/NotData'
import { CreateEditProject } from '@/components/projects/CreateEditProject'
import { ListProjects } from '@/components/projects/ListProjects'
import { Project } from '@/interfaces/project'
import { User } from '@/interfaces/user'
import { useProjectsContext, useUserContext } from '@/provider/Context'
import React from 'react'

export const Dashboard = ({
  user,
  projects
}: {
  user: User
  projects?: Project[] | null
}) => {
  const { setUser } = useUserContext()
  const { setProjects } = useProjectsContext()

  React.useEffect(() => {
    setUser?.(user)
  }, [user])

  React.useEffect(() => {
    setProjects?.(projects || [])
  }, [projects])

  return (
    <>
      <AppBar />
      <div
        style={{
          marginTop: '1rem',
          paddingInline: '0.5rem'
        }}
      >
        <CreateEntity title="project" />
        {!projects || !projects?.length ? (
          <NotData title="Projects" />
        ) : (
          <ListProjects />
        )}
      </div>

      <CreateEditProject title="project" />
    </>
  )
}
