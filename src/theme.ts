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
  },
  palette: {
    primary: {
      main: '#373e41'
    },
    secondary: {
      main: '#F9F6EE'
    }
  }
})

export default theme
