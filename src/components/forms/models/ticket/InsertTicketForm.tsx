import { useFormik } from 'formik'
import React from 'react'
import { useInsertTicket } from '../../../../hooks/models'
import { iInsertTicket } from '../../../../types'
import { InputSelect, Button } from '../../../ui'

const options = [
  { value: 'PREVENTIVE', label: 'Mantenimiento preventivo' },
  { value: 'CORRECTIVE', label: 'Mantenimiento correctivo' },
]

const initialValues: iInsertTicket = {
  maintenance_type: 'PREVENTIVE',
  device_id: '',
  description: undefined,
}

export const InsertTicketForm = ({ onSubmit }: { onSubmit?: () => void }): JSX.Element => {
  const { create, isLoading } = useInsertTicket()

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik<iInsertTicket>({
    initialValues,
    onSubmit: (values) => {
      create(values).catch((err) => console.error(err))
      onSubmit?.()
    },
  })

  return (
    <form className='flex w-[500px] flex-col gap-5 m-auto p-6 rounded-md' onSubmit={handleSubmit}>
      <label htmlFor='maintenance_type'>
        Tipo de mantenimiento:
        <InputSelect
          options={options}
          id='maintenance_type'
          onChange={(e) => {
            setFieldValue('maintenance_type', e?.value).catch((e) => console.error(e))
          }}
          value={options.find((e) => e.value === values.maintenance_type)}
        />
      </label>
      <label htmlFor='description'>
        Descripción:
        <textarea
          onChange={handleChange}
          className='mt-2 border p-3 w-full rounded-md text-white bg-zinc-700 border-zinc-300'
          name='description'
          id='description'
          placeholder='Description of the ticket'
          cols={30}
          rows={5}
        ></textarea>
      </label>

      <Button type='submit' isLoading={isLoading}>
        crear ticket
      </Button>
    </form>
  )
}
