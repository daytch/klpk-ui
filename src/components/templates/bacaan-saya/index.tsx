import React from 'react'
import GeneralLayout from '@/components/layouts/general'
import NoDataCard from '@/components/organisms/cards/NoDataCard'

export default function MyLibrariesTemplate() {
  return (
    <GeneralLayout>
      <section className="container py-12">
        <div className="bg-dark-300 px-6 py-8 rounded-xl">
          <h1 className="font-bold font-gotham text-2xl text-gold-200 mb-6">
            Bacaan Saya
          </h1>
          <hr className="border border-gold-300" />
          <NoDataCard text="Anda belum membeli buku apapun. Silakan beli buku." />
        </div>
      </section>
    </GeneralLayout>
  )
}
