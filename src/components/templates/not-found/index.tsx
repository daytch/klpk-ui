import React from 'react'
import GeneralLayout from '@/components/layouts/general'
import NoDataCard from '@/components/organisms/cards/NoDataCard'
import Link from '@/components/atoms/Link'
import Button from '@/components/atoms/Button'

export default function NotFoundTemplate() {
  return (
    <GeneralLayout>
      <section className="container py-12 h-full">
        <div className="bg-dark-300 px-6 py-8 rounded-xl h-full text-center">
          <NoDataCard text="Page tidak ditemukan." />
          <Link to="/">
            <Button isFullWidth={false}>Kembali ke Homepage</Button>
          </Link>
        </div>
      </section>
    </GeneralLayout>
  )
}
