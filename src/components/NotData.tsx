import Typography from '@mui/material/Typography'

export const NotData = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px'
      }}
    >
      <Typography variant="body2">
        There are not <span style={{ color: '#e5b700' }}>{title}</span> yet.
      </Typography>
    </div>
  )
}
