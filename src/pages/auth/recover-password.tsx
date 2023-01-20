import RecoverPasswordTemplate from '@/components/templates/auth/RecoverPasswordTemplate'
import Head from 'next/head'
import React from 'react'

const RecoverPasswordPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Buat Password Baru</title>
      </Head>
      <RecoverPasswordTemplate />
    </div>
  )
}

export default RecoverPasswordPage
