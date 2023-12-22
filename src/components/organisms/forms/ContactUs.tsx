import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/atoms/Button'
import TextAreaField from '@/components/molecules/TextAreaField'
import TextField from '@/components/molecules/TextField'
import { createEmailBody } from '@/utils/common'

const schema = yup.object({
  firstName: yup.string().required('Nama depan tidak boleh kosong.'),
  lastName: yup.string().required('Nama belakang tidak boleh kosong.'),
  email: yup
    .string()
    .required('Email tidak boleh kosong')
    .email('Email tidak valid'),

  message: yup.string().required('Pesan tidak boleh kosong.'),
})

type FormValue = yup.InferType<typeof schema>
const targetEmail = 'pengaduan@komunitaspatrickkellan.com'

function ContactUs() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValue>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',

      message: '',
    },
    resolver: yupResolver(schema),
  })

  const handleSendMessage = (values: FormValue) => {
    const message = createEmailBody(values)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = `mailto:${targetEmail}?subject=Mail from Our Site&body=${message}`
    a.click()
    a.remove()
  }

  return (
    <form onSubmit={handleSubmit(handleSendMessage)}>
      <h1 className="text-2xl font-bold text-gold-100 mb-2">Hubungi Kami</h1>
      <p className="text-sm text-gold-200 mb-6 opacity-60">
        Ada kendala? Silakan hubungi kami melalu form dibawah ini.
      </p>
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <TextField
            labelProps={{
              children: 'Nama depan',
            }}
            inputProps={{
              ...register('firstName'),
              isInvalid: Boolean(errors?.firstName?.message),
              errormessage: errors?.firstName?.message,
              placeholder: 'Nama depan',
            }}
          />
          <TextField
            labelProps={{
              children: 'Nama belakang',
            }}
            inputProps={{
              ...register('lastName'),
              isInvalid: Boolean(errors?.lastName?.message),
              errormessage: errors?.lastName?.message,
              placeholder: 'Nama belakang',
            }}
          />
        </div>

        <TextField
          labelProps={{
            children: 'Email',
          }}
          inputProps={{
            ...register('email'),
            isInvalid: Boolean(errors?.email?.message),
            errormessage: errors?.email?.message,
            placeholder: 'Email',
          }}
        />

        <TextAreaField
          labelProps={{
            children: 'Pesan',
          }}
          textAreaProps={{
            ...register('message'),
            isInvalid: Boolean(errors?.message?.message),
            errormessage: errors?.message?.message,
            placeholder: 'Pesan',
          }}
        />
        <Button type="submit">Send Message</Button>
      </div>
    </form>
  )
}

export default ContactUs
