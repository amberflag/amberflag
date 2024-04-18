import styles from './featureFlags.module.css'
import {
  Entity,
  useCreateEditEnvironmentOrFlagContext,
  useFeatureFlagsContext,
  useSelectedProjectContext
} from '@/provider/Context'
import { Typography, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import MoreVertIcon from '@mui/icons-material/MoreVert'

export const CreateFlagsEnvsButtons = ({ showButtons = false }) => {
  const { setEntity, setOpenDialogEntity, entity } =
    useCreateEditEnvironmentOrFlagContext()
  const { selectedProject } = useSelectedProjectContext()
  const { featureFlags } = useFeatureFlagsContext()

  const router = useRouter()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenuAction = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const supabaseClient = createClient()

  return (
    <div
      style={{
        marginTop: !showButtons ? '1rem' : undefined
      }}
      className={styles.create}
    >
      {showButtons ? (
        <IconButton
          onClick={handleClick}
          aria-controls={openMenuAction ? 'actions-project-card' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenuAction ? 'true' : undefined}
          disabled={!selectedProject?.isAdmin}
        >
          <MoreVertIcon />
        </IconButton>
      ) : (
        <>
          {(!selectedProject?.environments?.length || showButtons) &&
            selectedProject?.isAdmin && (
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenDialogEntity?.(true)
                  setEntity?.({
                    ...entity,
                    type: 'Environment',
                    referenceDB: 'environment',
                    environments: selectedProject?.environments
                  } as Entity)
                }}
              >
                Create Enviroments
              </Button>
            )}
          {(!featureFlags?.length || showButtons) &&
            selectedProject?.isAdmin && (
              <Button
                variant="outlined"
                onClick={() => {
                  setOpenDialogEntity?.(true)
                  setEntity?.({
                    ...entity,
                    type: 'Feature flag',
                    referenceDB: 'featureflag'
                  } as Entity)
                }}
              >
                Create Feature Flags
              </Button>
            )}
        </>
      )}

      <Menu
        id="actions-project-card"
        open={openMenuAction}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem
          className={styles.actionsItem}
          onClick={() => {
            setOpenDialogEntity?.(true)
            setEntity?.({
              ...entity,
              type: 'Environment',
              referenceDB: 'environment',
              environments: selectedProject?.environments
            } as Entity)
          }}
        >
          <Typography>Create Enviroments</Typography>
        </MenuItem>
        <MenuItem
          color="error"
          className={styles.actionsItem}
          onClick={() => {
            setOpenDialogEntity?.(true)
            setEntity?.({
              ...entity,
              type: 'Feature flag',
              referenceDB: 'featureflag'
            } as Entity)
          }}
        >
          <Typography variant="body1">Create Feature Flags</Typography>{' '}
        </MenuItem>
      </Menu>
    </div>
  )
}
