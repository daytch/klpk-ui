import React, { Fragment } from 'react'
import Head from 'next/head'
import { APP_NAME } from '@/utils/constants'
import ProfileBookTemplate from '@/components/templates/book/ProfileBookTemplate'

export default function ProfileBookPage() {
  return (
    <Fragment>
      <Head>
        <title>{`${APP_NAME} | Profil Buku`}</title>
      </Head>
      <ProfileBookTemplate />
    </Fragment>
  )
}
