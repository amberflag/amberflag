import CircularProgress from '@mui/material/CircularProgress'

export const LoadingContent = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <CircularProgress />
    </div>
  )
}
