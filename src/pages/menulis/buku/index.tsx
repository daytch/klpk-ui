import React from 'react'
import Head from 'next/head'
import WritingBookLayout from '@/components/layouts/writing/WritingBook'
import { APP_NAME } from '@/utils/constants'
import WritingBookTemplate from '@/components/templates/writing/WritingBook'

const StartWritingBookPage = () => {
  return (
    <>
      <Head>
        <title>{`${APP_NAME} | Menulis`}</title>
      </Head>
      <WritingBookLayout>
        <WritingBookTemplate />
      </WritingBookLayout>
    </>
  )
}

export default StartWritingBookPage
