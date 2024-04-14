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

export const CreateEditDialog = ({
  open,
  setOpen,
  title,
  setNewEntity,
  newEntity
}: {
  open: boolean
  setOpen: (isOpen: boolean) => void
  title?: string
  setNewEntity?: (entity: any | undefined) => void
  newEntity: any
}) => {
  const router = useRouter()
  const supabaseClient = createClient()

  const handleClose = () => {
    setOpen(false)
    setNewEntity?.(undefined)
  }

  const handlecreate = async () => {
    const { error } = newEntity.id ? await edit() : await create()
    if (!error) {
      setOpen(false)
      setNewEntity?.(undefined)
      router.refresh()
    }
  }

  const create = () => {
    if (newEntity.referenceDB === 'environment') {
      return supabaseClient
        .from('projects')
        .update({
          environments: newEntity?.environments?.length
            ? [...newEntity?.environments, newEntity.name]
            : [newEntity.name]
        })
        .eq('id', newEntity.projectId)
    }
    return supabaseClient.from('featureFlags').insert({
      project_id: newEntity.projectId,
      name: newEntity.name,
      activated: []
    })
  }

  const edit = () => {
    return supabaseClient
      .from('projects')
      .update([newEntity])
      .eq('id', newEntity.id)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && (
        <DialogTitle
          id="alert-dialog-title"
          style={{ textTransform: 'uppercase' }}
        >
          NEW {title}
        </DialogTitle>
      )}
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
              setNewEntity?.({ ...newEntity, name: event.target.value })
            }}
            value={newEntity?.name}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Discard
        </Button>
        <Button onClick={handlecreate} autoFocus disabled={!newEntity?.name}>
          {newEntity?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
