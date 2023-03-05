import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ToastProvider } from '@/hooks/useToast'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_AUTH_CLIENT_ID } from '@/utils/constants'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient())

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
