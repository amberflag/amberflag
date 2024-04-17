import { ProjectCard } from './ProjectCard'
import { useMemo } from 'react'
import { LoadingContent } from '../LoadingContent'
import {
  useCreateEditProjectContext,
  useProjectsContext
} from '@/provider/Context'

export const ListProjects = () => {
  const { projects } = useProjectsContext()
  const { setProject, setOpenDialogCreateEditProject } =
    useCreateEditProjectContext()

  const ListProjects = useMemo(
    () => (
      <div
        style={{
          height: '650px',
          backgroundColor: '#f6f6f6',
          borderRadius: '5px',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {!projects.length && <LoadingContent />}
        {!!projects.length &&
          projects?.map((project: any) => (
            <ProjectCard
              project={project}
              key={project.id}
              setEditProject={setProject}
              setOpen={setOpenDialogCreateEditProject}
            />
          ))}
      </div>
    ),
    [projects, setProject, setOpenDialogCreateEditProject]
  )

  return ListProjects
}
