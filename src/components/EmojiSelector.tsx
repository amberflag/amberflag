import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import EmojiPicker from 'emoji-picker-react'
import React from 'react'
import styles from './emojiSelector.module.css'

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
      <Typography className={styles.title}>Select a Emoji</Typography>
      {openEmojiSelector && (
        <EmojiPicker
          onEmojiClick={event => {
            changeEmoji(event.emoji)
          }}
        />
      )}
      {(!emojiSelected || !openEmojiSelector) && (
        <div
          className={styles.emojiSelector}
          onClick={() => {
            setOpenEmojiSelector(true)
          }}
        >
          <Typography className={styles.emojiSeletedText}>
            {emojiSelected}
          </Typography>
          <Button variant="text">Change emoji</Button>
        </div>
      )}
    </>
  )
}
