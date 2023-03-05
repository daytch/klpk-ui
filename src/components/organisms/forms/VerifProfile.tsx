import React, { useEffect, useState } from 'react'
import { InferType, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import {
  useCreateVerificationUserRequest,
  useUpdateVerificationUserRequest,
} from '@/services/profile/mutation'
import { useToast } from '@/hooks/useToast'
import Button from '@/components/atoms/Button'
import DialogSuccessSaveBook from '@/components/molecules/DialogSuccessSaveBook'
import TextField from '@/components/molecules/TextField'
import { bankAccountPattern, NIKPattern } from '@/utils/regex'
import { ProfileUserDataModel } from '@/interfaces/profile'

type VerifProfileFormProps = {
  onSuccessVerifProfile: () => void
  profile?: ProfileUserDataModel
}

const schema = object({
  identityFullName: string().required('Field tidak boleh kosong.'),
  identityNumber: string()
    .matches(NIKPattern, 'NIK Tidak valid.')
    .required('Field tidak boleh kosong.'),
  bankName: string().required('Field tidak boleh kosong.'),
  bankAccountNumber: string()
    .matches(bankAccountPattern, 'Nomor Rekening tidak valid.')
    .required('Field tidak boleh kosong.'),
})

type FormType = InferType<typeof schema>

export default function VerifProfileForm({
  onSuccessVerifProfile,
  profile,
}: VerifProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const toast = useToast()
  const createVerifRequest = useCreateVerificationUserRequest()
  const updateVerifRequest = useUpdateVerificationUserRequest()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    if (!profile) return
    reset({
      identityFullName: profile?.verification?.identityFullName ?? '',
      identityNumber: profile?.verification?.identityNumber ?? '',
      bankName: profile?.verification?.bankName ?? '',
      bankAccountNumber: profile?.verification?.bankAccountNumber ?? '',
    })
  }, [profile])

  const handleVerifProfile = (formValues: FormType) => {
    if (profile?.verified) {
      updateVerifRequest.mutate(
        {
          id: profile?.verification?.id ?? '',
          body: formValues,
        },
        {
          onSuccess: () => {
            setShowSuccessModal(true)
          },
          onError: () => {
            toast.addToast(
              'error',
              'Gagal mengirim permintaan. Silahkan coba lagi.'
            )
          },
        }
      )
    } else {
      createVerifRequest.mutate(
        {
          ...formValues,
        },
        {
          onSuccess: () => {
            setShowSuccessModal(true)
          },
          onError: () => {
            toast.addToast(
              'error',
              'Gagal mengirim permintaan. Silahkan coba lagi.'
            )
          },
        }
      )
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleVerifProfile)}
      className="mx-1"
    >
      <div className="space-y-3 max-w-[350px]">
        <TextField
          labelProps={{
            children: 'Nama sesuai KTP',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('identityFullName'),
            placeholder: 'Nama sesuai KTP',
            isInvalid: Boolean(errors?.identityFullName?.message),
            errormessage: errors?.identityFullName?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'No KTP',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('identityNumber'),
            placeholder: 'No KTP',
            isInvalid: Boolean(errors?.identityNumber?.message),
            errormessage: errors?.identityNumber?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'Bank',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('bankName'),
            placeholder: 'Bank',
            isInvalid: Boolean(errors?.bankName?.message),
            errormessage: errors?.bankName?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'No. Rekening',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('bankAccountNumber'),
            placeholder: 'No. Rekening',
            isInvalid: Boolean(errors?.bankAccountNumber?.message),
            errormessage: errors?.bankAccountNumber?.message ?? '',
          }}
        />
      </div>
      <div className="text-center mt-9">
        <Button
          type="submit"
          disabled={createVerifRequest.isLoading}
          isFullWidth={false}
          className="bg-[#00C008] text-white hover:bg-[#00C008]/70 hover:text-white"
        >
          {createVerifRequest.isLoading ? 'Menyimpan..' : 'Simpan'}
        </Button>
      </div>
      <DialogSuccessSaveBook
        message="Data anda akan di review oleh Admin"
        isOpen={showSuccessModal}
        onCloseDialog={() => setShowSuccessModal(false)}
        onConfirm={async () => {
          await setShowSuccessModal(false)
          onSuccessVerifProfile()
        }}
      />
    </form>
  )
}
