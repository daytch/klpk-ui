export interface LoginPayloadProps {
  username: string
  password: string
}

export interface LoginDataModel {
  token: string
  refreshToken: string
  expirationDate: string
}

export interface RegisterPayloadProps {
  fullName: string
  username: string
  phone: string
  email: string
  password: string
}

export interface VerifyPayloadProps {
  token: string
  code: string
}
