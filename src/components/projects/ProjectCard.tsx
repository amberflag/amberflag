import { Card, CardContent, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '../ConfirmationModal'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
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
  const supabaseClient = createClient()

  return (
    <>
      <Card
        className={`${styles.card} ${project?.isCardActivated ? styles.cardActivated : styles.cardDeactivated}`}
        key={key}
      >
        <CardContent className={styles.cardContent}>
          <div className={styles.title}>
            <Typography variant="h4">{project?.emoji}</Typography>
            <Typography className={styles.titleText} variant="body1">
              {project?.name}
            </Typography>
          </div>

          <div className={styles.actions}>
            {project?.isActivated && (
              <>
                <Button
                  className={styles.button}
                  onClick={() => {
                    router.push(`/projects/${project?.uuid}`)
                  }}
                  variant="outlined"
                  disabled={!project?.isActivated}
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
