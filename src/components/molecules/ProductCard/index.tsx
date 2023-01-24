import Link from '@/components/atoms/Link'
import IconStar from '@/components/icons/IconStar'
import { BookDataModel } from '@/interfaces/book'
import Image from 'next/image'
import React from 'react'

interface ProductCardProps {
  book: BookDataModel
}

const ProductCard: React.FC<ProductCardProps> = ({ book }) => {
  return (
    <Link to={`/books/detail/${book.id}`} className="flex flex-col space-y-2">
      <div className="relative aspect-[5/7] aspect-5-7 rounded-xl overflow-hidden">
        <div className="bg-[#f9f7efe6] inline-flex items-center space-x-[2px] p-[5px] rounded-lg absolute top-2 left-2 z-[2]">
          <IconStar />
          <span className="font-gotham text-sm font-light leading-3 text-gold-100">
            5.0
          </span>
        </div>
        <Image
          width={138}
          height={189}
          className="absolute top-0 left-0 bottom-0 right-0 z-[1] w-full h-full"
          src={book.cover}
          alt={book.title}
          unoptimized
        />
      </div>
      <div className="pb-4">
        <p className="capitalize font-gotham font-normal text-gold-400 text-xs leading-3 mb-2">
          Patrick Kellan
        </p>
        <p className="capitalize font-gotham font-bold text-kplkWhite text-sm leading-3">
          {book.title}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
