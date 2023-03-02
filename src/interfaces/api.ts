export interface APIErrorResponseDataModel {
  errorMessage: string
  errorCode: string
}

export interface APIBaseParams {
  limit?: number
  page?: number
}
