'use client'

import { AppBar } from '@/components/AppBar'
import {
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  Typography,
  debounce,
  Drawer
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { FeatureFlagList } from '@/components/featureFlags/FeatureFlagList'
import { FeatureFlagActions } from '@/components/featureFlags/FeatureFlagActions'
import { NotData } from '@/components/NotData'
import React from 'react'
import { CreateEditDialog } from '@/components/featureFlags/CreateEditDialog'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import { CreateFlagsEnvsButtons } from '@/components/featureFlags/CreateFlagsEnvsButtons'
import styles from './project.module.css'
import { createClient } from '@/utils/supabase/client'
import { UsersContent } from '@/components/users/UsersContent'
import { IntegrationsContent } from '@/components/integrations/IntegrationsContent'
import {
  useUserContext,
  useSelectedProjectContext,
  useFeatureFlagsContext
} from '@/provider/Context'
import { Project } from '@/interfaces/project'
import { User } from '@/interfaces/user'
import { FeatureFlags } from '@/interfaces/featureFlags'

export const ProjectDashboard = ({
  project,
  user,
  featureFlags
}: {
  project: Project
  user: User
  featureFlags: FeatureFlags[]
}) => {
  const { setUser } = useUserContext()
  const { setSelectedProject, selectedProject } = useSelectedProjectContext()
  const { setFeatureFlags } = useFeatureFlagsContext()
  const [showDrawer, setDrawer] = React.useState('')

  const supabaseClient = createClient()

  const showTableAndActions =
    !!featureFlags?.length && !!project?.environments?.length

  React.useEffect(() => {
    setUser?.(user)
  }, [user])

  React.useEffect(() => {
    setSelectedProject?.(project)
  }, [project])

  React.useEffect(() => {
    setFeatureFlags?.(featureFlags)
  }, [featureFlags])

  const search = React.useCallback(
    async (label: string) => {
      const query = supabaseClient
        .from('featureFlags')
        .select('*')
        .eq('project_id', selectedProject?.id)
      if (label) {
        query.textSearch('name', `'${label}'`)
      }
      await query
        .order('created_at')
        .then((response: any) => setFeatureFlags?.(response.data))
    },
    [selectedProject, setFeatureFlags, supabaseClient]
  )

  const ProjectDashboard = React.useMemo(
    () => (
      <>
        <AppBar showBack subtitle="Feature flags" />
        <span className={styles.presentation}>
          <span className={styles.title}>
            <Typography variant="h3" className={styles.emoji}>
              {project.emoji}
            </Typography>
            <Typography variant="h4">{project.name}</Typography>
          </span>
          {selectedProject?.isAdmin && (
            <span className={styles.actions}>
              <Button
                variant="text"
                sx={{ textDecoration: 'underline' }}
                onClick={() => {
                  setDrawer('users')
                }}
              >
                Admin Users
              </Button>
              <Button
                variant="text"
                sx={{ textDecoration: 'underline' }}
                onClick={() => {
                  setDrawer('integrations')
                }}
              >
                Integrations
              </Button>
            </span>
          )}
        </span>
        <div className={styles.content}>
          {showTableAndActions && (
            <>
              <div className={styles.table}>
                <Typography variant="h5">Feature flags</Typography>
                <CreateFlagsEnvsButtons showButtons />
                <FormControl
                  variant="outlined"
                  size="small"
                  className={styles.search}
                >
                  <InputLabel htmlFor="search-feature-flag">Search</InputLabel>
                  <OutlinedInput
                    onChange={debounce(
                      (event: any) => search(event.target.value),
                      500
                    )}
                    id="search-feature-flag"
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    label="Search"
                  />
                </FormControl>
              </div>
              <FeatureFlagList />
              {selectedProject?.isAdmin && <FeatureFlagActions />}
            </>
          )}
          {!showTableAndActions && (
            <div className={styles.extra}>
              <NotData
                title="Feature flags"
                showActions={
                  <>{selectedProject?.isAdmin && <CreateFlagsEnvsButtons />}</>
                }
              />
            </div>
          )}
        </div>

        <CreateEditDialog />
      </>
    ),
    [project, search, showTableAndActions]
  )

  return (
    <>
      {ProjectDashboard}
      <Drawer
        anchor="right"
        open={!!showDrawer}
        onClose={() => {
          setDrawer('')
        }}
      >
        <div className={styles.drawerContent}>
          <Typography variant="h5">
            {showDrawer === 'users' ? 'Admin Users' : 'Integrations'}
          </Typography>
          {showDrawer === 'users' ? <UsersContent /> : <IntegrationsContent />}
        </div>
      </Drawer>
    </>
  )
}
