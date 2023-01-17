import { httpRequest } from '@/utils/httpRequest'
import {
  ILoginPayload,
  ILoginToken,
  IRegisterPayload,
  IRegisterResponse,
  IVerificationPayload,
} from '../interface'

const apiService = httpRequest()

export function login(payload: ILoginPayload) {
  return apiService.post<ILoginToken>('/auth/login', {
    ...payload,
  })
}

export function loginGoogle(token: string) {
  return apiService.post<ILoginToken>('/auth/login-google', {
    token,
  })
}

export function registerPost(payload: IRegisterPayload) {
  return apiService.post<IRegisterResponse>('/auth/register', {
    ...payload,
  })
}

export function verifyRegister(payload: IVerificationPayload) {
  return apiService.post('/auth/verify', {
    ...payload,
  })
}

export function recoverPassword(username: string) {
  return apiService.post('/auth/recover-password', {
    username,
  })
}

export function resetPassword(payload: { token: string; password: string }) {
  return apiService.post('/auth/reset-password', {
    ...payload,
  })
}

export function verifyResetPasswordToken(token: string) {
  return apiService.post('/auth/verify-reset-password', {
    token,
  })
}
