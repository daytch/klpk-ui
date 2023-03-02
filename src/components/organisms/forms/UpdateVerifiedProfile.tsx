import React, { useEffect } from 'react'
import { object, string, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/atoms/Button'
import TextField from '@/components/molecules/TextField'
import { useForm } from 'react-hook-form'
import { unVerifiedSchema } from './UpdateUnverifiedProfile'
import { ProfileUserDataModel } from '@/interfaces/profile'

type UpdateVerifiedProfileProps = {
  onSuccessUpdateProfile: () => void
  profile?: ProfileUserDataModel
}

const verifiedSchema = unVerifiedSchema.concat(
  object({
    identityNumber: string().required('Field tidak boleh kosong.'),
    bank: string().required('Field tidak boleh kosong.'),
    bank_account: string().required('Field tidak boleh kosong.'),
    fullName: string().required('Tidak boleh kosong.'),
  })
)

type FormType = InferType<typeof verifiedSchema>

export default function UpdateVerifiedProfile({
  onSuccessUpdateProfile,
  profile,
}: UpdateVerifiedProfileProps) {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    resolver: yupResolver(verifiedSchema),
  })

  useEffect(() => {
    if (!profile) return
    reset({
      phone: profile?.phone ?? '',
      fullName: profile?.fullName ?? '',
      email: profile?.email ?? '',
      identityNumber: profile?.verification?.identityNumber ?? '',
    })
  }, [profile])

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
            children: 'Nama sesuai KTP',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('fullName'),
            placeholder: 'Nama sesuai KTP',
            isInvalid: Boolean(errors?.fullName?.message),
            errormessage: errors?.fullName?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'No. Handphone',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('phone'),
            placeholder: 'No. Handphone',
            isInvalid: Boolean(errors?.phone?.message),
            errormessage: errors?.phone?.message ?? '',
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
            ...register('identityNumber'),
            placeholder: 'Email',
            isInvalid: Boolean(errors?.identityNumber?.message),
            errormessage: errors?.identityNumber?.message ?? '',
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
