import React from 'react'
import { Outlet } from 'react-router-dom'
import { DevicesTable } from '../../components'
import { useDevices } from '../../hooks/models'

export const DevicesPage = (): JSX.Element => {
  const { data: devices, isLoading } = useDevices()

  if (devices == null || isLoading) return <div>Cargando...</div>

  return (
    <div className='p-20'>
      <Outlet />
      <div className='flex justify-between items-center'>
        <h1 className='text-xl'>Inventario</h1>
      </div>
      {devices.length > 0 ? (
        <DevicesTable devices={devices} />
      ) : (
        <p className='mt-10'>No se ha registrado ningun dispositivo.</p>
      )}
    </div>
  )
}
