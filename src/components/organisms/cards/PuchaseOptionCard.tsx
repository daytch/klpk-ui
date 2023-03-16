import Button from '@/components/atoms/Button'
import React from 'react'

export default function PuchaseOptionCard() {
  return (
    <section className="py-10 bg-dark-100">
      <div className="mx-auto max-w-[565px] px-4 bg-dark-200 p-6 rounded-xl">
        <h1 className="text-gold-100 font-gotham text-2xl mb-4">
          Anda tidak punya akses untuk Bab ini
        </h1>
        <div className="flex space-x-2 items-center">
          <Button>Beli Buku</Button>
          <Button>Beli Bab Ini</Button>
        </div>
      </div>
    </section>
  )
}
