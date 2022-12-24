import React from 'react'
import { useClients } from '../hooks/models/client/useClients'
import { useInterns } from '../hooks/models/intern/useInterns'
import { useTickets } from '../hooks/models/ticket/useTickets'

export const TicketsPage = (): JSX.Element => {
  const data = useTickets()

  const { data: interns } = useInterns()

  const { data: clients } = useClients()

  return (
    <div>
      <div>
        <div>
          <p>Tickets:</p>
          {JSON.stringify(data, null, 2)}
        </div>
        <div>
          <p>interns:</p>
          {JSON.stringify(interns, null, 2)}
        </div>
        <div>
          <p>clients:</p>
          {JSON.stringify(clients, null, 2)}
        </div>
      </div>
      <TicketForm />
    </div>
  )
}

const TicketForm = (): JSX.Element => {
  const { data: interns } = useInterns()

  const { data: clients } = useClients()

  return (
    <div className='mt-14'>
      <form className='form m-auto border p-10 rounded-md'>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name of the ticket'
            className='w-full mt-2 p-3 border rounded-md text-black'
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            className='w-full mt-2 rounded-md p-3 text-black'
            name='description'
            id='description'
            placeholder='Description of the ticket'
            cols={30}
            rows={5}
          ></textarea>
        </label>

        <label htmlFor='startsAt'>
          Starts at
          <input
            type='datetime-local'
            name='startsAt'
            id='startsAt'
            className='w-full p-3 mt-2 rounded-md border text-black'
          />
        </label>

        <label htmlFor='intern_id'>
          Interno
          <select name='intern_id' id='intern_id' className='w-full p-3 mt-2 rounded-md border text-black'>
            {interns?.map((intern) => {
              const fullName = intern.first_name + ' ' + intern.last_name
              return (
                <option value={intern.uuid} key={intern.id}>
                  {fullName}
                </option>
              )
            })}
          </select>
        </label>

        <label htmlFor='client_id'>
          Cliente
          <select name='client_id' id='client_id' className='w-full p-3 mt-2 rounded-md border text-black'>
            {clients?.map((client) => {
              const fullName = client.first_name + ' ' + client.last_name

              return (
                <option key={client.id} value={client.uuid}>
                  {fullName}
                </option>
              )
            })}
          </select>
        </label>

        <label htmlFor='device_id'>
          Dispositivo
          <select name='device_id' id='device_id' className='w-full p-3 mt-2 rounded-md border text-black'>
            <option value='1'>Device 1</option>
            <option value='2'>Device 2</option>
          </select>
        </label>

        <button
          type='submit'
          className='uppercase w-full p-3 py-4 mt-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-sm'
        >
          crear ticket
        </button>
      </form>
    </div>
  )
}
