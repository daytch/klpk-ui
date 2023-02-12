type RawAxiosHeaders = Record<string, AxiosHeaderValue | AxiosHeaders>

export {}

type SnapOptions = {
  onSuccess?: () => void
  onError?: () => void
}

declare global {
  interface Window {
    snap: {
      pay: (token: string, options?: SnapOptions) => void
    }
  }
}
