import Button from '@/common/components/general/Button'
import TextField from '@/common/components/general/TextField'
import AuthLayout from '@/common/layouts/auth'
import { useToast } from '@/hooks/useToast'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { string, object, InferType } from 'yup'
import { useRecoverPassword } from '../services/mutation'

const validationSchema = object({
  email: string()
    .email('Email tidak valid.')
    .required('Email tidak boleh kosong.'),
})

const ForgotPassword = () => {
  const toast = useToast()
  const { mutate } = useRecoverPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InferType<typeof validationSchema>>({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  const onForgotPassword = (value: InferType<typeof validationSchema>) => {
    mutate(value.email, {
      onSuccess() {
        toast.addToast(
          'success',
          'Berhasil mengirim permintaan ubah password. Silahkan cek email untuk ubah pasword.'
        )
      },
      onError() {
        toast.addToast(
          'error',
          'Gagal mengirim permintaan ubah password. Silahkan coba lagi.'
        )
      },
    })
  }

  return (
    <AuthLayout>
      <div className="pt-12 pb-24 px-10 md:pr-14 md:pl-0 w-full md:w-[350px]">
        <p className="text-gold-200 font-bold text-2xl leading-6 mb-8">
          Lupa Password
        </p>
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onForgotPassword)}
          className="space-y-3 mb-6"
        >
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

          <Button type="submit">Kirim Reset Link</Button>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
