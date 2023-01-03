import React from 'react'
import { DevicesList } from './components'
import { Link } from 'react-router-dom'
import { Button } from '../../components'

export const DevicesPage = (): JSX.Element => {
  return (
    <div className='p-20'>
      <div className='flex justify-between items-center'>
        <h1>Estos son los dispositivos</h1>
        <Link to='/devices/new'>
          <Button>Crear nuevo +</Button>
        </Link>
      </div>
      <DevicesList />
    </div>
  )
}
