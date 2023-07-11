import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { string, ref, object, InferType, mixed } from 'yup'

import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import TextField from '@/components/molecules/TextField'
import AuthLayout from '@/components/layouts/auth'
import { useToast } from '@/hooks/useToast'
import { changePhoneNumberFormat } from '@/utils/common'
import {
  alphaNumberPattern,
  passwordPattern,
  phoneNumberPattern,
  usernamePattern,
} from '@/utils/regex'
import { useRegister } from '@/services/auth/mutation'

const validationSchema = object({
  fullName: string().required('Nama tidak boleh kosong.'),
  username: mixed()
    .typeError(
      'Panjang username antara 6 - 32 dan hanya terdiri dari angka, huruf dan Symbol ( . atau _ atau @ )'
    )
    .test(
      'usernameInValid',
      'Panjang username antara 6 - 32 dan hanya terdiri dari angka, huruf dan Symbol ( . atau _ atau @ )',
      (value: any, validationContext) => {
        const { createError } = validationContext
        if (!value || !value.length)
          return createError({ message: 'Username tidak boleh kosong.' })
        const lastCharacter = value[value.length - 1]

        if (!alphaNumberPattern.test(lastCharacter))
          return createError({
            message:
              'Ketika mengadung Symbol (. Atau _ atau @ ) harus mengandung character bukan symbol setelahnya',
          })

        if (!usernamePattern.test(value)) return false

        return true
      }
    ),
  email: string().email().required('Email tidak boleh kosong.'),
  phone: string()
    .required('Nomo HP tidak boleh kosong.')
    .matches(phoneNumberPattern, 'No HP tidak valid.'),
  password: string()
    .required()
    .matches(
      passwordPattern,
      'Password harus terdiri atas huruf, angka, symbol dan lebih dari delapan karakter.'
    ),
  confirm_password: string()
    .label('confirm password')
    .required()
    .oneOf([ref('password')], 'Password tidak sama.'),
})

const RegisterTemplate = () => {
  const { mutate } = useRegister()
  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof validationSchema>>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  const onRegister = (value: InferType<typeof validationSchema>) => {
    mutate(
      {
        username: value?.username ?? '',
        fullName: value?.fullName ?? '',
        password: value?.password,
        phone: changePhoneNumberFormat(value?.phone),
        email: value?.email ?? '',
      },
      {
        onSuccess() {
          toast.addToast(
            'success',
            'Register berhasil. Silahkan cek email untuk verifikasi.'
          )
          router.push(`/`)
        },
        onError(errorResponse) {
          const error =
            errorResponse?.response?.data?.errorMessage ??
            'Gagal memproses register. Coba lagi.'
          toast.addToast('error', error)
        },
      }
    )
  }

  return (
    <AuthLayout>
      <div className="py-12 px-10 md:pr-14 md:pl-0 w-full md:w-[350px]">
        <p className="text-gold-200 font-bold text-2xl leading-6 mb-3">
          Daftar
        </p>
        <p className="text-sm text-gold-300 leading-3 mb-8">
          Sudah punya akun?{' '}
          <Link to="/auth/login" className="text-gold-200 font-medium">
            Masuk
          </Link>
        </p>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onRegister)}
          className="space-y-3 w-full"
        >
          <TextField
            labelProps={{
              children: 'Nama Lengkap',
            }}
            inputProps={{
              ...register('fullName', { required: false }),
              isInvalid: Boolean(errors?.fullName?.message),
              placeholder: 'Nama Lengkap',
              errormessage: errors?.fullName?.message,
            }}
          />
          <TextField
            labelProps={{
              children: 'Username',
            }}
            inputProps={{
              ...register('username', { required: false }),
              isInvalid: Boolean(errors?.username?.message),
              placeholder: 'Username',
              errormessage: errors?.username?.message as string,
            }}
          />
          <TextField
            labelProps={{
              children: 'No. Handphone',
            }}
            inputProps={{
              ...register('phone', { required: false }),
              isInvalid: Boolean(errors?.phone?.message),
              placeholder: 'No. Handphone',
              errormessage: errors?.phone?.message,
            }}
          />
          <TextField
            labelProps={{
              children: 'Email',
            }}
            inputProps={{
              ...register('email', { required: false }),
              isInvalid: Boolean(errors?.email?.message),
              placeholder: 'Email',
              errormessage: errors?.email?.message,
            }}
          />

          <TextField
            labelProps={{
              children: 'Password',
            }}
            inputProps={{
              ...register('password', { required: false }),
              isInvalid: Boolean(errors?.password?.message),
              placeholder: 'Password',
              errormessage: errors?.password?.message,
              type: 'password',
            }}
          />
          <TextField
            className="!mb-3"
            labelProps={{
              children: 'Confirm Password',
            }}
            inputProps={{
              ...register('confirm_password', { required: false }),
              isInvalid: Boolean(errors?.confirm_password?.message),
              errormessage: errors?.confirm_password?.message,
              placeholder: 'Confirm Password',
              className: 'mb-3',
              type: 'password',
            }}
          />
          <Button className="" type="submit">
            Daftar
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default RegisterTemplate
