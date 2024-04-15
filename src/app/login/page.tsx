'use client'
import { loginWithSSO } from './actions'
import * as React from 'react'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { IoLogoGithub } from 'react-icons/io5'
import { IoLogoGitlab } from 'react-icons/io5'
import { IoLogoBitbucket } from 'react-icons/io5'

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              gap: '5px'
            }}
          >
            <Button
              onClick={() => {
                loginWithSSO('github')
              }}
              color="primary"
              variant="contained"
              sx={{
                width: '100%'
              }}
            >
              <IoLogoGithub
                style={{
                  marginRight: '10px'
                }}
              />
              Continue with github
            </Button>
            <Button
              onClick={() => {
                loginWithSSO('gitlab')
              }}
              color="primary"
              variant="contained"
              sx={{
                width: '100%'
              }}
            >
              <IoLogoGitlab
                style={{
                  marginRight: '10px'
                }}
              />
              Continue with gitlab
            </Button>
            <Button
              onClick={() => {
                loginWithSSO('bitbucket')
              }}
              color="primary"
              variant="contained"
              sx={{
                width: '100%'
              }}
            >
              <IoLogoBitbucket
                style={{
                  marginRight: '10px'
                }}
              />
              Continue with bitbucket
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  )
}
