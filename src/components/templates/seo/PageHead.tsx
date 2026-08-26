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

  // Facebook App Links (al:* meta) dipakai oleh FB crawler untuk render
  // smart banner / app preview. Di dalam FB IAB sendiri, FB membaca meta
  // ini untuk menawarkan "Open in app". TIDAK melakukan redirect paksa.
  const androidUrl = deepLinkPath ? `klpkmobile://app/${deepLinkPath}` : undefined
  const iosUrl = deepLinkPath ? `klpkmobile://app/${deepLinkPath}` : undefined

  // Untuk trigger intent:// di dalam FB IAB, kita suntik script ringan
  // yang minta user "tap untuk buka di app". Tidak auto-redirect.
  // Sebelumnya file ini punya script `setTimeout 2.5 detik -> Play Store`
  // yang menyebabkan bug: app native tidak sempat terbuka, user dilempar
  // ke Play Store walau app sudah terinstal.
  const openAppScript = deepLinkPath
    ? `
      (function() {
        // expose tombol "Buka di Aplikasi" supaya user bisa tap manual
        // kalau FB IAB tidak otomatis membuka app.
        var path = ${JSON.stringify(deepLinkPath)};
        window.__openKlpkApp = function() {
          var intentUrl =
            'intent://komunitaspatrickkellan.com/' + path +
            '#Intent;scheme=https;package=${APP_PACKAGE};' +
            'S.browser_fallback_url=' + encodeURIComponent('${PLAY_STORE_URL}') + ';end';
          var iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = intentUrl;
          document.body.appendChild(iframe);
          setTimeout(function() {
            if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
          }, 1500);
          setTimeout(function() {
            if (!document.hidden) window.location.href = '${PLAY_STORE_URL}';
          }, 2500);
        };
      })();
    `
    : ''

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

      {/* Facebook App Links */}
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

      {/* Script: expose window.__openKlpkApp() untuk dipanggil dari tombol.
          TIDAK auto-redirect (perbaikan bug: dulu auto-redirect ke Play Store). */}
      {deepLinkPath && (
        <script
          dangerouslySetInnerHTML={{ __html: openAppScript }}
        />
      )}
    </Head>
  )
}

export default PageHead
