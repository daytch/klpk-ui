import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import TextField from '@/components/molecules/TextField'
import AuthLayout from '@/components/layouts/auth'
import { useToast } from '@/hooks/useToast'
import { passwordPattern } from '@/utils/regex'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { string, InferType, object, ref } from 'yup'
import {
  useResetPassword,
  useVerifyResetPasswordToken,
} from '@/services/auth/mutation'

const validationSchema = object({
  password: string()
    .required('Password tidak boleh kosong.')
    .matches(
      passwordPattern,
      'Password harus mengandung 8-32 karekter, nomor, alfabet, dan spesial karakter.'
    ),
  confirm_password: string()
    .label('confirm password')
    .required('Konfirm password tidak boleh kosong.')
    .oneOf([ref('password')], 'Password tidak sama.'),
})

const RecoverPasswordTemplate = () => {
  const { mutate } = useResetPassword()
  const router = useRouter()
  const toast = useToast()
  const [validToken, setValidToken] = useState(false)
  const { mutate: validateToken } = useVerifyResetPasswordToken()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof validationSchema>>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  useEffect(() => {
    if (!router?.query?.token) return
    validateToken(String(router?.query?.token ?? ''), {
      onSuccess() {
        setValidToken(true)
      },
      onError() {
        setValidToken(false)
      },
    })
  }, [router?.query?.token])

  const onChangePassword = (value: InferType<typeof validationSchema>) => {
    const token = router?.query?.token
    if (!token) return
    mutate(
      {
        token: String(token),
        password: value.password,
      },
      {
        onSuccess() {
          toast.addToast('success', 'Berhasil ubah password.')
          router.push('/auth/login')
        },
        onError() {
          toast.addToast('error', 'Gagal ubah password. Silahkan coba lagi.')
        },
      }
    )
  }

  return (
    <AuthLayout>
      <div className="pt-12 pb-24 px-10 md:pr-14 md:pl-0 w-full md:w-[350px]">
        {validToken ? (
          <>
            <p className="text-gold-200 font-bold text-2xl leading-6 mb-8">
              Password Baru
            </p>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onChangePassword)}
              className="space-y-3 mb-6"
            >
              <TextField
                labelProps={{
                  children: 'Password Baru',
                }}
                inputProps={{
                  ...register('password', { required: false }),
                  isInvalid: Boolean(errors?.password?.message),
                  placeholder: 'Password Baru',
                  type: 'password',
                  errormessage: errors?.password?.message,
                }}
              />
              <TextField
                labelProps={{
                  children: 'Konfirm Password Baru',
                }}
                inputProps={{
                  ...register('confirm_password', { required: false }),
                  isInvalid: Boolean(errors?.confirm_password?.message),
                  placeholder: 'Konfirm Password Baru',
                  type: 'password',
                  errormessage: errors?.confirm_password?.message,
                }}
              />

              <Button type="submit">Ubah Password</Button>
            </form>
          </>
        ) : (
          <>
            <p className="text-gold-200 font-bold text-lg leading-6 mb-3">
              Token sudah kadaluarsa. Silahkan buat request ubah password baru.
            </p>
            <Link
              to="/auth/forgot-password"
              className="inline-flex items-center justify-center w-full px-4 py-[10px] font-sfpro font-normal min-h-[20px] rounded-lg text-base bg-gold-200 text-dark-300 hover:bg-gold-200/95 focus:ring-2 focus:ring-gold-200 hover:text-dark-300/95"
            >
              Ubah Password
            </Link>
          </>
        )}
      </div>
    </AuthLayout>
  )
}

export default RecoverPasswordTemplate
