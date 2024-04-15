import { Card, CardContent, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '../ConfirmationModal'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

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
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setOpen(true)
                        setEditProject?.(project)
                      }}
                      disabled={!project?.isActivated}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => setOpenModalDeleteId(project?.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </>
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
    </>
  )
}
