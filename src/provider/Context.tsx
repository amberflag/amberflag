'use client'
import React, { createContext, useContext, useState } from 'react'

const ContextChangesFeatureFlags = createContext<any>([])
const ContextEditEnvironmentOrFlag = createContext<any>({})
const ContextCreateEditProject = createContext<any>({})
const ContextFeatureFlags = createContext<any>({})
const ContextProjects = createContext<any>({})
const ContextSelectedProject = createContext<any>({})
const ContextUser = createContext<any>({})
const ContextUsersProject = createContext<any>([])

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [changesFeaturesFlags, setChangesFeatureFlags] = useState<any>([])
  const [entity, setEntity] = useState<any>({})
  const [openDialogEntity, setOpenDialogEntity] = useState<boolean>(false)

  const [project, setProject] = useState<any>({})
  const [openDialogCreateEditProject, setOpenDialogCreateEditProject] =
    useState<boolean>(false)
  const [featureFlags, setFeatureFlags] = useState<any>({})
  const [projects, setProjects] = useState<any>({})
  const [selectedProject, setSelectedProject] = useState<any>({})
  const [user, setUser] = useState<any>({})
  const [usersProject, setUsersProject] = useState<any>({})

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
