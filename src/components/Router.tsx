import React from 'react'
import { Routes, Route, Outlet, useLocation, Link } from 'react-router-dom'
import { HomePage } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { TicketsPage } from '../pages/Tickets'
import { useProfile } from '../hooks/useProfile'
import { useAuth } from '../hooks/AuthProvider'

export const Router = (): JSX.Element => {
  const { session } = useAuth()
  const { pathname } = useLocation()

  console.log({ session, pathname })

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='tickets' element={<Outlet />}>
          <Route index element={<TicketsPage />} />
          <Route path=':ticketId' element={<div>Ticket con id</div>} />
        </Route>
      </Route>
    </Routes>
  )
}

const Navbar = (): JSX.Element => {
  const { data: profile } = useProfile()

  return (
    <>
      <nav className='p-6 px-10 border-gray-300 border-b flex justify-between items-center bg-gray-800 text-white'>
        <div className='flex items-center gap-2'>
          <h1 className='font-bold text-xl'>BIODEI</h1>
          <ul className='ml-10'>
            <li>
              <Link to='tickets' className='hover:underline'>
                Tickets
              </Link>
            </li>
          </ul>
        </div>
        {profile !== undefined ? (
          <div className='flex gap-2 items-center py-1.5'>
            <h1>{profile.first_name}</h1>
            <h1>{profile.last_name}</h1>
            <div className='ml-3 text-xs bg-green-500 bg-opacity-50 px-3 py-1 rounded-full'>{profile.role}</div>
          </div>
        ) : (
          <div className='flex gap-6'>
            <button className='bg-green-500 px-4 py-2 rounded-md text-sm'>Login</button>
            <button className='bg-green-500 px-4 py-2 rounded-md text-sm'>Signup</button>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  )
}
