import React, { Fragment } from 'react'
import NotFoundTemplate from '@/components/templates/not-found'
import PageHead from '@/components/templates/seo/PageHead'

export default function NotFoundPage() {
  return (
    <Fragment>
      <PageHead />
      <NotFoundTemplate />
    </Fragment>
  )
}
