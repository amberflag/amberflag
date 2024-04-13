'use client'
import { Lexend } from 'next/font/google'
import { createTheme } from '@mui/material/styles'

const lexend = Lexend({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const theme = createTheme({
  typography: {
    fontFamily: lexend.style.fontFamily
  }
})

export default theme
