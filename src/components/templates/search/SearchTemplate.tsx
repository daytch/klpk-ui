import React, { useCallback, useRef } from 'react'
import GeneralLayout from '@/components/layouts/general'
import { InfiniteData } from '@tanstack/react-query'
import { PublicBookDataModel } from '@/interfaces/book'
import Spinner from '@/components/molecules/Spinner'
import NoDataCard from '@/components/organisms/cards/NoDataCard'
import ProductCard from '@/components/molecules/ProductCard'

interface SearchTemplateProps {
  pagesBook?: InfiniteData<PublicBookDataModel[]>
  isLoading: boolean
  isError: boolean
  hasNextPage?: boolean
  onFetchNextPage: () => void
}

const SearchTemplate: React.FC<SearchTemplateProps> = ({
  pagesBook,
  isLoading,
  isError,
  hasNextPage,
  onFetchNextPage,
}) => {
  const observer = useRef<IntersectionObserver>()
  const isEmptyData = !pagesBook?.pages[0]?.length

  const lastBookElement = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          onFetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoading, hasNextPage]
  )

  return (
    <GeneralLayout>
      {!isLoading && isEmptyData && (
        <div className="min-h-[70vh]">
          <NoDataCard text="Tidak ada buku yang ditemukan." />
        </div>
      )}
      {!isLoading && !isEmptyData && isError && (
        <h2 className="flex items-center space-x-2 mb-2 font-gotham font-bold text-gold-200 text-2xl leading-5 capitalize">
          Error
        </h2>
      )}
      {pagesBook !== undefined && !isEmptyData && (
        <div className="container py-10 relative z-10">
          <h2 className="flex items-center space-x-2 mb-2 font-gotham font-bold text-gold-200 text-2xl leading-5 capitalize">
            Hasil Pencarian
          </h2>
          <div className="grid gap-6 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
            {pagesBook?.pages.length !== 0 &&
              pagesBook?.pages.map((page, pageIndex) =>
                page.map((book, bookIndex) => {
                  if (
                    pagesBook.pages.length === pageIndex + 1 &&
                    page.length === bookIndex + 1
                  ) {
                    return (
                      <div
                        key={`${pageIndex}-${bookIndex}`}
                        ref={lastBookElement}
                      >
                        <ProductCard book={book} showPrice />
                      </div>
                    )
                  }
                  return (
                    <div key={`${pageIndex}-${bookIndex}`}>
                      <ProductCard book={book} showPrice />
                    </div>
                  )
                })
              )}
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
    </GeneralLayout>
  )
}

export default SearchTemplate
