import React, { useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import Footer from '@/components/organisms/Footer'
import Toggle from '@/components/molecules/Toggle'
import ChapterDropdown from '@/components/organisms/dropdowns/ChapterDropdown'
import Button from '@/components/atoms/Button'
import ImageText from '@/components/molecules/ImageText'
import Header from '@/components/organisms/Header'
import Spinner from '@/components/molecules/Spinner'
import PuchaseOptionCard from '@/components/organisms/cards/PuchaseOptionCard'
import {
  PublicBookDataModel,
  PublicChapterDetailDataModel,
} from '@/interfaces/book'
import { sanitizeHTML } from '@/utils/common'

type ReadBookTemplateProps = {
  isLoading: boolean
  isForbidden: boolean
  book?: PublicBookDataModel
  chapter?: PublicChapterDetailDataModel
  onRefetchChapter: () => void
}

export default function ReadBookTemplate({
  isLoading,
  isForbidden,
  chapter,
  book,
  onRefetchChapter = () => {},
}: ReadBookTemplateProps) {
  const { setTheme, theme } = useTheme()
  const { query, push } = useRouter()

  const nextChapterLink: string | undefined = useMemo(() => {
    const currentChapterId = query.chapterId as string
    const currentChapter = book?.chapters.findIndex(
      (chapter) => chapter.id === currentChapterId
    )

    return book?.chapters[currentChapter! + 1]?.id
  }, [query?.chapterId, book])

  const isLastChapter = nextChapterLink === undefined

  useEffect(() => {
    if (typeof window === undefined) return
    document.body.classList.add('bg-none')

    return () => document.body.classList.remove('bg-none')
  }, [])

  return (
    <div className="flex flex-col">
      <Header />
      {isLoading && (
        <div className="flex-1 min-h-[50vh] flex items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && isForbidden && !chapter && (
        <PuchaseOptionCard
          bookId={String(query?.bookId ?? '')}
          chapterId={String(query?.chapterId ?? '')}
          onRefetchBook={onRefetchChapter}
        />
      )}
      {book !== undefined && chapter !== undefined && (
        <>
          <section className="bg-[#676867] dark:bg-black py-[11px] sticky top-[84px] z-10">
            <div className="mx-auto max-w-[565px] px-4">
              <div className="flex items-center justify-between">
                <ChapterDropdown
                  chapters={book?.chapters ?? []}
                  bookAuthor={book?.writer?.fullName ?? ''}
                  bookTitle={book?.title ?? ''}
                  bookCover={book?.cover ?? ''}
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
                {chapter?.name ?? ''}
              </h2>
              <div className="font-sans text-justify text-dark-200 dark:text-kplkWhite space-y-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTML(chapter?.content ?? ''),
                  }}
                />
                <Button
                  isFullWidth
                  disabled={isLastChapter}
                  onClick={() =>
                    push({
                      pathname: '/book/read/[bookId]/[chapterId]',
                      query: {
                        bookId: query.bookId,
                        chapterId: nextChapterLink,
                      },
                    })
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
        </>
      )}

      <Footer />
    </div>
  )
}
