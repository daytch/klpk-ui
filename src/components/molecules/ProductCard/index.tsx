import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from '@/components/atoms/Link'
import IconStar from '@/components/icons/IconStar'
import { BookDataModel, PublicBookDataModel } from '@/interfaces/book'
import { joinClass, sanitizeHTML } from '@/utils/common'
import IconNoImage from '@/assets/icons/no-image.svg'

interface ProductCardProps {
  book: BookDataModel | PublicBookDataModel
  contentTypeView?: 'default' | 'writing' | 'library'
}

const ProductCard: React.FC<ProductCardProps> = ({
  book,
  contentTypeView = 'default',
}) => {
  const showRating = 'rating' in book
  const showProgress = 'readProgress' in book
  const isFinishRead = showProgress && book.readProgress === 100
  const noAvailableCoverImage = !book?.cover?.length
  const [synopsis, setSynopsis] = useState('')

  const detailBookLink =
    contentTypeView === 'default' || contentTypeView === 'library'
      ? `/book/detail/${book.id}`
      : `/menulis/buku/${book.id}`

  const createCleanSynopsisHtml = async (content: string) => {
    const cleanHtml = await sanitizeHTML(content)
    setSynopsis(cleanHtml)
  }

  useEffect(() => {
    createCleanSynopsisHtml(book?.synopsis ?? '')
  }, [book?.synopsis])

  return (
    <Link to={detailBookLink} className="flex flex-col space-y-2">
      <div className="relative aspect-[5/7] aspect-5-7 rounded-xl overflow-hidden">
        {contentTypeView === 'default' && showRating && (
          <div className="bg-[#f9f7efe6] inline-flex items-center space-x-[2px] p-[5px] rounded-lg absolute top-2 left-2 z-[2]">
            <IconStar />
            <span className="font-gotham text-sm font-light leading-3 text-gold-100">
              {(book?.rating ?? 0).toFixed(1)}
            </span>
          </div>
        )}
        <div>
          {noAvailableCoverImage ? (
            <Image
              priority
              width={138}
              height={189}
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bottom-0 right-0 z-[1] object-cover"
              src={IconNoImage}
              alt={book?.title ?? ''}
              style={{
                filter: noAvailableCoverImage
                  ? 'invert(88%) sepia(99%) saturate(3360%) hue-rotate(182deg) brightness(122%) contrast(91%)'
                  : 'none',
              }}
            />
          ) : (
            <Image
              priority
              width={138}
              height={189}
              className="absolute top-0 left-0 bottom-0 right-0 z-[1] w-full h-full object-cover"
              src={book?.cover}
              alt={book?.title ?? ''}
              style={{
                filter: noAvailableCoverImage
                  ? 'invert(88%) sepia(99%) saturate(3360%) hue-rotate(182deg) brightness(122%) contrast(91%)'
                  : 'none',
              }}
            />
          )}
        </div>
        {contentTypeView === 'library' && showProgress && (
          <div
            className={joinClass(
              'absolute p-1 rounded text-white font-sfpro left-1/2 -translate-x-1/2 bottom-2 z-[5] whitespace-nowrap',
              isFinishRead ? 'bg-[#00C008]' : 'bg-[#0A84FF]'
            )}
          >
            {isFinishRead ? 'Selesai dibaca' : 'Belum selesai'}
          </div>
        )}
      </div>
      {contentTypeView === 'library' && showProgress && (
        <div className="w-full h-[2px] rounded-lg bg-[#D9D9D9] relative mt-2">
          <div
            className={joinClass(
              'absolute top-0 bottom-0 left-0',
              isFinishRead ? 'bg-[#00C008]' : 'bg-[#0A84FF]'
            )}
            style={{
              width: `${((book.readProgress as number) / 100) * 100}%`,
            }}
          ></div>
        </div>
      )}
      {contentTypeView !== 'writing' && 'writer' in book && (
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
          <div
            className="font-gotham font-extralight text-xs text-kplkWhite whitespace-nowrap overflow-hidden text-ellipsis"
            dangerouslySetInnerHTML={{
              __html: synopsis,
            }}
          />
        </div>
      )}
    </Link>
  )
}

export default ProductCard
