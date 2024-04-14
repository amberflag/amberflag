import { FeatureFlagCard } from './FeatureFlagCard'

export const FeatureFlagList = ({
  environments,
  featureFlags,
  setChangesFeatureFlags,
  changesFeaturesFlags
}: any) => {
  return (
    <div
      style={{
        paddingInline: '0.5rem',
        marginTop: '1rem',
        marginBottom: '1rem'
      }}
    >
      {featureFlags.map((featureFlag: any, index: number) => (
        <FeatureFlagCard
          featureFlag={featureFlag}
          environments={environments}
          key={index}
          setChangesFeatureFlags={setChangesFeatureFlags}
          changesFeaturesFlags={changesFeaturesFlags}
        />
      ))}
    </div>
  )
}
