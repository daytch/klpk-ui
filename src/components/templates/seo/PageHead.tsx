import Head from 'next/head'
import React from 'react'

const APP_PACKAGE = 'com.klpk'
const APP_NAME = 'KLPK'
const BASE_URL = 'https://komunitaspatrickkellan.com'

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

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:width" content="640" />}
      {image && <meta property="og:image:height" content="442" />}

      {/* Twitter */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      {image && <meta property="twitter:image" content={image} />}

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
        </>
      )}
      {(androidUrl || iosUrl) && (
        <meta property="al:web:url" content={url} />
      )}
    </Head>
  )
}

export default PageHead
