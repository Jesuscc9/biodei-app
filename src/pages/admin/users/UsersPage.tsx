import React, { useState } from 'react'
import { supabase } from '../../../services'
import { Button } from '../../../components'
import { createAdminAccount, emailAdmin } from '../../../utils/createAdminAccount'

export const UsersPage = (): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const disableEmail = email === emailAdmin

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    setIsLoading(true)

    const values = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>

    supabase.auth
      .signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            role: values.role,
          },
        },
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false))
  }

  return (
    <div>
      <h1 className='text-3xl m-auto mt-20 text-center'>Registrate</h1>
      <form className='w-[500px] flex flex-col gap-5 m-auto mt-10 border p-10 rounded-md' onSubmit={handleSubmit}>
        <div className='flex gap-2'>
          <label htmlFor='first_name'>
            Nombre(s)
            <input
              id='first_name'
              type='text'
              className='w-full p-3 mt-2 border rounded-md text-black'
              placeholder='Nombre'
              name='first_name'
            />
          </label>

          <label htmlFor='last_name'>
            Apellido(s)
            <input
              id='last_name'
              type='text'
              className='w-full p-3 mt-2 border rounded-md text-black'
              placeholder='Apellidos'
              name='last_name'
            />
          </label>
        </div>
        <label htmlFor='email'>
          Email
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            id='email'
            type='email'
            className='w-full p-3 mt-2 border rounded-md text-black'
            placeholder='email'
            name='email'
            value={email}
          />
          {disableEmail ? <p className='text-red-500 mt-2 text-sm'>Este email es el de admin, no lo uses</p> : null}
        </label>

        <label htmlFor='role'>
          Cliente
          <select name='role' title='User role' className='p-3 text-black mt-2 w-full rounded-md border'>
            <option value='CLIENT'>Cliente</option>
            <option value='INTERN'>Interno</option>
          </select>
        </label>

        <label htmlFor='company_name'>
          Nombre de la empresa
          <input
            id='company_name'
            type='text'
            className='w-full p-3 mt-2 border rounded-md text-black'
            name='company_name'
            placeholder='Biodei'
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

        <Button type='submit' isLoading={isLoading}>
          CONTINUAR
        </Button>
      </form>

      <div className='form border m-auto mt-20 p-10'>
        <h1 className='text-xl'>Create Admin Account</h1>
        <button
          onClick={() => {
            createAdminAccount().catch((error) => console.error(error))
          }}
          type='button'
          className='bg-red-500 hover:bg-red-600 rounded-md text-lg p-4'
        >
          Crear
        </button>
      </div>
    </div>
  )
}
