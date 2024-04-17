import { ProjectCard } from './ProjectCard'
import { useMemo } from 'react'
import { LoadingContent } from '../LoadingContent'
import {
  useCreateEditProjectContext,
  useProjectsContext
} from '@/provider/Context'
import styles from './projects.module.css'

export const ListProjects = () => {
  const { projects } = useProjectsContext()
  const { setProject, setOpenDialogCreateEditProject } =
    useCreateEditProjectContext()

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
              setOpen={setOpenDialogCreateEditProject}
            />
          ))}
      </div>
    ),
    [projects, setProject, setOpenDialogCreateEditProject]
  )

  return ListProjects
}
