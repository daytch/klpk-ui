import React from 'react'
import Image from 'next/image'
import { joinClass } from '@/utils/common'
import IconSearch from '@/components/icons/IconSearch'
import Link from '@/components/atoms/Link'

interface IProps {
  mode?: 'normal' | 'write' | 'create'
}

const Header: React.FC<IProps> = ({ mode = 'normal' }) => {
  return (
    <header
      className={joinClass(
        'border-b border-gold-300 relative h-[84px] bg-dark-400 flex items-center'
      )}
    >
      {mode === 'normal' && (
        <Image
          src="/assets/images/header-pattern.png"
          width={118}
          height={84}
          alt=""
          className="max-w-[70px] md:max-w-[90px] lg:max-w-[] h-full absolute top-0 left-0 bottom-0 z-0"
        />
      )}
      <div className="container py-[11px] relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <Link to="/" className="mr-6 md:mr-12">
              <Image
                src="/assets/images/logo.png"
                alt="KLPK"
                width={64}
                height={62}
              />
            </Link>
            {mode === 'normal' && (
              <div className="relative border border-[#726A64] p-2 pr-4 flex-1 lg:flex-none lg:w-80 rounded-[50px] overflow-hidden flex items-center space-x-2">
                <IconSearch />
                <input
                  className="outline-none border-none text-base bg-transparent text-gold-300 placeholder:text-gold-300 flex-1"
                  placeholder="Search"
                />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/auth/login"
              className="ring-1 ring-gold-200 text-gold-200 py-2 px-[18px] rounded-lg"
            >
              Masuk
            </Link>
            <Link
              to="/auth/register"
              className="bg-gold-200 ring-1 ring-gold-200 py-2 px-[18px] rounded-lg text-dark-300"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
      {mode === 'normal' && (
        <Image
          src="/assets/images/header-pattern.png"
          width={118}
          height={84}
          alt=""
          className="rotate-180 max-w-[90px] h-full absolute top-0 right-0 bottom-0 z-0"
        />
      )}
    </header>
  )
}

export default Header
