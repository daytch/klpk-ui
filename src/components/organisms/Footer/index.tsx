import React from 'react'
import Image from 'next/image'
import Link from '@/components/atoms/Link'
import IconFacebook from '@/components/icons/IconFacebook'
import IconInstagram from '@/components/icons/IconInstagram'

interface SocialLinkProps {
  icon: React.ReactNode
  text: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, text }) => {
  return (
    <Link to="/" className="inline-flex items-center space-x-[14px]">
      {icon}
      <span className="inline-block text-gold-300 text-sm font-thin font-gotham">
        {text}
      </span>
    </Link>
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
              <li>
                <Link
                  to="/"
                  className="font-gotham text-sm text-gold-300 leading-3 font-light"
                >
                  Blog & Event
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
                <SocialLink text="KL-PK" icon={<IconFacebook />} />
              </li>
              <li>
                <SocialLink text="@kp-pk" icon={<IconInstagram />} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
