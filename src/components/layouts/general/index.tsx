import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import React from 'react'

interface GeneralLayoutProps {
  children: React.ReactNode
  headerMode?: 'default' | 'write' | 'create'
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({
  children,
  headerMode = 'default',
}) => {
  return (
    <>
      <Header mode={headerMode} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default GeneralLayout
