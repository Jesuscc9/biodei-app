import React from 'react'
import { useFormik } from 'formik'
import { iInsertDevice } from '../../../../types'
import { InputText, Button } from '../../../ui'
import { useInsertDevice } from '../../../../hooks/models'

const initialValues: iInsertDevice = {
  name: '',
  description: '',
  image_url: '',
  inventory_id: '',
}

export const InsertDeviceForm = (): JSX.Element => {
  const { isLoading, create } = useInsertDevice()

  const { handleSubmit } = useFormik<iInsertDevice>({
    initialValues,
    onSubmit: async (e) => {
      await create(e)
    },
  })

  return (
    <form onSubmit={handleSubmit} className='my-10 form m-auto p-10 border rounded-md'>
      <h1 className='text-center text-xl uppercase font-bold'>Crear dispositivo</h1>
      <label htmlFor='name'>
        Nombre
        <InputText placeholder='Osciloscopio' name='name' />
      </label>

      <label htmlFor='description'>
        Descripcion
        <textarea
          rows={4}
          id='description'
          title='description'
          name='description'
          placeholder='Descripcion del dispositivo...'
          className='mt-2 border p-3 w-full rounded-md text-black'
        ></textarea>
      </label>

      <label htmlFor='image_url'>
        Imagen
        <InputText name='image_url' placeholder='URL of the image' />
      </label>

      <Button isLoading={isLoading}>Crear dispositivo</Button>
    </form>
  )
}
