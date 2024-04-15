import { useFeatureFlagsContext } from '@/provider/FeatureFlags'
import { FeatureFlagCard } from './FeatureFlagCard'
import { LoadingContent } from '../LoadingContent'
import styles from './featureFlags.module.css'
import { NotData } from '../NotData'

export const FeatureFlagList = () => {
  const { featureFlags } = useFeatureFlagsContext()

  return (
    <div className={styles.list}>
      {!featureFlags.length && <NotData title="Feature flags" height="70vh" />}
      {!!featureFlags.length &&
        featureFlags?.map((featureFlag: any) => (
          <FeatureFlagCard featureFlag={featureFlag} key={featureFlag.id} />
        ))}
    </div>
  )
}
