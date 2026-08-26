/**
 * Helper untuk membuka link di aplikasi native Android / iOS.
 *
 * Tujuan utama: memotong Facebook / Instagram / Twitter In-App Browser,
 * supaya user yang sudah punya aplikasi KLPK terinstal langsung dilempar
 * ke aplikasi (bukan ke Play Store / stay di WebView).
 *
 * Strategi:
 *  - Android: pakai "intent://" URI dengan S.browser_fallback_url ke Play Store.
 *             Intent di-load via iframe tersembunyi karena beberapa WebView
 *             (FB/IG) mengabaikan top-level navigation ke intent://.
 *  - iOS:    karena tidak ada konsep intent://, arahkan ke App Store.
 *  - Browser normal (Chrome/Safari di Android/iOS): tidak dipaksa redirect,
 *             biarkan stay di web. Universal Link sudah di-handle oleh
 *             AndroidManifest autoVerify dan App Links metadata.
 *
 * Anti-race: kalau user tap tombol manual / browser navigasi, fallback
 * Play Store dibatalkan via window.__openKlpkAppAborted flag.
 */

const PACKAGE_NAME = 'com.komunitaspatrickkellan.klpk'
const HOST = 'komunitaspatrickkellan.com'

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=' + PACKAGE_NAME

export const APP_STORE_URL =
  'https://apps.apple.com/fi/app/klpk/id6449801134'

function isAndroid(): boolean {
  if (typeof navigator === 'undefined') return false
  return /android/i.test(navigator.userAgent || '')
}

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/i.test(navigator.userAgent || '')
}

/**
 * Buka aplikasi native untuk path tertentu (mis. "book/detail/abc-123").
 * Aman dipanggil dari event handler React atau useEffect.
 */
export function openInApp(pathWithQuery: string): void {
  if (typeof window === 'undefined') return

  // Reset flag (kalau dipanggil ulang dari tap manual).
  ;(window as any).__openKlpkAppAborted = false

  const fullPath = pathWithQuery.startsWith('/')
    ? pathWithQuery
    : '/' + pathWithQuery

  if (isIOS()) {
    window.location.href = APP_STORE_URL
    return
  }

  if (isAndroid()) {
    const intentUrl =
      'intent://' + HOST + fullPath +
      '#Intent;scheme=https;package=' + PACKAGE_NAME +
      ';S.browser_fallback_url=' + encodeURIComponent(PLAY_STORE_URL) +
      ';end'

    // Trik iframe: WebView (FB/IG) sering mengabaikan top-level navigation
    // ke intent://, tapi tetap memproses intent yang dimuat via iframe.
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.src = intentUrl
    document.body.appendChild(iframe)

    window.setTimeout(() => {
      if (iframe.parentNode) iframe.parentNode.removeChild(iframe)
    }, 1500)

    // Fallback ke Play Store HANYA kalau app tidak membuka (user masih
    // di halaman ini) DAN user belum tap banner manual (flag aborted).
    window.setTimeout(() => {
      if ((window as any).__openKlpkAppAborted) return
      if (!document.hidden) {
        window.location.href = PLAY_STORE_URL
      }
    }, 2500)

    return
  }

  // Desktop / browser normal: tetap di web.
  window.location.href = 'https://' + HOST + fullPath
}

/**
 * Versi "diam-diam": auto-redirect HANYA kalau user di in-app browser
 * (FB/IG/Line/Twitter). Cocok untuk useEffect halaman detail buku.
 *
 * - Chrome / Safari biasa: no-op (stay di web, App Links autoVerify
 *   sudah handle).
 * - FB/IG in-app browser: lempar ke app native via intent:// iframe.
 */
export function autoOpenInAppIfEmbedded(pathWithQuery: string): void {
  if (typeof window === 'undefined') return
  const ua = navigator.userAgent || ''
  const inAppBrowser = /FBAN|FBAV|Instagram|Line\/|Twitter|Telegram/i.test(ua)
  if (!inAppBrowser) return
  openInApp(pathWithQuery)
}

/**
 * Dipanggil dari tombol "Buka di App" sebagai fallback kalau auto-redirect
 * gagal. Set flag supaya fallback Play Store (kalau ada) tidak double-fire.
 */
export function openInAppManually(pathWithQuery: string): void {
  if (typeof window === 'undefined') return
  ;(window as any).__openKlpkAppAborted = true
  openInApp(pathWithQuery)
}
