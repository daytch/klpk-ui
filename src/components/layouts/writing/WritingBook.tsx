import React from 'react'
import dynamic from 'next/dynamic'
import Footer from '@/components/organisms/Footer'

const Header = dynamic(() => import('@/components/organisms/Header'), {
  ssr: false,
})

interface WritingBookLayoutProps {
  children: React.ReactNode
  headerMode: 'write' | 'create'
}

const WritingBookLayout: React.FC<WritingBookLayoutProps> = ({
  children,
  headerMode,
}) => {
  return (
    <>
      <Header mode={headerMode} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default WritingBookLayout
