'use client'

import { SessionProvider } from 'next-auth/react'
import './globals.css'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <html lang="en">
        <body className={inter.className}>
          <SessionProvider refetchOnWindowFocus={false}>
          {children}
          </SessionProvider>
        </body>
    </html>
    </QueryClientProvider>
  )
}
