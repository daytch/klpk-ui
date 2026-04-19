import Head from 'next/head'
import React from 'react'

const APP_PACKAGE = 'com.komunitaspatrickkellan.klpk'
const APP_NAME = 'KLPK'
const BASE_URL = 'https://komunitaspatrickkellan.com'
const DEFAULT_OG_IMAGE = 'https://komunitaspatrickkellan.com/assets/images/logo.png'
const FB_APP_ID = '4071474173106193'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.komunitaspatrickkellan.klpk'
const APP_STORE_URL = 'https://apps.apple.com/fi/app/klpk/id6449801134'

type PageHeadProps = {
  title?: string
  description?: string
  image?: string
  /** Full canonical URL of the current page */
  url?: string
  /** Deep link path for the native app, e.g. "book/detail/123" */
  deepLinkPath?: string
}

const PageHead = ({
  title = 'KLPK APP',
  description = 'KLPK App, platform untuk menyalurkan ekspresi dan cerita melalui tulisan. Temukan aneka cerita seru di aplikasi KLPK. Siapapun bisa menulis di KLPK. Ayo gabung sekarang!.',
  image,
  url = `${BASE_URL}/`,
  deepLinkPath,
}: PageHeadProps) => {
  const ogImage = image || DEFAULT_OG_IMAGE
  // Custom scheme untuk FB App Links — FB handle fallback ke Play Store via al:android:package
  const androidUrl = deepLinkPath ? `klpkmobile://app/${deepLinkPath}` : undefined
  const iosUrl = deepLinkPath ? `klpkmobile://app/${deepLinkPath}` : undefined

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="csrf-token" content="8EMRLcPfuxWHXINN772pJMlICn5qiKmOPCi5a0js" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Penulis, Pembaca, Cerita, Novel, Cerpen, Roman, Ebook, Buku, KLPK, Komunitas" />
      <meta name="author" content="KLPK" />
      <meta property="fb:app_id" content={FB_APP_ID} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="640" />
      <meta property="og:image:height" content="442" />

      {/* Twitter */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Facebook App Links — tells FB IAB to open native app instead of WebView */}
      {androidUrl && (
        <>
          <meta property="al:android:url" content={androidUrl} />
          <meta property="al:android:app_name" content={APP_NAME} />
          <meta property="al:android:package" content={APP_PACKAGE} />
        </>
      )}
      {iosUrl && (
        <>
          <meta property="al:ios:url" content={iosUrl} />
          <meta property="al:ios:app_name" content={APP_NAME} />
          <meta property="al:ios:app_store_id" content="6449801134" />
        </>
      )}
      {(androidUrl || iosUrl) && (
        <meta property="al:web:url" content={`${BASE_URL}/download-app`} />
      )}

      {/* Script untuk handle deep link dari FB IAB */}
      {(androidUrl || iosUrl) && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const ua = navigator.userAgent || '';
                const isFBIAB = /FBAN|FBAV/.test(ua);
                const isAndroid = /android/i.test(ua);
                const isIOS = /iphone|ipad|ipod/i.test(ua);
                
                if (isFBIAB) {
                  // Delay untuk beri waktu FB IAB handle deep link dulu
                  setTimeout(function() {
                    // Kalau masih di halaman ini (deep link fail), redirect ke store
                    if (isAndroid) {
                      window.top.location.href = '${PLAY_STORE_URL}';
                    } else if (isIOS) {
                      window.top.location.href = '${APP_STORE_URL}';
                    }
                  }, 2500);
                }
              })();
            `,
          }}
        />
      )}
    </Head>
  )
}

export default PageHead
