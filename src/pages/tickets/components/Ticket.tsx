import { iTicket } from '../../../types'
import React from 'react'
import { TicketStatus, TicketDevice } from './'
import { Link } from 'react-router-dom'
import { timeAgoFormat } from '../../../utils'

export const Ticket = ({ ticket, detailed = false }: { ticket: iTicket; detailed?: boolean }): JSX.Element => {
  if (!detailed) {
    return (
      <Link to={ticket.id}>
        <TicketBody ticket={ticket} detailed={detailed} />
      </Link>
    )
  }

  return <TicketBody ticket={ticket} detailed={detailed} />
}

const TicketBody = ({ ticket, detailed }: { ticket: iTicket; detailed: boolean }): JSX.Element => {
  const date = new Date(ticket.starts_at)
  const timeAgo = timeAgoFormat(new Date(ticket.created_at))

  return (
    <article key={ticket.id} className='border rounded-md p-6'>
      <div className='flex justify-between items-start'>
        <p className='text-gray-500 mb-6 capitalize text-sm'>{timeAgo}</p>
        <TicketStatus status={ticket.status} />
      </div>
      <h1 className='font-bold text-2xl'>{ticket.name}</h1>
      <p className='mt-2'>{ticket.description}</p>

      <div className='flex gap-2 flex-col mt-6'>
        {detailed ? (
          <>
            <hr />
            <TicketDevice id={ticket.device_id} />
            <hr />
          </>
        ) : null}
        <p className='text-gray-400 text-sm text-right mt-6'>
          Empezará el {date.toDateString()} a la(s) {date.toLocaleTimeString()}
        </p>
      </div>
    </article>
  )
}
