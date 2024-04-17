import CircularProgress from '@mui/material/CircularProgress'
import styles from './loadingContent.module.css'

export const LoadingContent = () => {
  return (
    <div className={styles.loading}>
      <CircularProgress />
    </div>
  )
}
