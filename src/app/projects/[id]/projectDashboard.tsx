'use client'

import { AppBar } from '@/components/AppBar'
import {
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  Typography,
  debounce
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { FeatureFlagList } from '@/components/featureFlags/FeatureFlagList'
import { FeatureFlagActions } from '@/components/featureFlags/FeatureFlagActions'
import { NotData } from '@/components/NotData'
import React from 'react'
import { CreateEditDialog } from '@/components/featureFlags/CreateEditDialog'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import { useUserContext } from '@/provider/UserContext'
import { CreateFlagsEnvsButtons } from '@/components/featureFlags/CreateFlagsEnvsButtons'
import { useSelectedProjectContext } from '@/provider/SelectedProject'
import { useFeatureFlagsContext } from '@/provider/FeatureFlags'
import styles from './project.module.css'
import { createClient } from '@/utils/supabase/client'

export const ProjectDashboard = ({ project, user, featureFlags }: any) => {
  const router = useRouter()
  const supabaseClient = createClient()

  const showTableAndActions =
    !!featureFlags?.length && !!project?.environments?.length

  const { setUser } = useUserContext()
  const { setSelectedProject, selectedProject } = useSelectedProjectContext()
  const { setFeatureFlags } = useFeatureFlagsContext()

  React.useEffect(() => {
    setUser?.(user)
  }, [user])

  React.useEffect(() => {
    setSelectedProject?.(project)
  }, [project])

  React.useEffect(() => {
    setFeatureFlags?.(featureFlags)
  }, [featureFlags])

  const search = async (label: string) => {
    const query = supabaseClient
      .from('featureFlags')
      .select('*')
      .eq('project_id', selectedProject?.id)
    if (label) {
      query.textSearch('name', `'${label}'`)
    }
    await query
      .order('created_at')
      .then((response: any) => setFeatureFlags(response.data))
  }

  return (
    <>
      <AppBar showBack subtitle="Feature flags" />
      <span className={styles.presentation}>
        <span className={styles.title}>
          <Typography variant="h3" className={styles.emoji}>
            {project.emoji}
          </Typography>
          <Typography variant="h4">{project.name}</Typography>
        </span>
        <span className={styles.actions}>
          <Button
            variant="text"
            sx={{ textDecoration: 'underline' }}
            onClick={() => {
              router.push(`/projects/${project.uuid}/users`)
            }}
          >
            Admin Users
          </Button>
          <Button
            variant="text"
            sx={{ textDecoration: 'underline' }}
            onClick={() => {
              router.push(`/projects/${project.uuid}/integrations`)
            }}
          >
            Integrations
          </Button>
        </span>
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
            <FeatureFlagActions />
          </>
        )}
        {!showTableAndActions && (
          <div className={styles.extra}>
            <NotData
              title="Feature flags"
              showActions={<CreateFlagsEnvsButtons />}
            />
          </div>
        )}
      </div>

      <CreateEditDialog />
    </>
  )
}
