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
  isCompleteBook: boolean
  onSuccessPurchase: () => void
}

export default function PuchaseOptionCard({
  bookId,
  chapterId,
  onSuccessPurchase,
  isCompleteBook,
}: PuchaseOptionCardProps) {
  const [successPurchaseBook, setSuccessPurchaseBook] = useState(false)
  const [notEnoughCoin, setNotEnoughCoin] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [purchaseType, setPurchaseType] = useState<
    'book' | 'chapter' | undefined
  >()
  const purchaseBook = usePurchaseBook()
  const toast = useToast()

  const handleConfirmSuccessPayment = async () => {
    onSuccessPurchase()
    setSuccessPurchaseBook(false)
  }

  const handleConfirmTopUp = async () => {
    const Router = (await import('next/router')).default
    setSuccessPurchaseBook(false)
    setNotEnoughCoin(false)
    Router.push('/transaksi')
  }

  const handleCloseModal = () => {
    setSuccessPurchaseBook(false)
    setNotEnoughCoin(false)
    setShowConfirm(false)
  }

  const handlePurchaseBook = async () => {
    if (!purchaseType) return
    const payload: { type: 'book' | 'chapter'; id: string } = {
      type: purchaseType,
      id: '',
    }
    if (purchaseType === 'book') {
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
          const typeWording = purchaseType === 'book' ? 'buku' : 'bab'
          let errorMessage = `Gagal membeli ${typeWording}. Coba lagi.`
          if (
            error?.response?.data?.errorMessage.includes(
              'Insufficient coin balance'
            )
          ) {
            setNotEnoughCoin(true)
            return
          } else if (
            error?.response?.data?.errorCode.includes(
              'bad_request:id_booknotcompleted'
            )
          ) {
            errorMessage = 'Buku tidak dapat dibeli karena belum selesai.'
          }
          toast.addToast('error', errorMessage)
        },
      }
    )

    handleCloseModal()
    setPurchaseType(undefined)
  }

  return (
    <section className="py-10 bg-dark-100">
      <div className="mx-auto max-w-[565px] px-4 bg-dark-200 p-6 rounded-xl">
        <h1 className="text-gold-100 font-gotham text-2xl mb-4">
          Anda tidak punya akses untuk Bab ini
        </h1>
        <div className="flex space-x-2 items-center">
          <Button
            disabled={!isCompleteBook}
            onClick={() => [setPurchaseType('book'), setShowConfirm(true)]}
          >
            Beli Buku
          </Button>
          <Button
            onClick={() => [setPurchaseType('chapter'), setShowConfirm(true)]}
          >
            Beli Bab Ini
          </Button>
        </div>
      </div>
      {/* Success Purchase */}
      <ActionModal
        icon={SuccessIcon}
        isOpen={successPurchaseBook}
        title="Berhasil"
        message="Anda berhasil membeli bab ini, selamat membaca! "
        buttonConfirmText="Mengerti"
        onConfirmAction={handleConfirmSuccessPayment}
        onClose={handleCloseModal}
      />

      {/* Not Enough Coin */}
      <ActionModal
        icon={CoinIcon}
        isOpen={notEnoughCoin}
        title="Oops..."
        message="Koin anda tidak mencukupi"
        buttonConfirmText="Topup"
        onConfirmAction={handleConfirmTopUp}
        onClose={handleCloseModal}
      />

      {/* Confirm */}
      <ActionModal
        icon={SuccessIcon}
        isOpen={showConfirm && purchaseBook !== undefined}
        title={`Apakah anda yakin ingin membeli ${
          purchaseType === 'book' ? 'buku' : 'bab'
        } ini`}
        message={`Jika sudah membeli ${
          purchaseType === 'book' ? 'buku' : 'bab'
        } ini, maka transaksi tidak dapat dibatalkan`}
        buttonConfirmText="Lanjutkan"
        buttonCancelText="Batal"
        onCancelAction={handleCloseModal}
        onConfirmAction={handlePurchaseBook}
        onClose={handleCloseModal}
      />
    </section>
  )
}
