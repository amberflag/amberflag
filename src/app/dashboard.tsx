'use client'

import Button from '@mui/material/Button'
import { signOut } from './login/actions'

export const Dashboard = () => {
  return (
    <>
      <Button
        onClick={() => {
          signOut()
        }}
      >
        Logout
      </Button>
    </>
  )
}
