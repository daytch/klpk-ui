import React, { useEffect } from 'react'
import { InferType, mixed, object, string } from 'yup'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TextField from '@/components/molecules/TextField'
import UploadCover from '@/components/molecules/UploadCover'
import Button from '@/components/atoms/Button'
import TextEditorField from '@/components/molecules/TextEditorField'
import IconArrow from '@/components/icons/IconArrow'
import { BookChapterDataModel, DetailBookDataModel } from '@/interfaces/book'
import {
  useCreateNewChapter,
  useUpdateChapterFromId,
  useUploadBookCover,
} from '@/services/my-book/mutation'
import { useToast } from '@/hooks/useToast'

const schema = object({
  name: string().required('Judul bab wajib diisi.'),
  content: string().required('Isi bab wajib diisi.'),
  cover: mixed().test('file type', 'Format tidak didukung', () => {
    return true
  }),
})

type FormValue = InferType<typeof schema>

interface WritingChapterFormProps {
  chapter?: BookChapterDataModel
  detailBook?: DetailBookDataModel
}

const WritingChapterForm: React.FC<WritingChapterFormProps> = ({
  chapter,
  detailBook,
}) => {
  const { query, push } = useRouter()
  const toast = useToast()
  const isUpdateMode = chapter !== undefined
  const bookId = query.bookId
  const methods = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {},
  })

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods
  const updateCover = useUploadBookCover()
  const createChapter = useCreateNewChapter()
  const updateChapter = useUpdateChapterFromId()

  useEffect(() => {
    if (!chapter) return
    reset({ name: chapter.name, content: chapter.content })
  }, [chapter])

  const handleUpdateCover = async (formData: FormData) => {
    updateCover.mutateAsync(
      {
        File: formData,
        id: String(query.bookId),
      },
      {
        onError: () => {
          toast.addToast('error', 'Gagal menyimpan cover buku')
        },
        onSuccess: () => {
          push({
            pathname: '/menulis/buku/[bookId]',
            query: { bookId },
          })
        },
      }
    )
  }

  const handleAddNewChapter = async (values: FormValue) => {
    const formData = new FormData()
    if (!!values?.cover && !!values.cover.length) {
      formData.append('File', values.cover[0])
    }
    await createChapter.mutateAsync(
      {
        bookId: String(query?.bookId),
        newChapter: { name: values.name, content: values.content },
      },
      {
        onError: () => {
          toast.addToast('error', 'Gagal menyimpan bab. Coba lagi,')
        },
        onSuccess: () => {
          if (!values.cover) {
            push({
              pathname: '/menulis/buku/[bookId]',
              query: { bookId },
            })
          }
        },
      }
    )
    if (values.cover) {
      await handleUpdateCover(formData)
    }
  }

  const handleUpdateChapter = async (values: FormValue) => {
    const formData = new FormData()
    if (!!values?.cover && !!values.cover.length) {
      formData.append('File', values.cover[0])
    }
    await updateChapter.mutateAsync(
      {
        bookId: String(query?.bookId),
        chapterid: String(query?.chapterId),
        newChapter: { name: values.name, content: values.content },
      },
      {
        onError: () => {
          toast.addToast('error', 'Gagal menyimpan bab. Coba lagi,')
        },
        onSuccess: () => {
          if (!values.cover) {
            push({
              pathname: '/menulis/buku/[bookId]',
              query: { bookId },
            })
          }
        },
      }
    )
    if (values.cover) {
      await handleUpdateCover(formData)
    }
  }

  const handleFormSubmit = (values: FormValue) => {
    if (isUpdateMode) {
      handleUpdateChapter(values)
    } else {
      handleAddNewChapter(values)
    }
  }

  return (
    <section className="pt-7 pb-28">
      <div className="container">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="lg:flex space-y-6 lg:space-y-0 lg:space-x-32">
              <div className="mx-auto lg:mx-0 w-[220px] lg:sticky top-4">
                <UploadCover
                  disable={detailBook?.completed ?? false}
                  cover={detailBook?.cover ?? ''}
                  control={control}
                  name="cover"
                />
              </div>
              <div className="flex-1">
                <div className="p-4 lg:p-8 bg-dark-300 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        pathname: '/menulis/buku/[bookId]',
                        query: {
                          bookId: query.bookId,
                        },
                      })
                    }
                    className="font-gotham font-bold text-base inline-flex items-center space-x-2 text-white mb-6"
                  >
                    <IconArrow className="rotate-180" />
                    <span>Kembali</span>
                  </button>
                  <hr className="border-gold-300" />
                  <div className="space-y-3 py-4">
                    <TextField
                      labelProps={{
                        children: 'Judul Bab',
                      }}
                      inputProps={{
                        ...register('name'),
                        isInvalid: Boolean(errors?.name?.message),
                        placeholder: 'Judul Bab',
                        disabled: detailBook?.completed ?? false,
                        errormessage: errors?.name?.message,
                      }}
                    />
                    <TextEditorField
                      labelProps={{
                        children: 'Text',
                      }}
                      textEditorProps={{
                        name: 'content',
                        disabled: true,
                      }}
                      errorMessage={errors?.content?.message ?? ''}
                    />
                    <hr className="border-gold-300" />
                    <div>
                      <Button
                        isFullWidth={false}
                        type="submit"
                        variant="outlined"
                      >
                        Simpan Bab
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

export default WritingChapterForm
