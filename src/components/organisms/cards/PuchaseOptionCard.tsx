import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Button from '@/components/atoms/Button'
import { usePurchaseBook } from '@/services/book/mutation'
import { useToast } from '@/hooks/useToast'
import SuccessIcon from '@/assets/icons/success.svg'
import CoinIcon from '@/assets/icons/coin.svg'

const ActionModal = dynamic(
  () => import('@/components/organisms/dialogs/ActionDialog')
)

interface PuchaseOptionCardProps {
  bookId: string
  chapterId: string
}

export default function PuchaseOptionCard({
  bookId,
  chapterId,
}: PuchaseOptionCardProps) {
  const [successPurchaseBook, setSuccessPurchaseBook] = useState(false)
  const [notEnoughCoin, setNotEnoughCoin] = useState(false)
  const purchaseBook = usePurchaseBook()
  const toast = useToast()

  const handleConfirmSuccessPayment = async () => {
    const Router = (await import('next/router')).default
    setSuccessPurchaseBook(false)
    setNotEnoughCoin(false)
    Router.reload()
  }

  const handleConfirmTopUp = async () => {
    const Router = (await import('next/router')).default
    setSuccessPurchaseBook(false)
    setNotEnoughCoin(false)
    Router.push('/transaksi/transaksi')
  }

  const handleCloseModal = () => {
    setSuccessPurchaseBook(false)
    setNotEnoughCoin(false)
  }

  const handlePurchaseBook = async (type: 'book' | 'chapter') => {
    setSuccessPurchaseBook(false)
    setNotEnoughCoin(false)
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
          setSuccessPurchaseBook(true)
        },
        onError(error) {
          const typeWording = type === 'book' ? 'buku' : 'bab'
          let errorMessage = `Gagal membeli ${typeWording}. Coba lagi.`

          if (error?.response?.data?.errorCode.includes('booknotcompleted')) {
            errorMessage = 'Gagal membeli buku. Status buku belum selesai.'
          } else if (
            error?.response?.data?.errorMessage.includes(
              'Insufficient coin balance'
            )
          ) {
            setNotEnoughCoin(true)
          } else {
            toast.addToast('error', errorMessage)
          }
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
      {/* Success Purchase */}
      <ActionModal
        icon={SuccessIcon}
        isOpen={successPurchaseBook}
        title="Berhasil"
        message="Berhasil di bayar!"
        buttonText="Mengerti"
        onConfirm={handleConfirmSuccessPayment}
        onClose={handleCloseModal}
      />

      {/* Not Enough Coin */}
      <ActionModal
        icon={CoinIcon}
        isOpen={notEnoughCoin}
        title="Oops..."
        message="Koin anda tidak mencukupi"
        buttonText="Topup"
        onConfirm={handleConfirmTopUp}
        onClose={handleCloseModal}
      />
    </section>
  )
}
