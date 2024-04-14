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

export const CreateEditProject = ({ title }: { title: string }) => {
  const router = useRouter()
  const supabaseClient = createClient()
  const { project, setProject, openDialog, setOpenDialog } =
    useCreateEditProjectContext()

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

  const create = () => {
    return supabaseClient.from('projects').insert([project])
  }

  const edit = () => {
    return supabaseClient
      .from('projects')
      .update([project])
      .eq('id', project.id)
  }

  return (
    <Dialog
      open={openDialog}
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
