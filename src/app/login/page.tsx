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
import styles from './login.module.css'

export default function LoginPage() {
  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <Card className={styles.card}>
          <CardHeader title="Amber Flag" />
          <CardContent>The app to management of feature flags</CardContent>
          <div className={styles.loginSSOContainer}>
            <Button
              className={styles.loginButton}
              onClick={() => {
                loginWithSSO('github')
              }}
              color="primary"
              variant="contained"
            >
              <IoLogoGithub className={styles.loginLogo} />
              Continue with github
            </Button>
            <Button
              className={styles.loginButton}
              onClick={() => {
                loginWithSSO('gitlab')
              }}
              color="primary"
              variant="contained"
            >
              <IoLogoGitlab className={styles.loginButton} />
              Continue with gitlab
            </Button>
            <Button
              className={styles.button}
              onClick={() => {
                loginWithSSO('bitbucket')
              }}
              color="primary"
              variant="contained"
            >
              <IoLogoBitbucket className={styles.loginLogo} />
              Continue with bitbucket
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  )
}
