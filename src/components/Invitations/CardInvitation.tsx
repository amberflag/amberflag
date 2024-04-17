import Card from '@mui/material/Card'
import styles from './invitations.module.css'
import { useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import React from 'react'
import { CircularProgress, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Project } from '@/interfaces/project'

export const CardInvitation = ({
  invitation,
  key,
  accept,
  decline
}: {
  invitation: any
  key: string
  accept: (id: string) => void
  decline: (id: string) => void
}) => {
  const [isLoading, setLoading] = React.useState(true)
  const [project, setProject] = React.useState<Project>()
  const supabaseClient = createClient()

  useEffect(() => {
    if (invitation.project_id) {
      supabaseClient
        .from('projects')
        .select('name,emoji')
        .eq('id', invitation.project_id)
        .single()
        .then((response: any) => {
          setLoading(false)
          setProject(response.data)
        })
    }
  }, [invitation.project_id, supabaseClient])

  return (
    <Card key={key} className={styles.invitation} id={key}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <span className={styles.cardContent}>
          <span className={styles.projectTitle}>
            <Typography variant="h4">{project?.emoji}</Typography>
            <Typography>{project?.name}</Typography>
          </span>
          <span className={styles.action}>
            <Button
              color="success"
              variant="contained"
              onClick={() => accept(invitation?.id)}
            >
              Accept
            </Button>
            <Button color="error" onClick={() => decline(invitation?.id)}>
              Decline
            </Button>
          </span>
        </span>
      )}
    </Card>
  )
}
