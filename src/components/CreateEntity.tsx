import { useCreateEditProjectContext } from '@/provider/Context'
import Button from '@mui/material/Button'
import React from 'react'
import styles from './createEntity.module.css'

export const CreateEntity = ({ title }: { title: string }) => {
  const { setOpenDialogCreateEditProject } = useCreateEditProjectContext()
  return (
    <>
      <div className={styles.createContainer}>
        <Button
          className={styles.createButton}
          variant="text"
          onClick={() => {
            setOpenDialogCreateEditProject(true)
          }}
        >
          create {title}
        </Button>
      </div>
    </>
  )
}
