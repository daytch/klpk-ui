import React, { useEffect } from 'react'
import { object, string, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from '@/components/atoms/Button'
import TextField from '@/components/molecules/TextField'
import { unVerifiedSchema } from './UpdateUnverifiedProfile'
import { ProfileUserDataModel } from '@/interfaces/profile'
import { useUpdateProfile } from '@/services/profile/mutation'
import { useToast } from '@/hooks/useToast'

type UpdateVerifiedProfileProps = {
  onSuccessUpdateProfile: () => void
  profile?: ProfileUserDataModel
}

const verifiedSchema = unVerifiedSchema.concat(
  object({
    fullName: string().required('Tidak boleh kosong.'),
    bio: string().optional(),
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
  const updateProfile = useUpdateProfile()
  const toast = useToast()

  useEffect(() => {
    if (!profile) return
    reset({
      phone: profile?.phone ?? '',
      fullName: profile?.fullName ?? '',
      email: profile?.email ?? '',
      bio: profile?.bio ?? '',
      username: profile?.username ?? '',
    })
  }, [profile])

  const handleUpdateProfile = (values: FormType) => {
    updateProfile.mutate(
      {
        username: values.username,
        bio: values?.bio ?? '',
        email: values.email,
        fullName: values.fullName,
        phone: values.phone,
      },
      {
        onSuccess() {
          toast.addToast('success', 'Profile berhasil diperbarui.')
          onSuccessUpdateProfile()
        },
      }
    )
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
            children: 'Bio',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('bio'),
            placeholder: 'Bio',
            isInvalid: Boolean(errors?.bio?.message),
            errormessage: errors?.bio?.message ?? '',
          }}
        />
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
      </div>
      <div className="text-center mt-9">
        <Button type="submit" isFullWidth={false}>
          Simpan
        </Button>
      </div>
    </form>
  )
}
