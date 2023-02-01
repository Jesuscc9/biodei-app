import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useUser } from '../../hooks/models'
import { supabase } from '../../services/supabaseService'

const ROLE_ENUM = {
  CLIENT: 'Cliente',
  ADMIN: 'Admin',
  INTERN: 'Interno',
}

export const Navbar = (): JSX.Element => {
  const { data: user } = useUser()

  const handleLogout = (): void => {
    supabase.auth.signOut().catch((error) => console.error(error))
  }

  const isAdmin = user?.role === 'ADMIN'

  return (
    <>
      <nav className='p-6 px-10 border-zinc-300 border-b flex justify-between items-center bg-zinc-800 text-white'>
        <div className='flex items-center gap-2'>
          <h1 className='font-bold text-xl'>BIODEI</h1>
          <ul className='ml-10 flex gap-4'>
            {isAdmin ? (
              <li>
                <Link to='/admin/clients' className='hover:underline'>
                  Clientes
                </Link>
              </li>
            ) : (
              <li>
                <Link to='/devices' className='hover:underline'>
                  Dispositivos
                </Link>
              </li>
            )}
          </ul>
        </div>
        {user !== undefined ? (
          <div className='flex gap-2 items-center py-1.5'>
            <h1>{user.profile?.first_name}</h1>
            <h1>{user.profile?.last_name}</h1>
            <div className='ml-3 text-xs bg-green-500 bg-opacity-50 px-3 py-1 rounded-full'>{ROLE_ENUM[user.role]}</div>
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
