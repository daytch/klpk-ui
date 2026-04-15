import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.komunitaspatrickkellan.com/api'

// Axios instance khusus server-side (getServerSideProps)
// Tidak pakai auth token karena public endpoints tidak butuh auth
export const serverApiService = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

/** Strip HTML tags dan truncate untuk meta description */
export function toMetaDescription(html: string, maxLength = 160): string {
  const stripped = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return stripped.length > maxLength ? stripped.slice(0, maxLength - 3) + '...' : stripped
}
