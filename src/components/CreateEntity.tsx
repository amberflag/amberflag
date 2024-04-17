import { useCreateEditProjectContext } from '@/provider/CreateEditProject'
import Button from '@mui/material/Button'
import React from 'react'
import styles from './createEntity.module.css'

export const CreateEntity = ({ title }: { title: string }) => {
  const { setOpenDialog } = useCreateEditProjectContext()
  return (
    <>
      <div className={styles.createButtons}>
        <Button
          className={styles.createButton}
          variant="text"
          onClick={() => {
            setOpenDialog(true)
          }}
        >
          create {title}
        </Button>
      </div>
    </>
  )
}
