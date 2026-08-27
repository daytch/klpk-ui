import React from 'react'
import Image from 'next/image'
import PageHead from '@/components/templates/seo/PageHead'
import IconGooglePlay from '@/assets/icons/google-play.png'
import IconAppStore from '@/assets/icons/app-store.png'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.komunitaspatrickkellan.klpk'
const APP_STORE_URL = 'https://apps.apple.com/fi/app/klpk/id6449801134'

// Sebelumnya file ini auto-redirect ke Play Store / App Store via window.top
// location.href. Itu bug: user yang sudah punya aplikasi KLPK terinstal
// dilempar ke store, dan kalau link dibuka dari FB IAB, app native tidak
// pernah dapat URL halaman detail. Sekarang halaman statis saja; user yang
// ingin download manual klik tombol di bawah.
export default function DownloadAppPage() {
  return (
    <>
      <PageHead
        title="Download KLPK App"
        description="Download aplikasi KLPK di Play Store atau App Store."
      />
      <div className="max-w-md px-6 mx-auto min-h-screen flex items-center justify-center flex-col">
        <h2 className="font-semibold text-gold-200 font-gotham mb-[18px] text-base">
          Download App
        </h2>
        <ul className="space-y-6">
          <li>
            <a
              rel="noreferrer"
              href={PLAY_STORE_URL}
              target="_blank"
            >
              <Image
                src={IconGooglePlay}
                width={120}
                height={43}
                alt="Google Play Store"
              />
            </a>
          </li>
          <li>
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
              <Image
                src={IconAppStore}
                width={120}
                height={43}
                alt="App Store"
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
