import React from 'react'
import { object, string, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/atoms/Button'
import TextField from '@/components/molecules/TextField'
import { useForm } from 'react-hook-form'

type UpdateUnverifiedProfileProps = {
  onSuccessUpdateProfile: () => void
}

export const unVerifiedSchema = object({
  username: string().required('Field tidak boleh kosong.'),
  noHp: string().required('Field tidak boleh kosong.'),
  email: string()
    .email('Email tidak valid')
    .required('Field tidak boleh kosong.'),
})

type FormType = InferType<typeof unVerifiedSchema>

export default function UpdateUnverifiedProfile({
  onSuccessUpdateProfile,
}: UpdateUnverifiedProfileProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    resolver: yupResolver(unVerifiedSchema),
  })

  const handleUpdateProfile = (data: FormType) => {
    console.log('update data', data)
    onSuccessUpdateProfile()
  }
  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleUpdateProfile)}
      className="mx-1"
    >
      <div className="space-y-3 max-w-[350px]">
        <TextField
          labelProps={{
            children: 'Username',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('username'),
            placeholder: 'Username',
            isInvalid: Boolean(errors?.username?.message),
            errormessage: errors?.username?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'No. Handphone',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('noHp'),
            placeholder: 'No. Handphone',
            isInvalid: Boolean(errors?.noHp?.message),
            errormessage: errors?.noHp?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'Email',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('email'),
            placeholder: 'Email',
            isInvalid: Boolean(errors?.email?.message),
            errormessage: errors?.email?.message ?? '',
          }}
        />
      </div>
      <div className="text-center mt-9">
        <Button type="submit" isFullWidth={false}>
          Simpan
        </Button>
      </div>
    </form>
  )
}
