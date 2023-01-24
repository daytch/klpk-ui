import { httpRequest } from '@/utils/httpRequest'
import {
  LoginPayloadProps,
  RegisterPayloadProps,
  VerifyPayloadProps,
  LoginDataModel,
} from '@/interfaces/auth'

const apiService = httpRequest()

export function login(payload: LoginPayloadProps) {
  return apiService.post<LoginDataModel>('/auth/login', {
    ...payload,
  })
}

export function loginGoogle(token: string) {
  return apiService.post<LoginDataModel>('/auth/login-google', {
    token,
  })
}

export function registerPost(payload: RegisterPayloadProps) {
  return apiService.post<VerifyPayloadProps>('/auth/register', {
    ...payload,
  })
}

export function verifyRegister(payload: VerifyPayloadProps) {
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
