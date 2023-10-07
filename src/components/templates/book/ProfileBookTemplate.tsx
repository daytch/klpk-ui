import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useToast } from '@/hooks/useToast'
import { useAuth } from '@/store/useAuth'
import { useSubsribeBook, useUnSubscribeBook } from '@/services/book/mutation'
import Link from '@/components/atoms/Link'
import Footer from '@/components/organisms/Footer'
import IconStar from '@/components/icons/IconStar'
import ImageText from '@/components/molecules/ImageText'
import Button from '@/components/atoms/Button'
import ChapterCard from '@/components/organisms/cards/ChapterCard'
import { PublicBookDataModel } from '@/interfaces/book'
import Header from '@/components/organisms/Header'
import { authGuardAction, formatDate, sanitizeHTML } from '@/utils/common'
import IconNoImage from '@/assets/icons/no-image.svg'
import IconCoin from '@/components/icons/IconCoin'

type ProfileBookTemplateProps = {
  book?: PublicBookDataModel
  onRefetchData: () => void
}

export default function ProfileBookTemplate({
  book,
  onRefetchData,
}: ProfileBookTemplateProps) {
  const [cleanSynopsis, setCleanSynopsis] = useState('')
  const { query, push } = useRouter()
  const { token } = useAuth()
  const subscribeBook = useSubsribeBook()
  const unSubscribeBook = useUnSubscribeBook()
  const toast = useToast()
  const noAvailableCoverImage = !book?.cover?.length

  const createCleanHTML = async (content: string) => {
    const cleanHtml = await sanitizeHTML(content)
    setCleanSynopsis(cleanHtml)
  }

  useEffect(() => {
    createCleanHTML(book?.synopsis ?? '')
  }, [book?.synopsis])

  useEffect(() => {
    if (typeof window === undefined) return
    document.body.classList.add('bg-none')

    return () => document.body.classList.remove('bg-none')
  }, [])

  const handleStartReading = () => {
    if (!book?.chapters.length) return
    authGuardAction(token, () => {
      push({
        pathname: '/book/read/[bookId]/[chapterId]',
        query: {
          bookId: query.bookId,
          chapterId: book.chapters[0].id,
        },
      })
    })
  }

  const handleSelectChapter = (
    type: 'synopsis' | 'chapter',
    chapterId?: string
  ) => {
    if (type === 'synopsis') {
      push({
        pathname: '/book/detail/[bookId]',
        query: {
          bookId: query?.bookId,
        },
      })
      return
    }
    authGuardAction(token, () => {
      push({
        pathname: '/book/read/[bookId]/[chapterId]',
        query: {
          bookId: query.bookId,
          chapterId: chapterId ?? '',
        },
      })
    })
  }

  const handleSubscribeBook = () => {
    authGuardAction(token, () => {
      if (book?.subscribed) {
        unSubscribeBook.mutate(String(query?.bookId ?? ''), {
          onSuccess() {
            onRefetchData()
            toast.addToast('success', 'Berhasil unsubscribe buku.')
          },
          onError() {
            toast.addToast('error', 'Gagal unsubscribe buku.')
          },
        })
      } else {
        subscribeBook.mutate(String(query?.bookId ?? ''), {
          onSuccess() {
            onRefetchData()
            toast.addToast('success', 'Berhasil subscribe buku.')
          },
          onError() {
            toast.addToast('error', 'Gagal subscribe buku.')
          },
        })
      }
    })
  }

  if (!book) return null

  return (
    <Fragment>
      <Header />
      {/* hero */}
      <section className="pb-10 pt-8 relative">
        <Image
          src="/assets/images/dummy/dummy-hero-profile-book.jpg"
          alt=""
          fill
          priority
          className="absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover"
        />
        <div
          className="absolute top-0 left-0 bottom-0 right-0"
          style={{
            background:
              'linear-gradient(0deg, #0D0E10 4.17%, rgba(13, 14, 16, 0.4) 100%)',
          }}
        />

        <div className="w-full max-w-[550px] mx-auto px-4 lg:flex space-y-4 lg:space-y-0 lg:space-x-[48px] lg:justify-between">
          <div className="relative mx-auto lg:mx-0 w-[138px] h-full aspect-[5/7] aspect-5-7 rounded-lg overflow-hidden">
            <div className="bg-[#f9f7efe6] inline-flex items-center space-x-[2px] p-[5px] rounded-lg absolute top-2 left-2 z-[2]">
              <IconStar />
              <span className="font-gotham text-sm font-light leading-3 text-gold-100">
                {(book?.rating ?? 0).toFixed(1)}
              </span>
            </div>
            <div className="w-full h-full bg-dark-100 relative">
              {noAvailableCoverImage ? (
                <Image
                  src={IconNoImage}
                  width={68}
                  height={68}
                  alt={book?.title ?? ''}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    filter:
                      'invert(88%) sepia(99%) saturate(3360%) hue-rotate(182deg) brightness(122%) contrast(91%)',
                  }}
                />
              ) : (
                <Image
                  src={book?.cover}
                  fill
                  alt={book?.title ?? ''}
                  className="object-cover"
                />
              )}
            </div>
          </div>
          <div className="relative z-10 font-gotham text-kplkWhite flex flex-col justify-center overflow-hidden flex-1">
            <h2 className="text-2xl font-bold mb-1 leading-6 w-full whitespace-nowrap text-ellipsis overflow-hidden">
              {book?.title ?? ''}
            </h2>
            <Link
              className="font-extralight text-sm mb-6"
              to={`/profile/penulis/${book?.writer?.userId ?? ''}`}
            >
              {book?.writer?.fullName ?? ''}
            </Link>
            <div className="flex items-center flex-wrap space-x-4 mb-4">
              <ImageText
                text={`${book?.readersCount ?? 0} Dibaca`}
                icon="/assets/icons/icon-eye.svg"
              />
              <ImageText
                text={`${book?.chapters.length ?? 0} Bab`}
                icon="/assets/icons/icon-book.svg"
              />
              <ImageText
                text={`${book?.subscribersCount ?? 0} Berlangganan`}
                icon="/assets/icons/icon-user2.svg"
              />
            </div>
            <p className="text-base text-gold-200 font-bold mb-6 leading-4 flex items-center space-x-1">
              <IconCoin />
              <span className="inline-block">{book?.price || 0} Koin</span>
            </p>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleStartReading}
                variant="primary"
                isFullWidth={false}
              >
                Mulai Baca
              </Button>
              <Button
                onClick={handleSubscribeBook}
                variant="primary"
                isFullWidth={false}
              >
                {book?.subscribed ? 'Unsubscribe' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-100 pt-12 pb-24 unselectable">
        <div className="container">
          <div className="lg:flex justify-between space-y-12 lg:space-y-0 lg:space-x-12">
            <div className="flex-1">
              <h3 className="font-gotham font-bold text-gold-200 text-2xl leading-6 mb-6">
                Sinopsis
              </h3>
              <div
                className="font-gotham text-kplkWhite text-sm font-light mb-16"
                dangerouslySetInnerHTML={{
                  __html: cleanSynopsis,
                }}
              />

              <hr className="border-gold-300 mb-4" />
              <div className="flex items-center flex-wrap space-x-10">
                <div className="flex-1">
                  <ImageText
                    type="synopsis"
                    text="Tanggal Terbit"
                    description={
                      book?.approvalDate && book?.approvalDate?.length > 0
                        ? formatDate(book.approvalDate, 'DD MMMM YYYY')
                        : 'Belum Diverifikasi Admin'
                    }
                    icon="/assets/icons/icon-calendar.svg"
                  />
                </div>
                <div className="flex-1">
                  <ImageText
                    type="synopsis"
                    text="Genre"
                    description={book?.category?.name ?? '-'}
                    icon="/assets/icons/icon-category.svg"
                  />
                </div>
                <div className="flex-1">
                  <ImageText
                    type="synopsis"
                    text="Progress"
                    description={book?.completed ? 'Selesai' : 'Belum Selesai'}
                    icon="/assets/icons/icon-chart.svg"
                  />
                </div>
              </div>
            </div>
            <div className="bg-dark-300 py-[22px] px-[14px] rounded-xl w-[380px]">
              <h3 className="mb-6 font-gotham font-bold text-gold-200 text-2xl">
                Bab
              </h3>
              <div className="space-y-3">
                <ChapterCard
                  orderNumber={0}
                  chapter={{
                    id: query.bookId as string,
                    content: 'synopsis',
                    name: 'Sinopsis',
                  }}
                  onClick={handleSelectChapter}
                  viewMode="read"
                />
                {book.chapters.map((chapter, index) => (
                  <ChapterCard
                    onClick={handleSelectChapter}
                    orderNumber={index + 1}
                    key={chapter.id}
                    chapter={chapter}
                    viewMode="read"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}
