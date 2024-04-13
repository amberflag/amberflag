import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
// import '@fontsource-variable/lexend'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import theme from '@/theme'
import { ThemeProvider } from '@mui/material/styles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amber Flag',
  description: 'Management of feature flags'
}

export const viewport: Viewport = {
  themeColor: '#ffda45'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ key: 'css' }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
