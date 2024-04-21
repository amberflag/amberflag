import { ProjectCard } from './ProjectCard'
import { useMemo } from 'react'
import { LoadingContent } from '../LoadingContent'
import {
  useCreateEditProjectContext,
  useProjectsContext
} from '@/provider/Context'
import styles from './projects.module.css'
import { Project } from '@/interfaces/project'

export const ListProjects = () => {
  const { projects } = useProjectsContext()
  const { setProject, setOpenDialogCreateEditProject } =
    useCreateEditProjectContext()

  const ListProjects = useMemo(
    () => (
      <div className={styles.listProjects}>
        {!!projects?.length &&
          projects?.map((project: Project) => (
            <ProjectCard
              project={project}
              key={project?.id?.toString()}
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
