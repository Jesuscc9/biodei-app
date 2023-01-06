import React from 'react'
import { DevicesList } from './components'
import { Link, Outlet } from 'react-router-dom'
import { Button } from '../../components'

export const DevicesPage = (): JSX.Element => {
  return (
    <div className='p-20'>
      <Outlet />
      <div className='flex justify-between items-center'>
        <h1>Inventario</h1>
        <Link to='new'>
          <Button>Crear nuevo +</Button>
        </Link>
      </div>
      <DevicesList />
    </div>
  )
}
