import { useSelectedProjectContext } from '@/provider/SelectedProject'
import { useUsersProjectContext } from '@/provider/UsersProject'
import { LoadingContent } from '@/components/LoadingContent'
import React from 'react'
import { createClient } from '@/utils/supabase/client'
import { UsersList } from './UsersList'
import { TextField, Button, CircularProgress } from '@mui/material'
import styles from './users.module.css'
import SendIcon from '@mui/icons-material/Send'
import { useRouter } from 'next/navigation'

export const UsersContent = () => {
  const { selectedProject } = useSelectedProjectContext()
  const { setUsersProject, usersProject } = useUsersProjectContext()
  const [loading, setLoading] = React.useState(false)
  const [emailSent, setEmailSent] = React.useState('')
  const [loadingEmailSent, setLoadingEmailSent] = React.useState(false)
  const supabaseClient = createClient()
  const router = useRouter()

  React.useEffect(() => {
    setLoading(true)
    supabaseClient
      .from('userProjects')
      .select('*')
      .eq('project_id', selectedProject?.id)
      .order('id')
      .then(response => {
        setUsersProject(response.data)
        setLoading(false)
      })
  }, [selectedProject, supabaseClient, setUsersProject])

  const sendEmail = async () => {
    setLoadingEmailSent(true)
    if (!usersProject.some((user: any) => user.invited_email === emailSent)) {
      await supabaseClient.from('userProjects').insert([
        {
          invited_email: emailSent,
          isAdmin: false,
          project_id: selectedProject?.id
        }
      ])
      router.refresh()
      setEmailSent('')
    }
    setLoadingEmailSent(false)
  }

  return (
    <>
      <div className={styles.addUser}>
        <TextField
          label="Add user by email"
          className={styles.inputEmail}
          size="small"
          value={emailSent}
          onChange={event => setEmailSent(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendEmail}
          disabled={
            !emailSent ||
            usersProject.some((user: any) => user.invited_email === emailSent)
          }
        >
          {loadingEmailSent ? <CircularProgress /> : <SendIcon />}
        </Button>
      </div>
      {loading && <LoadingContent />}
      {!loading && <UsersList />}
    </>
  )
}
