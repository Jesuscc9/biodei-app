import React from 'react'
import { Ring as Loader } from '@uiball/loaders'

interface iProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

const commonClasses = 'disabled:bg-opacity-80 text-sm py-3 px-4 rounded-md text-center uppercase relative '

const primaryClasses =
  commonClasses + 'bg-green-500 hover:bg-green-600 text-white text-sm py-4 px-4 rounded-md text-center uppercase'

const secondaryClasses = commonClasses + 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300'

export const Button = ({ isLoading = false, variant = 'primary', ...props }: iProps): JSX.Element => {
  const className = variant === 'primary' ? primaryClasses : secondaryClasses

  return (
    <button className={className} {...props} disabled={isLoading}>
      {isLoading ? (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Loader color='white' size={20} />
        </div>
      ) : null}

      <div
        style={{
          opacity: isLoading ? 0 : 1,
        }}
      >
        {props.children}
      </div>
    </button>
  )
}
