import React, { Fragment } from 'react'
import Head from 'next/head'
import { APP_NAME } from '@/utils/constants'
import MyLibrariesTemplate from '@/components/templates/bacaan-saya'

export default function MyLibrariesPage() {
  return (
    <Fragment>
      <Head>
        <title>{`${APP_NAME} | Profil Buku`}</title>
      </Head>
      <MyLibrariesTemplate />
    </Fragment>
  )
}
