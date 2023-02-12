import React, { useMemo, useId, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InferType, mixed, object, string } from 'yup'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/atoms/Button'
import SelectField from '@/components/molecules/SelectField'
import TextAreaField from '@/components/molecules/TextAreaField'
import TextField from '@/components/molecules/TextField'
import UploadCover from '@/components/molecules/UploadCover'
import { SelectOptionsDataModel } from '@/interfaces/common'
import { useGetCategories } from '@/services/category/query'
import {
  useCreateNewBook,
  useMarkBookAsDone,
  useUpdateBookFromId,
  useUploadBookCover,
} from '@/services/my-book/mutation'
import { useToast } from '@/hooks/useToast'
import { DetailBookDataModel } from '@/interfaces/book'

const schema = object({
  title: string().required('Judul wajib diisi.'),
  synopsis: string().required('Sinopsis wajib diisi.'),
  category: string().required('Kategori wajib diisi.'),
  cover: mixed().test('file type', 'File tidak valid', () => {
    return true
  }),
})

type FormValue = InferType<typeof schema>

interface WritingBookFormProps {
  children: React.ReactNode
  detailBook?: DetailBookDataModel
}

const WritingBookForm: React.FC<WritingBookFormProps> = ({
  children,
  detailBook,
}) => {
  const router = useRouter()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValue>({ resolver: yupResolver(schema), mode: 'all' })
  const createNewBook = useCreateNewBook()
  const uploadBookCover = useUploadBookCover()
  const updateBook = useUpdateBookFromId()
  const markBookAsDone = useMarkBookAsDone()

  const showPublishButton = detailBook !== undefined

  const { data: categories, isLoading, isError } = useGetCategories()

  useEffect(() => {
    if (!detailBook) return
    reset({
      title: detailBook.title,
      category: detailBook.category.id,
      synopsis: detailBook.synopsis,
    })
  }, [detailBook])

  const categoryOptions: SelectOptionsDataModel[] = useMemo(() => {
    if (!categories?.length) return []
    const options = categories.map((category) => {
      return {
        label: category.name,
        value: category.id,
      }
    })
    return options
  }, [categories])

  const handleUploadCover = async (
    formData: FormData,
    bookId: string,
    onSuccess?: () => void
  ) => {
    await uploadBookCover.mutateAsync(
      {
        File: formData,
        id: bookId,
      },
      {
        onSuccess: () => {
          if (onSuccess !== undefined) {
            onSuccess()
          }
        },
        onError: () => {
          toast.addToast('error', 'Gagal menyimpan cover buku')
        },
      }
    )
  }

  const handleAddNewBook = async (values: FormValue) => {
    const formData = new FormData()
    if (!!values?.cover && !!values.cover.length)
      formData.append('File', values.cover[0])

    const data = await createNewBook.mutateAsync(
      {
        title: values.title,
        synopsis: values.synopsis,
        categoryId: values.category,
      },
      {
        onError: () => {
          toast.addToast('error', 'Gagal menyimpan buku baru.')
          return
        },
        onSuccess: (response) => {
          if (!values.cover) {
            toast.addToast('success', 'Berhasil menyimpan buku.')
            router.push('/menulis/buku/' + response.id)
          }
        },
      }
    )

    if (!!values.cover && !!data.id) {
      await handleUploadCover(formData, data.id, () => {
        toast.addToast('success', 'Berhasil menyimpan buku.')
        router.push('/menulis/buku/' + data.id)
      })
    }
  }

  const handleUpdateBook = async (values: FormValue) => {
    const formData = new FormData()
    if (!!values?.cover && !!values.cover.length)
      formData.append('File', values.cover[0])

    await updateBook.mutateAsync(
      {
        bookId: String(router?.query?.bookId ?? ''),
        payloadBook: {
          title: values.title,
          categoryId: values.category,
          synopsis: values.synopsis,
        },
      },
      {
        onError: () => {
          toast.addToast('error', 'Gagal menyimpan data buku. Coba lagi.')
        },
        onSuccess: () => {
          if (!values.cover) {
            toast.addToast('success', 'Berhasil menyimpan buku.')
          }
        },
      }
    )

    if (!!values.cover) {
      await handleUploadCover(formData, String(router.query.bookId), () => {
        toast.addToast('success', 'Berhasil menyimpan buku.')
      })
    }
  }

  const handleFormSubmit = async (values: FormValue) => {
    if (!!detailBook) {
      handleUpdateBook(values)
    } else {
      handleAddNewBook(values)
    }
  }

  const handleMarkBookAsDone = async () => {
    await markBookAsDone.mutateAsync(
      { bookId: detailBook?.id ?? '' },
      {
        onSuccess: () => {
          toast.addToast('success', 'Berhasil mengubah status buku.')
        },
        onError: () => {
          toast.addToast('error', 'Gagal mengubah status buku.')
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="lg:flex space-y-6 lg:space-y-0 lg:space-x-32">
        <div className="mx-auto lg:mx-0 w-[220px] ">
          <div className="sticky top-4">
            <UploadCover
              cover={detailBook?.cover ?? ''}
              control={control}
              name="cover"
              className="mb-4"
            />
            {showPublishButton && (
              <Button
                onClick={handleMarkBookAsDone}
                disabled={markBookAsDone.isLoading}
                variant="primary"
              >
                {markBookAsDone.isLoading ? 'Menyimpan' : 'Publish'}
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="p-4 lg:p-8 bg-dark-300 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-gold-300">
              <h2 className="text-white font-bold font-gotham text-base">
                Menulis
              </h2>
              <Button
                type="submit"
                isFullWidth={false}
                variant="outlined"
                className="py-1"
              >
                Simpan
              </Button>
            </div>
            <div className="space-y-3 py-4">
              <TextField
                labelProps={{
                  children: 'Judul',
                }}
                inputProps={{
                  ...register('title'),
                  isInvalid: Boolean(errors?.title?.message),
                  placeholder: 'Judul',
                  errormessage: errors?.title?.message,
                }}
              />
              <SelectField
                name="category"
                control={control}
                labelProps={{
                  children: 'Kategori',
                }}
                instanceId={useId()}
                options={categoryOptions}
                isDisabled={isLoading || isError}
                errorMessage={errors?.category?.message}
              />
              <TextAreaField
                labelProps={{
                  children: 'Sinopsis',
                }}
                textAreaProps={{
                  ...register('synopsis'),
                  isInvalid: Boolean(errors?.synopsis?.message),
                  placeholder: 'Judul',
                  errormessage: errors?.synopsis?.message,
                }}
              />
              <hr className="border-gold-300 " />
              {children}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default WritingBookForm
