import React from 'react'
import TextField from '@/common/components/general/TextField'
import { useForm } from 'react-hook-form'
import { string, object, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/common/components/general/Button'
import Link from '@/common/components/general/Link'
import AuthLayout from '@/common/layouts/auth'
import Image from 'next/image'
import { useToast } from '@/hooks/useToast'
import { useGoogleLogin } from '@react-oauth/google'
import { useLogin } from '../services/mutation'
import { useAuth } from '@/store/useAuth'
import { useRouter } from 'next/router'
import { loginGoogle } from '../services/api'

const validationSchema = object({
  email: string().required('Email wajib diisi.'),
  password: string().required('Password wajib diisi.'),
})

const Login = () => {
  const toast = useToast()
  const router = useRouter()
  const { mutate } = useLogin()
  const { login } = useAuth()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<InferType<typeof validationSchema>>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  const onLogin = (value: InferType<typeof validationSchema>) => {
    mutate(
      { username: value.email, password: value.password },
      {
        onSuccess(response) {
          toast.addToast('success', 'Berhasil login.')
          login(response?.data)
          router.push('/')
        },
        onError() {
          toast.addToast('error', 'Email dan password tidak valid.')
        },
      }
    )
  }

  const onGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) =>
      loginGoogle(codeResponse.access_token)
        .then((response) => {
          const data = response.data
          login(data)
          router.push('/')
        })
        .catch(() => {
          toast.addToast('error', 'Gagal login. Coba lagi.')
        }),
  })

  return (
    <AuthLayout>
      <div className="pt-12 pb-24 px-10 md:pr-14 md:pl-0 w-full md:w-[350px]">
        <p className="text-gold-100 text-sm font-normal mb-3 leading-3">
          Selamat Datang
        </p>
        <p className="text-gold-200 font-bold text-2xl leading-6 mb-8">
          Masuk Pengguna
        </p>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onLogin)}
          className="space-y-4 mb-6"
        >
          <TextField
            labelProps={{
              children: 'Username',
            }}
            inputProps={{
              ...register('email', { required: false }),
              isInvalid: Boolean(errors?.email?.message),
              placeholder: 'Email',
              errormessage: errors?.email?.message ?? '',
            }}
          />
          <TextField
            labelProps={{
              children: 'Password',
            }}
            inputProps={{
              ...register('password', { required: false }),
              type: 'password',
              isInvalid: Boolean(errors?.password?.message),
              placeholder: 'Password',
              errormessage: errors?.password?.message ?? '',
            }}
          />
          <div className="mt-3 flex justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-sm text-gold-300 mb-4"
            >
              Lupa Password
            </Link>
          </div>
          <Button type="submit">Masuk</Button>
        </form>
        <Button variant="secondary" onClick={() => onGoogleLogin()}>
          <div className="flex items-center justify-center space-x-3 font-gotham font-light">
            <Image
              width={20}
              height={20}
              alt="Google"
              src="/assets/icons/icon-google.webp"
            />
            <span>Or sign-in with google</span>
          </div>
        </Button>
        <p className="text-center mt-6 text-sm text-gold-300 leading-3">
          Pengguna baru?{' '}
          <Link to="/auth/register" className="text-gold-200 font-medium">
            Daftar
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default Login
