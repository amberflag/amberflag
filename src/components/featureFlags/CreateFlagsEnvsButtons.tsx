import { Button } from '@mui/material'
import styles from './featureFlags.module.css'
import {
  useCreateEditEnvironmentOrFlagContext,
  useFeatureFlagsContext,
  useSelectedProjectContext
} from '@/provider/Context'

export const CreateFlagsEnvsButtons = ({ showButtons = false }) => {
  const { setEntity, setOpenDialogEntity, entity } =
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
            setOpenDialogEntity(true)
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
            setOpenDialogEntity(true)
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
