import Typography from '@mui/material/Typography'

export const NotData = ({
  title,
  showActions,
  height
}: {
  title: string
  showActions?: React.ReactNode
  height?: string
}) => {
  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        height: height || '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        flexDirection: 'column'
      }}
    >
      <Typography variant="body2">
        There are not <span style={{ color: '#e5b700' }}>{title}</span> yet.
      </Typography>
      {showActions && showActions}
    </div>
  )
}
