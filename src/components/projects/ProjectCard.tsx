import { Card, CardContent, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '../ConfirmationModal'
import React from 'react'
import { createClient } from '@/utils/supabase/client'

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
          cursor: 'pointer',
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
                  color="primary"
                  variant="contained"
                  disabled={!project?.isActivated}
                >
                  Access
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setOpen(true)
                    setEditProject?.(project)
                  }}
                  disabled={!project?.isActivated}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenModalDeleteId(project?.id)}
                >
                  Delete
                </Button>
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
