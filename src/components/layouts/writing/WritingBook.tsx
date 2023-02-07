import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import React from 'react'

interface WritingBookLayoutProps {
  children: React.ReactNode
}

const WritingBookLayout: React.FC<WritingBookLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default WritingBookLayout
