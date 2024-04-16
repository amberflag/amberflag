import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import theme from '@/theme'
import { ThemeProvider } from '@mui/material/styles'
import { ContextProvider } from '@/provider/Context'
import { Invitations } from '@/components/Invitations/Invitations'

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
        <ContextProvider>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <ThemeProvider theme={theme}>
              <Invitations>{children}</Invitations>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ContextProvider>
      </body>
    </html>
  )
}
