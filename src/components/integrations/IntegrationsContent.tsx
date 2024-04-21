import { TextField, Button, Snackbar, Typography, Paper } from '@mui/material'
import styles from './integrations.module.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import React from 'react'
import { useSelectedProjectContext } from '@/provider/Context'

export const IntegrationsContent = () => {
  const { selectedProject } = useSelectedProjectContext()
  const [open, setOpen] = React.useState(false)

  const handleClick = (copy: string) => {
    setOpen(true)
    navigator.clipboard.writeText(copy)
  }

  return (
    <div className={styles.content}>
      <div className={styles.keyInputContent}>
        <TextField
          label="Integration Key"
          variant="outlined"
          value={selectedProject?.integration_key || ''}
          className={styles.keyInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick(selectedProject?.integration_key || '')}
        >
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
          <ContentCopyIcon />
        </Button>
      </div>
      <div className={styles.keyInputContent}>
        <TextField
          label="Integration Token"
          variant="outlined"
          value={selectedProject?.integration_token}
          className={styles.keyInput}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick(selectedProject?.integration_token || '')}
        >
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
          />
          <ContentCopyIcon />
        </Button>
      </div>

      <Typography variant="h5"> How to integrate with curl?</Typography>
      <Paper className={styles.integrationBox}>
        <Typography variant="body1">
          {`curl --location 'https://amberflag-server.onrender.com' \ `}
        </Typography>
        <Typography variant="body1">
          {`--header 'Content-Type: application/json' \ `}
        </Typography>
        <Typography variant="body1">
          {`--data '{ "key": <<your key>>, "token": <<your token>> }'`}
        </Typography>
      </Paper>
    </div>
  )
}
