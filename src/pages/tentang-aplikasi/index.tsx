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
              Tentang Aplikasi
            </h1>
          </div>
          <div className="leading-[180%]">
            <p className="text-base text-kplkWhite mb-2">
              KLPK - A reading and writing application for fiction, science,
              parenting, education, lifestyle, etc.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              KLPK lahir dari sebuah komunitas literasi mencakup segala usia
              yang selalu ingin belajar menulis.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Menjadi anggota di KLPK mendekatkan kamu dengan banyak penulis.
              Kamu tidak terbatas menjadi pembaca, melainkan bisa sebagai
              penulis juga.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Kamu dapat membaca cerita asli yang ditulis oleh penulisnya
              langsung. Di KLPK, kamu akan menemukan berbagai macam penulis yang
              memiliki ciri khas menulis tersendiri.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Membaca cerita di KLPK akan meningkatkan keinginan kamu untuk
              menulis. Tidak hanya itu, sumber bacaan di KLPK akan memberikan
              inspirasi bagi kamu di kehidupan nyata.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Menulis cerita asli di KLPK sangatlah mudah. Kamu hanya perlu
              menuangkan semua inspirasi dalam pikiranmu dalam bentuk kalimat
              dan merangkainya menjadi sebuah cerita, atau kamu dapat menulis
              informasi atau fakta-fakta yang akan menambah informasi dan
              pengetahuan bagi para pembaca di KLPK.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Di KLPK, ceritamu tidak hanya menjadi kisah yang tersimpan untuk
              diri sendiri. KLPK memberikan kesempatan agar ceritamu dapat
              dibaca oleh banyak orang dan mereka akan menjadi saksi perjalanan
              menulismu.
            </p>
            <p className="text-base text-kplkWhite mb-2">
              Kamu cukup membuat akun dan kemudian mengaktifkan verifikasi akun
              agar dapat mengaktifkan fitur penulis. Setelah itu kamu sudah siap
              menulis di menu menulis.
            </p>
            <p className="text-base text-kplkWhite">
              Fitur yang akan kamu dapatkan di KLPK:
            </p>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-base text-kplkWhite">
                Menulis dan membaca berbagai genre
              </li>
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
                Mendapatkan notifikasi ketika isi ulang koin atau penarikan koin
              </li>
              <li className="text-base text-kplkWhite">
                Penulis dan buku best seller
              </li>
              <li className="text-base text-kplkWhite">Buku pilihan editor</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutKLPLApps
