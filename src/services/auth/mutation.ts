import { useMutation } from '@tanstack/react-query'
import {
  login,
  recoverPassword,
  registerPost,
  resendVerifyRegister,
  resetPassword,
  verifyRegister,
  verifyResetPasswordToken,
} from './api'
import {
  LoginPayloadProps,
  RegisterPayloadProps,
  VerifyPayloadProps,
} from '@/interfaces/auth'
import { AxiosError, AxiosResponse } from 'axios'

export function useLogin() {
  return useMutation(['login'], (payload: LoginPayloadProps) => login(payload))
}

export function useRegister() {
  return useMutation<
    AxiosResponse<VerifyPayloadProps, any>,
    AxiosError<{ errorMessage: string }>,
    RegisterPayloadProps,
    unknown
  >(['login'], (payload: RegisterPayloadProps) => registerPost(payload))
}

export function useRegisterVerify() {
  return useMutation(['verify-register'], (payload: VerifyPayloadProps) =>
    verifyRegister(payload)
  )
}

export function useResendRegisterVerify() {
  return useMutation(
    ['resend-verify-register'],
    (payload: VerifyPayloadProps) => resendVerifyRegister(payload)
  )
}

export function useRecoverPassword() {
  return useMutation(['recover-password'], (username: string) =>
    recoverPassword(username)
  )
}

export function useResetPassword() {
  return useMutation(
    ['reset-password'],
    (payload: { token: string; password: string }) => resetPassword(payload)
  )
}

export function useVerifyResetPasswordToken() {
  return useMutation(['verify-reset-password-token'], (token: string) =>
    verifyResetPasswordToken(token)
  )
}
