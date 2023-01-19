import Link from '@/common/components/general/Link'
import AuthLayout from '@/common/layouts/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRegisterVerify } from '../services/mutation'

const Verify = () => {
  const router = useRouter()
  const { mutate } = useRegisterVerify()
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (!!router?.query?.code && !!router?.query?.token) {
      mutate(
        {
          token: String(router?.query?.token ?? ''),
          code: String(router?.query?.code ?? ''),
        },
        {
          onSuccess() {
            setSuccess(true)
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
      </div>
    </AuthLayout>
  )
}

export default Verify
