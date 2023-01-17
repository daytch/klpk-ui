import { ILoginToken } from '@/modules/auth/interface'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState extends ILoginToken {
  login: (auth: ILoginToken) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      refreshToken: '',
      token: '',
      expirationDate: '',
      login: (auth: ILoginToken) =>
        set({
          refreshToken: auth.refreshToken,
          token: auth.token,
          expirationDate: auth.expirationDate,
        }),
      logout: () => set({ refreshToken: '', token: '', expirationDate: '' }),
    }),
    {
      name: 'auth-state',
    }
  )
)
