import React, { Fragment } from 'react'
import Head from 'next/head'
import { APP_NAME } from '@/utils/constants'
import MyLibrariesTemplate from '@/components/templates/bacaan-saya'
import { useGetMyLibraries } from '@/services/library/query'

export default function MyLibrariesPage() {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetMyLibraries({
      params: {
        limit: 10,
      },
      pageParam: 1,
      enabled: true,
    })

  return (
    <Fragment>
      <Head>
        <title>{`${APP_NAME} | Profil Buku`}</title>
      </Head>
      <MyLibrariesTemplate
        isLoading={isLoading}
        isError={isError}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        pagesBook={data}
      />
    </Fragment>
  )
}
