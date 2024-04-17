import { useCreateEditProjectContext } from '@/provider/Context'
import Button from '@mui/material/Button'
import React from 'react'
import styles from './createEntity.module.css'

export const CreateEntity = ({ title }: { title: string }) => {
  const { setOpenDialogEntity } = useCreateEditProjectContext()
  return (
    <>
      <div className={styles.createButtons}>
        <Button
          className={styles.createButton}
          variant="text"
          onClick={() => {
            setOpenDialogEntity(true)
          }}
        >
          create {title}
        </Button>
      </div>
    </>
  )
}
