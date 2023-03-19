import React, { useMemo } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { BookChapterDataModel } from '@/interfaces/book'
import Image from 'next/image'
import IconChevron from '@/components/icons/IconChevron'
import Link from '@/components/atoms/Link'
import { useRouter } from 'next/router'
import { joinClass } from '@/utils/common'

type ChapterDropdownProps = {
  chapters: BookChapterDataModel[]
  bookTitle: string
  bookAuthor: string
  bookCover: string
}

type ChapterButtonProps = {
  chapter: BookChapterDataModel
  isLast?: boolean
}

function ChapterButton({ chapter, isLast = false }: ChapterButtonProps) {
  const { query } = useRouter()
  const chapterLink = `/book/read/${query.bookId}/${chapter.id}`
  const isActiveChapter = useMemo(
    () => query?.chapterId === chapter.id,
    [query.chapterId]
  )

  return (
    <Link
      to={chapterLink}
      className={joinClass(
        'inline-flex items-center justify-between w-full py-4 px-3 bg-dark-200 space-x-4 border-b-dark-100',
        isLast ? 'border-b-0' : 'border-b'
      )}
    >
      <p
        className={joinClass(
          'font-gotham font-bold text-md leading-4',
          isActiveChapter ? 'text-gold-200' : 'text-kplkWhite'
        )}
      >
        {chapter.name}
      </p>
      {!chapter.accessible && (
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

export default function ChapterDropdown({
  chapters,
  bookTitle,
  bookAuthor,
  bookCover,
}: ChapterDropdownProps) {
  return (
    <div className="relative inline-block text-left max-w-[235px]">
      <DropdownMenu.Root
        onOpenChange={() => {
          if (typeof window !== undefined) {
            document.body.classList.add('dropdown-open')
          }
        }}
      >
        <DropdownMenu.Trigger className="inline-flex items-center outline-none relative p-2 px-3 rounded-lg border border-gold-400 dark:border-[#726A64] max-w-full">
          <Image
            src={bookCover}
            width={33}
            height={46}
            alt=""
            className="rounded-lg object-cover w-[33px] h-[46px]"
          />
          <div className="text-kplkWhite font-gotham text-left ml-4 overflow-hidden whitespace-nowrap flex-1">
            <p className="font-bold text-sm mb-[6px] overflow-hidden text-ellipsis max-w-full">
              {bookTitle}
            </p>
            <p className="text-xs font-light overflow-hidden text-ellipsis max-w-full">
              {bookAuthor}
            </p>
          </div>
          <IconChevron className="ml-4 dropdown-icon" fill="#F9F7EF" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={-3}
            className="min-w-[254px] bg-dark-200 rounded-lg z-10 mt-2 overflow-hidden"
          >
            {chapters &&
              chapters.length > 0 &&
              chapters.map((chapter, index) => (
                <DropdownMenu.Item key={index}>
                  <ChapterButton
                    chapter={chapter}
                    isLast={index === chapters.length - 1}
                  />
                </DropdownMenu.Item>
              ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
