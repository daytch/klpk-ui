import React, { useEffect, useState } from 'react'
// import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { joinClass } from '@/utils/common'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import { useGetMe } from '@/services/profile/query'
const SuccessDialog = dynamic(
  () => import('@/components/organisms/dialogs/SuccessDialog')
)

interface TransactionLayoutProps {
  activeTab: 'books' | 'authors'
  children: React.ReactNode
}

const SearchLayout: React.FC<TransactionLayoutProps> = ({
  activeTab,
  children,
}) => {
  const { refetch: refetchMe } = useGetMe()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const { query, asPath } = useRouter()
  const { keyword, order_id, status_code } = query

  const tabs = [
    {
      text: 'Buku',
      url: keyword ? `/search/books?keyword=${keyword}` : '/search/books',
      tab: 'books',
    },
    {
      text: 'Penulis',
      url: keyword
        ? `/search/authors?keyword=${keyword}`
        : '/search/authors',
      tab: 'authors',
    },
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (String(order_id).length > 0 && Number(status_code) === 200) {
      setSuccessMessage('Topup berhasil.')
      setShowSuccessModal(true)
      refetchMe()
    }
  }, [query?.order_id, query?.status_code])

  const handleSelectTab = async (url: string) => {
    const Router = (await import('next/router')).default
    Router.push(url, undefined, { scroll: false })
  }

  return (
    <>
      <Header />
      <main>
        <section className="container mb-12 mt-9">
          <div className="px-6 pt-5 pb-9 bg-dark-300 rounded-xl font-gotham">
            <div className="flex items-center justify-center gap-8 flex-wrap mb-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectTab(tab.url)}
                  className={joinClass(
                    'py-2 px-3 rounded-lg font-thin text-xs',
                    activeTab === tab.tab
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
          setSuccessMessage('')
          setShowSuccessModal(false)
          handleSelectTab(asPath)
        }}
        onConfirm={() => {
          setSuccessMessage('')
          setShowSuccessModal(false)
          handleSelectTab(asPath)
        }}
        message={successMessage ?? 'Berhasil.'}
      />
      <Footer />
    </>
  )
}

export default SearchLayout
