'use client'

import { AppBar } from '@/components/AppBar'
import { Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/provider/UserContext'
import React from 'react'

export const UserDashboard = ({ project, user }: any) => {
  const router = useRouter()
  const { setUser } = useUserContext()
  React.useEffect(() => {
    setUser?.(user)
  }, [user])

  return (
    <>
      <AppBar showBack subtitle="Admin of Users" />
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
          <Typography variant="h3" sx={{ marginRight: '0.5rem' }}>
            {project.emoji}
          </Typography>
          <Typography variant="h4">{project.name}</Typography>
        </span>
      </span>
    </>
  )
}
