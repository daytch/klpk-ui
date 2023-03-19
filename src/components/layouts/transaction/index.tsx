import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { formatNumberWithCommas, joinClass } from '@/utils/common'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import CointOption from '@/components/molecules/CointOption'
import { MIDTRANS_CLIENT_ID } from '@/utils/constants'
import { useGetCoinPackages } from '@/services/payment/query'
import Spinner from '@/components/molecules/Spinner'
import { useCreateTopup } from '@/services/payment/mutation'
import { CoinPackageDataModel, TopupResponse } from '@/interfaces/payment'
import { useToast } from '@/hooks/useToast'
import SuccessDialog from '@/components/organisms/dialogs/SuccessDialog'
import { useGetMe } from '@/services/profile/query'
import WithdrawDialog from '@/components/organisms/dialogs/WithdrawDialog'

interface TransactionLayoutProps {
  children: React.ReactNode
}

const tabs = [
  {
    text: 'Riwayat Transaksi',
    type: 'transaksi',
  },
  {
    text: 'Riwayat Withdaw',
    type: 'withdaw',
  },
  {
    text: 'Riwayat Penjualan',
    type: 'penjualan',
  },
]

const TransactionLayout: React.FC<TransactionLayoutProps> = ({ children }) => {
  const { data, isLoading } = useGetCoinPackages()
  const { data: me, isLoading: isLoadingMe, refetch: refetchMe } = useGetMe()
  const createTopup = useCreateTopup()
  const [selectedCoint, setSelectedCoint] = useState<CoinPackageDataModel>()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showWithdrawModal, setShowWithDrawModal] = useState(false)
  const { query, push, pathname } = useRouter()
  const toast = useToast()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (
      String(query?.order_id).length > 0 &&
      Number(query?.status_code) === 200
    ) {
      setShowSuccessModal(true)
      refetchMe()
    }
  }, [query?.order_id, query?.status_code])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const snapSrcUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'
    const midtransClientId = MIDTRANS_CLIENT_ID

    const script = document.createElement('script')
    script.src = snapSrcUrl
    script.setAttribute('data-client-key', midtransClientId)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleSelectTab = (tab: string) => {
    push(
      {
        pathname,
        query: {
          transactionTab: tab,
        },
      },
      undefined,
      { scroll: false }
    )
  }

  const handleCreateTopup = () => {
    if (!selectedCoint || typeof window === undefined) return
    createTopup.mutate(
      { coinPackageId: selectedCoint.id },
      {
        onSuccess(data: TopupResponse) {
          window.snap.pay(data.paymentToken)
        },
        onError() {
          toast.addToast('error', 'Gagal memproses topup. Coba lagi.')
        },
      }
    )
  }

  console.log(me?.coinBalance)

  return (
    <>
      <Header />
      <main>
        <section className="container mt-9 mb-6">
          <div className="px-6 pt-5 pb-9 bg-dark-300 rounded-xl font-gotham">
            <h2 className="text-white text-base font-thin mb-4">Total Coins</h2>
            <div className="flex justify-between flex-wrap space-x-4 mb-8">
              <div className="flex items-center space-x-4">
                <Image
                  src="/assets/icons/icon-coint-02.png"
                  alt=""
                  width={44}
                  height={44}
                />
                <p className="text-white font-normal text-2xl leading-6">
                  {formatNumberWithCommas(me?.coinBalance ?? 0)} Coins
                </p>
              </div>
              <Button
                onClick={() => setShowWithDrawModal(true)}
                type="button"
                variant="primary"
                isFullWidth={false}
              >
                Withdraw
              </Button>
              <WithdrawDialog
                coinBalance={me?.coinBalance ?? 0}
                isOpen={showWithdrawModal}
                onClose={() => setShowWithDrawModal(false)}
                onSuccessWithdraw={() => {
                  refetchMe()
                  setShowWithDrawModal(false)
                  setShowSuccessModal(true)
                }}
              />
            </div>
            <hr className="border-gold-300 mb-6" />
            <div className="flex flex-nowrap overflow-auto space-x-[42px] scrollbar pb-2 mb-10">
              {isLoading || (isLoadingMe && <Spinner />)}
              {data !== undefined &&
                data.map((option, index) => (
                  <div key={index} className="grow shrink-0">
                    <CointOption
                      coint={option}
                      onChange={(value) => setSelectedCoint(value)}
                      id={`coint-option-${index}`}
                      checked={option === selectedCoint}
                    />
                  </div>
                ))}
            </div>
            <div className="text-center">
              <Button
                onClick={handleCreateTopup}
                disabled={selectedCoint === undefined || createTopup.isLoading}
                variant="primary"
                type="button"
                isFullWidth={false}
              >
                {createTopup.isLoading ? 'Memproses..' : 'Lanjut Pembayaran'}
              </Button>
            </div>
          </div>
        </section>
        <section className="container mb-12">
          <div className="px-6 pt-5 pb-9 bg-dark-300 rounded-xl font-gotham">
            <div className="flex items-center justify-center gap-8 flex-wrap mb-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectTab(tab.type)}
                  className={joinClass(
                    'py-2 px-3 rounded-lg font-thin text-xs',
                    query?.transactionTab === tab.type
                      ? 'bg-dark-100 text-gold-200'
                      : 'text-white bg-transparent'
                  )}
                >
                  {tab.text}
                </button>
              ))}
            </div>
            <hr className="border-gold-300 mb-2" />
            {children}
          </div>
        </section>
      </main>
      <SuccessDialog
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          push({
            pathname: '/transaksi/[transactionTab]',
            query: {
              transactionTab: query.transactionTab,
            },
          })
        }}
        onConfirm={() => {
          setShowSuccessModal(false)
          push({
            pathname: '/transaksi/[transactionTab]',
            query: {
              transactionTab: query.transactionTab,
            },
          })
        }}
        message="Topup berhasil."
      />
      <Footer />
    </>
  )
}

export default TransactionLayout
