import React from 'react'

interface iProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

const commonClasses = 'disabled:opacity-50 text-sm py-3 px-4 rounded-md text-center uppercase '

const primaryClasses =
  commonClasses +
  'bg-green-500 hover:bg-green-600 disabled:bg-blue-300 text-white text-sm py-4 px-4 rounded-md text-center uppercase'

const secondaryClasses = commonClasses + 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300'

export const Button = ({ isLoading = false, variant = 'primary', ...props }: iProps): JSX.Element => {
  const className = variant === 'primary' ? primaryClasses : secondaryClasses

  return (
    <button className={className} {...props} disabled={isLoading}>
      {isLoading ? 'Loading...' : props.children}
    </button>
  )
}
