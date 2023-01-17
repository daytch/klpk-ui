import RecoverPassword from '@/modules/auth/components/RecoverPassword'
import Head from 'next/head'
import React from 'react'

const RecoverPasswordPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Buat Password Baru</title>
      </Head>
      <RecoverPassword />
    </div>
  )
}

export default RecoverPasswordPage
