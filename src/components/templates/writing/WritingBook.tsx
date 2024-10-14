import React, { useState } from 'react'
import { useRouter } from 'next/router'
import WritingBookForm from '@/components/organisms/forms/WritingBook'
import { DetailBookDataModel } from '@/interfaces/book'
import ChapterCard from '@/components/organisms/cards/ChapterCard'
import Button from '@/components/atoms/Button'
import DialogSuccessSaveBook from '@/components/molecules/DialogSuccessSaveBook'
import { usePublishBook } from '@/services/my-book/mutation'
import { useToast } from '@/hooks/useToast'

interface WritingBookTemplateProps {
  detailBook?: DetailBookDataModel
}

const WritingBookTemplate: React.FC<WritingBookTemplateProps> = ({
  detailBook,
}) => {
  const { query, push } = useRouter()
  const toast = useToast()
  const [showSuccess, setShowSuccess] = useState(false)
  const publishBook = usePublishBook()
  const isCompleteBook = detailBook?.completed

  const handlePublishBook = () => {
    publishBook.mutate(
      {
        bookId: String(query?.bookId ?? ''),
      },
      {
        onSuccess() {
          setShowSuccess(true)
        },
        onError() {
          toast.addToast('error', 'Gagal mengupdate status buku.')
        },
      }
    )
  }

  const isUpdateMode = query?.bookId !== undefined

  const handleAddNewChapter = async () => {
    const Router = (await import('next/router')).default
    Router.push({
      pathname: '/menulis/buku/[bookId]/chapter',
      query: {
        bookId: Router.query?.bookId,
      },
    })
  }

  return (
    <section className="pt-7 pb-28">
      <div className="container">
        <WritingBookForm detailBook={detailBook}>
          <div className="pt-5">
            <Button
              type="button"
              isFullWidth
              disabled={isCompleteBook || !isUpdateMode}
              onClick={handleAddNewChapter}
              variant="outlined"
              style={{
                paddingTop: 4,
                paddingBottom: 4,
              }}
            >
              Tambah Bab
            </Button>
            <div className="space-y-4 mt-4 mb-7">
              {detailBook?.chapters &&
                detailBook?.chapters.length > 0 &&
                detailBook.chapters.map((chapter, index) => (
                  <ChapterCard
                    isCompletedBook={false}
                    key={index}
                    chapter={chapter}
                    orderNumber={index + 1}
                    idx={index}
                  />
                ))}
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                type="button"
                disabled={
                  !isUpdateMode ||
                  !detailBook?.chapters.length ||
                  publishBook.isLoading ||
                  detailBook?.status === 'live'
                }
                isFullWidth={false}
                onClick={handlePublishBook}
              >
                {detailBook?.status !== 'live' && 'Terbitkan'}
                {detailBook?.status === 'live' && 'Sudah Terbit'}
              </Button>
            </div>
          </div>
        </WritingBookForm>
      </div>
      <DialogSuccessSaveBook
        message="Buku anda akan di review oleh Admin"
        isOpen={showSuccess}
        onConfirm={() => {
          setShowSuccess(false)
          push('/menulis?writingTab=live')
        }}
        onCloseDialog={() => setShowSuccess(false)}
      />
    </section>
  )
}

export default WritingBookTemplate
