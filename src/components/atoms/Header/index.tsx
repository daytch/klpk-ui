import { joinClass } from '@/utils/common'
import Image from 'next/image'
import React from 'react'
import Link from '../Link'

interface IProps {
  mode?: 'normal' | 'write' | 'create'
}

const Header: React.FC<IProps> = ({ mode = 'normal' }) => {
  return (
    <header
      className={joinClass(
        'py-[11px] border-b border-gold-300 relative h-[84px] bg-dark-400 flex items-center'
      )}
    >
      {mode ? (
        <Image
          src="/assets/images/header-pattern.png"
          width={118}
          height={84}
          alt=""
        />
      ) : null}
      <div className="container">
        <div className="flex items-center">
          <Link to="/" className="mr-6 md:mr-12">
            <Image
              src="/assets/images/logo.png"
              alt="KLPK"
              width={64}
              height={62}
            />
          </Link>
          {mode === 'normal' ? (
            <div className="relative border border-[#726A64]"></div>
          ) : null}
        </div>
      </div>
      {mode ? (
        <Image
          src="/assets/images/header-pattern.png"
          width={118}
          height={84}
          alt=""
          className="rotate-180"
        />
      ) : null}
    </header>
  )
}

export default Header
