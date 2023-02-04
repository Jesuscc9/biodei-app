import { useFormik } from 'formik'
import React from 'react'
import { Button, InputSelect, InputText } from '../../../../components'
import { useInsertUser } from '../../../../hooks/models'
import { iInsertUser } from '../../../../types'
import { emailAdmin } from '../../../../utils/createAdminAccount'

const initialValues: iInsertUser = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  role: 'CLIENT',
}

const roleOptions = [
  {
    value: 'CLIENT',
    label: 'Client',
  },
  {
    value: 'INTERN',
    label: 'Intern',
  },
]

export const InsertUserForm = (): JSX.Element => {
  const { create, isLoading } = useInsertUser()

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<iInsertUser>({
    initialValues,
    onSubmit: create,
  })

  const disableEmail = values.email === emailAdmin

  return (
    <div>
      <form className='m-auto p-10 rounded-md w-[540px] flex flex-col gap-6' onSubmit={handleSubmit}>
        <div className='flex gap-2'>
          <label htmlFor='first_name'>
            Nombre(s)
            <InputText name='first_name' placeholder='Nombre' value={values.first_name} onChange={handleChange} />
          </label>

          <label htmlFor='last_name'>
            Apellido(s)
            <InputText name='last_name' placeholder='Apellidos' value={values.last_name} onChange={handleChange} />
          </label>
        </div>
        <label htmlFor='email'>
          Email
          <InputText name='email' placeholder='example@email.com' value={values.email} onChange={handleChange} />
          {disableEmail ? <p className='text-red-500 mt-2 text-sm'>Este email es el de admin, no lo uses</p> : null}
        </label>

        <label htmlFor='role'>
          Cliente
          <InputSelect
            name='role'
            onChange={(e) => {
              setFieldValue('role', e?.value).catch((e) => {
                console.error(e)
              })
            }}
            options={roleOptions}
          />
        </label>

        {values.role === 'CLIENT' ? (
          <label htmlFor='company_name'>
            Nombre de la empresa
            <InputText name='company_name' onChange={handleChange} placeholder='Biodei' />
          </label>
        ) : null}

        <label htmlFor='password'>
          Contraseña
          <InputText name='password' type='password' placeholder='******' onChange={handleChange} />
        </label>

        <Button disabled={disableEmail} type='submit' isLoading={isLoading}>
          CONTINUAR
        </Button>
      </form>
    </div>
  )
}
