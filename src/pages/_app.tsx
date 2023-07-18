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
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-SPG5TM1NHZ"
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-SPG5TM1NHZ');
        `}
      </Script>
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
    </>
  )
}
