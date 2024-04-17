import { Button } from '@mui/material'
import styles from './featureFlags.module.css'
import {
  Entity,
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
      {(!selectedProject?.environments?.length || showButtons) &&
        selectedProject?.isAdmin && (
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDialogEntity?.(true)
              setEntity?.({
                ...entity,
                type: 'Environment',
                referenceDB: 'environment',
                environments: selectedProject?.environments
              } as Entity)
            }}
          >
            Create Environemts
          </Button>
        )}
      {(!featureFlags?.length || showButtons) && selectedProject?.isAdmin && (
        <Button
          variant="outlined"
          onClick={() => {
            setOpenDialogEntity?.(true)
            setEntity?.({
              ...entity,
              type: 'Feature flag',
              referenceDB: 'featureflag'
            } as Entity)
          }}
        >
          Create Feature Flags
        </Button>
      )}
    </div>
  )
}
