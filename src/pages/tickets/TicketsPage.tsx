import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components'
import { TicketsList } from './components'

export const TicketsPage = (): JSX.Element => {
  return (
    <div className='p-20'>
      <div className='w-full flex justify-end'>
        <Link to='new'>
          <Button>Nuevo ticket +</Button>
        </Link>
      </div>
      <h1>Estos son los tickets</h1>
      <TicketsList />
    </div>
  )
}
