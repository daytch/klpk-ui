import Register from '@/modules/auth/components/Register'
import Head from 'next/head'
import React from 'react'

const RegisterPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Register</title>
      </Head>
      <Register />
    </div>
  )
}

export default RegisterPage
