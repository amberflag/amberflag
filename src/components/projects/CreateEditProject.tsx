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
import { useCreateEditProjectContext, useUserContext } from '@/provider/Context'

export const CreateEditProject = ({ title }: { title: string }) => {
  const router = useRouter()
  const supabaseClient = createClient()
  const {
    project,
    setProject,
    openDialogCreateEditProject,
    setOpenDialogCreateEditProject
  } = useCreateEditProjectContext()
  const { user } = useUserContext()

  const handleClose = () => {
    setOpenDialogCreateEditProject?.(false)
    setProject?.(undefined)
  }

  const handlecreate = async () => {
    const { error } = project.id ? await edit() : await create()
    if (!error) {
      setOpenDialogCreateEditProject(false)
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
      open={openDialogCreateEditProject}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ textTransform: 'uppercase' }}
      >
        NEW {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ paddingTop: '1rem' }}
        >
          <TextField
            id="outlined-basic"
            label="Select a Name"
            variant="outlined"
            required
            sx={{ minWidth: '350px' }}
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
        <Button onClick={handleClose} color="error" variant="text">
          Discard
        </Button>
        <Button
          onClick={handlecreate}
          autoFocus
          disabled={!project?.name}
          variant="contained"
        >
          {project?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
