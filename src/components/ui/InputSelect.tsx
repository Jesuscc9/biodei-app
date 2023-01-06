import React from 'react'
import Select, { GroupBase, Props } from 'react-select'

type SelectProps<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> = Props<
  Option,
  IsMulti,
  Group
> & {
  label?: string
  id?: string
}

export const InputSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: SelectProps<Option, IsMulti, Group>
): JSX.Element => {
  return (
    <Select
      {...props}
      onChange={(e) => {
        props.onChange?.(e, false)
      }}
      classNamePrefix='custom-select'
      className='mt-2'
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: '#ffffff07',
          border: '1px solid #282828',
          color: 'white',
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: 'white',
        }),

        input: (baseStyles, state) => ({
          ...baseStyles,
          color: 'white',
        }),
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
          color: 'white',
        }),

        option: (baseStyles, state) => ({
          ...baseStyles,
          color: 'black',
        }),
      }}
    />
  )
}
