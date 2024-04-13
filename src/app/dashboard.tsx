'use client'
import { AppBar } from '@/components/AppBar'
import { CreateEntity } from '@/components/CreateEntity'
import { NotData } from '@/components/NotData'
import { CreateEditProject } from '@/components/projects/CreateEditProject'
import { ListProjects } from '@/components/projects/ListProjects'
import React from 'react'

export const Dashboard = ({
  user,
  projects
}: {
  user: any
  projects?: any[] | null
}) => {
  const [isOpenEditCreateDialog, setOpenEditCreateDialog] =
    React.useState(false)
  const [newProject, setNewProject] = React.useState<any | undefined>()

  return (
    <>
      <AppBar user={user} />
      <div
        style={{
          marginTop: '1rem',
          paddingInline: '0.5rem'
        }}
      >
        <CreateEntity title="project" setOpen={setOpenEditCreateDialog} />
        {!projects && <NotData title="Projects" />}
        {!!projects && (
          <ListProjects
            projects={projects}
            setEditProject={setNewProject}
            setOpen={setOpenEditCreateDialog}
          />
        )}
      </div>

      <CreateEditProject
        setOpen={setOpenEditCreateDialog}
        open={isOpenEditCreateDialog}
        title="project"
        newProject={newProject}
        setNewProject={setNewProject}
      />
    </>
  )
}
