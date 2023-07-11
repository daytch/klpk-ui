import React, { Fragment } from 'react'
import MyLibrariesTemplate from '@/components/templates/bacaan-saya'
import { useGetMyLibraries } from '@/services/library/query'
import PageHead from '@/components/templates/seo/PageHead'

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
      <PageHead />
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
