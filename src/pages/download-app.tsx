import React from 'react'
import Image from 'next/image'
import PageHead from '@/components/templates/seo/PageHead'
import IconGooglePlay from '@/assets/icons/google-play.png'
import IconAppStore from '@/assets/icons/app-store.png'

export default function DownloadAppPage() {
  return (
    <>
      <PageHead />
      <div className="max-w-md px-6 mx-auto min-h-screen flex items-center justify-center flex-col">
        <h2 className="font-semibold text-gold-200 font-gotham mb-[18px] text-base">
          Download App
        </h2>
        <ul className="space-y-6 ">
          <li>
            <a
              rel="noreferrer"
              href="https://play.google.com/store/apps/details?id=com.komunitaspatrickkellan.klpk"
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
            <a href="#" target="_blank">
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
