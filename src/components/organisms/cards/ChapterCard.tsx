import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BookChapterDataModel } from '@/interfaces/book'
import Link from '@/components/atoms/Link'
import IconPen from '@/components/icons/IconPen'

interface ChapterCardProps {
  orderNumber: number
  chapter: BookChapterDataModel
  viewMode?: 'writing' | 'read'
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  orderNumber,
  viewMode = 'writing',
}) => {
  const { asPath, query } = useRouter()
  const { id, name } = chapter

  const chapterUpdateLink = `${asPath}/chapter/${id}`
  const synopsisReadLink = `/book/detail/${id}`
  const chapterReadLink = `/book/read/${query.bookId}/${id}`
  const isSynopsisContent = chapter.content === 'synopsis'

  if (viewMode === 'read') {
    return (
      <Link
        to={isSynopsisContent ? synopsisReadLink : chapterReadLink}
        className="flex items-center p-5 bg-dark-100 rounded-xl"
      >
        <div className="w-7 h-7 inline-flex items-center justify-center border border-gold-200 text-gold-200 rounded-full font-gotham font-bold text-sm mr-[14px]">
          {isSynopsisContent ? (
            <Image
              src="/assets/icons/icon-tag.svg"
              width={15}
              height={15}
              alt="Sinopsis"
            />
          ) : (
            orderNumber
          )}
        </div>
        <p className="mr-[14px] flex-1 font-bold font-gotham text-sm text-gold-200">
          {name}
        </p>
        {chapter.isLocked && (
          <Image
            src="/assets/icons/icon-lock.svg"
            width={24}
            height={24}
            alt="Lock"
          />
        )}
      </Link>
    )
  }

  return (
    <div className="flex items-center p-5 bg-dark-100 rounded-xl">
      <div className="w-7 h-7 inline-flex items-center justify-center border border-gold-200 text-gold-200 rounded-full font-gotham font-bold text-sm mr-[14px]">
        {orderNumber}
      </div>
      <p className="mr-[14px] flex-1 font-bold font-gotham text-sm text-gold-200">
        {name}
      </p>
      <Link to={chapterUpdateLink}>
        <IconPen />
      </Link>
    </div>
  )
}

export default ChapterCard
