import axios from 'axios'
import { BASE_API_URL } from './constants'

// Axios instance khusus server-side (getServerSideProps)
// Tidak pakai auth token karena public endpoints tidak butuh auth
export const serverApiService = axios.create({
  baseURL: BASE_API_URL,
})
