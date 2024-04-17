import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Switch
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import styles from './featureFlags.module.css'
import {
  useChangesFeatureFlagsContext,
  useSelectedProjectContext
} from '@/provider/Context'

export const FeatureFlagCard = ({ featureFlag, key }: any) => {
  const { setChangesFeatureFlags, changesFeaturesFlags } =
    useChangesFeatureFlagsContext()
  const { selectedProject } = useSelectedProjectContext()

  const isChecked = (environment: string) => {
    return featureFlag.activated.some(
      (environmentsActivated: string) => environment === environmentsActivated
    )
  }

  const buildEnv = (prevEnv: string[], isChecked: string, env: string) => {
    if (isChecked) {
      return [...prevEnv, env]
    }
    const indexEnv = prevEnv.indexOf(env)
    prevEnv.splice(indexEnv, 1)
    return prevEnv
  }

  const changeFeatureFlag = (event: any) => {
    if (
      changesFeaturesFlags?.find((change: any) => change.id === featureFlag.id)
    ) {
      // ya ha habido un cambio
      const indexFeature = changesFeaturesFlags?.findIndex(
        (change: any) => change.id === featureFlag.id
      )
      const newchangesFeaturesFlags = [...changesFeaturesFlags]
      newchangesFeaturesFlags[indexFeature].environments = buildEnv(
        newchangesFeaturesFlags[indexFeature]?.environments,
        event.target.checked,
        event.target.value
      )
      setChangesFeatureFlags(newchangesFeaturesFlags)
    } else {
      // no ha habido ningun cambio
      setChangesFeatureFlags([
        ...changesFeaturesFlags,
        {
          id: featureFlag.id,
          environments: buildEnv(
            featureFlag.activated,
            event.target.checked,
            event.target.value
          )
        }
      ])
    }
  }

  return (
    <Accordion id={key}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="feature flag"
      >
        {featureFlag.name}
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.environments}>
          {selectedProject?.environments?.map((environment: string) => {
            return (
              <FormControlLabel
                value={environment}
                key={`${environment}-${featureFlag.id}`}
                control={
                  <Switch
                    color="primary"
                    defaultChecked={isChecked(environment)}
                    onChange={changeFeatureFlag}
                    disabled={!selectedProject?.isAdmin}
                  />
                }
                label={environment}
                labelPlacement="start"
                className={styles.switch}
              />
            )
          })}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}
