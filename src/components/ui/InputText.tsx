import React from 'react'

interface iProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  isLoading?: boolean
}

export const InputText = (props: iProps): JSX.Element => {
  return (
    <input
      type='text'
      id={props.name}
      title={props.name}
      className='border p-3 text-black rounded-md w-full mt-2'
      {...props}
    />
  )
}
