import React from 'react'
import { useDevices } from '../../../hooks/models'
import { Device } from './Device'

export const DevicesList = (): JSX.Element => {
  const { data: devices, isLoading } = useDevices()

  return (
    <div className='flex flex-col gap-10'>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {devices?.map((e) => {
            return <Device device={e} key={e.id} />
          })}
        </>
      )}
    </div>
  )
}
