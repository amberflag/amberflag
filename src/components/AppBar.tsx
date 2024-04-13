import { signOut } from '@/app/login/actions'
import {
  AppBar as AppBarMui,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'

export const AppBar = ({ user }: { user: any }) => {
  return (
    <AppBarMui
      position="static"
      sx={{
        minWidth: '400px',
        borderTopRightRadius: user?.user_metadata?.avatar_url
          ? '5rem'
          : undefined,
        borderBottomRightRadius: user?.user_metadata?.avatar_url
          ? '5rem'
          : undefined
      }}
    >
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu">
          💛
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Amber Flag
        </Typography>
        <div
          style={{
            position: 'absolute',
            right: '5px',
            display: 'flex',
            gap: '10px'
          }}
        >
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
  )
}
