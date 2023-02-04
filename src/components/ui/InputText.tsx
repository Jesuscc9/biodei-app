import React, { useState } from 'react'
import { IoIosEye, IoMdEyeOff } from 'react-icons/io'

interface iProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  isLoading?: boolean
  type?: 'text' | 'password'
  label?: string
}

export const InputText = ({ isLoading, label, type, ...props }: iProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = (): void => setShowPassword(!showPassword)

  return (
    <div className='flex mt-2'>
      <input
        id={props.name}
        title={props.name}
        className={`border py-3.5 text-sm px-4 text-white bg-zinc-700 border-zinc-300 ${
          type === 'password' ? 'rounded-l-md' : 'rounded-md'
        } w-full`}
        type={showPassword ? 'text' : type}
        {...props}
      />
      {type === 'password' ? (
        <button
          type='button'
          title='Mostrar clave'
          className='border-r border-t border-b rounded-r-md h-auto w-10 flex items-center justify-center border-zinc-300 active:outline-1 outline-white'
          onClick={togglePasswordVisibility}
        >
          {!showPassword ? <IoIosEye /> : <IoMdEyeOff />}
        </button>
      ) : null}
    </div>
  )
}
