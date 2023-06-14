import React from 'react'
import Image from 'next/image'
import Link from '@/components/atoms/Link'
import IconFacebook from '@/components/icons/IconFacebook'
import IconInstagram from '@/components/icons/IconInstagram'
import IconTiktok from '@/components/icons/IconTiktok'
import IconTwitter from '@/components/icons/IconTwitter'
import IconGooglePlay from '@/assets/icons/google-play.png'
import IconAppStore from '@/assets/icons/app-store.png'

interface SocialLinkProps {
  icon: React.ReactNode
  text: string
  link: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, text, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      className="inline-flex items-center space-x-[14px]"
      rel="noreferrer"
    >
      {icon}
      <span className="inline-block text-gold-300 text-sm font-thin font-gotham">
        {text}
      </span>
    </a>
  )
}

const Footer = () => {
  return (
    <footer className="bg-dark-200 border-t border-gold-300 pt-9 pb-36">
      <div className="container">
        <div className="flex flex-wrap justify-between lg:justify-start">
          <div className="mr-20">
            <Image
              src="/assets/images/logo.png"
              alt="KLPK"
              width={165}
              height={165}
            />
          </div>
          <div className="mr-16">
            <h2 className="font-medium text-gold-200 font-gotham mb-[18px] text-base">
              Informasi
            </h2>
            <ul className="space-y-6 ">
              <li>
                <Link
                  to="/"
                  className="font-gotham text-sm text-gold-300 leading-3 font-light"
                >
                  Tentang Aplikasi
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-gotham text-sm text-gold-300 leading-3 font-light"
                >
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-gotham text-sm text-gold-300 leading-3 font-light"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-gotham text-sm text-gold-300 leading-3 font-light"
                >
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
          <div className="mr-16">
            <h2 className="font-semibold text-gold-200 font-gotham mb-[18px] text-base">
              Ikuti Kami
            </h2>
            <ul className="space-y-6 ">
              <li>
                <SocialLink
                  text="KL-PK"
                  icon={<IconFacebook />}
                  link="https://www.facebook.com/groups/248122912848958/?ref=share&mibextid=KtfwRi"
                />
              </li>
              <li>
                <SocialLink
                  text="@kp-pk"
                  icon={<IconInstagram />}
                  link="https://www.instagram.com/patrick_kellan2/?hl=en"
                />
              </li>
              <li>
                <SocialLink
                  text="@patrick_kellan"
                  icon={<IconTiktok />}
                  link="https://www.tiktok.com/@patrick_kellan"
                />
              </li>
              <li>
                <SocialLink
                  text="PatrickKellan2"
                  icon={<IconTwitter />}
                  link="https://twitter.com/PatrickKellan2"
                />
              </li>
            </ul>
          </div>
          <div className="mr-16">
            <h2 className="font-semibold text-gold-200 font-gotham mb-[18px] text-base">
              Download App
            </h2>
            <ul className="space-y-6 ">
              <li>
                <a href="/" target="_blank">
                  <Image
                    src={IconGooglePlay}
                    width={120}
                    height={43}
                    alt="Google Play Store"
                  />
                </a>
              </li>
              <li>
                <a href="/" target="_blank">
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
        </div>
      </div>
    </footer>
  )
}

export default Footer
