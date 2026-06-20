import React, { useCallback, useRef } from 'react'
import { InfiniteData } from '@tanstack/react-query'
import { PublicBookDataModel } from '@/interfaces/book'
import GeneralLayout from '@/components/layouts/general'
import NoDataCard from '@/components/organisms/cards/NoDataCard'
import ProductCard from '@/components/molecules/ProductCard'
import Spinner from '@/components/molecules/Spinner'

interface InfiniteListingBookTemplateProps {
  pagesBook?: InfiniteData<PublicBookDataModel[]>
  title: string
  isLoading: boolean
  hasNextPage?: boolean
  onFetchNextPage: () => void
}

export default function InfiniteListingBookTemplate({
  pagesBook,
  title,
  isLoading,
  hasNextPage,
  onFetchNextPage,
}: InfiniteListingBookTemplateProps) {
  const observer = useRef<IntersectionObserver>()
  const isEmptyData = !pagesBook?.pages[0]?.length
  const lastBookElement = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return
      observer.current?.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) onFetchNextPage()
      })
      if (node) observer.current.observe(node)
    },
    [hasNextPage, isLoading, onFetchNextPage]
  )

  return (
    <GeneralLayout>
      {isLoading && !pagesBook && <Spinner />}
      {!isLoading && isEmptyData && <NoDataCard text="Tidak ada data buku" />}
      {!isEmptyData && (
        <div className="container py-10 relative z-10">
          <h2 className="mb-2 font-gotham font-bold text-gold-200 text-2xl leading-5 capitalize">{title}</h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
            {pagesBook?.pages.map((page, pageIndex) =>
              page.map((book, bookIndex) => {
                const isLastBook = pagesBook.pages.length === pageIndex + 1 && page.length === bookIndex + 1
                return (
                  <div key={`${pageIndex}-${book.id}`} ref={isLastBook ? lastBookElement : undefined}>
                    <ProductCard book={book} showPrice />
                  </div>
                )
              })
            )}
          </div>
          {isLoading && <Spinner />}
        </div>
      )}
    </GeneralLayout>
  )
}
