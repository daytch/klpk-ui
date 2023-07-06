import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Button from '@/components/atoms/Button'
import IconArrow from '@/components/icons/IconArrow'
import IconVerified from '@/components/icons/IconVerified'
import IconUser from '@/components/icons/IconUser'
import IconUserTag from '@/components/icons/IconUserTag'
import IconUsers from '@/components/icons/IconUsers'
import ButtonTab from '@/components/molecules/ButtonTab'
import VerifProfileForm from '@/components/organisms/forms/VerifProfile'
import { ProfileUserDataModel } from '@/interfaces/profile'
import {
  useUploadUserAvatar,
  useUploadUserCover,
} from '@/services/profile/mutation'
import { useToast } from '@/hooks/useToast'
import IconUpload from '@/components/icons/IconUpload'
import NoImage from '@/assets/icons/no-avatar.svg'
import { MAX_FILE_SIZE } from '@/utils/constants'

const Header = dynamic(() => import('@/components/organisms/Header'), {
  ssr: false,
})

const Footer = dynamic(() => import('src/components/organisms/Footer'), {
  ssr: false,
})

const profileTabConfig = [
  {
    text: 'Profile',
    icon: IconUser,
    url: '/profile',
  },
  {
    text: 'Mengikuti',
    icon: IconUserTag,
    url: '/profile/following',
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
  const { pathname, push, reload } = useRouter()
  const [viewMode, setViewMode] = useState<'default' | 'verif-profile'>(
    'default'
  )
  const [previewCover, setPreviewCover] = useState('')
  const [previewAvatar, setPreviewAvatar] = useState('')
  const uploadCover = useUploadUserCover()
  const uploadAvatar = useUploadUserAvatar()
  const toast = useToast()

  const userCoverImage = useMemo(() => {
    if (!profile?.photos || !profile?.photos?.length) return ''
    if (previewCover?.length) return previewCover
    const cover = profile?.photos?.find((photo) => photo?.type === 'cover')
    return cover?.url ?? ''
  }, [profile, previewCover])

  const userAvatarImage = useMemo(() => {
    if (!profile?.photos || !profile?.photos.length) return NoImage
    if (previewAvatar?.length) return previewAvatar
    const cover = profile?.photos.find((photo) => photo?.type === 'avatar')
    return cover?.url ?? NoImage
  }, [profile, previewAvatar])

  const handleUpdateCover = (formData: FormData) => {
    uploadCover.mutate(formData, {
      onSuccess() {
        reload()
        toast.addToast('success', 'Berhasil menyimpan cover.')
      },
      onError() {
        setPreviewCover('')
        toast.addToast('error', 'Gagal menyimpan cover. Coba lagi.')
      },
    })
  }

  const handleUpdateAvatar = (formData: FormData) => {
    uploadAvatar.mutate(formData, {
      onSuccess() {
        reload()
        toast.addToast('success', 'Berhasil menyimpan cover.')
      },
      onError() {
        setPreviewAvatar('')
        toast.addToast('error', 'Gagal menyimpan cover. Coba lagi.')
      },
    })
  }

  const handleUploadCover = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const formData = new FormData()
    if (e.target.files && e.target.files.length) {
      const fileSize = e?.target?.files?.[0]?.size
      const isAllowedToUpload = fileSize < MAX_FILE_SIZE
      if (!isAllowedToUpload) {
        return toast.addToast(
          'error',
          'File terlalu besar. Maksimal ukuran file hanya 2MB.'
        )
      }
      formData.append('File', e.target.files[0])
      if (type === 'cover') {
        handleUpdateCover(formData)
      } else {
        handleUpdateAvatar(formData)
      }
    }
  }

  return (
    <>
      <Header />
      <main className="px-4">
        <section className="container mt-12 mb-20 bg-dark-300">
          <div className="rounded-xl overflow-hidden">
            <div className="relative pb-28">
              <div className="w-full h-[145px] relative">
                {userCoverImage?.length > 0 && (
                  <Image
                    src={userCoverImage}
                    alt="profile cover"
                    width={145}
                    height={145}
                    priority
                    className="w-full h-full object-cover"
                  />
                )}
                {!previewCover?.length && !userCoverImage?.length && (
                  <p className="absolute left-1/2 -translate-x-1/2 my-4 text-gold-200 text-base font-normal">
                    Add cover photo
                  </p>
                )}
                <label className="absolute right-[6px] bottom-[8px] inline-flex items-center bg-dark-200 text-gold-100 border border-gold-100 py-2 px-3 rounded-[50px] text-xs leading-3 space-x-1 font-gotham font-light cursor-pointer">
                  <span>Ganti Background</span> <IconArrow />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleUploadCover(e, 'cover')}
                    onClick={(e: any) => {
                      e.target.value = null
                    }}
                  />
                </label>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-[90px] flex flex-col justify-center items-center">
                <div className="relative group">
                  <Image
                    src={userAvatarImage}
                    width={90}
                    height={90}
                    alt="user avatar"
                    className="w-[90px] h-[90px] rounded-full object-cover"
                    priority
                    style={{
                      imageRendering: 'pixelated',
                    }}
                    onClick={(e: any) => {
                      e.target.value = null
                    }}
                  />
                  <label className="absolute top-0 right-0 bottom-0 left-0 inline-flex items-center justify-center bg-slate-400/80 rounded-full cursor-pointer opacity-0 group-hover:opacity-100">
                    <input
                      type="file"
                      onChange={(e) => handleUploadCover(e, 'avatar')}
                      className="hidden"
                    />
                    <IconUpload />
                  </label>
                </div>
                <div className="text-center font-gotham">
                  <h3 className="text-gold-200 text-2xl font-bold leading-6 space-x-[6px] mt-[22px] mb-2 inline-flex items-center">
                    <span>{profile?.fullName ?? ''}</span>
                    {profile?.verified && <IconVerified />}
                  </h3>
                  <p className="text-kplkWhite text-xs font-thin">
                    {profile?.username ?? ''}
                  </p>
                  {viewMode === 'default' && !profile?.verified && (
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
                  profile={profile}
                  onSuccessVerifProfile={() => {
                    setViewMode('default')
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
