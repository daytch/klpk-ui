import axios from 'axios'

// Axios instance khusus server-side (getServerSideProps)
// Menggunakan NEXT_PUBLIC_API_URL yang tersedia di server runtime Next.js
// Tidak pakai auth token karena public endpoints tidak butuh auth
export const serverApiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
