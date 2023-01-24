import ForgotPasswordTemplate from '@/components/templates/auth/ForgotPasswordTemplate'
import Head from 'next/head'
import React from 'react'

const ForgotPasswordPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Lupa Password</title>
      </Head>
      <ForgotPasswordTemplate />
    </div>
  )
}

export default ForgotPasswordPage
