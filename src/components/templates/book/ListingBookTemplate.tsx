import React from 'react'
import { PublicBookDataModel } from '@/interfaces/book'
import GeneralLayout from '@/components/layouts/general'
import NoDataCard from '@/components/organisms/cards/NoDataCard'
import ProductCard from '@/components/molecules/ProductCard'
import IconStar from '@/components/icons/IconStar'
import Spinner from '@/components/molecules/Spinner'

interface ListingBookTemplateProps {
  books: PublicBookDataModel[]
  title: string
  isBestSeller?: boolean
  isLoading?: boolean
}

export default function ListingBookTemplate({
  books,
  title,
  isBestSeller = false,
  isLoading,
}: ListingBookTemplateProps) {
  return (
    <>
      <GeneralLayout>
        {isLoading && <Spinner />}
        {!isLoading && !books?.length && (
          <NoDataCard text="Tidak ada data buku" />
        )}
        {books.length !== 0 && (
          <div className="container py-10 relative z-10">
            <h2 className="flex items-center space-x-2 mb-2 font-gotham font-bold text-gold-200 text-2xl leading-5 capitalize">
              <span>{title}</span>
              {isBestSeller && <IconStar fill="#D6B16D" size={14} />}
            </h2>
            <div className="grid gap-6 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
              {books.map((book, index) => (
                <ProductCard key={index} book={book} />
              ))}
            </div>
          </div>
        )}
      </GeneralLayout>
    </>
  )
}
