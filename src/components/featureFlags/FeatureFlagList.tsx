import { FeatureFlagCard } from './FeatureFlagCard'
import { LoadingContent } from '../LoadingContent'
import styles from './featureFlags.module.css'
import { NotData } from '../NotData'
import { useFeatureFlagsContext } from '@/provider/Context'
import { FeatureFlags } from '@/interfaces/featureFlags'

export const FeatureFlagList = () => {
  const { featureFlags } = useFeatureFlagsContext()

  return (
    <div className={styles.list}>
      {!featureFlags?.length && <NotData title="Feature flags" />}
      {!!featureFlags?.length &&
        featureFlags?.map((featureFlag: FeatureFlags) => (
          <FeatureFlagCard
            featureFlag={featureFlag}
            key={featureFlag?.id?.toString()}
          />
        ))}
    </div>
  )
}
