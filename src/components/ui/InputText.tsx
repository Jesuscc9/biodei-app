import React from 'react'

interface iProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  isLoading?: boolean
  type?: 'text' | 'password'
  label?: string
}

export const InputText = ({ isLoading, label, ...props }: iProps): JSX.Element => {
  return (
    <input
      id={props.name}
      title={props.name}
      className='border py-3.5 text-sm px-4 text-white bg-zinc-700 border-zinc-300 rounded-md w-full mt-2'
      {...props}
    />
  )
}
