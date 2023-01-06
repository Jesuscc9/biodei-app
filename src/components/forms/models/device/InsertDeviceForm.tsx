import React from 'react'
import { useFormik } from 'formik'
import { iInsertDevice } from '../../../../types'
import { InputText, Button } from '../../../ui'
import { useInsertDevice } from '../../../../hooks/models'

const initialValues: iInsertDevice = {
  name: '',
  description: '',
  image_url: '',
  external_code: '',
  internal_code: '',
  brand: '',
  model: '',
  serial_number: '',
  location: '',
  user_id: '',
}

export const InsertDeviceForm = ({ onSubmit }: { onSubmit?: () => void }): JSX.Element => {
  const { isLoading, create } = useInsertDevice()

  const { handleSubmit, handleChange } = useFormik<iInsertDevice>({
    initialValues,
    onSubmit: async (e) => {
      try {
        await create(e)
        onSubmit?.()
      } catch {}
    },
    enableReinitialize: true,
  })

  return (
    <form onSubmit={handleSubmit} className='m-auto p-10 rounded-md w-[540px] flex flex-col gap-6'>
      <h1 className='text-center text-xl uppercase font-bold'>Crear dispositivo</h1>
      <label htmlFor='name'>
        Nombre
        <InputText placeholder='Osciloscopio' name='name' onChange={handleChange} />
      </label>

      <div className='flex gap-4'>
        <label htmlFor='external_code'>
          Codigo externo
          <InputText placeholder='Codigo externo' name='external_code' onChange={handleChange} />
        </label>

        <label htmlFor='internal_code'>
          Codigo interno
          <InputText placeholder='Codigo interno' name='internal_code' onChange={handleChange} />
        </label>
      </div>

      <div className='flex gap-4'>
        <label htmlFor='brand'>
          Marca
          <InputText placeholder='Marca' name='brand' onChange={handleChange} />
        </label>

        <label htmlFor='model'>
          Modelo
          <InputText placeholder='Modelo' name='model' onChange={handleChange} />
        </label>
      </div>

      <label htmlFor='serial_number'>
        Numero de serie
        <InputText placeholder='Numero de serie' name='serial_number' onChange={handleChange} />
      </label>

      <label htmlFor='location'>
        Ubicacion
        <InputText placeholder='Ubicacion' name='location' onChange={handleChange} />
      </label>

      <label htmlFor='description'>
        Descripcion (opcional)
        <textarea
          rows={4}
          onChange={handleChange}
          id='description'
          title='description'
          name='description'
          placeholder='Descripcion del dispositivo...'
          className='mt-2 border p-3 w-full rounded-md text-white bg-zinc-700 border-zinc-300'
        ></textarea>
      </label>

      <label htmlFor='image_url'>
        Imagen
        <InputText name='image_url' onChange={handleChange} placeholder='URL of the image' />
      </label>

      <Button type='submit' isLoading={isLoading}>
        Crear dispositivo
      </Button>
    </form>
  )
}
