'use client'
import { loginWithSSO } from './actions'
import * as React from 'react'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

export default function LoginPage() {
  return (
    <div
      style={{
        backgroundColor: '#fffda4',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        position: 'absolute'
      }}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Card sx={{ height: 'min-content' }}>
          <CardHeader title="Amber Flag" />
          <CardContent>The app to management of feature flags</CardContent>
          <CardActions>
            <Button
              onClick={() => {
                loginWithSSO('github')
              }}
            >
              Continue with github
            </Button>
            <Button
              onClick={() => {
                loginWithSSO('gitlab')
              }}
            >
              Continue with gitlab
            </Button>
            <Button
              onClick={() => {
                loginWithSSO('bitbucket')
              }}
            >
              Continue with bitbucket
            </Button>
          </CardActions>
        </Card>
      </Container>
    </div>
  )
}
