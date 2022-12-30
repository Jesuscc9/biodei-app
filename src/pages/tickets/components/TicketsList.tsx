import React from 'react'
import { useTickets } from '../../../hooks/models'
import { Ticket } from './Ticket'

export const TicketsList = (): JSX.Element => {
  const { data: tickets, error } = useTickets()

  return (
    <div className='flex flex-gap-2 flex-col mt-10'>
      {tickets?.map((ticket) => (
        <Ticket ticket={ticket} key={ticket.id} />
      ))}
      {error !== undefined ? <p>Ocurrio un error leyendo los tickets, intenta mas tarde</p> : null}
    </div>
  )
}
