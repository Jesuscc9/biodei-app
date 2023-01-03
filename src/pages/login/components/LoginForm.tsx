import React from 'react'
import { supabase } from '../../../services'
import { Button, InputText } from '../../../components'

export const LoginForm = (): JSX.Element => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const values = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>

    supabase.auth
      .signInWithPassword({
        email: values.email,
        password: values.password,
      })
      .catch((err) => {
        console.error({ err })
      })
  }

  return (
    <form className='form m-auto' onSubmit={handleSubmit}>
      <label htmlFor='email' className='text-sm'>
        Email
        <InputText name='email' placeholder='name@email.com' />
      </label>
      <label htmlFor='password' className='text-sm'>
        Contraseña
        <InputText name='password' type='password' placeholder='******' />
      </label>
      <Button type='submit'>Iniciar sesion</Button>
    </form>
  )
}
