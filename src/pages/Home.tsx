import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = (): JSX.Element => {
  return (
    <div className='flex justify-center flex-col p-20'>
      <h1 className='text-3xl m-auto'>Homepage</h1>
      <ul>
        <li>
          <Link to='/login' className='hover:text-blue-500'>
            Login
          </Link>
        </li>
      </ul>
    </div>
  )
}
