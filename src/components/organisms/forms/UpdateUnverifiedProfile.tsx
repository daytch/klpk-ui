import React, { useEffect } from 'react'
import { object, string, InferType } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/useToast'
import { useUpdateProfile } from '@/services/profile/mutation'
import Button from '@/components/atoms/Button'
import TextField from '@/components/molecules/TextField'
import { ProfileUserDataModel } from '@/interfaces/profile'

type UpdateUnverifiedProfileProps = {
  onSuccessUpdateProfile: () => void
  profile?: ProfileUserDataModel
}

export const unVerifiedSchema = object({
  username: string().required('Field tidak boleh kosong.'),
  phone: string().required('Field tidak boleh kosong.'),
  email: string()
    .email('Email tidak valid')
    .required('Field tidak boleh kosong.'),
})

type FormType = InferType<typeof unVerifiedSchema>

export default function UpdateUnverifiedProfile({
  onSuccessUpdateProfile,
  profile,
}: UpdateUnverifiedProfileProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(unVerifiedSchema),
  })
  const updateProfile = useUpdateProfile()
  const toast = useToast()

  useEffect(() => {
    if (!profile) return
    reset({
      email: profile?.email ?? '',
      phone: profile?.phone ?? '',
      username: profile?.username ?? '',
    })
  }, [profile])

  const handleUpdateProfile = (values: FormType) => {
    updateProfile.mutate(
      {
        username: values.username,

        email: values.email,
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
