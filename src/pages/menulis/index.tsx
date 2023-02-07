import WritingHomepageTemplate from '@/components/templates/writing/WritingHomepage'
import { useMyBooks } from '@/services/my-book/query'
import { APP_NAME } from '@/utils/constants'
import Head from 'next/head'
import React, { useEffect } from 'react'

const WritingPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useMyBooks()

  useEffect(() => {
    if (!document) return
    document.body.classList.add('writing-page')
  }, [])
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Menulis`}</title>
      </Head>
      <WritingHomepageTemplate books={data ?? []} />
    </>
  )
}

export default WritingPage
