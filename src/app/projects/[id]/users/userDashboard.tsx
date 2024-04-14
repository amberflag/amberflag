'use client'

import { AppBar } from '@/components/AppBar'
import { Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'

export const UserDashboard = ({ project, user }: any) => {
  const router = useRouter()

  return (
    <>
      <AppBar user={user} />
      <span
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
          paddingInline: '1rem',
          marginTop: '0.5rem'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBackIcon
            fontSize="large"
            sx={{ marginRight: '1rem', cursor: 'pointer' }}
            onClick={() => {
              router.back()
            }}
          />
          <Typography variant="h3" sx={{ marginRight: '0.5rem' }}>
            {project.emoji}
          </Typography>
          <Typography variant="h4">{project.name}</Typography>
        </span>
        <span style={{ display: 'flex', gap: '5px' }}>
          <Typography variant="h5">Admin of Users</Typography>
        </span>
      </span>
    </>
  )
}
