import React, { useEffect, useMemo, useState } from 'react'
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
import { formatDate, sanitizeHTML } from '@/utils/common'
import NoDataCard from '@/components/organisms/cards/NoDataCard'

type ReadBookTemplateProps = {
  isLoading: boolean
  isForbidden: boolean
  onSuccessPurchase: () => void
  book?: PublicBookDataModel
  chapter?: PublicChapterDetailDataModel
  isPurchaseable?: boolean
}

export default function ReadBookTemplate({
  isLoading,
  isForbidden,
  onSuccessPurchase,
  chapter,
  book,
  isPurchaseable = true,
}: ReadBookTemplateProps) {
  const { setTheme, theme } = useTheme()
  const { query, push } = useRouter()
  const [content, setContent] = useState('')

  const nextChapterLink: string | undefined = useMemo(() => {
    const currentChapterId = query.chapterId as string
    const currentChapter = book?.chapters.findIndex(
      (chapter) => chapter.id === currentChapterId
    )

    return book?.chapters[currentChapter! + 1]?.id
  }, [query?.chapterId, book])

  const bookChapterContent = async (chapterContent: string) => {
    const cleanHtml = await sanitizeHTML(chapterContent)
    setContent(cleanHtml)
  }

  const isLastChapter = nextChapterLink === undefined

  useEffect(() => {
    if (typeof window === undefined) return
    document.body.classList.add('bg-none')

    return () => document.body.classList.remove('bg-none')
  }, [])

  useEffect(() => {
    bookChapterContent(chapter?.content ?? '')
  }, [chapter?.content])

  return (
    <div className="flex flex-col">
      <Header />
      {isLoading && (
        <div className="flex-1 min-h-[50vh] flex items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && !isPurchaseable && (
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
          <section className="py-10">
            <div className="mx-auto max-w-[565px] px-4 bg-dark-300 rounded-lg flex items-center">
              <div className="flex items-center justify-between w-full">
                <NoDataCard text="Harap membeli BAB secara berurutan." />
              </div>
            </div>
          </section>
        </>
      )}
      {!isLoading && isForbidden && !chapter && isPurchaseable && (
        <PuchaseOptionCard
          isCompleteBook={book?.completed ?? false}
          onSuccessPurchase={onSuccessPurchase}
          bookId={String(query?.bookId ?? '')}
          chapterId={String(query?.chapterId ?? '')}
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
          <section className="py-10 bg-[#F9F7EF] dark:bg-[#141519] ">
            <div className="mx-auto max-w-[565px] px-4">
              <h2 className="text-center font-gotham text-2xl font-bold mb-8 text-dark-200 dark:text-gold-200 unselectable">
                {chapter?.name ?? ''}
              </h2>
              <div className="font-sans text-justify text-dark-200 dark:text-kplkWhite space-y-4">
                <div
                  className="unselectable"
                  dangerouslySetInnerHTML={{
                    __html: content,
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
                    description={formatDate(book?.approvalDate ?? '')}
                    icon="/assets/icons/icon-calendar.svg"
                  />
                </div>
                <div className="flex-1">
                  <ImageText
                    type="synopsis"
                    text="Genre"
                    description={book?.category?.name ?? ''}
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
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}
