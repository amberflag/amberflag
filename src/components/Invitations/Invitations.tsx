'use client'
import { createClient } from '@/utils/supabase/client'
import { Dialog, DialogTitle } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { CardInvitation } from './CardInvitation'
import styles from './invitations.module.css'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/provider/Context'

export const Invitations = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  const [projectsInvited, setProjectsInvited] = React.useState([])
  const { user } = useUserContext()
  const supabaseClient = createClient()
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
  }

  const getInvitations = useCallback(
    () =>
      supabaseClient
        .from('userProjects')
        .select('id,project_id')
        .eq('invited_email', user?.email)
        .is('user_id', null)
        .then((response: any) => {
          if (response?.data?.length) {
            setProjectsInvited(response?.data)
            setOpen(true)
          } else {
            setOpen(false)
          }
        }),
    [supabaseClient, user?.email]
  )

  useEffect(() => {
    if (user?.email) {
      getInvitations()
    }
  }, [getInvitations, user?.email])

  const accept = async (id: string) => {
    await supabaseClient
      .from('userProjects')
      .update({ user_id: user?.id })
      .eq('id', id)
    await getInvitations()
    router.refresh()
  }

  const decline = async (id: string) => {
    await supabaseClient.from('userProjects').delete().eq('id', id)
    await getInvitations()
  }

  return (
    <>
      {children}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          You have been invited to participate in new projects
        </DialogTitle>
        <div className={styles.DialogContent}>
          {projectsInvited.map((invitation: any) => (
            <CardInvitation
              invitation={invitation}
              key={invitation.id}
              accept={accept}
              decline={decline}
            />
          ))}
        </div>
      </Dialog>
    </>
  )
}
