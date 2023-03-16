import React, { useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import Footer from '@/components/organisms/Footer'
// import Toggle from '@/components/molecules/Toggle'
// import { BookChapterDataModel } from '@/interfaces/book'
// import ChapterDropdown from '@/components/organisms/dropdowns/ChapterDropdown'
// import Button from '@/components/atoms/Button'
// import ImageText from '@/components/molecules/ImageText'
import Header from '@/components/organisms/Header'
import Spinner from '@/components/molecules/Spinner'
import PuchaseOptionCard from '@/components/organisms/cards/PuchaseOptionCard'

type ReadBookTemplateProps = {
  isLoading: boolean
  isForbidden: boolean
}

export default function ReadBookTemplate({
  isLoading,
  isForbidden,
}: ReadBookTemplateProps) {
  const { setTheme, theme } = useTheme()
  const { query, push } = useRouter()

  const nextChapterLink = useMemo(() => {
    const baseLink = `/book/read/${query.bookId}/`
    // if (!query?.chapterId) {
    //   baseLink += dummyChapter[0].id
    // } else {
    //   const currentChapterId = query.chapterId as string
    //   const currentChapter = dummyChapter.findIndex(
    //     (chapter) => chapter.id === currentChapterId
    //   )
    //   baseLink += dummyChapter[currentChapter + 1]?.id
    // }
    return baseLink
  }, [query?.chapterId])

  const isLastChapter = nextChapterLink.includes('undefined')

  console.log({ nextChapterLink, isLastChapter, setTheme, theme, push })

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
      {!isLoading && isForbidden && <PuchaseOptionCard />}
      <Footer />
    </div>
  )
}
