import React from 'react'
import WritingBookLayout from '@/components/layouts/writing/WritingBook'
import WritingBookTemplate from '@/components/templates/writing/WritingBook'
import PageHead from '@/components/templates/seo/PageHead'

const StartWritingBookPage = () => {
  return (
    <>
      <PageHead />
      <WritingBookLayout headerMode="create">
        <WritingBookTemplate />
      </WritingBookLayout>
    </>
  )
}

export default StartWritingBookPage
