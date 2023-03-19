import React, { useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'
import { useGetSearchBook } from '@/services/my-book/query'
import GeneralLayout from '@/components/layouts/general'
import ImageText from '@/components/molecules/ImageText'
import Button from '@/components/atoms/Button'
import NoDataCard from '@/components/organisms/cards/NoDataCard'
import { ProfileUserDataModel } from '@/interfaces/profile'
import ProductCard from '@/components/molecules/ProductCard'
import Spinner from '@/components/molecules/Spinner'
import { useToast } from '@/hooks/useToast'
import { useFollowUser, useUnFollowUser } from '@/services/profile/mutation'
import { authGuardAction, selectUserPhotos } from '@/utils/common'
import { useAuth } from '@/store/useAuth'

type WriterProfileTemplateProps = {
  profile: ProfileUserDataModel | null
  onRefetchData: () => void
}

export default function WriterProfileTemplate({
  profile,
  onRefetchData,
}: WriterProfileTemplateProps) {
  const { token } = useAuth()
  const writerNoBook = profile !== null && profile.booksCount === 0
  const observer = useRef<IntersectionObserver>()
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetSearchBook({
    pageParam: 1,
    params: { limit: 10 },
    enabled: !writerNoBook,
  })
  const toast = useToast()
  const followWriter = useFollowUser()
  const unFollowWriter = useUnFollowUser()

  const lastBookElement = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasNextPage]
  )

  const handleFollowWriter = () => {
    authGuardAction(token ?? '', () => {
      if (!profile) return
      if (profile.following) {
        unFollowWriter.mutate(profile.id, {
          onSuccess() {
            toast.addToast('success', 'Penulis berhasil diunfollow.')
            onRefetchData()
          },
          onError() {
            toast.addToast('error', 'Penulis gagal diunfollow.')
          },
        })
      } else {
        followWriter.mutate(profile.id, {
          onSuccess() {
            toast.addToast('success', 'Penulis berhasil difollow.')
            onRefetchData()
          },
          onError() {
            toast.addToast('error', 'Penulis gagal difollow.')
          },
        })
      }
    })
  }

  const userAvatar = useMemo(() => {
    return selectUserPhotos('avatar', profile?.photos ?? [])
  }, [profile])

  if (!profile) return null

  return (
    <GeneralLayout>
      <section className="container py-12">
        <div className="bg-dark-300 px-6 py-8 rounded-xl">
          <div className="md:flex mb-6 md:space-x-6">
            <div className="block mx-auto w-[120px] h-[120px] bg-dark-100 rounded-full overflow-hidden mb-4">
              <Image
                priority
                src={userAvatar.length ? userAvatar : '/assets/images/logo.png'}
                alt=""
                width={120}
                height={120}
                className=""
              />
            </div>
            <div className="space-y-5 font-gotham text-center max-w-[320px] mx-auto md:flex-1 md:max-w-full md:text-left">
              <h1 className="text-gold-200 font-normal text-xl">
                {profile.fullName ?? ''}
              </h1>
              <p className="text-gold-200/70 font-light text-sm">
                {profile?.bio ?? ''}
              </p>
              <div className="flex space-x-4 items-center">
                <ImageText
                  color="gold"
                  text={`${profile.booksCount} Buku`}
                  icon="/assets/icons/icon-book.svg"
                />
                <ImageText
                  color="gold"
                  text={`${profile.followersCount} Pengikut`}
                  icon="/assets/icons/icon-user2.svg"
                />
                <ImageText
                  color="gold"
                  text={`${profile.followingsCount} Mengikuti`}
                  icon="/assets/icons/icon-user2.svg"
                />
              </div>
              <Button onClick={handleFollowWriter} isFullWidth={false}>
                {profile.following ? 'Berhenti Mengikuti' : 'Ikuti'}
              </Button>
            </div>
          </div>
          <hr className="border border-gold-300" />
          {writerNoBook && (
            <NoDataCard text="Penulis belum membuat buku apapun." />
          )}
          {!writerNoBook && isLoading && <Spinner />}
          {!writerNoBook && (
            <div className="grid gap-6 grid-cols-2 mt-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 max-w-[795px] mx-auto">
              {data?.pages.length !== 0 &&
                data?.pages.map((page, pageIndex) =>
                  page.map((book, bookIndex) => {
                    if (
                      data.pages.length === pageIndex + 1 &&
                      page.length === bookIndex + 1
                    ) {
                      return (
                        <div
                          key={`${pageIndex}-${bookIndex}`}
                          ref={lastBookElement}
                        >
                          <ProductCard book={book} contentTypeView="default" />
                        </div>
                      )
                    }
                    return (
                      <div key={`${pageIndex}-${bookIndex}`}>
                        <ProductCard book={book} contentTypeView="default" />
                      </div>
                    )
                  })
                )}
            </div>
          )}
        </div>
      </section>
    </GeneralLayout>
  )
}
