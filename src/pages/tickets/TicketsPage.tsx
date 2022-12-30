import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components'
import { useTickets } from '../../hooks/models'
import useSWR from 'swr'
import { iDevice, iTicket } from '../../types'
import { supabase } from '../../services/supabaseService'
import { timeAgoFormat } from '../../utils'

export const TicketsPage = (): JSX.Element => {
  const { data: tickets, error } = useTickets()

  return (
    <div className='p-20'>
      <div className='w-full flex justify-end'>
        <Link to='new'>
          <Button>Nuevo ticket +</Button>
        </Link>
      </div>
      <h1>Estos son los tickets</h1>
      <div className='flex flex-gap-2 flex-col mt-10'>
        {tickets?.map((ticket) => {
          const date = new Date(ticket.starts_at)

          const timeAgo = timeAgoFormat(new Date(ticket.created_at))

          return (
            <article key={ticket.id} className='border rounded-md p-6'>
              <p className='text-gray-500 mb-6 capitalize'>{timeAgo}</p>
              <h1 className='font-bold text-2xl'>{ticket.name}</h1>
              <p className='mt-2'>{ticket.description}</p>

              <div className='flex gap-2 flex-col mt-6'>
                <hr />
                <Device id={ticket.device_id} />
                <hr />
                <p className='text-gray-400 text-sm text-right mt-6'>
                  Empezará el {date.toDateString()} a la(s) {date.toLocaleTimeString()}
                </p>
                <TicketStatus status={ticket.status} />
              </div>
            </article>
          )
        })}
        {error !== undefined ? <p>una pena</p> : null}
      </div>
    </div>
  )
}

const getSingleDevice = async (params: string[]): Promise<iDevice> => {
  const [_, id] = params
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return (await supabase.from('device').select('*').eq('id', id).single()).data as iDevice
}

const Device = ({ id }: { id: string }): JSX.Element => {
  const { data, error } = useSWR<iDevice>([`/devices/${id}`, id], getSingleDevice)

  const isLoading = data == null && error == null

  console.log({ data })

  return (
    <div className='py-6'>
      <p className='font-bold text-blue-500'>Dispositivo:</p>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <p>
            <span className='font-bold'>Nombre: </span>
            {data?.name}
          </p>
          <p>
            <span className='font-bold'>Descripcion: </span>
            {data?.description}
          </p>
          <img src={data?.image_url} alt='' className='mt-2' width={200} />
        </div>
      )}
    </div>
  )
}

const statusClasses: Record<iTicket['status'], string> = {
  NOT_STARTED: 'bg-gray-300 bg-opacity-10 text-gray-200',
  ACTIVE: 'bg-green-500',
  CLOSED: 'bg-red-500',
}

const statusTitles: Record<iTicket['status'], string> = {
  NOT_STARTED: 'No iniciado',
  ACTIVE: 'Activo',
  CLOSED: 'Cerrado',
}

const TicketStatus = ({ status }: { status: iTicket['status'] }): JSX.Element => {
  return (
    <div className={`${statusClasses[status]} w-min whitespace-nowrap rounded-sm px-3 py-2 text-xs`}>
      {statusTitles[status]}
    </div>
  )
}
