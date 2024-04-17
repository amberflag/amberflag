import Typography from '@mui/material/Typography'
import styles from './notData.module.css'

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
      className={styles.notData}
      style={{
        height: height || '80vh'
      }}
    >
      <Typography variant="body2">
        There are not <span className={styles.title}>{title}</span> yet.
      </Typography>
      {showActions && showActions}
    </div>
  )
}
