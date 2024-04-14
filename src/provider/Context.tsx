'use client'

import { CreateEditEnvironmentOrFlagProvider } from './CreateEditEnvironmentOrFlag'
import { CreateEditProjectProvider } from './CreateEditProject'
import { FeatureFlagsProvider } from './FeatureFlags'
import { ProjectsProvider } from './ProjectsContext'
import { SelectedProjectProvider } from './SelectedProject'
import { UserProvider } from './UserContext'

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ProjectsProvider>
        <CreateEditProjectProvider>
          <CreateEditEnvironmentOrFlagProvider>
            <SelectedProjectProvider>
              <FeatureFlagsProvider>{children}</FeatureFlagsProvider>
            </SelectedProjectProvider>
          </CreateEditEnvironmentOrFlagProvider>
        </CreateEditProjectProvider>
      </ProjectsProvider>
    </UserProvider>
  )
}
