import Typography from '@mui/material/Typography'
import styles from './notData.module.css'

export const NotData = ({
  title,
  showActions
}: {
  title: string
  showActions?: React.ReactNode
}) => {
  return (
    <div className={styles.notData}>
      <Typography variant="body2">
        There are not <span className={styles.notDataTitle}>{title}</span> yet.
      </Typography>
      {showActions && showActions}
    </div>
  )
}
