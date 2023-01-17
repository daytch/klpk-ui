import Verify from '@/modules/auth/components/Verify'
import Head from 'next/head'
import React from 'react'

const VerifyPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Verify</title>
      </Head>
      <Verify />
    </div>
  )
}

export default VerifyPage
