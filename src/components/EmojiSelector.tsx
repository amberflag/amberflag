import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import EmojiPicker from 'emoji-picker-react'
import React from 'react'

export const EmojiSelector = ({
  selectEmoji,
  emojiDefault
}: {
  selectEmoji?: (name: string) => void
  emojiDefault?: string
}) => {
  const [emojiSelected, setEmojiSelected] = React.useState<string | undefined>(
    emojiDefault
  )
  const [openEmojiSelector, setOpenEmojiSelector] =
    React.useState(!emojiDefault)

  const changeEmoji = (emoji: string) => {
    selectEmoji?.(emoji)
    setEmojiSelected(emoji)
    setOpenEmojiSelector(false)
  }

  return (
    <>
      <Typography sx={{ marginTop: '1rem', marginBottom: '0.25rem' }}>
        Select a Emoji
      </Typography>
      {openEmojiSelector && (
        <EmojiPicker
          onEmojiClick={event => {
            changeEmoji(event.emoji)
          }}
        />
      )}
      {(!emojiSelected || !openEmojiSelector) && (
        <div
          onClick={() => {
            setOpenEmojiSelector(true)
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Typography style={{ fontSize: '275px' }}>{emojiSelected}</Typography>
          <Button variant="text">Change emoji</Button>
        </div>
      )}
    </>
  )
}
