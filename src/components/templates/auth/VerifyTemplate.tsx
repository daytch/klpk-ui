import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from '@/components/atoms/Link'
import { useToast } from '@/hooks/useToast'
import AuthLayout from '@/components/layouts/auth'
import {
  useRegisterVerify,
  useResendRegisterVerify,
} from '@/services/auth/mutation'
import Spinner from '@/components/molecules/Spinner'

function VerifyMessageComponent({
  message,
  code,
  token,
  onRedirect,
}: {
  message: string
  code: string
  token: string
  onRedirect: (path: string) => void
}) {
  const { mutate, isLoading } = useResendRegisterVerify()
  const toast = useToast()
  const isExpired = message.toLowerCase().includes('expired')

  const handleResendVerification = () => {
    if (!isExpired) return
    mutate(
      {
        code,
        token,
      },
      {
        onSuccess() {
          toast.addToast(
            'success',
            'Email verifikasi telah dikirim. Mohon cek email dan lakukan verifikasi kembali.'
          )
          onRedirect('/')
        },
        onError() {
          toast.addToast(
            'error',
            'Gagal mengirimkan email verifikasi. Coba lagi,'
          )
        },
      }
    )
  }

  return (
    <>
      <p className="text-gold-200 font-bold text-2xl leading-6 mb-8">
        {!isExpired
          ? 'Email sudah terverifikasi.'
          : 'Verifikasi sudah  kedaluwarsa. Silakan kirim ulang verifikasi'}
      </p>
      {!isExpired ? (
        <Link
          to="/auth/login"
          className="inline-flex items-center justify-center w-full px-4 py-[10px] font-sfpro font-normal min-h-[20px] rounded-lg text-base bg-gold-200 text-dark-300 hover:bg-gold-200/95 focus:ring-2 focus:ring-gold-200 hover:text-dark-300/95"
        >
          Login Disini
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleResendVerification}
          disabled={isLoading}
          className="inline-flex items-center justify-center w-full px-4 py-[10px] font-sfpro font-normal min-h-[20px] rounded-lg text-base bg-gold-200 text-dark-300 hover:bg-gold-200/95 focus:ring-2 focus:ring-gold-200 hover:text-dark-300/95"
        >
          Kirim Ulang Verifikasi
        </button>
      )}
    </>
  )
}

const VerifyTemplate = () => {
  const router = useRouter()
  const token = String(router?.query?.token || '')
  const code = String(router?.query?.code || '')
  const { mutate, isLoading } = useRegisterVerify()
  const [success, setSuccess] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!!code && !!token) {
      setErrorMessage(null)
      mutate(
        {
          token,
          code,
        },
        {
          onSuccess() {
            setSuccess(true)
          },
          onError(error) {
            setErrorMessage((error as any)?.response?.data?.errorMessage || '')
          },
        }
      )
    }
  }, [router?.query?.code, router?.query?.token])
  return (
    <AuthLayout>
      <div className="py-12 px-10 md:pr-14 md:pl-0 w-full md:w-[350px]">
        {success ? (
          <>
            <p className="text-gold-200 font-bold text-2xl leading-6 mb-8">
              Verifikasi email berhasil.
            </p>
            <Link
              to="/auth/login"
              className="inline-flex items-center justify-center w-full px-4 py-[10px] font-sfpro font-normal min-h-[20px] rounded-lg text-base bg-gold-200 text-dark-300 hover:bg-gold-200/95 focus:ring-2 focus:ring-gold-200 hover:text-dark-300/95"
            >
              Login Disini
            </Link>
          </>
        ) : null}
        {isLoading && <Spinner />}
        {!success && errorMessage !== null && errorMessage?.length > 0 && (
          <VerifyMessageComponent
            message={errorMessage}
            code={code}
            token={token}
            onRedirect={(path) => router.push(path)}
          />
        )}
      </div>
    </AuthLayout>
  )
}

export default VerifyTemplate
