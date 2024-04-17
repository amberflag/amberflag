'use client'
import { FeatureFlags } from '@/interfaces/featureFlags'
import { Project } from '@/interfaces/project'
import { User } from '@/interfaces/user'
import { UserProjects } from '@/interfaces/userProjects'
import React, { createContext, useContext, useState } from 'react'

export declare interface Entity {
  id?: string
  type: string
  referenceDB: string
  environments?: string[]
  name?: string
}

const ContextChangesFeatureFlags = createContext<any>([])
const ContextEditEnvironmentOrFlag = createContext<{
  entity?: Entity
  setEntity?: (entity: Entity) => void
  openDialogEntity?: boolean
  setOpenDialogEntity?: (open: boolean) => void
}>({})
const ContextCreateEditProject = createContext<{
  project?: Project
  setProject?: (p: Project) => void
  openDialogCreateEditProject?: boolean
  setOpenDialogCreateEditProject?: (open: boolean) => void
}>({})
const ContextFeatureFlags = createContext<{
  featureFlags?: FeatureFlags[]
  setFeatureFlags?: (f: FeatureFlags[]) => void
}>({})
const ContextProjects = createContext<{
  setProjects?: (p: Project[]) => void
  projects?: Project[]
}>({})
const ContextSelectedProject = createContext<{
  selectedProject?: Project
  setSelectedProject?: (p: Project) => void
}>({})
const ContextUser = createContext<{ user?: User; setUser?: (u: User) => void }>(
  {}
)
const ContextUsersProject = createContext<{
  usersProject?: UserProjects[]
  setUsersProject?: (u: UserProjects[]) => void
}>({})

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [changesFeaturesFlags, setChangesFeatureFlags] = useState<any>([])
  const [entity, setEntity] = useState<Entity>()
  const [openDialogEntity, setOpenDialogEntity] = useState<boolean>(false)
  const [project, setProject] = useState<Project>()
  const [openDialogCreateEditProject, setOpenDialogCreateEditProject] =
    useState<boolean>(false)
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project>()
  const [user, setUser] = useState<User>()
  const [usersProject, setUsersProject] = useState<UserProjects[]>()

  return (
    <ContextChangesFeatureFlags.Provider
      value={{
        changesFeaturesFlags,
        setChangesFeatureFlags
      }}
    >
      <ContextEditEnvironmentOrFlag.Provider
        value={{
          entity,
          setEntity,
          openDialogEntity,
          setOpenDialogEntity
        }}
      >
        <ContextCreateEditProject.Provider
          value={{
            project,
            setProject,
            openDialogCreateEditProject,
            setOpenDialogCreateEditProject
          }}
        >
          <ContextFeatureFlags.Provider
            value={{ featureFlags, setFeatureFlags }}
          >
            <ContextProjects.Provider value={{ setProjects, projects }}>
              <ContextSelectedProject.Provider
                value={{
                  selectedProject,
                  setSelectedProject
                }}
              >
                <ContextUser.Provider
                  value={{
                    user,
                    setUser
                  }}
                >
                  <ContextUsersProject.Provider
                    value={{
                      usersProject,
                      setUsersProject
                    }}
                  >
                    {children}
                  </ContextUsersProject.Provider>
                </ContextUser.Provider>
              </ContextSelectedProject.Provider>
            </ContextProjects.Provider>
          </ContextFeatureFlags.Provider>
        </ContextCreateEditProject.Provider>
      </ContextEditEnvironmentOrFlag.Provider>
    </ContextChangesFeatureFlags.Provider>
  )
}

export function useChangesFeatureFlagsContext() {
  return useContext(ContextChangesFeatureFlags)
}

export function useCreateEditEnvironmentOrFlagContext() {
  return useContext(ContextEditEnvironmentOrFlag)
}

export function useCreateEditProjectContext() {
  return useContext(ContextCreateEditProject)
}

export function useFeatureFlagsContext() {
  return useContext(ContextFeatureFlags)
}

export function useProjectsContext() {
  return useContext(ContextProjects)
}

export function useSelectedProjectContext() {
  return useContext(ContextSelectedProject)
}

export function useUserContext() {
  return useContext(ContextUser)
}

export function useUsersProjectContext() {
  return useContext(ContextUsersProject)
}
