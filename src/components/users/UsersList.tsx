import { useUsersProjectContext } from '@/provider/UsersProject'
import { NotData } from '../NotData'
import styles from './users.module.css'
import {
  Typography,
  List,
  ListItem,
  Card,
  FormControlLabel,
  Switch,
  CircularProgress
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useSelectedProjectContext } from '@/provider/SelectedProject'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useRouter } from 'next/navigation'

export const UsersList = () => {
  const { usersProject } = useUsersProjectContext()
  const [isLoading, setLoading] = useState(false)
  const supabaseClient = createClient()
  const router = useRouter()

  const checkUncheckAdmin = async ({
    id,
    isChecked
  }: {
    id: string
    isChecked: boolean
  }) => {
    setLoading(true)
    await supabaseClient
      .from('userProjects')
      .update({ isAdmin: isChecked })
      .eq('id', id)
    router.refresh()
    setLoading(false)
  }

  return (
    <div className={styles.containerList}>
      {!usersProject?.length && <NotData title="users" />}
      {usersProject?.length && (
        <List className={styles.listContent}>
          {usersProject.map((user: any) => (
            <ListItem key={user.id}>
              <Card className={styles.emailCard}>
                <div className={styles.titleCard}>
                  <Typography variant="body1">{user.invited_email}</Typography>
                  {user?.user_id && <CheckCircleOutlineIcon />}
                </div>
                {!isLoading && (
                  <FormControlLabel
                    value="Admin"
                    control={
                      <Switch
                        color="primary"
                        checked={user.isAdmin}
                        onChange={event => {
                          checkUncheckAdmin({
                            id: user.id,
                            isChecked: event.target.checked
                          })
                        }}
                      />
                    }
                    label="Admin"
                    labelPlacement="start"
                  />
                )}
                {isLoading && <CircularProgress />}
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}