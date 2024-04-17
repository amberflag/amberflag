import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@mui/material'
import React from 'react'
import { EmojiSelector } from '../EmojiSelector'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useCreateEditProjectContext } from '@/provider/CreateEditProject'
import { useUserContext } from '@/provider/UserContext'
import styles from './projects.module.css'

export const CreateEditProject = ({ title }: { title: string }) => {
  const router = useRouter()
  const supabaseClient = createClient()
  const { project, setProject, openDialog, setOpenDialog } =
    useCreateEditProjectContext()
  const { user } = useUserContext()

  const handleClose = () => {
    setOpenDialog?.(false)
    setProject?.(undefined)
  }

  const handlecreate = async () => {
    const { error } = project.id ? await edit() : await create()
    if (!error) {
      setOpenDialog(false)
      setProject?.(undefined)
      router.refresh()
    }
  }

  const create = async () => {
    const response = await supabaseClient
      .from('projects')
      .insert([project])
      .select('id')
      .single()
    if (response?.data?.id) {
      await supabaseClient.from('userProjects').insert([
        {
          project_id: response?.data?.id,
          invited_email: user?.email,
          user_id: user?.id,
          isAdmin: true
        }
      ])
    }
    return response
  }

  const edit = () => {
    const projectCopy = { ...project }
    delete projectCopy.isAdmin

    return supabaseClient
      .from('projects')
      .update([projectCopy])
      .eq('id', project.id)
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={styles.dialogTitle} id="alert-dialog-title">
        NEW {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={styles.dialogContentText}
          id="alert-dialog-description"
        >
          <TextField
            className={styles.textField}
            id="outlined-basic"
            label="Select a Name"
            variant="outlined"
            required
            onChange={event => {
              setProject?.({ ...project, name: event.target.value })
            }}
            value={project?.name}
          />

          <EmojiSelector
            selectEmoji={emoji => {
              setProject?.({ ...project, emoji })
            }}
            emojiDefault={project?.emoji}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Discard
        </Button>
        <Button onClick={handlecreate} autoFocus disabled={!project?.name}>
          {project?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
