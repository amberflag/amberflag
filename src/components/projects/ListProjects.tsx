import { ProjectCard } from './ProjectCard'

export const ListProjects = ({
  projects,
  setEditProject,
  setOpen
}: {
  projects: any[]
  setEditProject: (project: any) => void
  setOpen: (open: boolean) => void
}) => {
  return (
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
      {projects?.map(project => (
        <ProjectCard
          project={project}
          key={project.id}
          setEditProject={setEditProject}
          setOpen={setOpen}
        />
      ))}
    </div>
  )
}
