import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import React from 'react'

interface GeneralLayoutProps {
  children: React.ReactNode
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default GeneralLayout
