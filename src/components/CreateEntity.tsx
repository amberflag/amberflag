import { useCreateEditProjectContext } from '@/provider/CreateEditProject'
import Button from '@mui/material/Button'
import React from 'react'

export const CreateEntity = ({ title }: { title: string }) => {
  const { setOpenDialog } = useCreateEditProjectContext()
  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          marginBottom: '1rem'
        }}
      >
        <Button
          variant="contained"
          sx={{ paddingInline: '3rem' }}
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
