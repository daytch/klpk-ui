import React from 'react'
import { useRouter } from 'next/router'
import { BookChapterDataModel } from '@/interfaces/book'
import Link from '@/components/atoms/Link'
import IconPen from '@/components/icons/IconPen'

interface ChapterCardProps {
  orderNumber: number
  chapter: BookChapterDataModel
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, orderNumber }) => {
  const { asPath } = useRouter()
  const { id, name } = chapter

  const chapterUpdateLink = `${asPath}/chapter/${id}`

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
