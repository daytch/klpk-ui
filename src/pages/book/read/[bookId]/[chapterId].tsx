import React from 'react'
import { APP_NAME } from '@/utils/constants'
import ReadBookTemplate from '@/components/templates/book/ReadBookTemplate'

export default function ReadBookPage() {
  return (
    <>
      <title>{`${APP_NAME} | Membaca Buku Buku`}</title>
      <ReadBookTemplate />
    </>
  )
}
