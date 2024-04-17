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
import styles from './confirmationModal.module.css'

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
      <DialogTitle className={styles.dialogTitle} id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={styles.dialogContentText}
          id="alert-dialog-description"
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
