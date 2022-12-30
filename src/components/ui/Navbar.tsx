import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useProfile } from '../../hooks/models'
import { supabase } from '../../services/supabaseService'

export const Navbar = (): JSX.Element => {
  const { data: profile } = useProfile()

  const handleLogout = (): void => {
    supabase.auth.signOut().catch((error) => console.error(error))
  }

  return (
    <>
      <nav className='p-6 px-10 border-gray-300 border-b flex justify-between items-center bg-gray-800 text-white'>
        <div className='flex items-center gap-2'>
          <h1 className='font-bold text-xl'>BIODEI</h1>
          <ul className='ml-10 flex gap-4'>
            <li>
              <Link to='tickets' className='hover:underline'>
                Tickets
              </Link>
            </li>
            <li>
              <Link to='devices' className='hover:underline'>
                Devices
              </Link>
            </li>
          </ul>
        </div>
        {profile !== undefined ? (
          <div className='flex gap-2 items-center py-1.5'>
            <h1>{profile.first_name}</h1>
            <h1>{profile.last_name}</h1>
            <div className='ml-3 text-xs bg-green-500 bg-opacity-50 px-3 py-1 rounded-full'>{profile.role}</div>
            <button
              title='Cerrar sesion'
              onClick={handleLogout}
              className='bg-red-500 hover:bg-red-600 p-2 rounded-md text-sm ml-4'
            >
              Cerrar sesion
            </button>
          </div>
        ) : (
          <div className='flex gap-6'>
            <Link to='login'>
              <button className='bg-green-500 px-4 py-2 rounded-md text-sm'>Login</button>
            </Link>
            <Link to='signup'>
              <button className='bg-green-500 px-4 py-2 rounded-md text-sm'>Signup</button>
            </Link>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  )
}
