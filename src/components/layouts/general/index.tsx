import React from 'react'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'

interface GeneralLayoutProps {
  children: React.ReactNode
  headerMode?: 'default' | 'write' | 'create'
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({
  children,
  headerMode = 'default',
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header mode={headerMode} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default GeneralLayout
