import { apiService } from '@/utils/httpRequest'
import {
  LoginPayloadProps,
  RegisterPayloadProps,
  VerifyPayloadProps,
  LoginDataModel,
} from '@/interfaces/auth'

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

export async function getRefreshToken(token: string) {
  try {
    const response = await apiService.post('/auth/refresh-token', {
      token,
    })
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export function resendVerifyRegister(payload: VerifyPayloadProps) {
  return apiService.post('/auth/resendverification', {
    ...payload,
  })
}
