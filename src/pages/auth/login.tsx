import LoginTemplate from '@/components/templates/auth/LoginTemplate'
import Head from 'next/head'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Login</title>
      </Head>
      <LoginTemplate />
    </div>
  )
}

export default LoginPage
