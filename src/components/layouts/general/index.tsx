import React from 'react'
import dynamic from 'next/dynamic'
import Footer from '@/components/organisms/Footer'
const Header = dynamic(() => import('@/components/organisms/Header'), {
  ssr: false,
})

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
