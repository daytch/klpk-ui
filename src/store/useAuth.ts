import { LoginDataModel } from '@/interfaces/auth'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState extends LoginDataModel {
  login: (auth: LoginDataModel) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      refreshToken: '',
      token: '',
      expirationDate: '',
      login: (auth: LoginDataModel) =>
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
