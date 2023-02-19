import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '@/components/atoms/Button'
import IconArrow from '@/components/icons/IconArrow'
import IconVerified from '@/components/icons/IconVerified'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import IconUser from '@/components/icons/IconUser'
import IconUserTag from '@/components/icons/IconUserTag'
import IconUsers from '@/components/icons/IconUsers'
import ButtonTab from '@/components/molecules/ButtonTab'
import VerifProfileForm from '@/components/organisms/forms/VerifProfile'
import { ProfileUserDataModel } from '@/interfaces/profile'

const profileTabConfig = [
  {
    text: 'Profile',
    icon: IconUser,
    url: '/profile',
  },
  {
    text: 'Mengikuti',
    icon: IconUserTag,
    url: '/profile/follow',
  },
  {
    text: 'Pengikut',
    icon: IconUsers,
    url: '/profile/followers',
  },
]

type ProfileLayoutProps = {
  children: React.ReactNode
  profile?: ProfileUserDataModel
}

export default function ProfileLayout({
  profile,
  children,
}: ProfileLayoutProps) {
  const { pathname, push } = useRouter()
  const [isVerifiedUser, setIsVerifiedUser] = useState(false)
  const [viewMode, setViewMode] = useState<'default' | 'verif-profile'>(
    'default'
  )

  return (
    <>
      <Header />
      <main className="px-4">
        <section className="container mt-12 mb-20 bg-dark-300">
          <div className="rounded-xl overflow-hidden">
            <div className="relative pb-28">
              <div className="w-full h-[145px] relative">
                <Image
                  src="https://picsum.photos/id/90/949/145"
                  alt="profile cover"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  className="absolute right-[6px] bottom-[8px] inline-flex items-center bg-dark-200 text-gold-100 border border-gold-100 py-2 px-3 rounded-[50px] text-xs leading-3 space-x-1 font-gotham font-light"
                >
                  <span>Ganti Background</span> <IconArrow />
                </button>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[90px] flex flex-col justify-center items-center">
                <Image
                  src="https://picsum.photos/90/90"
                  width={90}
                  height={90}
                  alt=""
                  className=" w-[90px] h-[90px] rounded-full"
                />
                <div className="text-center font-gotham">
                  <h3 className="text-gold-200 text-2xl font-bold leading-6 space-x-[6px] mt-[22px] mb-2 inline-flex items-center">
                    <span>{profile?.fullName ?? ''}</span>
                    {profile?.verified && <IconVerified />}
                  </h3>
                  <p className="text-kplkWhite text-xs font-thin">
                    {profile?.username ?? ''}
                  </p>
                  {!isVerifiedUser && viewMode === 'default' && (
                    <Button
                      type="button"
                      onClick={() => setViewMode('verif-profile')}
                      variant="outlined"
                      className="py-2 px-[18px] font-gotham text-sm font-thin mt-3"
                    >
                      Aktifkan Verified
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="pb-9 mt-20 max-w-[526px] mx-auto">
              {viewMode === 'default' && (
                <div className="border-b border-gold-300 pb-2 flex justify-between mb-6">
                  {profileTabConfig.map((config, index) => (
                    <ButtonTab
                      text={config.text}
                      icon={
                        <config.icon
                          color={
                            config.url === pathname ? '#D6B16D' : '#726A64'
                          }
                        />
                      }
                      key={index}
                      onClick={() =>
                        push(config.url, undefined, { scroll: false })
                      }
                      isActive={config.url === pathname}
                    />
                  ))}
                </div>
              )}
              {viewMode === 'verif-profile' && (
                <div className="border-b border-gold-300 pb-3 flex justify-center mb-6 relative">
                  <Button
                    onClick={() => setViewMode('default')}
                    variant="outlined"
                    className="space-x-1 py-1 px-2 absolute left-0 leading-3 ring-gold-100 font-gotham font-thin"
                    isFullWidth={false}
                  >
                    <IconArrow className="rotate-180" />
                    <span>Back</span>
                  </Button>
                  <div className="inline-flex items-center text-gold-200 text-xs font-light space-x-3">
                    <IconVerified color="#D6B16D" />
                    <p>Step Verifikasi </p>
                  </div>
                </div>
              )}
              {viewMode === 'verif-profile' && (
                <VerifProfileForm
                  onSuccessVerifProfile={() => {
                    setViewMode('default')
                    setIsVerifiedUser(true)
                  }}
                />
              )}
              {viewMode === 'default' && children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
