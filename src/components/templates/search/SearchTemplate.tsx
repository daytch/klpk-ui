import React, { useCallback, useRef } from 'react'
import Spinner from '@/components/molecules/Spinner'
import NoDataCard from '@/components/organisms/cards/NoDataCard'
import ProductCard from '@/components/molecules/ProductCard'
import SearchLayout from '@/components/layouts/search'
import { PublicBookDataModel } from '@/interfaces/book'
import { InfiniteData } from '@tanstack/react-query'
import { AuthorModelData } from '@/interfaces/profile'
import TestimonyCard from '@/components/molecules/TestimonyCard'
import { TopWriterDataModel } from '@/interfaces/writer'

interface SearchTemplateProps {
  activeTab: 'books' | 'authors'
  data?: InfiniteData<PublicBookDataModel[]> | InfiniteData<AuthorModelData[]>
  isLoading: boolean
  isError: boolean
  hasNextPage?: boolean
  onFetchNextPage: () => void
}

const SearchTemplate: React.FC<SearchTemplateProps> = ({
  activeTab,
  data,
  isLoading,
  isError,
  hasNextPage,
  onFetchNextPage,
}) => {
  function isBook(object: any): object is PublicBookDataModel {
    return object !== undefined && 'synopsis' in object
  }

  const observer = useRef<IntersectionObserver>()
  const isEmptyData = isBook(data) && !data?.pages[0]?.length
  const isSearchType = activeTab === 'books'

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
    <SearchLayout activeTab={activeTab}>
      {isError && !isLoading && (
        <p className="text-center py-2 text-sm text-thin">
          Mohon maaf. Sedang terjadi masalah. Silahkan ulangi beberapa saat
          lagi.
        </p>
      )}
      {!isError && isLoading && <Spinner />}

      {isSearchType ? (
        <>
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
          {data !== undefined && !isEmptyData && (
            <div className="container py-10 relative z-10">
              <div className="grid gap-6 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                {data?.pages.length !== 0 &&
                  data?.pages.map((page, pageIndex) =>
                    page.map((book, bookIndex) => {
                      if (isBook(book)) {
                        if (
                          data.pages.length === pageIndex + 1 &&
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
                      } else {
                        const writer: TopWriterDataModel = {
                          userId: book.id,
                          username: book.username,
                          fullName: book.fullName,
                          bio: book.bio,
                          photos: book.photos,
                          verified: true,
                        }

                        if (
                          data.pages.length === pageIndex + 1 &&
                          page.length === bookIndex + 1
                        ) {
                          return (
                            <TestimonyCard writer={writer} key={bookIndex} />
                          )
                          // return (
                          //   <div key={`${pageIndex}-${bookIndex}`}>
                          //     <ProductCard book={book} showPrice />
                          //   </div>
                          // )
                        }
                      }
                    })
                  )}
              </div>
            </div>
          )}
          {isLoading && <Spinner />}
        </>
      ) : (
        <>
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
          {data !== undefined && !isEmptyData && (
            <div className="container py-10 relative z-10">
              <div className="grid gap-6 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
                {data?.pages.length !== 0 &&
                  data?.pages.map((page, pageIndex) =>
                    page.map((book, bookIndex) => {
                      if (!isBook(book)) {
                        const writer: TopWriterDataModel = {
                          userId: book.id,
                          username: book.username,
                          fullName: book.fullName,
                          bio: book.bio,
                          photos: book.photos,
                          verified: true,
                        }

                        if (
                          data.pages.length === pageIndex + 1 &&
                          page.length === bookIndex + 1
                        ) {
                          return (
                            <TestimonyCard writer={writer} key={bookIndex} />
                          )
                        }
                        return (
                          <div key={`${pageIndex}-${bookIndex}`}>
                            <TestimonyCard writer={writer} key={bookIndex} />
                          </div>
                        )
                      }
                    })
                  )}
              </div>
            </div>
          )}
          {isLoading && <Spinner />}
        </>
      )}
    </SearchLayout>
  )
}

export default SearchTemplate
