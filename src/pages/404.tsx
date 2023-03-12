import React, { Fragment } from 'react'
import Head from 'next/head'
import { APP_NAME } from '@/utils/constants'
import NotFoundTemplate from '@/components/templates/not-found'

export default function NotFoundPage() {
  return (
    <Fragment>
      <Head>
        <title>{`${APP_NAME} | Profil Buku`}</title>
      </Head>
      <NotFoundTemplate />
    </Fragment>
  )
}
