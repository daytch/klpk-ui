import React from 'react'
import { useRouter } from 'next/router'
import WritingBookForm from '@/components/organisms/forms/WritingBook'
import Link from '@/components/atoms/Link'
import { DetailBookDataModel } from '@/interfaces/book'
import ChapterCard from '@/components/organisms/cards/ChapterCard'
import Button from '@/components/atoms/Button'

interface WritingBookTemplateProps {
  detailBook?: DetailBookDataModel
}

const WritingBookTemplate: React.FC<WritingBookTemplateProps> = ({
  detailBook,
}) => {
  const { asPath, query } = useRouter()

  const isUpdateMode = query?.bookId !== undefined
  const isDraft = detailBook?.status === 'draft'

  return (
    <section className="pt-7 pb-28">
      <div className="container">
        <WritingBookForm detailBook={detailBook}>
          <div className="pt-5">
            <Link
              to={`${isUpdateMode ? `${asPath}/chapter` : '#'}`}
              className="inline-flex items-center justify-center px-4 font-sfpro font-normal min-h-[20px] rounded-lg text-base text-gold-200 border-gold-200 ring-1 ring-gold-200 disabled:bg-gold-300 disabled:text-dark-500 w-full py-1"
            >
              Tambah Bab
            </Link>
            <div className="space-y-4 mt-4 mb-7">
              {detailBook?.chapters.length &&
                detailBook.chapters.map((chapter, index) => (
                  <ChapterCard
                    key={index}
                    chapter={chapter}
                    orderNumber={index + 1}
                  />
                ))}
            </div>
            <div className="flex justify-center space-x-4">
              {isDraft && (
                <Button isFullWidth={false} variant="outlined">
                  Simpan
                </Button>
              )}
              <Button isFullWidth={false} disabled={isDraft}>
                Terbitkan
              </Button>
            </div>
          </div>
        </WritingBookForm>
      </div>
    </section>
  )
}

export default WritingBookTemplate
