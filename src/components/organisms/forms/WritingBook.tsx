import React, { useMemo, useId, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { FormProvider, useForm } from 'react-hook-form'
import { InferType, mixed, object, string } from 'yup'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@/components/atoms/Button'
import SelectField from '@/components/molecules/SelectField'
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
import { MAX_FILE_SIZE } from '@/utils/constants'
const TextEditorField = dynamic(
  () => import('@/components/molecules/TextEditorField'),
  { ssr: false }
)

const schema = object({
  title: string().required('Judul wajib diisi.'),
  content: string().required('Sinopsis wajib diisi.'),
  category: string().required('Kategori wajib diisi.'),
  cover: mixed()
    .test('file type', 'File tidak valid', () => {
      return true
    })
    .test(
      'file-size',
      'File terlalu besar. Ukuran maksimal file hanya 2 MB',
      (value: FileList) => {
        if (!value) return true
        const fileSize = value[0]?.size
        return fileSize < MAX_FILE_SIZE
      }
    ),
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
  const methods = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods
  const createNewBook = useCreateNewBook()
  const uploadBookCover = useUploadBookCover()
  const updateBook = useUpdateBookFromId()
  const markBookAsDone = useMarkBookAsDone()

  const isCompleteBook =
    detailBook !== undefined &&
    detailBook?.chapters?.length > 0 &&
    detailBook?.completed

  const { data: categories, isLoading, isError } = useGetCategories()

  useEffect(() => {
    if (!detailBook) return
    reset({
      title: detailBook.title,
      category: detailBook.category.id,
      content: detailBook.synopsis,
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
        synopsis: values.content,
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
          synopsis: values.content,
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="lg:flex space-y-6 lg:space-y-0 lg:space-x-32">
          <div className="mx-auto lg:mx-0 w-[220px] ">
            <div className="sticky top-20">
              <UploadCover
                disable={detailBook?.completed ?? false}
                cover={detailBook?.cover ?? ''}
                control={control}
                errorMessage={(errors?.cover?.message as string) ?? ''}
                name="cover"
                className="mb-4"
              />
              {!isCompleteBook && (
                <Button
                  onClick={handleMarkBookAsDone}
                  disabled={markBookAsDone.isLoading}
                  variant="primary"
                >
                  {markBookAsDone.isLoading ? 'Menyimpan' : 'Tandai Selesai'}
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
                  disabled={
                    createNewBook.isLoading ||
                    updateBook.isLoading ||
                    isCompleteBook
                  }
                  type="submit"
                  isFullWidth={false}
                  variant="outlined"
                  className="py-1"
                >
                  {createNewBook.isLoading || updateBook.isLoading
                    ? 'Menyimpan'
                    : 'Simpan'}
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
                    disabled: isLoading || isError || isCompleteBook,
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
                  isDisabled={isLoading || isError || isCompleteBook}
                  errorMessage={errors?.category?.message}
                />
                <TextEditorField
                  labelProps={{
                    children: 'Sinopsis',
                  }}
                  textEditorProps={{
                    name: 'content',
                    disabled: isCompleteBook || isLoading || isError,
                  }}
                  errorMessage={errors?.content?.message ?? ''}
                />
                {/* <TextAreaField
                labelProps={{
                  children: 'Sinopsis',
                }}
                textAreaProps={{
                  ...register('synopsis'),
                  isInvalid: Boolean(errors?.synopsis?.message),
                  placeholder: 'Judul',
                  errormessage: errors?.synopsis?.message,
                  disabled: isCompleteBook || isLoading || isError,
                  rows: 10,
                }}
              /> */}
                <hr className="border-gold-300 " />
                {children}
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default WritingBookForm
