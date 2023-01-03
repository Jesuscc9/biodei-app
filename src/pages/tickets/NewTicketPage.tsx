import React from 'react'
import { InsertTicketForm, Button } from '../../components'
import { Link } from 'react-router-dom'

export const NewTicketPage = (): JSX.Element => {
  return (
    <div className='p-20'>
      <Link to='/tickets'>
        <Button>Back</Button>
      </Link>

      <InsertTicketForm />
    </div>
  )
}
