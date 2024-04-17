import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '../ConfirmationModal'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import styles from './projects.module.css'

export const ProjectCard = ({
  project,
  key,
  setEditProject,
  setOpen
}: {
  project: any
  key: string
  setEditProject?: (project: any) => void
  setOpen: (open: boolean) => void
}) => {
  const router = useRouter()
  const [openModalDeleteId, setOpenModalDeleteId] = React.useState('')
  const [openModalReactivateId, setOpenModalReactivateId] = React.useState('')

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
    <>
      <Card
        key={key}
        sx={{
          borderRadius: '10px',
          backgroundColor: project?.isActivated ? 'white' : '#e6e6e6a2'
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h4">{project?.emoji}</Typography>
            <Typography variant="body1" sx={{ marginLeft: '10px' }}>
              {project?.name}
            </Typography>
          </div>

          <div style={{ gap: '5px', display: 'flex' }}>
            {project?.isActivated && (
              <>
                <Button
                  onClick={() => {
                    router.push(`/projects/${project?.uuid}`)
                  }}
                  variant="outlined"
                  disabled={!project?.isActivated}
                  sx={{ gap: '5px' }}
                >
                  Feature flags
                  <KeyboardDoubleArrowRightIcon />
                </Button>
                {project?.isAdmin && (
                  <IconButton
                    onClick={handleClick}
                    aria-controls={
                      openMenuAction ? 'actions-project-card' : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={openMenuAction ? 'true' : undefined}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              </>
            )}
            {!project?.isActivated && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpenModalReactivateId(project?.id)}
              >
                Activated
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <ConfirmationModal
        open={!!openModalDeleteId}
        title="Do you want to remove this project?"
        deny={() => setOpenModalDeleteId('')}
        accept={async () => {
          await supabaseClient
            .from('projects')
            .update({ isActivated: false })
            .eq('id', openModalDeleteId)
            .then(() => {
              setOpenModalDeleteId('')
              router.refresh()
            })
        }}
      />
      <ConfirmationModal
        open={!!openModalReactivateId}
        title="Do you want to activate this project?"
        deny={() => setOpenModalReactivateId('')}
        accept={async () => {
          await supabaseClient
            .from('projects')
            .update({ isActivated: true })
            .eq('id', openModalReactivateId)
            .then(() => {
              setOpenModalReactivateId('')
              router.refresh()
            })
        }}
      />
      <Menu
        id="actions-project-card"
        open={openMenuAction}
        onClose={handleClose}
        anchorEl={anchorEl}
      >
        <MenuItem
          className={styles.actionsItem}
          onClick={() => {
            handleClose()
            setOpen(true)
            setEditProject?.(project)
          }}
        >
          <Typography>Edit</Typography>
          <EditIcon fontSize="small" />
        </MenuItem>
        <MenuItem
          color="error"
          className={styles.actionsItem}
          onClick={() => {
            handleClose()
            setOpenModalDeleteId(project?.id)
          }}
        >
          <Typography variant="body1" color="error">
            Delete
          </Typography>{' '}
          <DeleteIcon color="error" />
        </MenuItem>
      </Menu>
    </>
  )
}
