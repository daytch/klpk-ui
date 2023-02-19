import React, { useCallback, useRef } from 'react'
import { InfiniteData } from '@tanstack/react-query'
import WritingLayout from '@/components/layouts/writing/WritingHomepage'
import { BookDataModel } from '@/interfaces/book'
import ProductCard from '@/components/molecules/ProductCard'

interface WritingHomepageTemplateProps {
  bookPages?: InfiniteData<BookDataModel[]>
  isLoadingBook: boolean
  hasNextBookPage?: boolean
  onGetNextPage: () => void
}

const WritingHomepageTemplate: React.FC<WritingHomepageTemplateProps> = ({
  bookPages,
  isLoadingBook,
  hasNextBookPage,
  onGetNextPage,
}) => {
  const observer = useRef<IntersectionObserver>()
  const lastBookElement = useCallback(
    (node: HTMLDivElement) => {
      if (isLoadingBook) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextBookPage) {
          onGetNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoadingBook, hasNextBookPage]
  )

  return (
    <WritingLayout>
      {!bookPages?.pages.length && null}
      <div className="grid gap-6 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-[795px] mx-auto">
        {bookPages?.pages.length !== 0 &&
          bookPages?.pages.map((page, pageIndex) =>
            page.map((book, bookIndex) => {
              if (
                bookPages.pages.length === pageIndex + 1 &&
                page.length === bookIndex + 1
              ) {
                return (
                  <div key={`${pageIndex}-${bookIndex}`} ref={lastBookElement}>
                    <ProductCard book={book} contentTypeView="writing" />
                  </div>
                )
              }
              return (
                <div key={`${pageIndex}-${bookIndex}`}>
                  <ProductCard book={book} contentTypeView="writing" />
                </div>
              )
            })
          )}
      </div>
    </WritingLayout>
  )
}

export default WritingHomepageTemplate
