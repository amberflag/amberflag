import { useProjectsContext } from '@/provider/ProjectsContext'
import { ProjectCard } from './ProjectCard'
import { useMemo } from 'react'
import { useCreateEditProjectContext } from '@/provider/CreateEditProject'
import { LoadingContent } from '../LoadingContent'
import styles from './projects.module.css'

export const ListProjects = () => {
  const { projects } = useProjectsContext()
  const { setProject, setOpenDialog } = useCreateEditProjectContext()

  const ListProjects = useMemo(
    () => (
      <div className={styles.listProjects}>
        {!projects.length && <LoadingContent />}
        {!!projects.length &&
          projects?.map((project: any) => (
            <ProjectCard
              project={project}
              key={project.id}
              setEditProject={setProject}
              setOpen={setOpenDialog}
            />
          ))}
      </div>
    ),
    [projects, setProject, setOpenDialog]
  )

  return ListProjects
}
