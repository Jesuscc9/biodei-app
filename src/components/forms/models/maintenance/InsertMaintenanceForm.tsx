import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { iInsertMaintenance } from '../../../../types'
import { Button, InputSelect } from '../../../ui'
import { useInsertmaintenance } from '../../../../hooks/models'

const options = [
  { value: 'PREVENTIVE', label: 'Mantenimiento preventivo' },
  { value: 'CORRECTIVE', label: 'Mantenimiento correctivo' },
]

const initialValues: iInsertMaintenance = {
  title: 'MAINTENANCE_REQUESTED',
  type: 'PREVENTIVE',
  description: '',
  device_id: '',
}

export const InsertMaintenanceForm = ({ onSubmit }: { onSubmit?: () => void }): JSX.Element => {
  const { isLoading, create } = useInsertmaintenance()

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik<iInsertMaintenance>({
    initialValues,
    onSubmit: async (e) => {
      try {
        await create(e)
        onSubmit?.()
      } catch {}
    },
    enableReinitialize: true,
  })

  console.log({ values })

  useEffect(() => {
    console.log({ values })
  }, [values])

  return (
    <form onSubmit={handleSubmit} className='m-auto p-10 rounded-md w-[540px] flex flex-col gap-6'>
      <h1 className='text-center text-xl uppercase font-bold'>Solicitar mantenimiento</h1>
      <label htmlFor='name'>
        Tipo de mantenimiento
        <InputSelect
          options={options}
          onChange={(e) => {
            setFieldValue('type', e?.value).catch((e) => console.error(e))
          }}
          value={options.find((e) => e.value === values.type)}
        />
      </label>

      <label htmlFor='description'>
        Descripcion (opcional)
        <textarea
          rows={4}
          onChange={handleChange}
          value={values.description}
          id='description'
          title='description'
          name='description'
          placeholder='Descripcion del dispositivo...'
          className='mt-2 border p-3 w-full rounded-md text-white bg-zinc-700 border-zinc-300'
        ></textarea>
      </label>

      <Button type='submit' isLoading={isLoading}>
        CONTINUAR
      </Button>
    </form>
  )
}
