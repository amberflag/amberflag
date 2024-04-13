import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@mui/material'

import { EmojiSelector } from './EmojiSelector'

export const ConfirmationModal = ({
  title,
  open,
  deny,
  accept
}: {
  title: string
  open: boolean
  deny: () => void
  accept: any
}) => {
  return (
    <Dialog
      open={open}
      onClose={deny}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{ textTransform: 'uppercase' }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ paddingTop: '1rem' }}
        >
          Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={deny} color="error" variant="contained">
          No
        </Button>
        <Button onClick={accept} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
