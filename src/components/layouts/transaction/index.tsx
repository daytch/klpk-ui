import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { formatNumberWithCommas, joinClass } from '@/utils/common'
import Footer from '@/components/organisms/Footer'
import Button from '@/components/atoms/Button'
import CointOption, {
  CointPriceDataModel,
} from '@/components/molecules/CointOption'
import { MIDTRANS_CLIENT_ID } from '@/utils/constants'

const Header = dynamic(() => import('@/components/organisms/Header'), {
  ssr: false,
})

interface TransactionLayoutProps {
  children: React.ReactNode
}

const dummyCointOptions: CointPriceDataModel[] = [
  {
    amount: 150,
    price: 15000,
  },
  {
    amount: 250,
    price: 25000,
  },
  {
    amount: 500,
    price: 50000,
  },
  {
    amount: 1000,
    price: 100000,
  },
]

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
  const [selectedCoint, setSelectedCoint] = useState<CointPriceDataModel>()
  const { query, push, pathname } = useRouter()

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
                  {formatNumberWithCommas(100438)} Coins
                </p>
              </div>
              <Button type="button" variant="primary" isFullWidth={false}>
                Withdraw
              </Button>
            </div>
            <hr className="border-gold-300 mb-6" />
            <div className="flex flex-nowrap overflow-auto space-x-[42px] scrollbar pb-2 mb-10">
              {dummyCointOptions.map((option, index) => (
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
              <Button variant="primary" type="button" isFullWidth={false}>
                Lanjut Pembayaran
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
      <Footer />
    </>
  )
}

export default TransactionLayout
