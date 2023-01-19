export interface ILoginToken {
  token: string
  refreshToken: string
  expirationDate: string
}

export interface ILoginPayload {
  username: string
  password: string
}

export interface IRegisterPayload {
  fullName?: string
  username?: string
  phone?: string
  email?: string
  password?: string
}

export interface IRegisterResponse {
  token: string
  expirationDate: string
}

export interface IVerificationPayload {
  token: string
  code: string
}
