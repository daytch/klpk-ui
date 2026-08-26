import React from 'react'
import Label, { ILabelProps } from '@/components/atoms/Label'
import { joinClass } from '@/utils/common'
import ReactSelect, { Props } from 'react-select'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { selectDefaultStyles } from '@/styles/_select'
import { SelectOptionsDataModel } from '@/interfaces/common'

interface SelectFieldProps<T extends FieldValues>
  extends Omit<Props, 'onChange' | 'value'> {
  className?: string
  labelProps: ILabelProps
  control?: Control<T>
  name: Path<T>
  onSelectChange?: (value: SelectOptionsDataModel) => void
  errorMessage?: string
  options: SelectOptionsDataModel[]
}

const SelectField = <T extends FieldValues>({
  className,
  labelProps,
  control,
  name,
  errorMessage,
  onSelectChange = () => {},
  options,
  ...props
}: SelectFieldProps<T>) => {
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
            value={options?.find(
              (option) => option.value === (field.value as unknown)
            )}
            styles={selectDefaultStyles}
            menuPortalTarget={
              typeof window !== 'undefined' ? document.body : null
            }
            onChange={(value: SelectOptionsDataModel | null) => {
              if (value) {
                field.onChange(value.value as unknown)
                onSelectChange(value)
              }
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