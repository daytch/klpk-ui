import Head from 'next/head'
import React from 'react'

const AboutKLPLApps = () => {
  return (
    <>
      <Head>
        <title>Tentang Aplikasi</title>
      </Head>
      <section>
        <div className="container space-y-6 py-10">
          <div className="leading-[180%]">
            <h1 className="text-4xl font-bold text-gold-200 mb-3">
              About this app
            </h1>
          </div>
          <div className="leading-[180%]">
            <h2 className="text-2xl font-bold text-gold-200 mb-3">
              KLPK - A Story Reading App, Read Stories, Novels, Ebooks and Write
              Stories
            </h2>
            <p className="text-base text-kplkWhite mb-2">
              KLPK. Lahir dari sebuah komunitas dari segala macam usia yang
              selalu ingin belajar menulis.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Menjadi member di KLPK App mendekatkan kamu dengan banyak penulis.
              Kamu tidak terbatas menjadi pembaca tapi penulis juga.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Membaca cerita original yang ditulis resmi oleh penulisnya
              langsung. Di KLPK kamu akan menemukan berbagai macam penulis yang
              memiliki ciri khas menulis tersendiri. Membaca cerita di KLPK akan
              meningkatkan keinginan kamu untuk menulis. Tidak hanya itu, sumber
              bacaan di KLPK akan memberikan inspirasi bagi kamu di kehidupan
              nyata.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Menulis cerita original di KLPK sangatlah mudah. Kamu hanya perlu
              menuangkan semua inspirasi yang ada didalam pikiranmu dalam
              kalimat dan merangkainya menjadi sebuah cerita atau kamu dapat
              menulis informasi atau fakta-fakta yang akan menambah informasi
              bagi para pembaca di KLPK. Kamu cukup membuat akun dan kemudian
              mengaktifkan verifikasi akun kamu agar kamu dapat mengaktifkan
              fitur withdraw. Setelah itu kamu sudah siap menulis di menu
              menulis.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Di KLPK ceritamu tidak hanya menjadi cerita yang tersimpan untukmu
              saja. Tapi KLPK memberikan kesempatan agar ceritamu dapat dibaca
              oleh banyak orang dan banyak orang akan menjadi saksi perjalanan
              menulis kamu.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Fitur yang akan kamu dapatkan di KLPK:
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">
                Mencari cerita dan penulis
              </li>
              <li className="text-base text-kplkWhite">
                Mengikuti penulis yang kamu sukai gaya ceritanya
              </li>
              <li className="text-base text-kplkWhite">
                Diikuti oleh pembaca kamu yang menyukai ceritamu
              </li>
              <li className="text-base text-kplkWhite">
                Terhubung dengan banyak penulis
              </li>
              <li className="text-base text-kplkWhite">
                Mendapatkan notifikasi ketika penulis kamu menerbitkan buku
                terbaru
              </li>
              <li className="text-base text-kplkWhite">
                Mendapatkan notifikasi ketika buku kamu di beli oleh pembaca
              </li>
              <li className="text-base text-kplkWhite">
                Mendapatkan notifikasi ketika top up coins ataupun withdraw coin
              </li>
              <li className="text-base text-kplkWhite">
                Tentunya kamu dapat menulis dan membaca disini
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutKLPLApps
