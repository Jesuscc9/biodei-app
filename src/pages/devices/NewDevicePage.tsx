import React from 'react'
import { InsertDeviceForm, Button } from '../../components'
import { Link } from 'react-router-dom'

export const NewDevicePage = (): JSX.Element => {
  return (
    <div className='p-20'>
      <Link to='/devices'>
        <Button>Atras</Button>
      </Link>
      <InsertDeviceForm />
    </div>
  )
}
