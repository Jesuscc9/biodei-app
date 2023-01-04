import React, { useState } from 'react'
import { supabase } from '../../../services'
import { Button, InputText } from '../../../components'
import { useFormik } from 'formik'

interface iValues {
  email: string
  password: string
}

const initialValues = {
  email: '',
  password: '',
}

export const LoginForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: iValues): Promise<void> => {
    try {
      setIsLoading(true)
      const res = await supabase.auth.signInWithPassword({
        email: e.email,
        password: e.password,
      })

      if (res.error != null) {
        throw new Error(res.error.message)
      }
    } catch (error) {
      const { message } = error as Error
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const { handleChange, handleSubmit } = useFormik<iValues>({
    initialValues,
    onSubmit,
  })

  return (
    <form className='form m-auto' onSubmit={handleSubmit}>
      <label htmlFor='email' className='text-sm'>
        Correo electrónico
        <InputText name='email' placeholder='name@email.com' onChange={handleChange} />
      </label>
      <label htmlFor='password' className='text-sm'>
        Contraseña
        <InputText name='password' type='password' placeholder='******' onChange={handleChange} />
      </label>
      {error !== null ? <p className='text-red-500'>{error}</p> : null}
      <Button isLoading={isLoading} type='submit'>
        Iniciar sesión
      </Button>
    </form>
  )
}
