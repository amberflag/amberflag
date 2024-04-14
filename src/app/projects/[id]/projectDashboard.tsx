'use client'

import { AppBar } from '@/components/AppBar'
import {
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  Typography
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { FeatureFlagList } from '@/components/featureFlags/FeatureFlagList'
import { FeatureFlagActions } from '@/components/featureFlags/FeatureFlagActions'
import { NotData } from '@/components/NotData'
import React from 'react'
import { CreateEditDialog } from '@/components/featureFlags/CreateEditDialog'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import { createClient } from '@/utils/supabase/client'
import { useUserContext } from '@/provider/UserContext'
import { CreateFlagsEnvsButtons } from '@/components/featureFlags/CreateFlagsEnvsButtons'
import { useSelectedProjectContext } from '@/provider/SelectedProject'
import { useFeatureFlagsContext } from '@/provider/FeatureFlags'

export const ProjectDashboard = ({ project, user, featureFlags }: any) => {
  const router = useRouter()
  const supabaseClient = createClient()

  const [changesFeaturesFlags, setChangesFeatureFlags] = React.useState<any[]>(
    []
  )
  const showTableAndActions =
    !!featureFlags?.length && !!project?.environments?.length

  const { setUser } = useUserContext()
  const { setSelectedProject } = useSelectedProjectContext()
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

  const save = async () => {
    for (let change of changesFeaturesFlags) {
      await supabaseClient
        .from('featureFlags')
        .update({ activated: change.environments || [] })
        .eq('id', change?.id)
    }
    setChangesFeatureFlags([])
    router.refresh()
  }

  const discard = () => {
    setChangesFeatureFlags([])
    window.location.reload()
  }

  return (
    <>
      <AppBar showBack subtitle="Feature flags" />
      <span
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          paddingInline: '1rem',
          marginTop: '0.5rem'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ marginRight: '0.5rem' }}>
            {project.emoji}
          </Typography>
          <Typography variant="h4">{project.name}</Typography>
        </span>
        <span style={{ display: 'flex', gap: '5px' }}>
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/projects/${project.uuid}/users`)
            }}
          >
            Admin Users
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              router.push(`/projects/${project.uuid}/integrations`)
            }}
          >
            Integrations
          </Button>
        </span>
      </span>
      <div
        style={{
          paddingInline: '1rem'
        }}
      >
        {showTableAndActions && (
          <>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem',
                alignItems: 'center'
              }}
            >
              <Typography variant="h5">Feature flags</Typography>
              <CreateFlagsEnvsButtons showButtons />
              <FormControl variant="outlined" size="small" sx={{ flex: 1 }}>
                <InputLabel htmlFor="search-feature-flag">Search</InputLabel>
                <OutlinedInput
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
            <FeatureFlagList
              setChangesFeatureFlags={setChangesFeatureFlags}
              changesFeaturesFlags={changesFeaturesFlags}
            />
            <FeatureFlagActions save={save} discard={discard} />
          </>
        )}
        {!showTableAndActions && (
          <div style={{ marginTop: '2rem' }}>
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
