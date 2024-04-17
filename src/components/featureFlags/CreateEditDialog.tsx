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
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import styles from './featureFlags.module.css'
import {
  useCreateEditEnvironmentOrFlagContext,
  useSelectedProjectContext
} from '@/provider/Context'

export const CreateEditDialog = () => {
  const { entity, setEntity, openDialogEntity, setOpenDialogEntity } =
    useCreateEditEnvironmentOrFlagContext()
  const { selectedProject } = useSelectedProjectContext()

  const router = useRouter()
  const supabaseClient = createClient()

  const handleClose = () => {
    setOpenDialogEntity?.(false)
    setEntity?.(undefined)
  }

  const handlecreate = async () => {
    const { error } = entity.id ? await edit() : await create()
    if (!error) {
      setOpenDialogEntity?.(false)
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
      open={openDialogEntity}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {entity?.type && (
        <DialogTitle id="alert-dialog-title" className={styles.title}>
          NEW {entity?.type}
        </DialogTitle>
      )}
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          className={styles.dialog}
        >
          <TextField
            id="outlined-basic"
            label="Select a Name"
            variant="outlined"
            required
            className={styles.field}
            onChange={event => {
              setEntity?.({ ...entity, name: event.target.value })
            }}
            value={entity?.name}
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
          disabled={!entity?.name}
          variant="contained"
        >
          {entity?.id ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
