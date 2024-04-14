import Button from '@mui/material/Button'

export const FeatureFlagActions = ({ save, discard }: any) => {
  return (
    <span
      style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'end'
      }}
    >
      <Button color="error" onClick={discard}>
        Discard
      </Button>
      <Button variant="contained" onClick={save}>
        Save
      </Button>
    </span>
  )
}
