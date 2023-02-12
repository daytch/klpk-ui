import React from 'react'
import { object, string, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/atoms/Button'
import TextField from '@/components/molecules/TextField'
import { useForm } from 'react-hook-form'
import { unVerifiedSchema } from './UpdateUnverifiedProfile'

type UpdateVerifiedProfileProps = {
  onSuccessUpdateProfile: () => void
}

const verifiedSchema = unVerifiedSchema.concat(
  object({
    ktp: string().required('Field tidak boleh kosong.'),
    bank: string().required('Field tidak boleh kosong.'),
    bank_account: string().required('Field tidak boleh kosong.'),
  })
)

type FormType = InferType<typeof verifiedSchema>

export default function UpdateVerifiedProfile({
  onSuccessUpdateProfile,
}: UpdateVerifiedProfileProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    resolver: yupResolver(verifiedSchema),
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
        <TextField
          labelProps={{
            children: 'No KTP',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('ktp'),
            placeholder: 'Email',
            isInvalid: Boolean(errors?.ktp?.message),
            errormessage: errors?.ktp?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'No Rekening',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('bank_account'),
            placeholder: 'No Rekening',
            isInvalid: Boolean(errors?.bank_account?.message),
            errormessage: errors?.bank_account?.message ?? '',
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
