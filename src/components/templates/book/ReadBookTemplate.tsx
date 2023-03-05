import React, { Fragment, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import Footer from '@/components/organisms/Footer'
import Toggle from '@/components/molecules/Toggle'
import { BookChapterDataModel } from '@/interfaces/book'
import ChapterDropdown from '@/components/organisms/dropdowns/ChapterDropdown'
import Button from '@/components/atoms/Button'
import ImageText from '@/components/molecules/ImageText'

const Header = dynamic(() => import('@/components/organisms/Header'), {
  ssr: false,
})

const dummyChapter: BookChapterDataModel[] = [
  {
    id: '9f1ee821-a982-c92a-7f0c-749d3fc88799',
    name: 'Bab 1',
    content: 'Bab 1',
  },
  {
    id: '9f1ee821-a982-c92a-7f0c-749d3fc88710',
    name: 'Bab 2',
    content: 'Bab 2',
  },
  {
    id: '9f1ee821-a982-c92a-7f0c-749d3fc88715',
    name: 'Bab 3',
    content: 'Bab 3',
    isLocked: true,
  },
  {
    id: '9f1ee821-a982-c92a-7f0c-749d3fc88719',
    name: 'Bab 4',
    content: 'Bab 4',
    isLocked: true,
  },
]

export default function ReadBookTemplate() {
  const { setTheme, theme } = useTheme()
  const { query, push } = useRouter()

  const nextChapterLink = useMemo(() => {
    let baseLink = `/book/read/${query.bookId}/`
    if (!query?.chapterId) {
      baseLink += dummyChapter[0].id
    } else {
      const currentChapterId = query.chapterId as string
      const currentChapter = dummyChapter.findIndex(
        (chapter) => chapter.id === currentChapterId
      )
      baseLink += dummyChapter[currentChapter + 1]?.id
    }
    return baseLink
  }, [query?.chapterId])

  const isLastChapter = nextChapterLink.includes('undefined')

  useEffect(() => {
    if (typeof window === undefined) return
    document.body.classList.add('bg-none')

    return () => document.body.classList.remove('bg-none')
  }, [])

  return (
    <Fragment>
      <Header />
      <section className="bg-[#676867] dark:bg-black py-[11px] sticky top-[84px] z-10">
        <div className="mx-auto max-w-[565px] px-4">
          <div className="flex items-center justify-between">
            <ChapterDropdown
              chapters={dummyChapter}
              bookAuthor="Nama Penulis"
              bookTitle="Traite of Reflexions"
              bookCover="/assets/images/dummy/dummy1.png"
            />
            <Toggle
              text="Light Mode"
              isChecked={theme === 'light'}
              onChange={() =>
                theme == 'dark' ? setTheme('light') : setTheme('dark')
              }
            />
          </div>
        </div>
      </section>
      <section className="py-10 bg-[#F9F7EF] dark:bg-[#141519]">
        <div className="mx-auto max-w-[565px] px-4">
          <h2 className="text-center font-gotham text-2xl font-bold mb-8 text-dark-200 dark:text-gold-200">
            Bab 1
          </h2>
          <div className="font-sans text-justify text-dark-200 dark:text-kplkWhite space-y-4">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <Button
              isFullWidth
              disabled={isLastChapter}
              onClick={() =>
                push(nextChapterLink, undefined, { scroll: false })
              }
              variant="primary"
              className="dark:bg-transparent dark:ring-gold-100 dark:text-gold-100 dark:border-gold-100 dark:border"
            >
              Lanjutkan Bab Berikutnya
            </Button>
          </div>
          <hr className="mt-20 border-gold-300 mb-4" />
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
      </section>
      <Footer />
    </Fragment>
  )
}
