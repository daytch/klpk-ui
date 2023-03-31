import React from 'react'
import Button from '@/components/atoms/Button'
import { usePurchaseBook } from '@/services/book/mutation'
import { useToast } from '@/hooks/useToast'

interface PuchaseOptionCardProps {
  bookId: string
  chapterId: string
  onRefetchBook: () => void
}

export default function PuchaseOptionCard({
  bookId,
  chapterId,
  onRefetchBook = () => {},
}: PuchaseOptionCardProps) {
  const purchaseBook = usePurchaseBook()
  const toast = useToast()

  const handlePurchaseBook = (type: 'book' | 'chapter') => {
    const payload: { type: 'book' | 'chapter'; id: string } = {
      type,
      id: '',
    }
    if (type === 'book') {
      payload.id = bookId
    } else {
      payload.id = chapterId
    }

    if (!payload.id || !payload.id.length) return

    purchaseBook.mutate(
      { ...payload },
      {
        onSuccess() {
          onRefetchBook()
          toast.addToast('success', 'Berhasil membeli buku.')
        },
        onError() {
          toast.addToast('success', 'Gagal membeli buku. Coba lagi.')
        },
      }
    )
  }

  return (
    <section className="py-10 bg-dark-100">
      <div className="mx-auto max-w-[565px] px-4 bg-dark-200 p-6 rounded-xl">
        <h1 className="text-gold-100 font-gotham text-2xl mb-4">
          Anda tidak punya akses untuk Bab ini
        </h1>
        <div className="flex space-x-2 items-center">
          <Button onClick={() => handlePurchaseBook('book')}>Beli Buku</Button>
          <Button onClick={() => handlePurchaseBook('chapter')}>
            Beli Bab Ini
          </Button>
        </div>
      </div>
    </section>
  )
}
