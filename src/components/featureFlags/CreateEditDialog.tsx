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
import { useCreateEditEnvironmentOrFlagContext } from '@/provider/CreateEditEnvironmentOrFlag'
import { useSelectedProjectContext } from '@/provider/SelectedProject'

export const CreateEditDialog = () => {
  const { entity, setEntity, openDialog, setOpenDialog } =
    useCreateEditEnvironmentOrFlagContext()
  const { selectedProject } = useSelectedProjectContext()

  const router = useRouter()
  const supabaseClient = createClient()

  const handleClose = () => {
    setOpenDialog?.(false)
    setEntity?.(undefined)
  }

  const handlecreate = async () => {
    const { error } = entity.id ? await edit() : await create()
    if (!error) {
      setOpenDialog?.(false)
      setEntity?.(undefined)
      router.refresh()
    }
  }

  const create = () => {
    if (entity.referenceDB === 'environment') {
      return supabaseClient
        .from('projects')
        .update({
          environments: entity?.environments?.length
            ? [...entity?.environments, entity.name]
            : [entity.name]
        })
        .eq('id', selectedProject.id)
    }
    return supabaseClient.from('featureFlags').insert({
      project_id: selectedProject.id,
      name: entity.name,
      activated: []
    })
  }

  const edit = () => {
    return supabaseClient.from('projects').update([entity]).eq('id', entity.id)
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {entity?.type && (
        <DialogTitle
          id="alert-dialog-title"
          style={{ textTransform: 'uppercase' }}
        >
          NEW {entity?.type}
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
              setEntity?.({ ...entity, name: event.target.value })
            }}
            value={entity?.name}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Discard
        </Button>
        <Button onClick={handlecreate} autoFocus disabled={!entity?.name}>
          {entity?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
