import { useCreateEditEnvironmentOrFlagContext } from '@/provider/CreateEditEnvironmentOrFlag'
import { useFeatureFlagsContext } from '@/provider/FeatureFlags'
import { useSelectedProjectContext } from '@/provider/SelectedProject'
import { Button } from '@mui/material'
import styles from './featureFlags.module.css'

export const CreateFlagsEnvsButtons = ({ showButtons = false }) => {
  const { setEntity, setOpenDialog, entity } =
    useCreateEditEnvironmentOrFlagContext()
  const { selectedProject } = useSelectedProjectContext()
  const { featureFlags } = useFeatureFlagsContext()

  return (
    <div
      style={{
        marginTop: !showButtons ? '1rem' : undefined
      }}
      className={styles.create}
    >
      {(!selectedProject?.environments?.length || showButtons) && (
        <Button
          variant="outlined"
          onClick={() => {
            setOpenDialog(true)
            setEntity({
              ...entity,
              type: 'Environment',
              referenceDB: 'environment',
              environments: selectedProject?.environments
            })
          }}
        >
          Create Environemts
        </Button>
      )}
      {(!featureFlags?.length || showButtons) && (
        <Button
          variant="outlined"
          onClick={() => {
            setOpenDialog(true)
            setEntity({
              ...entity,
              type: 'Feature flag',
              referenceDB: 'featureflag'
            })
          }}
        >
          Create Feature Flags
        </Button>
      )}
    </div>
  )
}
