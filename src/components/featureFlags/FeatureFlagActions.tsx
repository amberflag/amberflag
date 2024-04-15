import { useChangesFeatureFlagsContext } from '@/provider/ChangesFeatureFlag'
import { createClient } from '@/utils/supabase/client'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'
import styles from './featureFlags.module.css'
import { useFeatureFlagsContext } from '@/provider/FeatureFlags'

export const FeatureFlagActions = () => {
  const router = useRouter()
  const { changesFeaturesFlags, setChangesFeatureFlags } =
    useChangesFeatureFlagsContext()
  const supabaseClient = createClient()
  const { featureFlags } = useFeatureFlagsContext()

  const save = async () => {
    for (let change of changesFeaturesFlags) {
      await supabaseClient
        .from('featureFlags')
        .update({ activated: change.environments || [] })
        .eq('id', change?.id)
    }
    setChangesFeatureFlags([])
    router.refresh()
  }

  const discard = () => {
    setChangesFeatureFlags([])
    window.location.reload()
  }

  if (!featureFlags?.length) {
    return null
  }

  return (
    <span className={styles.actions}>
      <Button color="error" onClick={discard}>
        Discard
      </Button>
      <Button variant="contained" onClick={save}>
        Save
      </Button>
    </span>
  )
}
