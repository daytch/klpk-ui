import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import React from 'react'

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
