import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BookChapterDataModel } from '@/interfaces/book'
import Link from '@/components/atoms/Link'
import IconPen from '@/components/icons/IconPen'
import { limitChapterSix } from '@/utils/common'

interface ChapterCardProps {
  orderNumber: number
  chapter: BookChapterDataModel
  viewMode?: 'writing' | 'read'
  onClick?: (
    type: 'synopsis' | 'chapter',
    chapterId?: string,
    orderNumber: number
  ) => void
  isCompletedBook?: boolean
  idx: number
}

const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  orderNumber,
  viewMode = 'writing',
  onClick = () => {},
  isCompletedBook,
  idx,
}) => {
  const { asPath } = useRouter()
  const { id, name } = chapter

  const chapterUpdateLink = `${asPath}/chapter/${id}`
  const isSynopsisContent = chapter.content === 'synopsis'

  const isLockedContent = (
    isSynopsis: boolean,
    index: number,
    accesible?: boolean
  ) => {
    if (isSynopsis || index === -1) return false
    if (accesible && index < 6) return false
    return true
  }

  if (viewMode === 'read') {
    return (
      <button
        onClick={() => {
          if (orderNumber > 6) {
            limitChapterSix()
          } else {
            onClick(
              isSynopsisContent ? 'synopsis' : 'chapter',
              id.length ? id : '',
              orderNumber
            )
          }
        }}
        type="button"
        className="flex  items-center justify-start p-5 bg-dark-100 rounded-xl w-full"
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
        <p className="mr-[14px] flex-1 text-left font-bold font-gotham text-sm text-gold-200">
          {name}
        </p>
        {isLockedContent(isSynopsisContent, idx, chapter.accessible) && (
          <Image
            src="/assets/icons/icon-lock.svg"
            width={24}
            height={24}
            alt="Lock"
          />
        )}
      </button>
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
      {!isCompletedBook && (
        <Link to={chapterUpdateLink}>
          <IconPen />
        </Link>
      )}
    </div>
  )
}

export default ChapterCard
