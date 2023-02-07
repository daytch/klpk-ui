import React from 'react'
import Label, { ILabelProps } from '@/components/atoms/Label'
import { joinClass } from '@/utils/common'
import ReactSelect, { Props } from 'react-select'
import { Control, Controller } from 'react-hook-form'
import { selectDefaultStyles } from '@/styles/_select'
import { AssertsShape } from 'yup/lib/object'
import { SelectOptionsDataModel } from '@/interfaces/common'

interface SelectFieldProps extends Props {
  className?: string
  labelProps: ILabelProps
  control?: Control<AssertsShape<any>, any>
  name: string
  onSelectChange?: (value: SelectOptionsDataModel) => void
  errorMessage?: string
  options: SelectOptionsDataModel[]
}

const SelectField: React.FC<SelectFieldProps> = ({
  className,
  labelProps,
  control,
  name,
  errorMessage,
  onSelectChange = () => {},
  options,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={joinClass('w-full flex flex-col', className ?? '')}>
          <Label {...labelProps} className="mb-3" />
          <ReactSelect
            {...props}
            options={options}
            isSearchable
            value={options?.find((option) => option.value === field.value)}
            styles={selectDefaultStyles}
            menuPortalTarget={
              typeof window !== 'undefined' ? document.body : null
            }
            onChange={(value) => {
              field.onChange(value.value)
              onSelectChange(value)
            }}
            onBlur={field.onBlur}
            menuPosition="fixed"
          />
          <span
            className={joinClass(
              'text-danger/70 text-xs inline-block w-full mt-2',
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

export default SelectField
