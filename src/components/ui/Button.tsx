import React from 'react'

interface iProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode
  isLoading?: boolean
}

export const Button = (props: iProps): JSX.Element => {
  const isLoading = props?.isLoading ?? false

  return (
    <button
      className='bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-sm py-4 px-4 rounded-md text-center uppercase'
      {...props}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : props.children}
    </button>
  )
}
