import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { joinClass } from '@/utils/common'
import IconSearch from '@/components/icons/IconSearch'
import Link from '@/components/atoms/Link'
import { useAuth } from '@/store/useAuth'
import IconBrush from '@/components/icons/IconBrush'
import ProfileDropdown from '../dropdowns/ProfileDropdown'
import WalletDropdown from '../dropdowns/WalletDropdown'
import IconChevron from '@/components/icons/IconChevron'
import useSignalIR from '@/hooks/useSignalIR'

interface IProps {
  mode?: 'default' | 'write' | 'create'
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)

  useEffect(() => {
    setHasHydrated(true)
  }, [])

  return hasHydrated
}

const Header: React.FC<IProps> = ({ mode = 'default' }) => {
  const hasHydrated = useHasHydrated()
  const { unReadMessage, handleDisconnect } = useSignalIR()
  const [search, setSearch] = useState('')
  const { refreshToken } = useAuth()

  const showBackButton = mode === 'write' || mode === 'create'
  const isAuthenticated = useMemo(
    () => hasHydrated && !!refreshToken?.length,
    [refreshToken, hasHydrated]
  )

  const handleSearchBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search.length) return
    const Router = (await import('next/router')).default
    Router.push({
      pathname: '/story/search',
      query: {
        search,
      },
    })
  }

  return (
    <header
      className={joinClass(
        'border-b border-gold-300 z-20 h-[84px] bg-dark-400 flex items-center sticky top-0'
      )}
    >
      {showBackButton && (
        <Link
          className="lg:absolute top-1/2 lg:-translate-y-1/2 left-6 inline-flex items-center space-x-3 text-gold-200 ml-6 lg:ml-0"
          to="/"
        >
          <span className="inline-flex items-center justify-center p-2 w-6 h-6 border border-gold-100 rounded">
            <IconChevron />
          </span>
          <span>Kembali</span>
        </Link>
      )}
      {mode === 'default' && (
        <Image
          src="/assets/images/header-pattern.png"
          width={118}
          height={84}
          alt=""
          className="hidden md:block max-w-[70px] md:max-w-[90px] lg:max-w-[] h-full absolute top-0 left-0 bottom-0 z-0"
        />
      )}
      <div className="container py-[11px] relative z-10 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <Link to="/" className="mr-3 md:mr-3 xl:mr-12">
              <Image
                src="/assets/images/logo.png"
                alt="KLPK"
                width={64}
                height={62}
              />
            </Link>

            {mode === 'default' && (
              <form
                onSubmit={handleSearchBook}
                className="relative border border-[#726A64] p-2 pr-4 flex-1 lg:flex-none lg:w-80 rounded-[50px] overflow-hidden flex items-center space-x-2 mr-3"
              >
                <IconSearch />
                <input
                  className="outline-none border-none text-base bg-transparent text-gold-300 placeholder:text-gold-300 flex-1"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            )}
          </div>
          {!isAuthenticated && (
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
          )}
          {isAuthenticated && (
            <div className="flex items-center justify-end space-x-4 lg:space-x-6 flex-1">
              {mode === 'default' && (
                <>
                  <WalletDropdown />
                  <Link
                    className="inline-flex items-center text-gold-200 space-x-2"
                    to="/menulis"
                  >
                    <IconBrush />
                    <span>Menulis</span>
                  </Link>
                </>
              )}
              {mode === 'write' && (
                <Link
                  className="inline-flex items-center text-gold-200 space-x-2"
                  to="/menulis/buku"
                >
                  <IconBrush />
                  <span>Cerita Baru</span>
                </Link>
              )}
              <button className="relative w-6 h-6">
                <Image
                  src="/assets/icons/icon-notification.svg"
                  width={24}
                  height={24}
                  alt=""
                />
                {unReadMessage > 0 && (
                  <span className="inline-block w-[6px] h-[6px] bg-[#FF3535] rounded-full absolute z-[2] top-[5px] right-1 ring-1 ring-white" />
                )}
              </button>

              <ProfileDropdown onCloseSignalIR={handleDisconnect} />
            </div>
          )}
        </div>
      </div>
      {mode === 'default' && (
        <Image
          src="/assets/images/header-pattern.png"
          width={118}
          height={84}
          alt=""
          className="rotate-180 hidden md:block max-w-[90px] h-full absolute top-0 right-0 bottom-0 z-0"
        />
      )}
    </header>
  )
}

export default Header
