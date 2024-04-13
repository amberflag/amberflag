import Button from '@mui/material/Button'
import React from 'react'

export const CreateEntity = ({
  title,
  setOpen
}: {
  title: string
  setOpen: (isOpened: boolean) => void
}) => {
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
            setOpen(true)
          }}
        >
          create {title}
        </Button>
      </div>
    </>
  )
}
