import Label, { ILabelProps } from '@/components/atoms/Label'
import React from 'react'
import ReactAsyncSelect from 'react-select/async'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { SelectOptionsDataModel } from '@/interfaces/common'
import { joinClass } from '@/utils/common'
import { selectDefaultStyles } from '@/styles/_select'

interface AsyncSelectFieldProps {
  className?: string
  labelProps: ILabelProps
  control?: Control<FieldValues, SelectOptionsDataModel>
  name: string
  errorMessage?: string
}

const AsyncSelectField: React.FC<AsyncSelectFieldProps> = ({
  className,
  labelProps,
  control,
  name,
  errorMessage,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={joinClass('w-full flex flex-col', className ?? '')}>
          <Label {...labelProps} className="mb-3" />
          <ReactAsyncSelect
            defaultValue={field.value}
            value={field.value}
            onChange={(value) => field.onChange(value)}
            styles={selectDefaultStyles}
            menuPortalTarget={
              typeof window === 'object' ? document?.body : null
            }
            menuPosition="fixed"
            menuShouldScrollIntoView={false}
            {...props}
          />
          <span
            className={joinClass(
              'text-danger/70 text-xs inline-block w-full',
              Boolean(errorMessage) ? 'visible' : 'invisible'
            )}
          >
            {errorMessage ?? ''}
          </span>
        </div>
      )}
    ></Controller>
  )
}

export default AsyncSelectField
