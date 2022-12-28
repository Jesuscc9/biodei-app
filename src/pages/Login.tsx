import React from 'react'
import { supabase } from '../services/supabaseService'

export const LoginPage = (): JSX.Element => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const values = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>

    supabase.auth
      .signInWithPassword({
        email: values.email,
        password: values.password,
      })
      .then((e) => {
        console.log({ e })
        console.log({ e })
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  return (
    <div>
      <h1 className='text-3xl m-auto mt-20 text-center'>Inicia sesion</h1>
      <form className='form m-auto mt-10 border p-10 rounded-md' onSubmit={handleSubmit}>
        <label htmlFor='email'>
          Email
          <input
            id='email'
            type='text'
            className='w-full p-3 mt-2 border rounded-md text-black'
            placeholder='name@email.com'
            name='email'
          />
        </label>
        <label htmlFor='password'>
          Contraseña
          <input
            id='password'
            type='password'
            className='w-full p-3 mt-2 border rounded-md text-black'
            placeholder='******'
            name='password'
          />
        </label>
        <button
          type='submit'
          className='w-full p-3 py-4 mt-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm'
        >
          CONTINUAR
        </button>
      </form>
    </div>
  )
}
