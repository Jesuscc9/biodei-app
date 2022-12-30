import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../../components'
import { useTicket } from '../../hooks/models'
import { Ticket } from './components'

export const TicketDetailPage = (): JSX.Element => {
  const { ticketId } = useParams()

  const { data: ticket } = useTicket(ticketId)

  if (ticket == null) {
    return <div>Ticket not found</div>
  }

  return (
    <div className='p-20'>
      <div className='w-full flex justify-start mb-10'>
        <Link to='/tickets'>
          <Button>Atras</Button>
        </Link>
      </div>
      <Ticket ticket={ticket} detailed={true} />
    </div>
  )
}
