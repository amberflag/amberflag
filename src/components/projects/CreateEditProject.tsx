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

export const CreateEditProject = ({
  open,
  setOpen,
  title,
  setNewProject,
  newProject
}: {
  open: boolean
  setOpen: (isOpen: boolean) => void
  title: string
  setNewProject?: (newProject: any | undefined) => void
  newProject: any
}) => {
  const router = useRouter()
  const supabaseClient = createClient()

  const handleClose = () => {
    setOpen(false)
    setNewProject?.(undefined)
  }

  const handlecreate = async () => {
    const { error } = newProject.id ? await edit() : await create()
    if (!error) {
      setOpen(false)
      setNewProject?.(undefined)
      router.refresh()
    }
  }

  const create = () => {
    return supabaseClient.from('projects').insert([newProject])
  }

  const edit = () => {
    return supabaseClient
      .from('projects')
      .update([newProject])
      .eq('id', newProject.id)
  }

  return (
    <Dialog
      open={open}
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
              setNewProject?.({ ...newProject, name: event.target.value })
            }}
            value={newProject?.name}
          />

          <EmojiSelector
            selectEmoji={emoji => {
              setNewProject?.({ ...newProject, emoji })
            }}
            emojiDefault={newProject?.emoji}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Discard
        </Button>
        <Button onClick={handlecreate} autoFocus disabled={!newProject?.name}>
          {newProject?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
