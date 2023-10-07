import React from 'react'
import Link from '@/components/atoms/Link'
import IconArrow from '@/components/icons/IconArrow'
import IconStar from '@/components/icons/IconStar'
import Carousel from '@/components/molecules/Carousel'
import ProductCard from '@/components/molecules/ProductCard'
import { BookDataModel, PublicBookDataModel } from '@/interfaces/book'

interface BookSliderProps {
  books: BookDataModel[] | PublicBookDataModel[]
  title: string
  subTitle: string
  isBestSeller?: boolean
  moreLink: string
  isCompletedBooks?: boolean
}

const BookSlider: React.FC<BookSliderProps> = ({
  books,
  title,
  subTitle,
  isBestSeller = false,
  moreLink,
  isCompletedBooks = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div className="">
          <h2 className="flex items-center space-x-2 mb-2 font-gotham font-bold text-gold-200 text-2xl leading-5 capitalize">
            <span>{title}</span>
            {isBestSeller && <IconStar fill="#D6B16D" size={14} />}
          </h2>
          <p className="text-sm font-light leading-3 capitalize text-gold-100">
            {subTitle}
          </p>
        </div>
        <Link
          to={moreLink}
          className="inline-flex items-center space-x-1 py-[6px] px-3 border border-gold-100 text-xs leading-3 font-gotham text-gold-100 rounded-[50px] font-thin"
        >
          <span>Selengkapnya</span>
          <IconArrow />
        </Link>
      </div>
      <Carousel
        items={books}
        hasNavigation
        options={{
          containScroll: 'trimSnaps',
          align: 'start',
          slidesToScroll: 'auto',
        }}
      >
        {books.map((book, index) => (
          <div
            key={index}
            className="grow-0 shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-2/12 w-1/2 sm:w-1/3 md:w-1/4 lg:w-2/12 pr-6"
          >
            <ProductCard
              book={book}
              isCompletedBooks={isCompletedBooks}
              showPrice
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default BookSlider
