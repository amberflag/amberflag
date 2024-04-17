import { signOut } from '@/app/login/actions'
import {
  AppBar as AppBarMui,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import styles from './appBar.module.css'
import { useUserContext } from '@/provider/Context'

export const AppBar = ({
  showBack = false,
  subtitle
}: {
  showBack?: boolean
  subtitle?: string
}) => {
  const { user } = useUserContext()
  const router = useRouter()

  const Bar = useMemo(
    () => (
      <AppBarMui
        className={`${styles.appBar} ${user?.user_metadata?.avatar_url && styles.userWithAvatar}`}
        position="static"
      >
        <Toolbar variant="dense">
          {showBack && (
            <ArrowBackIcon
              className={styles.arrowBackIcon}
              fontSize="large"
              onClick={() => {
                router.back()
              }}
            />
          )}
          <IconButton edge="start" color="inherit" aria-label="menu">
            💛
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Amber Flag
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="#e5b700" component="div">
               {' ' + subtitle}
            </Typography>
          )}
          <div className={styles.logoutButtons}>
            <Button
              color="secondary"
              onClick={() => {
                signOut()
              }}
              variant="outlined"
            >
              Logout
            </Button>
            {user?.user_metadata?.avatar_url && (
              <Avatar src={user?.user_metadata?.avatar_url} />
            )}
          </div>
        </Toolbar>
      </AppBarMui>
    ),
    [user, router, showBack, subtitle]
  )
  return Bar
}
