import Button from '@/components/atoms/Button'
import DialogSuccessSaveBook from '@/components/molecules/DialogSuccessSaveBook'
import TextField from '@/components/molecules/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InferType, object, string } from 'yup'

type VerifProfileFormProps = {
  onSuccessVerifProfile: () => void
}

const schema = object({
  name: string().required('Field tidak boleh kosong.'),
  ktp: string().required('Field tidak boleh kosong.'),
  bank: string().required('Field tidak boleh kosong.'),
  bank_account: string().required('Field tidak boleh kosong.'),
})

type FormType = InferType<typeof schema>

export default function VerifProfileForm({
  onSuccessVerifProfile,
}: VerifProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleVerifProfile = (data: FormType) => {
    console.log('verif data', data)
    setShowSuccessModal(true)
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
            ...register('name'),
            placeholder: 'Nama sesuai KTP',
            isInvalid: Boolean(errors?.name?.message),
            errormessage: errors?.name?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'No KTP',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('ktp'),
            placeholder: 'No KTP',
            isInvalid: Boolean(errors?.ktp?.message),
            errormessage: errors?.ktp?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'Bank',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('bank'),
            placeholder: 'Bank',
            isInvalid: Boolean(errors?.bank?.message),
            errormessage: errors?.bank?.message ?? '',
          }}
        />
        <TextField
          labelProps={{
            children: 'No. Rekening',
            className: 'text-kplkWhite font-gotham font-extralight',
          }}
          inputProps={{
            ...register('bank_account'),
            placeholder: 'No. Rekening',
            isInvalid: Boolean(errors?.bank_account?.message),
            errormessage: errors?.bank_account?.message ?? '',
          }}
        />
      </div>
      <div className="text-center mt-9">
        <Button
          type="submit"
          isFullWidth={false}
          className="bg-[#00C008] text-white hover:bg-[#00C008]/70 hover:text-white"
        >
          Simpan
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
