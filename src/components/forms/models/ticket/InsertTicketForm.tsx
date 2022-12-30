import { useFormik } from 'formik'
import React from 'react'
import { useClients, useDevices, useInsertTicket, useInterns } from '../../../../hooks/models'
import { iInsertTicket } from '../../../../types'
import { InputText, Button } from '../../../ui'
import { useNavigate } from 'react-router-dom'

const initialValues: iInsertTicket = {
  name: '',
  description: '',
  starts_at: '',
  intern_id: '',
  client_id: '',
  device_id: '',
}

export const InsertTicketForm = (): JSX.Element => {
  const { data: interns } = useInterns()
  const { data: clients } = useClients()
  const { data: devices } = useDevices()

  const navigate = useNavigate()

  const { create, isLoading } = useInsertTicket()

  const { handleSubmit, handleChange } = useFormik<iInsertTicket>({
    initialValues,
    onSubmit: (values) => {
      create(values).catch((err) => console.log(err))
      navigate('/tickets')
    },
  })

  return (
    <form className='form m-auto border p-10 rounded-md' onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Nombre:
        <InputText name='name' onChange={handleChange} placeholder='Name of the ticket' />
      </label>
      <label htmlFor='description'>
        Descripción:
        <textarea
          onChange={handleChange}
          className='w-full mt-2 rounded-md p-3 text-black border'
          name='description'
          id='description'
          placeholder='Description of the ticket'
          cols={30}
          rows={5}
        ></textarea>
      </label>

      <label htmlFor='starts_at'>
        Fecha de inicio:
        <input
          onChange={handleChange}
          type='datetime-local'
          name='starts_at'
          id='starts_at'
          className='w-full p-3 mt-2 rounded-md border text-black'
        />
      </label>

      <label htmlFor='intern_id'>
        Usuario interno:
        <select
          name='intern_id'
          id='intern_id'
          className='w-full p-3 mt-2 rounded-md border text-black'
          onChange={handleChange}
        >
          <option value='null'>Selecciona un usuario</option>
          {interns?.map((intern) => {
            const fullName = intern.first_name + ' ' + intern.last_name

            return (
              <option value={intern?.intern_profile?.id} key={intern.id}>
                {fullName}
              </option>
            )
          })}
        </select>
      </label>

      <label htmlFor='client_id'>
        Usuario cliente:
        <select
          name='client_id'
          id='client_id'
          className='w-full p-3 mt-2 rounded-md border text-black'
          onChange={handleChange}
        >
          <option value='null'>Select a user</option>
          {clients?.map((client) => {
            const fullName = client.first_name + ' ' + client.last_name

            return (
              <option key={client.client_profile?.id} value={client.client_profile?.id}>
                {fullName}
              </option>
            )
          })}
        </select>
      </label>

      <label htmlFor='device_id'>
        Dispositivo:
        <select
          name='device_id'
          id='device_id'
          className='w-full p-3 mt-2 rounded-md border text-black'
          onChange={handleChange}
        >
          <option value='null'>Selecciona un dispositivo</option>
          {devices?.map((device) => {
            return (
              <option value={device.id} key={device.id}>
                {device.name}
              </option>
            )
          })}
        </select>
      </label>

      <Button type='submit' isLoading={isLoading}>
        crear ticket
      </Button>
    </form>
  )
}
