import Login from '@/modules/auth/components/Login'
import Head from 'next/head'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Login</title>
      </Head>
      <Login />
    </div>
  )
}

export default LoginPage
