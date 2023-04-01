import React, { useCallback, useRef } from 'react'
import { InfiniteData } from '@tanstack/react-query'
import GeneralLayout from '@/components/layouts/general'
import NoDataCard from '@/components/organisms/cards/NoDataCard'
import { BookLibraryDataModel } from '@/interfaces/book'
import ProductCard from '@/components/molecules/ProductCard'

interface MyLibrariesTemplateProps {
  pagesBook?: InfiniteData<BookLibraryDataModel[]>
  isLoading: boolean
  isError: boolean
  fetchNextPage: () => void
  hasNextPage?: boolean
}

export default function MyLibrariesTemplate({
  pagesBook,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
}: MyLibrariesTemplateProps) {
  const observer = useRef<IntersectionObserver>()
  const isEmptyData = !pagesBook?.pages[0]?.length

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

  return (
    <GeneralLayout>
      <section className="container py-12">
        <div className="bg-dark-300 px-6 py-8 rounded-xl">
          <h1 className="font-bold font-gotham text-2xl text-gold-200 mb-6">
            Bacaan Saya
          </h1>
          <hr className="border border-gold-300" />
          {!isLoading && isError && (
            <p className="font-bold font-gotham text-xl text-gold-200 mb-6 text-center my-6">
              Ada yang tidak beres. Coba lagi.
            </p>
          )}
          {!isLoading && !isError && isEmptyData && (
            <NoDataCard text="Anda belum membeli buku apapun. Silakan beli buku." />
          )}

          {!isLoading && !isError && !isEmptyData && (
            <div className="grid gap-6 grid-cols-2 mt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                          <ProductCard book={book} contentTypeView="library" />
                        </div>
                      )
                    }
                    return (
                      <div key={`${pageIndex}-${bookIndex}`}>
                        <ProductCard book={book} contentTypeView="library" />
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
