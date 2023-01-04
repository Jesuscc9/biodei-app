import React, { useEffect } from 'react'
import Logo from '../../assets/logo.png'
import GoogleChief from '../../assets/googlechief.png'
import { LoginForm } from './components'
import { Link } from 'react-router-dom'
import { createAdminAccount } from '../../utils/createAdminAccount'

export const LoginPage = (): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      createAdminAccount()
    }, 10000)
  }, [])

  return (
    <div className='flex justify-around h-screen'>
      <div className='w-full'>
        <nav className='p-8 w-full'>
          <Link to='/'>
            <div className='flex items-center'>
              <img src={Logo} alt='Logo' className='w-8 mr-6' />
              <h1 className='text-xl font-bold uppercase'>biodei</h1>
            </div>
          </Link>
        </nav>
        <div className='w-[384px] m-auto'>
          <div className='flex flex-col gap-10'>
            <div>
              <h1 className='text-3xl m-auto mt-20'>Bienvenido de vuelta</h1>
              <p className='mt-2 text-zinc-400'>Ingresa a tu cuenta</p>
            </div>
            <button className='bg-zinc-300 w-full py-3 rounded-md'>Solicita acceso</button>
            <div className='w-full border border-zinc-300 rounded-md'></div>
            <LoginForm />
            <p className='text-zinc-400 text-sm text-center'>
              No tienes cuenta?
              <Link to='signup' className='underline ml-1 text-white'>
                Solicítala ahora
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className='w-full items-center hidden flex-col justify-center p-12 lg:flex bg-[#161616]'>
        <div className='relative w-[500px] z-0'>
          <p className='text-9xl absolute -top-9 italic opacity-20 z-0 -left-10'>"</p>
        </div>
        <p className='text-3xl z-10 relative w-[500px]'>
          Honestly, I really love what <span className='text-green-500 font-bold'>@Biodei</span> is doing, you don't
          need to own a complete backend, just write your logic within your app and you'll get a powerful Postgresql at
          your disposal.
        </p>
        <div className='flex items-center mt-7'>
          <img src={GoogleChief} className='w-12 h-12 object-cover rounded-full' alt='' />
          <p className='font-semibold ml-3 text-zinc-400 text-sm'>@GoogleMX</p>
        </div>
      </div>
    </div>
  )
}
