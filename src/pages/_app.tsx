import React from 'react'
import { QueryClientProvider, Hydrate } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { GoogleOAuthProvider } from '@react-oauth/google'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ToastProvider } from '@/hooks/useToast'
import { GOOGLE_AUTH_CLIENT_ID } from '@/utils/constants'
import { queryClient } from '@/utils/react-query'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider attribute="class">
          <ToastProvider>
            <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID!}>
              <Component {...pageProps} />
            </GoogleOAuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
