import React, { Fragment, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Footer from '@/components/organisms/Footer'
import IconStar from '@/components/icons/IconStar'
import ImageText from '@/components/molecules/ImageText'
import Button from '@/components/atoms/Button'
import ChapterCard from '@/components/organisms/cards/ChapterCard'
import { useRouter } from 'next/router'
import { BookChapterDataModel } from '@/interfaces/book'

const Header = dynamic(() => import('@/components/organisms/Header'), {
  ssr: false,
})

const dummyChapter: BookChapterDataModel[] = [
  {
    id: '993ea304-d91d-91fc-8ce7-cb5c3576e95c/9f1ee821-a982-c92a-7f0c-749d3fc88799',
    name: 'Bab 1',
    content: 'Bab 1',
  },
  {
    id: '993ea304-d91d-91fc-8ce7-cb5c3576e95c/9f1ee821-a982-c92a-7f0c-749d3fc88710',
    name: 'Bab 2',
    content: 'Bab 2',
  },
  {
    id: '993ea304-d91d-91fc-8ce7-cb5c3576e95c/9f1ee821-a982-c92a-7f0c-749d3fc88715',
    name: 'Bab 3',
    content: 'Bab 3',
    isLocked: true,
  },
  {
    id: '993ea304-d91d-91fc-8ce7-cb5c3576e95c/9f1ee821-a982-c92a-7f0c-749d3fc88715',
    name: 'Bab 4',
    content: 'Bab 4',
    isLocked: true,
  },
]

export default function ProfileBookTemplate() {
  const { query } = useRouter()
  useEffect(() => {
    if (typeof window === undefined) return
    document.body.classList.add('bg-none')

    return () => document.body.classList.remove('bg-none')
  }, [])

  return (
    <Fragment>
      <Header />
      {/* hero */}
      <section className="pb-10 pt-8 relative">
        <Image
          src="/assets/images/dummy/dummy-hero-profile-book.jpg"
          alt=""
          fill
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
                5.0
              </span>
            </div>
            <Image src="/assets/images/dummy/dummy1.png" fill alt="" />
          </div>
          <div className="relative z-10 font-gotham text-kplkWhite flex flex-col justify-center overflow-hidden flex-1">
            <h2 className="text-2xl font-bold mb-1 leading-6 w-full whitespace-nowrap text-ellipsis overflow-hidden">
              Traite of Reflexions
            </h2>
            <p className="font-extralight text-sm mb-6">Nama Penulis</p>
            <div className="flex items-center flex-wrap space-x-4 mb-6">
              <ImageText
                text="100rb Dibaca"
                icon="/assets/icons/icon-eye.svg"
              />
              <ImageText text="27 Bab" icon="/assets/icons/icon-book.svg" />
              <ImageText
                text="20rb Berlangganan"
                icon="/assets/icons/icon-user2.svg"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="primary" isFullWidth={false}>
                Mulai Baca
              </Button>
              <Button variant="primary" isFullWidth={false}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-100 pt-12 pb-24">
        <div className="container">
          <div className="lg:flex justify-between space-y-12 lg:space-y-0 lg:space-x-12">
            <div className="flex-1">
              <h3 className="font-gotham font-bold text-gold-200 text-2xl leading-6 mb-6">
                Sinopsis
              </h3>
              <p className="font-gotham text-kplkWhite text-sm font-light mb-16">
                Selingkuh, hal yang wajar kan bagi seorang laki-laki mapan?
                Daniel butuh suasana baru yang tak mampu dihadirkan oleh Aniya
                istrinya dan Sindy, wanita cantik itu bisa membuatnya begitu
                menikmati indahnya dunia. Dan Daniel selingkuh, mengabaikan
                kasih istri dan putrinya.
              </p>
              <hr className="border-gold-300 mb-4" />
              <div className="flex items-center flex-wrap space-x-10">
                <div className="flex-1">
                  <ImageText
                    type="synopsis"
                    text="Tanggal Terbit"
                    description="20 Desember 2022"
                    icon="/assets/icons/icon-calendar.svg"
                  />
                </div>
                <div className="flex-1">
                  <ImageText
                    type="synopsis"
                    text="Genre"
                    description="Historical"
                    icon="/assets/icons/icon-category.svg"
                  />
                </div>
                <div className="flex-1">
                  <ImageText
                    type="synopsis"
                    text="Progress"
                    description="Belum Selesai"
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
                  viewMode="read"
                />
                {dummyChapter.map((chapter, index) => (
                  <ChapterCard
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
