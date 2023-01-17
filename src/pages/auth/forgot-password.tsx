import ForgotPassword from '@/modules/auth/components/ForgotPassword'
import Head from 'next/head'
import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Lupa Password</title>
      </Head>
      <ForgotPassword />
    </div>
  )
}

export default ForgotPasswordPage
