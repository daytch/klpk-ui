import Link from '@/components/atoms/Link'
import IconStar from '@/components/icons/IconStar'
import { BookDataModel, PublicBookDataModel } from '@/interfaces/book'
import Image from 'next/image'
import React from 'react'

interface ProductCardProps {
  book: BookDataModel | PublicBookDataModel
  contentTypeView?: 'default' | 'writing'
}

const ProductCard: React.FC<ProductCardProps> = ({
  book,
  contentTypeView = 'default',
}) => {
  const showRating = 'rating' in book

  const detailBookLink =
    contentTypeView === 'default'
      ? `/book/detail/${book.id}`
      : `/menulis/buku/${book.id}`

  return (
    <Link to={detailBookLink} className="flex flex-col space-y-2">
      <div className="relative aspect-[5/7] aspect-5-7 rounded-xl overflow-hidden">
        {contentTypeView === 'default' && showRating && (
          <div className="bg-[#f9f7efe6] inline-flex items-center space-x-[2px] p-[5px] rounded-lg absolute top-2 left-2 z-[2]">
            <IconStar />
            <span className="font-gotham text-sm font-light leading-3 text-gold-100">
              {book?.rating ?? 0}
            </span>
          </div>
        )}
        <Image
          priority
          width={138}
          height={189}
          className="absolute top-0 left-0 bottom-0 right-0 z-[1] w-full h-full object-cover"
          src={book?.cover ?? '/assets/images/gallery.png'}
          alt={book.title}
        />
      </div>
      {contentTypeView === 'default' && 'writer' in book && (
        <div className="pb-4">
          <p className="capitalize font-gotham font-normal text-gold-400 text-xs leading-3 mb-2">
            {book.writer.fullName}
          </p>
          <p className="capitalize font-gotham font-bold text-kplkWhite text-sm leading-3">
            {book?.title ?? ''}
          </p>
        </div>
      )}
      {contentTypeView === 'writing' && (
        <div className="pb-4 space-y-2">
          <p className="font-gotham font-medium text-sm text-kplkWhite">
            {book?.title ?? ''}
          </p>
          <p className="font-gotham font-extralight text-xs text-gold-400">
            {book?.category?.name ?? ''}
          </p>
          <p className="font-gotham font-extralight text-xs text-kplkWhite whitespace-nowrap overflow-hidden text-ellipsis">
            {book?.synopsis ?? ''}
          </p>
        </div>
      )}
    </Link>
  )
}

export default ProductCard
