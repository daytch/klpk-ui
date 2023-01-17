import { useMutation } from '@tanstack/react-query'
import {
  ILoginPayload,
  IRegisterPayload,
  IVerificationPayload,
} from '../interface'
import {
  login,
  recoverPassword,
  registerPost,
  resetPassword,
  verifyRegister,
  verifyResetPasswordToken,
} from './api'

export function useLogin() {
  return useMutation(['login'], (payload: ILoginPayload) => login(payload))
}

export function useRegister() {
  return useMutation(['login'], (payload: IRegisterPayload) =>
    registerPost(payload)
  )
}

export function useRegisterVerify() {
  return useMutation(['verify-register'], (payload: IVerificationPayload) =>
    verifyRegister(payload)
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
