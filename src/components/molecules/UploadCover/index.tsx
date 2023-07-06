import React, { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import Image from 'next/image'
import { AssertsShape } from 'yup/lib/object'
import { joinClass } from '@/utils/common'

interface UploadCoverProps {
  control: Control<AssertsShape<any>, any>
  disable: boolean
  name: string
  cover?: string
  className?: string
  errorMessage?: string
}

const UploadCover: React.FC<UploadCoverProps> = ({
  control,
  name,
  cover,
  className,
  disable,
  errorMessage = '',
}) => {
  const [preview, setPreview] = useState<string>('')
  const hasError = errorMessage?.length > 0

  const createPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.length) return
    if (e.target.files?.length > 0) {
      const src = URL.createObjectURL(e.target.files[0])
      setPreview(src)
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          className={joinClass(
            'p-4 bg-dark-300 rounded-xl overflow-hidden w-full',
            className ?? ''
          )}
        >
          <div className="h-72 flex items-center justify-center mb-4 rounded-lg overflow-hidden">
            {!field.value && !preview.length && !cover?.length && (
              <Image
                src="/assets/images/gallery.png"
                alt=""
                className="block mx-auto"
                width={68}
                height={68}
              />
            )}
            {preview.length !== 0 && (
              <Image
                alt=""
                src={preview}
                width={68}
                height={68}
                unoptimized
                className="w-full h-full object-cover"
              />
            )}
            {!!cover?.length && !preview.length && (
              <Image
                alt=""
                priority
                src={cover}
                width={68}
                height={68}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="text-center">
            <input
              disabled={disable}
              type="file"
              className="hidden peer"
              id="cover"
              onChange={(e) => {
                field.onChange(e.target.files)
                createPreview(e)
              }}
              onClick={(e: any) => {
                e.target.value = null
              }}
            />
            <label
              htmlFor="cover"
              className="inline-block mx-auto text-sm font-gotham font-thin text-gold-200 border-gold-200 ring-1 ring-gold-200 peer-disabled:bg-gold-300 peer-disabled:text-dark-500 py-[10px] px-[18px] rounded-xl cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:ring-dark-500"
            >
              Edit Cover
            </label>
          </div>
          {hasError && (
            <span
              className={joinClass(
                'text-danger/70 text-xs inline-block w-full mt-2',
                hasError ? 'visible' : 'invisible'
              )}
            >
              {errorMessage}
            </span>
          )}
        </div>
      )}
    ></Controller>
  )
}

export default UploadCover
