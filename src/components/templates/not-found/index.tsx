import React from 'react'
import GeneralLayout from '@/components/layouts/general'
import NoDataCard from '@/components/organisms/cards/NoDataCard'

export default function NotFoundTemplate() {
  return (
    <GeneralLayout>
      <section className="container py-12 h-full">
        <div className="bg-dark-300 px-6 py-8 rounded-xl h-full">
          <NoDataCard text="Page tidak ditemukan." />
        </div>
      </section>
    </GeneralLayout>
  )
}
