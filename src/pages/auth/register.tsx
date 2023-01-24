import RegisterTemplate from '@/components/templates/auth/RegisterTemplate'
import Head from 'next/head'
import React from 'react'

const RegisterPage = () => {
  return (
    <div>
      <Head>
        <title>KLPK Register</title>
      </Head>
      <RegisterTemplate />
    </div>
  )
}

export default RegisterPage
